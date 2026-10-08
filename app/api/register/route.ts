import { NextResponse } from "next/server"
import { z } from "zod"

import { db, initializeDatabase } from "@/backend/db"

const registerSchema = z.object({
  userType: z.enum(["recruiter", "recruitee"]).default("recruiter"),
  fullName: z.string().trim().min(2, "Full name is required."),
  email: z.string().trim().email("A valid email is required."),
  phone: z.string().trim().min(7, "Phone number is required."),
  recruitingType: z.string().trim().optional(),
  description: z.string().trim().min(5, "Please provide a brief description of your requirements or profile."),
  companyName: z.string().trim().optional(),
  interestedRole: z.string().trim().optional(),
  resumeUrl: z.string().optional(),
  resumeName: z.string().optional(),
  password: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = registerSchema.parse(body)

    await initializeDatabase()

    const targetType = data.userType || "recruiter"
    const recruitingOrRole = targetType === "recruiter" 
      ? (data.recruitingType || data.interestedRole || "Technical Staffing")
      : (data.interestedRole || data.recruitingType || "Candidate Seeking Opportunities")

    const result = await db.query(
      `
        INSERT INTO registered_users (
          user_type,
          full_name,
          email,
          phone,
          recruiting_type,
          description,
          resume_url,
          resume_name,
          company_name,
          interested_role,
          password_hash
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING id
      `,
      [
        targetType,
        data.fullName,
        data.email.toLowerCase().trim(),
        data.phone,
        recruitingOrRole,
        data.description || null,
        data.resumeUrl || null,
        data.resumeName || null,
        data.companyName || null,
        recruitingOrRole,
        data.password ? data.password : null,
      ],
    )

    return NextResponse.json({
      success: true,
      id: result.rows[0]?.id,
      message: "Registration completed successfully.",
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: error.issues[0]?.message ?? "Invalid registration input." },
        { status: 400 },
      )
    }

    if (typeof error === "object" && error && "code" in error && error.code === "23505") {
      return NextResponse.json(
        { success: false, message: "This email address is already registered." },
        { status: 409 },
      )
    }

    console.error("Register API error:", error)
    return NextResponse.json(
      { success: false, message: "Unable to register right now." },
      { status: 500 },
    )
  }
}

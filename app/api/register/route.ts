import { NextResponse } from "next/server"
import { z } from "zod"

import { hashPassword } from "@/backend/auth"
import { db, initializeDatabase } from "@/backend/db"

const registerSchema = z
  .object({
    fullName: z.string().trim().min(2, "Full name is required."),
    email: z.string().trim().email("A valid email is required."),
    phone: z.string().trim().min(7, "Phone number is required."),
    interestedRole: z.string().trim().min(2, "Role / industry is required."),
    companyName: z.string().trim().optional(),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string().min(6, "Confirm password is required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  })

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = registerSchema.parse(body)

    await initializeDatabase()

    const result = await db.query(
      `
        INSERT INTO registered_users (full_name, email, phone, interested_role, company_name, password_hash)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
      `,
      [
        data.fullName,
        data.email,
        data.phone,
        data.interestedRole,
        data.companyName || null,
        hashPassword(data.password),
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
        { success: false, message: "This email is already registered." },
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


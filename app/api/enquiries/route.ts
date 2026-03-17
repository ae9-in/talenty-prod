import { NextResponse } from "next/server"
import { z } from "zod"

import { db, initializeDatabase } from "@/backend/db"

const enquirySchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required."),
  companyName: z.string().trim().min(2, "Company name is required."),
  email: z.string().trim().email("A valid email is required."),
  phone: z.string().trim().min(7, "Phone number is required."),
  requirementType: z.string().trim().min(2, "Requirement type is required."),
  industry: z.string().trim().min(2, "Industry is required."),
  rolesRequired: z.string().trim().min(2, "Roles required is required."),
  employeesNeeded: z.coerce.number().int().positive("Employees needed must be at least 1."),
  message: z.string().trim().min(10, "Please share counseling or consulting details."),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = enquirySchema.parse(body)

    await initializeDatabase()

    const result = await db.query(
      `
        INSERT INTO enquiries (
          full_name,
          company_name,
          email,
          phone,
          requirement_type,
          industry,
          roles_required,
          employees_needed,
          message
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING id
      `,
      [
        data.fullName,
        data.companyName,
        data.email,
        data.phone,
        data.requirementType,
        data.industry,
        data.rolesRequired,
        data.employeesNeeded,
        data.message,
      ],
    )

    return NextResponse.json({
      success: true,
      id: result.rows[0]?.id,
      message: "Enquiry submitted successfully.",
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: error.issues[0]?.message ?? "Invalid enquiry input." },
        { status: 400 },
      )
    }

    console.error("Enquiry API error:", error)
    return NextResponse.json(
      { success: false, message: "Unable to submit enquiry right now." },
      { status: 500 },
    )
  }
}


import { NextResponse } from "next/server"
import { z } from "zod"

import { db, initializeDatabase } from "@/backend/db"

const consultationSchema = z.object({
  name: z.string().trim().min(2, "Full name is required."),
  email: z.string().trim().email("A valid email is required."),
  phone: z.string().trim().min(7, "Phone number is required."),
  company: z.string().trim().optional(),
  message: z.string().trim().min(10, "Please share a few details about your hiring needs."),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = consultationSchema.parse(body)

    await initializeDatabase()

    const result = await db.query(
      `
        INSERT INTO consultation_requests (name, email, phone, company, message)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id
      `,
      [data.name, data.email, data.phone, data.company || null, data.message],
    )

    return NextResponse.json({
      success: true,
      id: result.rows[0]?.id,
      message: "Consultation request submitted successfully.",
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: error.issues[0]?.message ?? "Invalid input." },
        { status: 400 },
      )
    }

    console.error("Consultation API error:", error)
    return NextResponse.json(
      { success: false, message: "Unable to submit your request right now." },
      { status: 500 },
    )
  }
}

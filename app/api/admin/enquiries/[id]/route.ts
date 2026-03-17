import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { z } from "zod"

import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/backend/auth"
import { db, initializeDatabase } from "@/backend/db"

const updateSchema = z.object({
  status: z.enum(["pending", "contacted", "completed"]).optional(),
  adminNotes: z.string().trim().optional(),
})

async function requireAdmin() {
  const cookieStore = await cookies()
  return verifyAdminSessionToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value)
}

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin()

  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 })
  }

  await initializeDatabase()
  const { id } = await context.params

  const result = await db.query(
    `
      SELECT
        id,
        full_name AS "fullName",
        company_name AS "companyName",
        email,
        phone,
        requirement_type AS "requirementType",
        industry,
        roles_required AS "rolesRequired",
        employees_needed AS "employeesNeeded",
        message,
        status,
        admin_notes AS "adminNotes",
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM enquiries
      WHERE id = $1
      LIMIT 1
    `,
    [id],
  )

  if (!result.rows[0]) {
    return NextResponse.json({ success: false, message: "Enquiry not found." }, { status: 404 })
  }

  return NextResponse.json({ success: true, enquiry: result.rows[0] })
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin()

  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 })
  }

  try {
    await initializeDatabase()
    const body = await request.json()
    const data = updateSchema.parse(body)
    const { id } = await context.params

    const current = await db.query("SELECT id, status, admin_notes FROM enquiries WHERE id = $1 LIMIT 1", [id])

    if (!current.rows[0]) {
      return NextResponse.json({ success: false, message: "Enquiry not found." }, { status: 404 })
    }

    const nextStatus = data.status ?? current.rows[0].status
    const nextNotes = data.adminNotes ?? current.rows[0].admin_notes

    const result = await db.query(
      `
        UPDATE enquiries
        SET status = $2, admin_notes = $3, updated_at = NOW()
        WHERE id = $1
        RETURNING
          id,
          full_name AS "fullName",
          company_name AS "companyName",
          email,
          phone,
          requirement_type AS "requirementType",
          industry,
          roles_required AS "rolesRequired",
          employees_needed AS "employeesNeeded",
          message,
          status,
          admin_notes AS "adminNotes",
          created_at AS "createdAt",
          updated_at AS "updatedAt"
      `,
      [id, nextStatus, nextNotes || null],
    )

    return NextResponse.json({ success: true, enquiry: result.rows[0] })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: error.issues[0]?.message ?? "Invalid update input." },
        { status: 400 },
      )
    }

    console.error("Admin enquiry update API error:", error)
    return NextResponse.json(
      { success: false, message: "Unable to update enquiry right now." },
      { status: 500 },
    )
  }
}

export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin()

  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 })
  }

  await initializeDatabase()
  const { id } = await context.params

  const result = await db.query("DELETE FROM enquiries WHERE id = $1 RETURNING id", [id])

  if (!result.rows[0]) {
    return NextResponse.json({ success: false, message: "Enquiry not found." }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}

import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/backend/auth"
import { db, initializeDatabase } from "@/backend/db"

async function requireAdmin() {
  const cookieStore = await cookies()
  return verifyAdminSessionToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value)
}

export async function GET(request: Request) {
  const session = await requireAdmin()

  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 })
  }

  await initializeDatabase()

  const { searchParams } = new URL(request.url)
  const search = searchParams.get("search")?.trim() ?? ""
  const status = searchParams.get("status")?.trim() ?? "all"
  const industry = searchParams.get("industry")?.trim() ?? "all"

  const values: Array<string> = []
  const conditions: string[] = []

  if (search) {
    values.push(`%${search}%`)
    const idx = values.length
    conditions.push(`(full_name ILIKE $${idx} OR company_name ILIKE $${idx})`)
  }

  if (status !== "all") {
    values.push(status)
    conditions.push(`status = $${values.length}`)
  }

  if (industry !== "all") {
    values.push(industry)
    conditions.push(`industry = $${values.length}`)
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : ""

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
      ${whereClause}
      ORDER BY created_at DESC
    `,
    values,
  )

  return NextResponse.json({ success: true, enquiries: result.rows })
}

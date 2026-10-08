import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/backend/auth"
import { db, initializeDatabase } from "@/backend/db"

export async function GET() {
  const cookieStore = await cookies()
  const session = verifyAdminSessionToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value)

  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 })
  }

  await initializeDatabase()

  const result = await db.query(
    `
      SELECT
        id,
        COALESCE(user_type, 'recruiter') AS "userType",
        full_name AS "fullName",
        email,
        phone,
        COALESCE(recruiting_type, interested_role) AS "recruitingType",
        description,
        resume_url AS "resumeUrl",
        resume_name AS "resumeName",
        interested_role AS "interestedRole",
        company_name AS "companyName",
        created_at AS "createdAt"
      FROM registered_users
      ORDER BY created_at DESC
    `,
  )

  return NextResponse.json({ success: true, users: result.rows })
}

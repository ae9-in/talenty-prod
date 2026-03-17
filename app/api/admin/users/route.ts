import { NextResponse } from "next/server"

import { db, initializeDatabase } from "@/backend/db"

export async function GET() {
  await initializeDatabase()

  const result = await db.query(
    `
      SELECT
        id,
        full_name AS "fullName",
        email,
        phone,
        interested_role AS "interestedRole",
        company_name AS "companyName",
        created_at AS "createdAt"
      FROM registered_users
      ORDER BY created_at DESC
    `,
  )

  return NextResponse.json({ success: true, users: result.rows })
}


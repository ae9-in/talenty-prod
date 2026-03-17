import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { z } from "zod"

import { ADMIN_SESSION_COOKIE, createAdminSessionToken, verifyPassword } from "@/backend/auth"
import { db, initializeDatabase } from "@/backend/db"

const loginSchema = z.object({
  email: z.string().trim().email("A valid admin email is required."),
  password: z.string().min(6, "Password is required."),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = loginSchema.parse(body)

    await initializeDatabase()

    const result = await db.query(
      "SELECT email, password_hash, role FROM admins WHERE email = $1 LIMIT 1",
      [data.email],
    )

    const admin = result.rows[0]

    if (!admin || !verifyPassword(data.password, admin.password_hash)) {
      return NextResponse.json(
        { success: false, message: "Invalid admin credentials." },
        { status: 401 },
      )
    }

    const token = createAdminSessionToken({ email: admin.email, role: admin.role })
    const response = NextResponse.json({ success: true, redirectTo: "/admin" })

    response.cookies.set({
      name: ADMIN_SESSION_COOKIE,
      value: token,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 12,
    })

    return response
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: error.issues[0]?.message ?? "Invalid login input." },
        { status: 400 },
      )
    }

    console.error("Admin login API error:", error)
    return NextResponse.json(
      { success: false, message: "Unable to login right now." },
      { status: 500 },
    )
  }
}

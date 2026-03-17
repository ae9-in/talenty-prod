import { cookies } from "next/headers"

import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/backend/auth"
import { db, initializeDatabase } from "@/backend/db"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { AdminLoginForm } from "@/components/admin/admin-login-form"
import type { EnquiryRecord, RegisteredUserRecord } from "@/lib/types"

export default async function AdminPage() {
  const cookieStore = await cookies()
  const session = verifyAdminSessionToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value)

  if (!session) {
    return (
      <main className="min-h-screen bg-background">
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16">
          <div className="absolute inset-0">
            <div className="absolute left-20 top-20 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute right-20 bottom-10 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute inset-0 grid-bg opacity-20" />
          </div>
          <div className="relative z-10 w-full max-w-xl">
            <div className="mb-6 text-center">
              <p className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-primary">Talenty Admin</p>
              <h1 className="mt-6 text-4xl font-bold text-balance">Login Required</h1>
              <p className="mt-3 text-lg text-muted-foreground">Access to <code>/admin</code> requires admin login. Use the configured email and password to continue.</p>
            </div>
            <div className="rounded-[2rem] border border-border/40 bg-white/5 p-3 backdrop-blur-2xl">
              <AdminLoginForm />
            </div>
          </div>
        </section>
      </main>
    )
  }

  await initializeDatabase()

  const enquiriesResult = await db.query(`
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
    ORDER BY created_at DESC
  `)

  const usersResult = await db.query(`
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
  `)

  return (
    <AdminDashboard
      initialEnquiries={enquiriesResult.rows as EnquiryRecord[]}
      initialUsers={usersResult.rows as RegisteredUserRecord[]}
    />
  )
}

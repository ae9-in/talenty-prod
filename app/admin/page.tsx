import { db, initializeDatabase } from "@/backend/db"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import type { EnquiryRecord, RegisteredUserRecord } from "@/lib/types"

export default async function AdminPage() {
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


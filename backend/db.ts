import { Pool } from "pg"

import { hashPassword } from "@/backend/auth"

declare global {
  var __talentyPool: Pool | undefined
}

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error("DATABASE_URL is not set. Add it to your environment before starting the app.")
}

export const db =
  global.__talentyPool ??
  new Pool({
    connectionString,
    ssl:
      connectionString.includes("railway.app") || connectionString.includes("proxy.rlwy.net")
        ? { rejectUnauthorized: false }
        : undefined,
  })

if (process.env.NODE_ENV !== "production") {
  global.__talentyPool = db
}

let initialized = false

async function seedAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@talentyconsulting.in"
  const adminPassword = process.env.ADMIN_PASSWORD ?? "TalentyAdmin@123"
  const passwordHash = hashPassword(adminPassword)

  await db.query(
    `
      INSERT INTO admins (email, password_hash, role)
      VALUES ($1, $2, 'super_admin')
      ON CONFLICT (email) DO NOTHING
    `,
    [adminEmail, passwordHash],
  )
}

export async function initializeDatabase() {
  if (initialized) {
    return
  }

  await db.query(`
    CREATE TABLE IF NOT EXISTS admins (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'admin',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `)

  await db.query(`
    CREATE TABLE IF NOT EXISTS enquiries (
      id SERIAL PRIMARY KEY,
      full_name TEXT NOT NULL,
      company_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      requirement_type TEXT NOT NULL,
      industry TEXT NOT NULL,
      roles_required TEXT NOT NULL,
      employees_needed INTEGER NOT NULL DEFAULT 1,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      admin_notes TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `)

  await db.query(`
    CREATE TABLE IF NOT EXISTS registered_users (
      id SERIAL PRIMARY KEY,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone TEXT NOT NULL,
      interested_role TEXT NOT NULL,
      company_name TEXT,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `)

  await db.query(`
    CREATE TABLE IF NOT EXISTS consultation_requests (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      company TEXT,
      message TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `)

  await db.query(`
    CREATE TABLE IF NOT EXISTS registrations (
      id SERIAL PRIMARY KEY,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone TEXT NOT NULL,
      role_industry TEXT,
      company_name TEXT,
      password TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `)

  await db.query(`
    CREATE INDEX IF NOT EXISTS enquiries_status_idx ON enquiries (status);
  `)

  await db.query(`
    CREATE INDEX IF NOT EXISTS enquiries_created_at_idx ON enquiries (created_at DESC);
  `)

  await db.query(`
    CREATE INDEX IF NOT EXISTS registered_users_created_at_idx ON registered_users (created_at DESC);
  `)

  await seedAdmin()

  initialized = true
}


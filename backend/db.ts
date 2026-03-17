import { Pool } from "pg"

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
    ssl: connectionString.includes("railway.app") || connectionString.includes("proxy.rlwy.net")
      ? { rejectUnauthorized: false }
      : undefined,
  })

if (process.env.NODE_ENV !== "production") {
  global.__talentyPool = db
}

let initialized = false

export async function initializeDatabase() {
  if (initialized) {
    return
  }

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

  initialized = true
}

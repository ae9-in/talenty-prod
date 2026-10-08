import { Pool } from "pg"
import { MongoClient, ObjectId } from "mongodb"
import fs from "fs"
import path from "path"

import { hashPassword } from "@/backend/auth"

declare global {
  var __talentyPool: Pool | undefined
  var __talentyMongoClient: MongoClient | undefined
}

const connectionString = process.env.MONGODB_URI || process.env.DATABASE_URL

const isMongo = connectionString?.startsWith("mongodb://") || connectionString?.startsWith("mongodb+srv://")

// Initialize postgres pool conditionally
const pool =
  isMongo || !connectionString
    ? null
    : (global.__talentyPool ??
       new Pool({
         connectionString,
         ssl:
           connectionString && !connectionString.includes("localhost") && !connectionString.includes("127.0.0.1")
             ? { rejectUnauthorized: false }
             : undefined,
       }))

if (pool && process.env.NODE_ENV !== "production") {
  global.__talentyPool = pool
}

// Initialize mongo client conditionally
const mongoClient =
  !isMongo || !connectionString
    ? null
    : (global.__talentyMongoClient ?? new MongoClient(connectionString))

if (mongoClient && process.env.NODE_ENV !== "production") {
  global.__talentyMongoClient = mongoClient
}

let mongoDb: any = null
let useLocalFallback = !connectionString
const JSON_DB_PATH = path.join(
  process.env.NODE_ENV === "production" ? "/tmp" : process.cwd(),
  "database.json"
)

function readLocalDb() {
  if (!fs.existsSync(JSON_DB_PATH)) {
    const rootDbPath = path.join(process.cwd(), "database.json")
    let initialData = {
      admins: [],
      enquiries: [],
      registered_users: [],
      consultation_requests: [],
      registrations: []
    }
    if (fs.existsSync(rootDbPath)) {
      try {
        initialData = JSON.parse(fs.readFileSync(rootDbPath, "utf8"))
      } catch (err) {
        console.error("Error reading root database.json", err)
      }
    }
    try {
      fs.writeFileSync(JSON_DB_PATH, JSON.stringify(initialData, null, 2), "utf8")
    } catch (err) {
      console.error("Error writing initial database.json", err)
    }
    return initialData
  }
  try {
    return JSON.parse(fs.readFileSync(JSON_DB_PATH, "utf8"))
  } catch (err) {
    console.error("Error reading database.json, returning empty structure", err)
    return {
      admins: [],
      enquiries: [],
      registered_users: [],
      consultation_requests: [],
      registrations: []
    }
  }
}

function writeLocalDb(data: any) {
  try {
    fs.writeFileSync(JSON_DB_PATH, JSON.stringify(data, null, 2), "utf8")
  } catch (err) {
    console.error("Error writing to database.json", err)
  }
}

async function localQuery(sql: string, params: any[] = []): Promise<{ rows: any[] }> {
  const normalizedSql = sql.trim().replace(/\s+/g, " ")
  const data = readLocalDb()

  if (normalizedSql.startsWith("CREATE TABLE") || normalizedSql.startsWith("CREATE INDEX")) {
    return { rows: [] }
  }

  if (normalizedSql.includes("INSERT INTO admins")) {
    const email = params[0]
    const passwordHash = params[1]
    const role = params[2] || "super_admin"

    const existingIdx = data.admins.findIndex((a: any) => a.email.toLowerCase() === email.toLowerCase())
    if (existingIdx > -1) {
      data.admins[existingIdx].password_hash = passwordHash
      data.admins[existingIdx].role = role
    } else {
      const nextId = data.admins.reduce((max: number, a: any) => Math.max(max, a.id || 0), 0) + 1
      data.admins.push({
        id: nextId,
        email,
        password_hash: passwordHash,
        role,
        created_at: new Date().toISOString()
      })
    }
    writeLocalDb(data)
    return { rows: [] }
  }

  if (normalizedSql.includes("INSERT INTO enquiries") && normalizedSql.includes("INSERT")) {
    const nextId = data.enquiries.reduce((max: number, e: any) => Math.max(max, e.id || 0), 0) + 1
    const newEnquiry = {
      id: nextId,
      full_name: params[0],
      company_name: params[1],
      email: params[2],
      phone: params[3],
      requirement_type: params[4],
      industry: params[5],
      roles_required: params[6],
      employees_needed: Number(params[7] || 1),
      message: params[8],
      status: "pending",
      admin_notes: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    data.enquiries.push(newEnquiry)
    writeLocalDb(data)
    return { rows: [{ id: nextId }] }
  }

  if (normalizedSql.includes("INSERT INTO registered_users")) {
    const isNewFormat = params.length >= 7
    const userType = isNewFormat ? params[0] || "recruiter" : "recruiter"
    const fullName = isNewFormat ? params[1] : params[0]
    const email = isNewFormat ? params[2] : params[1]
    const phone = isNewFormat ? params[3] : params[2]
    const recruitingType = isNewFormat ? params[4] : params[3]
    const description = isNewFormat ? params[5] : null
    const resumeUrl = isNewFormat ? params[6] : null
    const resumeName = isNewFormat ? params[7] : null
    const companyName = isNewFormat ? params[8] : params[4]
    const interestedRole = isNewFormat ? params[9] || recruitingType : params[3]
    const passwordHash = isNewFormat ? params[10] : params[5]

    const exists = data.registered_users.some((u: any) => (u.email || "").toLowerCase() === (email || "").toLowerCase())
    if (exists) {
      const error: any = new Error("Unique constraint violation")
      error.code = "23505"
      throw error
    }
    const nextId = data.registered_users.reduce((max: number, u: any) => Math.max(max, u.id || 0), 0) + 1
    const newUser = {
      id: nextId,
      user_type: userType,
      full_name: fullName,
      email,
      phone,
      recruiting_type: recruitingType,
      description,
      resume_url: resumeUrl,
      resume_name: resumeName,
      company_name: companyName,
      interested_role: interestedRole,
      password_hash: passwordHash,
      created_at: new Date().toISOString()
    }
    data.registered_users.push(newUser)
    writeLocalDb(data)
    return { rows: [{ id: nextId }] }
  }

  if (normalizedSql.includes("INSERT INTO consultation_requests")) {
    const nextId = data.consultation_requests.reduce((max: number, c: any) => Math.max(max, c.id || 0), 0) + 1
    const newRequest = {
      id: nextId,
      name: params[0],
      email: params[1],
      phone: params[2],
      company: params[3],
      message: params[4],
      created_at: new Date().toISOString()
    }
    data.consultation_requests.push(newRequest)
    writeLocalDb(data)
    return { rows: [{ id: nextId }] }
  }

  if (normalizedSql.includes("FROM admins WHERE email =")) {
    const email = params[0]
    const admin = data.admins.find((a: any) => a.email.toLowerCase() === email.toLowerCase())
    return { rows: admin ? [admin] : [] }
  }

  if (normalizedSql.includes("FROM enquiries") && !normalizedSql.includes("WHERE id =")) {
    let list = [...data.enquiries]
    let paramIndex = 0
    if (normalizedSql.includes("full_name ILIKE")) {
      const searchVal = params[paramIndex++].replace(/%/g, "").toLowerCase()
      list = list.filter(e => 
        (e.full_name || "").toLowerCase().includes(searchVal) || 
        (e.company_name || "").toLowerCase().includes(searchVal)
      )
    }
    if (normalizedSql.includes("status =")) {
      const statusVal = params[paramIndex++]
      list = list.filter(e => e.status === statusVal)
    }
    if (normalizedSql.includes("industry =")) {
      const industryVal = params[paramIndex++]
      list = list.filter(e => e.industry === industryVal)
    }

    list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    const rows = list.map(e => ({
      id: e.id,
      fullName: e.full_name,
      companyName: e.company_name,
      email: e.email,
      phone: e.phone,
      requirementType: e.requirement_type,
      industry: e.industry,
      rolesRequired: e.roles_required,
      employeesNeeded: e.employees_needed,
      message: e.message,
      status: e.status,
      adminNotes: e.admin_notes,
      admin_notes: e.admin_notes,
      createdAt: e.created_at,
      updatedAt: e.updated_at
    }))
    return { rows }
  }

  if (normalizedSql.includes("FROM enquiries WHERE id =")) {
    const id = Number(params[0])
    const e = data.enquiries.find((x: any) => x.id === id)
    if (!e) return { rows: [] }
    return {
      rows: [{
        id: e.id,
        fullName: e.full_name,
        companyName: e.company_name,
        email: e.email,
        phone: e.phone,
        requirementType: e.requirement_type,
        industry: e.industry,
        rolesRequired: e.roles_required,
        employeesNeeded: e.employees_needed,
        message: e.message,
        status: e.status,
        adminNotes: e.admin_notes,
        admin_notes: e.admin_notes,
        createdAt: e.created_at,
        updatedAt: e.updated_at
      }]
    }
  }

  if (normalizedSql.includes("UPDATE enquiries")) {
    const id = Number(params[0])
    const status = params[1]
    const adminNotes = params[2]

    const idx = data.enquiries.findIndex((x: any) => x.id === id)
    if (idx === -1) return { rows: [] }

    data.enquiries[idx].status = status
    data.enquiries[idx].admin_notes = adminNotes
    data.enquiries[idx].updated_at = new Date().toISOString()

    const e = data.enquiries[idx]
    writeLocalDb(data)

    return {
      rows: [{
        id: e.id,
        fullName: e.full_name,
        companyName: e.company_name,
        email: e.email,
        phone: e.phone,
        requirementType: e.requirement_type,
        industry: e.industry,
        rolesRequired: e.roles_required,
        employeesNeeded: e.employees_needed,
        message: e.message,
        status: e.status,
        adminNotes: e.admin_notes,
        admin_notes: e.admin_notes,
        createdAt: e.created_at,
        updatedAt: e.updated_at
      }]
    }
  }

  if (normalizedSql.includes("DELETE FROM enquiries WHERE id =")) {
    const id = Number(params[0])
    const idx = data.enquiries.findIndex((x: any) => x.id === id)
    if (idx === -1) return { rows: [] }
    data.enquiries.splice(idx, 1)
    writeLocalDb(data)
    return { rows: [{ id }] }
  }

  if (normalizedSql.includes("FROM registered_users")) {
    const list = [...data.registered_users]
    list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    const rows = list.map(u => ({
      id: u.id,
      userType: u.user_type || u.userType || "recruiter",
      fullName: u.full_name || u.fullName,
      email: u.email,
      phone: u.phone,
      recruitingType: u.recruiting_type || u.recruitingType || u.interested_role || u.interestedRole || null,
      description: u.description || null,
      resumeUrl: u.resume_url || u.resumeUrl || null,
      resumeName: u.resume_name || u.resumeName || null,
      companyName: u.company_name || u.companyName || null,
      interestedRole: u.interested_role || u.interestedRole || u.recruiting_type || null,
      createdAt: u.created_at || u.createdAt
    }))
    return { rows }
  }

  if (normalizedSql.includes("SELECT NOW()")) {
    return { rows: [{ now: new Date().toISOString() }] }
  }

  return { rows: [] }
}

function getMongoIdFilter(idStr: string) {
  if (ObjectId.isValid(idStr) && idStr.length === 24) {
    return { $or: [{ _id: new ObjectId(idStr) }, { _id: idStr }] }
  }
  const num = Number(idStr)
  if (!isNaN(num)) {
    return { $or: [{ _id: num }, { _id: idStr }] }
  }
  return { _id: idStr }
}

async function mongoQuery(sql: string, params: any[] = []): Promise<{ rows: any[] }> {
  if (!mongoDb) {
    throw new Error("MongoDB database is not connected.")
  }

  const normalizedSql = sql.trim().replace(/\s+/g, " ")

  if (normalizedSql.startsWith("CREATE TABLE") || normalizedSql.startsWith("CREATE INDEX")) {
    return { rows: [] }
  }

  if (normalizedSql.includes("INSERT INTO admins")) {
    const email = params[0]
    const passwordHash = params[1]
    const role = params[2] || "super_admin"

    await mongoDb.collection("admins").updateOne(
      { email: email.toLowerCase() },
      {
        $set: {
          email: email.toLowerCase(),
          password_hash: passwordHash,
          role,
          updated_at: new Date().toISOString()
        },
        $setOnInsert: {
          created_at: new Date().toISOString()
        }
      },
      { upsert: true }
    )
    return { rows: [] }
  }

  if (normalizedSql.includes("INSERT INTO enquiries") && normalizedSql.includes("INSERT")) {
    const doc = {
      full_name: params[0],
      company_name: params[1],
      email: params[2],
      phone: params[3],
      requirement_type: params[4],
      industry: params[5],
      roles_required: params[6],
      employees_needed: Number(params[7] || 1),
      message: params[8],
      status: "pending",
      admin_notes: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    const res = await mongoDb.collection("enquiries").insertOne(doc)
    return { rows: [{ id: res.insertedId.toString() }] }
  }

  if (normalizedSql.includes("INSERT INTO registered_users")) {
    const isNewFormat = params.length >= 7
    const userType = isNewFormat ? params[0] || "recruiter" : "recruiter"
    const fullName = isNewFormat ? params[1] : params[0]
    const email = (isNewFormat ? params[2] : params[1]).toLowerCase()
    const phone = isNewFormat ? params[3] : params[2]
    const recruitingType = isNewFormat ? params[4] : params[3]
    const description = isNewFormat ? params[5] : null
    const resumeUrl = isNewFormat ? params[6] : null
    const resumeName = isNewFormat ? params[7] : null
    const companyName = isNewFormat ? params[8] : params[4]
    const interestedRole = isNewFormat ? params[9] || recruitingType : params[3]
    const passwordHash = isNewFormat ? params[10] : params[5]

    const exists = await mongoDb.collection("registered_users").findOne({ email })
    if (exists) {
      const error: any = new Error("Unique constraint violation")
      error.code = "23505"
      throw error
    }

    const doc = {
      user_type: userType,
      full_name: fullName,
      email,
      phone,
      recruiting_type: recruitingType,
      description,
      resume_url: resumeUrl,
      resume_name: resumeName,
      company_name: companyName,
      interested_role: interestedRole,
      password_hash: passwordHash,
      created_at: new Date().toISOString()
    }
    const res = await mongoDb.collection("registered_users").insertOne(doc)
    return { rows: [{ id: res.insertedId.toString() }] }
  }

  if (normalizedSql.includes("INSERT INTO consultation_requests")) {
    const doc = {
      name: params[0],
      email: params[1],
      phone: params[2],
      company: params[3],
      message: params[4],
      created_at: new Date().toISOString()
    }
    const res = await mongoDb.collection("consultation_requests").insertOne(doc)
    return { rows: [{ id: res.insertedId.toString() }] }
  }

  if (normalizedSql.includes("FROM admins WHERE email =")) {
    const email = params[0].toLowerCase()
    const admin = await mongoDb.collection("admins").findOne({ email })
    return {
      rows: admin ? [{
        id: admin._id.toString(),
        email: admin.email,
        password_hash: admin.password_hash,
        role: admin.role,
        created_at: admin.created_at
      }] : []
    }
  }

  if (normalizedSql.includes("FROM enquiries") && !normalizedSql.includes("WHERE id =")) {
    const queryObj: any = {}
    let paramIndex = 0

    if (normalizedSql.includes("full_name ILIKE")) {
      const searchVal = params[paramIndex++].replace(/%/g, "")
      queryObj.$or = [
        { full_name: { $regex: searchVal, $options: "i" } },
        { company_name: { $regex: searchVal, $options: "i" } }
      ]
    }
    if (normalizedSql.includes("status =")) {
      queryObj.status = params[paramIndex++]
    }
    if (normalizedSql.includes("industry =")) {
      queryObj.industry = params[paramIndex++]
    }

    const list = await mongoDb.collection("enquiries")
      .find(queryObj)
      .sort({ created_at: -1 })
      .toArray()

    const rows = list.map((e: any) => ({
      id: e._id.toString(),
      fullName: e.full_name,
      companyName: e.company_name,
      email: e.email,
      phone: e.phone,
      requirementType: e.requirement_type,
      industry: e.industry,
      rolesRequired: e.roles_required,
      employeesNeeded: e.employees_needed,
      message: e.message,
      status: e.status,
      adminNotes: e.admin_notes,
      admin_notes: e.admin_notes,
      createdAt: e.created_at,
      updatedAt: e.updated_at
    }))
    return { rows }
  }

  if (normalizedSql.includes("FROM enquiries WHERE id =")) {
    const idStr = String(params[0])
    const filter = getMongoIdFilter(idStr)
    const e = await mongoDb.collection("enquiries").findOne(filter)
    if (!e) return { rows: [] }
    return {
      rows: [{
        id: e._id.toString(),
        fullName: e.full_name,
        companyName: e.company_name,
        email: e.email,
        phone: e.phone,
        requirementType: e.requirement_type,
        industry: e.industry,
        rolesRequired: e.roles_required,
        employeesNeeded: e.employees_needed,
        message: e.message,
        status: e.status,
        adminNotes: e.admin_notes,
        admin_notes: e.admin_notes,
        createdAt: e.created_at,
        updatedAt: e.updated_at
      }]
    }
  }

  if (normalizedSql.includes("UPDATE enquiries")) {
    const idStr = String(params[0])
    const status = params[1]
    const adminNotes = params[2]
    const filter = getMongoIdFilter(idStr)

    await mongoDb.collection("enquiries").updateOne(
      filter,
      {
        $set: {
          status,
          admin_notes: adminNotes,
          updated_at: new Date().toISOString()
        }
      }
    )

    const e = await mongoDb.collection("enquiries").findOne(filter)
    if (!e) return { rows: [] }
    return {
      rows: [{
        id: e._id.toString(),
        fullName: e.full_name,
        companyName: e.company_name,
        email: e.email,
        phone: e.phone,
        requirementType: e.requirement_type,
        industry: e.industry,
        rolesRequired: e.roles_required,
        employeesNeeded: e.employees_needed,
        message: e.message,
        status: e.status,
        adminNotes: e.admin_notes,
        admin_notes: e.admin_notes,
        createdAt: e.created_at,
        updatedAt: e.updated_at
      }]
    }
  }

  if (normalizedSql.includes("DELETE FROM enquiries WHERE id =")) {
    const idStr = String(params[0])
    const filter = getMongoIdFilter(idStr)

    const res = await mongoDb.collection("enquiries").deleteOne(filter)
    if (res.deletedCount === 0) return { rows: [] }
    return { rows: [{ id: idStr }] }
  }

  if (normalizedSql.includes("FROM registered_users")) {
    const list = await mongoDb.collection("registered_users")
      .find({})
      .sort({ created_at: -1 })
      .toArray()

    const rows = list.map((u: any) => ({
      id: u._id.toString(),
      userType: u.user_type || u.userType || "recruiter",
      fullName: u.full_name || u.fullName,
      email: u.email,
      phone: u.phone,
      recruitingType: u.recruiting_type || u.recruitingType || u.interested_role || u.interestedRole || null,
      description: u.description || null,
      resumeUrl: u.resume_url || u.resumeUrl || null,
      resumeName: u.resume_name || u.resumeName || null,
      companyName: u.company_name || u.companyName || null,
      interestedRole: u.interested_role || u.interestedRole || u.recruiting_type || null,
      createdAt: u.created_at || u.createdAt
    }))
    return { rows }
  }

  if (normalizedSql.includes("SELECT NOW()")) {
    return { rows: [{ now: new Date().toISOString() }] }
  }

  return { rows: [] }
}

export const db = {
  async query(sql: string, params: any[] = []): Promise<{ rows: any[] }> {
    if (useLocalFallback) {
      return localQuery(sql, params)
    }
    if (isMongo) {
      try {
        return await mongoQuery(sql, params)
      } catch (error: any) {
        console.warn("MongoDB query failed. Falling back to local JSON database. Error:", error.message || error)
        useLocalFallback = true
        return localQuery(sql, params)
      }
    }
    if (pool) {
      try {
        return await pool.query(sql, params)
      } catch (error: any) {
        console.warn("Database query failed. Falling back to local JSON database. Error:", error.message || error)
        useLocalFallback = true
        return localQuery(sql, params)
      }
    }
    useLocalFallback = true
    return localQuery(sql, params)
  }
}

let initialized = false

async function seedAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "connect@talentyconsulting.in"
  const adminPassword = process.env.ADMIN_PASSWORD ?? "password123"
  const passwordHash = hashPassword(adminPassword)

  await db.query(
    `
      INSERT INTO admins (email, password_hash, role)
      VALUES ($1, $2, 'super_admin')
      ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash, role = EXCLUDED.role
    `,
    [adminEmail, passwordHash],
  )
}

export async function initializeDatabase() {
  if (initialized) {
    return
  }

  try {
    if (useLocalFallback) {
      await seedAdmin()
      initialized = true
      return
    }

    if (isMongo && mongoClient) {
      await mongoClient.connect()
      mongoDb = mongoClient.db()

      // Ensure index constraints
      await mongoDb.collection("admins").createIndex({ email: 1 }, { unique: true })
      await mongoDb.collection("registered_users").createIndex({ email: 1 }, { unique: true })
      await mongoDb.collection("registrations").createIndex({ email: 1 }, { unique: true })
      await mongoDb.collection("enquiries").createIndex({ status: 1 })
      await mongoDb.collection("enquiries").createIndex({ created_at: -1 })
      await mongoDb.collection("registered_users").createIndex({ created_at: -1 })

      await seedAdmin()
      initialized = true
      return
    }

    if (pool) {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS admins (
          id SERIAL PRIMARY KEY,
          email TEXT NOT NULL UNIQUE,
          password_hash TEXT NOT NULL,
          role TEXT NOT NULL DEFAULT 'admin',
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `)

      await pool.query(`
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

      await pool.query(`
        CREATE TABLE IF NOT EXISTS registered_users (
          id SERIAL PRIMARY KEY,
          user_type TEXT NOT NULL DEFAULT 'recruiter',
          full_name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          phone TEXT NOT NULL,
          recruiting_type TEXT,
          description TEXT,
          resume_url TEXT,
          resume_name TEXT,
          interested_role TEXT,
          company_name TEXT,
          password_hash TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
        ALTER TABLE registered_users ADD COLUMN IF NOT EXISTS user_type TEXT DEFAULT 'recruiter';
        ALTER TABLE registered_users ADD COLUMN IF NOT EXISTS recruiting_type TEXT;
        ALTER TABLE registered_users ADD COLUMN IF NOT EXISTS description TEXT;
        ALTER TABLE registered_users ADD COLUMN IF NOT EXISTS resume_url TEXT;
        ALTER TABLE registered_users ADD COLUMN IF NOT EXISTS resume_name TEXT;
        ALTER TABLE registered_users ALTER COLUMN password_hash DROP NOT NULL;
        ALTER TABLE registered_users ALTER COLUMN interested_role DROP NOT NULL;
      `)

      await pool.query(`
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

      await pool.query(`
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

      await pool.query(`
        CREATE INDEX IF NOT EXISTS enquiries_status_idx ON enquiries (status);
      `)

      await pool.query(`
        CREATE INDEX IF NOT EXISTS enquiries_created_at_idx ON enquiries (created_at DESC);
      `)

      await pool.query(`
        CREATE INDEX IF NOT EXISTS registered_users_created_at_idx ON registered_users (created_at DESC);
      `)

      await seedAdmin()
      initialized = true
    }
  } catch (error: any) {
    console.error("Database initialization error:", error)
    if (!useLocalFallback) {
      console.warn("Retrying initialization with local JSON database fallback...")
      useLocalFallback = true
      initialized = false
      await initializeDatabase()
    } else {
      throw error
    }
  }
}

import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto"

export const ADMIN_SESSION_COOKIE = "talenty_admin_session"
const SESSION_TTL_MS = 1000 * 60 * 60 * 12

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? "talenty-consulting-admin-session-secret"
}

function toBase64Url(value: string) {
  return Buffer.from(value).toString("base64url")
}

function fromBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8")
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex")
  const hash = scryptSync(password, salt, 64).toString("hex")
  return `${salt}:${hash}`
}

export function verifyPassword(password: string, passwordHash: string) {
  const [salt, storedHash] = passwordHash.split(":")

  if (!salt || !storedHash) {
    return false
  }

  const derivedHash = scryptSync(password, salt, 64).toString("hex")
  return timingSafeEqual(Buffer.from(storedHash, "hex"), Buffer.from(derivedHash, "hex"))
}

function signValue(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("base64url")
}

export function createAdminSessionToken(payload: { email: string; role: string }) {
  const body = JSON.stringify({
    ...payload,
    exp: Date.now() + SESSION_TTL_MS,
  })

  const encoded = toBase64Url(body)
  const signature = signValue(encoded)
  return `${encoded}.${signature}`
}

export function verifyAdminSessionToken(token?: string | null) {
  if (!token) {
    return null
  }

  const [encoded, signature] = token.split(".")

  if (!encoded || !signature || signValue(encoded) !== signature) {
    return null
  }

  try {
    const payload = JSON.parse(fromBase64Url(encoded)) as {
      email: string
      role: string
      exp: number
    }

    if (payload.exp < Date.now()) {
      return null
    }

    return payload
  } catch {
    return null
  }
}


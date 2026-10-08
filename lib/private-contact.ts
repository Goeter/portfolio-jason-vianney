import { timingSafeEqual } from "node:crypto"

/**
 * Personal contact details and recruiter access keys.
 *
 * Read from server-only env vars so they never ship in the client bundle or the public
 * GitHub repo. Import this file only from route handlers and server components.
 */

export const privateContact = {
  /** Where the contact form delivers, and shown on /for-recruiters. */
  email: process.env.CONTACT_EMAIL || "",
  /** Digits only, with country code, e.g. 628xxxxxxxxxx. */
  whatsapp: (process.env.CONTACT_WHATSAPP || "").replace(/\D/g, ""),
  /** Full resume (with phone number) — a Drive link restricted to viewers. */
  fullResumeUrl: process.env.RECRUITER_RESUME_URL || "",
  /** Folder with the unredacted certificates, for recruiters who need to verify them. */
  documentsUrl: process.env.RECRUITER_DOCUMENTS_URL || "",
}

export const formatWhatsapp = (digits: string) =>
  digits.startsWith("62")
    ? `+62 ${digits.slice(2).replace(/(\d{3})(\d{4})(\d+)/, "$1 $2 $3")}`
    : `+${digits}`

type RecruiterKey = { company: string; key: string; expiresAt: Date | null }

/**
 * RECRUITER_KEYS="acme:k3y-for-acme:2026-12-31,globex:another-key"
 * One key per company, so a leaked link can be revoked without touching the others.
 * The expiry date is optional and inclusive (valid through the end of that day, UTC).
 */
function parseRecruiterKeys(): RecruiterKey[] {
  return (process.env.RECRUITER_KEYS || "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .flatMap((entry) => {
      const [company, key, expiry] = entry.split(":").map((part) => part.trim())
      if (!company || !key || key.length < 12) return []
      const expiresAt = expiry ? new Date(`${expiry}T23:59:59Z`) : null
      if (expiresAt && Number.isNaN(expiresAt.getTime())) return []
      return [{ company, key, expiresAt }]
    })
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a)
  const right = Buffer.from(b)
  return left.length === right.length && timingSafeEqual(left, right)
}

/** Returns the company the key was issued to, or null when it is unknown or expired. */
export function verifyRecruiterKey(candidate: string | undefined) {
  if (!candidate || candidate.length > 200) return null
  const now = Date.now()
  const match = parseRecruiterKeys().find((entry) => safeEqual(entry.key, candidate))
  if (!match) return null
  if (match.expiresAt && match.expiresAt.getTime() < now) return null
  return match
}

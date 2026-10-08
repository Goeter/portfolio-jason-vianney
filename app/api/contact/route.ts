import { NextResponse, type NextRequest } from "next/server"

import { privateContact } from "@/lib/private-contact"

export const dynamic = "force-dynamic"

const RESEND_ENDPOINT = "https://api.resend.com/emails"
const TURNSTILE_ENDPOINT = "https://challenges.cloudflare.com/turnstile/v0/siteverify"
const REQUEST_TIMEOUT_MS = 10_000

const LIMITS = { name: 80, email: 254, company: 100, message: 2000 }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Best-effort burst guard per warm instance; Turnstile is what actually stops bots. */
const RATE_WINDOW_MS = 10 * 60_000
const RATE_MAX_PER_WINDOW = 3
const hits = new Map<string, number[]>()

function isRateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)

  // keep the map from growing without bound on a long-lived instance
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (!times.length || now - times[times.length - 1] > RATE_WINDOW_MS) hits.delete(key)
    }
  }

  return recent.length > RATE_MAX_PER_WINDOW
}

/** Single line, no control characters — these values end up in the subject line. */
const cleanLine = (value: unknown, max: number) =>
  typeof value === "string" ? value.replace(/[\u0000-\u001f\u007f]+/g, " ").trim().slice(0, max) : ""

const cleanText = (value: unknown, max: number) =>
  typeof value === "string" ? value.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0009\u000b-\u001f\u007f]+/g, "").trim().slice(0, max) : ""

async function verifyTurnstile(token: string, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY
  // Not configured (local dev): fall back to the honeypot and rate limit alone.
  if (!secret) return true
  if (!token) return false

  const body = new URLSearchParams({ secret, response: token })
  if (ip !== "unknown") body.set("remoteip", ip)

  try {
    const res = await fetch(TURNSTILE_ENDPOINT, {
      method: "POST",
      body,
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    })
    const data = (await res.json()) as { success?: boolean }
    return data.success === true
  } catch {
    return false
  }
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY
  const to = privateContact.email

  // Nothing to deliver to — the form tells the visitor to use LinkedIn instead.
  if (!apiKey || !to) {
    return NextResponse.json({ status: "disabled" }, { status: 503 })
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"

  if (isRateLimited(ip)) {
    return NextResponse.json({ status: "rate_limited" }, { status: 429 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ status: "invalid" }, { status: 400 })
  }

  // Honeypot: hidden from people, filled in by naive bots. Pretend it worked.
  if (cleanLine(body.website, 200)) {
    return NextResponse.json({ status: "sent" })
  }

  const name = cleanLine(body.name, LIMITS.name)
  const email = cleanLine(body.email, LIMITS.email)
  const company = cleanLine(body.company, LIMITS.company)
  const message = cleanText(body.message, LIMITS.message)

  if (name.length < 2 || !EMAIL_PATTERN.test(email) || message.length < 10) {
    return NextResponse.json({ status: "invalid" }, { status: 400 })
  }

  if (!(await verifyTurnstile(cleanLine(body.turnstileToken, 2048), ip))) {
    return NextResponse.json({ status: "captcha" }, { status: 400 })
  }

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: `Portfolio message from ${name}${company ? ` (${company})` : ""}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          company ? `Company: ${company}` : null,
          "",
          message,
        ]
          .filter((line) => line !== null)
          .join("\n"),
      }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    })

    if (!res.ok) {
      console.error("Resend rejected the contact message:", res.status, await res.text())
      return NextResponse.json({ status: "error" }, { status: 502 })
    }
  } catch (err) {
    console.error("Contact message failed:", err)
    return NextResponse.json({ status: "error" }, { status: 502 })
  }

  return NextResponse.json({ status: "sent" })
}

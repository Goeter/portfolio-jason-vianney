import { NextResponse, type NextRequest } from "next/server"
import { addVisitorLog, parseUserAgent } from "@/lib/visitor-store"

async function fetchGeoFromIp(ip: string) {
  if (!ip || ip === "127.0.0.1" || ip === "::1" || ip.startsWith("192.168.") || ip.startsWith("10.")) {
    return {
      city: "Localhost",
      region: "Local Dev",
      country: "Local System",
      countryCode: "LOCAL",
      isp: "Development Machine",
      org: "Local Network",
    }
  }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 2000)

    const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,countryCode,regionName,city,isp,org`, {
      signal: controller.signal,
    })
    clearTimeout(timeout)

    if (res.ok) {
      const data = await res.json()
      if (data.status === "success") {
        return {
          city: data.city || "Unknown City",
          region: data.regionName || "Unknown Region",
          country: data.country || "Unknown Country",
          countryCode: data.countryCode || "UN",
          isp: data.isp || "Unknown ISP",
          org: data.org || "Unknown Org",
        }
      }
    }
  } catch {
    // Silently fall back if geo IP service fails or times out
  }

  return {
    city: "Unknown City",
    region: "Unknown Region",
    country: "Unknown Country",
    countryCode: "UN",
    isp: "Unknown ISP",
    org: "Unknown Org",
  }
}

async function sendTelegramAlert(log: ReturnType<typeof addVisitorLog>) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) return

  const message = `🚨 <b>New Portfolio Visitor!</b>\n\n` +
    `📍 <b>Location:</b> ${log.city || "Unknown"}, ${log.country || "Unknown"} (${log.countryCode || ""})\n` +
    `🌐 <b>IP:</b> <code>${log.ip}</code>\n` +
    `🏢 <b>ISP/Org:</b> ${log.isp || "N/A"}\n` +
    `🔗 <b>Ref Parameter:</b> <code>${log.ref || "Direct / None"}</code>\n` +
    `📄 <b>Page Path:</b> <code>${log.path}</code>\n` +
    `💻 <b>Device:</b> ${log.deviceType} (${log.os} • ${log.browser})\n` +
    `⏰ <b>Time:</b> ${new Date(log.timestamp).toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })}`

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    })
  } catch (err) {
    console.error("Failed to send Telegram alert:", err)
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const { path = "/", ref = "", userAgent = "", screen = "" } = body

    // Detect client IP
    const xForwardedFor = req.headers.get("x-forwarded-for")
    const xRealIp = req.headers.get("x-real-ip")
    let rawIp = xForwardedFor ? xForwardedFor.split(",")[0].trim() : xRealIp || "127.0.0.1"

    if (rawIp === "::1") rawIp = "127.0.0.1"

    // Check Vercel edge headers first
    const vercelCountry = req.headers.get("x-vercel-ip-country")
    const vercelCity = req.headers.get("x-vercel-ip-city")
    const vercelRegion = req.headers.get("x-vercel-ip-country-region")

    let geo = {
      city: vercelCity || "Unknown City",
      region: vercelRegion || "Unknown Region",
      country: vercelCountry || "Unknown Country",
      countryCode: vercelCountry || "UN",
      isp: "Vercel Edge Network",
      org: "Vercel Edge",
    }

    if (!vercelCountry) {
      geo = await fetchGeoFromIp(rawIp)
    }

    const clientUa = userAgent || req.headers.get("user-agent") || ""
    const { deviceType, browser, os } = parseUserAgent(clientUa)

    const createdLog = addVisitorLog({
      ip: rawIp,
      city: decodeURIComponent(geo.city),
      region: geo.region,
      country: geo.country,
      countryCode: geo.countryCode,
      isp: geo.isp,
      org: geo.org,
      userAgent: clientUa,
      deviceType,
      browser,
      os,
      path,
      ref: ref ? decodeURIComponent(ref) : "Direct / None",
      screen,
    })

    // Fire & forget Telegram alert if enabled
    sendTelegramAlert(createdLog).catch(() => {})

    return NextResponse.json({ success: true, logId: createdLog.id })
  } catch (error) {
    console.error("Error in track-visitor API:", error)
    return NextResponse.json({ success: false, error: "Internal error" }, { status: 500 })
  }
}

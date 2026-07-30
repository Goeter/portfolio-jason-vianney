import { NextResponse, type NextRequest } from "next/server"
import { getVisitorLogs } from "@/lib/visitor-store"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const pin = searchParams.get("pin") || req.headers.get("x-admin-pin")
  const expectedPin = process.env.VISITOR_DASHBOARD_PIN || "123456"

  if (pin !== expectedPin) {
    return NextResponse.json({ success: false, error: "Unauthorized: Invalid PIN" }, { status: 401 })
  }

  const logs = getVisitorLogs()

  // Calculate aggregated analytics
  const totalViews = logs.length
  const uniqueIps = new Set(logs.map((l) => l.ip)).size

  const refCounts: Record<string, number> = {}
  const cityCounts: Record<string, number> = {}
  const deviceCounts: Record<string, number> = {}

  logs.forEach((log) => {
    const refKey = log.ref || "Direct / None"
    refCounts[refKey] = (refCounts[refKey] || 0) + 1

    const cityKey = log.city ? `${log.city}, ${log.country}` : "Unknown Location"
    cityCounts[cityKey] = (cityCounts[cityKey] || 0) + 1

    const devKey = log.deviceType || "Desktop"
    deviceCounts[devKey] = (deviceCounts[devKey] || 0) + 1
  })

  const topReferrals = Object.entries(refCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([ref, count]) => ({ ref, count }))

  const topLocations = Object.entries(cityCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([location, count]) => ({ location, count }))

  return NextResponse.json({
    success: true,
    stats: {
      totalViews,
      uniqueIps,
      topReferrals,
      topLocations,
      deviceCounts,
    },
    logs,
  })
}

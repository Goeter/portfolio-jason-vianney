"use client"

import { useEffect, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export default function VisitorTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lastTrackedPath = useRef<string | null>(null)

  useEffect(() => {
    // Read ?ref= query parameter if present
    const refParam = searchParams.get("ref")

    if (refParam) {
      try {
        sessionStorage.setItem("portfolio_ref_source", refParam)
      } catch {
        // Ignore session storage errors
      }
    }

    let storedRef = refParam
    if (!storedRef) {
      try {
        storedRef = sessionStorage.getItem("portfolio_ref_source")
      } catch {
        // Ignore
      }
    }

    const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`

    // Avoid duplicate tracking on exact same path re-render
    if (lastTrackedPath.current === currentUrl) return
    lastTrackedPath.current = currentUrl

    const payload = {
      path: currentUrl,
      ref: storedRef || (document.referrer ? new URL(document.referrer).hostname : "Direct / None"),
      userAgent: navigator.userAgent,
      screen: `${window.screen.width}x${window.screen.height}`,
    }

    // Send payload in non-blocking background request
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(payload)], { type: "application/json" })
      navigator.sendBeacon("/api/track-visitor", blob)
    } else {
      fetch("/api/track-visitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {})
    }
  }, [pathname, searchParams])

  return null
}

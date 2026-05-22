"use client"

import { useEffect } from "react"

const SCROLLBAR_VISIBLE_MS = 850

export default function OverlayScrollbars() {
  useEffect(() => {
    let timeoutId: number | null = null

    const showScrollbar = () => {
      document.documentElement.dataset.scrolling = "true"

      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }

      timeoutId = window.setTimeout(() => {
        delete document.documentElement.dataset.scrolling
      }, SCROLLBAR_VISIBLE_MS)
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (window.innerWidth - event.clientX <= 24) {
        showScrollbar()
      }
    }

    window.addEventListener("scroll", showScrollbar, { passive: true })
    window.addEventListener("wheel", showScrollbar, { passive: true })
    window.addEventListener("touchmove", showScrollbar, { passive: true })
    window.addEventListener("pointermove", handlePointerMove, { passive: true })

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }

      window.removeEventListener("scroll", showScrollbar)
      window.removeEventListener("wheel", showScrollbar)
      window.removeEventListener("touchmove", showScrollbar)
      window.removeEventListener("pointermove", handlePointerMove)
    }
  }, [])

  return null
}

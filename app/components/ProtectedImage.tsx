"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

/**
 * Draws an image onto a <canvas> instead of an <img>, so the page (and Inspect Element)
 * never holds a URL that can be opened or saved. Used for certificates, which are only
 * served by /api/certificate to this site's own fetch.
 */

// Card and preview dialog show the same certificate, so decode it once.
const bitmapCache = new Map<string, Promise<ImageBitmap>>()

function loadBitmap(src: string) {
  let pending = bitmapCache.get(src)
  if (!pending) {
    pending = fetch(src, { headers: { "x-certificate-view": "1" }, credentials: "same-origin" })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load image (${res.status})`)
        return res.blob()
      })
      .then((blob) => createImageBitmap(blob))
    pending.catch(() => bitmapCache.delete(src))
    bitmapCache.set(src, pending)
  }
  return pending
}

interface ProtectedImageProps {
  src: string
  alt: string
  className?: string
}

export default function ProtectedImage({ src, alt, className }: ProtectedImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoaded(false)

    loadBitmap(src)
      .then((bitmap) => {
        const canvas = canvasRef.current
        if (cancelled || !canvas) return
        canvas.width = bitmap.width
        canvas.height = bitmap.height
        canvas.getContext("2d")?.drawImage(bitmap, 0, 0)
        setLoaded(true)
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [src])

  return (
    <canvas
      ref={canvasRef}
      width={16}
      height={10}
      role="img"
      aria-label={alt}
      className={cn("transition-opacity duration-500", loaded ? "opacity-100" : "opacity-0", className)}
    />
  )
}

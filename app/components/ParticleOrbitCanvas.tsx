"use client"

import { useEffect, useRef } from "react"

type Props = {
  progress: number
}

export default function ParticleOrbitCanvas({ progress }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener("resize", resize)

    let frame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const cx = canvas.width / 2
      const cy = canvas.height / 2

      const energy = progress / 100

      // ================= CORE IRON MAN RING =================
      const radius = 85

      // glow pulse (alive feel)
      const pulse = 1 + Math.sin(Date.now() * 0.004) * 0.03 + energy * 0.1

      ctx.save()

      ctx.beginPath()
      ctx.arc(cx, cy, radius * pulse, 0, Math.PI * 2)

      // gradient stroke (iron man style cyan arc reactor)
      const gradient = ctx.createRadialGradient(cx, cy, 10, cx, cy, radius)
      gradient.addColorStop(0, "rgba(0, 229, 255, 0.9)")
      gradient.addColorStop(0.4, "rgba(0, 170, 255, 0.5)")
      gradient.addColorStop(1, "rgba(0, 229, 255, 0.1)")

      ctx.strokeStyle = gradient
      ctx.lineWidth = 2 + energy * 2

      ctx.shadowColor = "rgba(0,229,255,0.8)"
      ctx.shadowBlur = 25

      ctx.stroke()
      ctx.restore()

      // ================= INNER ENERGY GLOW =================
      ctx.beginPath()
      ctx.arc(cx, cy, radius * 0.6, 0, Math.PI * 2)

      ctx.fillStyle = `rgba(0, 229, 255, ${0.05 + energy * 0.1})`
      ctx.shadowColor = "rgba(0,229,255,0.5)"
      ctx.shadowBlur = 30

      ctx.fill()

      // ================= MICRO ENERGY FLICKER =================
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + Date.now() * 0.001
        const x = cx + Math.cos(angle) * radius
        const y = cy + Math.sin(angle) * radius

        ctx.beginPath()
        ctx.arc(x, y, 1.2, 0, Math.PI * 2)

        ctx.fillStyle = "rgba(0,229,255,0.6)"
        ctx.shadowBlur = 10
        ctx.fill()
      }

      frame = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(frame)
  }, [progress])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  )
}

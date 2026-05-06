"use client"

import { useEffect, useRef } from "react"

type Props = {
  progress: number // 0 - 100
}

type Particle = {
  angle: number
  radius: number
  speed: number
  size: number
  targetRadius: number
}

type Shockwave = {
  radius: number
  alpha: number
}

export default function ParticleOrbitCanvas({ progress }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const particles = useRef<Particle[]>([])
  const shockwaves = useRef<Shockwave[]>([])

  const lastPulseRef = useRef(0)

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

    // ================= INIT PARTICLES =================
    particles.current = Array.from({ length: 45 }).map(() => ({
      angle: Math.random() * Math.PI * 2,
      radius: 60 + Math.random() * 120,
      targetRadius: 60 + Math.random() * 120,
      speed: 0.002 + Math.random() * 0.003,
      size: 1 + Math.random() * 1.4
    }))

    let frame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const cx = canvas.width / 2
      const cy = canvas.height / 2

      const energy = progress / 100

      // ================= SHOCKWAVE TRIGGER =================
      const shouldPulse =
        Math.floor(progress / 25) > Math.floor(lastPulseRef.current / 25)

      if (shouldPulse && progress > 5) {
        shockwaves.current.push({
          radius: 0,
          alpha: 0.5
        })

        lastPulseRef.current = progress
      }

      // ================= DRAW SHOCKWAVES =================
      shockwaves.current.forEach((s, i) => {
        s.radius += 3
        s.alpha *= 0.96

        ctx.beginPath()
        ctx.arc(cx, cy, s.radius, 0, Math.PI * 2)

        ctx.strokeStyle = `rgba(0,229,255,${s.alpha})`
        ctx.lineWidth = 2
        ctx.shadowColor = "rgba(0,229,255,0.5)"
        ctx.shadowBlur = 20
        ctx.stroke()

        if (s.alpha < 0.01) {
          shockwaves.current.splice(i, 1)
        }
      })

      // ================= PARTICLES =================
      particles.current.forEach((p) => {
        // 🌊 MAGNETIC PULL EFFECT
        const pullStrength = energy * 0.08

        p.targetRadius = p.radius * (1 - energy * 0.35)

        // smooth lerp ke center
        p.radius += (p.targetRadius - p.radius) * pullStrength

        // orbit speed naik saat energy naik
        p.angle += p.speed * (1 + energy * 2)

        const x = cx + Math.cos(p.angle) * p.radius
        const y = cy + Math.sin(p.angle) * p.radius

        // DRAW PARTICLE
        ctx.beginPath()
        ctx.arc(x, y, p.size, 0, Math.PI * 2)

        ctx.fillStyle = `rgba(0, 229, 255, ${0.25 + energy * 0.3})`
        ctx.shadowColor = "rgba(0,229,255,0.8)"
        ctx.shadowBlur = 12

        ctx.fill()
      })

      // ================= CORE ENERGY RING =================
      ctx.beginPath()
      ctx.arc(cx, cy, 80 + energy * 40, 0, Math.PI * 2)

      ctx.strokeStyle = `rgba(0,229,255,${0.15 + energy * 0.3})`
      ctx.lineWidth = 1.5
      ctx.shadowColor = "rgba(0,229,255,0.4)"
      ctx.shadowBlur = 20

      ctx.stroke()

      frame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("resize", resize)
    }
  }, [progress])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  )
}

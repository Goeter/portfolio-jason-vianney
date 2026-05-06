"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type Props = {
  className?: string
}

const COLORS = {
  bg: "#020617",
  cyan: "#22d3ee",
  blue: "#3b82f6",
  white: "#e0f2fe",
  purple: "#8b5cf6",
  steel: "#64748b",
  glow: "#67e8f9",
}

type Particle = {
  angle: number
  radius: number
  speed: number
  size: number
  depth: number
}

export default function ArcReactorCanvas({
  className,
}: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")

    if (!ctx) return

    let raf = 0
    let t = 0

    const start = performance.now()
    const DURATION = 8000

    const particles = createParticles(260)
    const sparks = createParticles(80)

    function resize() {
      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2,
      )

      const { clientWidth: w, clientHeight: h } =
        canvas

      canvas.width = w * dpr
      canvas.height = h * dpr

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()

    window.addEventListener("resize", resize)

    function animate(now: number) {
      t += 0.01

      const progress = Math.min(
        (now - start) / DURATION,
        1,
      )

      drawScene(
        ctx,
        canvas,
        t,
        progress,
        particles,
        sparks,
      )

      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener(
        "resize",
        resize,
      )
    }
  }, [])

  return (
    <canvas
      ref={ref}
      className={cn(
        "w-full h-full",
        className,
      )}
    />
  )
}

/* =========================
   PARTICLES
========================= */

function createParticles(
  count: number,
): Particle[] {
  return Array.from({ length: count }).map(
    () => ({
      angle: Math.random() * Math.PI * 2,
      radius: 80 + Math.random() * 340,
      speed: 0.002 + Math.random() * 0.015,
      size: 1 + Math.random() * 3,
      depth: Math.random(),
    }),
  )
}

/* =========================
   MAIN DRAW
========================= */

function drawScene(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  t: number,
  progress: number,
  particles: Particle[],
  sparks: Particle[],
) {
  const w = canvas.clientWidth
  const h = canvas.clientHeight

  const cx = w / 2
  const cy = h / 2

  ctx.clearRect(0, 0, w, h)

  drawBackground(ctx, w, h, cx, cy)

  drawEnergyFog(ctx, cx, cy, t)

  draw3DParticles(
    ctx,
    cx,
    cy,
    t,
    progress,
    particles,
  )

  drawOuterMechanicalRing(
    ctx,
    cx,
    cy,
    t,
  )

  drawAtomicSystem(
    ctx,
    cx,
    cy,
    t,
    progress,
  )

  drawCoreReactor(
    ctx,
    cx,
    cy,
    t,
    progress,
  )

  drawEnergyPulse(
    ctx,
    cx,
    cy,
    t,
    progress,
  )

  drawElectricSparks(
    ctx,
    cx,
    cy,
    t,
    sparks,
  )

  if (progress >= 0.98) {
    drawSingularity(
      ctx,
      cx,
      cy,
      t,
    )
  }
}

/* =========================
   BACKGROUND
========================= */

function drawBackground(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  cx: number,
  cy: number,
) {
  const bg = ctx.createRadialGradient(
    cx,
    cy,
    0,
    cx,
    cy,
    w * 0.8,
  )

  bg.addColorStop(0, "#07111f")
  bg.addColorStop(1, COLORS.bg)

  ctx.fillStyle = bg
  ctx.fillRect(0, 0, w, h)
}

/* =========================
   ENERGY FOG
========================= */

function drawEnergyFog(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  t: number,
) {
  ctx.save()

  ctx.globalCompositeOperation = "screen"

  for (let i = 0; i < 8; i++) {
    const angle = t * 0.15 + i

    const x =
      cx + Math.cos(angle) * 160

    const y =
      cy + Math.sin(angle) * 120

    radial(
      ctx,
      x,
      y,
      260,
      COLORS.blue,
      0.03,
    )
  }

  ctx.restore()
}

/* =========================
   3D PARTICLES
========================= */

function draw3DParticles(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  t: number,
  progress: number,
  particles: Particle[],
) {
  ctx.save()

  ctx.globalCompositeOperation =
    "lighter"

  for (const p of particles) {
    let radius = p.radius

    if (progress > 0.82) {
      const pull =
        (progress - 0.82) / 0.18

      radius *= 1 - pull * 0.85
    }

    const angle =
      p.angle + t * p.speed * 100

    const x =
      cx + Math.cos(angle) * radius

    const y =
      cy +
      Math.sin(angle) *
        radius *
        (0.55 + p.depth)

    const scale =
      0.4 + p.depth * 1.8

    ctx.globalAlpha =
      0.15 + p.depth * 0.9

    ctx.shadowBlur = 20 * scale
    ctx.shadowColor = COLORS.cyan

    radial(
      ctx,
      x,
      y,
      p.size * scale * 4,
      p.depth > 0.5
        ? COLORS.cyan
        : COLORS.purple,
      1,
    )
  }

  ctx.restore()
}

/* =========================
   OUTER RING
========================= */

function drawOuterMechanicalRing(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  t: number,
) {
  ctx.save()

  ctx.translate(cx, cy)

  const rings = [
    {
      r: 220,
      speed: 0.05,
      segments: 36,
    },
    {
      r: 280,
      speed: -0.03,
      segments: 48,
    },
  ]

  for (const ring of rings) {
    ctx.save()

    ctx.rotate(t * ring.speed)

    for (
      let i = 0;
      i < ring.segments;
      i++
    ) {
      const angle =
        (Math.PI * 2 * i) /
        ring.segments

      ctx.save()

      ctx.rotate(angle)

      ctx.strokeStyle =
        "rgba(148,163,184,0.16)"

      ctx.lineWidth = 2

      ctx.beginPath()

      ctx.moveTo(ring.r, 0)
      ctx.lineTo(ring.r + 16, 0)

      ctx.stroke()

      ctx.restore()
    }

    ctx.restore()
  }

  ctx.restore()
}

/* =========================
   ATOMIC SYSTEM
========================= */

function drawAtomicSystem(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  t: number,
  progress: number,
) {
  ctx.save()

  ctx.translate(cx, cy)

  const orbits = [
    {
      r: 80,
      tilt: 0.2,
      speed: 0.8,
      electrons: 2,
    },
    {
      r: 120,
      tilt: 0.8,
      speed: -0.6,
      electrons: 3,
    },
    {
      r: 160,
      tilt: 1.2,
      speed: 0.4,
      electrons: 4,
    },
  ]

  for (const orbit of orbits) {
    ctx.save()

    ctx.rotate(orbit.tilt)

    ctx.strokeStyle =
      "rgba(103,232,249,0.16)"

    ctx.lineWidth = 1.2

    ctx.beginPath()

    ctx.ellipse(
      0,
      0,
      orbit.r,
      orbit.r * 0.35,
      0,
      0,
      Math.PI * 2,
    )

    ctx.stroke()

    for (
      let i = 0;
      i < orbit.electrons;
      i++
    ) {
      const angle =
        t * orbit.speed +
        (Math.PI * 2 * i) /
          orbit.electrons

      let radius = orbit.r

      if (progress > 0.85) {
        const pull =
          (progress - 0.85) / 0.15

        radius *= 1 - pull
      }

      const x =
        Math.cos(angle) * radius

      const y =
        Math.sin(angle) *
        radius *
        0.35

      radial(
        ctx,
        x,
        y,
        10,
        COLORS.white,
        1,
      )
    }

    ctx.restore()
  }

  ctx.restore()
}

/* =========================
   CORE REACTOR
========================= */

function drawCoreReactor(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  t: number,
  progress: number,
) {
  const pulse =
    1 + Math.sin(t * 4) * 0.03

  ctx.save()

  ctx.translate(cx, cy)
  ctx.scale(pulse, pulse)

  /* energy glow */

  radial(
    ctx,
    0,
    0,
    260,
    COLORS.cyan,
    0.05,
  )

  radial(
    ctx,
    0,
    0,
    200,
    COLORS.blue,
    0.08,
  )

  radial(
    ctx,
    0,
    0,
    150,
    COLORS.purple,
    0.1,
  )

  /* reactor rings */

  const rings = [
    {
      r: 90,
      speed: 0.4,
      segments: 14,
    },
    {
      r: 120,
      speed: -0.25,
      segments: 20,
    },
    {
      r: 150,
      speed: 0.15,
      segments: 28,
    },
  ]

  for (const ring of rings) {
    ctx.save()

    ctx.rotate(t * ring.speed)

    for (
      let i = 0;
      i < ring.segments;
      i++
    ) {
      const start =
        (Math.PI * 2 * i) /
        ring.segments

      const end = start + 0.18

      ctx.strokeStyle =
        COLORS.glow

      ctx.lineWidth = 2

      ctx.shadowBlur = 20
      ctx.shadowColor =
        COLORS.glow

      ctx.beginPath()

      ctx.arc(
        0,
        0,
        ring.r,
        start,
        end,
      )

      ctx.stroke()
    }

    ctx.restore()
  }

  /* center turbine */

  ctx.save()

  ctx.rotate(t * 1.4)

  for (let i = 0; i < 6; i++) {
    ctx.rotate(Math.PI / 3)

    ctx.beginPath()

    ctx.moveTo(0, 20)
    ctx.lineTo(-15, 70)
    ctx.lineTo(15, 70)

    ctx.closePath()

    ctx.fillStyle =
      "rgba(125,211,252,0.12)"

    ctx.fill()

    ctx.strokeStyle = COLORS.cyan
    ctx.lineWidth = 1.5

    ctx.stroke()
  }

  ctx.restore()

  /* core */

  radial(
    ctx,
    0,
    0,
    90,
    COLORS.white,
    0.9,
  )

  radial(
    ctx,
    0,
    0,
    45,
    "#ffffff",
    1,
  )

  /* center pulse */

  const pulseSize =
    20 + Math.sin(t * 8) * 4

  radial(
    ctx,
    0,
    0,
    pulseSize,
    COLORS.cyan,
    1,
  )

  ctx.restore()
}

/* =========================
   ENERGY PULSE
========================= */

function drawEnergyPulse(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  t: number,
  progress: number,
) {
  ctx.save()

  ctx.globalCompositeOperation =
    "lighter"

  const radius =
    190 + Math.sin(t * 5) * 10

  ctx.strokeStyle =
    "rgba(34,211,238,0.18)"

  ctx.lineWidth = 4

  ctx.shadowBlur = 25
  ctx.shadowColor = COLORS.cyan

  ctx.beginPath()

  ctx.arc(
    cx,
    cy,
    radius,
    0,
    Math.PI * 2,
  )

  ctx.stroke()

  if (progress >= 1) {
    const shock =
      (Math.sin(t * 7) + 1) * 0.5

    ctx.globalAlpha =
      0.4 - shock * 0.4

    ctx.lineWidth = 10

    ctx.beginPath()

    ctx.arc(
      cx,
      cy,
      240 + shock * 120,
      0,
      Math.PI * 2,
    )

    ctx.stroke()
  }

  ctx.restore()
}

/* =========================
   ELECTRIC SPARKS
========================= */

function drawElectricSparks(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  t: number,
  sparks: Particle[],
) {
  ctx.save()

  ctx.globalCompositeOperation =
    "lighter"

  for (const s of sparks) {
    const angle =
      s.angle + t * s.speed * 120

    const radius =
      120 + Math.sin(t + s.angle) * 40

    const x =
      cx + Math.cos(angle) * radius

    const y =
      cy + Math.sin(angle) * radius

    ctx.strokeStyle =
      "rgba(103,232,249,0.6)"

    ctx.lineWidth = 1

    ctx.beginPath()

    ctx.moveTo(x, y)

    ctx.lineTo(
      x + Math.random() * 12,
      y + Math.random() * 12,
    )

    ctx.stroke()
  }

  ctx.restore()
}

/* =========================
   SINGULARITY
========================= */

function drawSingularity(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  t: number,
) {
  ctx.save()

  ctx.translate(cx, cy)

  ctx.globalCompositeOperation =
    "lighter"

  for (let i = 0; i < 120; i++) {
    const angle =
      t * 4 + i * 0.22

    const spiral = i * 1.6

    const x =
      Math.cos(angle) * spiral

    const y =
      Math.sin(angle) * spiral

    ctx.globalAlpha = 1 - i / 120

    radial(
      ctx,
      x,
      y,
      8,
      COLORS.white,
      1,
    )
  }

  ctx.restore()
}

/* =========================
   RADIAL GLOW
========================= */

function radial(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string,
  alpha = 1,
) {
  const g =
    ctx.createRadialGradient(
      x,
      y,
      0,
      x,
      y,
      radius,
    )

  g.addColorStop(0, color)
  g.addColorStop(0.3, color)
  g.addColorStop(
    1,
    "rgba(255,255,255,0)",
  )

  ctx.save()

  ctx.globalAlpha = alpha
  ctx.fillStyle = g

  ctx.beginPath()

  ctx.arc(
    x,
    y,
    radius,
    0,
    Math.PI * 2,
  )

  ctx.fill()

  ctx.restore()
}

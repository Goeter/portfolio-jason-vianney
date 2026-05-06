"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type Props = {
  className?: string
  progress?: number
}

type Particle = {
  angle: number
  radius: number
  speed: number
  size: number
  depth: number
}

const COLORS = {
  bg: "#020617",
  cyan: "#22d3ee",
  blue: "#3b82f6",
  purple: "#8b5cf6",
  white: "#e2f3ff",
}

export default function ArcReactorCanvas({
  className,
  progress = 0,
}: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = ref.current

    if (!canvas) return

    const ctx = canvas.getContext("2d")

    if (!ctx) return

    const particles = createParticles(70)

    let animationFrame = 0
    let time = 0

    function resize() {
      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2,
      )

      const rect = canvas.getBoundingClientRect()

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()

    window.addEventListener("resize", resize)

    function animate() {
      time += 0.01

      drawScene(
        ctx,
        canvas,
        time,
        progress,
        particles,
      )

      animationFrame =
        requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrame)

      window.removeEventListener(
        "resize",
        resize,
      )
    }
  }, [progress])

  return (
    <canvas
      ref={ref}
      className={cn(
        "block h-full w-full",
        className,
      )}
    />
  )
}

function createParticles(
  count: number,
): Particle[] {
  return Array.from({
    length: count,
  }).map(() => ({
    angle: Math.random() * Math.PI * 2,
    radius: 120 + Math.random() * 130,
    speed: 0.002 + Math.random() * 0.008,
    size: 1 + Math.random() * 2,
    depth: 0.5 + Math.random() * 1,
  }))
}

function drawScene(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  t: number,
  progress: number,
  particles: Particle[],
) {
  const w = canvas.clientWidth
  const h = canvas.clientHeight

  const cx = w / 2
  const cy = h / 2

  ctx.clearRect(0, 0, w, h)

  // BACKGROUND

  ctx.fillStyle = COLORS.bg
  ctx.fillRect(0, 0, w, h)

  drawGrid(ctx, w, h, t)

  drawParticles(
    ctx,
    cx,
    cy,
    t,
    progress,
    particles,
  )

  drawReactor(
    ctx,
    cx,
    cy,
    t,
    progress,
  )

  drawPulse(
    ctx,
    cx,
    cy,
    t,
  )
}

function drawGrid(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
) {
  ctx.save()

  ctx.strokeStyle =
    "rgba(255,255,255,0.04)"

  ctx.lineWidth = 1

  const gap = 70
  const offset = (t * 20) % gap

  for (let x = -gap; x < w + gap; x += gap) {
    ctx.beginPath()
    ctx.moveTo(x + offset, 0)
    ctx.lineTo(x + offset, h)
    ctx.stroke()
  }

  for (let y = -gap; y < h + gap; y += gap) {
    ctx.beginPath()
    ctx.moveTo(0, y + offset)
    ctx.lineTo(w, y + offset)
    ctx.stroke()
  }

  ctx.restore()
}

function drawReactor(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  t: number,
  progress: number,
) {
  ctx.save()

  ctx.translate(cx, cy)

  const pulse =
    1 + Math.sin(t * 4) * 0.03

  ctx.scale(pulse, pulse)

  radial(
    ctx,
    0,
    0,
    220,
    COLORS.cyan,
    0.03,
  )

  radial(
    ctx,
    0,
    0,
    160,
    COLORS.blue,
    0.05,
  )

  const rings = [
    {
      radius: 70,
      speed: 0.3,
      segments: 10,
      width: 2,
    },
    {
      radius: 100,
      speed: -0.2,
      segments: 16,
      width: 2,
    },
    {
      radius: 130,
      speed: 0.15,
      segments: 20,
      width: 1.5,
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

      const end = start + 0.22

      ctx.beginPath()

      ctx.strokeStyle = COLORS.cyan
      ctx.lineWidth = ring.width

      ctx.shadowBlur = 15
      ctx.shadowColor = COLORS.cyan

      ctx.arc(
        0,
        0,
        ring.radius,
        start,
        end,
      )

      ctx.stroke()
    }

    ctx.restore()
  }

  // TRIANGLES

  ctx.save()

  ctx.rotate(t * 0.4)

  for (let i = 0; i < 6; i++) {
    ctx.rotate(Math.PI / 3)

    ctx.beginPath()

    ctx.moveTo(0, 15)
    ctx.lineTo(-10, 50)
    ctx.lineTo(10, 50)

    ctx.closePath()

    ctx.fillStyle =
      "rgba(34,211,238,0.08)"

    ctx.fill()

    ctx.strokeStyle = COLORS.cyan
    ctx.lineWidth = 1

    ctx.stroke()
  }

  ctx.restore()

  // CORE

  radial(
    ctx,
    0,
    0,
    80,
    COLORS.cyan,
    0.12,
  )

  radial(
    ctx,
    0,
    0,
    45,
    COLORS.white,
    0.95,
  )

  radial(
    ctx,
    0,
    0,
    18,
    "#ffffff",
    1,
  )

  // LOADING RING

  const loadRadius = 155

  ctx.beginPath()

  ctx.strokeStyle =
    "rgba(255,255,255,0.08)"

  ctx.lineWidth = 5

  ctx.arc(
    0,
    0,
    loadRadius,
    0,
    Math.PI * 2,
  )

  ctx.stroke()

  ctx.beginPath()

  ctx.strokeStyle = COLORS.cyan
  ctx.lineWidth = 5
  ctx.lineCap = "round"

  ctx.shadowBlur = 18
  ctx.shadowColor = COLORS.cyan

  ctx.arc(
    0,
    0,
    loadRadius,
    -Math.PI / 2,
    -Math.PI / 2 +
      (Math.PI * 2 * progress) / 100,
  )

  ctx.stroke()

  ctx.restore()
}

function drawParticles(
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

  for (const particle of particles) {
    let radius = particle.radius

    // vortex effect

    if (progress > 82) {
      const force =
        (progress - 82) / 18

      radius *= 1 - force * 0.65
    }

    const angle =
      particle.angle +
      t * particle.speed * 120

    const x =
      cx + Math.cos(angle) * radius

    const y =
      cy +
      Math.sin(angle) *
        radius *
        0.55

    const scale =
      0.7 +
      Math.sin(angle + t * 3) * 0.3

    radial(
      ctx,
      x,
      y,
      particle.size *
        4 *
        particle.depth *
        scale,
      COLORS.cyan,
      0.8,
    )
  }

  ctx.restore()
}

function drawPulse(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  t: number,
) {
  ctx.save()

  const radius =
    175 + Math.sin(t * 5) * 6

  ctx.beginPath()

  ctx.strokeStyle =
    "rgba(34,211,238,0.12)"

  ctx.lineWidth = 3

  ctx.arc(
    cx,
    cy,
    radius,
    0,
    Math.PI * 2,
  )

  ctx.stroke()

  ctx.restore()
}

function radial(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string,
  alpha = 1,
) {
  const gradient =
    ctx.createRadialGradient(
      x,
      y,
      0,
      x,
      y,
      radius,
    )

  gradient.addColorStop(0, color)

  gradient.addColorStop(0.35, color)

  gradient.addColorStop(
    1,
    "rgba(255,255,255,0)",
  )

  ctx.save()

  ctx.globalAlpha = alpha
  ctx.fillStyle = gradient

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

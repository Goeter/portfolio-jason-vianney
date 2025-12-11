"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type Props = {
  className?: string
}

const COLORS = {
  bg: "#0A1018", // deep navy
  cyan: "#00E5FF", // primary neon
  blue: "#19A0FF", // accent neon
  amber: "#FFC24B", // accent flare
  white: "#EAF7FF", // soft white
}

export default function ArcReactorCanvas({ className }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    // Pre-generate scene data
    const grid = createGrid()
    const circuits = createCircuits()
    const network = createNetwork(80)
    const codeRain = createCodeRain(64)

    let raf = 0
    let last = performance.now()
    let t = 0
    const chargeStart = performance.now()
    const CHARGE_DURATION = 6500 // ms to reach full charge

    function resize() {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
      const { clientWidth: w, clientHeight: h } = canvas
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const onResize = () => resize()
    resize()
    window.addEventListener("resize", onResize)

    function loop(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      t += dt

      const charge = Math.min(1, (now - chargeStart) / CHARGE_DURATION)

      draw(ctx, t, { grid, circuits, network, codeRain }, charge)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener("resize", onResize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas ref={ref} className={cn("h-full w-full", className)} />
}

// Scene generation helpers
function createGrid() {
  return {
    spacing: 28,
    shift: 0,
    intensity: 0.18,
  }
}

function createCircuits() {
  // Sparse, glowing circuit traces
  const traces: { x: number; y: number; len: number; dir: "h" | "v" }[] = []
  for (let i = 0; i < 120; i++) {
    traces.push({
      x: Math.random(),
      y: Math.random(),
      len: 0.08 + Math.random() * 0.18,
      dir: Math.random() > 0.5 ? "h" : "v",
    })
  }
  return traces
}

function createNetwork(count: number) {
  const nodes: { x: number; y: number; r: number; phase: number }[] = []
  for (let i = 0; i < count; i++) {
    nodes.push({
      x: Math.random(),
      y: Math.random(),
      r: 1 + Math.random() * 1.6,
      phase: Math.random() * Math.PI * 2,
    })
  }
  return nodes
}

function createCodeRain(cols: number) {
  const columnData: {
    x: number
    y: number
    speed: number
    chars: string
  }[] = []
  const charset = "01" // binary only
  for (let i = 0; i < cols; i++) {
    columnData.push({
      x: Math.random(),
      y: Math.random(),
      speed: 0.2 + Math.random() * 0.6,
      chars: Array.from({ length: 24 + Math.floor(Math.random() * 36) })
        .map(() => charset[Math.floor(Math.random() * charset.length)])
        .join(""),
    })
  }
  return columnData
}

function draw(
  ctx: CanvasRenderingContext2D,
  t: number,
  data: {
    grid: ReturnType<typeof createGrid>
    circuits: ReturnType<typeof createCircuits>
    network: ReturnType<typeof createNetwork>
    codeRain: ReturnType<typeof createCodeRain>
  },
  charge: number,
) {
  const canvas = ctx.canvas
  const w = canvas.clientWidth
  const h = canvas.clientHeight
  ctx.clearRect(0, 0, w, h)

  // Background
  ctx.fillStyle = COLORS.bg
  ctx.fillRect(0, 0, w, h)

  // Layer: holographic grid (slight parallax + scan)
  drawGrid(ctx, w, h, t, data.grid)

  // Layer: streaming code rain
  drawCodeRain(ctx, w, h, t, data.codeRain)

  // Layer: network nodes + connections
  drawNetwork(ctx, w, h, t, data.network)

  // Layer: circuit traces (glowing)
  drawCircuits(ctx, w, h, t, data.circuits)

  // Central arc reactor
  drawReactor(ctx, w, h, t, charge)

  // Light streaks
  drawStreaks(ctx, w, h, t)

  // Subtle lens flares
  drawLensFlares(ctx, w, h, t)
}

// Background grid
function drawGrid(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, grid: ReturnType<typeof createGrid>) {
  const spacing = grid.spacing
  const offset = (Math.sin(t * 0.5) * spacing) / 2

  ctx.save()
  ctx.globalAlpha = 0.18
  ctx.strokeStyle = COLORS.blue
  ctx.lineWidth = 1

  // Vertical lines
  for (let x = -spacing; x < w + spacing; x += spacing) {
    ctx.beginPath()
    ctx.moveTo(x + offset, 0)
    ctx.lineTo(x + offset, h)
    ctx.stroke()
  }
  // Horizontal lines
  for (let y = -spacing; y < h + spacing; y += spacing) {
    ctx.beginPath()
    ctx.moveTo(0, y - offset)
    ctx.lineTo(w, y - offset)
    ctx.stroke()
  }

  // Scanning sweep
  const sweepY = ((t * 45) % (h + 200)) - 100
  const grad = ctx.createLinearGradient(0, sweepY - 40, 0, sweepY + 40)
  grad.addColorStop(0, "rgba(0,229,255,0)")
  grad.addColorStop(0.5, "rgba(0,229,255,0.18)")
  grad.addColorStop(1, "rgba(0,229,255,0)")
  ctx.fillStyle = grad
  ctx.fillRect(0, sweepY - 40, w, 80)

  ctx.restore()
}

// Streaming code rain
function drawCodeRain(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  cols: ReturnType<typeof createCodeRain>,
) {
  ctx.save()
  ctx.globalAlpha = 0.22
  ctx.fillStyle = COLORS.white
  ctx.font = `700 12px ui-monospace, SFMono-Regular, Menlo, monospace`

  for (const col of cols) {
    const x = Math.floor(col.x * w)
    const y = ((col.y * h + t * 120 * col.speed) % (h + 60)) - 60
    for (let i = 0; i < col.chars.length; i++) {
      const ch = col.chars[i]
      const yy = y + i * 13
      if (yy > -10 && yy < h + 10) {
        ctx.globalAlpha = 0.15 + 0.15 * Math.sin((i * 0.6 + t * 2) % Math.PI)
        ctx.fillText(ch, x, yy)
      }
    }
  }
  ctx.restore()
}

// Network nodes and connections
function drawNetwork(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  nodes: ReturnType<typeof createNetwork>,
) {
  ctx.save()
  ctx.globalCompositeOperation = "lighter"

  // Nodes
  for (const n of nodes) {
    const x = n.x * w
    const y = n.y * h + Math.sin((n.phase + t) * 0.7) * 6
    const r = n.r + Math.sin(n.phase + t * 2) * 0.3
    radial(ctx, x, y, r * 5, COLORS.cyan, 0.25)
  }

  // Connections to near neighbors (k=2)
  ctx.lineWidth = 1
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i]
    let nearest: number[] = []
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue
      const dx = a.x - nodes[j].x
      const dy = a.y - nodes[j].y
      const d = dx * dx + dy * dy
      nearest.push(d)
      nearest = nearest.sort((m, n) => m - n).slice(0, 2)
    }
    // Draw faint lines to a couple of close distances (approx visual)
    for (let k = 0; k < 2; k++) {
      const threshold = nearest[k] ?? 0.02
      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue
        const dx = a.x - nodes[j].x
        const dy = a.y - nodes[j].y
        const d = dx * dx + dy * dy
        if (d <= threshold) {
          const x1 = a.x * w
          const y1 = a.y * h + Math.sin((a.phase + t) * 0.7) * 6
          const x2 = nodes[j].x * w
          const y2 = nodes[j].y * h + Math.sin((nodes[j].phase + t) * 0.7) * 6
          ctx.globalAlpha = 0.08 + 0.06 * Math.sin((t + i + j) * 1.5)
          ctx.strokeStyle = COLORS.blue
          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
          ctx.stroke()
        }
      }
    }
  }

  ctx.restore()
}

// Circuit traces
function drawCircuits(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  traces: ReturnType<typeof createCircuits>,
) {
  ctx.save()
  ctx.globalCompositeOperation = "lighter"
  ctx.lineWidth = 1

  for (const tr of traces) {
    const x = tr.x * w
    const y = tr.y * h
    const len = tr.len * (tr.dir === "h" ? w : h)

    ctx.globalAlpha = 0.08 + 0.08 * Math.max(0, Math.sin((x + y + t * 1.2) * 0.5))
    ctx.strokeStyle = COLORS.cyan
    ctx.beginPath()
    if (tr.dir === "h") {
      ctx.moveTo(x, y)
      ctx.lineTo(x + len, y)
    } else {
      ctx.moveTo(x, y)
      ctx.lineTo(x, y + len)
    }
    ctx.stroke()

    // Tiny micro-vias
    ctx.globalAlpha = 0.12
    ctx.fillStyle = COLORS.white
    ctx.beginPath()
    ctx.arc(x, y, 0.8, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.restore()
}

// Central reactor
function drawReactor(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, charge: number) {
  const cx = w / 2
  const cy = h / 2
  const baseR = Math.min(w, h) * 0.16

  ctx.save()
  ctx.translate(cx, cy)
  ctx.globalCompositeOperation = "lighter"

  // Core glow
  radial(ctx, 0, 0, baseR * 1.8, COLORS.cyan, 0.18)
  radial(ctx, 0, 0, baseR * 1.2, COLORS.blue, 0.16)
  radial(ctx, 0, 0, baseR * 0.7, COLORS.white, 0.22)

  // Pulsating energy wave ring
  const pulseR = baseR * (1 + 0.05 * Math.sin(t * 2.8))
  ring(ctx, 0, 0, pulseR, 6, COLORS.cyan, 0.6)

  // Rotating neon rings
  const ringCount = 4
  for (let i = 0; i < ringCount; i++) {
    const angle = t * (0.6 + i * 0.15) + i
    ctx.save()
    ctx.rotate(angle)
    arcSegment(ctx, 0, 0, baseR * (0.6 + i * 0.14), (Math.PI / 3) * 0.8, COLORS.blue, 3, 0.7)
    ctx.restore()
  }

  // Triadic braces (reactor struts)
  ctx.lineWidth = 2
  for (let i = 0; i < 3; i++) {
    const a = i * ((Math.PI * 2) / 3) + t * 0.25
    const r1 = baseR * 1.05
    const r2 = r1 + 14
    const x1 = Math.cos(a) * r1
    const y1 = Math.sin(a) * r1
    const x2 = Math.cos(a) * r2
    const y2 = Math.sin(a) * r2
    ctx.globalAlpha = 0.9
    ctx.strokeStyle = COLORS.white
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
    radial(ctx, x2, y2, 7, COLORS.amber, 0.35)
  }

  // Charge track ring
  const trackR = baseR * 1.1
  ctx.save()
  ctx.globalAlpha = 0.25
  ctx.strokeStyle = "rgba(255,255,255,0.25)"
  ctx.lineWidth = 8
  ctx.beginPath()
  ctx.arc(0, 0, trackR, 0, Math.PI * 2)
  ctx.stroke()
  ctx.restore()

  // Charge fill sweep
  ctx.save()
  ctx.shadowBlur = 18
  ctx.shadowColor = COLORS.cyan
  ctx.strokeStyle = COLORS.cyan
  ctx.lineCap = "round"
  ctx.lineWidth = 8
  const startA = -Math.PI / 2
  const endA = startA + Math.PI * 2 * Math.max(0.001, Math.min(1, charge))
  ctx.beginPath()
  ctx.arc(0, 0, trackR, startA, endA)
  ctx.stroke()
  ctx.restore()

  ctx.restore()
}

// Light streaks
function drawStreaks(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  ctx.save()
  ctx.globalCompositeOperation = "lighter"
  const count = 10
  for (let i = 0; i < count; i++) {
    const y = ((i * 97 + t * 140) % (h + 80)) - 40
    ctx.globalAlpha = 0.06 + 0.04 * Math.sin((t + i) * 1.2)
    ctx.fillStyle = COLORS.cyan
    ctx.fillRect(-40, y, w + 80, 1)
  }
  ctx.restore()
}

// Lens flares
function drawLensFlares(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  ctx.save()
  ctx.globalCompositeOperation = "lighter"
  const cx = w / 2
  const cy = h / 2
  const angles = [0.2, 1.4, 2.6]
  for (let i = 0; i < angles.length; i++) {
    const a = angles[i] + Math.sin(t * (0.4 + i * 0.1)) * 0.05
    const r = Math.min(w, h) * (0.2 + i * 0.08)
    const x = cx + Math.cos(a) * r
    const y = cy + Math.sin(a) * r
    radial(ctx, x, y, 40 + i * 12, i % 2 === 0 ? COLORS.amber : COLORS.blue, 0.16)
  }
  ctx.restore()
}

// Drawing utilities
function radial(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string, alpha = 1) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, radius)
  g.addColorStop(0, color)
  g.addColorStop(0.2, color)
  g.addColorStop(1, "rgba(255,255,255,0)")
  ctx.save()
  ctx.globalAlpha = alpha
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

function ring(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  width: number,
  color: string,
  alpha = 1,
) {
  ctx.save()
  ctx.globalAlpha = alpha
  ctx.strokeStyle = color
  ctx.lineWidth = width
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.stroke()
  ctx.restore()
}

function arcSegment(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  span: number,
  color: string,
  width: number,
  alpha = 1,
) {
  ctx.save()
  ctx.globalAlpha = alpha
  ctx.strokeStyle = color
  ctx.lineWidth = width
  const start = -span / 2
  const end = span / 2
  ctx.beginPath()
  ctx.arc(x, y, radius, start, end)
  ctx.stroke()

  // dashed echo
  ctx.setLineDash([6, 6])
  ctx.globalAlpha = Math.max(0, alpha - 0.3)
  ctx.beginPath()
  ctx.arc(x, y, radius + 6, start, end)
  ctx.stroke()
  ctx.restore()
}

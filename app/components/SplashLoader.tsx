"use client"

import { useEffect, useRef } from "react"

type Props = {
  onLoadingComplete: () => void
}

const FULL_NAME = "Jason Vianney Sugiarto"

const STATUS_MSGS = [
  "Loading Power Core...",
  "Arc Reactor Online — 100%",
]

const SKILLS = [
  {
    label: "IT Fullstack",
    grad: "rgba(0,212,255,0.22),rgba(59,130,246,0.22)",
  },
  {
    label: "System Analyst",
    grad: "rgba(168,85,247,0.22),rgba(236,72,153,0.22)",
  },
  {
    label: "UI/UX Designer",
    grad: "rgba(251,146,60,0.22),rgba(236,72,153,0.22)",
  },
  {
    label: "Data Analyst",
    grad: "rgba(52,211,153,0.22),rgba(16,185,129,0.22)",
  },
  {
    label: "Tutor",
    grad: "rgba(255,215,0,0.20),rgba(255,140,0,0.20)",
  },
]

const PH1_DUR = 5200
const PH2_DUR = 2800

export default function SplashLoader({
  onLoadingComplete,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  const ph1Ref = useRef<HTMLDivElement>(null)
  const ph2Ref = useRef<HTMLDivElement>(null)
  const ph3Ref = useRef<HTMLDivElement>(null)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<HTMLCanvasElement>(null)
  const hyperCanvasRef =
    useRef<HTMLCanvasElement>(null)

  const pctRef = useRef<HTMLDivElement>(null)
  const msgRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const hyperRef = useRef<HTMLDivElement>(null)
  const dustRef = useRef<HTMLDivElement>(null)

  const batteryCellsRef = useRef<
    (HTMLDivElement | null)[]
  >([])

  const atomRefs = useRef<
    (HTMLDivElement | null)[]
  >([])

  const rafRef = useRef(0)
  const starsRafRef = useRef(0)
  const hyperRafRef = useRef(0)
  const arcRafRef = useRef(0)

  const easeOut = (t: number) =>
    1 - Math.pow(1 - t, 3)

  function typeWriter(
    el: HTMLElement,
    text: string,
    speed: number,
    cb?: () => void
  ) {
    let i = 0

    clearInterval((el as any)._typingTimer)

    el.textContent = ""

    ;(el as any)._typingTimer = setInterval(() => {
      el.textContent = text.slice(0, ++i)

      if (i >= text.length) {
        clearInterval((el as any)._typingTimer)
        cb?.()
      }
    }, speed)
  }

  function drawArc(progress: number, ts: number) {
    const cv = canvasRef.current
    if (!cv) return

    const ctx = cv.getContext("2d")
    if (!ctx) return

    const { width: w, height: h } = cv

    const cx = w / 2
    const cy = h / 2

    const pulse = (Math.sin(ts / 420) + 1) / 2
    const hue = (ts / 12) % 360

    ctx.clearRect(0, 0, w, h)

    const bgGlow = ctx.createRadialGradient(
      cx,
      cy,
      0,
      cx,
      cy,
      150
    )

    bgGlow.addColorStop(
      0,
      `hsla(${190 + hue},100%,70%,${
        0.16 + pulse * 0.1
      })`
    )

    bgGlow.addColorStop(
      0.5,
      `hsla(${220 + hue},100%,60%,${
        0.08 + pulse * 0.06
      })`
    )

    bgGlow.addColorStop(1, "transparent")

    ctx.beginPath()
    ctx.arc(cx, cy, 150, 0, Math.PI * 2)
    ctx.fillStyle = bgGlow
    ctx.fill()

    ctx.beginPath()
    ctx.arc(cx, cy, 110, 0, Math.PI * 2)
    ctx.strokeStyle = "rgba(255,255,255,.08)"
    ctx.lineWidth = 8
    ctx.stroke()

    const start = -Math.PI / 2
    const end = start + Math.PI * 2 * progress

    const grad = ctx.createLinearGradient(0, 0, w, h)

    grad.addColorStop(0, `hsl(${280 + hue},100%,70%)`)
    grad.addColorStop(0.4, `hsl(${190 + hue},100%,65%)`)
    grad.addColorStop(0.7, `hsl(${150 + hue},100%,60%)`)
    grad.addColorStop(1, `hsl(${50 + hue},100%,65%)`)

    ctx.beginPath()
    ctx.arc(cx, cy, 110, start, end)

    ctx.strokeStyle = grad
    ctx.lineWidth = 10
    ctx.lineCap = "round"

    ctx.shadowColor = `hsl(${190 + hue},100%,75%)`
    ctx.shadowBlur = 30 + pulse * 16

    ctx.stroke()
    ctx.shadowBlur = 0

    const orbR = 28 + pulse * 4

    const orbGlow = ctx.createRadialGradient(
      cx,
      cy,
      0,
      cx,
      cy,
      orbR + 26
    )

    orbGlow.addColorStop(0, "rgba(255,255,255,.98)")
    orbGlow.addColorStop(
      0.35,
      `hsla(${190 + hue},100%,70%,.92)`
    )
    orbGlow.addColorStop(
      0.75,
      `hsla(${190 + hue},100%,60%,.35)`
    )
    orbGlow.addColorStop(1, "transparent")

    ctx.beginPath()
    ctx.arc(cx, cy, orbR + 26, 0, Math.PI * 2)
    ctx.fillStyle = orbGlow
    ctx.fill()

    ctx.beginPath()
    ctx.arc(cx, cy, orbR * 0.58, 0, Math.PI * 2)

    ctx.fillStyle = "#fff"

    ctx.shadowColor = `hsla(${190 + hue},100%,75%,1)`
    ctx.shadowBlur = 34

    ctx.fill()

    ctx.restore()
  }

  function startArcAnimation() {
    let start: number | null = null

    const animate = (ts: number) => {
      if (!start) start = ts

      const progress = easeOut(
        Math.min((ts - start) / PH2_DUR, 1)
      )

      drawArc(progress, ts)

      arcRafRef.current =
        requestAnimationFrame(animate)
    }

    arcRafRef.current =
      requestAnimationFrame(animate)
  }

  function activateAtom(index: number) {
    atomRefs.current[index]?.classList.add("active")
  }

  function buildSkills() {
    const grid = skillsRef.current
    if (!grid) return

    grid.innerHTML = ""

    SKILLS.forEach((s, idx) => {
      const card = document.createElement("div")

      card.className = "sl-skill-card"
      card.style.background = `linear-gradient(135deg,${s.grad})`

      card.innerHTML = `
        <div class="sl-skill-name">${s.label}</div>
      `

      grid.appendChild(card)

      setTimeout(
        () => card.classList.add("sl-card-show"),
        idx * 180
      )
    })
  }

  function createDustExplosion() {
    const dust = dustRef.current
    if (!dust) return

    dust.innerHTML = ""

    const frag = document.createDocumentFragment()

    for (let i = 0; i < 160; i++) {
      const p = document.createElement("div")

      const x = (Math.random() - 0.5) * 900
      const y = (Math.random() - 0.5) * 700

      p.className = "sl-dust"

      p.style.cssText = `
        --tx:${x}px;
        --ty:${y}px;
        width:${1 + Math.random() * 5}px;
        height:${1 + Math.random() * 5}px;
        left:50%;
        top:50%;
        animation-duration:${1.2 + Math.random() * 0.8}s;
      `

      frag.appendChild(p)
    }

    dust.appendChild(frag)
  }

  useEffect(() => {
    drawArc(0, 0)

    let start: number | null = null

    const phase1 = (ts: number) => {
      if (!start) start = ts

      const raw = Math.min(
        (ts - start) / PH1_DUR,
        1
      )

      const p = easeOut(raw)

      pctRef.current!.textContent = `${Math.floor(
        p * 100
      )}%`

      batteryCellsRef.current.forEach((cell, idx) => {
        if (
          cell &&
          idx < Math.min(Math.floor(p * 10), 10)
        ) {
          cell.classList.add("active")
        }
      })

      const mi = Math.min(
        Math.floor(p * STATUS_MSGS.length),
        STATUS_MSGS.length - 1
      )

      if (
        msgRef.current &&
        msgRef.current.dataset.msg !==
          STATUS_MSGS[mi]
      ) {
        msgRef.current.dataset.msg =
          STATUS_MSGS[mi]

        typeWriter(
          msgRef.current,
          STATUS_MSGS[mi],
          38
        )
      }

      if (raw < 1) {
        rafRef.current =
          requestAnimationFrame(phase1)

        return
      }

      ph1Ref.current?.classList.add("sl-out")

      setTimeout(() => {
        ph2Ref.current?.classList.add("sl-in")

        startArcAnimation()

        ;[300, 1000, 1700].forEach((t, i) =>
          setTimeout(() => activateAtom(i), t)
        )

        setTimeout(() => {
          cancelAnimationFrame(arcRafRef.current)

          ph2Ref.current?.classList.add("sl-out")

          setTimeout(() => {
            onLoadingComplete()
          }, 4200)
        }, PH2_DUR)
      }, 500)
    }

    rafRef.current =
      requestAnimationFrame(phase1)

    return () => {
      ;[
        rafRef.current,
        starsRafRef.current,
        hyperRafRef.current,
        arcRafRef.current,
      ].forEach(cancelAnimationFrame)
    }
  }, [onLoadingComplete])

  return (
    <>
      {/* JSX tetap sama seperti milikmu */}
    </>
  )
}

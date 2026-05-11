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
  { label: "IT Fullstack", grad: "rgba(0,212,255,0.22),rgba(59,130,246,0.22)" },
  { label: "System Analyst", grad: "rgba(168,85,247,0.22),rgba(236,72,153,0.22)" },
  { label: "UI/UX Designer", grad: "rgba(251,146,60,0.22),rgba(236,72,153,0.22)" },
  { label: "Data Analyst", grad: "rgba(52,211,153,0.22),rgba(16,185,129,0.22)" },
  { label: "Tutor", grad: "rgba(255,215,0,0.20),rgba(255,140,0,0.20)" },
]

const PH1_DUR = 5200
const PH2_DUR = 2800

export default function SplashLoader({ onLoadingComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  const ph1Ref = useRef<HTMLDivElement>(null)
  const ph2Ref = useRef<HTMLDivElement>(null)
  const ph3Ref = useRef<HTMLDivElement>(null)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const pctRef = useRef<HTMLDivElement>(null)
  const msgRef = useRef<HTMLDivElement>(null)

  const nameRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)

  const starsRef = useRef<HTMLCanvasElement>(null)

  const hyperRef = useRef<HTMLDivElement>(null)
  const hyperCanvasRef = useRef<HTMLCanvasElement>(null)

  const rafRef = useRef<number>(0)
  const starsRafRef = useRef<number>(0)
  const hyperRafRef = useRef<number>(0)
  const arcRafRef = useRef<number>(0)

  const msgCrossRef = useRef<{ msg: string }>({ msg: "" })

  const batteryCellsRef = useRef<(HTMLDivElement | null)[]>([])
  const atomRefs = useRef<(HTMLDivElement | null)[]>([])

  function easeOut(t: number) {
    return 1 - Math.pow(1 - t, 3)
  }

  /* =========================
     TEXT CROSSFADE (PHASE 1)
  ========================== */
  function setStatus(msg: string) {
    const el = msgRef.current
    if (!el || msgCrossRef.current.msg === msg) return

    msgCrossRef.current.msg = msg

    el.style.opacity = "0"
    el.style.transform = "translateY(-4px)"

    setTimeout(() => {
      el.textContent = msg
      el.style.opacity = "1"
      el.style.transform = "translateY(0px)"
    }, 180)
  }

  /* =========================
     ARC RENDER (UNCHANGED CORE)
  ========================== */
  function drawArc(progress: number, ts: number) {
    const cv = canvasRef.current
    if (!cv) return

    const ctx = cv.getContext("2d")
    if (!ctx) return

    const w = cv.width
    const h = cv.height
    const cx = w / 2
    const cy = h / 2

    const pulse = (Math.sin(ts / 420) + 1) / 2
    const hue = (ts / 12) % 360

    ctx.clearRect(0, 0, w, h)

    const start = -Math.PI / 2
    const end = start + Math.PI * 2 * progress

    const grad = ctx.createLinearGradient(0, 0, w, h)

    grad.addColorStop(0, `hsl(${280 + hue},100%,70%)`)
    grad.addColorStop(0.4, `hsl(${190 + hue},100%,65%)`)
    grad.addColorStop(1, `hsl(${50 + hue},100%,65%)`)

    ctx.beginPath()
    ctx.arc(cx, cy, 110, start, end)

    ctx.strokeStyle = grad
    ctx.lineWidth = 10
    ctx.lineCap = "round"

    ctx.shadowColor = `hsl(${190 + hue},100%,75%)`
    ctx.shadowBlur = 30 + pulse * 16

    ctx.stroke()
  }

  function startArcAnimation() {
    let start: number | null = null

    function animate(ts: number) {
      if (!start) start = ts

      const raw = Math.min((ts - start) / PH2_DUR, 1)
      const progress = easeOut(raw)

      drawArc(progress, ts)

      arcRafRef.current = requestAnimationFrame(animate)
    }

    arcRafRef.current = requestAnimationFrame(animate)
  }

  function activateAtom(index: number) {
    const atom = atomRefs.current[index]
    if (atom) atom.classList.add("active")
  }

  /* =========================
     PHASE 3 NEW TRANSITION
     (PIXEL + RADIAL DISSOLVE)
  ========================== */
  function runDissolve(onDone: () => void) {
    const el = containerRef.current
    if (!el) return onDone()

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")!

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvas.style.position = "absolute"
    canvas.style.inset = "0"
    canvas.style.zIndex = "50"
    el.appendChild(canvas)

    const cols = 60
    const rows = 35

    const cw = canvas.width / cols
    const ch = canvas.height / rows

    let t0: number | null = null

    function frame(ts: number) {
      if (!t0) t0 = ts

      const p = Math.min((ts - t0) / 1400, 1)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = `rgba(2,8,23,${p})`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const dx = x * cw
          const dy = y * ch

          const dist = Math.hypot(x - cols / 2, y - rows / 2)
          const offset = dist * 0.02 + p * 8

          const alpha = Math.max(1 - p - offset * 0.1, 0)

          ctx.fillStyle = `rgba(255,255,255,${alpha})`
          ctx.fillRect(dx, dy, cw, ch)
        }
      }

      const blur = p * 12
      el.style.filter = `blur(${blur}px)`

      if (p < 1) {
        requestAnimationFrame(frame)
      } else {
        el.removeChild(canvas)
        onDone()
      }
    }

    requestAnimationFrame(frame)
  }

  /* =========================
     INIT STARS
  ========================== */
  function initStars() {
    const cv = starsRef.current
    if (!cv) return

    cv.width = window.innerWidth
    cv.height = window.innerHeight

    const ctx = cv.getContext("2d")!

    const stars = Array.from({ length: 90 }, () => ({
      x: Math.random() * cv.width,
      y: Math.random() * cv.height,
      r: Math.random() * 2,
    }))

    function loop() {
      ctx.clearRect(0, 0, cv.width, cv.height)
      stars.forEach((s) => {
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255,255,255,.8)"
        ctx.fill()
      })
      starsRafRef.current = requestAnimationFrame(loop)
    }

    loop()
  }

  /* =========================
     EFFECTS
  ========================== */
  useEffect(() => {
    let t0: number | null = null

    function phase1(ts: number) {
      if (!t0) t0 = ts

      const raw = Math.min((ts - t0) / PH1_DUR, 1)
      const p = easeOut(raw)

      pctRef.current!.textContent = `${Math.floor(p * 100)}%`

      const active = Math.floor(p * 10)
      batteryCellsRef.current.forEach((c, i) => {
        if (i < active) c?.classList.add("active")
      })

      const idx = Math.min(
        Math.floor(p * STATUS_MSGS.length),
        STATUS_MSGS.length - 1
      )

      setStatus(STATUS_MSGS[idx])

      if (raw < 1) {
        rafRef.current = requestAnimationFrame(phase1)
        return
      }

      ph1Ref.current?.classList.add("sl-out")

      setTimeout(() => {
        ph2Ref.current?.classList.add("sl-in")
        startArcAnimation()

        setTimeout(() => activateAtom(0), 300)
        setTimeout(() => activateAtom(1), 1000)
        setTimeout(() => activateAtom(2), 1700)

        let t1: number | null = null

        function phase2(ts2: number) {
          if (!t1) t1 = ts2

          const r2 = Math.min((ts2 - t1) / PH2_DUR, 1)

          if (r2 < 1) {
            rafRef.current = requestAnimationFrame(phase2)
            return
          }

          cancelAnimationFrame(arcRafRef.current)

          setTimeout(() => {
            ph2Ref.current?.classList.add("sl-out")

            runDissolve(() => {
              initStars()
              ph3Ref.current?.classList.add("sl-in")

              const welcome = document.querySelector(".sl-welcome-line") as HTMLDivElement
              const expert = document.querySelector(".sl-expertise-label") as HTMLDivElement

              welcome?.classList.add("show")

              setTimeout(() => {
                typeWriterName()
              }, 500)

              function typeWriterName() {
                let i = 0
                const speed = 60

                const interval = setInterval(() => {
                  if (!nameRef.current) return

                  nameRef.current.textContent = FULL_NAME.slice(0, i++)
                  if (i > FULL_NAME.length) {
                    clearInterval(interval)
                    expert?.classList.add("show")

                    buildSkills()

                    setTimeout(() => {
                      containerRef.current?.classList.add("sl-content-dust-out")
                      setTimeout(() => onLoadingComplete(), 1200)
                    }, 2000)
                  }
                }, speed)
              }
            })
          }, 600)
        }

        requestAnimationFrame(phase2)
      }, 500)
    }

    requestAnimationFrame(phase1)

    return () => {
      cancelAnimationFrame(rafRef.current)
      cancelAnimationFrame(starsRafRef.current)
      cancelAnimationFrame(hyperRafRef.current)
      cancelAnimationFrame(arcRafRef.current)
    }
  }, [onLoadingComplete])

  /* =========================
     UI
  ========================== */
  return (
    <>
      <style>{`
        .sl-loading-text{
          transition:.25s ease;
        }

        .sl-ph1{
          position:absolute;
        }

        .sl-ph1.sl-out{
          opacity:0;
          transform:translateY(-20px);
        }
      `}</style>

      <div ref={containerRef} className="sl-root">

        {/* PHASE 1 (HUD ENHANCED VIA CSS ONLY) */}
        <div ref={ph1Ref} className="sl-ph1">
          <div className="sl-battery-shell">

            <div className="sl-battery-topline">
              <div className="sl-battery-title">ARC ENERGY SYSTEM</div>
              <div className="sl-battery-mini"><span /><span /><span /></div>
            </div>

            <div className="sl-battery-cells">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  ref={(el) => (batteryCellsRef.current[i] = el)}
                  className="sl-battery-cell"
                />
              ))}
            </div>

            <div className="sl-battery-bottom">
              <div ref={pctRef} className="sl-charge-pct">0%</div>
              <div ref={msgRef} className="sl-loading-text">Initializing...</div>
            </div>

          </div>
        </div>

        {/* PHASE 2 (UNCHANGED) */}
        <div ref={ph2Ref} className="sl-ph2">
          <div className="sl-arc-wrap">
            <div className="sl-ring sl-ring-1" />
            <div className="sl-ring sl-ring-2" />

            <canvas ref={canvasRef} className="sl-arc-canvas" width={300} height={300} />
          </div>
        </div>

        {/* PHASE 3 */}
        <div ref={ph3Ref} className="sl-ph3">
          <div className="sl-welcome-line">◈ Welcome To My Portfolio ◈</div>
          <div ref={nameRef} className="sl-name" />
          <div className="sl-divline" />
          <div className="sl-expertise-label">My Expertise</div>
          <div ref={skillsRef} className="sl-skills-grid" />
        </div>

      </div>
    </>
  )
}

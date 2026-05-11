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

  const batteryCellsRef = useRef<(HTMLDivElement | null)[]>([])
  const atomRefs = useRef<(HTMLDivElement | null)[]>([])

  const rafRef = useRef<number>(0)
  const arcRafRef = useRef<number>(0)

  const msgState = useRef("")

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

  /* =========================
     SMOOTH STATUS CROSSFADE
  ========================== */
  function setStatus(msg: string) {
    const el = msgRef.current
    if (!el || msgState.current === msg) return

    msgState.current = msg

    el.style.opacity = "0"
    el.style.transform = "translateY(-6px)"

    setTimeout(() => {
      el.textContent = msg
      el.style.opacity = "1"
      el.style.transform = "translateY(0)"
    }, 160)
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

    ctx.clearRect(0, 0, w, h)

    const hue = (ts / 10) % 360

    const start = -Math.PI / 2
    const end = start + Math.PI * 2 * progress

    const grad = ctx.createLinearGradient(0, 0, w, h)
    grad.addColorStop(0, `hsl(${280 + hue},100%,70%)`)
    grad.addColorStop(0.5, `hsl(${180 + hue},100%,65%)`)
    grad.addColorStop(1, `hsl(${60 + hue},100%,65%)`)

    ctx.beginPath()
    ctx.arc(cx, cy, 110, start, end)

    ctx.strokeStyle = grad
    ctx.lineWidth = 10
    ctx.lineCap = "round"
    ctx.shadowBlur = 30
    ctx.shadowColor = "#00d4ff"

    ctx.stroke()
  }

  function startArc() {
    let start: number | null = null

    const animate = (ts: number) => {
      if (!start) start = ts

      const p = easeOut(Math.min((ts - start) / PH2_DUR, 1))
      drawArc(p, ts)

      arcRafRef.current = requestAnimationFrame(animate)
    }

    arcRafRef.current = requestAnimationFrame(animate)
  }

  /* =========================
     PIXEL DISSOLVE TRANSITION
  ========================== */
  function dissolve(onDone: () => void) {
    const el = containerRef.current
    if (!el) return onDone()

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")!

    canvas.width = innerWidth
    canvas.height = innerHeight
    canvas.className = "dissolveCanvas"

    el.appendChild(canvas)

    const cols = 60
    const rows = 35

    const cw = canvas.width / cols
    const ch = canvas.height / rows

    let t0: number | null = null

    const frame = (ts: number) => {
      if (!t0) t0 = ts

      const p = Math.min((ts - t0) / 1400, 1)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const dx = x * cw
          const dy = y * ch

          const dist = Math.hypot(x - cols / 2, y - rows / 2)
          const alpha = Math.max(1 - p - dist * 0.02, 0)

          ctx.fillStyle = `rgba(255,255,255,${alpha})`
          ctx.fillRect(dx, dy, cw, ch)
        }
      }

      el.style.filter = `blur(${p * 12}px)`

      if (p < 1) requestAnimationFrame(frame)
      else {
        canvas.remove()
        onDone()
      }
    }

    requestAnimationFrame(frame)
  }

  /* =========================
     INIT
  ========================== */
  useEffect(() => {
    let t0: number | null = null

    const phase1 = (ts: number) => {
      if (!t0) t0 = ts

      const p = easeOut(Math.min((ts - t0) / PH1_DUR, 1))

      pctRef.current!.textContent = `${Math.floor(p * 100)}%`

      batteryCellsRef.current.forEach((c, i) => {
        if (i < Math.floor(p * 10)) c?.classList.add("active")
      })

      setStatus(STATUS_MSGS[Math.min(1, Math.floor(p * 2))])

      if (p < 1) return (rafRef.current = requestAnimationFrame(phase1))

      ph1Ref.current?.classList.add("out")

      setTimeout(() => {
        ph2Ref.current?.classList.add("in")
        startArc()

        let t1: number | null = null

        const phase2 = (ts2: number) => {
          if (!t1) t1 = ts2

          const p2 = Math.min((ts2 - t1) / PH2_DUR, 1)

          if (p2 < 1) return requestAnimationFrame(phase2)

          cancelAnimationFrame(arcRafRef.current)

          setTimeout(() => {
            ph2Ref.current?.classList.add("out")

            dissolve(() => {
              ph3Ref.current?.classList.add("in")

              let i = 0
              const type = setInterval(() => {
                if (!nameRef.current) return

                nameRef.current.textContent = FULL_NAME.slice(0, i++)
                if (i > FULL_NAME.length) {
                  clearInterval(type)

                  setTimeout(() => {
                    onLoadingComplete()
                  }, 1500)
                }
              }, 50)
            })
          }, 500)
        }

        requestAnimationFrame(phase2)
      }, 500)
    }

    requestAnimationFrame(phase1)

    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  /* =========================
     UI
  ========================== */
  return (
    <>
      <style>{css}</style>

      <div ref={containerRef} className="root">

        {/* PHASE 1 */}
        <div ref={ph1Ref} className="ph1">
          <div className="battery">
            <div className="top">ARC ENERGY SYSTEM</div>

            <div className="cells">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} ref={el => batteryCellsRef.current[i] = el} />
              ))}
            </div>

            <div className="bottom">
              <div ref={pctRef} className="pct">0%</div>
              <div ref={msgRef} className="msg">Initializing...</div>
            </div>
          </div>
        </div>

        {/* PHASE 2 */}
        <div ref={ph2Ref} className="ph2">
          <canvas ref={canvasRef} width={300} height={300} />
        </div>

        {/* PHASE 3 */}
        <div ref={ph3Ref} className="ph3">
          <div className="name" ref={nameRef} />
        </div>

      </div>
    </>
  )
}

/* =========================
   CSS (FULL)
========================= */
const css = `
.root{
  position:fixed;
  inset:0;
  background:#020817;
  overflow:hidden;
  font-family:system-ui;
}

/* PHASE STATES */
.ph1,.ph2,.ph3{
  position:absolute;
  inset:0;
  display:flex;
  align-items:center;
  justify-content:center;
  transition:1s ease;
}

.ph1.out{ opacity:0; transform:translateY(-20px); }
.ph2{ opacity:0; }
.ph2.in{ opacity:1; }
.ph2.out{ opacity:0; }
.ph3{ opacity:0; }
.ph3.in{ opacity:1; }

/* PHASE 1 HUD */
.battery{
  width:700px;
  padding:24px;
  border:1px solid #00d4ff44;
  border-radius:20px;
  background:rgba(10,20,35,.9);
  backdrop-filter:blur(20px);
}

.top{
  font-size:12px;
  letter-spacing:4px;
  color:#fff;
  margin-bottom:18px;
}

.cells{
  display:flex;
  gap:8px;
}

.cells div{
  width:40px;
  height:70px;
  border:1px solid #fff2;
  position:relative;
  overflow:hidden;
}

.cells div.active::after{
  content:"";
  position:absolute;
  inset:0;
  background:linear-gradient(red,orange,yellow,green);
}

/* TEXT */
.bottom{
  display:flex;
  justify-content:space-between;
  margin-top:18px;
}

.pct{
  font-size:28px;
  color:#fff;
}

.msg{
  color:#9adfff;
  transition:.2s ease;
}

/* PHASE 2 */
canvas{
  filter:drop-shadow(0 0 20px #00d4ff);
}

/* PHASE 3 */
.name{
  font-size:64px;
  color:white;
}

/* DISSOLVE */
.dissolveCanvas{
  position:absolute;
  inset:0;
  z-index:999;
}
`

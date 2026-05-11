"use client"

import { useEffect, useRef } from "react"

type Props = {
  onLoadingComplete: () => void
}

const FULL_NAME = "Jason Vianney Sugiarto"

const STATUS_MSGS = [
  "Initializing System...",
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

  const dustRef = useRef<HTMLDivElement>(null)

  const batteryCellsRef = useRef<(HTMLDivElement | null)[]>([])

  const atomRefs = useRef<(HTMLDivElement | null)[]>([])

  const rafRef = useRef<number>(0)
  const starsRafRef = useRef<number>(0)
  const hyperRafRef = useRef<number>(0)
  const arcRafRef = useRef<number>(0)

  function easeOut(t: number) {
    return 1 - Math.pow(1 - t, 3)
  }

  function typeWriter(
    el: HTMLElement,
    text: string,
    speed: number,
    cb?: () => void
  ) {
    el.textContent = ""
    let i = 0

    const timer = setInterval(() => {
      el.textContent += text.charAt(i)
      i++

      if (i >= text.length) {
        clearInterval(timer)
        cb?.()
      }
    }, speed)
  }

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

    const bgGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 150)

    bgGlow.addColorStop(
      0,
      `hsla(${190 + hue},100%,70%,${0.16 + pulse * 0.10})`
    )
    bgGlow.addColorStop(
      0.5,
      `hsla(${220 + hue},100%,60%,${0.08 + pulse * 0.06})`
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
    orbGlow.addColorStop(0.35, `hsla(${190 + hue},100%,70%,.92)`)
    orbGlow.addColorStop(0.75, `hsla(${190 + hue},100%,60%,.35)`)
    orbGlow.addColorStop(1, "transparent")

    ctx.beginPath()
    ctx.arc(cx, cy, orbR + 26, 0, Math.PI * 2)
    ctx.fillStyle = orbGlow
    ctx.fill()

    ctx.beginPath()
    ctx.arc(cx, cy, orbR * 0.58, 0, Math.PI * 2)

    ctx.fillStyle = "#ffffff"

    ctx.shadowColor = `hsla(${190 + hue},100%,75%,1)`
    ctx.shadowBlur = 34

    ctx.fill()

    ctx.shadowBlur = 0

    // POWER ICON
    ctx.save()
    ctx.translate(cx, cy)

    const iconR = 10

    ctx.beginPath()
    ctx.arc(
      0,
      0,
      iconR,
      (-Math.PI / 2) + 0.55,
      (-Math.PI / 2) - 0.55 + Math.PI * 2
    )

    ctx.strokeStyle = "#0f172a"
    ctx.lineWidth = 2.5
    ctx.lineCap = "round"
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(0, -iconR - 2)
    ctx.lineTo(0, -iconR * 0.2)

    ctx.strokeStyle = "#0f172a"
    ctx.lineWidth = 2.5
    ctx.lineCap = "round"
    ctx.stroke()

    ctx.restore()
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

    if (!atom) return

    atom.classList.add("active")
  }

  function buildSkills() {
    const grid = skillsRef.current

    if (!grid) return

    grid.innerHTML = ""

    SKILLS.forEach((s, idx) => {
      const card = document.createElement("div")

      card.className = "sl-skill-card"

      card.innerHTML = `
        <div class="sl-skill-name">${s.label}</div>
      `

      card.style.background = `linear-gradient(135deg,${s.grad})`

      grid.appendChild(card)

      setTimeout(() => {
        card.classList.add("sl-card-show")
      }, idx * 180)
    })
  }

  function createDustExplosion() {
    const dust = dustRef.current

    if (!dust) return

    dust.innerHTML = ""

    const frag = document.createDocumentFragment()

    for (let i = 0; i < 160; i++) {
      const p = document.createElement("div")

      p.className = "sl-dust"

      const x = (Math.random() - 0.5) * 900
      const y = (Math.random() - 0.5) * 700

      const size = 1 + Math.random() * 5
      const dur = 1.2 + Math.random() * 0.8

      p.style.cssText = `
        --tx:${x}px;
        --ty:${y}px;
        width:${size}px;
        height:${size}px;
        left:50%;
        top:50%;
        animation-duration:${dur}s;
      `

      frag.appendChild(p)
    }

    dust.appendChild(frag)
  }

  function initStars() {
    const cv = starsRef.current

    if (!cv) return

    cv.width = window.innerWidth
    cv.height = window.innerHeight

    const ctx = cv.getContext("2d")

    if (!ctx) return

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

        ctx.fillStyle = "rgba(255,255,255,.9)"
        ctx.fill()
      })

      starsRafRef.current = requestAnimationFrame(loop)
    }

    loop()
  }

  // HYPERSPACE EFFECT
  function runHyperspace(onDone: () => void) {
    const wrap = hyperRef.current
    const cv = hyperCanvasRef.current

    if (!wrap || !cv) {
      onDone()
      return
    }

    cv.width = window.innerWidth
    cv.height = window.innerHeight

    wrap.style.opacity = "1"

    const ctx = cv.getContext("2d")
    if (!ctx) return

    const cx = cv.width / 2
    const cy = cv.height / 2

    const TOTAL = 2400

    const lines = Array.from({ length: 240 }, () => ({
      angle: Math.random() * Math.PI * 2,
      speed: 0.8 + Math.random() * 2,
      hue: Math.random() * 360,
    }))

    let t0: number | null = null

    function frame(ts: number) {
      if (!t0) t0 = ts

      const progress = Math.min((ts - t0) / TOTAL, 1)

      const ease = 1 - Math.pow(1 - progress, 3)

      ctx.fillStyle = "rgba(1,10,20,.16)"
      ctx.fillRect(0, 0, cv.width, cv.height)

      lines.forEach((l) => {
        const dist =
          ease * Math.max(cv.width, cv.height) * l.speed

        const x1 = cx + Math.cos(l.angle) * dist
        const y1 = cy + Math.sin(l.angle) * dist

        const x2 = cx + Math.cos(l.angle) * (dist + 140)
        const y2 = cy + Math.sin(l.angle) * (dist + 140)

        const grad = ctx.createLinearGradient(x1, y1, x2, y2)

        grad.addColorStop(
          0,
          `hsla(${l.hue},100%,80%,0)`
        )

        grad.addColorStop(
          1,
          `hsla(${l.hue},100%,90%,.95)`
        )

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)

        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5

        ctx.stroke()
      })

      if (progress < 1) {
        hyperRafRef.current =
          requestAnimationFrame(frame)
      } else {
        wrap.style.transition = "opacity .8s ease"
        wrap.style.opacity = "0"

        setTimeout(onDone, 800)
      }
    }

    hyperRafRef.current =
      requestAnimationFrame(frame)
  }

  useEffect(() => {
    drawArc(0, 0)

    let t0: number | null = null

    function phase1(ts: number) {
      if (!t0) t0 = ts

      const raw = Math.min((ts - t0) / PH1_DUR, 1)
      const p = easeOut(raw)

      const pct = Math.floor(p * 100)

      if (pctRef.current) {
        pctRef.current.textContent = `${pct}%`
      }

      const activeCells = Math.min(
        Math.floor(p * 10),
        10
      )

      batteryCellsRef.current.forEach((cell, idx) => {
        if (!cell) return

        if (idx < activeCells) {
          cell.classList.add("active")
        }
      })

      const mi = Math.min(
        Math.floor(p * STATUS_MSGS.length),
        STATUS_MSGS.length - 1
      )

      if (
        msgRef.current &&
        msgRef.current.dataset.msg !== STATUS_MSGS[mi]
      ) {
        msgRef.current.dataset.msg = STATUS_MSGS[mi]

        typeWriter(
          msgRef.current,
          STATUS_MSGS[mi],
          38
        )
      }

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

          const r2 = Math.min(
            (ts2 - t1) / PH2_DUR,
            1
          )

          if (r2 < 1) {
            rafRef.current =
              requestAnimationFrame(phase2)
            return
          }

          cancelAnimationFrame(arcRafRef.current)

          setTimeout(() => {
            ph2Ref.current?.classList.add("sl-out")

            // HYPERSPACE BACK
            runHyperspace(() => {
              initStars()

              ph3Ref.current?.classList.add("sl-in")

              const welcome =
                document.querySelector(
                  ".sl-welcome-line"
                ) as HTMLDivElement

              const expert =
                document.querySelector(
                  ".sl-expertise-label"
                ) as HTMLDivElement

              welcome?.classList.add("show")

              setTimeout(() => {
                if (nameRef.current) {
                  typeWriter(
                    nameRef.current,
                    FULL_NAME,
                    60,
                    () => {
                      expert?.classList.add("show")

                      buildSkills()

                      setTimeout(() => {
                        createDustExplosion()

                        containerRef.current?.classList.add(
                          "sl-content-dust-out"
                        )

                        setTimeout(() => {
                          onLoadingComplete()
                        }, 1400)
                      }, 2600)
                    }
                  )
                }
              }, 500)
            })
          }, 700)
        }

        rafRef.current = requestAnimationFrame(phase2)
      }, 500)
    }

    rafRef.current = requestAnimationFrame(phase1)

    return () => {
      cancelAnimationFrame(rafRef.current)
      cancelAnimationFrame(starsRafRef.current)
      cancelAnimationFrame(hyperRafRef.current)
      cancelAnimationFrame(arcRafRef.current)
    }
  }, [onLoadingComplete])

  return (
    <>
      <style>{`
        *{
          box-sizing:border-box;
        }

        .sl-root{
          position:fixed;
          inset:0;
          overflow:hidden;
          background:#020817;
          display:flex;
          align-items:center;
          justify-content:center;
        }

        .sl-stars-canvas,
        .sl-hyper-wrap,
        .sl-dust-wrap{
          position:absolute;
          inset:0;
        }

        .sl-hyper-wrap{
          opacity:0;
          pointer-events:none;
          z-index:20;
        }

        .sl-content{
          position:fixed;
          inset:0;
          display:flex;
          align-items:center;
          justify-content:center;
          z-index:10;
        }

        .sl-ph1,
        .sl-ph2,
        .sl-ph3{
          position:absolute;
          top:50%;
          left:50%;
          transform:translate(-50%,-50%);
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
        }

        .sl-ph1{
          transition:1s ease;
        }

        .sl-ph1.sl-out{
          opacity:0;
          transform:translate(-50%,-56%);
        }

        .sl-ph2{
          opacity:0;
          transform:translate(-50%,-50%) scale(.85);
          transition:1s ease;
        }

        .sl-ph2.sl-in{
          opacity:1;
          transform:translate(-50%,-50%) scale(1);
        }

        .sl-ph2.sl-out{
          opacity:0;
          transform:translate(-50%,-50%) scale(1.15);
        }

        .sl-ph3{
          opacity:0;
          width:min(900px,92vw);
          transform:translate(-50%,-45%);
          transition:1s ease;
        }

        .sl-ph3.sl-in{
          opacity:1;
          transform:translate(-50%,-50%);
        }

        /* BATTERY */

        .sl-battery-shell{
          position:relative;
          width:min(760px,90vw);
          padding:34px;
          border-radius:30px;
          overflow:hidden;
          background:
            linear-gradient(
              180deg,
              rgba(10,20,35,.92),
              rgba(5,10,18,.96)
            );

          border:1px solid rgba(0,212,255,.24);

          box-shadow:
            0 0 40px rgba(0,212,255,.14),
            inset 0 0 40px rgba(0,212,255,.06);

          backdrop-filter:blur(18px);
        }

        .sl-battery-topline{
          display:flex;
          justify-content:space-between;
          margin-bottom:26px;
        }

        .sl-battery-title{
          color:white;
          font-size:12px;
          font-weight:700;
          letter-spacing:.32em;
        }

        .sl-battery-mini{
          display:flex;
          gap:6px;
        }

        .sl-battery-mini span{
          width:7px;
          height:7px;
          border-radius:50%;
          background:rgba(255,255,255,.2);
          animation:miniBlink 1.8s infinite;
        }

        .sl-battery-cells{
          display:flex;
          gap:12px;
          justify-content:center;
          padding:18px;
          border-radius:22px;
          background:rgba(255,255,255,.03);
        }

        .sl-battery-cell{
          width:54px;
          height:78px;
          border-radius:14px;
          overflow:hidden;
          position:relative;
          border:1px solid rgba(255,255,255,.12);
        }

        .sl-battery-cell::before{
          content:"";
          position:absolute;
          inset:auto 0 0 0;
          height:0%;
          transition:1s ease;
        }

        .sl-battery-cell.active::before{
          height:100%;
        }

        .sl-battery-cell:nth-child(1)::before{ background:#ff2b2b; }
        .sl-battery-cell:nth-child(2)::before{ background:#ff5b1f; }
        .sl-battery-cell:nth-child(3)::before{ background:#ff7f11; }
        .sl-battery-cell:nth-child(4)::before{ background:#ffb703; }
        .sl-battery-cell:nth-child(5)::before{ background:#ffd60a; }
        .sl-battery-cell:nth-child(6)::before{ background:#f4ff52; }
        .sl-battery-cell:nth-child(7)::before{ background:#b9ff66; }
        .sl-battery-cell:nth-child(8)::before{ background:#3dff91; }
        .sl-battery-cell:nth-child(9)::before{ background:#00e676; }
        .sl-battery-cell:nth-child(10)::before{ background:#00c853; }

        .sl-battery-bottom{
          margin-top:24px;
          display:flex;
          justify-content:space-between;
          align-items:flex-end;
        }

        .sl-charge-pct{
          font-size:56px;
          font-weight:900;
          color:white;
        }

        .sl-loading-text{
          color:#e8f9ff;
          font-size:12px;
          font-weight:700;
          min-width:220px;
          text-align:right;
          letter-spacing:.12em;
          line-height:1.8;
        }

        /* ARC REACTOR */

        .sl-arc-wrap{
          position:relative;
          width:340px;
          height:340px;
          display:flex;
          align-items:center;
          justify-content:center;
        }

        .sl-ring{
          position:absolute;
          border-radius:50%;
        }

        .sl-ring-1{
          width:94%;
          height:94%;
          border:1px solid rgba(0,212,255,.38);
          animation:spin 8s linear infinite;
          box-shadow:0 0 30px rgba(0,212,255,.22);
        }

        .sl-ring-2{
          width:74%;
          height:74%;
          border:1px solid rgba(168,85,247,.42);
          animation:spinReverse 6s linear infinite;
          box-shadow:0 0 24px rgba(168,85,247,.18);
        }

        .sl-arc-canvas{
          width:170px;
          height:170px;
          border-radius:50%;
          filter:
            drop-shadow(0 0 30px rgba(0,212,255,.7))
            drop-shadow(0 0 16px rgba(168,85,247,.4));
        }

        /* MOVING ATOMS */

        .sl-atom{
          position:absolute;
          border-radius:50%;
          opacity:0;
          transition:
            opacity .8s ease,
            transform .8s ease;
        }

        .sl-atom.active{
          opacity:1;
        }

        .sl-atom::before{
          content:"";
          position:absolute;
          top:-6px;
          left:50%;
          transform:translateX(-50%);
          border-radius:50%;
        }

        .sl-atom-1{
          width:180px;
          height:180px;
          border:1px solid rgba(0,212,255,.34);
          animation:spin 4s linear infinite;
        }

        .sl-atom-1::before{
          width:12px;
          height:12px;
          background:#00d4ff;
          box-shadow:0 0 24px #00d4ff;
        }

        .sl-atom-2{
          width:230px;
          height:230px;
          border:1px solid rgba(168,85,247,.34);
          animation:spinReverse 6s linear infinite;
        }

        .sl-atom-2::before{
          width:11px;
          height:11px;
          background:#a855f7;
          box-shadow:0 0 24px #a855f7;
        }

        .sl-atom-3{
          width:280px;
          height:280px;
          border:1px solid rgba(52,211,153,.34);
          animation:spin 8s linear infinite;
        }

        .sl-atom-3::before{
          width:11px;
          height:11px;
          background:#34d399;
          box-shadow:0 0 24px #34d399;
        }

        /* PHASE 3 */

        .sl-welcome-line,
        .sl-expertise-label{
          opacity:0;
          transform:translateY(20px);
          transition:.9s ease;
        }

        .sl-welcome-line.show,
        .sl-expertise-label.show{
          opacity:1;
          transform:translateY(0);
        }

        .sl-welcome-line{
          color:#d8b4fe;
          margin-bottom:20px;
          letter-spacing:.28em;
          font-size:12px;
          font-weight:700;
        }

        .sl-name{
          font-size:clamp(34px,6vw,76px);
          font-weight:900;
          color:white;
          min-height:90px;
          text-align:center;
        }

        .sl-divline{
          width:180px;
          height:1px;
          margin:22px 0 26px;
          background:
            linear-gradient(
              90deg,
              transparent,
              #00d4ff,
              transparent
            );
        }

        .sl-expertise-label{
          margin-bottom:24px;
          color:#7dd3fc;
          font-size:13px;
          font-weight:700;
          letter-spacing:.24em;
        }

        .sl-skills-grid{
          display:grid;
          grid-template-columns:repeat(5,1fr);
          gap:14px;
          width:min(900px,92vw);
        }

        .sl-skill-card{
          opacity:0;
          min-height:62px;
          padding:16px;
          border-radius:16px;
          border:1px solid rgba(255,255,255,.08);
          backdrop-filter:blur(12px);
          display:flex;
          align-items:center;
          justify-content:center;
        }

        .sl-card-show{
          animation:cardIn .7s ease forwards;
        }

        .sl-skill-name{
          color:white;
          font-size:13px;
          font-weight:700;
          text-transform:uppercase;
        }

        .sl-dust{
          position:absolute;
          border-radius:50%;
          background:
            radial-gradient(
              circle,
              rgba(255,255,255,.95),
              rgba(168,85,247,.55),
              transparent
            );

          animation:slDust linear forwards;
        }

        .sl-content-dust-out{
          animation:contentDust 1.4s ease forwards;
        }

        @keyframes spin{
          to{
            transform:rotate(360deg);
          }
        }

        @keyframes spinReverse{
          to{
            transform:rotate(-360deg);
          }
        }

        @keyframes miniBlink{
          0%{
            opacity:.2;
          }
          50%{
            opacity:1;
          }
          100%{
            opacity:.2;
          }
        }

        @keyframes cardIn{
          from{
            opacity:0;
            transform:translateY(24px);
          }
          to{
            opacity:1;
            transform:translateY(0);
          }
        }

        @keyframes slDust{
          0%{
            opacity:0;
            transform:translate(0,0) scale(1);
          }

          10%{
            opacity:1;
          }

          100%{
            opacity:0;
            transform:
              translate(var(--tx),var(--ty))
              scale(0);
          }
        }

        @keyframes contentDust{
          0%{
            opacity:1;
            transform:scale(1);
          }

          100%{
            opacity:0;
            transform:scale(1.18);
            filter:blur(12px);
          }
        }

        @media(max-width:768px){

          .sl-battery-shell{
            padding:24px 18px;
          }

          .sl-battery-cells{
            gap:8px;
          }

          .sl-battery-cell{
            width:32px;
            height:58px;
          }

          .sl-charge-pct{
            font-size:36px;
          }

          .sl-loading-text{
            font-size:10px;
            min-width:150px;
          }

          .sl-arc-wrap{
            width:280px;
            height:280px;
          }

          .sl-atom-1{
            width:150px;
            height:150px;
          }

          .sl-atom-2{
            width:190px;
            height:190px;
          }

          .sl-atom-3{
            width:230px;
            height:230px;
          }

          .sl-skills-grid{
            grid-template-columns:repeat(2,1fr);
          }
        }
      `}</style>

      <div ref={containerRef} className="sl-root">

        <canvas
          ref={starsRef}
          className="sl-stars-canvas"
        />

        <div ref={hyperRef} className="sl-hyper-wrap">
          <canvas
            ref={hyperCanvasRef}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
          />
        </div>

        <div
          ref={dustRef}
          className="sl-dust-wrap"
        />

        <div className="sl-content">

          {/* PHASE 1 */}

          <div ref={ph1Ref} className="sl-ph1">

            <div className="sl-battery-shell">

              <div className="sl-battery-topline">
                <div className="sl-battery-title">
                  ARC ENERGY SYSTEM
                </div>

                <div className="sl-battery-mini">
                  <span />
                  <span />
                  <span />
                </div>
              </div>

              <div className="sl-battery-cells">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="sl-battery-cell"
                    ref={(el) => {
                      batteryCellsRef.current[i] = el
                    }}
                  />
                ))}
              </div>

              <div className="sl-battery-bottom">
                <div
                  ref={pctRef}
                  className="sl-charge-pct"
                >
                  0%
                </div>

                <div
                  ref={msgRef}
                  className="sl-loading-text"
                >
                  Initializing...
                </div>
              </div>

            </div>
          </div>

          {/* PHASE 2 */}

          <div ref={ph2Ref} className="sl-ph2">

            <div className="sl-arc-wrap">

              <div className="sl-ring sl-ring-1" />
              <div className="sl-ring sl-ring-2" />

              <div
                ref={(el) => {
                  atomRefs.current[0] = el
                }}
                className="sl-atom sl-atom-1"
              />

              <div
                ref={(el) => {
                  atomRefs.current[1] = el
                }}
                className="sl-atom sl-atom-2"
              />

              <div
                ref={(el) => {
                  atomRefs.current[2] = el
                }}
                className="sl-atom sl-atom-3"
              />

              <canvas
                ref={canvasRef}
                className="sl-arc-canvas"
                width={300}
                height={300}
              />

            </div>
          </div>

          {/* PHASE 3 */}

          <div ref={ph3Ref} className="sl-ph3">

            <div className="sl-welcome-line">
              ◈ Welcome To My Portfolio ◈
            </div>

            <div
              ref={nameRef}
              className="sl-name"
            />

            <div className="sl-divline" />

            <div className="sl-expertise-label">
              My Expertise
            </div>

            <div
              ref={skillsRef}
              className="sl-skills-grid"
            />

          </div>

        </div>
      </div>
    </>
  )
}

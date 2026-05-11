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
const PH2_DUR = 2600

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
  const hyperCanRef = useRef<HTMLCanvasElement>(null)

  const dustRef = useRef<HTMLDivElement>(null)

  const batteryCellsRef = useRef<(HTMLDivElement | null)[]>([])
  const atomRefs = useRef<(HTMLDivElement | null)[]>([])

  const rafRef = useRef(0)
  const hyperRafRef = useRef<number>(0)
  const starsRafRef = useRef<number>(0)

  const arcRafRef = useRef<number>(0)
  const arcActiveRef = useRef(false)

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

  function drawArc(progress: number, hueShift = 0, pulse = 0) {
    const cv = canvasRef.current
    if (!cv) return

    const ctx = cv.getContext("2d")
    if (!ctx) return

    const w = cv.width
    const h = cv.height

    const cx = w / 2
    const cy = h / 2
    const r = w / 2 - 18

    ctx.clearRect(0, 0, w, h)

    // OUTER GLOW
    const bgGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, r + 60)

    bgGlow.addColorStop(
      0,
      `hsla(${190 + hueShift},100%,70%,${0.16 + pulse * 0.12})`
    )

    bgGlow.addColorStop(
      0.5,
      `hsla(${210 + hueShift},100%,60%,${0.08 + pulse * 0.08})`
    )

    bgGlow.addColorStop(1, "transparent")

    ctx.beginPath()
    ctx.arc(cx, cy, r + 60, 0, Math.PI * 2)
    ctx.fillStyle = bgGlow
    ctx.fill()

    // TRACK
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.strokeStyle = "rgba(255,255,255,.08)"
    ctx.lineWidth = 8
    ctx.stroke()

    // PROGRESS ARC
    const start = -Math.PI / 2
    const end = start + Math.PI * 2 * progress

    const g = ctx.createLinearGradient(0, 0, w, h)

    g.addColorStop(0, `hsl(${280 + hueShift},100%,70%)`)
    g.addColorStop(0.3, `hsl(${200 + hueShift},100%,65%)`)
    g.addColorStop(0.6, `hsl(${160 + hueShift},100%,60%)`)
    g.addColorStop(1, `hsl(${50 + hueShift},100%,65%)`)

    ctx.beginPath()
    ctx.arc(cx, cy, r, start, end)

    ctx.strokeStyle = g
    ctx.lineWidth = 10
    ctx.lineCap = "round"

    ctx.shadowColor = `hsl(${190 + hueShift},100%,75%)`
    ctx.shadowBlur = 34 + pulse * 20

    ctx.stroke()
    ctx.shadowBlur = 0

    // INNER CORE
    const orbR = 30 + pulse * 4

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
      `hsla(${190 + hueShift},100%,75%,0.95)`
    )
    orbGlow.addColorStop(
      0.7,
      `hsla(${190 + hueShift},100%,60%,0.45)`
    )
    orbGlow.addColorStop(1, "transparent")

    ctx.beginPath()
    ctx.arc(cx, cy, orbR + 24, 0, Math.PI * 2)

    ctx.fillStyle = orbGlow
    ctx.fill()

    ctx.beginPath()
    ctx.arc(cx, cy, orbR * 0.75, 0, Math.PI * 2)

    ctx.fillStyle = "rgba(255,255,255,.98)"
    ctx.shadowColor = `hsla(${190 + hueShift},100%,75%,1)`
    ctx.shadowBlur = 36 + pulse * 18

    ctx.fill()
    ctx.shadowBlur = 0

    // POWER ICON
    ctx.save()

    ctx.translate(cx, cy)

    const iconR = 16

    ctx.beginPath()
    ctx.arc(
      0,
      0,
      iconR,
      (-Math.PI / 2) + 0.5,
      (-Math.PI / 2) - 0.5 + Math.PI * 2
    )

    ctx.strokeStyle = `hsl(${200 + hueShift},100%,35%)`
    ctx.lineWidth = 3
    ctx.lineCap = "round"
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(0, -iconR - 2)
    ctx.lineTo(0, -3)

    ctx.strokeStyle = `hsl(${200 + hueShift},100%,35%)`
    ctx.lineWidth = 3
    ctx.lineCap = "round"
    ctx.stroke()

    ctx.restore()
  }

  function startArcAnimation() {
    arcActiveRef.current = true

    let startTime: number | null = null

    function animate(ts: number) {
      if (!arcActiveRef.current) return

      if (!startTime) startTime = ts

      const raw = Math.min((ts - startTime) / PH2_DUR, 1)
      const progress = easeOut(raw)

      const hueShift = (ts / 10) % 360
      const pulse = (Math.sin(ts / 420) + 1) / 2

      drawArc(progress, hueShift, pulse)

      arcRafRef.current = requestAnimationFrame(animate)
    }

    arcRafRef.current = requestAnimationFrame(animate)
  }

  function stopArcAnimation() {
    arcActiveRef.current = false
    cancelAnimationFrame(arcRafRef.current)
  }

  function activateAtoms(count: number) {
    atomRefs.current.forEach((atom, idx) => {
      if (!atom) return

      if (idx < count) {
        atom.classList.add("active")
      }
    })
  }

  function buildSkills() {
    const grid = skillsRef.current
    if (!grid) return

    grid.innerHTML = ""

    SKILLS.forEach((s, idx) => {
      const card = document.createElement("div")

      card.className = "sl-skill-card"

      card.innerHTML = `
        <div class="sl-skill-name">
          ${s.label}
        </div>
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
      const dur = 1.1 + Math.random() * 0.8

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

  function runHyperspace(onDone: () => void) {
    const cv = hyperCanRef.current
    const wrap = hyperRef.current

    if (!cv || !wrap) {
      onDone()
      return
    }

    cv.width = window.innerWidth
    cv.height = window.innerHeight

    wrap.style.opacity = "1"

    const ctx = cv.getContext("2d")!

    const cx = cv.width / 2
    const cy = cv.height / 2

    const TOTAL = 2400

    const lines = Array.from({ length: 220 }, () => ({
      angle: Math.random() * Math.PI * 2,
      speed: 0.8 + Math.random() * 2,
      hue: Math.random() * 360,
    }))

    let t0: number | null = null

    function frame(ts: number) {
      if (!t0) t0 = ts

      const prog = Math.min((ts - t0) / TOTAL, 1)
      const ease = 1 - Math.pow(1 - prog, 3)

      ctx.fillStyle = "rgba(1,11,20,.18)"
      ctx.fillRect(0, 0, cv.width, cv.height)

      lines.forEach((l) => {
        const dist =
          ease * Math.max(cv.width, cv.height) * l.speed

        const x1 = cx + Math.cos(l.angle) * dist
        const y1 = cy + Math.sin(l.angle) * dist

        const x2 = cx + Math.cos(l.angle) * (dist + 120)
        const y2 = cy + Math.sin(l.angle) * (dist + 120)

        const grad = ctx.createLinearGradient(x1, y1, x2, y2)

        grad.addColorStop(
          0,
          `hsla(${l.hue},100%,80%,0)`
        )

        grad.addColorStop(
          1,
          `hsla(${l.hue},100%,90%,.9)`
        )

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)

        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5

        ctx.stroke()
      })

      if (prog < 1) {
        hyperRafRef.current =
          requestAnimationFrame(frame)
      } else {
        wrap.style.transition = "opacity .6s ease"
        wrap.style.opacity = "0"

        setTimeout(onDone, 600)
      }
    }

    hyperRafRef.current =
      requestAnimationFrame(frame)
  }

  useEffect(() => {
    drawArc(0, 0, 0)

    let t0: number | null = null

    function phase1(ts: number) {
      if (!t0) t0 = ts

      const raw = Math.min(
        (ts - t0) / PH1_DUR,
        1
      )

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
        rafRef.current =
          requestAnimationFrame(phase1)

        return
      }

      ph1Ref.current?.classList.add("sl-out")

      setTimeout(() => {
        ph2Ref.current?.classList.add("sl-in")

        setTimeout(() => activateAtoms(1), 200)
        setTimeout(() => activateAtoms(2), 850)
        setTimeout(() => activateAtoms(3), 1450)

        startArcAnimation()

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

          stopArcAnimation()

          setTimeout(() => {
            ph2Ref.current?.classList.add("sl-out")

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
          }, 900)
        }

        rafRef.current =
          requestAnimationFrame(phase2)
      }, 400)
    }

    rafRef.current =
      requestAnimationFrame(phase1)

    return () => {
      cancelAnimationFrame(rafRef.current)
      cancelAnimationFrame(hyperRafRef.current)
      cancelAnimationFrame(starsRafRef.current)
      cancelAnimationFrame(arcRafRef.current)

      arcActiveRef.current = false
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
          text-align:center;
        }

        .sl-ph1{
          transition:opacity 1s ease, transform 1s ease;
        }

        .sl-ph1.sl-out{
          opacity:0;
          transform:translate(-50%,-56%);
        }

        .sl-ph2{
          opacity:0;
          transform:translate(-50%,-50%) scale(.85);
          transition:opacity 1s ease, transform 1s ease;
        }

        .sl-ph2.sl-in{
          opacity:1;
          transform:translate(-50%,-50%) scale(1);
        }

        .sl-ph2.sl-out{
          opacity:0;
          transform:translate(-50%,-50%) scale(1.12);
        }

        .sl-ph3{
          opacity:0;
          width:min(900px,92vw);
          transform:translate(-50%,-45%);
          transition:opacity 1s ease, transform 1s ease;
        }

        .sl-ph3.sl-in{
          opacity:1;
          transform:translate(-50%,-50%);
        }

        .sl-arc-wrap{
          position:relative;
          width:360px;
          height:360px;
          display:flex;
          align-items:center;
          justify-content:center;
        }

        .sl-ring{
          position:absolute;
          border-radius:50%;
        }

        .sl-ring-1{
          width:96%;
          height:96%;
          border:1px solid rgba(0,212,255,.45);
          box-shadow:
            0 0 30px rgba(0,212,255,.25),
            inset 0 0 18px rgba(0,212,255,.10);

          animation:spin 10s linear infinite;
        }

        .sl-ring-2{
          width:78%;
          height:78%;
          border:1px solid rgba(168,85,247,.45);

          box-shadow:
            0 0 24px rgba(168,85,247,.20),
            inset 0 0 14px rgba(168,85,247,.08);

          animation:spinReverse 7s linear infinite;
        }

        .sl-arc-canvas{
          width:190px;
          height:190px;
          border-radius:50%;

          filter:
            drop-shadow(0 0 34px rgba(0,212,255,.75))
            drop-shadow(0 0 18px rgba(168,85,247,.45));
        }

        /* ORBIT */

        .sl-atom{
          position:absolute;
          border-radius:50%;
          opacity:0;

          transition:
            opacity .9s cubic-bezier(.2,.8,.2,1),
            transform .9s cubic-bezier(.2,.8,.2,1);

          transform:scale(.5) rotate(-90deg);
        }

        .sl-atom.active{
          opacity:1;
          transform:scale(1) rotate(0deg);
        }

        .sl-atom::before{
          content:"";
          position:absolute;
          left:50%;
          transform:translateX(-50%);
          border-radius:50%;
          box-shadow:
            0 0 20px currentColor,
            0 0 40px currentColor;
        }

        .sl-atom-1{
          width:170px;
          height:170px;

          border:
            2px solid rgba(0,212,255,.32);

          box-shadow:
            0 0 20px rgba(0,212,255,.16);

          animation:spin 5s linear infinite;
        }

        .sl-atom-1::before{
          width:12px;
          height:12px;
          top:-6px;

          background:#00d4ff;
          color:#00d4ff;
        }

        .sl-atom-2{
          width:235px;
          height:235px;

          border:
            2px solid rgba(168,85,247,.32);

          box-shadow:
            0 0 20px rgba(168,85,247,.16);

          animation:spinReverse 7s linear infinite;
        }

        .sl-atom-2::before{
          width:11px;
          height:11px;
          top:-6px;

          background:#a855f7;
          color:#a855f7;
        }

        .sl-atom-3{
          width:300px;
          height:300px;

          border:
            2px solid rgba(52,211,153,.32);

          box-shadow:
            0 0 20px rgba(52,211,153,.16);

          animation:spin 9s linear infinite;
        }

        .sl-atom-3::before{
          width:11px;
          height:11px;
          top:-6px;

          background:#34d399;
          color:#34d399;
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

        .sl-dust-wrap{
          pointer-events:none;
          z-index:100;
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

          animation:sl-dust-move linear forwards;
        }

        @keyframes sl-dust-move{
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

            filter:blur(3px);
          }
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

        @media(max-width:768px){

          .sl-arc-wrap{
            width:280px;
            height:280px;
          }

          .sl-arc-canvas{
            width:150px;
            height:150px;
          }

          .sl-atom-1{
            width:145px;
            height:145px;
          }

          .sl-atom-2{
            width:195px;
            height:195px;
          }

          .sl-atom-3{
            width:245px;
            height:245px;
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
            ref={hyperCanRef}
            style={{
              position:"absolute",
              inset:0,
              width:"100%",
              height:"100%"
            }}
          />
        </div>

        <div ref={dustRef} className="sl-dust-wrap" />

        <div className="sl-content">

          {/* PHASE 2 */}

          <div ref={ph2Ref} className="sl-ph2">

            <div className="sl-arc-wrap">

              <div className="sl-ring sl-ring-1" />
              <div className="sl-ring sl-ring-2" />

              <div
                ref={(el) => (atomRefs.current[0] = el)}
                className="sl-atom sl-atom-1"
              />

              <div
                ref={(el) => (atomRefs.current[1] = el)}
                className="sl-atom sl-atom-2"
              />

              <div
                ref={(el) => (atomRefs.current[2] = el)}
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

        </div>

      </div>
    </>
  )
}

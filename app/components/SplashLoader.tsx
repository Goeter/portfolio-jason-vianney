"use client"

import { useEffect, useRef } from "react"

type Props = {
  onLoadingComplete: () => void
}

const FULL_NAME =
  "Jason Vianney Sugiarto"

const STATUS_MSGS = [
  "Loading...",
  "Initializing Power Core...",
  "Arc Reactor Charging to Full Capacity...",
]

const SKILLS = [
  {
    label: "Front-end Dev",
    icon: "💻",
    grad:
      "rgba(0,212,255,0.22),rgba(59,130,246,0.22)",
  },
  {
    label: "System Analyst",
    icon: "⚙️",
    grad:
      "rgba(168,85,247,0.22),rgba(236,72,153,0.22)",
  },
  {
    label: "UI/UX Design",
    icon: "🎨",
    grad:
      "rgba(251,146,60,0.22),rgba(236,72,153,0.22)",
  },
  {
    label: "Data Analyst",
    icon: "📊",
    grad:
      "rgba(52,211,153,0.22),rgba(16,185,129,0.22)",
  },
]

const PH1_DUR = 5200
const PH2_DUR = 2600

export default function SplashLoader({
  onLoadingComplete,
}: Props) {
  const containerRef =
    useRef<HTMLDivElement>(null)

  const ph1Ref =
    useRef<HTMLDivElement>(null)

  const ph2Ref =
    useRef<HTMLDivElement>(null)

  const ph3Ref =
    useRef<HTMLDivElement>(null)

  const canvasRef =
    useRef<HTMLCanvasElement>(null)

  const pctRef =
    useRef<HTMLDivElement>(null)

  const msgRef =
    useRef<HTMLDivElement>(null)

  const nameRef =
    useRef<HTMLDivElement>(null)

  const skillsRef =
    useRef<HTMLDivElement>(null)

  const starsRef =
    useRef<HTMLCanvasElement>(null)

  const hyperRef =
    useRef<HTMLDivElement>(null)

  const hyperCanRef =
    useRef<HTMLCanvasElement>(null)

  const dustRef =
    useRef<HTMLDivElement>(null)

  const batteryCellsRef =
    useRef<(HTMLDivElement | null)[]>(
      []
    )

  const atomRefs =
    useRef<(HTMLDivElement | null)[]>([])

  const rafRef = useRef(0)

  const hyperRafRef =
    useRef<number>(0)

  const starsRafRef =
    useRef<number>(0)

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
      el.textContent += text[i]

      i++

      if (i >= text.length) {
        clearInterval(timer)
        cb?.()
      }
    }, speed)
  }

  function drawArc(
    progress: number,
    hueShift = 0
  ) {
    const cv = canvasRef.current

    if (!cv) return

    const ctx = cv.getContext("2d")

    if (!ctx) return

    const w = cv.width
    const h = cv.height

    const cx = w / 2
    const cy = h / 2

    const r = w / 2 - 12

    ctx.clearRect(0, 0, w, h)

    const glow =
      ctx.createRadialGradient(
        cx,
        cy,
        10,
        cx,
        cy,
        r + 35
      )

    glow.addColorStop(
      0,
      "rgba(255,255,255,.18)"
    )

    glow.addColorStop(
      0.5,
      `hsla(${200 + hueShift},100%,60%,.3)`
    )

    glow.addColorStop(
      1,
      "transparent"
    )

    ctx.beginPath()

    ctx.arc(
      cx,
      cy,
      r + 24,
      0,
      Math.PI * 2
    )

    ctx.fillStyle = glow
    ctx.fill()

    ctx.beginPath()

    ctx.arc(
      cx,
      cy,
      r,
      0,
      Math.PI * 2
    )

    ctx.strokeStyle =
      "rgba(255,255,255,.08)"

    ctx.lineWidth = 6

    ctx.stroke()

    const start = -Math.PI / 2

    const end =
      start + Math.PI * 2 * progress

    const g =
      ctx.createLinearGradient(
        0,
        0,
        w,
        h
      )

    g.addColorStop(
      0,
      `hsl(${280 + hueShift},100%,65%)`
    )

    g.addColorStop(
      .4,
      `hsl(${190 + hueShift},100%,60%)`
    )

    g.addColorStop(
      .7,
      `hsl(${150 + hueShift},100%,55%)`
    )

    g.addColorStop(
      1,
      `hsl(${40 + hueShift},100%,60%)`
    )

    ctx.beginPath()

    ctx.arc(cx, cy, r, start, end)

    ctx.strokeStyle = g

    ctx.lineWidth = 7

    ctx.lineCap = "round"

    ctx.shadowColor =
      `hsl(${200 + hueShift},100%,70%)`

    ctx.shadowBlur = 30

    ctx.stroke()

    ctx.shadowBlur = 0
  }

  function activateAtoms(count: number) {
    atomRefs.current.forEach(
      (atom, idx) => {
        if (!atom) return

        if (idx < count) {
          atom.classList.add("active")
        }
      }
    )
  }

  function buildSkills() {
    const grid = skillsRef.current

    if (!grid) return

    grid.innerHTML = ""

    SKILLS.forEach((s, idx) => {
      const card =
        document.createElement("div")

      card.className = "sl-skill-card"

      card.innerHTML = `
        <div class="sl-skill-icon"
          style="background:linear-gradient(135deg,${s.grad})">
          ${s.icon}
        </div>

        <div class="sl-skill-name">
          ${s.label}
        </div>
      `

      grid.appendChild(card)

      setTimeout(() => {
        card.classList.add(
          "sl-card-show"
        )
      }, idx * 180)
    })
  }

  function createDustExplosion() {
    const dust = dustRef.current

    if (!dust) return

    dust.innerHTML = ""

    const frag =
      document.createDocumentFragment()

    for (let i = 0; i < 160; i++) {
      const p =
        document.createElement("div")

      p.className = "sl-dust"

      const x =
        (Math.random() - .5) * 900

      const y =
        (Math.random() - .5) * 700

      const size =
        1 + Math.random() * 5

      const dur =
        1.1 + Math.random() * .8

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

    const stars = Array.from(
      { length: 90 },
      () => ({
        x:
          Math.random() * cv.width,
        y:
          Math.random() * cv.height,
        r:
          Math.random() * 2,
      })
    )

    function loop() {
      ctx.clearRect(
        0,
        0,
        cv.width,
        cv.height
      )

      stars.forEach((s) => {
        ctx.beginPath()

        ctx.arc(
          s.x,
          s.y,
          s.r,
          0,
          Math.PI * 2
        )

        ctx.fillStyle =
          "rgba(255,255,255,.9)"

        ctx.fill()
      })

      starsRafRef.current =
        requestAnimationFrame(loop)
    }

    loop()
  }

  function runHyperspace(
    onDone: () => void
  ) {
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

    const lines = Array.from(
      { length: 220 },
      () => ({
        angle:
          Math.random() *
          Math.PI *
          2,
        speed:
          0.8 +
          Math.random() * 2,
        hue:
          Math.random() * 360,
      })
    )

    let t0: number | null = null

    function frame(ts: number) {
      if (!t0) t0 = ts

      const prog = Math.min(
        (ts - t0) / TOTAL,
        1
      )

      const ease =
        1 - Math.pow(1 - prog, 3)

      ctx.fillStyle =
        "rgba(1,11,20,.18)"

      ctx.fillRect(
        0,
        0,
        cv.width,
        cv.height
      )

      lines.forEach((l) => {
        const dist =
          ease *
          Math.max(
            cv.width,
            cv.height
          ) *
          l.speed

        const x1 =
          cx +
          Math.cos(l.angle) * dist

        const y1 =
          cy +
          Math.sin(l.angle) * dist

        const x2 =
          cx +
          Math.cos(l.angle) *
            (dist + 120)

        const y2 =
          cy +
          Math.sin(l.angle) *
            (dist + 120)

        const grad =
          ctx.createLinearGradient(
            x1,
            y1,
            x2,
            y2
          )

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
        wrap.style.transition =
          "opacity .6s ease"

        wrap.style.opacity = "0"

        setTimeout(onDone, 600)
      }
    }

    hyperRafRef.current =
      requestAnimationFrame(frame)
  }

  useEffect(() => {
    drawArc(0)

    let t0: number | null = null

    function phase1(ts: number) {
      if (!t0) t0 = ts

      const raw = Math.min(
        (ts - t0) / PH1_DUR,
        1
      )

      const p = easeOut(raw)

      const pct = Math.floor(
        p * 100
      )

      if (pctRef.current) {
        pctRef.current.textContent =
          `${pct}%`
      }

      const activeCells =
        Math.min(
          Math.floor(p * 10),
          10
        )

      batteryCellsRef.current.forEach(
        (cell, idx) => {
          if (!cell) return

          if (idx < activeCells) {
            cell.classList.add("active")
          }
        }
      )

      const mi = Math.min(
        Math.floor(
          p * STATUS_MSGS.length
        ),
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
          35
        )
      }

      if (raw < 1) {
        rafRef.current =
          requestAnimationFrame(
            phase1
          )

        return
      }

      ph1Ref.current?.classList.add(
        "sl-out"
      )

      setTimeout(() => {
        ph2Ref.current?.classList.add(
          "sl-in"
        )

        activateAtoms(1)

        setTimeout(() => {
          activateAtoms(2)
        }, 700)

        setTimeout(() => {
          activateAtoms(3)
        }, 1300)

        let t1: number | null = null

        function phase2(ts2: number) {
          if (!t1) t1 = ts2

          const r2 = Math.min(
            (ts2 - t1) / PH2_DUR,
            1
          )

          drawArc(
            easeOut(r2),
            (ts2 / 8) % 360
          )

          if (r2 < 1) {
            rafRef.current =
              requestAnimationFrame(
                phase2
              )

            return
          }

          setTimeout(() => {
            ph2Ref.current?.classList.add(
              "sl-out"
            )

            runHyperspace(() => {
              initStars()

              ph3Ref.current?.classList.add(
                "sl-in"
              )

              const welcome =
                document.querySelector(
                  ".sl-welcome-line"
                ) as HTMLDivElement

              const expert =
                document.querySelector(
                  ".sl-expertise-label"
                ) as HTMLDivElement

              welcome?.classList.add(
                "show"
              )

              setTimeout(() => {
                if (nameRef.current) {
                  typeWriter(
                    nameRef.current,
                    FULL_NAME,
                    60,
                    () => {
                      expert?.classList.add(
                        "show"
                      )

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
          requestAnimationFrame(
            phase2
          )
      }, 400)
    }

    rafRef.current =
      requestAnimationFrame(phase1)

    return () => {
      cancelAnimationFrame(
        rafRef.current
      )

      cancelAnimationFrame(
        hyperRafRef.current
      )

      cancelAnimationFrame(
        starsRafRef.current
      )
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
          transform:
            translate(-50%,-50%);
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          text-align:center;
        }

        .sl-ph1{
          transition:
            opacity .8s ease,
            transform .8s ease;
        }

        .sl-ph1.sl-out{
          opacity:0;

          transform:
            translate(-50%,-56%);
        }

        .sl-ph2{
          opacity:0;

          transform:
            translate(-50%,-50%)
            scale(.85);

          transition:
            opacity .9s ease,
            transform .9s ease;
        }

        .sl-ph2.sl-in{
          opacity:1;

          transform:
            translate(-50%,-50%)
            scale(1);
        }

        .sl-ph2.sl-out{
          opacity:0;

          transform:
            translate(-50%,-50%)
            scale(1.12);
        }

        .sl-ph3{
          opacity:0;

          transform:
            translate(-50%,-45%);

          transition:
            opacity 1s ease,
            transform 1s ease;
        }

        .sl-ph3.sl-in{
          opacity:1;

          transform:
            translate(-50%,-50%);
        }

        .sl-battery-shell{
          position:relative;

          width:min(700px,88vw);

          padding:24px;

          border:
            2px solid rgba(0,212,255,.45);

          border-radius:24px;

          background:
            linear-gradient(
              180deg,
              rgba(0,0,0,.35),
              rgba(0,0,0,.18)
            );

          box-shadow:
            0 0 40px rgba(0,212,255,.16),
            inset 0 0 40px rgba(0,212,255,.06);
        }

        .sl-battery-shell::after{
          content:"";

          position:absolute;

          right:-18px;
          top:50%;

          transform:
            translateY(-50%);

          width:12px;
          height:90px;

          border-radius:8px;

          background:
            linear-gradient(
              180deg,
              rgba(0,212,255,.9),
              rgba(0,212,255,.2)
            );

          box-shadow:
            0 0 18px rgba(0,212,255,.6);
        }

        .sl-battery-cells{
          display:flex;
          gap:10px;
          justify-content:center;
        }

        .sl-battery-cell{
          width:52px;
          height:68px;

          border-radius:10px;

          border:
            1px solid rgba(255,255,255,.14);

          background:
            rgba(255,255,255,.04);

          position:relative;

          overflow:hidden;

          transition:
            background .5s ease,
            box-shadow .5s ease,
            transform .35s ease;
        }

        .sl-battery-cell::before{
          content:"";

          position:absolute;
          inset:0;

          transform:
            translateY(100%);

          transition:
            transform .9s ease;
        }

        .sl-battery-cell.active{
          transform:
            translateY(-2px);
        }

        .sl-battery-cell.active::before{
          transform:
            translateY(0%);
        }

        .sl-battery-cell:nth-child(1)::before{
          background:
            linear-gradient(
              180deg,
              #ff3b3b,
              #ff0000
            );
        }

        .sl-battery-cell:nth-child(2)::before,
        .sl-battery-cell:nth-child(3)::before{
          background:
            linear-gradient(
              180deg,
              #ff7b00,
              #ff5e00
            );
        }

        .sl-battery-cell:nth-child(4)::before,
        .sl-battery-cell:nth-child(5)::before,
        .sl-battery-cell:nth-child(6)::before{
          background:
            linear-gradient(
              180deg,
              #ffc400,
              #ffea00
            );
        }

        .sl-battery-cell:nth-child(7)::before,
        .sl-battery-cell:nth-child(8)::before,
        .sl-battery-cell:nth-child(9)::before,
        .sl-battery-cell:nth-child(10)::before{
          background:
            linear-gradient(
              180deg,
              #eaff6b,
              #fff7b1
            );
        }

        .sl-battery-cell.active{
          box-shadow:
            0 0 18px currentColor;
        }

        .sl-charge-pct{
          margin-top:28px;

          font-size:
            clamp(42px,7vw,74px);

          font-weight:900;

          color:white;
        }

        .sl-loading-text{
          margin-top:12px;

          color:#8fdfff;

          letter-spacing:.25em;

          text-transform:uppercase;

          font-size:12px;

          min-height:18px;
        }

        .sl-arc-wrap{
          position:relative;

          width:320px;
          height:320px;

          display:flex;
          align-items:center;
          justify-content:center;
        }

        .sl-ring{
          position:absolute;
          border-radius:50%;
        }

        .sl-ring-1{
          width:92%;
          height:92%;

          border:
            1px solid rgba(0,212,255,.2);

          animation:
            spin 8s linear infinite;
        }

        .sl-ring-2{
          width:72%;
          height:72%;

          border:
            1px solid rgba(168,85,247,.22);

          animation:
            spinReverse 6s linear infinite;
        }

        .sl-arc-canvas{
          width:150px;
          height:150px;

          border-radius:50%;
        }

        .sl-atom{
          position:absolute;

          width:170px;
          height:170px;

          border:
            1px solid rgba(0,212,255,.14);

          border-radius:50%;

          opacity:0;

          transition:
            opacity .7s ease;
        }

        .sl-atom.active{
          opacity:1;
        }

        .sl-atom::before{
          content:"";

          position:absolute;

          width:10px;
          height:10px;

          border-radius:50%;

          background:#00d4ff;

          top:-5px;
          left:50%;

          transform:
            translateX(-50%);

          box-shadow:
            0 0 20px #00d4ff;
        }

        .sl-atom-1{
          animation:
            spin 5s linear infinite;
        }

        .sl-atom-2{
          width:210px;
          height:210px;

          animation:
            spinReverse 7s linear infinite;
        }

        .sl-atom-3{
          width:250px;
          height:250px;

          animation:
            spin 9s linear infinite;
        }

        .sl-reactor-title{
          position:absolute;

          color:white;

          letter-spacing:.3em;

          font-size:12px;

          text-transform:uppercase;
        }

        .sl-welcome-line,
        .sl-expertise-label{
          opacity:0;

          transform:
            translateY(20px);

          transition:
            all .8s ease;
        }

        .sl-welcome-line.show,
        .sl-expertise-label.show{
          opacity:1;

          transform:
            translateY(0);
        }

        .sl-welcome-line{
          color:#c084fc;

          margin-bottom:18px;

          letter-spacing:.35em;

          text-transform:uppercase;

          font-size:11px;
        }

        .sl-name{
          font-size:
            clamp(34px,6vw,76px);

          font-weight:900;

          color:white;

          text-shadow:
            0 0 20px rgba(168,85,247,1),
            0 0 40px rgba(0,212,255,.5);

          min-height:90px;
        }

        .sl-divline{
          width:180px;
          height:1px;

          margin:18px 0 24px;

          background:
            linear-gradient(
              90deg,
              transparent,
              #00d4ff,
              transparent
            );
        }

        .sl-expertise-label{
          margin-bottom:20px;

          color:#00d4ff;

          letter-spacing:.35em;

          font-size:11px;

          text-transform:uppercase;
        }

        .sl-skills-grid{
          display:grid;

          grid-template-columns:
            repeat(4,1fr);

          gap:14px;

          width:min(760px,90vw);
        }

        .sl-skill-card{
          opacity:0;

          padding:18px 12px;

          border-radius:18px;

          background:
            rgba(255,255,255,.05);

          border:
            1px solid rgba(255,255,255,.08);

          backdrop-filter:blur(12px);

          display:flex;
          flex-direction:column;
          align-items:center;
          gap:10px;
        }

        .sl-card-show{
          animation:
            cardIn .7s ease forwards;
        }

        .sl-skill-icon{
          width:48px;
          height:48px;

          border-radius:14px;

          display:flex;
          align-items:center;
          justify-content:center;

          font-size:20px;
        }

        .sl-skill-name{
          color:white;

          font-size:12px;

          text-transform:uppercase;
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

          animation:
            sl-dust-move linear forwards;
        }

        .sl-content-dust-out{
          animation:
            sl-content-dust-out
            1.4s cubic-bezier(.2,.8,.2,1)
            forwards;
        }

        @keyframes sl-content-dust-out{
          0%{
            opacity:1;
            transform:scale(1);
          }

          100%{
            opacity:0;

            transform:
              scale(1.18);

            filter:
              blur(12px)
              brightness(1.8);
          }
        }

        @keyframes sl-dust-move{
          0%{
            opacity:0;
            transform:
              translate(0,0)
              scale(1);
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

        @keyframes cardIn{
          from{
            opacity:0;

            transform:
              translateY(24px);
          }

          to{
            opacity:1;

            transform:
              translateY(0);
          }
        }

        @media(max-width:768px){
          .sl-battery-cell{
            width:34px;
            height:54px;
          }

          .sl-skills-grid{
            grid-template-columns:
              repeat(2,1fr);
          }

          .sl-arc-wrap{
            width:260px;
            height:260px;
          }
        }
      `}</style>

      <div
        ref={containerRef}
        className="sl-root"
      >
        <canvas
          ref={starsRef}
          className="sl-stars-canvas"
        />

        <div
          ref={hyperRef}
          className="sl-hyper-wrap"
        >
          <canvas
            ref={hyperCanRef}
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
          <div
            ref={ph1Ref}
            className="sl-ph1"
          >
            <div className="sl-battery-shell">
              <div className="sl-battery-cells">
                {Array.from({
                  length: 10,
                }).map((_, i) => (
                  <div
                    key={i}
                    className="sl-battery-cell"
                    ref={(el) => {
                      batteryCellsRef.current[
                        i
                      ] = el
                    }}
                  />
                ))}
              </div>

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
                Loading...
              </div>
            </div>
          </div>

          {/* PHASE 2 */}
          <div
            ref={ph2Ref}
            className="sl-ph2"
          >
            <div className="sl-arc-wrap">
              <div className="sl-ring sl-ring-1" />
              <div className="sl-ring sl-ring-2" />

              <div
                ref={(el) =>
                  (atomRefs.current[0] =
                    el)
                }
                className="sl-atom sl-atom-1"
              />

              <div
                ref={(el) =>
                  (atomRefs.current[1] =
                    el)
                }
                className="sl-atom sl-atom-2"
              />

              <div
                ref={(el) =>
                  (atomRefs.current[2] =
                    el)
                }
                className="sl-atom sl-atom-3"
              />

              <canvas
                ref={canvasRef}
                className="sl-arc-canvas"
                width={150}
                height={150}
              />

              <div className="sl-reactor-title">
                ARC REACTOR
              </div>
            </div>
          </div>

          {/* PHASE 3 */}
          <div
            ref={ph3Ref}
            className="sl-ph3"
          >
            <div className="sl-welcome-line">
              ◈ Welcome To My
              Portfolio ◈
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

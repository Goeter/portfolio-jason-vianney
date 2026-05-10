"use client"

import { useEffect, useRef } from "react"

type Props = {
  onLoadingComplete: () => void
}

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

const STATUS_MSGS = [
  "Initializing Power Core...",
  "Loading...",
  "Arc Reactor Charging to Full Capacity...",
]

const FULL_NAME =
  "Jason Vianney Sugiarto"

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

  const batteryFillRef =
    useRef<HTMLDivElement>(null)

  const batteryCellsRef =
    useRef<(HTMLDivElement | null)[]>(
      []
    )

  const msgRef =
    useRef<HTMLDivElement>(null)

  const canvasRef =
    useRef<HTMLCanvasElement>(null)

  const nameRef =
    useRef<HTMLDivElement>(null)

  const skillsRef =
    useRef<HTMLDivElement>(null)

  const starsRef =
    useRef<HTMLCanvasElement>(null)

  const dustRef =
    useRef<HTMLDivElement>(null)

  const nebulaRef =
    useRef<HTMLDivElement>(null)

  const rafRef = useRef<number>(0)

  const starsRafRef =
    useRef<number>(0)

  function easeOut(t: number) {
    return 1 - Math.pow(1 - t, 3)
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
    const r = w / 2 - 10

    ctx.clearRect(0, 0, w, h)

    const glow =
      ctx.createRadialGradient(
        cx,
        cy,
        20,
        cx,
        cy,
        r + 40
      )

    glow.addColorStop(
      0,
      "rgba(255,255,255,.18)"
    )

    glow.addColorStop(
      .35,
      `hsla(${200 + hueShift},100%,60%,.22)`
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

    ctx.lineWidth = 5
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
      1,
      `hsl(${150 + hueShift},100%,55%)`
    )

    ctx.beginPath()

    ctx.arc(
      cx,
      cy,
      r,
      start,
      end
    )

    ctx.strokeStyle = g

    ctx.lineWidth = 7

    ctx.lineCap = "round"

    ctx.shadowColor =
      `hsl(${200 + hueShift},100%,70%)`

    ctx.shadowBlur = 25

    ctx.stroke()

    ctx.shadowBlur = 0
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

  function buildSkills() {
    const grid = skillsRef.current

    if (!grid) return

    grid.innerHTML = ""

    SKILLS.forEach((s, idx) => {
      const card =
        document.createElement("div")

      card.className =
        "sl-skill-card"

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
      }, idx * 150)
    })
  }

  function createDustExplosion() {
    const dust = dustRef.current

    if (!dust) return

    dust.innerHTML = ""

    const frag =
      document.createDocumentFragment()

    for (let i = 0; i < 140; i++) {
      const p =
        document.createElement("div")

      p.className = "sl-dust"

      const x =
        (Math.random() - .5) * 1000

      const y =
        (Math.random() - .5) * 700

      const size =
        2 + Math.random() * 5

      p.style.cssText = `
        --tx:${x}px;
        --ty:${y}px;
        width:${size}px;
        height:${size}px;
        left:50%;
        top:50%;
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
      { length: 80 },
      () => ({
        x:
          Math.random() * cv.width,
        y:
          Math.random() * cv.height,
        r:
          Math.random() * 1.8,
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

      const cells =
        batteryCellsRef.current

      const active =
        Math.floor(p * 10)

      cells.forEach((c, i) => {
        if (!c) return

        if (i < active) {
          c.classList.add("active")
        } else {
          c.classList.remove("active")
        }
      })

      if (batteryFillRef.current) {
        batteryFillRef.current.style.width =
          `${p * 100}%`
      }

      const msgIndex = Math.min(
        Math.floor(
          p * STATUS_MSGS.length
        ),
        STATUS_MSGS.length - 1
      )

      if (
        msgRef.current &&
        msgRef.current.dataset.msg !==
          STATUS_MSGS[msgIndex]
      ) {
        msgRef.current.dataset.msg =
          STATUS_MSGS[msgIndex]

        typeWriter(
          msgRef.current,
          STATUS_MSGS[msgIndex],
          45
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

            setTimeout(() => {
              nebulaRef.current?.classList.add(
                "sl-nebula-in"
              )

              initStars()

              ph3Ref.current?.classList.add(
                "sl-in"
              )

              const nameEl =
                nameRef.current

              if (nameEl) {
                typeWriter(
                  nameEl,
                  FULL_NAME,
                  65,
                  () => {
                    buildSkills()

                    setTimeout(() => {
                      createDustExplosion()

                      containerRef.current?.classList.add(
                        "sl-content-dust-out"
                      )

                      setTimeout(() => {
                        onLoadingComplete()
                      }, 1400)
                    }, 2500)
                  }
                )
              }
            }, 250)
          }, 1000)
        }

        rafRef.current =
          requestAnimationFrame(
            phase2
          )
      }, 500)
    }

    rafRef.current =
      requestAnimationFrame(phase1)

    return () => {
      cancelAnimationFrame(
        rafRef.current
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

          background:#020814;

          display:flex;
          align-items:center;
          justify-content:center;
        }

        .sl-bg-grid{
          position:absolute;
          inset:0;

          background-image:
            linear-gradient(rgba(0,212,255,.04) 1px,transparent 1px),
            linear-gradient(90deg,rgba(0,212,255,.04) 1px,transparent 1px);

          background-size:55px 55px;
        }

        .sl-vignette{
          position:absolute;
          inset:0;

          background:
            radial-gradient(
              ellipse at center,
              transparent 20%,
              #020814 88%
            );
        }

        .sl-content{
          position:fixed;
          inset:0;

          z-index:10;

          display:flex;
          align-items:center;
          justify-content:center;
        }

        .sl-ph1,
        .sl-ph2,
        .sl-ph3{
          position:absolute;

          top:50%;
          left:50%;

          transform:
            translate(-50%,-50%);

          width:min(92vw,900px);

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
            translate(-50%,-45%)
            scale(.88);

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
            translate(-50%,-54%)
            scale(1.1);
        }

        .sl-ph3{
          opacity:0;

          transform:
            translate(-50%,-46%);

          transition:
            opacity 1s ease,
            transform 1s ease;
        }

        .sl-ph3.sl-in{
          opacity:1;

          transform:
            translate(-50%,-50%);
        }

        .sl-loading-title{
          color:#00d4ff;

          margin-bottom:24px;

          font-size:13px;

          letter-spacing:.45em;

          text-transform:uppercase;
        }

        .sl-battery-shell{
          position:relative;

          width:min(700px,90vw);
          height:120px;

          padding:14px;

          border-radius:24px;

          border:
            2px solid rgba(0,212,255,.35);

          background:
            linear-gradient(
              135deg,
              rgba(5,15,30,.9),
              rgba(0,0,0,.95)
            );

          box-shadow:
            0 0 35px rgba(0,212,255,.15),
            inset 0 0 30px rgba(0,212,255,.08);

          overflow:hidden;
        }

        .sl-battery-shell::after{
          content:"";

          position:absolute;

          right:-18px;
          top:35px;

          width:12px;
          height:46px;

          border-radius:0 10px 10px 0;

          background:#00d4ff;

          box-shadow:
            0 0 14px #00d4ff;
        }

        .sl-battery-inner{
          position:relative;

          width:100%;
          height:100%;

          border-radius:18px;

          overflow:hidden;

          border:
            1px solid rgba(255,255,255,.08);
        }

        .sl-battery-fill{
          position:absolute;
          inset:0 auto 0 0;

          width:0%;

          background:
            linear-gradient(
              90deg,
              #ff003c,
              #ff6b00,
              #ffd500,
              #faff00,
              #00d4ff
            );

          opacity:.22;

          transition:width .25s linear;
        }

        .sl-battery-grid{
          position:relative;

          z-index:2;

          height:100%;

          display:grid;

          grid-template-columns:
            repeat(10,1fr);

          gap:10px;

          padding:12px;
        }

        .sl-cell{
          border-radius:10px;

          border:
            1px solid rgba(255,255,255,.1);

          background:
            rgba(255,255,255,.03);

          transition:
            all .4s ease;
        }

        .sl-cell.active{
          background:
            linear-gradient(
              180deg,
              rgba(255,255,255,.55),
              rgba(255,215,0,.2)
            );

          box-shadow:
            0 0 18px currentColor;
        }

        .sl-status-text{
          margin-top:24px;

          min-height:24px;

          color:#d8f6ff;

          font-size:14px;

          letter-spacing:.24em;

          text-transform:uppercase;
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

          border:
            1px solid rgba(255,255,255,.12);
        }

        .sl-ring-1{
          width:260px;
          height:260px;

          animation:
            spin 10s linear infinite;
        }

        .sl-ring-2{
          width:210px;
          height:210px;

          border-style:dashed;

          animation:
            spin2 8s linear infinite;
        }

        .sl-ring-3{
          width:170px;
          height:170px;

          animation:
            spin 6s linear infinite;
        }

        .sl-arc-canvas{
          width:150px;
          height:150px;

          border-radius:50%;
        }

        .sl-reactor-title{
          margin-top:24px;

          color:#00d4ff;

          font-size:12px;

          letter-spacing:.35em;

          text-transform:uppercase;
        }

        .sl-welcome-line{
          opacity:0;

          animation:
            fadeUp .9s ease forwards;

          color:#c084fc;

          margin-bottom:20px;

          font-size:12px;

          letter-spacing:.35em;

          text-transform:uppercase;
        }

        .sl-name{
          font-size:clamp(38px,6vw,72px);

          font-weight:900;

          color:white;

          line-height:1.1;

          text-shadow:
            0 0 20px rgba(168,85,247,.9),
            0 0 45px rgba(0,212,255,.55);
        }

        .sl-divline{
          width:180px;
          height:1px;

          margin:26px 0;

          background:
            linear-gradient(
              90deg,
              transparent,
              #00d4ff,
              transparent
            );
        }

        .sl-expertise-label{
          opacity:0;

          animation:
            fadeUp 1s ease forwards;

          animation-delay:.3s;

          color:#c084fc;

          margin-bottom:18px;

          font-size:11px;

          letter-spacing:.4em;

          text-transform:uppercase;
        }

        .sl-skills-grid{
          width:100%;
          max-width:760px;

          display:grid;

          grid-template-columns:
            repeat(4,1fr);

          gap:14px;
        }

        .sl-skill-card{
          opacity:0;

          background:
            rgba(168,85,247,.08);

          border:
            1px solid rgba(255,255,255,.08);

          border-radius:18px;

          padding:18px 12px;

          backdrop-filter:blur(12px);

          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;

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
        .sl-dust-wrap,
        .sl-nebula{
          position:absolute;
          inset:0;
        }

        .sl-nebula{
          opacity:0;

          transition:opacity 1.8s ease;
        }

        .sl-nebula.sl-nebula-in{
          opacity:1;
        }

        .sl-nebula::before{
          content:"";

          position:absolute;
          inset:0;

          background:
            radial-gradient(circle at 20% 30%,rgba(168,85,247,.35),transparent 40%),
            radial-gradient(circle at 80% 70%,rgba(0,212,255,.22),transparent 40%);
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
              rgba(168,85,247,.45),
              transparent 70%
            );

          animation:
            dustMove 1.4s linear forwards;
        }

        .sl-content-dust-out{
          animation:
            contentDust 1.4s ease forwards;
        }

        @keyframes dustMove{
          from{
            opacity:1;

            transform:
              translate3d(0,0,0)
              scale(1);
          }

          to{
            opacity:0;

            transform:
              translate3d(
                var(--tx),
                var(--ty),
                0
              )
              scale(0);
          }
        }

        @keyframes contentDust{
          from{
            opacity:1;

            transform:scale(1);
          }

          to{
            opacity:0;

            transform:scale(1.12);

            filter:
              blur(10px)
              brightness(1.6);
          }
        }

        @keyframes spin{
          to{
            transform:rotate(360deg);
          }
        }

        @keyframes spin2{
          to{
            transform:rotate(-360deg);
          }
        }

        @keyframes cardIn{
          from{
            opacity:0;

            transform:
              translateY(20px);
          }

          to{
            opacity:1;

            transform:
              translateY(0);
          }
        }

        @keyframes fadeUp{
          from{
            opacity:0;

            transform:
              translateY(14px);
          }

          to{
            opacity:1;

            transform:
              translateY(0);
          }
        }

        @media(max-width:768px){
          .sl-skills-grid{
            grid-template-columns:
              repeat(2,1fr);
          }

          .sl-battery-shell{
            height:100px;
          }

          .sl-arc-wrap{
            width:260px;
            height:260px;
          }
        }

        @media(max-width:480px){
          .sl-battery-grid{
            gap:6px;
          }

          .sl-status-text{
            font-size:11px;
          }
        }
      `}</style>

      <div
        ref={containerRef}
        className="sl-root"
      >
        <div className="sl-bg-grid" />

        <div className="sl-vignette" />

        <div
          ref={nebulaRef}
          className="sl-nebula"
        />

        <canvas
          ref={starsRef}
          className="sl-stars-canvas"
        />

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
            <div className="sl-loading-title">
              ◈ MK-VII ARC SYSTEM ◈
            </div>

            <div className="sl-battery-shell">
              <div className="sl-battery-inner">
                <div
                  ref={batteryFillRef}
                  className="sl-battery-fill"
                />

                <div className="sl-battery-grid">
                  {Array.from({
                    length: 10,
                  }).map((_, i) => (
                    <div
                      key={i}
                      className="sl-cell"
                      ref={(el) => {
                        batteryCellsRef.current[
                          i
                        ] = el
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div
              ref={msgRef}
              className="sl-status-text"
            />
          </div>

          {/* PHASE 2 */}
          <div
            ref={ph2Ref}
            className="sl-ph2"
          >
            <div className="sl-arc-wrap">
              <div className="sl-ring sl-ring-1" />
              <div className="sl-ring sl-ring-2" />
              <div className="sl-ring sl-ring-3" />

              <canvas
                ref={canvasRef}
                className="sl-arc-canvas"
                width={160}
                height={160}
              />
            </div>

            <div className="sl-reactor-title">
              Arc Reactor Online
            </div>
          </div>

          {/* PHASE 3 */}
          <div
            ref={ph3Ref}
            className="sl-ph3"
          >
            <div className="sl-welcome-line">
              ◈ Welcome to my
              portfolio ◈
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

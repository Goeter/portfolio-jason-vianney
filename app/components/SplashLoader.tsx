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
const PH2_DUR = 3000

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

  function drawArc(progress: number) {
    const cv = canvasRef.current
    if (!cv) return

    const ctx = cv.getContext("2d")
    if (!ctx) return

    const w = cv.width
    const h = cv.height

    const cx = w / 2
    const cy = h / 2

    const r = w / 2 - 16

    ctx.clearRect(0, 0, w, h)

    // glow background
    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, r + 50)
    glow.addColorStop(0, "rgba(0,212,255,.22)")
    glow.addColorStop(1, "transparent")

    ctx.beginPath()
    ctx.arc(cx, cy, r + 50, 0, Math.PI * 2)
    ctx.fillStyle = glow
    ctx.fill()

    // ring track
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.strokeStyle = "rgba(255,255,255,.08)"
    ctx.lineWidth = 8
    ctx.stroke()

    // progress arc
    const grad = ctx.createLinearGradient(0, 0, w, h)

    grad.addColorStop(0, "#a855f7")
    grad.addColorStop(0.5, "#00d4ff")
    grad.addColorStop(1, "#34d399")

    ctx.beginPath()
    ctx.arc(
      cx,
      cy,
      r,
      -Math.PI / 2,
      -Math.PI / 2 + Math.PI * 2 * progress
    )

    ctx.strokeStyle = grad
    ctx.lineWidth = 10
    ctx.lineCap = "round"

    ctx.shadowColor = "#00d4ff"
    ctx.shadowBlur = 28

    ctx.stroke()

    ctx.shadowBlur = 0

    // center glow
    const orb = ctx.createRadialGradient(cx, cy, 0, cx, cy, 38)

    orb.addColorStop(0, "rgba(255,255,255,.95)")
    orb.addColorStop(0.4, "rgba(0,212,255,.7)")
    orb.addColorStop(1, "transparent")

    ctx.beginPath()
    ctx.arc(cx, cy, 38, 0, Math.PI * 2)
    ctx.fillStyle = orb
    ctx.fill()
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

    SKILLS.forEach((skill, idx) => {
      const card = document.createElement("div")

      card.className = "sl-skill-card"

      card.innerHTML = `
        <div class="sl-skill-name">${skill.label}</div>
      `

      card.style.background = `
        linear-gradient(
          135deg,
          ${skill.grad}
        )
      `

      grid.appendChild(card)

      setTimeout(() => {
        card.classList.add("sl-card-show")
      }, idx * 160)
    })
  }

  useEffect(() => {
    drawArc(0)

    let t0: number | null = null

    function phase1(ts: number) {
      if (!t0) t0 = ts

      const raw = Math.min((ts - t0) / PH1_DUR, 1)

      const p = easeOut(raw)

      const pct = Math.floor(p * 100)

      drawArc(p)

      if (pctRef.current) {
        pctRef.current.textContent = `${pct}%`
      }

      const activeCells = Math.min(Math.floor(p * 10), 10)

      batteryCellsRef.current.forEach((cell, idx) => {
        if (!cell) return

        if (idx < activeCells) {
          cell.classList.add("active")
        }
      })

      const msgIndex = Math.min(
        Math.floor(p * STATUS_MSGS.length),
        STATUS_MSGS.length - 1
      )

      const currentMsg = STATUS_MSGS[msgIndex]

      if (
        msgRef.current &&
        msgRef.current.dataset.msg !== currentMsg
      ) {
        msgRef.current.dataset.msg = currentMsg

        typeWriter(msgRef.current, currentMsg, 40)
      }

      if (raw < 1) {
        rafRef.current = requestAnimationFrame(phase1)
        return
      }

      ph1Ref.current?.classList.add("sl-out")

      setTimeout(() => {
        ph2Ref.current?.classList.add("sl-in")

        activateAtoms(1)

        setTimeout(() => activateAtoms(2), 700)
        setTimeout(() => activateAtoms(3), 1400)

        let t1: number | null = null

        function phase2(ts2: number) {
          if (!t1) t1 = ts2

          const raw2 = Math.min((ts2 - t1) / PH2_DUR, 1)

          drawArc(raw2)

          if (raw2 < 1) {
            rafRef.current = requestAnimationFrame(phase2)
            return
          }

          setTimeout(() => {
            ph2Ref.current?.classList.add("sl-out")

            setTimeout(() => {
              ph3Ref.current?.classList.add("sl-in")

              const welcome = document.querySelector(
                ".sl-welcome-line"
              ) as HTMLDivElement

              const expert = document.querySelector(
                ".sl-expertise-label"
              ) as HTMLDivElement

              welcome?.classList.add("show")

              setTimeout(() => {
                if (nameRef.current) {
                  typeWriter(
                    nameRef.current,
                    FULL_NAME,
                    65,
                    () => {
                      expert?.classList.add("show")

                      buildSkills()

                      setTimeout(() => {
                        onLoadingComplete()
                      }, 2600)
                    }
                  )
                }
              }, 500)
            }, 800)
          }, 600)
        }

        rafRef.current = requestAnimationFrame(phase2)
      }, 500)
    }

    rafRef.current = requestAnimationFrame(phase1)

    return () => {
      cancelAnimationFrame(rafRef.current)
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
          transition:
            opacity 1s ease,
            transform 1s ease;
        }

        .sl-ph1.sl-out{
          opacity:0;
          transform:translate(-50%,-56%);
        }

        .sl-ph2{
          opacity:0;
          transform:translate(-50%,-50%) scale(.85);

          transition:
            opacity 1s ease,
            transform 1s ease;
        }

        .sl-ph2.sl-in{
          opacity:1;
          transform:translate(-50%,-50%) scale(1);
        }

        .sl-ph2.sl-out{
          opacity:0;
          transform:translate(-50%,-50%) scale(1.1);
        }

        .sl-ph3{
          opacity:0;

          width:min(900px,92vw);

          transform:translate(-50%,-45%);

          transition:
            opacity 1s ease,
            transform 1s ease;
        }

        .sl-ph3.sl-in{
          opacity:1;
          transform:translate(-50%,-50%);
        }

        /* =================================
           PHASE 1
        ================================= */

        .sl-battery-shell{
          width:min(760px,90vw);

          padding:34px;

          border-radius:28px;

          background:
            linear-gradient(
              180deg,
              rgba(10,20,35,.92),
              rgba(5,10,18,.96)
            );

          border:1px solid rgba(0,212,255,.22);

          box-shadow:
            0 0 40px rgba(0,212,255,.14),
            inset 0 0 50px rgba(0,212,255,.05);

          backdrop-filter:blur(18px);
        }

        .sl-battery-topline{
          display:flex;
          align-items:center;
          justify-content:space-between;

          margin-bottom:24px;
        }

        .sl-battery-title{
          color:white;

          font-size:12px;
          font-weight:800;

          letter-spacing:.25em;

          text-transform:uppercase;
        }

        .sl-battery-mini{
          display:flex;
          gap:6px;
        }

        .sl-battery-mini span{
          width:8px;
          height:8px;

          border-radius:50%;

          background:#00d4ff;

          animation:blink 1.5s infinite;
        }

        .sl-battery-mini span:nth-child(2){
          animation-delay:.2s;
        }

        .sl-battery-mini span:nth-child(3){
          animation-delay:.4s;
        }

        .sl-battery-cells{
          display:flex;
          justify-content:center;
          gap:12px;

          padding:20px;

          border-radius:20px;

          background:
            linear-gradient(
              180deg,
              rgba(255,255,255,.04),
              rgba(255,255,255,.015)
            );
        }

        .sl-battery-cell{
          width:54px;
          height:78px;

          border-radius:14px;

          position:relative;
          overflow:hidden;

          border:1px solid rgba(255,255,255,.08);

          background:
            linear-gradient(
              180deg,
              rgba(255,255,255,.06),
              rgba(255,255,255,.02)
            );
        }

        .sl-battery-cell::before{
          content:"";

          position:absolute;
          left:0;
          right:0;
          bottom:0;

          height:0%;

          transition:height .8s ease;
        }

        .sl-battery-cell.active::before{
          height:100%;
        }

        .sl-battery-cell:nth-child(1)::before{
          background:#ff2b2b;
        }

        .sl-battery-cell:nth-child(2)::before{
          background:#ff6a00;
        }

        .sl-battery-cell:nth-child(3)::before{
          background:#ff9500;
        }

        .sl-battery-cell:nth-child(4)::before{
          background:#ffb700;
        }

        .sl-battery-cell:nth-child(5)::before{
          background:#ffd500;
        }

        .sl-battery-cell:nth-child(6)::before{
          background:#f5ff52;
        }

        .sl-battery-cell:nth-child(7)::before{
          background:#c5ff4d;
        }

        .sl-battery-cell:nth-child(8)::before{
          background:#7dff75;
        }

        .sl-battery-cell:nth-child(9)::before{
          background:#2dff9b;
        }

        .sl-battery-cell:nth-child(10)::before{
          background:#00ff99;
        }

        .sl-battery-bottom{
          margin-top:24px;

          display:flex;
          align-items:flex-end;
          justify-content:space-between;
        }

        .sl-charge-pct{
          color:white;

          font-size:56px;
          font-weight:900;

          text-shadow:
            0 0 20px rgba(0,212,255,.45);
        }

        .sl-loading-text{
          min-width:240px;

          text-align:right;

          color:#eaf9ff;

          font-size:12px;
          font-weight:700;

          letter-spacing:.12em;

          text-transform:uppercase;

          line-height:1.8;
        }

        /* =================================
           PHASE 2
        ================================= */

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
          width:92%;
          height:92%;

          border:1px solid rgba(0,212,255,.34);

          box-shadow:
            0 0 28px rgba(0,212,255,.22);

          animation:spin 10s linear infinite;
        }

        .sl-ring-2{
          width:72%;
          height:72%;

          border:1px solid rgba(168,85,247,.34);

          box-shadow:
            0 0 24px rgba(168,85,247,.2);

          animation:spinReverse 7s linear infinite;
        }

        .sl-arc-canvas{
          width:170px;
          height:170px;

          border-radius:50%;

          z-index:5;

          filter:
            drop-shadow(0 0 25px rgba(0,212,255,.7));
        }

        /* ORBITS */

        .sl-orbit{
          position:absolute;

          top:50%;
          left:50%;

          transform:translate(-50%,-50%);

          border-radius:50%;

          opacity:0;

          transition:
            opacity .8s ease,
            transform .8s ease;
        }

        .sl-orbit.active{
          opacity:1;
        }

        .sl-orbit::before{
          content:"";

          position:absolute;
          inset:0;

          border-radius:50%;

          border:1px solid rgba(255,255,255,.12);

          box-shadow:
            0 0 20px rgba(0,212,255,.1);
        }

        .sl-electron{
          position:absolute;

          top:50%;
          left:50%;

          width:14px;
          height:14px;

          margin-left:-7px;
          margin-top:-7px;

          border-radius:50%;

          box-shadow:
            0 0 18px currentColor,
            0 0 30px currentColor;
        }

        .sl-orbit-1{
          width:170px;
          height:170px;

          animation:orbitRotate 4s linear infinite;
        }

        .sl-orbit-1 .sl-electron{
          background:#00d4ff;
          color:#00d4ff;

          transform:translateY(-85px);
        }

        .sl-orbit-2{
          width:225px;
          height:225px;

          animation:orbitRotateReverse 6s linear infinite;
        }

        .sl-orbit-2 .sl-electron{
          background:#a855f7;
          color:#a855f7;

          transform:translateY(-112px);
        }

        .sl-orbit-3{
          width:280px;
          height:280px;

          animation:orbitRotate 8s linear infinite;
        }

        .sl-orbit-3 .sl-electron{
          background:#34d399;
          color:#34d399;

          transform:translateY(-140px);
        }

        /* center power */

        .sl-center-power{
          position:absolute;

          width:58px;
          height:58px;

          border-radius:50%;

          z-index:20;

          display:flex;
          align-items:center;
          justify-content:center;

          background:
            radial-gradient(
              circle,
              rgba(255,255,255,.95),
              rgba(0,212,255,.2)
            );

          box-shadow:
            0 0 30px rgba(0,212,255,.65),
            0 0 60px rgba(168,85,247,.25);

          animation:centerPulse 2.2s ease-in-out infinite;
        }

        .sl-center-power svg{
          width:24px;
          height:24px;
        }

        /* =================================
           PHASE 3
        ================================= */

        .sl-welcome-line,
        .sl-expertise-label{
          opacity:0;
          transform:translateY(20px);

          transition:all .9s ease;
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

          text-transform:uppercase;

          font-size:12px;
          font-weight:700;
        }

        .sl-name{
          min-height:90px;

          color:white;

          font-size:clamp(34px,6vw,76px);
          font-weight:900;

          line-height:1.1;

          text-align:center;

          text-shadow:
            0 0 20px rgba(168,85,247,1),
            0 0 40px rgba(0,212,255,.5);
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

          letter-spacing:.24em;

          font-size:13px;
          font-weight:700;

          text-transform:uppercase;
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

          padding:16px 14px;

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

        @keyframes orbitRotate{
          from{
            transform:translate(-50%,-50%) rotate(0deg);
          }
          to{
            transform:translate(-50%,-50%) rotate(360deg);
          }
        }

        @keyframes orbitRotateReverse{
          from{
            transform:translate(-50%,-50%) rotate(360deg);
          }
          to{
            transform:translate(-50%,-50%) rotate(0deg);
          }
        }

        @keyframes blink{
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

        @keyframes centerPulse{
          0%,100%{
            transform:scale(1);
          }

          50%{
            transform:scale(1.08);
          }
        }

        @keyframes cardIn{
          from{
            opacity:0;
            transform:translateY(20px);
          }

          to{
            opacity:1;
            transform:translateY(0);
          }
        }

        @media(max-width:768px){

          .sl-battery-shell{
            padding:22px 16px;
          }

          .sl-battery-cells{
            gap:7px;
            padding:14px;
          }

          .sl-battery-cell{
            width:30px;
            height:56px;
          }

          .sl-charge-pct{
            font-size:38px;
          }

          .sl-loading-text{
            font-size:10px;
            min-width:130px;
          }

          .sl-arc-wrap{
            width:280px;
            height:280px;
          }

          .sl-arc-canvas{
            width:145px;
            height:145px;
          }

          .sl-orbit-1{
            width:135px;
            height:135px;
          }

          .sl-orbit-1 .sl-electron{
            transform:translateY(-67px);
          }

          .sl-orbit-2{
            width:185px;
            height:185px;
          }

          .sl-orbit-2 .sl-electron{
            transform:translateY(-92px);
          }

          .sl-orbit-3{
            width:235px;
            height:235px;
          }

          .sl-orbit-3 .sl-electron{
            transform:translateY(-117px);
          }

          .sl-skills-grid{
            grid-template-columns:repeat(2,1fr);
          }
        }

      `}</style>

      <div ref={containerRef} className="sl-root">
        <div className="sl-content">

          {/* =========================
              PHASE 1
          ========================= */}
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

          {/* =========================
              PHASE 2
          ========================= */}
          <div ref={ph2Ref} className="sl-ph2">

            <div className="sl-arc-wrap">

              <div className="sl-ring sl-ring-1" />
              <div className="sl-ring sl-ring-2" />

              {/* orbit 1 */}
              <div
                ref={(el) => {
                  atomRefs.current[0] = el
                }}
                className="sl-orbit sl-orbit-1"
              >
                <div className="sl-electron" />
              </div>

              {/* orbit 2 */}
              <div
                ref={(el) => {
                  atomRefs.current[1] = el
                }}
                className="sl-orbit sl-orbit-2"
              >
                <div className="sl-electron" />
              </div>

              {/* orbit 3 */}
              <div
                ref={(el) => {
                  atomRefs.current[2] = el
                }}
                className="sl-orbit sl-orbit-3"
              >
                <div className="sl-electron" />
              </div>

              {/* arc reactor */}
              <canvas
                ref={canvasRef}
                className="sl-arc-canvas"
                width={300}
                height={300}
              />

              {/* center power icon */}
              <div className="sl-center-power">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M8.5 5.5C6.5 6.7 5 9.1 5 12a7 7 0 0 0 14 0c0-2.9-1.5-5.3-3.5-6.5"
                    stroke="#00d4ff"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="12"
                    y1="3"
                    x2="12"
                    y2="11"
                    stroke="#00d4ff"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

            </div>
          </div>

          {/* =========================
              PHASE 3
          ========================= */}
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

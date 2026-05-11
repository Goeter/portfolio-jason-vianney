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
    label: "IT Fullstack",
    grad:
      "rgba(0,212,255,0.22),rgba(59,130,246,0.22)",
  },
  {
    label: "System Analyst",
    grad:
      "rgba(168,85,247,0.22),rgba(236,72,153,0.22)",
  },
  {
    label: "UI/UX Designer",
    grad:
      "rgba(251,146,60,0.22),rgba(236,72,153,0.22)",
  },
  {
    label: "Data Analyst",
    grad:
      "rgba(52,211,153,0.22),rgba(16,185,129,0.22)",
  },
  {
    label: "Tutor",
    grad:
      "rgba(255,215,0,0.20),rgba(255,140,0,0.20)",
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
    useRef<(HTMLDivElement | null)[]>(([])

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
        <div class="sl-skill-name">
          ${s.label}
        </div>
      `

      card.style.background = `
        linear-gradient(
          135deg,
          ${s.grad}
        )
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
          55,
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
            opacity 1s ease,
            transform 1s ease;
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
            opacity 1s ease,
            transform 1s ease;
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

          width:min(900px,92vw);

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

          width:min(760px,90vw);

          padding:
            34px 34px
            26px 34px;

          border-radius:30px;

          overflow:hidden;

          background:
            linear-gradient(
              180deg,
              rgba(10,20,35,.92),
              rgba(5,10,18,.96)
            );

          border:
            1px solid rgba(0,212,255,.24);

          box-shadow:
            0 0 40px rgba(0,212,255,.14),
            inset 0 0 40px rgba(0,212,255,.06),
            inset 0 0 120px rgba(255,255,255,.03);

          backdrop-filter:blur(18px);
        }

        .sl-battery-shell-glow{
          position:absolute;
          inset:-120px;

          background:
            radial-gradient(
              circle at center,
              rgba(0,212,255,.16),
              transparent 70%
            );

          animation:
            shellPulse 4s ease-in-out infinite;

          pointer-events:none;
        }

        .sl-battery-topline{
          display:flex;
          align-items:center;
          justify-content:space-between;

          margin-bottom:26px;
        }

        .sl-battery-title{
          color:rgba(255,255,255,.9);

          font-size:12px;

          font-weight:700;

          letter-spacing:.32em;

          text-transform:uppercase;
        }

        .sl-battery-mini{
          display:flex;
          gap:6px;
        }

        .sl-battery-mini span{
          width:7px;
          height:7px;

          border-radius:50%;

          background:rgba(255,255,255,.16);

          animation:
            miniBlink 1.8s infinite;
        }

        .sl-battery-cells{
          position:relative;

          display:flex;
          gap:12px;

          justify-content:center;
          align-items:center;

          padding:
            18px 18px;

          border-radius:22px;

          background:
            linear-gradient(
              180deg,
              rgba(255,255,255,.03),
              rgba(255,255,255,.015)
            );

          border:
            1px solid rgba(255,255,255,.05);

          box-shadow:
            inset 0 0 24px rgba(0,212,255,.04);
        }

        .sl-battery-cell{
          width:54px;
          height:78px;

          border-radius:14px;

          border:
            1px solid rgba(255,255,255,.12);

          background:
            linear-gradient(
              180deg,
              rgba(255,255,255,.06),
              rgba(255,255,255,.02)
            );

          position:relative;

          overflow:hidden;
        }

        .sl-battery-cell::before{
          content:"";

          position:absolute;

          left:0;
          right:0;
          bottom:0;

          height:0%;

          transition:
            height 1s cubic-bezier(.22,.8,.2,1);
        }

        .sl-battery-cell.active::before{
          height:100%;
        }

        .sl-battery-cell:nth-child(1)::before{
          background:
            linear-gradient(
              180deg,
              #ff4040,
              #ff1010
            );
        }

        .sl-battery-cell:nth-child(2)::before,
        .sl-battery-cell:nth-child(3)::before{
          background:
            linear-gradient(
              180deg,
              #ff8c00,
              #ff6200
            );
        }

        .sl-battery-cell:nth-child(4)::before,
        .sl-battery-cell:nth-child(5)::before,
        .sl-battery-cell:nth-child(6)::before{
          background:
            linear-gradient(
              180deg,
              #ffe600,
              #ffc400
            );
        }

        .sl-battery-cell:nth-child(7)::before,
        .sl-battery-cell:nth-child(8)::before,
        .sl-battery-cell:nth-child(9)::before,
        .sl-battery-cell:nth-child(10)::before{
          background:
            linear-gradient(
              180deg,
              #8dff7a,
              #00ffd0
            );
        }

        .sl-battery-bottom{
          margin-top:24px;

          display:flex;
          align-items:flex-end;
          justify-content:space-between;

          gap:20px;
        }

        .sl-charge-pct{
          font-size:
            clamp(34px,4.4vw,56px);

          font-weight:900;

          line-height:1;

          color:white;

          letter-spacing:.02em;

          text-shadow:
            0 0 18px rgba(0,212,255,.4);
        }

        .sl-loading-text{
          color:#d7f3ff;

          letter-spacing:.16em;

          text-transform:uppercase;

          font-size:12px;

          font-weight:600;

          line-height:1.7;

          text-align:right;

          min-height:22px;

          opacity:.95;

          max-width:300px;
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

          letter-spacing:.28em;

          font-size:12px;

          font-weight:700;

          text-transform:uppercase;
        }

        .sl-welcome-line,
        .sl-expertise-label{
          opacity:0;

          transform:
            translateY(20px);

          transition:
            all .9s ease;
        }

        .sl-welcome-line.show,
        .sl-expertise-label.show{
          opacity:1;

          transform:
            translateY(0);
        }

        .sl-welcome-line{
          color:#d8b4fe;

          margin-bottom:20px;

          letter-spacing:.28em;

          text-transform:uppercase;

          font-size:12px;

          font-weight:700;

          text-align:center;

          line-height:1.8;
        }

        .sl-name{
          font-size:
            clamp(34px,6vw,76px);

          font-weight:900;

          line-height:1.1;

          color:white;

          text-align:center;

          text-shadow:
            0 0 20px rgba(168,85,247,1),
            0 0 40px rgba(0,212,255,.5);

          min-height:90px;
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

          grid-template-columns:
            repeat(5,1fr);

          gap:14px;

          width:min(900px,92vw);
        }

        .sl-skill-card{
          opacity:0;

          min-height:62px;

          padding:16px 14px;

          border-radius:16px;

          border:
            1px solid rgba(255,255,255,.08);

          backdrop-filter:blur(12px);

          display:flex;
          align-items:center;
          justify-content:center;

          text-align:center;

          transition:
            transform .35s ease,
            border-color .35s ease;
        }

        .sl-skill-card:hover{
          transform:
            translateY(-3px);

          border-color:
            rgba(255,255,255,.2);
        }

        .sl-card-show{
          animation:
            cardIn .7s ease forwards;
        }

        .sl-skill-name{
          color:white;

          font-size:13px;

          font-weight:700;

          letter-spacing:.04em;

          line-height:1.5;

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

        @keyframes shellPulse{
          0%{
            opacity:.35;
            transform:scale(1);
          }

          50%{
            opacity:.7;
            transform:scale(1.04);
          }

          100%{
            opacity:.35;
            transform:scale(1);
          }
        }

        @keyframes miniBlink{
          0%{
            opacity:.15;
            transform:scale(.8);
          }

          50%{
            opacity:1;
            transform:scale(1.2);
          }

          100%{
            opacity:.15;
            transform:scale(.8);
          }
        }

        @media(max-width:768px){

          .sl-battery-shell{
            padding:
              24px 18px
              20px 18px;
          }

          .sl-battery-cells{
            gap:8px;
            padding:14px;
          }

          .sl-battery-cell{
            width:32px;
            height:58px;
          }

          .sl-battery-bottom{
            align-items:center;
            gap:14px;
          }

          .sl-charge-pct{
            font-size:36px;
          }

          .sl-loading-text{
            font-size:10px;
            max-width:170px;
          }

          .sl-skills-grid{
            grid-template-columns:
              repeat(2,1fr);

            gap:12px;
          }

          .sl-skill-card{
            min-height:56px;
            padding:14px 10px;
          }

          .sl-skill-name{
            font-size:11px;
          }

          .sl-arc-wrap{
            width:260px;
            height:260px;
          }

          .sl-welcome-line{
            font-size:10px;
            letter-spacing:.22em;
            line-height:1.7;
          }

          .sl-expertise-label{
            font-size:11px;
            letter-spacing:.18em;
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

              <div className="sl-battery-shell-glow" />

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
                  Loading...
                </div>

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

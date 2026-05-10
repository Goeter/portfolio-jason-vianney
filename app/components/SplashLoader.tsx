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
  "Initializing power core...",
  "Calibrating repulsor array...",
  "Charging plasma conduits...",
  "Arc reactor at capacity...",
  "System online.",
]

const FULL_NAME =
  "Jason Vianney Sugiarto"

const PH1_DUR = 2600
const PH2_DUR = 2200

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

  const pctRef =
    useRef<HTMLDivElement>(null)

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

  const nebulaRef =
    useRef<HTMLDivElement>(null)

  const hyperRef =
    useRef<HTMLDivElement>(null)

  const hyperCanRef =
    useRef<HTMLCanvasElement>(null)

  const dustRef =
    useRef<HTMLDivElement>(null)

  const batteryRefs = useRef<
    (HTMLDivElement | null)[]
  >([])

  const rafRef = useRef<number>(0)

  const starsRafRef =
    useRef<number>(0)

  const hyperRafRef =
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
        10,
        cx,
        cy,
        r + 30
      )

    glow.addColorStop(
      0,
      "rgba(255,255,255,.18)"
    )

    glow.addColorStop(
      .4,
      `hsla(${190 + hueShift},100%,60%,.28)`
    )

    glow.addColorStop(
      1,
      "transparent"
    )

    ctx.beginPath()

    ctx.arc(
      cx,
      cy,
      r + 20,
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
      "#ff00ff"
    )

    g.addColorStop(
      .3,
      "#00d4ff"
    )

    g.addColorStop(
      .6,
      "#00ffcc"
    )

    g.addColorStop(
      1,
      "#ffe066"
    )

    ctx.beginPath()

    ctx.arc(cx, cy, r, start, end)

    ctx.strokeStyle = g

    ctx.lineWidth = 6

    ctx.lineCap = "round"

    ctx.shadowColor =
      "#00d4ff"

    ctx.shadowBlur = 24

    ctx.stroke()

    const dx =
      cx + r * Math.cos(end)

    const dy =
      cy + r * Math.sin(end)

    ctx.beginPath()

    ctx.arc(
      dx,
      dy,
      6,
      0,
      Math.PI * 2
    )

    ctx.fillStyle = "#fff"

    ctx.fill()

    ctx.shadowBlur = 0
  }

  function typeWriter(
    el: HTMLDivElement,
    text: string,
    speed: number,
    cb?: () => void
  ) {
    el.textContent = ""

    let i = 0

    const timer = setInterval(() => {
      el.textContent += text[i++]

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
      }, idx * 120)
    })
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

    const TOTAL = 2200

    const lines = Array.from(
      { length: 180 },
      () => ({
        angle:
          Math.random() *
          Math.PI *
          2,

        speed:
          0.6 +
          Math.random() * 1.4,

        hue:
          Math.random() * 360,

        baseDist:
          20 +
          Math.random() * 60,
      })
    )

    let t0: number | null = null

    function frame(ts: number) {
      if (!t0) t0 = ts

      const elapsed = ts - t0

      const prog = Math.min(
        elapsed / TOTAL,
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

      const maxDist =
        Math.max(
          cv.width,
          cv.height
        ) * .75

      lines.forEach((l) => {
        const dist =
          l.baseDist +
          ease *
            maxDist *
            l.speed

        const x1 =
          cx +
          Math.cos(l.angle) *
            dist

        const y1 =
          cy +
          Math.sin(l.angle) *
            dist

        const x2 =
          cx +
          Math.cos(l.angle) *
            (dist + 120)

        const y2 =
          cy +
          Math.sin(l.angle) *
            (dist + 120)

        ctx.beginPath()

        ctx.moveTo(x1, y1)

        ctx.lineTo(x2, y2)

        ctx.strokeStyle =
          `hsla(${l.hue},100%,75%,.8)`

        ctx.lineWidth = 1.4

        ctx.stroke()
      })

      if (prog < 1) {
        hyperRafRef.current =
          requestAnimationFrame(
            frame
          )
      } else {
        wrap.style.transition =
          "opacity .5s ease"

        wrap.style.opacity = "0"

        setTimeout(onDone, 500)
      }
    }

    hyperRafRef.current =
      requestAnimationFrame(frame)
  }

  function createDustExplosion() {
    const dust = dustRef.current

    if (!dust) return

    dust.innerHTML = ""

    const frag =
      document.createDocumentFragment()

    for (let i = 0; i < 180; i++) {
      const p =
        document.createElement("div")

      p.className = "sl-dust"

      const x =
        (Math.random() - .5) * 1200

      const y =
        (Math.random() - .5) * 800

      const size =
        1 + Math.random() * 4

      const dur =
        1 +
        Math.random() * .6

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
      { length: 60 },
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
          "rgba(255,255,255,.8)"

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

    let hueShift = 0

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

      const activeBars =
        Math.floor(p * 10)

      batteryRefs.current.forEach(
        (b, i) => {
          if (!b) return

          if (i <= activeBars) {
            b.classList.add("active")
          } else {
            b.classList.remove("active")
          }
        }
      )

      const mi = Math.min(
        Math.floor(
          p * STATUS_MSGS.length
        ),
        STATUS_MSGS.length - 1
      )

      if (msgRef.current) {
        msgRef.current.textContent =
          STATUS_MSGS[mi]
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

          hueShift =
            (ts2 / 8) % 360

          drawArc(
            easeOut(r2),
            hueShift
          )

          if (r2 < 1) {
            rafRef.current =
              requestAnimationFrame(
                phase2
              )

            return
          }

          let spinning = true

          function spinArc(
            ts3: number
          ) {
            if (!spinning) return

            hueShift =
              (ts3 / 8) % 360

            drawArc(1, hueShift)

            rafRef.current =
              requestAnimationFrame(
                spinArc
              )
          }

          rafRef.current =
            requestAnimationFrame(
              spinArc
            )

          setTimeout(() => {
            spinning = false

            ph2Ref.current?.classList.add(
              "sl-out"
            )

            setTimeout(() => {
              runHyperspace(() => {
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
                    48,
                    () => {
                      buildSkills()

                      setTimeout(() => {
                        createDustExplosion()

                        containerRef.current?.classList.add(
                          "sl-content-dust-out"
                        )

                        setTimeout(() => {
                          onLoadingComplete()
                        }, 1500)
                      }, 2500)
                    }
                  )
                }
              })
            }, 150)
          }, 900)
        }

        rafRef.current =
          requestAnimationFrame(
            phase2
          )
      }, 250)
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

      cancelAnimationFrame(
        hyperRafRef.current
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

        .sl-bg-grid{
          position:absolute;
          inset:0;

          background-image:
            linear-gradient(rgba(0,212,255,.03) 1px,transparent 1px),
            linear-gradient(90deg,rgba(0,212,255,.03) 1px,transparent 1px);

          background-size:55px 55px;
        }

        .sl-vignette{
          position:absolute;
          inset:0;

          background:
            radial-gradient(
              ellipse at center,
              transparent 20%,
              #020817 90%
            );
        }

        .sl-content{
          position:fixed;
          inset:0;
          z-index:10;

          display:flex;
          align-items:center;
          justify-content:center;

          overflow:hidden;
        }

        .sl-ph1,
        .sl-ph2,
        .sl-ph3{
          position:absolute;

          top:50%;
          left:50%;

          transform:
            translate(-50%, -50%);

          width:min(92vw,980px);

          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;

          text-align:center;
        }

        .sl-ph1{
          transition:
            opacity .7s ease,
            transform .7s ease;
        }

        .sl-ph1.sl-out{
          opacity:0;

          transform:
            translate(-50%,calc(-50% - 20px));
        }

        .sl-ph2{
          opacity:0;

          transform:
            translate(-50%,calc(-50% + 20px))
            scale(.85);

          transition:
            opacity .8s ease,
            transform .8s ease;
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
            scale(1.1);
        }

        .sl-ph3{
          opacity:0;

          transform:
            translate(-50%,calc(-50% + 20px));

          transition:
            opacity .8s ease,
            transform .8s ease;
        }

        .sl-ph3.sl-in{
          opacity:1;

          transform:
            translate(-50%,-50%);
        }

        .sl-loader-shell{
          width:min(860px,92vw);

          border:
            2px solid rgba(0,212,255,.55);

          padding:
            34px 50px;

          position:relative;

          background:
            linear-gradient(
              180deg,
              rgba(0,10,30,.9),
              rgba(0,0,0,.75)
            );

          box-shadow:
            0 0 40px rgba(0,212,255,.14),
            inset 0 0 30px rgba(0,212,255,.08);
        }

        .sl-loader-shell::before{
          content:"";

          position:absolute;

          top:-2px;
          left:-2px;

          width:48px;
          height:48px;

          border-top:
            4px solid #8cf6ff;

          border-left:
            4px solid #8cf6ff;
        }

        .sl-loader-shell::after{
          content:"";

          position:absolute;

          right:-2px;
          top:-2px;

          width:48px;
          height:48px;

          border-top:
            4px solid #8cf6ff;

          border-right:
            4px solid #8cf6ff;
        }

        .sl-bars{
          display:flex;
          gap:12px;

          margin-bottom:28px;
        }

        .sl-battery-bar{
          width:56px;
          height:66px;

          border-radius:6px;

          background:
            rgba(255,255,255,.04);

          border:
            1px solid rgba(255,255,255,.15);

          transition:
            background .3s ease,
            box-shadow .3s ease,
            transform .3s ease;
        }

        .sl-battery-bar.active{
          transform:
            translateY(-2px);

          box-shadow:
            0 0 20px currentColor,
            inset 0 0 20px rgba(255,255,255,.25);
        }

        .sl-battery-bar:nth-child(1).active{
          background:#ff2b2b;
          color:#ff2b2b;
        }

        .sl-battery-bar:nth-child(2).active{
          background:#ff5e00;
          color:#ff5e00;
        }

        .sl-battery-bar:nth-child(3).active{
          background:#ff8a00;
          color:#ff8a00;
        }

        .sl-battery-bar:nth-child(4).active{
          background:#ffb000;
          color:#ffb000;
        }

        .sl-battery-bar:nth-child(5).active{
          background:#ffc400;
          color:#ffc400;
        }

        .sl-battery-bar:nth-child(6).active{
          background:#ffd500;
          color:#ffd500;
        }

        .sl-battery-bar:nth-child(7).active{
          background:#ffe100;
          color:#ffe100;
        }

        .sl-battery-bar:nth-child(8).active{
          background:#fff000;
          color:#fff000;
        }

        .sl-battery-bar:nth-child(9).active{
          background:#fff48b;
          color:#fff48b;
        }

        .sl-battery-bar:nth-child(10).active{
          background:#ffffff;
          color:#ffffff;
        }

        .sl-bottom-row{
          display:flex;
          justify-content:space-between;
          align-items:center;

          width:100%;
        }

        .sl-loading-text{
          color:#8ea4c7;

          font-size:24px;

          letter-spacing:.45em;

          text-transform:uppercase;
        }

        .sl-system-text{
          color:#4e5875;

          font-size:18px;

          letter-spacing:.18em;
        }

        .sl-status-text{
          margin-top:16px;

          color:#77dfff;

          font-size:11px;

          letter-spacing:.25em;

          text-transform:uppercase;
        }

        .sl-charge-pct{
          margin-top:14px;

          font-size:14px;

          color:white;

          letter-spacing:.3em;
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
          width:90%;
          height:90%;
          border:1px solid rgba(0,212,255,.22);

          animation:
            spin 12s linear infinite;
        }

        .sl-ring-2{
          width:70%;
          height:70%;
          border:1px solid rgba(255,255,255,.12);

          animation:
            spin2 8s linear infinite;
        }

        .sl-ring-3{
          width:50%;
          height:50%;
          border:1px dashed rgba(0,255,200,.24);

          animation:
            spin 5s linear infinite;
        }

        .sl-atom{
          position:absolute;

          width:180px;
          height:180px;

          border:
            1px solid rgba(0,212,255,.15);

          border-radius:50%;
        }

        .sl-atom::before{
          content:"";

          position:absolute;

          top:-4px;
          left:50%;

          transform:
            translateX(-50%);

          width:8px;
          height:8px;

          border-radius:50%;

          background:#00d4ff;

          box-shadow:
            0 0 18px #00d4ff;
        }

        .sl-atom-1{
          animation:
            atomSpin 6s linear infinite;
        }

        .sl-atom-2{
          width:220px;
          height:220px;

          animation:
            atomSpinReverse 8s linear infinite;
        }

        .sl-atom-3{
          width:150px;
          height:150px;

          animation:
            atomSpin 4s linear infinite;
        }

        .sl-arc-canvas{
          width:140px;
          height:140px;

          border-radius:50%;

          background:transparent;
        }

        .sl-reactor-label{
          position:absolute;
          text-align:center;
        }

        .sl-reactor-title{
          color:white;

          font-size:12px;

          letter-spacing:.35em;

          text-transform:uppercase;
        }

        .sl-reactor-sub{
          color:rgba(255,255,255,.55);

          margin-top:4px;

          font-size:10px;

          letter-spacing:.2em;
        }

        .sl-reactor-status{
          margin-top:18px;

          color:#00d4ff;

          font-size:11px;

          letter-spacing:.35em;

          text-transform:uppercase;
        }

        .sl-welcome-line{
          opacity:0;

          animation:
            fadeUp .9s ease forwards;

          margin-bottom:16px;

          color:#b388ff;

          letter-spacing:.45em;

          text-transform:uppercase;

          font-size:11px;
        }

        .sl-name{
          font-size:
            clamp(38px,6vw,74px);

          font-weight:900;

          line-height:1.1;

          color:white;

          text-shadow:
            0 0 20px rgba(168,85,247,.9),
            0 0 50px rgba(0,212,255,.5);
        }

        .sl-divline{
          width:180px;
          height:1px;

          margin:
            24px 0;

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
            fadeUp .9s ease .5s forwards;

          margin-bottom:18px;

          color:#c084fc;

          letter-spacing:.45em;

          text-transform:uppercase;

          font-size:10px;
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
            cardIn .6s ease forwards;
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

          text-align:center;
        }

        .sl-nebula{
          position:absolute;
          inset:0;

          opacity:0;

          transition:
            opacity 2s ease;
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
              rgba(168,85,247,.5),
              transparent 70%
            );

          will-change:
            transform,
            opacity;

          animation:
            sl-dust-move linear forwards;
        }

        .sl-content-dust-out{
          animation:
            sl-content-dust-out
            1.5s cubic-bezier(.22,.8,.2,1)
            forwards;
        }

        @keyframes sl-dust-move{
          0%{
            opacity:0;

            transform:
              translate3d(0,0,0)
              scale(1);
          }

          10%{
            opacity:1;
          }

          100%{
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

        @keyframes sl-content-dust-out{
          0%{
            opacity:1;

            transform:
              scale(1);

            filter:
              blur(0px);
          }

          100%{
            opacity:0;

            transform:
              scale(1.14);

            filter:
              blur(10px)
              brightness(1.4);
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
              translateY(20px);
          }

          to{
            opacity:1;

            transform:
              translateY(0);
          }
        }

        @keyframes spin{
          to{
            transform:
              rotate(360deg);
          }
        }

        @keyframes spin2{
          to{
            transform:
              rotate(-360deg);
          }
        }

        @keyframes atomSpin{
          to{
            transform:
              rotate(360deg);
          }
        }

        @keyframes atomSpinReverse{
          to{
            transform:
              rotate(-360deg);
          }
        }

        @media(max-width:768px){
          .sl-bars{
            gap:8px;
          }

          .sl-battery-bar{
            width:34px;
            height:52px;
          }

          .sl-loading-text{
            font-size:14px;
          }

          .sl-system-text{
            font-size:12px;
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

        @media(max-width:480px){
          .sl-loader-shell{
            padding:24px 18px;
          }

          .sl-bars{
            gap:5px;
          }

          .sl-battery-bar{
            width:22px;
            height:40px;
          }

          .sl-loading-text{
            font-size:10px;
            letter-spacing:.25em;
          }

          .sl-system-text{
            display:none;
          }

          .sl-name{
            font-size:32px;
          }

          .sl-skills-grid{
            gap:10px;
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
          <div
            ref={ph1Ref}
            className="sl-ph1"
          >
            <div className="sl-loader-shell">
              <div className="sl-bars">
                {Array.from({
                  length: 10,
                }).map((_, i) => (
                  <div
                    key={i}
                    ref={(el) => {
                      batteryRefs.current[i] =
                        el
                    }}
                    className="sl-battery-bar"
                  />
                ))}
              </div>

              <div className="sl-bottom-row">
                <div className="sl-loading-text">
                  LOADING....
                </div>

                <div className="sl-system-text">
                  MK-VII SYSTEM
                </div>
              </div>

              <div
                ref={msgRef}
                className="sl-status-text"
              >
                Initializing power core...
              </div>

              <div
                ref={pctRef}
                className="sl-charge-pct"
              >
                0%
              </div>
            </div>
          </div>

          <div
            ref={ph2Ref}
            className="sl-ph2"
          >
            <div className="sl-arc-wrap">
              <div className="sl-ring sl-ring-1" />
              <div className="sl-ring sl-ring-2" />
              <div className="sl-ring sl-ring-3" />

              <div className="sl-atom sl-atom-1" />
              <div className="sl-atom sl-atom-2" />
              <div className="sl-atom sl-atom-3" />

              <canvas
                ref={canvasRef}
                className="sl-arc-canvas"
                width={120}
                height={120}
              />

              <div className="sl-reactor-label">
                <div className="sl-reactor-title">
                  Arc Reactor
                </div>

                <div className="sl-reactor-sub">
                  Mark VII
                </div>
              </div>
            </div>

            <div className="sl-reactor-status">
              Reactor Online
            </div>
          </div>

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

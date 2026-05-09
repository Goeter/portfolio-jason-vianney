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

  const barRef =
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

  const taglineRef =
    useRef<HTMLParagraphElement>(null)

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

  const divRefs = useRef<
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
    const r = w / 2 - 8

    ctx.clearRect(0, 0, w, h)

    const glow =
      ctx.createRadialGradient(
        cx,
        cy,
        10,
        cx,
        cy,
        r + 25
      )

    glow.addColorStop(
      0,
      "rgba(255,255,255,.15)"
    )

    glow.addColorStop(
      0.4,
      `hsla(${200 + hueShift},100%,60%,.25)`
    )

    glow.addColorStop(
      1,
      "transparent"
    )

    ctx.beginPath()

    ctx.arc(
      cx,
      cy,
      r + 18,
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
      .3,
      `hsl(${190 + hueShift},100%,60%)`
    )

    g.addColorStop(
      .6,
      `hsl(${150 + hueShift},100%,55%)`
    )

    g.addColorStop(
      1,
      `hsl(${30 + hueShift},100%,60%)`
    )

    ctx.beginPath()

    ctx.arc(cx, cy, r, start, end)

    ctx.strokeStyle = g

    ctx.lineWidth = 6

    ctx.lineCap = "round"

    ctx.shadowColor =
      `hsl(${200 + hueShift},100%,65%)`

    ctx.shadowBlur = 26

    ctx.stroke()

    const dx =
      cx + r * Math.cos(end)

    const dy =
      cy + r * Math.sin(end)

    ctx.beginPath()

    ctx.arc(
      dx,
      dy,
      7,
      0,
      Math.PI * 2
    )

    ctx.fillStyle = "#fff"

    ctx.shadowColor =
      `hsl(${200 + hueShift},100%,75%)`

    ctx.shadowBlur = 28

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
      }, idx * 130)
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

    const TOTAL = 2800

    const lines = Array.from(
      { length: 220 },
      () => ({
        angle:
          Math.random() *
          Math.PI *
          2,

        speed:
          0.6 +
          Math.random() * 2.1,

        hue:
          Math.random() * 360,

        baseDist:
          30 +
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
        "rgba(1,11,20,.16)"

      ctx.fillRect(
        0,
        0,
        cv.width,
        cv.height
      )

      const stretch =
        1 + ease * 34

      const maxDist =
        Math.max(
          cv.width,
          cv.height
        ) * .85

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
            (dist +
              l.speed *
                stretch *
                100)

        const y2 =
          cy +
          Math.sin(l.angle) *
            (dist +
              l.speed *
                stretch *
                100)

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

    const TOTAL = 140

    const frag =
      document.createDocumentFragment()

    for (let i = 0; i < TOTAL; i++) {
      const p =
        document.createElement("div")

      p.className = "sl-dust"

      const x =
        (Math.random() - 0.5) * 900

      const y =
        (Math.random() - 0.5) * 600

      const size =
        1 + Math.random() * 4

      const dur =
        0.9 + Math.random() * 0.8

      const delay =
        Math.random() * 0.15

      p.style.cssText = `
        --tx:${x}px;
        --ty:${y}px;
        width:${size}px;
        height:${size}px;
        left:50%;
        top:50%;
        animation-duration:${dur}s;
        animation-delay:${delay}s;
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

      if (barRef.current) {
        barRef.current.style.width =
          `${pct}%`
      }

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

      const di = Math.floor(p * 5)

      divRefs.current.forEach(
        (d, i) => {
          if (!d) return

          if (i < di) {
            d.classList.add("on")
          } else {
            d.classList.remove("on")
          }
        }
      )

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

          hueShift = (ts2 / 8) % 360

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
                    50,
                    () => {
                      buildSkills()

                      setTimeout(() => {
                        taglineRef.current?.classList.add(
                          "sl-show"
                        )

                        setTimeout(() => {
                          createDustExplosion()

                          containerRef.current?.classList.add(
                            "sl-content-dust-out"
                          )

                          setTimeout(() => {
                            onLoadingComplete()
                          }, 1300)
                        }, 2400)
                      }, 500)
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

          background:#010b14;

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
              transparent 30%,
              #010b14 85%
            );
        }

        .sl-content{
          position:fixed;
          inset:0;
          z-index:10;

          width:100%;
          height:100vh;

          display:flex;
          align-items:center;
          justify-content:center;

          padding:24px;

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

          width:min(92vw, 980px);

          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;

          text-align:center;
        }

        .sl-ph3{
          width:min(92vw, 820px);
        }

        .sl-name{
          font-size:clamp(32px,6vw,72px);
          font-weight:900;

          line-height:1.1;

          text-align:center;

          margin-bottom:12px;

          color:white;

          text-shadow:
            0 0 20px rgba(168,85,247,1),
            0 0 50px rgba(0,212,255,.7);
        }

        .sl-name-sub{
          text-align:center;

          margin-bottom:24px;

          color:rgba(255,255,255,.7);

          letter-spacing:.22em;

          text-transform:uppercase;

          font-size:clamp(10px,1.8vw,14px);
        }

        .sl-skills-grid{
          width:100%;
          max-width:760px;

          display:grid;

          grid-template-columns:
            repeat(4,1fr);

          gap:14px;

          margin:auto;
        }

        .sl-tagline{
          margin-top:28px;

          text-align:center;

          font-size:clamp(10px,1.7vw,14px);
        }

        .sl-ph1{
          gap:20px;

          transition:
            opacity .6s ease,
            transform .6s ease;
        }

        .sl-ph1.sl-out{
          opacity:0;

          transform:
            translate(-50%, calc(-50% - 20px));
        }

        .sl-ph2{
          opacity:0;

          transform:
            translate(-50%, calc(-50% + 20px))
            scale(.8);

          transition:
            opacity .8s ease,
            transform .8s ease;
        }

        .sl-ph2.sl-in{
          opacity:1;

          transform:
            translate(-50%, -50%)
            scale(1);
        }

        .sl-ph2.sl-out{
          opacity:0;

          transform:
            translate(-50%, -50%)
            scale(1.12);
        }

        .sl-ph3{
          opacity:0;

          transform:
            translate(-50%, calc(-50% + 20px));

          transition:
            opacity .9s ease,
            transform .9s ease;
        }

        .sl-ph3.sl-in{
          opacity:1;

          transform:
            translate(-50%, -50%);
        }

        .sl-status-label,
        .sl-status-text,
        .sl-welcome-line,
        .sl-expertise-label,
        .sl-tagline,
        .sl-reactor-status{
          text-align:center;
        }

        .sl-status-label{
          color:#00d4ff;
          font-size:12px;
          letter-spacing:.35em;
          text-transform:uppercase;
        }

        .sl-charge-pct{
          font-size:clamp(48px,8vw,78px);
          font-weight:900;
          color:white;
        }

        .sl-charge-wrap{
          width:min(520px,90vw);
          height:6px;

          border-radius:10px;
          overflow:hidden;

          background:rgba(255,255,255,.08);
        }

        .sl-charge-fill{
          width:0%;
          height:100%;

          background:
            linear-gradient(
              90deg,
              #ff00ff,
              #00d4ff,
              #00ffcc,
              #ff6b35
            );
        }

        .sl-status-row{
          display:flex;
          align-items:center;
          justify-content:center;
          flex-wrap:wrap;
          gap:12px;
        }

        .sl-dot{
          width:8px;
          height:8px;

          border-radius:50%;
          background:#00d4ff;
        }

        .sl-status-text{
          color:#8fdfff;
          font-size:12px;
          letter-spacing:.2em;
          text-transform:uppercase;
        }

        .sl-dividers{
          display:flex;
          gap:4px;
        }

        .sl-divider{
          width:22px;
          height:2px;

          background:rgba(255,255,255,.15);
        }

        .sl-divider.on{
          background:#00d4ff;
        }

        .sl-arc-wrap{
          position:relative;

          width:clamp(220px,35vw,320px);
          height:clamp(220px,35vw,320px);

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
          border:1px solid rgba(255,0,255,.3);
          animation:spin 10s linear infinite;
        }

        .sl-ring-2{
          width:70%;
          height:70%;
          border:1px solid rgba(0,212,255,.3);
          animation:spin2 7s linear infinite;
        }

        .sl-ring-3{
          width:50%;
          height:50%;
          border:1px dashed rgba(0,255,200,.3);
          animation:spin 5s linear infinite;
        }

        .sl-ring-4{
          width:108%;
          height:108%;
          border:1px solid rgba(255,255,255,.08);
          animation:spin2 18s linear infinite;
        }

        .sl-atom{
          position:absolute;

          width:170px;
          height:170px;

          border:
            1px solid rgba(0,212,255,.16);

          border-radius:50%;

          will-change:transform;
        }

        .sl-atom::before{
          content:"";

          position:absolute;

          width:10px;
          height:10px;

          border-radius:50%;

          background:#00d4ff;

          box-shadow:
            0 0 14px #00d4ff,
            0 0 28px #00d4ff;

          top:-5px;
          left:50%;

          transform:translateX(-50%);
        }

        .sl-atom-1{
          animation:
            atomSpin 5s linear infinite;
        }

        .sl-atom-2{
          width:200px;
          height:200px;

          animation:
            atomSpinReverse 7s linear infinite;
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

          display:block;
        }

        .sl-reactor-label{
          position:absolute;
          text-align:center;
        }

        .sl-reactor-title{
          color:white;
          font-size:12px;
          letter-spacing:.3em;
          text-transform:uppercase;
        }

        .sl-reactor-sub{
          color:rgba(255,255,255,.5);
          font-size:10px;
          letter-spacing:.2em;
        }

        .sl-reactor-status{
          margin-top:20px;

          color:#00d4ff;

          letter-spacing:.3em;

          text-transform:uppercase;

          font-size:11px;
        }

        .sl-welcome-line{
          margin-bottom:14px;

          color:#b388ff;

          letter-spacing:.4em;

          text-transform:uppercase;

          font-size:11px;
        }

        .sl-divline{
          width:180px;
          height:1px;

          margin-bottom:22px;

          background:
            linear-gradient(
              90deg,
              transparent,
              #00d4ff,
              transparent
            );
        }

        .sl-expertise-label{
          margin-bottom:18px;

          color:#c084fc;

          letter-spacing:.4em;

          text-transform:uppercase;

          font-size:10px;
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

          transition:opacity 2s ease;
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
              rgba(168,85,247,.55),
              transparent 70%
            );

          will-change:
            transform,
            opacity;

          transform:
            translate3d(0,0,0);

          backface-visibility:hidden;

          animation:
            sl-dust-move linear forwards;
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

            filter:blur(2px);
          }
        }

        .sl-content-dust-out{
          will-change:
            transform,
            opacity,
            filter;

          animation:
            sl-content-dust-out
            1.3s cubic-bezier(.22,.8,.2,1)
            forwards;
        }

        @keyframes sl-content-dust-out{
          0%{
            opacity:1;

            transform:
              scale(1)
              translateZ(0);

            filter:
              blur(0px)
              brightness(1);
          }

          100%{
            opacity:0;

            transform:
              scale(1.18)
              translateZ(0);

            filter:
              blur(10px)
              brightness(1.6);
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

        @keyframes atomSpin{
          from{
            transform:
              rotate(0deg);
          }

          to{
            transform:
              rotate(360deg);
          }
        }

        @keyframes atomSpinReverse{
          from{
            transform:
              rotate(360deg);
          }

          to{
            transform:
              rotate(0deg);
          }
        }

        @media(max-width:768px){
          .sl-skills-grid{
            grid-template-columns:
              repeat(2,1fr);

            max-width:420px;
          }

          .sl-content{
            padding:20px;
          }
        }

        @media(max-width:480px){
          .sl-skills-grid{
            gap:10px;
          }

          .sl-skill-card{
            padding:14px 10px;
          }

          .sl-arc-canvas{
            width:110px;
            height:110px;
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
            <div className="sl-status-label">
              ◈ Charging Status
            </div>

            <div
              ref={pctRef}
              className="sl-charge-pct"
            >
              0%
            </div>

            <div className="sl-charge-wrap">
              <div
                ref={barRef}
                className="sl-charge-fill"
              />
            </div>

            <div className="sl-status-row">
              <div className="sl-dot" />

              <div
                ref={msgRef}
                className="sl-status-text"
              >
                Initializing power core...
              </div>

              <div className="sl-dividers">
                {[0, 1, 2, 3, 4].map(
                  (i) => (
                    <div
                      key={i}
                      className="sl-divider"
                      ref={(el) => {
                        divRefs.current[i] =
                          el
                      }}
                    />
                  )
                )}
              </div>
            </div>
          </div>

          <div
            ref={ph2Ref}
            className="sl-ph2"
          >
            <div className="sl-arc-wrap">
              <div className="sl-ring sl-ring-4" />
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

            <div className="sl-name-sub">
              Full Stack Developer &
              Designer
            </div>

            <div className="sl-divline" />

            <div className="sl-expertise-label">
              My Expertise
            </div>

            <div
              ref={skillsRef}
              className="sl-skills-grid"
            />

            <p
              ref={taglineRef}
              className="sl-tagline"
            >
              Building Digital
              Systems With Precision
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

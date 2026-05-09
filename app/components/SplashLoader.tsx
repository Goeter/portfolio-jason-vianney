"use client"

import { useEffect, useRef } from "react"

type Props = {
  onLoadingComplete: () => void
}

const SKILLS = [
  {
    label: "Front-end Dev",
    icon: "💻",
    grad: "rgba(0,212,255,0.22),rgba(59,130,246,0.22)",
  },
  {
    label: "System Analyst",
    icon: "⚙️",
    grad: "rgba(168,85,247,0.22),rgba(236,72,153,0.22)",
  },
  {
    label: "UI/UX Design",
    icon: "🎨",
    grad: "rgba(251,146,60,0.22),rgba(236,72,153,0.22)",
  },
  {
    label: "Data Analyst",
    icon: "📊",
    grad: "rgba(52,211,153,0.22),rgba(16,185,129,0.22)",
  },
]

const STATUS_MSGS = [
  "Initializing power core...",
  "Calibrating repulsor array...",
  "Charging plasma conduits...",
  "Arc reactor at capacity...",
  "System online.",
]

const FULL_NAME = "Jason Vianney Sugiarto"

const PH1_DUR = 2600
const PH2_DUR = 2400

export default function SplashLoader({
  onLoadingComplete,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  const ph1Ref = useRef<HTMLDivElement>(null)
  const ph2Ref = useRef<HTMLDivElement>(null)
  const ph3Ref = useRef<HTMLDivElement>(null)

  const barRef = useRef<HTMLDivElement>(null)
  const pctRef = useRef<HTMLDivElement>(null)
  const msgRef = useRef<HTMLDivElement>(null)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const nameRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)

  const particlesRef = useRef<HTMLDivElement>(null)

  const starsRef = useRef<HTMLCanvasElement>(null)

  const nebulaRef = useRef<HTMLDivElement>(null)

  const hyperRef = useRef<HTMLDivElement>(null)
  const hyperCanRef = useRef<HTMLCanvasElement>(null)

  const dustRef = useRef<HTMLDivElement>(null)

  const divRefs = useRef<(HTMLDivElement | null)[]>([])

  const rafRef = useRef<number>(0)
  const starsRafRef = useRef<number>(0)
  const hyperRafRef = useRef<number>(0)

  function easeOut(t: number) {
    return 1 - Math.pow(1 - t, 3)
  }

  /* ARC REACTOR */

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

    const now = performance.now()

    const pulse =
      0.94 +
      Math.sin(now * 0.0045) * 0.08

    const corePulse =
      0.8 +
      Math.sin(now * 0.0065) * 0.18

    /* OUTER GLOW */

    const glow = ctx.createRadialGradient(
      cx,
      cy,
      10,
      cx,
      cy,
      r + 45
    )

    glow.addColorStop(
      0,
      `rgba(255,255,255,${0.16 * pulse})`
    )

    glow.addColorStop(
      0.4,
      `hsla(${200 + hueShift},100%,60%,${
        0.24 * pulse
      })`
    )

    glow.addColorStop(1, "transparent")

    ctx.beginPath()
    ctx.arc(cx, cy, r + 22, 0, Math.PI * 2)

    ctx.fillStyle = glow
    ctx.fill()

    /* BASE RING */

    ctx.beginPath()

    ctx.arc(cx, cy, r, 0, Math.PI * 2)

    ctx.strokeStyle = "rgba(255,255,255,0.08)"

    ctx.lineWidth = 6

    ctx.stroke()

    if (progress <= 0) return

    const start = -Math.PI / 2

    const end =
      start + Math.PI * 2 * progress

    const g = ctx.createLinearGradient(
      0,
      0,
      w,
      h
    )

    g.addColorStop(
      0,
      `hsl(${(280 + hueShift) % 360},100%,65%)`
    )

    g.addColorStop(
      0.25,
      `hsl(${(190 + hueShift) % 360},100%,60%)`
    )

    g.addColorStop(
      0.5,
      `hsl(${(150 + hueShift) % 360},100%,55%)`
    )

    g.addColorStop(
      0.75,
      `hsl(${(30 + hueShift) % 360},100%,60%)`
    )

    g.addColorStop(
      1,
      `hsl(${(280 + hueShift) % 360},100%,65%)`
    )

    /* MAIN ARC */

    ctx.beginPath()

    ctx.arc(cx, cy, r, start, end)

    ctx.strokeStyle = g

    ctx.lineWidth = 7

    ctx.lineCap = "round"

    ctx.shadowColor = `hsl(${
      (200 + hueShift) % 360
    },100%,65%)`

    ctx.shadowBlur = 30

    ctx.stroke()

    /* INNER ARC */

    ctx.beginPath()

    ctx.arc(cx, cy, r - 12, start, end)

    ctx.strokeStyle = `hsla(${
      (190 + hueShift) % 360
    },100%,70%,0.55)`

    ctx.lineWidth = 2.5

    ctx.shadowBlur = 16

    ctx.stroke()

    ctx.shadowBlur = 0

    /* ENERGY PARTICLE */

    const dx = cx + r * Math.cos(end)
    const dy = cy + r * Math.sin(end)

    ctx.beginPath()

    ctx.arc(dx, dy, 7.5, 0, Math.PI * 2)

    ctx.fillStyle = "#ffffff"

    ctx.shadowColor = `hsl(${
      (200 + hueShift) % 360
    },100%,75%)`

    ctx.shadowBlur = 28

    ctx.fill()

    ctx.shadowBlur = 0

    /* CORE */

    ctx.beginPath()

    ctx.arc(
      cx,
      cy,
      12 + corePulse * 2,
      0,
      Math.PI * 2
    )

    ctx.fillStyle = `hsla(${
      (190 + hueShift) % 360
    },100%,75%,0.96)`

    ctx.shadowColor = `hsl(${
      (190 + hueShift) % 360
    },100%,75%)`

    ctx.shadowBlur = 35

    ctx.fill()

    ctx.shadowBlur = 0
  }

  /* TYPEWRITER */

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

  /* BUILD SKILLS */

  function buildSkills() {
    const grid = skillsRef.current

    if (!grid) return

    grid.innerHTML = ""

    SKILLS.forEach((s, idx) => {
      const card = document.createElement("div")

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
        card.classList.add("sl-card-show")
      }, idx * 130)
    })
  }

  /* HYPERSPACE */

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

    const TOTAL = 3000

    interface HLine {
      angle: number
      speed: number
      hue: number
      baseDist: number
    }

    const lines: HLine[] = Array.from(
      { length: 420 },
      () => ({
        angle: Math.random() * Math.PI * 2,
        speed: 0.8 + Math.random() * 2.4,
        hue: Math.random() * 360,
        baseDist: 20 + Math.random() * 70,
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

      const ease = 1 - Math.pow(1 - prog, 3)

      ctx.fillStyle = "rgba(1,11,20,0.18)"

      ctx.fillRect(
        0,
        0,
        cv.width,
        cv.height
      )

      const stretch = 1 + ease * 42

      const maxDist =
        Math.max(cv.width, cv.height) * 0.95

      lines.forEach((l) => {
        const dist =
          l.baseDist +
          ease * maxDist * l.speed

        const x1 =
          cx + Math.cos(l.angle) * dist

        const y1 =
          cy + Math.sin(l.angle) * dist

        const x2 =
          cx +
          Math.cos(l.angle) *
            (dist +
              l.speed *
                stretch *
                (20 + ease * 120))

        const y2 =
          cy +
          Math.sin(l.angle) *
            (dist +
              l.speed *
                stretch *
                (20 + ease * 120))

        const lineAlpha =
          prog > 0.8
            ? (1 - (prog - 0.8) / 0.2) *
              0.95
            : 0.55 + ease * 0.4

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
          `hsla(${l.hue},100%,92%,${lineAlpha})`
        )

        ctx.beginPath()

        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)

        ctx.strokeStyle = grad

        ctx.lineWidth = 1.8

        ctx.stroke()
      })

      if (prog > 0.78) {
        const f = (prog - 0.78) / 0.22

        ctx.fillStyle = `rgba(255,255,255,${
          f * 0.9
        })`

        ctx.fillRect(
          0,
          0,
          cv.width,
          cv.height
        )
      }

      if (prog < 1) {
        hyperRafRef.current =
          requestAnimationFrame(frame)
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

  /* DUST OUT */

  function createDustExplosion() {
    const dust = dustRef.current

    if (!dust) return

    dust.innerHTML = ""

    for (let i = 0; i < 360; i++) {
      const p = document.createElement("div")

      p.className = "sl-dust"

      const x =
        (Math.random() - 0.5) * 1600

      const y =
        (Math.random() - 0.5) * 1000

      const size = 2 + Math.random() * 8

      const dur = 1.5 + Math.random() * 1.8

      p.style.cssText = `
        --tx:${x}px;
        --ty:${y}px;

        width:${size}px;
        height:${size}px;

        left:50%;
        top:50%;

        animation-duration:${dur}s;
      `

      dust.appendChild(p)
    }
  }

  /* STARS */

  function initStars() {
    const cv = starsRef.current

    if (!cv) return

    cv.width = window.innerWidth
    cv.height = window.innerHeight

    const ctx = cv.getContext("2d")

    if (!ctx) return

    interface Star {
      x: number
      y: number
      vx: number
      vy: number
      len: number
      alpha: number
      hue: number
      life: number
      maxLife: number
    }

    const stars: Star[] = []

    function spawnStar(): Star {
      const angle =
        Math.random() * Math.PI * 2

      const speed = 4 + Math.random() * 8

      return {
        x: Math.random() * cv.width,

        y:
          Math.random() *
          cv.height *
          0.5,

        vx: Math.cos(angle) * speed,

        vy:
          Math.sin(angle) * speed + 1.5,

        len: 60 + Math.random() * 120,

        alpha: 0,

        hue: Math.random() * 360,

        life: 0,

        maxLife:
          60 + Math.random() * 80,
      }
    }

    for (let i = 0; i < 8; i++) {
      stars.push(spawnStar())
    }

    function loop() {
      ctx.clearRect(
        0,
        0,
        cv.width,
        cv.height
      )

      if (Math.random() < 0.04) {
        stars.push(spawnStar())
      }

      for (
        let i = stars.length - 1;
        i >= 0;
        i--
      ) {
        const s = stars[i]

        s.life++

        s.x += s.vx
        s.y += s.vy

        s.alpha =
          s.life < 15
            ? s.life / 15
            : Math.max(
                0,
                1 -
                  (s.life -
                    s.maxLife * 0.5) /
                    (s.maxLife * 0.5)
              )

        const tail = {
          x:
            s.x -
            s.vx *
              (s.len / (s.len * 0.3)),

          y:
            s.y -
            s.vy *
              (s.len / (s.len * 0.3)),
        }

        const grad =
          ctx.createLinearGradient(
            tail.x,
            tail.y,
            s.x,
            s.y
          )

        grad.addColorStop(
          0,
          `hsla(${s.hue},100%,80%,0)`
        )

        grad.addColorStop(
          1,
          `hsla(${s.hue},100%,90%,${s.alpha})`
        )

        ctx.beginPath()

        ctx.moveTo(tail.x, tail.y)

        ctx.lineTo(s.x, s.y)

        ctx.strokeStyle = grad

        ctx.lineWidth = 2

        ctx.stroke()

        ctx.beginPath()

        ctx.arc(
          s.x,
          s.y,
          2.5,
          0,
          Math.PI * 2
        )

        ctx.fillStyle = `hsla(${s.hue},100%,95%,${s.alpha})`

        ctx.fill()

        if (
          s.life >= s.maxLife ||
          s.x < -200 ||
          s.x > cv.width + 200 ||
          s.y > cv.height + 100
        ) {
          stars.splice(i, 1)
        }
      }

      starsRafRef.current =
        requestAnimationFrame(loop)
    }

    loop()
  }

  /* MAIN */

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

      const pct = Math.floor(p * 100)

      if (pctRef.current) {
        pctRef.current.textContent = `${pct}%`
      }

      if (barRef.current) {
        barRef.current.style.width = `${pct}%`
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

      divRefs.current.forEach((d, i) => {
        if (!d) return

        if (i < di) {
          d.classList.add("on")
        } else {
          d.classList.remove("on")
        }
      })

      if (raw < 1) {
        rafRef.current =
          requestAnimationFrame(phase1)

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

          drawArc(easeOut(r2), hueShift)

          if (r2 < 1) {
            rafRef.current =
              requestAnimationFrame(
                phase2
              )

            return
          }

          let spinning = true

          function spinArc(ts3: number) {
            if (!spinning) return

            hueShift = (ts3 / 8) % 360

            drawArc(1, hueShift)

            rafRef.current =
              requestAnimationFrame(
                spinArc
              )
          }

          rafRef.current =
            requestAnimationFrame(spinArc)

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
                      nameEl.classList.remove(
                        "sl-cursor"
                      )

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
                          }, 1800)
                        }, 2600)
                      }, 500)
                    }
                  )
                }
              })
            }, 150)
          }, 1200)
        }

        rafRef.current =
          requestAnimationFrame(phase2)
      }, 250)
    }

    rafRef.current =
      requestAnimationFrame(phase1)

    return () => {
      cancelAnimationFrame(rafRef.current)

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

        .sl-root {
          position:fixed;
          inset:0;

          width:100%;
          height:100vh;

          overflow:hidden;

          display:flex;
          align-items:center;
          justify-content:center;

          background:#010b14;
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

        .sl-content {
          position:relative;
          z-index:5;

          width:min(92vw,1100px);

          min-height:100vh;

          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;

          padding:40px 20px;

          text-align:center;
        }

        .sl-ph1,
        .sl-ph2,
        .sl-ph3{
          width:100%;

          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
        }

        .sl-ph1{
          max-width:min(92vw,760px);

          gap:22px;

          transition:
            opacity .6s ease,
            transform .6s ease;
        }

        .sl-ph1.sl-out{
          opacity:0;
          transform:translateY(-20px);
        }

        .sl-status-label{
          color:#00d4ff;
          font-size:clamp(10px,1.4vw,12px);
          letter-spacing:.35em;
          text-transform:uppercase;
        }

        .sl-charge-pct{
          font-size:clamp(54px,10vw,86px);
          font-weight:900;
          color:white;
        }

        /* UPGRADED LOADING BAR */

        .sl-loader-frame{
          position:relative;

          width:min(92vw,860px);

          padding:
            clamp(18px,2vw,24px)
            clamp(18px,2vw,30px);

          border:
            1px solid rgba(0,212,255,.28);

          border-radius:18px;

          background:
            linear-gradient(
              180deg,
              rgba(4,18,32,.95),
              rgba(1,8,18,.98)
            );

          box-shadow:
            0 0 40px rgba(0,212,255,.08),
            inset 0 0 40px rgba(0,212,255,.04);

          overflow:hidden;
        }

        .sl-loader-frame::before{
          content:"";

          position:absolute;
          inset:0;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,.03),
              transparent
            );

          animation:
            sl-panel-scan 3s linear infinite;
        }

        .sl-bars{
          display:grid;

          grid-template-columns:
            repeat(12,1fr);

          gap:clamp(6px,1vw,10px);

          margin-bottom:20px;
        }

        .sl-bar{
          position:relative;

          height:clamp(42px,6vw,68px);

          border-radius:8px;

          background:
            linear-gradient(
              180deg,
              rgba(255,255,255,.08),
              rgba(255,255,255,.02)
            );

          border:
            1px solid rgba(255,255,255,.06);

          overflow:hidden;

          transition:
            all .45s ease;
        }

        .sl-bar::before{
          content:"";

          position:absolute;
          inset:0;

          opacity:0;

          transition:opacity .35s ease;
        }

        .sl-bar.on{
          transform:
            translateY(-2px)
            scale(1.02);

          box-shadow:
            0 0 16px currentColor,
            0 0 32px currentColor;
        }

        .sl-bar.on::before{
          opacity:1;

          animation:
            sl-energy-flow 1.4s linear infinite;
        }

        .sl-bar-0.on{
          color:#ff3131;
          background:linear-gradient(180deg,#ff6767,#7f0000);
        }

        .sl-bar-1.on{
          color:#ff5c2b;
          background:linear-gradient(180deg,#ff8b5b,#8b2500);
        }

        .sl-bar-2.on{
          color:#ff8a00;
          background:linear-gradient(180deg,#ffb84d,#8a4300);
        }

        .sl-bar-3.on{
          color:#ffb100;
          background:linear-gradient(180deg,#ffd45a,#7a5200);
        }

        .sl-bar-4.on{
          color:#ffd000;
          background:linear-gradient(180deg,#ffe36a,#8b6a00);
        }

        .sl-bar-5.on{
          color:#ffe600;
          background:linear-gradient(180deg,#fff066,#948600);
        }

        .sl-bar-6.on{
          color:#fff000;
          background:linear-gradient(180deg,#fff98b,#8f8a00);
        }

        .sl-bar-7.on{
          color:#ffff55;
          background:linear-gradient(180deg,#ffffaa,#858500);
        }

        .sl-bar-8.on{
          color:#fff38a;
          background:linear-gradient(180deg,#fff4b0,#8f7f00);
        }

        .sl-bar-9.on{
          color:#f5f5f5;
          background:linear-gradient(180deg,#ffffff,#787878);
        }

        .sl-loader-bottom{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:16px;

          flex-wrap:wrap;
        }

        .sl-loading-text{
          color:#c8dcff;

          font-size:clamp(12px,1.8vw,16px);

          letter-spacing:.35em;

          text-transform:uppercase;
        }

        .sl-system-text{
          color:rgba(255,255,255,.42);

          font-size:clamp(11px,1.5vw,14px);

          letter-spacing:.18em;

          text-transform:uppercase;
        }

        .sl-status-row{
          display:flex;
          align-items:center;
          justify-content:center;
          gap:12px;

          flex-wrap:wrap;
        }

        .sl-dot{
          width:8px;
          height:8px;

          border-radius:50%;

          background:#00d4ff;

          box-shadow:
            0 0 12px #00d4ff;
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

        .sl-ph2{
          opacity:0;

          transform:
            scale(.8)
            translateY(20px);

          transition:
            opacity .8s ease,
            transform .8s ease;
        }

        .sl-ph2.sl-in{
          opacity:1;

          transform:
            scale(1)
            translateY(0);
        }

        .sl-ph2.sl-out{
          opacity:0;

          transform:
            scale(1.12);
        }

        .sl-arc-wrap{
          position:relative;

          width:min(70vw,320px);
          height:min(70vw,320px);

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

        .sl-arc-canvas{
          width:min(34vw,150px);
          height:min(34vw,150px);
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

          text-align:center;
        }

        .sl-ph3{
          opacity:0;

          transform:translateY(20px);

          transition:
            opacity .9s ease,
            transform .9s ease;
        }

        .sl-ph3.sl-in{
          opacity:1;

          transform:translateY(0);
        }

        .sl-welcome-line{
          margin-bottom:16px;

          color:#b388ff;

          letter-spacing:.4em;

          text-transform:uppercase;

          font-size:clamp(10px,1.4vw,12px);
        }

        .sl-name{
          font-size:clamp(32px,6vw,72px);
          font-weight:900;

          line-height:1.05;

          color:white;

          margin-bottom:14px;

          text-shadow:
            0 0 20px rgba(168,85,247,1),
            0 0 50px rgba(0,212,255,.7);
        }

        .sl-name-sub{
          margin-bottom:28px;

          color:rgba(255,255,255,.7);

          letter-spacing:.22em;

          text-transform:uppercase;

          font-size:clamp(11px,1.6vw,15px);
        }

        .sl-divline{
          width:min(60vw,240px);
          height:1px;

          margin-bottom:24px;

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

          color:#c084fc;

          letter-spacing:.4em;

          text-transform:uppercase;

          font-size:10px;
        }

        .sl-skills-grid{
          width:min(100%,900px);

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

        .sl-tagline{
          margin-top:28px;

          opacity:0;

          color:#00d4ff;

          letter-spacing:.35em;

          text-transform:uppercase;

          font-size:clamp(10px,1.4vw,13px);

          transition:opacity 1s ease;
        }

        .sl-tagline.sl-show{
          opacity:1;
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
            radial-gradient(
              circle at 20% 30%,
              rgba(168,85,247,.35),
              transparent 40%
            ),
            radial-gradient(
              circle at 80% 70%,
              rgba(0,212,255,.22),
              transparent 40%
            );
        }

        .sl-hyper-wrap{
          position:absolute;
          inset:0;

          opacity:0;

          pointer-events:none;

          z-index:20;
        }

        .sl-stars-canvas{
          position:absolute;
          inset:0;
        }

        .sl-dust-wrap{
          position:absolute;
          inset:0;

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
              rgba(168,85,247,.65),
              transparent
            );

          animation:
            sl-dust-move forwards;
        }

        @keyframes sl-dust-move{
          0%{
            opacity:0;

            transform:
              translate(0,0)
              scale(1)
              rotate(0deg);

            filter:blur(0px);
          }

          10%{
            opacity:1;
          }

          60%{
            opacity:.9;
          }

          100%{
            opacity:0;

            transform:
              translate(var(--tx),var(--ty))
              scale(0)
              rotate(180deg);

            filter:blur(8px);
          }
        }

        .sl-content-dust-out{
          animation:
            sl-content-dust-out
            1.8s cubic-bezier(.2,.8,.2,1)
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

          30%{
            opacity:1;

            transform:
              scale(1.04);

            filter:
              blur(1px)
              brightness(1.15);
          }

          70%{
            opacity:.85;

            transform:
              scale(1.16);

            filter:
              blur(8px)
              brightness(1.5);
          }

          100%{
            opacity:0;

            transform:
              scale(1.42);

            filter:
              blur(24px)
              brightness(2.4);
          }
        }

        @keyframes sl-energy-flow{
          0%{
            transform:translateX(-120%);
          }

          100%{
            transform:translateX(120%);
          }
        }

        @keyframes sl-panel-scan{
          0%{
            transform:translateX(-120%);
          }

          100%{
            transform:translateX(120%);
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

        @media(max-width:768px){
          .sl-skills-grid{
            grid-template-columns:
              repeat(2,1fr);
          }

          .sl-loader-bottom{
            justify-content:center;
          }
        }

        @media(max-width:520px){
          .sl-bars{
            gap:5px;
          }

          .sl-bar{
            height:44px;
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

        <div
          ref={particlesRef}
          style={{
            position: "absolute",
            inset: 0,
          }}
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

            {/* UPGRADED LOADER */}

            <div className="sl-loader-frame">
              <div className="sl-bars">
                {Array.from({ length: 12 }).map(
                  (_, i) => (
                    <div
                      key={i}
                      className={`sl-bar sl-bar-${i}`}
                      ref={(el) => {
                        divRefs.current[i] = el
                      }}
                    />
                  )
                )}
              </div>

              <div className="sl-loader-bottom">
                <div className="sl-loading-text">
                  Loading.....
                </div>

                <div className="sl-system-text">
                  MK-VII SYSTEM
                </div>
              </div>
            </div>

            <div className="sl-status-row">
              <div className="sl-dot" />

              <div
                ref={msgRef}
                className="sl-status-text"
              >
                Initializing power core...
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

              <canvas
                ref={canvasRef}
                className="sl-arc-canvas"
                width={150}
                height={150}
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
              ◈ Welcome to my portfolio ◈
            </div>

            <div
              ref={nameRef}
              className="sl-name sl-cursor"
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
              Building Digital Systems With
              Precision
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

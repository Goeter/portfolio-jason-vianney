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
const PH2_DUR = 1800

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

  const divRefs = useRef<(HTMLDivElement | null)[]>([])

  const rafRef = useRef<number>(0)
  const starsRafRef = useRef<number>(0)
  const hyperRafRef = useRef<number>(0)

  /* ───────────────── ARC REACTOR ───────────────── */

  function drawArc(progress: number, hueShift = 0) {
    const cv = canvasRef.current

    if (!cv) return

    const ctx = cv.getContext("2d")

    if (!ctx) return

    const w = cv.width
    const h = cv.height

    const cx = w / 2
    const cy = h / 2

    const r = w / 2 - 6

    ctx.clearRect(0, 0, w, h)

    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.strokeStyle = "rgba(255,255,255,0.08)"
    ctx.lineWidth = 6
    ctx.stroke()

    if (progress <= 0) return

    const start = -Math.PI / 2
    const end = start + Math.PI * 2 * progress

    const g = ctx.createLinearGradient(0, 0, w, h)

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

    ctx.beginPath()
    ctx.arc(cx, cy, r, start, end)

    ctx.strokeStyle = g
    ctx.lineWidth = 6
    ctx.lineCap = "round"

    ctx.shadowColor = `hsl(${(200 + hueShift) % 360},100%,65%)`
    ctx.shadowBlur = 24

    ctx.stroke()

    ctx.shadowBlur = 0

    const dx = cx + r * Math.cos(end)
    const dy = cy + r * Math.sin(end)

    ctx.beginPath()
    ctx.arc(dx, dy, 6, 0, Math.PI * 2)

    ctx.fillStyle = "#ffffff"

    ctx.shadowColor = `hsl(${(200 + hueShift) % 360},100%,75%)`

    ctx.shadowBlur = 22

    ctx.fill()

    ctx.shadowBlur = 0
  }

  /* ───────────────── HYPERSPACE ───────────────── */

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

    const TOTAL = 1500

    interface HLine {
      angle: number
      speed: number
      hue: number
      baseDist: number
    }

    const lines: HLine[] = Array.from(
      { length: 220 },
      () => ({
        angle: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 1.4,
        hue: Math.random() * 360,
        baseDist: 30 + Math.random() * 60,
      })
    )

    let t0: number | null = null

    function frame(ts: number) {
      if (!t0) t0 = ts

      const elapsed = ts - t0

      const prog = Math.min(elapsed / TOTAL, 1)

      const ease = 1 - Math.pow(1 - prog, 3)

      ctx.fillStyle =
        prog < 0.1
          ? `rgba(1,11,20,${0.9 - prog * 4})`
          : "rgba(1,11,20,0.18)"

      ctx.fillRect(0, 0, cv.width, cv.height)

      const stretch = 1 + ease * 22

      const maxDist =
        Math.max(cv.width, cv.height) * 0.85

      lines.forEach((l) => {
        const dist =
          l.baseDist + ease * maxDist * l.speed

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
                (20 + ease * 80))

        const y2 =
          cy +
          Math.sin(l.angle) *
            (dist +
              l.speed *
                stretch *
                (20 + ease * 80))

        const lineAlpha =
          prog > 0.78
            ? (1 - (prog - 0.78) / 0.22) *
              0.95
            : 0.6 + ease * 0.35

        const grad = ctx.createLinearGradient(
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
        ctx.lineWidth = 1.4

        ctx.stroke()
      })

      if (prog > 0.75) {
        const f = (prog - 0.75) / 0.25

        ctx.fillStyle = `rgba(255,255,255,${
          f * 0.9
        })`

        ctx.fillRect(0, 0, cv.width, cv.height)
      }

      if (prog < 1) {
        hyperRafRef.current =
          requestAnimationFrame(frame)
      } else {
        wrap.style.transition = "opacity 0.3s ease"
        wrap.style.opacity = "0"

        setTimeout(onDone, 320)
      }
    }

    hyperRafRef.current =
      requestAnimationFrame(frame)
  }

  /* ───────────────── SHOOTING STARS ───────────────── */

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
      const angle = Math.random() * Math.PI * 2

      const speed = 4 + Math.random() * 8

      return {
        x: Math.random() * cv.width,
        y: Math.random() * cv.height * 0.5,

        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed + 1.5,

        len: 60 + Math.random() * 120,

        alpha: 0,

        hue: Math.random() * 360,

        life: 0,

        maxLife: 60 + Math.random() * 80,
      }
    }

    for (let i = 0; i < 8; i++) {
      stars.push(spawnStar())
    }

    function loop() {
      ctx.clearRect(0, 0, cv.width, cv.height)

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
                  (s.life - s.maxLife * 0.5) /
                    (s.maxLife * 0.5)
              )

        const tail = {
          x:
            s.x -
            s.vx * (s.len / (s.len * 0.3)),

          y:
            s.y -
            s.vy * (s.len / (s.len * 0.3)),
        }

        const grad = ctx.createLinearGradient(
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

        ctx.arc(s.x, s.y, 2.5, 0, Math.PI * 2)

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

  /* ───────────────── TYPEWRITER ───────────────── */

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

  /* ───────────────── SKILLS ───────────────── */

  function buildSkills() {
    const grid = skillsRef.current

    if (!grid) return

    grid.innerHTML = ""

    SKILLS.forEach((s, idx) => {
      const card = document.createElement("div")

      card.className = "sl-skill-card"

      card.innerHTML = `
        <div class="sl-skill-icon"
          style="background:linear-gradient(
            135deg,
            ${s.grad}
          )"
        >
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

  function easeOut(t: number) {
    return 1 - Math.pow(1 - t, 3)
  }

  /* ───────────────── DUST TRANSITION ───────────────── */

  function createDustTransition() {
    const root = containerRef.current

    if (!root) return

    for (let i = 0; i < 180; i++) {
      const d = document.createElement("div")

      d.className = "sl-dust"

      const angle = Math.random() * Math.PI * 2

      const dist = 100 + Math.random() * 600

      const tx = Math.cos(angle) * dist
      const ty = Math.sin(angle) * dist

      d.style.left = `${
        45 + Math.random() * 10
      }%`

      d.style.top = `${
        40 + Math.random() * 20
      }%`

      d.style.setProperty("--tx", `${tx}px`)
      d.style.setProperty("--ty", `${ty}px`)

      d.style.background = `hsl(${
        Math.random() * 360
      },100%,75%)`

      d.style.animationDelay = `${
        Math.random() * 0.15
      }s`

      root.appendChild(d)

      setTimeout(() => d.remove(), 1700)
    }
  }

  /* ───────────────── MAIN EFFECT ───────────────── */

  useEffect(() => {
    const pe = particlesRef.current

    if (pe) {
      pe.innerHTML = ""

      for (let i = 0; i < 16; i++) {
        const p = document.createElement("div")

        p.className = "sl-particle"

        const sz = 1 + Math.random() * 2

        p.style.cssText = `
          left:${Math.random() * 100}%;
          top:${Math.random() * 100}%;

          width:${sz}px;
          height:${sz}px;

          --dur:${3 + Math.random() * 4}s;
          --del:${Math.random() * 3}s;

          opacity:${0.15 + Math.random() * 0.4};
        `

        pe.appendChild(p)
      }
    }

    drawArc(0, 0)

    let t0: number | null = null

    let hueShift = 0

    /* ───────── PHASE 1 ───────── */

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
        Math.floor(p * STATUS_MSGS.length),
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

      ph1Ref.current?.classList.add("sl-out")

      setTimeout(() => {
        ph2Ref.current?.classList.add("sl-in")

        let t1: number | null = null

        /* ───────── PHASE 2 ───────── */

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
              requestAnimationFrame(phase2)

            return
          }

          let spinning = true

          function spinArc(ts3: number) {
            if (!spinning) return

            hueShift = (ts3 / 8) % 360

            drawArc(1, hueShift)

            rafRef.current =
              requestAnimationFrame(spinArc)
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

                const nameEl = nameRef.current

                if (nameEl) {
                  typeWriter(
                    nameEl,
                    FULL_NAME,
                    52,
                    () => {
                      nameEl.classList.remove(
                        "sl-cursor"
                      )

                      buildSkills()

                      setTimeout(() => {
                        taglineRef.current?.classList.add(
                          "sl-show"
                        )

                        /* ───── FINAL DUST EXIT ───── */

                        setTimeout(() => {
                          ph3Ref.current?.classList.add(
                            "sl-dust-out"
                          )

                          createDustTransition()

                          setTimeout(() => {
                            cancelAnimationFrame(
                              starsRafRef.current
                            )

                            cancelAnimationFrame(
                              hyperRafRef.current
                            )

                            onLoadingComplete()
                          }, 1400)
                        }, 2400)
                      }, 600)
                    }
                  )
                }
              })
            }, 150)
          }, 700)
        }

        rafRef.current =
          requestAnimationFrame(phase2)
      }, 200)
    }

    rafRef.current =
      requestAnimationFrame(phase1)

    return () => {
      cancelAnimationFrame(rafRef.current)

      cancelAnimationFrame(starsRafRef.current)

      cancelAnimationFrame(hyperRafRef.current)
    }
  }, [onLoadingComplete])

  /* ───────────────── JSX ───────────────── */

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;600;700;900&display=swap');

        .sl-root{
          position:relative;

          width:100%;
          height:100vh;

          overflow:hidden;

          background:#010b14;

          display:flex;
          align-items:center;
          justify-content:center;

          font-family:'Rajdhani',sans-serif;
        }

        .sl-bg-grid{
          position:absolute;
          inset:0;

          background-image:
            linear-gradient(rgba(0,212,255,0.04) 1px,transparent 1px),
            linear-gradient(90deg,rgba(0,212,255,0.04) 1px,transparent 1px);

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
          position:relative;

          z-index:10;

          width:100%;
          height:100%;

          display:flex;
          align-items:center;
          justify-content:center;

          padding:0 20px;

          box-sizing:border-box;
        }

        .sl-ph1,
        .sl-ph2,
        .sl-ph3{
          position:absolute;
        }

        /* ───────────────── PHASE 1 ───────────────── */

        .sl-ph1{
          width:100%;
          max-width:540px;

          display:flex;
          flex-direction:column;
          align-items:center;

          gap:20px;

          transition:
            opacity .55s ease,
            transform .55s ease;
        }

        .sl-ph1.sl-out{
          opacity:0;
          transform:
            translateY(-18px)
            scale(.97);
        }

        .sl-status-label{
          font-family:'Orbitron',sans-serif;

          font-size:11px;
          font-weight:600;

          letter-spacing:.38em;

          color:#00d4ff;

          text-transform:uppercase;
        }

        .sl-charge-pct{
          font-family:'Orbitron',sans-serif;

          font-size:clamp(36px,10vw,56px);
          font-weight:900;

          color:white;
        }

        .sl-charge-wrap{
          width:100%;
          height:6px;

          overflow:hidden;

          border-radius:999px;

          background:rgba(255,255,255,.08);
        }

        .sl-charge-fill{
          width:0%;
          height:100%;

          border-radius:999px;

          background:
            linear-gradient(
              90deg,
              #ff00ff,
              #00d4ff,
              #00ffcc,
              #ff6b35
            );

          transition:width .04s linear;
        }

        .sl-status-row{
          width:100%;

          display:flex;
          align-items:center;

          gap:10px;
        }

        .sl-dot{
          width:6px;
          height:6px;

          border-radius:999px;

          background:#00d4ff;
        }

        .sl-status-text{
          flex:1;

          color:rgba(255,255,255,.7);

          font-size:12px;

          letter-spacing:.12em;

          text-transform:uppercase;
        }

        .sl-dividers{
          display:flex;
          gap:4px;
        }

        .sl-divider{
          width:24px;
          height:2px;

          border-radius:999px;

          background:rgba(255,255,255,.1);
        }

        .sl-divider.on{
          background:#a855f7;
        }

        /* ───────────────── PHASE 2 ───────────────── */

        .sl-ph2{
          display:flex;
          flex-direction:column;
          align-items:center;

          opacity:0;

          transform:
            scale(.82)
            translateY(12px);

          transition:
            opacity .7s cubic-bezier(.2,0,.2,1),
            transform .7s cubic-bezier(.2,0,.2,1);
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
            scale(1.1)
            translateY(-10px);
        }

        .sl-arc-wrap{
          position:relative;

          width:240px;
          height:240px;

          display:flex;
          align-items:center;
          justify-content:center;
        }

        .sl-ring{
          position:absolute;

          border-radius:999px;
        }

        .sl-ring-1{
          width:90%;
          height:90%;

          border:1px solid rgba(255,0,255,.4);

          animation:spin 11s linear infinite;
        }

        .sl-ring-2{
          width:68%;
          height:68%;

          border:1px solid rgba(0,212,255,.4);

          animation:spinReverse 7s linear infinite;
        }

        .sl-ring-3{
          width:48%;
          height:48%;

          border:1px dashed rgba(16,185,129,.5);

          animation:spin 5s linear infinite;
        }

        .sl-ring-4{
          width:108%;
          height:108%;

          border:1px solid rgba(251,146,60,.2);

          animation:spinReverse 18s linear infinite;
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

        .sl-arc-canvas{
          width:40%;
          height:40%;
        }

        .sl-reactor-label{
          position:absolute;

          text-align:center;
        }

        .sl-reactor-title{
          font-family:'Orbitron',sans-serif;

          color:white;

          font-size:10px;

          letter-spacing:.3em;

          text-transform:uppercase;
        }

        .sl-reactor-sub{
          font-size:9px;

          color:rgba(255,255,255,.5);

          letter-spacing:.22em;
        }

        .sl-reactor-status{
          margin-top:16px;

          color:#00d4ff;

          font-size:9px;

          letter-spacing:.34em;

          text-transform:uppercase;
        }

        /* ───────────────── PHASE 3 ───────────────── */

        .sl-ph3{
          width:100%;
          min-height:100vh;

          display:flex;
          flex-direction:column;

          align-items:center;
          justify-content:center;

          text-align:center;

          opacity:0;

          transform:translateY(22px);

          transition:
            opacity .9s cubic-bezier(.2,0,.2,1),
            transform .9s cubic-bezier(.2,0,.2,1);
        }

        .sl-ph3.sl-in{
          opacity:1;

          transform:translateY(0);
        }

        .sl-welcome-line{
          font-family:'Orbitron',sans-serif;

          font-size:12px;

          letter-spacing:.42em;

          text-transform:uppercase;

          margin-bottom:12px;

          color:#00d4ff;
        }

        .sl-name{
          font-family:'Orbitron',sans-serif;

          font-size:clamp(20px,5vw,32px);

          font-weight:700;

          color:white;

          text-shadow:
            0 0 20px rgba(168,85,247,1),
            0 0 50px rgba(0,212,255,.7);

          margin-bottom:8px;
        }

        .sl-cursor::after{
          content:'|';

          animation:blink .7s ease infinite;
        }

        @keyframes blink{
          50%{
            opacity:0;
          }
        }

        .sl-name-sub{
          color:rgba(255,255,255,.6);

          letter-spacing:.22em;

          text-transform:uppercase;

          margin-bottom:22px;
        }

        .sl-divline{
          width:180px;
          height:1px;

          margin-bottom:18px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(168,85,247,.7),
              rgba(0,212,255,.7),
              transparent
            );
        }

        .sl-expertise-label{
          margin-bottom:14px;

          color:rgba(255,255,255,.6);

          letter-spacing:.35em;

          text-transform:uppercase;
        }

        .sl-skills-grid{
          display:grid;

          grid-template-columns:
            repeat(2,minmax(140px,180px));

          justify-content:center;
          align-items:center;

          gap:14px;

          width:100%;
          max-width:420px;

          margin:0 auto;
        }

        .sl-skill-card{
          background:rgba(168,85,247,.07);

          border:
            1px solid rgba(168,85,247,.22);

          border-radius:16px;

          padding:18px 12px;

          min-height:110px;

          display:flex;
          flex-direction:column;

          align-items:center;
          justify-content:center;

          gap:10px;

          opacity:0;

          backdrop-filter:blur(10px);

          transition:
            background .3s,
            border-color .3s,
            transform .3s;
        }

        .sl-card-show{
          animation:cardIn .5s ease forwards;
        }

        @keyframes cardIn{
          from{
            opacity:0;
            transform:translateY(14px);
          }

          to{
            opacity:1;
            transform:translateY(0);
          }
        }

        .sl-skill-card:hover{
          transform:translateY(-4px);

          background:rgba(168,85,247,.16);

          border-color:
            rgba(168,85,247,.48);
        }

        .sl-skill-icon{
          width:38px;
          height:38px;

          border-radius:12px;

          display:flex;
          align-items:center;
          justify-content:center;

          font-size:18px;
        }

        .sl-skill-name{
          color:white;

          text-transform:uppercase;

          font-size:11px;

          letter-spacing:.06em;
        }

        .sl-tagline{
          margin-top:18px;

          opacity:0;

          transition:opacity 1s ease;

          color:#00d4ff;

          letter-spacing:.3em;

          text-transform:uppercase;
        }

        .sl-tagline.sl-show{
          opacity:1;
        }

        /* ───────────────── DUST TRANSITION ───────────────── */

        .sl-ph3.sl-dust-out{
          animation:
            sl-content-dust-out
            1.5s ease forwards;
        }

        @keyframes sl-content-dust-out{
          0%{
            opacity:1;
            transform:scale(1);
            filter:blur(0px);
          }

          50%{
            opacity:.85;
            filter:blur(2px);
          }

          100%{
            opacity:0;
            transform:scale(1.08);
            filter:blur(14px);
          }
        }

        .sl-dust{
          position:absolute;

          width:4px;
          height:4px;

          border-radius:999px;

          pointer-events:none;

          opacity:0;

          z-index:999;

          animation:
            sl-dust-move
            1.5s ease forwards;
        }

        @keyframes sl-dust-move{
          0%{
            opacity:0;

            transform:
              translate(0,0)
              scale(1);

            filter:blur(0px);
          }

          10%{
            opacity:1;
          }

          100%{
            opacity:0;

            transform:
              translate(var(--tx),var(--ty))
              scale(0);

            filter:blur(4px);
          }
        }

        /* ───────────────── PARTICLES ───────────────── */

        .sl-particle{
          position:absolute;

          border-radius:999px;

          background:#00d4ff;

          animation:
            particleFloat
            var(--dur,4s)
            ease-in-out
            var(--del,0s)
            infinite;
        }

        @keyframes particleFloat{
          0%,100%{
            transform:
              translateY(0)
              translateX(0);

            opacity:.25;
          }

          40%{
            transform:
              translateY(-16px)
              translateX(8px);

            opacity:.6;
          }

          70%{
            transform:
              translateY(-7px)
              translateX(-9px);

            opacity:.4;
          }
        }

        /* ───────────────── NEBULA ───────────────── */

        .sl-nebula{
          position:absolute;
          inset:0;

          opacity:0;

          transition:opacity 1.8s ease;
        }

        .sl-nebula.sl-nebula-in{
          opacity:1;
        }

        .sl-nebula-layer{
          position:absolute;
          inset:0;
        }

        .sl-nebula-l1{
          background:
            radial-gradient(
              ellipse 140% 80% at 20% 60%,
              rgba(88,28,135,.85) 0%,
              transparent 65%
            ),

            radial-gradient(
              ellipse 100% 90% at 80% 30%,
              rgba(30,58,138,.7) 0%,
              transparent 60%
            );
        }

        .sl-stars-canvas{
          position:absolute;
          inset:0;

          pointer-events:none;

          z-index:2;
        }

        .sl-hyper-wrap{
          position:absolute;
          inset:0;

          z-index:20;

          opacity:0;

          pointer-events:none;
        }

      `}</style>

      <div ref={containerRef} className="sl-root">
        <div className="sl-bg-grid" />

        <div className="sl-vignette" />

        {/* Nebula */}

        <div ref={nebulaRef} className="sl-nebula">
          <div className="sl-nebula-layer sl-nebula-l1" />
        </div>

        {/* Shooting Stars */}

        <canvas
          ref={starsRef}
          className="sl-stars-canvas"
        />

        {/* Hyperspace */}

        <div ref={hyperRef} className="sl-hyper-wrap">
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

        {/* Floating particles */}

        <div
          ref={particlesRef}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 3,
          }}
        />

        <div className="sl-content">
          {/* ───────────────── PHASE 1 ───────────────── */}

          <div ref={ph1Ref} className="sl-ph1">
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
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="sl-divider"
                    ref={(el) => {
                      divRefs.current[i] = el
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ───────────────── PHASE 2 ───────────────── */}

          <div ref={ph2Ref} className="sl-ph2">
            <div className="sl-arc-wrap">
              <div className="sl-ring sl-ring-4" />
              <div className="sl-ring sl-ring-1" />
              <div className="sl-ring sl-ring-2" />
              <div className="sl-ring sl-ring-3" />

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
              Reactor Online — 3000% efficiency
            </div>
          </div>

          {/* ───────────────── PHASE 3 ───────────────── */}

          <div ref={ph3Ref} className="sl-ph3">
            <div className="sl-welcome-line">
              ◈ Welcome to my portfolio ◈
            </div>

            <div
              ref={nameRef}
              className="sl-name sl-cursor"
            />

            <div className="sl-name-sub">
              Full Stack Developer & Designer
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
              Building Digital Systems With Precision
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

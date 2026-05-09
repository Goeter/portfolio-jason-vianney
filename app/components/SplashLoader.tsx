"use client"

import { useEffect, useRef } from "react"

type Props = {
  onLoadingComplete: () => void
}

const SKILLS = [
  { label: "Front-end Dev",  icon: "💻", grad: "rgba(0,212,255,0.22),rgba(59,130,246,0.22)"   },
  { label: "System Analyst", icon: "⚙️",  grad: "rgba(168,85,247,0.22),rgba(236,72,153,0.22)" },
  { label: "UI/UX Design",   icon: "🎨", grad: "rgba(251,146,60,0.22),rgba(236,72,153,0.22)"  },
  { label: "Data Analyst",   icon: "📊", grad: "rgba(52,211,153,0.22),rgba(16,185,129,0.22)"  },
]

const STATUS_MSGS = [
  "Initializing power core...",
  "Calibrating repulsor array...",
  "Charging plasma conduits...",
  "Arc reactor at capacity...",
  "System online.",
]

const FULL_NAME  = "Jason Vianney Sugiarto"
const PH1_DUR    = 2600
const PH2_DUR    = 1800

// Arc reactor color stops — rainbow-ish spectrum
const ARC_COLORS = [
  { stop: 0,    color: "#ff00ff" }, // magenta
  { stop: 0.2,  color: "#a855f7" }, // purple
  { stop: 0.4,  color: "#00d4ff" }, // cyan
  { stop: 0.6,  color: "#00ffcc" }, // teal-green
  { stop: 0.8,  color: "#ff6b35" }, // orange
  { stop: 1,    color: "#ff00ff" }, // back to magenta
]

export default function SplashLoader({ onLoadingComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const ph1Ref       = useRef<HTMLDivElement>(null)
  const ph2Ref       = useRef<HTMLDivElement>(null)
  const ph3Ref       = useRef<HTMLDivElement>(null)
  const barRef       = useRef<HTMLDivElement>(null)
  const pctRef       = useRef<HTMLDivElement>(null)
  const msgRef       = useRef<HTMLDivElement>(null)
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const nameRef      = useRef<HTMLDivElement>(null)
  const skillsRef    = useRef<HTMLDivElement>(null)
  const taglineRef   = useRef<HTMLParagraphElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const starsRef     = useRef<HTMLCanvasElement>(null)
  const nebulaRef    = useRef<HTMLDivElement>(null)
  const divRefs      = useRef<(HTMLDivElement | null)[]>([])
  const rafRef       = useRef<number>(0)
  const starsRafRef  = useRef<number>(0)

  /* ─── Canvas arc reactor (vibrant multicolor) ─── */
  function drawArc(progress: number, hueShift = 0) {
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext("2d")
    if (!ctx) return
    const w = cv.width, h = cv.height, cx = w / 2, cy = h / 2, r = w / 2 - 5
    ctx.clearRect(0, 0, w, h)

    // Track ring (dim)
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.strokeStyle = "rgba(255,255,255,0.08)"
    ctx.lineWidth = 5
    ctx.stroke()

    if (progress <= 0) return

    const start = -Math.PI / 2
    const end   = start + Math.PI * 2 * progress

    // Create rotating rainbow gradient
    const g = ctx.createLinearGradient(0, 0, w, h)
    g.addColorStop(0,    `hsl(${(280 + hueShift) % 360},100%,65%)`)
    g.addColorStop(0.25, `hsl(${(190 + hueShift) % 360},100%,60%)`)
    g.addColorStop(0.5,  `hsl(${(150 + hueShift) % 360},100%,55%)`)
    g.addColorStop(0.75, `hsl(${( 30 + hueShift) % 360},100%,60%)`)
    g.addColorStop(1,    `hsl(${(280 + hueShift) % 360},100%,65%)`)

    ctx.beginPath()
    ctx.arc(cx, cy, r, start, end)
    ctx.strokeStyle = g
    ctx.lineWidth   = 5
    ctx.lineCap     = "round"
    ctx.shadowColor = `hsl(${(200 + hueShift) % 360},100%,65%)`
    ctx.shadowBlur  = 22
    ctx.stroke()
    ctx.shadowBlur  = 0

    // Glowing tip dot
    const dx = cx + r * Math.cos(end), dy = cy + r * Math.sin(end)
    ctx.beginPath()
    ctx.arc(dx, dy, 5, 0, Math.PI * 2)
    ctx.fillStyle   = "#ffffff"
    ctx.shadowColor = `hsl(${(200 + hueShift) % 360},100%,75%)`
    ctx.shadowBlur  = 20
    ctx.fill()
    ctx.shadowBlur  = 0
  }

  /* ─── Shooting stars canvas ─── */
  function initStars() {
    const cv = starsRef.current
    if (!cv) return
    cv.width  = window.innerWidth
    cv.height = window.innerHeight
    const ctx = cv.getContext("2d")
    if (!ctx) return

    interface Star { x: number; y: number; vx: number; vy: number; len: number; alpha: number; hue: number; life: number; maxLife: number }
    const stars: Star[] = []

    function spawnStar(): Star {
      const angle = Math.random() * Math.PI * 2
      const speed = 4 + Math.random() * 8
      return {
        x: Math.random() * cv.width, y: Math.random() * cv.height * 0.5,
        vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed + 1.5,
        len: 60 + Math.random() * 120, alpha: 0, hue: Math.random() * 360,
        life: 0, maxLife: 60 + Math.random() * 80,
      }
    }

    for (let i = 0; i < 8; i++) stars.push(spawnStar())

    function loop() {
      ctx.clearRect(0, 0, cv.width, cv.height)

      // Randomly add new shooting stars
      if (Math.random() < 0.04) stars.push(spawnStar())

      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i]
        s.life++
        s.x += s.vx
        s.y += s.vy
        s.alpha = s.life < 15 ? s.life / 15 : Math.max(0, 1 - (s.life - s.maxLife * 0.5) / (s.maxLife * 0.5))

        const tail = { x: s.x - s.vx * (s.len / (s.len * 0.3)), y: s.y - s.vy * (s.len / (s.len * 0.3)) }
        const grad = ctx.createLinearGradient(tail.x, tail.y, s.x, s.y)
        grad.addColorStop(0, `hsla(${s.hue},100%,80%,0)`)
        grad.addColorStop(1, `hsla(${s.hue},100%,90%,${s.alpha})`)

        ctx.beginPath()
        ctx.moveTo(tail.x, tail.y)
        ctx.lineTo(s.x, s.y)
        ctx.strokeStyle = grad
        ctx.lineWidth = 2
        ctx.stroke()

        // Tip glow
        ctx.beginPath()
        ctx.arc(s.x, s.y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${s.hue},100%,95%,${s.alpha})`
        ctx.fill()

        if (s.life >= s.maxLife || s.x < -200 || s.x > cv.width + 200 || s.y > cv.height + 100) {
          stars.splice(i, 1)
        }
      }

      starsRafRef.current = requestAnimationFrame(loop)
    }

    loop()
  }

  /* ─── Typewriter ─── */
  function typeWriter(el: HTMLDivElement, text: string, speed: number, cb?: () => void) {
    el.textContent = ""
    let i = 0
    const timer = setInterval(() => {
      el.textContent += text[i++]
      if (i >= text.length) { clearInterval(timer); cb?.() }
    }, speed)
  }

  /* ─── Build skill cards ─── */
  function buildSkills() {
    const grid = skillsRef.current
    if (!grid) return
    grid.innerHTML = ""
    SKILLS.forEach((s, idx) => {
      const card = document.createElement("div")
      card.className = "sl-skill-card"
      card.innerHTML = `
        <div class="sl-skill-icon" style="background:linear-gradient(135deg,${s.grad})">${s.icon}</div>
        <div class="sl-skill-name">${s.label}</div>
      `
      grid.appendChild(card)
      setTimeout(() => card.classList.add("sl-card-show"), idx * 130)
    })
  }

  function easeOut(t: number) { return 1 - Math.pow(1 - t, 3) }

  /* ─── Main effect ─── */
  useEffect(() => {
    // Floating particles
    const pe = particlesRef.current
    if (pe) {
      pe.innerHTML = ""
      for (let i = 0; i < 16; i++) {
        const p   = document.createElement("div")
        p.className = "sl-particle"
        const sz  = 1 + Math.random() * 2
        p.style.cssText = `
          left:${Math.random() * 100}%;top:${Math.random() * 100}%;
          width:${sz}px;height:${sz}px;
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

    /* ── Phase 1 ─────────────────────────────── */
    function phase1(ts: number) {
      if (!t0) t0 = ts
      const raw = Math.min((ts - t0) / PH1_DUR, 1)
      const p   = easeOut(raw)
      const pct = Math.floor(p * 100)

      if (pctRef.current) pctRef.current.textContent = `${pct}%`
      if (barRef.current) barRef.current.style.width  = `${pct}%`

      const mi = Math.min(Math.floor(p * STATUS_MSGS.length), STATUS_MSGS.length - 1)
      if (msgRef.current) msgRef.current.textContent = STATUS_MSGS[mi]

      const di = Math.floor(p * 5)
      divRefs.current.forEach((d, i) =>
        d && (i < di ? d.classList.add("on") : d.classList.remove("on"))
      )

      if (raw < 1) { rafRef.current = requestAnimationFrame(phase1); return }

      setTimeout(() => {
        ph1Ref.current?.classList.add("sl-out")

        /* ── Phase 2: Arc Reactor ──────────────────────────── */
        setTimeout(() => {
          ph2Ref.current?.classList.add("sl-in")
          let t1: number | null = null

          function phase2(ts2: number) {
            if (!t1) t1 = ts2
            const r2 = Math.min((ts2 - t1) / PH2_DUR, 1)
            hueShift = (ts2 / 8) % 360  // continuous hue rotation
            drawArc(easeOut(r2), hueShift)
            if (r2 < 1) { rafRef.current = requestAnimationFrame(phase2); return }

            // Keep spinning the colors after complete
            let spinning = true
            function spinArc(ts3: number) {
              if (!spinning) return
              hueShift = (ts3 / 8) % 360
              drawArc(1, hueShift)
              rafRef.current = requestAnimationFrame(spinArc)
            }
            rafRef.current = requestAnimationFrame(spinArc)

            setTimeout(() => {
              spinning = false
              ph2Ref.current?.classList.add("sl-out")

              /* ── Phase 3: Cosmic + Welcome ─────────── */
              setTimeout(() => {
                // Activate nebula background
                nebulaRef.current?.classList.add("sl-nebula-in")
                initStars()

                ph3Ref.current?.classList.add("sl-in")
                const nameEl = nameRef.current
                if (nameEl) {
                  typeWriter(nameEl, FULL_NAME, 52, () => {
                    nameEl.classList.remove("sl-cursor")
                    buildSkills()
                    setTimeout(() => {
                      taglineRef.current?.classList.add("sl-show")
                      setTimeout(() => {
                        // Hyperspace exit: stretch upward
                        containerRef.current?.classList.add("sl-hyperspace")
                        setTimeout(() => {
                          cancelAnimationFrame(starsRafRef.current)
                          onLoadingComplete()
                        }, 900)
                      }, 2400)
                    }, 600)
                  })
                }
              }, 340)
            }, 700)
          }

          rafRef.current = requestAnimationFrame(phase2)
        }, 380)
      }, 300)
    }

    rafRef.current = requestAnimationFrame(phase1)
    return () => {
      cancelAnimationFrame(rafRef.current)
      cancelAnimationFrame(starsRafRef.current)
    }
  }, [onLoadingComplete])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;600;700;900&display=swap');

        /* ── Root ── */
        .sl-root {
          position: relative;
          background: #010b14;
          width: 100%; height: 100vh;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          font-family: 'Rajdhani', sans-serif;
          transition: opacity 0.9s ease, transform 0.9s ease, filter 0.9s ease;
        }
        .sl-root.sl-hyperspace {
          opacity: 0;
          transform: scaleY(0.02) scaleX(1.8);
          filter: blur(14px) brightness(2);
          pointer-events: none;
          transition: opacity 0.85s ease, transform 0.85s cubic-bezier(0.7,0,1,0.5), filter 0.85s ease;
        }

        /* ── Background grid ── */
        .sl-bg-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px);
          background-size: 55px 55px;
        }
        .sl-vignette {
          position: absolute; inset: 0; pointer-events: none; z-index: 1;
          background: radial-gradient(ellipse at center, transparent 30%, #010b14 85%);
        }
        .sl-scanline { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 2; }
        .sl-scanline::after {
          content: ''; position: absolute; left: 0; right: 0; height: 2px;
          background: linear-gradient(transparent, rgba(0,212,255,0.06), transparent);
          animation: sl-scan 5s linear infinite;
        }
        @keyframes sl-scan { 0%{transform:translateY(-20px)} 100%{transform:translateY(100vh)} }

        /* ── Particles ── */
        @keyframes sl-particle-float {
          0%,100% { transform:translateY(0) translateX(0); opacity:0.25 }
          40%     { transform:translateY(-16px) translateX(8px); opacity:0.6 }
          70%     { transform:translateY(-7px) translateX(-9px); opacity:0.4 }
        }
        .sl-particle {
          position: absolute; border-radius: 50%; background: #00d4ff; pointer-events: none;
          animation: sl-particle-float var(--dur,4s) ease-in-out var(--del,0s) infinite;
        }

        /* ── Shooting stars canvas ── */
        .sl-stars-canvas {
          position: absolute; inset: 0; pointer-events: none; z-index: 2;
          opacity: 0; transition: opacity 1.2s ease;
        }
        .sl-stars-canvas.sl-stars-show { opacity: 1; }

        /* ── Nebula background ── */
        .sl-nebula {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          opacity: 0; transition: opacity 1.6s ease;
        }
        .sl-nebula.sl-nebula-in { opacity: 1; }
        .sl-nebula-layer {
          position: absolute; inset: 0; border-radius: 0;
        }
        /* Layer 1 — deep purple/blue base */
        .sl-nebula-l1 {
          background: radial-gradient(ellipse 140% 80% at 20% 60%, rgba(88,28,135,0.85) 0%, transparent 65%),
                      radial-gradient(ellipse 100% 90% at 80% 30%, rgba(30,58,138,0.7) 0%, transparent 60%),
                      radial-gradient(ellipse 80% 80% at 50% 50%, rgba(15,23,42,0.9) 0%, transparent 100%);
        }
        /* Layer 2 — pink/magenta clouds */
        .sl-nebula-l2 {
          background: radial-gradient(ellipse 90% 60% at 70% 70%, rgba(219,39,119,0.5) 0%, transparent 55%),
                      radial-gradient(ellipse 60% 50% at 15% 25%, rgba(168,85,247,0.55) 0%, transparent 50%),
                      radial-gradient(ellipse 50% 40% at 85% 15%, rgba(236,72,153,0.4) 0%, transparent 45%);
          animation: sl-nebula-drift1 14s ease-in-out infinite alternate;
        }
        /* Layer 3 — cyan/teal wisps */
        .sl-nebula-l3 {
          background: radial-gradient(ellipse 70% 45% at 30% 80%, rgba(6,182,212,0.45) 0%, transparent 55%),
                      radial-gradient(ellipse 55% 35% at 65% 10%, rgba(16,185,129,0.4) 0%, transparent 50%),
                      radial-gradient(ellipse 40% 55% at 90% 55%, rgba(0,212,255,0.3) 0%, transparent 45%);
          animation: sl-nebula-drift2 18s ease-in-out infinite alternate;
        }
        /* Layer 4 — orange/amber hot cores */
        .sl-nebula-l4 {
          background: radial-gradient(ellipse 35% 30% at 55% 40%, rgba(251,146,60,0.35) 0%, transparent 50%),
                      radial-gradient(ellipse 25% 20% at 10% 70%, rgba(234,88,12,0.3) 0%, transparent 45%);
          animation: sl-nebula-drift3 22s ease-in-out infinite alternate;
        }
        /* Parallax drift animations */
        @keyframes sl-nebula-drift1 {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(18px,-12px) scale(1.05); }
        }
        @keyframes sl-nebula-drift2 {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(-22px,15px) scale(1.04); }
        }
        @keyframes sl-nebula-drift3 {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(14px,20px) scale(1.06); }
        }
        /* Star field dots */
        .sl-nebula-stars {
          position: absolute; inset: 0;
          background-image:
            radial-gradient(1px 1px at 12% 18%, rgba(255,255,255,0.9) 0%, transparent 100%),
            radial-gradient(1px 1px at 28% 72%, rgba(200,180,255,0.85) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 45% 35%, rgba(255,255,255,0.95) 0%, transparent 100%),
            radial-gradient(1px 1px at 62% 88%, rgba(180,255,240,0.8) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 78% 22%, rgba(255,200,230,0.9) 0%, transparent 100%),
            radial-gradient(1px 1px at 91% 55%, rgba(255,255,255,0.85) 0%, transparent 100%),
            radial-gradient(1px 1px at 5% 91%, rgba(200,230,255,0.8) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 35% 8%, rgba(255,255,255,0.9) 0%, transparent 100%),
            radial-gradient(1px 1px at 55% 60%, rgba(255,180,255,0.75) 0%, transparent 100%),
            radial-gradient(1px 1px at 82% 78%, rgba(255,255,255,0.85) 0%, transparent 100%),
            radial-gradient(1px 1px at 18% 44%, rgba(180,255,200,0.8) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 72% 42%, rgba(255,220,180,0.85) 0%, transparent 100%),
            radial-gradient(1px 1px at 92% 10%, rgba(255,255,255,0.7) 0%, transparent 100%),
            radial-gradient(1px 1px at 48% 95%, rgba(200,200,255,0.8) 0%, transparent 100%),
            radial-gradient(1px 1px at 3% 33%, rgba(255,255,255,0.9) 0%, transparent 100%);
          animation: sl-stars-twinkle 5s ease-in-out infinite alternate;
        }
        @keyframes sl-stars-twinkle {
          0%   { opacity: 0.7; }
          50%  { opacity: 1; }
          100% { opacity: 0.75; }
        }
        /* Darker vignette for nebula phase */
        .sl-nebula-vignette {
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse at center, transparent 15%, rgba(1,11,20,0.65) 80%);
        }

        /* ── Content wrapper ── */
        .sl-content {
          position: relative; z-index: 10;
          display: flex; flex-direction: column; align-items: center;
          width: 100%; max-width: 520px; padding: 0 24px;
        }

        /* ────────────── PHASE 1 ────────────── */
        .sl-ph1 {
          display: flex; flex-direction: column; align-items: center; gap: 20px;
          transition: opacity 0.6s ease, transform 0.6s ease; width: 100%;
        }
        .sl-ph1.sl-out { opacity:0; transform:translateY(-16px); pointer-events:none; position:absolute; }

        @keyframes sl-blink { 0%,100%{opacity:0.55} 50%{opacity:1} }
        .sl-blink { animation: sl-blink 1.8s ease-in-out infinite; }

        .sl-status-label {
          font-family: 'Orbitron', sans-serif;
          font-size: 11px; font-weight: 600; letter-spacing: 0.38em;
          color: #00d4ff; text-transform: uppercase;
          text-shadow: 0 0 18px rgba(0,212,255,0.85), 0 0 40px rgba(0,212,255,0.4);
        }
        .sl-charge-pct {
          font-family: 'Orbitron', sans-serif;
          font-size: 48px; font-weight: 900; color: #ffffff; letter-spacing: 0.08em;
          text-shadow: 0 0 24px rgba(0,212,255,1), 0 0 56px rgba(0,212,255,0.6), 0 0 90px rgba(0,212,255,0.3);
        }
        .sl-charge-wrap {
          width: 100%; height: 6px; border-radius: 4px; overflow: hidden;
          background: rgba(0,212,255,0.06); border: 1px solid rgba(0,212,255,0.18);
        }
        .sl-charge-fill {
          height: 100%; width: 0%; border-radius: 4px; position: relative;
          background: linear-gradient(90deg, #ff00ff, #a855f7, #00d4ff, #00ffcc, #ff6b35);
          transition: width 0.04s linear;
        }
        .sl-charge-fill::after {
          content: ''; position: absolute; right: 0; top: 50%; transform: translateY(-50%);
          width: 10px; height: 10px; border-radius: 50%; background: #fff;
          box-shadow: 0 0 10px #ff00ff, 0 0 22px rgba(168,85,247,0.9);
        }
        .sl-status-row { display:flex; align-items:center; gap:10px; width:100%; }
        .sl-dot {
          width: 6px; height: 6px; flex-shrink: 0; border-radius: 50%;
          background: #00d4ff; box-shadow: 0 0 8px #00d4ff;
          animation: sl-blink 0.9s ease-in-out infinite;
        }
        .sl-status-text {
          font-size: 12px; font-weight: 500; letter-spacing: 0.14em;
          color: rgba(0,212,255,0.78); text-transform: uppercase; flex: 1;
        }
        .sl-dividers { display:flex; gap:4px; }
        .sl-divider {
          width: 24px; height: 2px; border-radius: 1px;
          background: rgba(0,212,255,0.15);
          transition: background 0.4s ease, box-shadow 0.4s ease;
        }
        .sl-divider.on { background:#a855f7; box-shadow:0 0 6px rgba(168,85,247,0.8); }

        /* ────────────── PHASE 2 ────────────── */
        .sl-ph2 {
          opacity:0; transform:scale(0.88); position:absolute;
          display:flex; flex-direction:column; align-items:center;
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .sl-ph2.sl-in  { opacity:1; transform:scale(1); position:relative; }
        .sl-ph2.sl-out { opacity:0; transform:scale(1.06); position:absolute; pointer-events:none;
          transition: opacity 0.5s ease, transform 0.5s ease; }

        .sl-arc-wrap {
          position:relative; width:200px; height:200px;
          display:flex; align-items:center; justify-content:center;
        }
        /* Pulsing rainbow glow behind the reactor */
        .sl-arc-glow {
          position:absolute; width:180px; height:180px; border-radius:50%;
          background: conic-gradient(from 0deg,
            rgba(255,0,255,0.25), rgba(168,85,247,0.25), rgba(0,212,255,0.25),
            rgba(0,255,200,0.25), rgba(255,107,53,0.25), rgba(255,0,255,0.25));
          filter:blur(22px);
          animation: sl-glow-spin 4s linear infinite, sl-blink 2.5s ease-in-out infinite;
        }
        @keyframes sl-glow-spin { to { transform: rotate(360deg); } }

        @keyframes sl-cw  { to { transform:rotate(360deg) } }
        @keyframes sl-ccw { to { transform:rotate(-360deg) } }
        .sl-ring { position:absolute; border-radius:50%; }
        /* Ring 1 — magenta */
        .sl-ring-1 {
          width:190px; height:190px;
          border: 1.5px solid rgba(255,0,255,0.3);
          animation:sl-cw 11s linear infinite;
          box-shadow: 0 0 8px rgba(255,0,255,0.15) inset;
        }
        .sl-ring-1::before {
          content:''; position:absolute; top:-5px; left:50%; transform:translateX(-50%);
          width:9px; height:9px; border-radius:50%; background:#ff00ff;
          box-shadow:0 0 12px #ff00ff, 0 0 28px rgba(255,0,255,0.8);
        }
        /* Ring 2 — cyan */
        .sl-ring-2 {
          width:148px; height:148px;
          border: 1px solid rgba(0,212,255,0.35);
          animation:sl-ccw 7s linear infinite;
        }
        .sl-ring-2::before {
          content:''; position:absolute; bottom:-4px; left:50%; transform:translateX(-50%);
          width:7px; height:7px; border-radius:50%; background:#00d4ff;
          box-shadow:0 0 10px #00d4ff, 0 0 22px rgba(0,212,255,0.8);
        }
        /* Ring 3 — green */
        .sl-ring-3 {
          width:104px; height:104px;
          border: 1px dashed rgba(16,185,129,0.3);
          animation:sl-cw 5s linear infinite;
        }
        .sl-ring-3::after {
          content:''; position:absolute; right:-4px; top:50%; transform:translateY(-50%);
          width:7px; height:7px; border-radius:50%; background:#10b981;
          box-shadow:0 0 10px #10b981, 0 0 22px rgba(16,185,129,0.7);
        }
        /* Ring 4 — orange (new outer) */
        .sl-ring-4 {
          width:230px; height:230px;
          border: 1px solid rgba(251,146,60,0.18);
          animation:sl-ccw 18s linear infinite;
        }
        .sl-ring-4::after {
          content:''; position:absolute; left:-4px; top:50%; transform:translateY(-50%);
          width:6px; height:6px; border-radius:50%; background:#fb923c;
          box-shadow:0 0 10px #fb923c, 0 0 20px rgba(251,146,60,0.7);
        }
        .sl-arc-canvas { position:absolute; border-radius:50%; }

        .sl-reactor-label { position:relative; z-index:5; text-align:center; }
        .sl-reactor-title {
          font-family:'Orbitron',sans-serif; font-size:10px; font-weight:600;
          letter-spacing:0.3em; color:rgba(255,100,255,0.85); text-transform:uppercase; margin-bottom:2px;
          text-shadow: 0 0 14px rgba(255,0,255,0.6);
        }
        .sl-reactor-sub {
          font-family:'Orbitron',sans-serif; font-size:9px;
          color:rgba(255,255,255,0.45); letter-spacing:0.22em;
        }
        .sl-reactor-status {
          margin-top:14px; font-family:'Orbitron',sans-serif; font-size:9px;
          letter-spacing:0.34em; text-transform:uppercase;
          animation:sl-rainbow-text 3s linear infinite, sl-blink 2s ease-in-out infinite;
        }
        @keyframes sl-rainbow-text {
          0%   { color: #ff00ff; text-shadow: 0 0 10px rgba(255,0,255,0.7); }
          25%  { color: #00d4ff; text-shadow: 0 0 10px rgba(0,212,255,0.7); }
          50%  { color: #00ffcc; text-shadow: 0 0 10px rgba(0,255,200,0.7); }
          75%  { color: #fb923c; text-shadow: 0 0 10px rgba(251,146,60,0.7); }
          100% { color: #ff00ff; text-shadow: 0 0 10px rgba(255,0,255,0.7); }
        }

        /* ────────────── PHASE 3 ────────────── */
        .sl-ph3 {
          opacity:0; transform:translateY(20px); position:absolute; width:100%;
          display:flex; flex-direction:column; align-items:center;
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .sl-ph3.sl-in { opacity:1; transform:translateY(0); position:relative; }

        .sl-welcome-line {
          font-family:'Orbitron',sans-serif; font-size:10px; font-weight:400;
          letter-spacing:0.52em; text-transform:uppercase;
          margin-bottom:12px;
          animation: sl-rainbow-text 4s linear infinite, sl-blink 3s ease-in-out infinite;
        }
        .sl-name {
          font-family:'Orbitron',sans-serif;
          font-size:clamp(16px,4vw,26px); font-weight:700;
          color:#ffffff; letter-spacing:0.07em; text-align:center;
          text-shadow:
            0 0 20px rgba(168,85,247,1),
            0 0 50px rgba(0,212,255,0.7),
            0 0 90px rgba(255,0,255,0.4);
          margin-bottom:8px; min-height:1.5em;
        }
        .sl-cursor::after { content:'|'; color:#ff00ff; animation:sl-blink 0.7s ease-in-out infinite; }
        .sl-name-sub {
          font-family:'Rajdhani',sans-serif; font-size:13px; font-weight:500;
          letter-spacing:0.28em; color:rgba(255,255,255,0.58); text-transform:uppercase;
          margin-bottom:26px;
          text-shadow: 0 0 20px rgba(0,212,255,0.4);
        }
        .sl-divline {
          width:160px; height:1px; margin-bottom:22px;
          background:linear-gradient(90deg, transparent, rgba(168,85,247,0.7), rgba(0,212,255,0.7), transparent);
        }
        .sl-expertise-label {
          font-family:'Orbitron',sans-serif; font-size:9px; font-weight:600;
          letter-spacing:0.46em; color:rgba(200,150,255,0.65); text-transform:uppercase;
          margin-bottom:16px;
        }
        .sl-skills-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; width:100%; }

        @keyframes sl-card-in { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .sl-skill-card {
          background:rgba(168,85,247,0.06); border:1px solid rgba(168,85,247,0.2);
          border-radius:12px; padding:14px 8px;
          display:flex; flex-direction:column; align-items:center; gap:9px;
          opacity:0; transition:background 0.3s,border-color 0.3s;
          backdrop-filter: blur(8px);
        }
        .sl-skill-card.sl-card-show { animation:sl-card-in 0.5s ease forwards; }
        .sl-skill-card:hover { background:rgba(168,85,247,0.14); border-color:rgba(168,85,247,0.45); }
        .sl-skill-icon { width:38px; height:38px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:18px; }
        .sl-skill-name {
          font-family:'Rajdhani',sans-serif; font-size:11px; font-weight:600;
          color:rgba(255,255,255,0.92); text-align:center; letter-spacing:0.06em;
          text-transform:uppercase; line-height:1.3;
        }
        .sl-tagline {
          margin-top:20px; font-family:'Rajdhani',sans-serif; font-size:11px;
          font-weight:500; letter-spacing:0.4em; text-transform:uppercase; text-align:center;
          opacity:0; transition:opacity 1s ease;
          animation: sl-rainbow-text 5s linear infinite;
        }
        .sl-tagline.sl-show { opacity:1; }
      `}</style>

      <div ref={containerRef} className="sl-root">
        <div className="sl-bg-grid" />
        <div className="sl-vignette" />
        <div className="sl-scanline" />

        {/* Nebula background — activates in phase 3 */}
        <div ref={nebulaRef} className="sl-nebula">
          <div className="sl-nebula-layer sl-nebula-l1" />
          <div className="sl-nebula-layer sl-nebula-l2" />
          <div className="sl-nebula-layer sl-nebula-l3" />
          <div className="sl-nebula-layer sl-nebula-l4" />
          <div className="sl-nebula-stars" />
          <div className="sl-nebula-vignette" />
        </div>

        {/* Shooting stars canvas */}
        <canvas
          ref={starsRef}
          className="sl-stars-canvas sl-stars-show"
          style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2 }}
        />

        <div
          ref={particlesRef}
          style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 3 }}
        />

        <div className="sl-content">

          {/* ── Phase 1: Charging bar ── */}
          <div ref={ph1Ref} className="sl-ph1">
            <div className="sl-status-label sl-blink">◈ Charging Status</div>
            <div ref={pctRef} className="sl-charge-pct">0%</div>
            <div className="sl-charge-wrap">
              <div ref={barRef} className="sl-charge-fill" />
            </div>
            <div className="sl-status-row">
              <div className="sl-dot" />
              <div ref={msgRef} className="sl-status-text">
                Initializing power core...
              </div>
              <div className="sl-dividers">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="sl-divider"
                    ref={(el) => { divRefs.current[i] = el }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── Phase 2: Arc Reactor ── */}
          <div ref={ph2Ref} className="sl-ph2">
            <div className="sl-arc-wrap">
              <div className="sl-arc-glow" />
              <div className="sl-ring sl-ring-4" />
              <div className="sl-ring sl-ring-1" />
              <div className="sl-ring sl-ring-2" />
              <div className="sl-ring sl-ring-3" />
              <canvas
                ref={canvasRef}
                className="sl-arc-canvas"
                width={86}
                height={86}
                style={{ width: 86, height: 86 }}
              />
              <div className="sl-reactor-label">
                <div className="sl-reactor-title">Arc Reactor</div>
                <div className="sl-reactor-sub">Mark VII</div>
              </div>
            </div>
            <div className="sl-reactor-status">
              Reactor Online — 3000% efficiency
            </div>
          </div>

          {/* ── Phase 3: Welcome + Name + Skills ── */}
          <div ref={ph3Ref} className="sl-ph3">
            <div className="sl-welcome-line">◈ Welcome to my portfolio ◈</div>
            <div ref={nameRef} className="sl-name sl-cursor" />
            <div className="sl-name-sub">Full Stack Developer &amp; Designer</div>
            <div className="sl-divline" />
            <div className="sl-expertise-label">My Expertise</div>
            <div ref={skillsRef} className="sl-skills-grid" />
            <p ref={taglineRef} className="sl-tagline">
              Building Digital Systems With Precision
            </p>
          </div>

        </div>
      </div>
    </>
  )
}

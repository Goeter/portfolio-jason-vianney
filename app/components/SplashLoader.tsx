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
const PH1_DUR    = 2600   // ms — charging bar
const PH2_DUR    = 1800   // ms — arc reactor spin-up

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
  const divRefs      = useRef<(HTMLDivElement | null)[]>([])
  const rafRef       = useRef<number>(0)

  /* ─── Canvas arc reactor ─── */
  function drawArc(progress: number) {
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext("2d")
    if (!ctx) return
    const w = cv.width, h = cv.height, cx = w / 2, cy = h / 2, r = w / 2 - 5
    ctx.clearRect(0, 0, w, h)

    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.strokeStyle = "rgba(0,212,255,0.1)"
    ctx.lineWidth = 4
    ctx.stroke()

    if (progress <= 0) return

    const start = -Math.PI / 2
    const end   = start + Math.PI * 2 * progress
    const g = ctx.createLinearGradient(0, 0, w, 0)
    g.addColorStop(0,   "#0066ff")
    g.addColorStop(0.5, "#00d4ff")
    g.addColorStop(1,   "#00ffcc")

    ctx.beginPath()
    ctx.arc(cx, cy, r, start, end)
    ctx.strokeStyle = g
    ctx.lineWidth   = 4
    ctx.lineCap     = "round"
    ctx.shadowColor = "#00d4ff"
    ctx.shadowBlur  = 14
    ctx.stroke()
    ctx.shadowBlur  = 0

    const dx = cx + r * Math.cos(end), dy = cy + r * Math.sin(end)
    ctx.beginPath()
    ctx.arc(dx, dy, 4, 0, Math.PI * 2)
    ctx.fillStyle   = "#ffffff"
    ctx.shadowColor = "#00d4ff"
    ctx.shadowBlur  = 16
    ctx.fill()
    ctx.shadowBlur  = 0
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
    // Spawn floating particles (pure CSS animates them)
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

    drawArc(0)

    let t0: number | null = null

    /* ── Phase 1: Charging bar ─────────────────────────────── */
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

      /* fade out ph1 */
      setTimeout(() => {
        ph1Ref.current?.classList.add("sl-out")

        /* ── Phase 2: Arc Reactor ──────────────────────────── */
        setTimeout(() => {
          ph2Ref.current?.classList.add("sl-in")
          let t1: number | null = null

          function phase2(ts2: number) {
            if (!t1) t1 = ts2
            const r2 = Math.min((ts2 - t1) / PH2_DUR, 1)
            drawArc(easeOut(r2))
            if (r2 < 1) { rafRef.current = requestAnimationFrame(phase2); return }

            /* fade out ph2 */
            setTimeout(() => {
              ph2Ref.current?.classList.add("sl-out")

              /* ── Phase 3: Welcome + Name + Skills ─────────── */
              setTimeout(() => {
                ph3Ref.current?.classList.add("sl-in")
                const nameEl = nameRef.current
                if (nameEl) {
                  typeWriter(nameEl, FULL_NAME, 52, () => {
                    nameEl.classList.remove("sl-cursor")   // stop cursor blink
                    buildSkills()
                    setTimeout(() => {
                      taglineRef.current?.classList.add("sl-show")
                      /* trigger exit after content is visible */
                      setTimeout(() => {
                        containerRef.current?.classList.add("sl-exit")
                        setTimeout(onLoadingComplete, 800)
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
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [onLoadingComplete])

  /* ─────────────────────────────────────────────────────────────────── */

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
          transition: opacity 0.8s ease, transform 0.8s ease, filter 0.8s ease;
        }
        .sl-root.sl-exit {
          opacity: 0; transform: scale(1.03);
          filter: blur(10px); pointer-events: none;
        }

        /* ── Background layers ── */
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
          background: linear-gradient(90deg, #0066ff, #00d4ff, #00ffcc);
          transition: width 0.04s linear;
        }
        .sl-charge-fill::after {
          content: ''; position: absolute; right: 0; top: 50%; transform: translateY(-50%);
          width: 10px; height: 10px; border-radius: 50%; background: #fff;
          box-shadow: 0 0 10px #00d4ff, 0 0 22px rgba(0,212,255,0.8);
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
        .sl-divider.on { background:#00d4ff; box-shadow:0 0 6px rgba(0,212,255,0.7); }

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
        .sl-arc-glow {
          position:absolute; width:180px; height:180px; border-radius:50%;
          background:radial-gradient(circle, rgba(0,212,255,0.18) 0%, transparent 70%);
          filter:blur(16px); animation:sl-blink 3s ease-in-out infinite;
        }
        @keyframes sl-cw  { to { transform:rotate(360deg) } }
        @keyframes sl-ccw { to { transform:rotate(-360deg) } }
        .sl-ring { position:absolute; border-radius:50%; }
        .sl-ring-1 { width:190px; height:190px; border:1.5px solid rgba(0,212,255,0.25); animation:sl-cw 14s linear infinite; }
        .sl-ring-1::before {
          content:''; position:absolute; top:-4px; left:50%; transform:translateX(-50%);
          width:8px; height:8px; border-radius:50%; background:#00d4ff;
          box-shadow:0 0 10px #00d4ff, 0 0 24px rgba(0,212,255,0.7);
        }
        .sl-ring-2 { width:148px; height:148px; border:1px solid rgba(99,102,241,0.35); animation:sl-ccw 9s linear infinite; }
        .sl-ring-2::before {
          content:''; position:absolute; bottom:-3px; left:50%; transform:translateX(-50%);
          width:6px; height:6px; border-radius:50%; background:#818cf8; box-shadow:0 0 8px #818cf8;
        }
        .sl-ring-3 { width:104px; height:104px; border:1px dashed rgba(0,212,255,0.2); animation:sl-cw 6s linear infinite; }
        .sl-arc-canvas { position:absolute; border-radius:50%; }

        .sl-reactor-label { position:relative; z-index:5; text-align:center; }
        .sl-reactor-title {
          font-family:'Orbitron',sans-serif; font-size:10px; font-weight:600;
          letter-spacing:0.3em; color:rgba(0,212,255,0.75); text-transform:uppercase; margin-bottom:2px;
        }
        .sl-reactor-sub {
          font-family:'Orbitron',sans-serif; font-size:9px;
          color:rgba(255,255,255,0.4); letter-spacing:0.22em;
        }
        .sl-reactor-status {
          margin-top:14px; font-family:'Orbitron',sans-serif; font-size:9px;
          color:rgba(0,212,255,0.58); letter-spacing:0.34em; text-transform:uppercase;
          animation:sl-blink 2s ease-in-out infinite;
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
          letter-spacing:0.52em; color:rgba(0,212,255,0.82); text-transform:uppercase;
          margin-bottom:12px; text-shadow:0 0 18px rgba(0,212,255,0.5);
          animation:sl-blink 3s ease-in-out infinite;
        }
        .sl-name {
          font-family:'Orbitron',sans-serif;
          font-size:clamp(16px,4vw,26px); font-weight:700;
          color:#ffffff; letter-spacing:0.07em; text-align:center;
          text-shadow:0 0 28px rgba(0,212,255,0.8), 0 0 65px rgba(0,212,255,0.4);
          margin-bottom:8px; min-height:1.5em;
        }
        .sl-cursor::after { content:'|'; color:#00d4ff; animation:sl-blink 0.7s ease-in-out infinite; }
        .sl-name-sub {
          font-family:'Rajdhani',sans-serif; font-size:13px; font-weight:500;
          letter-spacing:0.28em; color:rgba(255,255,255,0.52); text-transform:uppercase;
          margin-bottom:26px;
        }
        .sl-divline {
          width:160px; height:1px; margin-bottom:22px;
          background:linear-gradient(90deg, transparent, rgba(0,212,255,0.55), transparent);
        }
        .sl-expertise-label {
          font-family:'Orbitron',sans-serif; font-size:9px; font-weight:600;
          letter-spacing:0.46em; color:rgba(0,212,255,0.58); text-transform:uppercase;
          margin-bottom:16px;
        }
        .sl-skills-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; width:100%; }

        @keyframes sl-card-in { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .sl-skill-card {
          background:rgba(0,212,255,0.04); border:1px solid rgba(0,212,255,0.14);
          border-radius:12px; padding:14px 8px;
          display:flex; flex-direction:column; align-items:center; gap:9px;
          opacity:0; transition:background 0.3s,border-color 0.3s;
        }
        .sl-skill-card.sl-card-show { animation:sl-card-in 0.5s ease forwards; }
        .sl-skill-card:hover { background:rgba(0,212,255,0.09); border-color:rgba(0,212,255,0.32); }
        .sl-skill-icon { width:38px; height:38px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:18px; }
        .sl-skill-name {
          font-family:'Rajdhani',sans-serif; font-size:11px; font-weight:600;
          color:rgba(255,255,255,0.88); text-align:center; letter-spacing:0.06em;
          text-transform:uppercase; line-height:1.3;
        }
        .sl-tagline {
          margin-top:20px; font-family:'Rajdhani',sans-serif; font-size:11px;
          font-weight:500; letter-spacing:0.4em; color:rgba(0,212,255,0.42);
          text-transform:uppercase; text-align:center;
          opacity:0; transition:opacity 1s ease;
        }
        .sl-tagline.sl-show { opacity:1; }
      `}</style>

      <div ref={containerRef} className="sl-root">
        <div className="sl-bg-grid" />
        <div className="sl-vignette" />
        <div className="sl-scanline" />
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

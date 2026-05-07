"use client"

import { useEffect, useRef } from "react"

type Props = {
  onLoadingComplete: () => void
}

export default function SplashLoader({ onLoadingComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pctRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)

  // Draw arc progress on canvas
  function drawArc(progress: number) {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const w = canvas.width
    const h = canvas.height
    ctx.clearRect(0, 0, w, h)

    const cx = w / 2
    const cy = h / 2
    const r = w / 2 - 6
    const startAngle = -Math.PI / 2
    const endAngle = startAngle + Math.PI * 2 * progress

    // Track background
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.strokeStyle = "rgba(34,211,238,0.08)"
    ctx.lineWidth = 4
    ctx.stroke()

    if (progress <= 0) return

    // Gradient arc
    const grad = ctx.createLinearGradient(0, 0, w, 0)
    grad.addColorStop(0, "#22d3ee")
    grad.addColorStop(0.5, "#6366f1")
    grad.addColorStop(1, "#a855f7")

    ctx.beginPath()
    ctx.arc(cx, cy, r, startAngle, endAngle)
    ctx.strokeStyle = grad
    ctx.lineWidth = 4
    ctx.lineCap = "round"
    ctx.shadowColor = "#22d3ee"
    ctx.shadowBlur = 12
    ctx.stroke()
    ctx.shadowBlur = 0

    // Moving dot at arc tip
    const dotX = cx + r * Math.cos(endAngle)
    const dotY = cy + r * Math.sin(endAngle)
    ctx.beginPath()
    ctx.arc(dotX, dotY, 4, 0, Math.PI * 2)
    ctx.fillStyle = "#e0f9ff"
    ctx.shadowColor = "#22d3ee"
    ctx.shadowBlur = 14
    ctx.fill()
    ctx.shadowBlur = 0
  }

  useEffect(() => {
    const duration = 4200
    let startTime: number | null = null

    function easeOutCubic(t: number) {
      return 1 - Math.pow(1 - t, 3)
    }

    function animate(ts: number) {
      if (!startTime) startTime = ts
      const raw = Math.min((ts - startTime) / duration, 1)
      const p = easeOutCubic(raw)
      const pct = Math.floor(p * 100)

      // Direct DOM updates — no React state, no re-renders
      if (pctRef.current) pctRef.current.textContent = `${pct}%`
      if (barRef.current) barRef.current.style.width = `${pct}%`

      drawArc(p)

      if (pct >= 25) nameRef.current?.classList.add("sl-show")
      if (pct >= 50) skillsRef.current?.classList.add("sl-show")
      if (pct >= 75) taglineRef.current?.classList.add("sl-show")

      if (raw < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.classList.add("sl-exit")
          }
          setTimeout(onLoadingComplete, 800)
        }, 350)
      }
    }

    drawArc(0)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [onLoadingComplete])

  const skills = [
    { label: "Front-end Dev", gradient: "from-cyan-500/25 to-blue-500/25", icon: "💻" },
    { label: "System Analyst", gradient: "from-purple-500/25 to-fuchsia-500/25", icon: "⚙️" },
    { label: "UI/UX Designer", gradient: "from-orange-400/25 to-pink-500/25", icon: "🎨" },
    { label: "Data Analyst", gradient: "from-emerald-400/25 to-green-500/25", icon: "📊" },
  ]

  return (
    <>
      <style>{`
        .sl-root {
          position: relative;
          background: #020617;
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: opacity 0.8s ease, transform 0.8s ease, filter 0.8s ease;
        }
        .sl-root.sl-exit {
          opacity: 0;
          transform: scale(1.03);
          filter: blur(10px);
        }

        /* Background */
        .sl-bg-radial {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 45%, rgba(34,211,238,0.13) 0%, transparent 65%);
          pointer-events: none;
        }
        .sl-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 70px 70px;
          pointer-events: none;
        }

        /* Scanline sweep */
        .sl-scanline {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .sl-scanline::after {
          content: '';
          position: absolute;
          left: 0; right: 0;
          height: 3px;
          background: linear-gradient(transparent, rgba(34,211,238,0.07), transparent);
          animation: sl-scan 4.5s linear infinite;
        }
        @keyframes sl-scan {
          0%   { transform: translateY(-10px); }
          100% { transform: translateY(100vh); }
        }

        /* Floating particles */
        .sl-particle {
          position: absolute;
          border-radius: 50%;
          background: #22d3ee;
          pointer-events: none;
          animation: sl-float var(--dur) ease-in-out var(--delay) infinite;
        }
        @keyframes sl-float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          40%       { transform: translateY(-14px) translateX(7px); opacity: 0.7; }
          70%       { transform: translateY(-6px) translateX(-8px); opacity: 0.5; }
        }

        /* Arc rings */
        .sl-ring {
          position: absolute;
          border-radius: 50%;
        }
        .sl-ring-outer {
          width: 200px; height: 200px;
          border: 1.5px solid rgba(34,211,238,0.15);
          animation: sl-spin 12s linear infinite;
        }
        .sl-ring-outer::before {
          content: '';
          position: absolute;
          top: -4px; left: 50%;
          width: 7px; height: 7px;
          background: #22d3ee;
          border-radius: 50%;
          box-shadow: 0 0 10px #22d3ee, 0 0 20px rgba(34,211,238,0.5);
          transform: translateX(-50%);
        }
        .sl-ring-mid {
          width: 156px; height: 156px;
          border: 1px solid rgba(99,102,241,0.28);
          animation: sl-spin-rev 8s linear infinite;
        }
        .sl-ring-mid::before {
          content: '';
          position: absolute;
          bottom: -3px; left: 50%;
          width: 5px; height: 5px;
          background: #818cf8;
          border-radius: 50%;
          box-shadow: 0 0 8px #818cf8;
          transform: translateX(-50%);
        }
        .sl-ring-inner {
          width: 112px; height: 112px;
          border: 1px dashed rgba(34,211,238,0.18);
          animation: sl-spin 6s linear infinite;
        }
        @keyframes sl-spin     { to { transform: rotate(360deg);  } }
        @keyframes sl-spin-rev { to { transform: rotate(-360deg); } }

        /* Pulse glow behind arc */
        .sl-glow {
          position: absolute;
          width: 200px; height: 200px;
          border-radius: 50%;
          background: rgba(34,211,238,0.07);
          filter: blur(22px);
          animation: sl-pulse 3.5s ease-in-out infinite;
        }
        @keyframes sl-pulse {
          0%, 100% { transform: scale(1);    opacity: 0.35; }
          50%       { transform: scale(1.08); opacity: 0.65; }
        }

        /* Percent text */
        .sl-pct {
          font-size: clamp(48px, 8vw, 64px);
          font-weight: 800;
          letter-spacing: 0.06em;
          color: #e0f7fa;
          text-shadow: 0 0 30px rgba(34,211,238,0.9);
          line-height: 1;
          will-change: contents;
        }

        /* Sub label blink */
        .sl-sublabel {
          font-size: 9px;
          letter-spacing: 0.5em;
          color: rgba(34,211,238,0.6);
          text-transform: uppercase;
          animation: sl-blink 2.2s ease-in-out infinite;
        }
        @keyframes sl-blink {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }

        /* Loading bar shimmer */
        .sl-bar-wrap {
          width: 240px;
          height: 3px;
          background: rgba(255,255,255,0.08);
          border-radius: 2px;
          overflow: hidden;
        }
        .sl-bar-fill {
          height: 100%;
          border-radius: 2px;
          background: linear-gradient(90deg, #22d3ee 0%, #6366f1 50%, #a855f7 100%);
          background-size: 200% 100%;
          animation: sl-shimmer 2s linear infinite;
          transition: width 0.04s linear;
          will-change: width;
        }
        @keyframes sl-shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200%  0; }
        }

        /* Reveal transitions */
        .sl-reveal {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s ease, transform 0.7s ease;
          will-change: opacity, transform;
        }
        .sl-reveal.sl-show {
          opacity: 1;
          transform: translateY(0);
        }

        /* Skill cards */
        .sl-skill-card {
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 12px 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          backdrop-filter: blur(12px);
          transition: background 0.3s ease, border-color 0.3s ease;
        }
        .sl-skill-card:hover {
          background: rgba(255,255,255,0.065);
          border-color: rgba(255,255,255,0.16);
        }
        .sl-skill-icon {
          width: 38px; height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }

        /* Top welcome label */
        .sl-welcome {
          font-size: clamp(10px, 2vw, 13px);
          font-weight: 600;
          letter-spacing: 0.44em;
          color: rgba(207,250,254,0.85);
          text-transform: uppercase;
          animation: sl-fadein 0.9s ease both, sl-blink 3s ease-in-out 0.9s infinite;
        }
        @keyframes sl-fadein {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div ref={containerRef} className="sl-root">
        {/* BG layers */}
        <div className="sl-bg-radial" />
        <div className="sl-bg-grid" />
        <div className="sl-scanline" />

        {/* Floating particles — created in JSX, animated by CSS */}
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={i}
            className="sl-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              ["--dur" as string]: `${3 + Math.random() * 4}s`,
              ["--delay" as string]: `${Math.random() * 3}s`,
              opacity: 0.2 + Math.random() * 0.5,
            }}
          />
        ))}

        {/* Welcome */}
        <p className="sl-welcome mb-10 text-center">Welcome to my portfolio</p>

        {/* Arc reactor center */}
        <div className="relative flex items-center justify-center w-[220px] h-[220px] mb-6">
          <div className="sl-glow" />
          <div className="sl-ring sl-ring-outer" />
          <div className="sl-ring sl-ring-mid" />
          <div className="sl-ring sl-ring-inner" />

          {/* Canvas arc — 100×100 logical pixels, CSS scaled to 100px */}
          <canvas
            ref={canvasRef}
            width={100}
            height={100}
            style={{ position: "absolute", width: 100, height: 100, borderRadius: "50%" }}
          />

          {/* Percent — updated via ref, NOT state */}
          <div className="relative z-10 flex flex-col items-center">
            <span ref={pctRef} className="sl-pct">0%</span>
          </div>
        </div>

        {/* Sub label + bar */}
        <p className="sl-sublabel mb-3">Arc Reactor Initializing</p>
        <div className="sl-bar-wrap mb-8">
          <div ref={barRef} className="sl-bar-fill" style={{ width: "0%" }} />
        </div>

        {/* Name — revealed at 25% */}
        <div
          ref={nameRef}
          className="sl-reveal text-center text-2xl sm:text-4xl font-semibold text-white mb-8"
        >
          Jason Vianney Sugiarto
        </div>

        {/* Skills — revealed at 50% */}
        <div
          ref={skillsRef}
          className="sl-reveal grid grid-cols-2 lg:grid-cols-4 gap-3 w-full max-w-xl mb-8 px-4"
        >
          {skills.map((skill) => (
            <div key={skill.label} className="sl-skill-card">
              <div
                className={`sl-skill-icon bg-gradient-to-br ${skill.gradient}`}
              >
                {skill.icon}
              </div>
              <span className="text-[10px] font-medium text-white/75 text-center leading-tight">
                {skill.label}
              </span>
            </div>
          ))}
        </div>

        {/* Tagline — revealed at 75% */}
        <p
          ref={taglineRef}
          className="sl-reveal text-[10px] tracking-[0.44em] text-cyan-100/45 uppercase text-center"
        >
          Building digital systems with precision
        </p>
      </div>
    </>
  )
}

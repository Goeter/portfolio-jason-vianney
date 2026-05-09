"use client"

import { useEffect, useRef, useState } from "react"

interface SplashLoaderProps {
  onLoadingComplete: () => void
}

export default function SplashLoader({
  onLoadingComplete,
}: SplashLoaderProps) {
  const [phase, setPhase] = useState<
    "loading" | "reactor" | "welcome" | "warp"
  >("loading")

  const [progress, setProgress] = useState(0)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

  /* =========================================================
     LOADING BAR → 0 - 50
  ========================================================= */
  useEffect(() => {
    if (phase !== "loading") return

    let start: number | null = null

    const animate = (timestamp: number) => {
      if (!start) start = timestamp

      const elapsed = timestamp - start
      const duration = 3200

      const t = Math.min(elapsed / duration, 1)

      // smooth easing
      const eased = 1 - Math.pow(1 - t, 3)

      const current = Math.floor(eased * 50)

      setProgress(current)

      if (t < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        setTimeout(() => {
          setPhase("reactor")
        }, 500)
      }
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationRef.current)
  }, [phase])

  /* =========================================================
     ARC REACTOR → 50 - 100
  ========================================================= */
  useEffect(() => {
    if (phase !== "reactor") return

    let start: number | null = null

    const animate = (timestamp: number) => {
      if (!start) start = timestamp

      const elapsed = timestamp - start
      const duration = 3800

      const t = Math.min(elapsed / duration, 1)

      const eased = 1 - Math.pow(1 - t, 4)

      const current = 50 + Math.floor(eased * 50)

      setProgress(current)

      if (t < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        setTimeout(() => {
          setPhase("welcome")
        }, 600)
      }
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationRef.current)
  }, [phase])

  /* =========================================================
     ARC REACTOR CANVAS
  ========================================================= */
  useEffect(() => {
    if (phase !== "reactor") return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1

    const size = 260

    canvas.width = size * dpr
    canvas.height = size * dpr

    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`

    ctx.scale(dpr, dpr)

    let rotation = 0

    const render = () => {
      ctx.clearRect(0, 0, size, size)

      const cx = size / 2
      const cy = size / 2

      rotation += 0.01

      // outer glow
      const glow = ctx.createRadialGradient(cx, cy, 20, cx, cy, 100)

      glow.addColorStop(0, "rgba(0,212,255,0.35)")
      glow.addColorStop(1, "rgba(0,212,255,0)")

      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(cx, cy, 100, 0, Math.PI * 2)
      ctx.fill()

      // rotating rings
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(rotation)

      ctx.strokeStyle = "rgba(0,212,255,0.7)"
      ctx.lineWidth = 2

      ctx.beginPath()
      ctx.arc(0, 0, 80, 0, Math.PI * 2)
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(0, 0, 55, 0, Math.PI * 2)
      ctx.stroke()

      ctx.restore()

      // center core
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40)

      core.addColorStop(0, "#ffffff")
      core.addColorStop(0.4, "#00d4ff")
      core.addColorStop(1, "rgba(0,212,255,0)")

      ctx.fillStyle = core

      ctx.beginPath()
      ctx.arc(cx, cy, 40, 0, Math.PI * 2)
      ctx.fill()

      animationRef.current = requestAnimationFrame(render)
    }

    render()

    return () => cancelAnimationFrame(animationRef.current)
  }, [phase])

  /* =========================================================
     WELCOME → WARP → HOME
  ========================================================= */
  useEffect(() => {
    if (phase !== "welcome") return

    const timer = setTimeout(() => {
      setPhase("warp")

      setTimeout(() => {
        onLoadingComplete()
      }, 2600)
    }, 2600)

    return () => clearTimeout(timer)
  }, [phase, onLoadingComplete])

  /* =========================================================
     CLEANUP
  ========================================================= */
  useEffect(() => {
    return () => cancelAnimationFrame(animationRef.current)
  }, [])

  return (
    <>
      <style jsx>{`
        .splash-root {
          position: fixed;
          inset: 0;
          z-index: 99999;
          overflow: hidden;
          background:
            radial-gradient(circle at center, #07111f 0%, #02040a 65%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: Arial, sans-serif;
        }

        /* =====================================================
           BACKGROUND
        ===================================================== */

        .stars {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .star {
          position: absolute;
          background: white;
          border-radius: 999px;
          opacity: 0.7;
          animation: twinkle linear infinite;
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 1;
          }
        }

        /* =====================================================
           LOADING BAR
        ===================================================== */

        .loading-wrap {
          width: min(520px, 88vw);
          transition:
            opacity 0.8s ease,
            transform 0.8s ease;
        }

        .loading-hidden {
          opacity: 0;
          transform: scale(0.92);
          pointer-events: none;
        }

        .loading-label {
          color: rgba(255, 255, 255, 0.65);
          letter-spacing: 0.45em;
          font-size: 11px;
          margin-bottom: 18px;
          text-align: center;
          text-transform: uppercase;
        }

        .loading-percentage {
          text-align: center;
          font-size: clamp(52px, 10vw, 82px);
          font-weight: 800;
          color: white;
          margin-bottom: 24px;
          text-shadow: 0 0 25px rgba(0, 212, 255, 0.4);
        }

        .bar-track {
          height: 8px;
          width: 100%;
          border-radius: 999px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .bar-fill {
          height: 100%;
          border-radius: 999px;
          background:
            linear-gradient(
              90deg,
              #003cff,
              #00d4ff,
              #00ffd0
            );
          transition: width 0.08s linear;
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.45);
        }

        .loading-sub {
          margin-top: 16px;
          text-align: center;
          color: rgba(255, 255, 255, 0.45);
          font-size: 13px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        /* =====================================================
           ARC REACTOR
        ===================================================== */

        .reactor-wrap {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: scale(0.92);
          transition:
            opacity 1s ease,
            transform 1s ease;
          pointer-events: none;
        }

        .reactor-active {
          opacity: 1;
          transform: scale(1);
        }

        .reactor-percent {
          margin-top: 24px;
          font-size: clamp(34px, 6vw, 52px);
          font-weight: 700;
          color: white;
          letter-spacing: 0.08em;
          text-shadow: 0 0 18px rgba(0, 212, 255, 0.45);
        }

        /* =====================================================
           WELCOME
        ===================================================== */

        .welcome {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translateY(20px);
          transition:
            opacity 1s ease,
            transform 1s ease;
        }

        .welcome-active {
          opacity: 1;
          transform: translateY(0);
        }

        .welcome-label {
          color: rgba(255,255,255,0.6);
          text-transform: uppercase;
          letter-spacing: 0.6em;
          font-size: 12px;
          margin-bottom: 24px;
        }

        .welcome-name {
          font-size: clamp(30px, 6vw, 64px);
          font-weight: 800;
          color: white;
          text-align: center;
          text-shadow:
            0 0 30px rgba(0,212,255,0.35);
          padding: 0 20px;
        }

        /* =====================================================
           HYPERSPACE WARP
        ===================================================== */

        .warp {
          position: absolute;
          inset: 0;
          opacity: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .warp-active {
          opacity: 1;
        }

        .warp-line {
          position: absolute;
          width: 2px;
          height: 120px;
          background:
            linear-gradient(
              to bottom,
              transparent,
              rgba(255,255,255,0.9),
              transparent
            );

          animation: warpMove 2s linear forwards;
        }

        @keyframes warpMove {
          from {
            transform:
              translateY(100vh)
              scaleY(0.2);
            opacity: 0;
          }

          20% {
            opacity: 1;
          }

          to {
            transform:
              translateY(-120vh)
              scaleY(2.8);
            opacity: 0;
          }
        }
      `}</style>

      <div className="splash-root">
        {/* STARS */}
        <div className="stars">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${2 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* LOADING */}
        <div
          className={`loading-wrap ${
            phase !== "loading" ? "loading-hidden" : ""
          }`}
        >
          <div className="loading-label">
            Initializing Portfolio System
          </div>

          <div className="loading-percentage">
            {progress}%
          </div>

          <div className="bar-track">
            <div
              className="bar-fill"
              style={{
                width: `${(progress / 50) * 100}%`,
              }}
            />
          </div>

          <div className="loading-sub">
            Loading Interface Modules
          </div>
        </div>

        {/* ARC REACTOR */}
        <div
          className={`reactor-wrap ${
            phase === "reactor" ? "reactor-active" : ""
          }`}
        >
          <canvas ref={canvasRef} />

          <div className="reactor-percent">
            {progress}%
          </div>
        </div>

        {/* WELCOME */}
        <div
          className={`welcome ${
            phase === "welcome" ? "welcome-active" : ""
          }`}
        >
          <div className="welcome-label">
            Welcome To My Portfolio
          </div>

          <div className="welcome-name">
            Jason Vianney Sugiarto
          </div>
        </div>

        {/* HYPERSPACE */}
        <div
          className={`warp ${
            phase === "warp" ? "warp-active" : ""
          }`}
        >
          {Array.from({ length: 70 }).map((_, i) => (
            <div
              key={i}
              className="warp-line"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      </div>
    </>
  )
}

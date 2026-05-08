/**
 * SplashLoader.tsx
 *
 * CINEMATIC PORTFOLIO SPLASH
 * ==========================================
 * FLOW:
 * 1. Futuristic computer boot
 * 2. Loading bar system initialization
 * 3. 50% morph → Arc Reactor
 * 4. Reactor loading 51–100%
 * 5. Dust dissolve transition
 * 6. Space welcome scene
 * 7. Smooth transition → HomeSection.tsx
 *
 * REQUIREMENTS:
 * npm i framer-motion
 */

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const SKILLS = [
  "Front-end Developer",
  "System Analyst",
  "UI/UX Designer",
  "Data Analyst",
  "Mathematics Tutor",
  "English Tutor",
]

export default function SplashLoader({
  onLoadingComplete,
}: {
  onLoadingComplete?: () => void
}) {
  const [phase, setPhase] = useState<
    | "boot"
    | "loading"
    | "transition"
    | "reactor"
    | "dust"
    | "welcome"
    | "exit"
  >("boot")

  const [progress, setProgress] = useState(0)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reactorCanvasRef = useRef<HTMLCanvasElement>(null)

  /* =========================================================
     SPACE BACKGROUND
  ========================================================= */

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)

    const stars = Array.from({ length: 260 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2,
      a: Math.random(),
      speed: Math.random() * 0.15 + 0.05,
    }))

    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }

    window.addEventListener("resize", resize)

    let raf = 0

    const render = (t: number) => {
      ctx.clearRect(0, 0, w, h)

      /* Deep space */

      const bg = ctx.createRadialGradient(
        w / 2,
        h / 2,
        0,
        w / 2,
        h / 2,
        w
      )

      bg.addColorStop(0, "#120026")
      bg.addColorStop(0.45, "#050816")
      bg.addColorStop(1, "#000")

      ctx.fillStyle = bg
      ctx.fillRect(0, 0, w, h)

      /* Nebula */

      const nebula = ctx.createRadialGradient(
        w * 0.3,
        h * 0.2,
        0,
        w * 0.3,
        h * 0.2,
        w * 0.4
      )

      nebula.addColorStop(0, "rgba(0,255,255,0.12)")
      nebula.addColorStop(1, "transparent")

      ctx.fillStyle = nebula
      ctx.fillRect(0, 0, w, h)

      /* Stars */

      stars.forEach((s) => {
        s.y += s.speed

        if (s.y > h) {
          s.y = -10
        }

        const pulse = 0.5 + Math.sin(t * 0.001 + s.x) * 0.5

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)

        ctx.fillStyle = `rgba(255,255,255,${pulse})`
        ctx.shadowBlur = 12
        ctx.shadowColor = "#ffffff"

        ctx.fill()
      })

      raf = requestAnimationFrame(render)
    }

    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [])

  /* =========================================================
     BOOT SEQUENCE
  ========================================================= */

  useEffect(() => {
    const bootTimer = setTimeout(() => {
      setPhase("loading")
    }, 2600)

    return () => clearTimeout(bootTimer)
  }, [])

  /* =========================================================
     LOADING PROGRESS
  ========================================================= */

  useEffect(() => {
    if (phase !== "loading" && phase !== "reactor") return

    let current = phase === "loading" ? 0 : 50

    const interval = setInterval(() => {
      current += Math.random() * 3 + 1

      if (phase === "loading" && current >= 50) {
        current = 50
        setProgress(current)

        clearInterval(interval)

        setPhase("transition")

        setTimeout(() => {
          setPhase("reactor")
        }, 1800)

        return
      }

      if (phase === "reactor" && current >= 100) {
        current = 100

        setProgress(current)

        clearInterval(interval)

        setTimeout(() => {
          setPhase("dust")
        }, 1200)

        setTimeout(() => {
          setPhase("welcome")
        }, 2600)

        setTimeout(() => {
          setPhase("exit")

          setTimeout(() => {
            onLoadingComplete?.()
          }, 1400)
        }, 7200)

        return
      }

      setProgress(current)
    }, 120)

    return () => clearInterval(interval)
  }, [phase, onLoadingComplete])

  /* =========================================================
     ARC REACTOR
  ========================================================= */

  useEffect(() => {
    if (phase !== "reactor") return

    const canvas = reactorCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf = 0

    const render = (t: number) => {
      const w = canvas.width
      const h = canvas.height

      ctx.clearRect(0, 0, w, h)

      const cx = w / 2
      const cy = h / 2

      ctx.save()

      ctx.translate(cx, cy)

      ctx.rotate(t * 0.0006)

      /* Outer Rings */

      for (let i = 0; i < 3; i++) {
        ctx.beginPath()

        ctx.arc(0, 0, 110 + i * 20, 0, Math.PI * 2)

        ctx.strokeStyle = `rgba(0,255,255,${0.2 - i * 0.05})`
        ctx.lineWidth = 5

        ctx.shadowBlur = 22
        ctx.shadowColor = "#00ffff"

        ctx.stroke()
      }

      /* Reactor Arms */

      for (let i = 0; i < 12; i++) {
        ctx.save()

        ctx.rotate((Math.PI * 2 * i) / 12)

        ctx.beginPath()
        ctx.moveTo(0, -55)
        ctx.lineTo(0, -135)

        ctx.strokeStyle = "rgba(255,255,255,0.9)"
        ctx.lineWidth = 4

        ctx.stroke()

        ctx.restore()
      }

      /* Core */

      const core = ctx.createRadialGradient(0, 0, 0, 0, 0, 60)

      core.addColorStop(0, "#ffffff")
      core.addColorStop(0.4, "#00ffff")
      core.addColorStop(1, "rgba(0,255,255,0.05)")

      ctx.beginPath()
      ctx.arc(0, 0, 60, 0, Math.PI * 2)

      ctx.fillStyle = core

      ctx.shadowBlur = 40
      ctx.shadowColor = "#00ffff"

      ctx.fill()

      ctx.restore()

      raf = requestAnimationFrame(render)
    }

    raf = requestAnimationFrame(render)

    return () => cancelAnimationFrame(raf)
  }, [phase])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;800;900&family=Rajdhani:wght@400;500;600;700&display=swap');

        *{
          box-sizing:border-box;
        }

        .splash-root{
          position:fixed;
          inset:0;
          z-index:9999;
          overflow:hidden;
          background:black;

          transition:
            opacity 1.5s ease,
            transform 1.5s ease,
            filter 1.5s ease;
        }

        .splash-root.exit{
          opacity:0;
          transform:scale(1.08);
          filter:blur(20px);
          pointer-events:none;
        }

        .space-canvas{
          position:absolute;
          inset:0;
          width:100%;
          height:100%;
        }

        .overlay{
          position:absolute;
          inset:0;

          background:
            radial-gradient(circle at center,
            transparent 10%,
            rgba(0,0,0,0.72) 100%);
        }

        .center{
          position:relative;
          z-index:5;

          width:100%;
          height:100%;

          display:flex;
          align-items:center;
          justify-content:center;

          padding:20px;
        }

        .boot-panel{
          width:min(900px,100%);
          padding:32px;

          border-radius:24px;

          border:1px solid rgba(0,255,255,0.18);

          background:rgba(0,0,0,0.4);

          backdrop-filter:blur(16px);

          box-shadow:
            0 0 60px rgba(0,255,255,0.08),
            inset 0 0 60px rgba(0,255,255,0.04);
        }

        .boot-title{
          font-family:'Orbitron',sans-serif;

          color:white;

          text-align:center;

          font-size:clamp(16px,2vw,22px);

          letter-spacing:0.45em;

          margin-bottom:28px;

          text-shadow:
            0 0 18px rgba(0,255,255,1);
        }

        .terminal-line{
          font-family:'Rajdhani',sans-serif;

          color:rgba(255,255,255,0.85);

          font-size:clamp(14px,1.5vw,18px);

          margin-bottom:14px;

          letter-spacing:0.12em;

          animation:flicker 2s infinite;
        }

        .loading-wrap{
          width:min(900px,100%);

          display:flex;
          flex-direction:column;
          align-items:center;

          gap:28px;
        }

        .hud-circle{
          width:min(360px,70vw);
          aspect-ratio:1;

          border-radius:50%;

          border:4px solid rgba(0,255,255,0.2);

          display:flex;
          align-items:center;
          justify-content:center;

          position:relative;

          box-shadow:
            0 0 50px rgba(0,255,255,0.15),
            inset 0 0 50px rgba(0,255,255,0.08);

          animation:rotate 18s linear infinite;
        }

        .hud-circle::before{
          content:'';

          position:absolute;

          inset:20px;

          border-radius:50%;

          border:2px dashed rgba(255,255,255,0.18);

          animation:rotateReverse 10s linear infinite;
        }

        .progress-text{
          font-family:'Orbitron',sans-serif;

          font-size:clamp(34px,7vw,62px);

          color:white;

          text-shadow:
            0 0 25px rgba(0,255,255,1),
            0 0 70px rgba(0,255,255,0.5);
        }

        .loading-bar{
          width:100%;

          border-radius:22px;

          border:1px solid rgba(0,255,255,0.16);

          background:rgba(255,255,255,0.04);

          padding:18px;

          backdrop-filter:blur(10px);
        }

        .loading-track{
          width:100%;
          height:38px;

          display:grid;
          grid-template-columns:repeat(20,1fr);

          gap:6px;
        }

        .segment{
          border-radius:6px;

          background:rgba(255,255,255,0.05);

          transition:0.4s ease;
        }

        .segment.active{
          background:
            linear-gradient(180deg,
            #00ffff,
            #009dff);

          box-shadow:
            0 0 16px rgba(0,255,255,1),
            0 0 32px rgba(0,255,255,0.45);
        }

        .loading-footer{
          margin-top:14px;

          display:flex;
          justify-content:space-between;

          gap:12px;

          flex-wrap:wrap;
        }

        .loading-label{
          font-family:'Orbitron',sans-serif;

          color:#00ffff;

          letter-spacing:0.3em;

          font-size:11px;
        }

        .system-label{
          font-family:'Orbitron',sans-serif;

          color:rgba(255,255,255,0.4);

          font-size:11px;
        }

        .reactor-wrap{
          position:relative;

          width:min(520px,85vw);
          aspect-ratio:1;

          display:flex;
          align-items:center;
          justify-content:center;
        }

        .reactor-canvas{
          width:100%;
          height:100%;
        }

        .reactor-percent{
          position:absolute;

          font-family:'Orbitron',sans-serif;

          font-size:clamp(34px,7vw,68px);

          color:white;

          text-shadow:
            0 0 25px rgba(0,255,255,1),
            0 0 80px rgba(0,255,255,0.5);
        }

        .welcome-wrap{
          width:min(1200px,100%);

          display:flex;
          flex-direction:column;
          align-items:center;

          text-align:center;
        }

        .welcome-small{
          color:#00ffff;

          font-family:'Orbitron',sans-serif;

          letter-spacing:0.45em;

          font-size:clamp(10px,2vw,14px);

          margin-bottom:18px;

          text-shadow:0 0 18px rgba(0,255,255,0.8);
        }

        .name{
          font-family:'Orbitron',sans-serif;

          font-size:clamp(34px,7vw,72px);

          font-weight:900;

          color:white;

          text-shadow:
            0 0 35px rgba(0,255,255,1),
            0 0 90px rgba(0,255,255,0.35);
        }

        .subtitle{
          margin-top:16px;

          font-family:'Rajdhani',sans-serif;

          color:rgba(255,255,255,0.72);

          letter-spacing:0.28em;

          font-size:clamp(14px,2vw,22px);

          text-transform:uppercase;
        }

        .divider{
          width:min(280px,70vw);
          height:1px;

          margin:30px 0;

          background:
            linear-gradient(90deg,
            transparent,
            rgba(0,255,255,0.8),
            transparent);
        }

        .skills{
          width:100%;

          display:grid;

          grid-template-columns:
            repeat(auto-fit,minmax(180px,1fr));

          gap:18px;

          margin-top:28px;
        }

        .skill-card{
          background:rgba(255,255,255,0.04);

          border:1px solid rgba(0,255,255,0.14);

          border-radius:22px;

          padding:24px;

          backdrop-filter:blur(12px);

          transition:0.45s ease;
        }

        .skill-card:hover{
          transform:translateY(-10px);

          border-color:rgba(0,255,255,0.4);

          box-shadow:
            0 0 35px rgba(0,255,255,0.15);
        }

        .skill-icon{
          font-size:42px;

          margin-bottom:16px;
        }

        .skill-text{
          color:white;

          font-family:'Rajdhani',sans-serif;

          font-weight:700;

          letter-spacing:0.08em;

          text-transform:uppercase;
        }

        .tagline{
          margin-top:40px;

          color:rgba(0,255,255,0.58);

          font-family:'Orbitron',sans-serif;

          letter-spacing:0.35em;

          font-size:clamp(10px,2vw,14px);
        }

        @keyframes flicker{
          0%,100%{opacity:1}
          50%{opacity:0.55}
        }

        @keyframes rotate{
          from{transform:rotate(0deg)}
          to{transform:rotate(360deg)}
        }

        @keyframes rotateReverse{
          from{transform:rotate(360deg)}
          to{transform:rotate(0deg)}
        }

        @media(max-width:768px){

          .boot-panel{
            padding:22px;
          }

          .loading-track{
            gap:4px;
          }

          .skills{
            grid-template-columns:repeat(2,1fr);
          }
        }

        @media(max-width:520px){

          .skills{
            grid-template-columns:1fr;
          }

          .loading-track{
            height:24px;
          }
        }
      `}</style>

      <div className={`splash-root ${phase === "exit" ? "exit" : ""}`}>
        <canvas ref={canvasRef} className="space-canvas" />

        <div className="overlay" />

        <div className="center">

          {/* =========================================================
              BOOT
          ========================================================= */}

          <AnimatePresence mode="wait">

            {phase === "boot" && (
              <motion.div
                key="boot"
                className="boot-panel"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{
                  opacity: 0,
                  y: -50,
                  filter: "blur(10px)",
                }}
              >
                <div className="boot-title">
                  QUANTUM OPERATING SYSTEM
                </div>

                <div className="terminal-line">
                  ▶ INITIALIZING NEURAL PROCESSOR...
                </div>

                <div className="terminal-line">
                  ▶ LOADING ARC CORE DRIVER...
                </div>

                <div className="terminal-line">
                  ▶ CHECKING MEMORY INTEGRITY...
                </div>

                <div className="terminal-line">
                  ▶ CONNECTING USER INTERFACE...
                </div>

                <div className="terminal-line">
                  ▶ SYSTEM STATUS : ONLINE
                </div>
              </motion.div>
            )}

            {/* =========================================================
                LOADING BAR
            ========================================================= */}

            {phase === "loading" && (
              <motion.div
                key="loading"
                className="loading-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  scale: 0.85,
                  filter: "blur(16px)",
                }}
              >
                <div className="hud-circle">
                  <div className="progress-text">
                    {Math.floor(progress)}%
                  </div>
                </div>

                <div className="loading-bar">

                  <div className="loading-track">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={i}
                        className={`segment ${
                          i <= progress / 5 ? "active" : ""
                        }`}
                      />
                    ))}
                  </div>

                  <div className="loading-footer">
                    <div className="loading-label">
                      INITIALIZING SYSTEM...
                    </div>

                    <div className="system-label">
                      MK-VII CORE
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* =========================================================
                TRANSITION
            ========================================================= */}

            {phase === "transition" && (
              <motion.div
                key="transition"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  scale: [1, 1.2, 0.9],
                }}
                transition={{ duration: 1.8 }}
              >
                <div
                  style={{
                    width: 260,
                    height: 260,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle,#00ffff,#008cff,transparent)",
                    boxShadow:
                      "0 0 80px rgba(0,255,255,1)",
                  }}
                />
              </motion.div>
            )}

            {/* =========================================================
                ARC REACTOR
            ========================================================= */}

            {phase === "reactor" && (
              <motion.div
                key="reactor"
                className="reactor-wrap"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{
                  opacity: 0,
                  scale: 1.5,
                  filter: "blur(18px)",
                }}
              >
                <canvas
                  ref={reactorCanvasRef}
                  width={520}
                  height={520}
                  className="reactor-canvas"
                />

                <div className="reactor-percent">
                  {Math.floor(progress)}%
                </div>
              </motion.div>
            )}

            {/* =========================================================
                WELCOME
            ========================================================= */}

            {(phase === "welcome" || phase === "exit") && (
              <motion.div
                key="welcome"
                className="welcome-wrap"
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 1.6,
                  ease: "easeOut",
                }}
              >
                <div className="welcome-small">
                  ◈ WELCOME TO MY PORTFOLIO ◈
                </div>

                <div className="name">
                  Jason Vianney Sugiarto
                </div>

                <div className="subtitle">
                  Fullstack Developer • System Analyst • UI/UX Designer
                </div>

                <div className="divider" />

                <div className="subtitle">
                  MY EXPERTISE
                </div>

                <div className="skills">

                  {SKILLS.map((skill, i) => (
                    <motion.div
                      key={skill}
                      className="skill-card"
                      initial={{
                        opacity: 0,
                        y: 30,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: i * 0.12,
                      }}
                    >
                      <div className="skill-icon">
                        {
                          [
                            "💻",
                            "⚙️",
                            "🎨",
                            "📊",
                            "📐",
                            "🗣️",
                          ][i]
                        }
                      </div>

                      <div className="skill-text">
                        {skill}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="tagline">
                  BUILDING FUTURISTIC DIGITAL EXPERIENCES
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </>
  )
}

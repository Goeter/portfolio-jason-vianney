"use client"

import { useEffect, useRef } from "react"

type Props = {
  onLoadingComplete: () => void
}

export default function SplashLoader({
  onLoadingComplete,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const pctRef = useRef<HTMLSpanElement>(null)
  const reactorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let progress = 0

    const interval = setInterval(() => {
      progress += 1

      if (pctRef.current) {
        pctRef.current.textContent = `${progress}%`
      }

      if (progressRef.current) {
        progressRef.current.style.width = `${progress}%`
      }

      // Morph loading bar -> arc reactor
      if (progress >= 45) {
        reactorRef.current?.classList.add("show-reactor")
      }

      // Reveal text
      if (progress >= 70) {
        rootRef.current?.classList.add("show-content")
      }

      if (progress >= 100) {
        clearInterval(interval)

        setTimeout(() => {
          rootRef.current?.classList.add("exit")

          setTimeout(() => {
            onLoadingComplete()
          }, 900)
        }, 800)
      }
    }, 38)

    return () => clearInterval(interval)
  }, [onLoadingComplete])

  const skills = [
    "Fullstack Developer",
    "System Analyst",
    "UI/UX Designer",
    "Data Analyst",
  ]

  return (
    <>
      <style>{`
        .sl-root{
          position:relative;
          width:100%;
          height:100vh;
          overflow:hidden;
          background:
            radial-gradient(circle at center,
            rgba(34,211,238,0.12),
            #020617 45%);
          display:flex;
          align-items:center;
          justify-content:center;
          flex-direction:column;
          color:white;
          font-family:Inter,sans-serif;
          transition:all 1s ease;
        }

        .sl-root::before{
          content:'';
          position:absolute;
          inset:0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size:60px 60px;
          mask-image: radial-gradient(circle at center, black 35%, transparent 90%);
        }

        .loading-label{
          font-size:12px;
          letter-spacing:.45em;
          text-transform:uppercase;
          color:#a5f3fc;
          margin-bottom:22px;
          opacity:.9;
        }

        .bar-wrapper{
          width:260px;
          height:10px;
          border-radius:999px;
          background:rgba(255,255,255,0.08);
          overflow:hidden;
          position:relative;
          transition:all 1s ease;
          box-shadow:
            0 0 20px rgba(34,211,238,0.12);
        }

        .bar-fill{
          height:100%;
          width:0%;
          border-radius:999px;
          background:
            linear-gradient(
              90deg,
              #22d3ee,
              #60a5fa,
              #818cf8
            );
          transition:width .08s linear;
          box-shadow:
            0 0 20px #22d3ee,
            0 0 40px rgba(34,211,238,.4);
        }

        .percent{
          margin-top:18px;
          font-size:42px;
          font-weight:800;
          color:white;
          text-shadow:
            0 0 18px rgba(255,255,255,.35),
            0 0 40px rgba(34,211,238,.45);
        }

        .reactor-wrap{
          position:absolute;
          display:flex;
          align-items:center;
          justify-content:center;
          opacity:0;
          transform:scale(.3);
          transition:
            transform 1.2s cubic-bezier(.16,1,.3,1),
            opacity 1s ease;
        }

        .show-reactor{
          opacity:1;
          transform:scale(1);
        }

        .reactor-core{
          width:170px;
          height:170px;
          border-radius:50%;
          border:2px solid rgba(34,211,238,.22);
          position:relative;
          animation:spin 12s linear infinite;
          box-shadow:
            0 0 30px rgba(34,211,238,.22),
            inset 0 0 20px rgba(34,211,238,.12);
        }

        .reactor-core::before{
          content:'';
          position:absolute;
          inset:18px;
          border-radius:50%;
          border:2px dashed rgba(125,211,252,.35);
          animation:spinReverse 8s linear infinite;
        }

        .reactor-core::after{
          content:'';
          position:absolute;
          inset:42px;
          border-radius:50%;
          background:
            radial-gradient(circle,
            rgba(255,255,255,.95),
            #67e8f9 30%,
            rgba(34,211,238,.2) 70%,
            transparent);
          filter:blur(2px);
          box-shadow:
            0 0 30px #22d3ee,
            0 0 60px rgba(34,211,238,.5);
        }

        @keyframes spin{
          to{ transform:rotate(360deg); }
        }

        @keyframes spinReverse{
          to{ transform:rotate(-360deg); }
        }

        .content{
          position:absolute;
          bottom:12%;
          text-align:center;
          opacity:0;
          transform:translateY(30px);
          transition:all 1s ease;
        }

        .show-content .content{
          opacity:1;
          transform:translateY(0);
        }

        .welcome{
          font-size:14px;
          letter-spacing:.4em;
          text-transform:uppercase;
          color:#cffafe;
          margin-bottom:18px;
        }

        .name{
          font-size:clamp(38px,6vw,72px);
          font-weight:900;
          line-height:1;
          margin-bottom:16px;
          color:white;
          text-shadow:
            0 0 30px rgba(255,255,255,.15),
            0 0 60px rgba(34,211,238,.25);
        }

        .expertise{
          font-size:13px;
          letter-spacing:.35em;
          color:#7dd3fc;
          text-transform:uppercase;
          margin-bottom:26px;
        }

        .skills{
          display:flex;
          gap:14px;
          flex-wrap:wrap;
          justify-content:center;
          max-width:700px;
        }

        .skill{
          padding:14px 18px;
          border-radius:18px;
          background:rgba(255,255,255,.05);
          border:1px solid rgba(255,255,255,.08);
          backdrop-filter:blur(12px);
          color:white;
          font-size:14px;
          font-weight:600;
          box-shadow:
            0 0 20px rgba(255,255,255,.03);
          transition:all .35s ease;
        }

        .skill:hover{
          transform:translateY(-4px);
          border-color:rgba(34,211,238,.45);
          box-shadow:
            0 0 25px rgba(34,211,238,.18);
        }

        .exit{
          opacity:0;
          transform:scale(1.05);
          filter:blur(12px);
        }
      `}</style>

      <div ref={rootRef} className="sl-root">

        {/* Loading */}
        <div className="loading-label">
          Charging Status
        </div>

        <div className="bar-wrapper">
          <div
            ref={progressRef}
            className="bar-fill"
          />
        </div>

        <div className="percent">
          <span ref={pctRef}>0%</span>
        </div>

        {/* Arc Reactor */}
        <div
          ref={reactorRef}
          className="reactor-wrap"
        >
          <div className="reactor-core" />
        </div>

        {/* Content */}
        <div className="content">
          <div className="welcome">
            Welcome to my portfolio
          </div>

          <div className="name">
            Jason Vianney Sugiarto
          </div>

          <div className="expertise">
            My Expertise
          </div>

          <div className="skills">
            {skills.map((skill) => (
              <div key={skill} className="skill">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

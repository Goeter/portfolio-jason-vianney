import { useEffect, useMemo, useRef, useState } from "react"

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
  {
    label: "Math Tutor",
    icon: "📐",
    grad: "rgba(255,215,0,0.22),rgba(255,140,0,0.22)",
  },
  {
    label: "English Tutor",
    icon: "🗣️",
    grad: "rgba(0,255,170,0.22),rgba(0,180,255,0.22)",
  },
]

const FULL_NAME = "Jason Vianney Sugiarto"

const TOTAL_DURATION = 8500

export default function SplashLoader({ onLoadingComplete }) {
  const rootRef = useRef(null)
  const bgCanvasRef = useRef(null)
  const hudCanvasRef = useRef(null)
  const reactorCanvasRef = useRef(null)

  const pctRef = useRef(null)
  const phaseRef = useRef("boot")
  const rafRef = useRef(0)

  const [showWelcome, setShowWelcome] = useState(false)

  const stars = useRef([])
  const dustParticles = useRef([])

  const segRefs = useRef([])

  const nameRef = useRef(null)
  const skillsRef = useRef(null)
  const taglineRef = useRef(null)

  const bootTexts = useMemo(
    () => [
      "INITIALIZING QUANTUM CORE",
      "CHECKING MEMORY MODULE",
      "CONNECTING NEURAL GRID",
      "SYSTEM STATUS : ONLINE",
      "LOADING USER INTERFACE",
    ],
    []
  )

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v))
  }

  function easeOutExpo(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x)
  }

  function lerp(a, b, t) {
    return a + (b - a) * t
  }

  function initStars() {
    const cv = bgCanvasRef.current
    if (!cv) return

    cv.width = window.innerWidth
    cv.height = window.innerHeight

    stars.current = Array.from({ length: 260 }, () => ({
      x: Math.random() * cv.width,
      y: Math.random() * cv.height,
      r: Math.random() * 1.8 + 0.2,
      alpha: Math.random(),
      speed: Math.random() * 0.08 + 0.02,
    }))
  }

  function drawSpace(time) {
    const cv = bgCanvasRef.current
    if (!cv) return

    const ctx = cv.getContext("2d")
    if (!ctx) return

    const w = cv.width
    const h = cv.height

    ctx.clearRect(0, 0, w, h)

    const bg = ctx.createRadialGradient(
      w * 0.5,
      h * 0.4,
      0,
      w * 0.5,
      h * 0.5,
      w
    )

    bg.addColorStop(0, "#12052f")
    bg.addColorStop(0.45, "#050815")
    bg.addColorStop(1, "#000000")

    ctx.fillStyle = bg
    ctx.fillRect(0, 0, w, h)

    const nebula1 = ctx.createRadialGradient(
      w * 0.2,
      h * 0.2,
      0,
      w * 0.2,
      h * 0.2,
      w * 0.35
    )

    nebula1.addColorStop(0, "rgba(0,255,255,0.15)")
    nebula1.addColorStop(1, "transparent")

    ctx.fillStyle = nebula1
    ctx.fillRect(0, 0, w, h)

    const nebula2 = ctx.createRadialGradient(
      w * 0.8,
      h * 0.65,
      0,
      w * 0.8,
      h * 0.65,
      w * 0.32
    )

    nebula2.addColorStop(0, "rgba(255,0,180,0.12)")
    nebula2.addColorStop(1, "transparent")

    ctx.fillStyle = nebula2
    ctx.fillRect(0, 0, w, h)

    stars.current.forEach((s) => {
      s.y += s.speed

      if (s.y > h) {
        s.y = -5
      }

      const pulse = 0.4 + Math.sin((time + s.x) * 0.001) * 0.6

      ctx.beginPath()
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255,255,255,${pulse})`
      ctx.shadowBlur = 10
      ctx.shadowColor = "rgba(255,255,255,0.8)"
      ctx.fill()
    })
  }

  function drawHUD(progress) {
    const cv = hudCanvasRef.current
    if (!cv) return

    const ctx = cv.getContext("2d")
    if (!ctx) return

    const w = cv.width
    const h = cv.height

    ctx.clearRect(0, 0, w, h)

    const cx = w / 2
    const cy = h / 2

    const radius = Math.min(w, h) * 0.34

    ctx.beginPath()
    ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.strokeStyle = "rgba(255,255,255,0.08)"
    ctx.lineWidth = 8
    ctx.stroke()

    const grd = ctx.createLinearGradient(0, 0, w, 0)

    grd.addColorStop(0, "#00e0ff")
    grd.addColorStop(0.5, "#00ffff")
    grd.addColorStop(1, "#ffffff")

    ctx.beginPath()
    ctx.arc(
      cx,
      cy,
      radius,
      -Math.PI / 2,
      -Math.PI / 2 + Math.PI * 2 * progress
    )

    ctx.strokeStyle = grd
    ctx.lineWidth = 10
    ctx.lineCap = "round"

    ctx.shadowBlur = 25
    ctx.shadowColor = "#00e0ff"

    ctx.stroke()

    ctx.shadowBlur = 0

    for (let i = 0; i < 72; i++) {
      const ang = (Math.PI * 2 * i) / 72

      const r1 = radius + 16
      const r2 = radius + (i % 3 === 0 ? 30 : 22)

      const x1 = cx + Math.cos(ang) * r1
      const y1 = cy + Math.sin(ang) * r1

      const x2 = cx + Math.cos(ang) * r2
      const y2 = cy + Math.sin(ang) * r2

      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)

      ctx.strokeStyle =
        i / 72 <= progress
          ? "rgba(0,255,255,0.9)"
          : "rgba(255,255,255,0.1)"

      ctx.lineWidth = i % 3 === 0 ? 2 : 1
      ctx.stroke()
    }
  }

  function drawArcReactor(progress, time) {
    const cv = reactorCanvasRef.current
    if (!cv) return

    const ctx = cv.getContext("2d")
    if (!ctx) return

    const w = cv.width
    const h = cv.height

    ctx.clearRect(0, 0, w, h)

    const cx = w / 2
    const cy = h / 2

    const rot = time * 0.001

    const pulse = 1 + Math.sin(time * 0.004) * 0.06

    ctx.save()
    ctx.translate(cx, cy)
    ctx.scale(pulse, pulse)
    ctx.rotate(rot)

    for (let i = 0; i < 3; i++) {
      ctx.beginPath()
      ctx.arc(0, 0, 90 + i * 18, 0, Math.PI * 2)

      ctx.strokeStyle = `rgba(0,255,255,${0.2 - i * 0.04})`
      ctx.lineWidth = 4

      ctx.shadowBlur = 20
      ctx.shadowColor = "#00ffff"

      ctx.stroke()
    }

    for (let i = 0; i < 12; i++) {
      ctx.save()

      ctx.rotate((Math.PI * 2 * i) / 12)

      ctx.beginPath()
      ctx.moveTo(0, -50)
      ctx.lineTo(0, -120)

      ctx.strokeStyle = "rgba(255,255,255,0.8)"
      ctx.lineWidth = 3
      ctx.stroke()

      ctx.restore()
    }

    ctx.beginPath()
    ctx.arc(0, 0, 45, 0, Math.PI * 2)

    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 45)

    g.addColorStop(0, "#ffffff")
    g.addColorStop(0.5, "#00f6ff")
    g.addColorStop(1, "rgba(0,255,255,0.1)")

    ctx.fillStyle = g

    ctx.shadowBlur = 35
    ctx.shadowColor = "#00ffff"

    ctx.fill()

    ctx.restore()

    const p = Math.floor(progress * 100)

    ctx.font = "700 28px Orbitron"
    ctx.fillStyle = "#ffffff"
    ctx.textAlign = "center"

    ctx.fillText(`${p}%`, cx, cy + 10)

    ctx.font = "600 12px Orbitron"

    ctx.fillStyle = "rgba(255,255,255,0.7)"

    ctx.fillText("ARC REACTOR INITIALIZING", cx, cy + 42)
  }

  function createDustExplosion() {
    dustParticles.current = Array.from({ length: 180 }, () => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 12,
      vy: (Math.random() - 0.5) * 12,
      alpha: 1,
      size: Math.random() * 4 + 1,
    }))
  }

  function animateDust(ctx) {
    dustParticles.current.forEach((p) => {
      p.x += p.vx
      p.y += p.vy
      p.alpha -= 0.01

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)

      ctx.fillStyle = `rgba(255,255,255,${p.alpha})`
      ctx.fill()
    })

    dustParticles.current = dustParticles.current.filter((p) => p.alpha > 0)
  }

  function typeWriter(el, text, speed, cb) {
    let i = 0

    el.innerHTML = ""

    const timer = setInterval(() => {
      el.innerHTML += text[i]

      i++

      if (i >= text.length) {
        clearInterval(timer)
        cb?.()
      }
    }, speed)
  }

  function buildSkills() {
    if (!skillsRef.current) return

    skillsRef.current.innerHTML = ""

    SKILLS.forEach((s, idx) => {
      const card = document.createElement("div")

      card.className = "sl-skill-card"

      card.innerHTML = `
        <div class="sl-skill-icon"
             style="background:linear-gradient(135deg,${s.grad})">
          ${s.icon}
        </div>

        <div class="sl-skill-name">${s.label}</div>
      `

      skillsRef.current.appendChild(card)

      setTimeout(() => {
        card.classList.add("show")
      }, idx * 100)
    })
  }

  useEffect(() => {
    initStars()

    const resize = () => {
      initStars()
    }

    window.addEventListener("resize", resize)

    const start = performance.now()

    function animate(now) {
      const elapsed = now - start

      const globalProgress = clamp(elapsed / TOTAL_DURATION, 0, 1)

      drawSpace(now)

      const phase =
        globalProgress < 0.15
          ? "boot"
          : globalProgress < 0.5
          ? "loading"
          : globalProgress < 0.9
          ? "reactor"
          : "finish"

      phaseRef.current = phase

      if (phase === "loading") {
        const p = (globalProgress - 0.15) / 0.35

        drawHUD(easeOutExpo(p))

        const percent = Math.floor(p * 50)

        if (pctRef.current) {
          pctRef.current.innerHTML = `${percent}%`
        }

        segRefs.current.forEach((seg, i) => {
          if (!seg) return

          if (i <= p * 12) {
            seg.classList.add("active")
          } else {
            seg.classList.remove("active")
          }
        })
      }

      if (phase === "reactor") {
        const p = (globalProgress - 0.5) / 0.4

        drawArcReactor(0.5 + p * 0.5, now)

        if (pctRef.current) {
          pctRef.current.innerHTML = `${Math.floor(50 + p * 50)}%`
        }
      }

      if (phase === "finish") {
        if (dustParticles.current.length === 0) {
          createDustExplosion()
        }

        const cv = bgCanvasRef.current

        if (cv) {
          const ctx = cv.getContext("2d")

          animateDust(ctx)
        }

        if (!showWelcome) {
          setShowWelcome(true)

          setTimeout(() => {
            typeWriter(nameRef.current, FULL_NAME, 50, () => {
              buildSkills()

              setTimeout(() => {
                taglineRef.current?.classList.add("show")
              }, 500)
            })
          }, 600)

          setTimeout(() => {
            rootRef.current?.classList.add("page-out")

            setTimeout(() => {
              onLoadingComplete?.()
            }, 1300)
          }, 5200)
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [bootTexts, onLoadingComplete, showWelcome])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;800;900&family=Rajdhani:wght@400;500;600;700&display=swap');

        *{
          box-sizing:border-box;
        }

        .sl-root{
          position:fixed;
          inset:0;
          overflow:hidden;
          background:#000;
          z-index:9999;

          transition:
            opacity 1.2s ease,
            transform 1.2s ease,
            filter 1.2s ease;
        }

        .sl-root.page-out{
          opacity:0;
          transform:scale(1.05);
          filter:blur(20px);
          pointer-events:none;
        }

        .sl-bg{
          position:absolute;
          inset:0;
          width:100%;
          height:100%;
        }

        .sl-overlay{
          position:absolute;
          inset:0;
          background:
            radial-gradient(circle at center,transparent 10%,rgba(0,0,0,0.7) 100%);
        }

        .sl-center{
          position:relative;
          z-index:3;

          width:100%;
          height:100%;

          display:flex;
          align-items:center;
          justify-content:center;

          padding:20px;
        }

        .sl-panel{
          width:min(100%,980px);

          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;

          gap:24px;
        }

        .sl-boot{
          width:min(100%,760px);

          border:1px solid rgba(0,255,255,0.2);

          background:rgba(0,0,0,0.42);

          backdrop-filter:blur(12px);

          padding:20px;

          border-radius:20px;

          box-shadow:
            0 0 60px rgba(0,255,255,0.08),
            inset 0 0 40px rgba(0,255,255,0.04);
        }

        .sl-title{
          font-family:'Orbitron',sans-serif;
          color:#ffffff;

          text-align:center;

          font-size:clamp(13px,2vw,18px);

          letter-spacing:0.4em;

          margin-bottom:20px;

          text-shadow:0 0 16px rgba(0,255,255,0.8);
        }

        .sl-boot-lines{
          display:flex;
          flex-direction:column;
          gap:10px;
        }

        .sl-line{
          font-family:'Rajdhani',sans-serif;

          color:rgba(255,255,255,0.8);

          font-size:clamp(12px,1.8vw,15px);

          letter-spacing:0.12em;

          animation:flicker 2s infinite;
        }

        .sl-hud-wrap{
          position:relative;

          width:min(100%,760px);

          display:flex;
          align-items:center;
          justify-content:center;

          flex-direction:column;
        }

        .sl-hud-canvas{
          width:min(70vw,360px);
          height:min(70vw,360px);
        }

        .sl-reactor{
          width:min(80vw,420px);
          height:min(80vw,420px);
        }

        .sl-percent{
          position:absolute;

          font-family:'Orbitron',sans-serif;
          font-size:clamp(28px,6vw,48px);
          font-weight:800;

          color:#fff;

          text-shadow:
            0 0 20px rgba(0,255,255,1),
            0 0 50px rgba(0,255,255,0.6);
        }

        .sl-bar{
          width:min(100%,680px);

          background:rgba(255,255,255,0.04);

          border:1px solid rgba(0,255,255,0.18);

          padding:18px;

          border-radius:20px;

          backdrop-filter:blur(10px);
        }

        .sl-segs{
          display:grid;
          grid-template-columns:repeat(12,1fr);
          gap:8px;
        }

        .sl-seg{
          height:32px;

          border-radius:4px;

          background:rgba(255,255,255,0.05);

          border:1px solid rgba(255,255,255,0.05);

          transition:0.35s ease;
        }

        .sl-seg.active{
          background:linear-gradient(180deg,#00ffff,#00aaff);

          box-shadow:
            0 0 12px rgba(0,255,255,1),
            0 0 30px rgba(0,255,255,0.5);

          border-color:rgba(255,255,255,0.5);
        }

        .sl-footer{
          margin-top:14px;

          display:flex;
          align-items:center;
          justify-content:space-between;

          gap:12px;
        }

        .sl-loading{
          font-family:'Orbitron',sans-serif;

          color:#00ffff;

          font-size:11px;

          letter-spacing:0.3em;
        }

        .sl-system{
          color:rgba(255,255,255,0.45);

          font-size:11px;

          font-family:'Orbitron',sans-serif;
        }

        .sl-welcome{
          opacity:${showWelcome ? 1 : 0};

          transform:${showWelcome ? "translateY(0px)" : "translateY(40px)"};

          transition:
            opacity 1.5s ease,
            transform 1.5s ease;

          width:min(100%,1100px);

          display:flex;
          flex-direction:column;
          align-items:center;

          margin-top:40px;
        }

        .sl-welcome-small{
          color:#00ffff;

          font-family:'Orbitron',sans-serif;

          letter-spacing:0.45em;

          font-size:clamp(10px,2vw,14px);

          margin-bottom:18px;

          text-align:center;
        }

        .sl-name{
          font-family:'Orbitron',sans-serif;

          font-size:clamp(26px,5vw,56px);

          font-weight:900;

          color:#fff;

          text-align:center;

          text-shadow:
            0 0 24px rgba(0,255,255,0.9),
            0 0 80px rgba(0,255,255,0.4);

          min-height:1.4em;
        }

        .sl-sub{
          margin-top:10px;

          color:rgba(255,255,255,0.7);

          font-family:'Rajdhani',sans-serif;

          font-size:clamp(13px,2vw,20px);

          letter-spacing:0.28em;

          text-transform:uppercase;

          text-align:center;
        }

        .sl-line-divider{
          width:min(60vw,260px);
          height:1px;

          background:
            linear-gradient(90deg,
            transparent,
            rgba(0,255,255,0.8),
            transparent);

          margin:26px 0;
        }

        .sl-skills{
          width:100%;

          display:grid;

          grid-template-columns:repeat(auto-fit,minmax(140px,1fr));

          gap:16px;
        }

        .sl-skill-card{
          opacity:0;

          transform:translateY(20px);

          background:rgba(255,255,255,0.04);

          border:1px solid rgba(0,255,255,0.14);

          border-radius:20px;

          padding:20px 12px;

          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;

          gap:12px;

          transition:
            transform 0.4s ease,
            background 0.4s ease,
            border-color 0.4s ease;
        }

        .sl-skill-card.show{
          opacity:1;
          transform:translateY(0px);

          transition:
            opacity 0.6s ease,
            transform 0.6s ease;
        }

        .sl-skill-card:hover{
          transform:translateY(-8px);

          background:rgba(0,255,255,0.08);

          border-color:rgba(0,255,255,0.35);
        }

        .sl-skill-icon{
          width:62px;
          height:62px;

          border-radius:18px;

          display:flex;
          align-items:center;
          justify-content:center;

          font-size:28px;

          backdrop-filter:blur(10px);
        }

        .sl-skill-name{
          color:#fff;

          font-family:'Rajdhani',sans-serif;

          font-size:14px;

          font-weight:700;

          text-transform:uppercase;

          letter-spacing:0.08em;

          text-align:center;
        }

        .sl-tagline{
          margin-top:30px;

          color:rgba(0,255,255,0.55);

          font-family:'Orbitron',sans-serif;

          font-size:clamp(10px,1.8vw,14px);

          letter-spacing:0.38em;

          opacity:0;

          transition:opacity 1.5s ease;

          text-align:center;
        }

        .sl-tagline.show{
          opacity:1;
        }

        @keyframes flicker{
          0%,100%{opacity:1}
          50%{opacity:0.55}
        }

        @media (max-width:768px){

          .sl-boot{
            padding:16px;
          }

          .sl-bar{
            padding:14px;
          }

          .sl-seg{
            height:22px;
          }

          .sl-footer{
            flex-direction:column;
            align-items:flex-start;
          }

          .sl-skills{
            grid-template-columns:repeat(2,1fr);
          }
        }

        @media (max-width:480px){

          .sl-skills{
            grid-template-columns:1fr;
          }

          .sl-segs{
            gap:4px;
          }
        }

      `}</style>

      <div ref={rootRef} className="sl-root">

        <canvas ref={bgCanvasRef} className="sl-bg" />

        <div className="sl-overlay" />

        <div className="sl-center">

          <div className="sl-panel">

            {!showWelcome && (
              <>
                <div className="sl-boot">
                  <div className="sl-title">
                    QUANTUM OPERATING SYSTEM
                  </div>

                  <div className="sl-boot-lines">
                    {bootTexts.map((txt, i) => (
                      <div
                        key={i}
                        className="sl-line"
                        style={{
                          animationDelay: `${i * 0.2}s`,
                        }}
                      >
                        ▶ {txt}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="sl-hud-wrap">

                  {phaseRef.current !== "reactor" ? (
                    <canvas
                      ref={hudCanvasRef}
                      width={420}
                      height={420}
                      className="sl-hud-canvas"
                    />
                  ) : (
                    <canvas
                      ref={reactorCanvasRef}
                      width={520}
                      height={520}
                      className="sl-reactor"
                    />
                  )}

                  <div ref={pctRef} className="sl-percent">
                    0%
                  </div>
                </div>

                <div className="sl-bar">

                  <div className="sl-segs">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        ref={(el) => (segRefs.current[i] = el)}
                        className="sl-seg"
                      />
                    ))}
                  </div>

                  <div className="sl-footer">
                    <div className="sl-loading">
                      SYSTEM INITIALIZING...
                    </div>

                    <div className="sl-system">
                      MK-VII ARC CORE
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="sl-welcome">

              <div className="sl-welcome-small">
                ◈ WELCOME TO MY PORTFOLIO ◈
              </div>

              <div ref={nameRef} className="sl-name" />

              <div className="sl-sub">
                Fullstack Developer • System Analyst • UI/UX Designer
              </div>

              <div className="sl-line-divider" />

              <div className="sl-sub">
                MY EXPERTISE
              </div>

              <div ref={skillsRef} className="sl-skills" />

              <div ref={taglineRef} className="sl-tagline">
                BUILDING FUTURISTIC DIGITAL EXPERIENCES WITH PRECISION
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  )
}

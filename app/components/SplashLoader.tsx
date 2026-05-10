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
  "Loading...",
  "Initializing Power Core...",
  "Arc Reactor Charging to Full Capacity...",
  "System Online.",
]

const FULL_NAME =
  "Jason Vianney Sugiarto"

const PH1_DUR = 5200
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

      p.style.cssText = `
        --tx:${x}px;
        --ty:${y}px;
        width:${size}px;
        height:${size}px;
        left:50%;
        top:50%;
        animation-duration:${dur}s;
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
                        createDustExplosion()

                        containerRef.current?.classList.add(
                          "sl-content-dust-out"
                        )

                        setTimeout(() => {
                          onLoadingComplete()
                        }, 1300)
                      }, 2400)
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

        .sl-ph1{
          gap:18px;

          transition:
            opacity .6s ease,
            transform .6s ease;
        }

        .sl-ph1.sl-out{
          opacity:0;

          transform:
            translate(-50%, calc(-50% - 20px));
        }

        .sl-loading-head{
          color:#7ee7ff;

          font-size:12px;

          letter-spacing:.45em;

          text-transform:uppercase;

          margin-bottom:10px;
        }

        .sl-battery-shell{
          position:relative;

          width:min(720px,92vw);

          display:flex;
          align-items:center;
        }

        .sl-battery-cap{
          width:18px;
          height:90px;

          border-radius:0 10px 10px 0;

          background:
            linear-gradient(
              180deg,
              #0ff,
              #004b5e
            );

          box-shadow:
            0 0 18px rgba(0,212,255,.45);

          margin-left:8px;
        }

        .sl-battery-core{
          position:relative;

          width:100%;
          height:110px;

          overflow:hidden;

          border-radius:18px;

          border:
            2px solid rgba(0,212,255,.45);

          background:
            linear-gradient(
              180deg,
              rgba(0,10,25,.92),
              rgba(0,5,18,.98)
            );

          box-shadow:
            0 0 40px rgba(0,212,255,.12),
            inset 0 0 35px rgba(0,212,255,.08);
        }

        .sl-battery-grid{
          position:absolute;
          inset:0;

          background-image:
            linear-gradient(
              rgba(0,212,255,.05) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(0,212,255,.05) 1px,
              transparent 1px
            );

          background-size:24px 24px;
        }

        .sl-battery-fill{
          position:absolute;

          inset:0 auto 0 0;

          width:0%;

          border-radius:14px;

          transition:
            width .18s linear;

          background:
            linear-gradient(
              90deg,
              #ff1f4b 0%,
              #ff7b00 25%,
              #ffe600 55%,
              #00ffd5 100%
            );

          box-shadow:
            0 0 18px rgba(255,230,0,.35),
            0 0 40px rgba(0,212,255,.3);
        }

        .sl-battery-fill::before{
          content:"";

          position:absolute;
          inset:0;

          background:
            linear-gradient(
              120deg,
              transparent 0%,
              rgba(255,255,255,.4) 50%,
              transparent 100%
            );

          animation:
            batteryShine 2s linear infinite;
        }

        .sl-battery-segments{
          position:absolute;
          inset:0;

          display:grid;

          grid-template-columns:
            repeat(10,1fr);

          gap:8px;

          padding:10px;
        }

        .sl-battery-seg{
          border:
            1px solid rgba(255,255,255,.08);

          border-radius:8px;
        }

        .sl-charge-pct{
          font-size:clamp(48px,8vw,82px);

          font-weight:900;

          color:white;

          text-shadow:
            0 0 18px rgba(0,212,255,.55);
        }

        .sl-loading-row{
          display:flex;
          align-items:center;
          gap:12px;
        }

        .sl-loading-dot{
          width:10px;
          height:10px;

          border-radius:50%;

          background:#00d4ff;

          box-shadow:
            0 0 14px #00d4ff;
        }

        .sl-status-text{
          color:#d7f7ff;

          font-size:12px;

          letter-spacing:.28em;

          text-transform:uppercase;
        }

        .sl-dividers{
          display:flex;
          gap:6px;
        }

        .sl-divider{
          width:28px;
          height:3px;

          border-radius:10px;

          background:
            rgba(255,255,255,.08);

          transition:
            all .35s ease;
        }

        .sl-divider.on{
          background:#00d4ff;

          box-shadow:
            0 0 12px #00d4ff;
        }

        @keyframes batteryShine{
          0%{
            transform:
              translateX(-120%);
          }

          100%{
            transform:
              translateX(220%);
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
            <div className="sl-loading-head">
              ARC REACTOR SYSTEM
            </div>

            <div className="sl-battery-shell">
              <div className="sl-battery-core">
                <div className="sl-battery-grid" />

                <div
                  ref={barRef}
                  className="sl-battery-fill"
                />

                <div className="sl-battery-segments">
                  {Array.from({
                    length: 10,
                  }).map((_, i) => (
                    <div
                      key={i}
                      className="sl-battery-seg"
                    />
                  ))}
                </div>
              </div>

              <div className="sl-battery-cap" />
            </div>

            <div
              ref={pctRef}
              className="sl-charge-pct"
            >
              0%
            </div>

            <div className="sl-loading-row">
              <div className="sl-loading-dot" />

              <div
                ref={msgRef}
                className="sl-status-text"
              >
                Loading...
              </div>
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
      </div>
    </>
  )
}

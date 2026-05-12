"use client"

import { useEffect, useRef } from "react"

type Props = {
  onLoadingComplete: () => void
}

const FULL_NAME = "Jason Vianney Sugiarto"

const STATUS_MSGS = [
  "Loading Power Core...",
  "Arc Reactor Online — 100%",
]

const SKILLS = [
  {
    label: "IT Fullstack",
    grad: "rgba(0,212,255,0.22),rgba(59,130,246,0.22)",
  },
  {
    label: "System Analyst",
    grad: "rgba(168,85,247,0.22),rgba(236,72,153,0.22)",
  },
  {
    label: "UI/UX Designer",
    grad: "rgba(251,146,60,0.22),rgba(236,72,153,0.22)",
  },
  {
    label: "Data Analyst",
    grad: "rgba(52,211,153,0.22),rgba(16,185,129,0.22)",
  },
  {
    label: "Tutor",
    grad: "rgba(255,215,0,0.20),rgba(255,140,0,0.20)",
  },
]

const PH1_DUR = 5200
const PH2_DUR = 2800

export default function SplashLoader({
  onLoadingComplete,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  const ph1Ref = useRef<HTMLDivElement>(null)
  const ph2Ref = useRef<HTMLDivElement>(null)
  const ph3Ref = useRef<HTMLDivElement>(null)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<HTMLCanvasElement>(null)

  const hyperRef = useRef<HTMLDivElement>(null)
  const hyperCanvasRef =
    useRef<HTMLCanvasElement>(null)

  const dustRef = useRef<HTMLDivElement>(null)

  const pctRef = useRef<HTMLDivElement>(null)
  const msgRef = useRef<HTMLDivElement>(null)

  const nameRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)

  const welcomeRef = useRef<HTMLDivElement>(null)
  const expertiseRef = useRef<HTMLDivElement>(null)

  const batteryCellsRef = useRef<
    (HTMLDivElement | null)[]
  >([])

  const atomRefs = useRef<
    (HTMLDivElement | null)[]
  >([])

  const rafRef = useRef(0)
  const starsRafRef = useRef(0)
  const hyperRafRef = useRef(0)
  const arcRafRef = useRef(0)

  const easeOut = (t: number) =>
    1 - Math.pow(1 - t, 3)

  function typeWriter(
    el: HTMLElement,
    text: string,
    speed: number,
    cb?: () => void
  ) {
    let i = 0

    clearInterval((el as any)._typingTimer)

    el.textContent = ""

    ;(el as any)._typingTimer = setInterval(() => {
      el.textContent = text.slice(0, i + 1)

      i++

      if (i >= text.length) {
        clearInterval((el as any)._typingTimer)
        cb?.()
      }
    }, speed)
  }

  function drawArc(progress: number, ts: number) {
    const cv = canvasRef.current
    if (!cv) return

    const ctx = cv.getContext("2d")
    if (!ctx) return

    const w = cv.width
    const h = cv.height

    const cx = w / 2
    const cy = h / 2

    const pulse = (Math.sin(ts / 420) + 1) / 2
    const hue = (ts / 12) % 360

    ctx.clearRect(0, 0, w, h)

    const bgGlow = ctx.createRadialGradient(
      cx,
      cy,
      0,
      cx,
      cy,
      150
    )

    bgGlow.addColorStop(
      0,
      `hsla(${190 + hue},100%,70%,${
        0.16 + pulse * 0.1
      })`
    )

    bgGlow.addColorStop(
      0.5,
      `hsla(${220 + hue},100%,60%,${
        0.08 + pulse * 0.06
      })`
    )

    bgGlow.addColorStop(1, "transparent")

    ctx.beginPath()
    ctx.arc(cx, cy, 150, 0, Math.PI * 2)
    ctx.fillStyle = bgGlow
    ctx.fill()

    ctx.beginPath()
    ctx.arc(cx, cy, 110, 0, Math.PI * 2)
    ctx.strokeStyle = "rgba(255,255,255,.08)"
    ctx.lineWidth = 8
    ctx.stroke()

    const start = -Math.PI / 2
    const end = start + Math.PI * 2 * progress

    const grad = ctx.createLinearGradient(0, 0, w, h)

    grad.addColorStop(0, `hsl(${280 + hue},100%,70%)`)
    grad.addColorStop(0.4, `hsl(${190 + hue},100%,65%)`)
    grad.addColorStop(0.7, `hsl(${150 + hue},100%,60%)`)
    grad.addColorStop(1, `hsl(${50 + hue},100%,65%)`)

    ctx.beginPath()
    ctx.arc(cx, cy, 110, start, end)

    ctx.strokeStyle = grad
    ctx.lineWidth = 10
    ctx.lineCap = "round"

    ctx.shadowColor = `hsl(${190 + hue},100%,75%)`
    ctx.shadowBlur = 30 + pulse * 16

    ctx.stroke()

    ctx.shadowBlur = 0

    const orbR = 28 + pulse * 4

    const orbGlow = ctx.createRadialGradient(
      cx,
      cy,
      0,
      cx,
      cy,
      orbR + 26
    )

    orbGlow.addColorStop(0, "rgba(255,255,255,.98)")
    orbGlow.addColorStop(
      0.35,
      `hsla(${190 + hue},100%,70%,.92)`
    )
    orbGlow.addColorStop(
      0.75,
      `hsla(${190 + hue},100%,60%,.35)`
    )
    orbGlow.addColorStop(1, "transparent")

    ctx.beginPath()
    ctx.arc(cx, cy, orbR + 26, 0, Math.PI * 2)

    ctx.fillStyle = orbGlow
    ctx.fill()

    ctx.beginPath()
    ctx.arc(cx, cy, orbR * 0.58, 0, Math.PI * 2)

    ctx.fillStyle = "#ffffff"

    ctx.shadowColor = `hsla(${190 + hue},100%,75%,1)`
    ctx.shadowBlur = 34

    ctx.fill()

    ctx.shadowBlur = 0

    // POWER ICON
    ctx.save()

    ctx.translate(cx, cy)

    const iconR = 10

    ctx.beginPath()

    ctx.arc(
      0,
      0,
      iconR,
      -Math.PI / 2 + 0.55,
      -Math.PI / 2 - 0.55 + Math.PI * 2
    )

    ctx.strokeStyle = "#0f172a"
    ctx.lineWidth = 2.5
    ctx.lineCap = "round"

    ctx.stroke()

    ctx.beginPath()

    ctx.moveTo(0, -iconR - 2)
    ctx.lineTo(0, -iconR * 0.2)

    ctx.stroke()

    ctx.restore()
  }

  function startArcAnimation() {
    let start: number | null = null

    const animate = (ts: number) => {
      if (!start) start = ts

      const raw = Math.min(
        (ts - start) / PH2_DUR,
        1
      )

      drawArc(easeOut(raw), ts)

      arcRafRef.current =
        requestAnimationFrame(animate)
    }

    arcRafRef.current =
      requestAnimationFrame(animate)
  }

  function activateAtom(index: number) {
    atomRefs.current[index]?.classList.add("active")
  }

  function buildSkills() {
    const grid = skillsRef.current
    if (!grid) return

    grid.innerHTML = ""

    SKILLS.forEach((s, idx) => {
      const card = document.createElement("div")

      card.className = "sl-skill-card"

      card.style.background = `
        linear-gradient(135deg,${s.grad})
      `

      card.innerHTML = `
        <div class="sl-skill-name">
          ${s.label}
        </div>
      `

      grid.appendChild(card)

      setTimeout(() => {
        card.classList.add("sl-card-show")
      }, idx * 180)
    })
  }

  function createDustExplosion() {
    const dust = dustRef.current
    if (!dust) return

    dust.innerHTML = ""

    const frag = document.createDocumentFragment()

    for (let i = 0; i < 160; i++) {
      const p = document.createElement("div")

      const size = 1 + Math.random() * 5

      const x = (Math.random() - 0.5) * 900
      const y = (Math.random() - 0.5) * 700

      const dur = 1.2 + Math.random() * 0.8

      p.className = "sl-dust"

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
      { length: 90 },
      () => ({
        x: Math.random() * cv.width,
        y: Math.random() * cv.height,
        r: Math.random() * 2,
      })
    )

    const loop = () => {
      ctx.clearRect(0, 0, cv.width, cv.height)

      stars.forEach((s) => {
        ctx.beginPath()

        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)

        ctx.fillStyle = "rgba(255,255,255,.9)"

        ctx.fill()
      })

      starsRafRef.current =
        requestAnimationFrame(loop)
    }

    loop()
  }

  function runHyperspace(onDone: () => void) {
    const wrap = hyperRef.current
    const cv = hyperCanvasRef.current

    if (!wrap || !cv) {
      onDone()
      return
    }

    cv.width = window.innerWidth
    cv.height = window.innerHeight

    wrap.style.opacity = "1"

    const ctx = cv.getContext("2d")
    if (!ctx) return

    const cx = cv.width / 2
    const cy = cv.height / 2

    const TOTAL = 2400

    const lines = Array.from(
      { length: 240 },
      () => ({
        angle: Math.random() * Math.PI * 2,
        speed: 0.8 + Math.random() * 2,
        hue: Math.random() * 360,
      })
    )

    let t0: number | null = null

    const frame = (ts: number) => {
      if (!t0) t0 = ts

      const progress = Math.min(
        (ts - t0) / TOTAL,
        1
      )

      const ease = easeOut(progress)

      ctx.fillStyle = "rgba(1,10,20,.16)"

      ctx.fillRect(0, 0, cv.width, cv.height)

      lines.forEach((l) => {
        const dist =
          ease *
          Math.max(cv.width, cv.height) *
          l.speed

        const x1 = cx + Math.cos(l.angle) * dist
        const y1 = cy + Math.sin(l.angle) * dist

        const x2 =
          cx +
          Math.cos(l.angle) * (dist + 140)

        const y2 =
          cy +
          Math.sin(l.angle) * (dist + 140)

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
          `hsla(${l.hue},100%,90%,.95)`
        )

        ctx.beginPath()

        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)

        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5

        ctx.stroke()
      })

      if (progress < 1) {
        hyperRafRef.current =
          requestAnimationFrame(frame)

        return
      }

      wrap.style.transition = "opacity .8s ease"
      wrap.style.opacity = "0"

      setTimeout(onDone, 800)
    }

    hyperRafRef.current =
      requestAnimationFrame(frame)
  }

  useEffect(() => {
    drawArc(0, 0)

    let t0: number | null = null

    const phase1 = (ts: number) => {
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

      const activeCells = Math.min(
        Math.floor(p * 10),
        10
      )

      batteryCellsRef.current.forEach(
        (cell, idx) => {
          if (!cell) return

          if (idx < activeCells) {
            cell.classList.add("active")
          }
        }
      )

      const mi = Math.min(
        Math.floor(p * STATUS_MSGS.length),
        STATUS_MSGS.length - 1
      )

      if (
        msgRef.current &&
        msgRef.current.dataset.msg !==
          STATUS_MSGS[mi]
      ) {
        msgRef.current.dataset.msg =
          STATUS_MSGS[mi]

        typeWriter(
          msgRef.current,
          STATUS_MSGS[mi],
          38
        )
      }

      if (raw < 1) {
        rafRef.current =
          requestAnimationFrame(phase1)

        return
      }

      ph1Ref.current?.classList.add("sl-out")

      setTimeout(() => {
        ph2Ref.current?.classList.add("sl-in")

        startArcAnimation()

        ;[300, 1000, 1700].forEach((t, i) => {
          setTimeout(() => activateAtom(i), t)
        })

        let t1: number | null = null

        const phase2 = (ts2: number) => {
          if (!t1) t1 = ts2

          const r2 = Math.min(
            (ts2 - t1) / PH2_DUR,
            1
          )

          if (r2 < 1) {
            rafRef.current =
              requestAnimationFrame(phase2)

            return
          }

          cancelAnimationFrame(
            arcRafRef.current
          )

          setTimeout(() => {
            ph2Ref.current?.classList.add(
              "sl-out"
            )

            runHyperspace(() => {
              initStars()

              ph3Ref.current?.classList.add(
                "sl-in"
              )

              welcomeRef.current?.classList.add(
                "show"
              )

              setTimeout(() => {
                if (!nameRef.current) return

                typeWriter(
                  nameRef.current,
                  FULL_NAME,
                  60,
                  () => {
                    expertiseRef.current?.classList.add(
                      "show"
                    )

                    buildSkills()

                    setTimeout(() => {
                      createDustExplosion()

                      containerRef.current?.classList.add(
                        "sl-content-dust-out"
                      )

                      setTimeout(() => {
                        onLoadingComplete()
                      }, 1400)
                    }, 2600)
                  }
                )
              }, 500)
            })
          }, 700)
        }

        rafRef.current =
          requestAnimationFrame(phase2)
      }, 500)
    }

    rafRef.current =
      requestAnimationFrame(phase1)

    return () => {
      ;[
        rafRef.current,
        starsRafRef.current,
        hyperRafRef.current,
        arcRafRef.current,
      ].forEach(cancelAnimationFrame)
    }
  }, [onLoadingComplete])

  return (
    <>
      <div ref={containerRef} className="sl-root">
        <canvas
          ref={starsRef}
          className="sl-stars-canvas"
        />

        <div
          ref={hyperRef}
          className="sl-hyper-wrap"
        >
          <canvas
            ref={hyperCanvasRef}
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
          {/* PHASE 1 */}

          <div ref={ph1Ref} className="sl-ph1">
            <div className="sl-battery-shell">
              <div className="sl-battery-topline">
                <div className="sl-battery-title">
                  ARC ENERGY SYSTEM
                </div>

                <div className="sl-battery-mini">
                  <span />
                  <span />
                  <span />
                </div>
              </div>

              <div className="sl-battery-cells">
                {Array.from({ length: 10 }).map(
                  (_, i) => (
                    <div
                      key={i}
                      className="sl-battery-cell"
                      ref={(el) => {
                        batteryCellsRef.current[i] =
                          el
                      }}
                    />
                  )
                )}
              </div>

              <div className="sl-battery-bottom">
                <div
                  ref={pctRef}
                  className="sl-charge-pct"
                >
                  0%
                </div>

                <div
                  ref={msgRef}
                  className="sl-loading-text"
                >
                  Initializing...
                </div>
              </div>
            </div>
          </div>

          {/* PHASE 2 */}

          <div ref={ph2Ref} className="sl-ph2">
            <div className="sl-arc-wrap">
              <div className="sl-ring sl-ring-1" />
              <div className="sl-ring sl-ring-2" />

              {[1, 2, 3].map((n, i) => (
                <div
                  key={n}
                  ref={(el) => {
                    atomRefs.current[i] = el
                  }}
                  className={`sl-atom sl-atom-${n}`}
                />
              ))}

              <canvas
                ref={canvasRef}
                className="sl-arc-canvas"
                width={300}
                height={300}
              />
            </div>
          </div>

          {/* PHASE 3 */}

          <div ref={ph3Ref} className="sl-ph3">
            <div
              ref={welcomeRef}
              className="sl-welcome-line"
            >
              ◈ Welcome To My Portfolio ◈
            </div>

            <div
              ref={nameRef}
              className="sl-name"
            />

            <div className="sl-divline" />

            <div
              ref={expertiseRef}
              className="sl-expertise-label"
            >
              My Expertise
            </div>

            <div
              ref={skillsRef}
              className="sl-skills-grid"
            />
          </div>
        </div>
      </div>
    </>
  )
}

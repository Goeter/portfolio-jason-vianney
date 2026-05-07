import { useEffect, useRef } from "react"

const SKILLS = [
  { label: "Front-end Dev",  icon: "💻", grad: "rgba(0,212,255,0.22),rgba(59,130,246,0.22)"   },
  { label: "System Analyst", icon: "⚙️",  grad: "rgba(168,85,247,0.22),rgba(236,72,153,0.22)" },
  { label: "UI/UX Design",   icon: "🎨", grad: "rgba(251,146,60,0.22),rgba(236,72,153,0.22)"  },
  { label: "Data Analyst",   icon: "📊", grad: "rgba(52,211,153,0.22),rgba(16,185,129,0.22)"  },
]

const FULL_NAME = "Jason Vianney Sugiarto"
const LOAD_DUR  = 3600

// Color stops as progress goes 0→1: red → gold → yellow → gray → blue-neon → white
const COLOR_STOPS = [
  { t: 0.00, r: 220, g:  30,  b:  30 },  // red
  { t: 0.20, r: 200, g: 120,   b:  0 },  // gold-orange
  { t: 0.38, r: 212, g: 175,  b:  0 },  // gold
  { t: 0.55, r: 255, g: 230,  b:  0 },  // yellow
  { t: 0.70, r: 160, g: 160, b: 180 },  // gray-silver
  { t: 0.85, r:   0, g: 180, b: 255 },  // blue neon
  { t: 1.00, r: 220, g: 240, b: 255 },  // near white
]

function lerpColor(p) {
  let a = COLOR_STOPS[0], b = COLOR_STOPS[COLOR_STOPS.length - 1]
  for (let i = 0; i < COLOR_STOPS.length - 1; i++) {
    if (p >= COLOR_STOPS[i].t && p <= COLOR_STOPS[i+1].t) {
      a = COLOR_STOPS[i]; b = COLOR_STOPS[i+1]; break
    }
  }
  const range = b.t - a.t || 0.001
  const f = (p - a.t) / range
  return {
    r: Math.round(a.r + (b.r - a.r) * f),
    g: Math.round(a.g + (b.g - a.g) * f),
    b: Math.round(a.b + (b.b - a.b) * f),
  }
}

function rgbStr(c, alpha = 1) {
  return `rgba(${c.r},${c.g},${c.b},${alpha})`
}

export default function SplashLoader({ onLoadingComplete }) {
  const containerRef   = useRef(null)
  const ph1Ref         = useRef(null)
  const ph3Ref         = useRef(null)
  const gaugeCanvasRef = useRef(null)
  const spaceCanvasRef = useRef(null)
  const pctTextRef     = useRef(null)
  const segRefs        = useRef([])
  const nameRef        = useRef(null)
  const skillsRef      = useRef(null)
  const taglineRef     = useRef(null)
  const rafRef         = useRef(0)
  const starsRef       = useRef([])

  const SEGS = 12

  /* ─── Lerp helper ─── */
  function lerp(a, b, t) { return a + (b - a) * t }
  function easeInOut(t) { return t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t+2,2)/2 }
  function easeOut(t)   { return 1 - Math.pow(1 - t, 3) }

  /* ─── Space background canvas ─── */
  function initSpace() {
    const cv = spaceCanvasRef.current
    if (!cv) return
    cv.width  = window.innerWidth
    cv.height = window.innerHeight
    const ctx = cv.getContext("2d")
    if (!ctx) return

    // Stars
    starsRef.current = Array.from({ length: 280 }, () => ({
      x: Math.random() * cv.width,
      y: Math.random() * cv.height,
      r: Math.random() * 1.8 + 0.2,
      brightness: Math.random(),
      twinklePeriod: 2000 + Math.random() * 4000,
      twinkleOffset: Math.random() * 6000,
      color: Math.random() > 0.8
        ? (Math.random() > 0.5 ? [180,210,255] : [255,230,180])
        : [220,235,255],
    }))
  }

  function drawSpace(timestamp) {
    const cv = spaceCanvasRef.current
    if (!cv) return
    const ctx = cv.getContext("2d")
    if (!ctx) return
    const W = cv.width, H = cv.height

    ctx.clearRect(0, 0, W, H)

    // Deep space gradient
    const bg = ctx.createRadialGradient(W*0.35, H*0.3, 0, W*0.5, H*0.5, W*0.9)
    bg.addColorStop(0,   "rgba(10,4,40,1)")
    bg.addColorStop(0.35,"rgba(5,2,22,1)")
    bg.addColorStop(0.7, "rgba(2,0,12,1)")
    bg.addColorStop(1,   "rgba(0,0,6,1)")
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, W, H)

    // Nebula 1 — blue-purple
    const nb1 = ctx.createRadialGradient(W*0.22, H*0.28, 0, W*0.22, H*0.28, W*0.38)
    nb1.addColorStop(0,   "rgba(40,20,120,0.38)")
    nb1.addColorStop(0.4, "rgba(20,10,80,0.2)")
    nb1.addColorStop(1,   "transparent")
    ctx.fillStyle = nb1
    ctx.fillRect(0, 0, W, H)

    // Nebula 2 — teal
    const nb2 = ctx.createRadialGradient(W*0.78, H*0.6, 0, W*0.78, H*0.6, W*0.32)
    nb2.addColorStop(0,   "rgba(0,60,100,0.3)")
    nb2.addColorStop(0.5, "rgba(0,40,70,0.14)")
    nb2.addColorStop(1,   "transparent")
    ctx.fillStyle = nb2
    ctx.fillRect(0, 0, W, H)

    // Nebula 3 — reddish
    const nb3 = ctx.createRadialGradient(W*0.6, H*0.15, 0, W*0.6, H*0.15, W*0.28)
    nb3.addColorStop(0,   "rgba(90,20,30,0.22)")
    nb3.addColorStop(0.6, "rgba(60,10,20,0.1)")
    nb3.addColorStop(1,   "transparent")
    ctx.fillStyle = nb3
    ctx.fillRect(0, 0, W, H)

    // Stars
    starsRef.current.forEach(star => {
      const phase = ((timestamp + star.twinkleOffset) % star.twinklePeriod) / star.twinklePeriod
      const twinkle = 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(phase * Math.PI * 2))
      const alpha = star.brightness * twinkle
      const [sr, sg, sb] = star.color
      ctx.beginPath()
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${sr},${sg},${sb},${alpha})`
      ctx.shadowColor = `rgba(${sr},${sg},${sb},${alpha * 0.6})`
      ctx.shadowBlur = star.r > 1.2 ? 6 : 2
      ctx.fill()
      ctx.shadowBlur = 0
    })

    // Milky way band
    const mw = ctx.createLinearGradient(0, H*0.2, W, H*0.85)
    mw.addColorStop(0,   "transparent")
    mw.addColorStop(0.3, "rgba(80,60,140,0.06)")
    mw.addColorStop(0.5, "rgba(60,50,120,0.1)")
    mw.addColorStop(0.7, "rgba(40,60,100,0.07)")
    mw.addColorStop(1,   "transparent")
    ctx.fillStyle = mw
    ctx.fillRect(0, 0, W, H)
  }

  /* ─── Draw circular HUD gauge with color ─── */
  function drawGauge(progress) {
    const cv = gaugeCanvasRef.current
    if (!cv) return
    const ctx = cv.getContext("2d")
    if (!ctx) return
    const w = cv.width, h = cv.height, cx = w/2, cy = h/2
    ctx.clearRect(0, 0, w, h)

    const col = lerpColor(progress)
    const outerR = w/2 - 6

    // Outer base ring
    ctx.beginPath()
    ctx.arc(cx, cy, outerR, 0, Math.PI * 2)
    ctx.strokeStyle = rgbStr(col, 0.12)
    ctx.lineWidth = 3
    ctx.stroke()

    // Tick marks — colored
    const tickCount = 48
    for (let i = 0; i < tickCount; i++) {
      const angle    = (i / tickCount) * Math.PI * 2 - Math.PI / 2
      const isMajor  = i % 4 === 0
      const innerRad = outerR - (isMajor ? 10 : 6)
      const x1 = cx + outerR * Math.cos(angle)
      const y1 = cy + outerR * Math.sin(angle)
      const x2 = cx + innerRad * Math.cos(angle)
      const y2 = cy + innerRad * Math.sin(angle)
      const frac = i / tickCount
      const lit  = frac <= progress
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.strokeStyle = lit
        ? rgbStr(col, isMajor ? 1 : 0.6)
        : rgbStr(col, isMajor ? 0.18 : 0.08)
      ctx.lineWidth = isMajor ? 2.5 : 1.5
      if (lit && isMajor) {
        ctx.shadowColor = rgbStr(col, 0.9)
        ctx.shadowBlur  = 10
      } else {
        ctx.shadowBlur = 0
      }
      ctx.stroke()
      ctx.shadowBlur = 0
    }

    // Progress arc
    if (progress > 0) {
      const arcR  = outerR - 16
      const start = -Math.PI / 2
      const end   = start + Math.PI * 2 * progress
      // gradient using color neighbors
      const colA = lerpColor(Math.max(0, progress - 0.3))
      const colB = lerpColor(progress)
      const g = ctx.createLinearGradient(0, 0, w, 0)
      g.addColorStop(0,   rgbStr(colA, 0.9))
      g.addColorStop(1,   rgbStr(colB, 1))

      ctx.beginPath()
      ctx.arc(cx, cy, arcR, start, end)
      ctx.strokeStyle = g
      ctx.lineWidth   = 6
      ctx.lineCap     = "round"
      ctx.shadowColor = rgbStr(col, 0.9)
      ctx.shadowBlur  = 24
      ctx.stroke()
      ctx.shadowBlur  = 0

      // Tip dot
      const dx = cx + arcR * Math.cos(end)
      const dy = cy + arcR * Math.sin(end)
      ctx.beginPath()
      ctx.arc(dx, dy, 5.5, 0, Math.PI * 2)
      ctx.fillStyle   = "#ffffff"
      ctx.shadowColor = rgbStr(col)
      ctx.shadowBlur  = 26
      ctx.fill()
      ctx.shadowBlur  = 0
    }

    // Inner decoration ring
    const innerR = outerR - 28
    ctx.beginPath()
    ctx.arc(cx, cy, innerR, 0, Math.PI * 2)
    ctx.strokeStyle = rgbStr(col, 0.22)
    ctx.lineWidth = 1
    ctx.stroke()

    // Inner fill
    ctx.beginPath()
    ctx.arc(cx, cy, innerR - 6, 0, Math.PI * 2)
    ctx.fillStyle = "rgba(0,4,14,0.92)"
    ctx.fill()
  }

  /* ─── Update segment colors ─── */
  function updateSegments(progress) {
    const litCount = Math.floor(progress * SEGS)
    const col = lerpColor(progress)
    segRefs.current.forEach((seg, i) => {
      if (!seg) return
      if (i < litCount) {
        const segP = i / (SEGS - 1)
        const segCol = lerpColor(segP * progress)
        seg.style.background = `linear-gradient(180deg, ${rgbStr(segCol,1)} 0%, ${rgbStr(segCol,0.7)} 60%, ${rgbStr(segCol,0.4)} 100%)`
        seg.style.borderColor = rgbStr(segCol, 0.7)
        seg.style.boxShadow = `0 0 12px ${rgbStr(segCol,0.85)}, 0 0 26px ${rgbStr(segCol,0.4)}, inset 0 1px 0 rgba(255,255,255,0.3)`
        seg.classList.add("sl-seg-on")
        seg.classList.remove("sl-seg-off")
      } else {
        seg.style.background = ""
        seg.style.borderColor = ""
        seg.style.boxShadow = ""
        seg.classList.remove("sl-seg-on")
        seg.classList.add("sl-seg-off")
      }
    })
    // Update connector and panel border color
    const connDot = document.querySelector(".sl-conn-dot")
    if (connDot) {
      connDot.style.background  = rgbStr(col)
      connDot.style.boxShadow   = `0 0 10px ${rgbStr(col)}, 0 0 22px ${rgbStr(col,0.5)}`
    }
    const panelDecs = document.querySelectorAll(".sl-panel-deco-tr,.sl-panel-deco-bl")
    panelDecs.forEach(el => {
      el.style.borderColor = rgbStr(col)
      el.style.boxShadow   = `0 0 14px ${rgbStr(col,0.5)}`
    })
    const hudLabel = document.querySelector(".sl-hud-label")
    if (hudLabel) {
      hudLabel.style.color = rgbStr(col)
      hudLabel.style.textShadow = `0 0 16px ${rgbStr(col,0.9)}, 0 0 36px ${rgbStr(col,0.4)}`
    }
    const pctEl = pctTextRef.current
    if (pctEl) {
      pctEl.style.textShadow = `0 0 20px ${rgbStr(col)}, 0 0 50px ${rgbStr(col,0.5)}`
    }
    const loadingTxt = document.querySelector(".sl-loading-txt")
    if (loadingTxt) {
      loadingTxt.style.color = rgbStr(col, 0.85)
    }
  }

  /* ─── Typewriter ─── */
  function typeWriter(el, text, speed, cb) {
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

  useEffect(() => {
    initSpace()

    let spaceRaf = 0
    function animateSpace(ts) {
      drawSpace(ts)
      spaceRaf = requestAnimationFrame(animateSpace)
    }
    spaceRaf = requestAnimationFrame(animateSpace)

    drawGauge(0)
    let t0 = null

    function phaseLoad(ts) {
      if (!t0) t0 = ts
      const raw = Math.min((ts - t0) / LOAD_DUR, 1)
      const p   = easeInOut(raw)
      const pct = Math.floor(p * 100)

      drawGauge(p)
      updateSegments(p)
      if (pctTextRef.current) pctTextRef.current.textContent = `${pct}%`

      if (raw < 1) { rafRef.current = requestAnimationFrame(phaseLoad); return }

      // All done — cinematic exit
      setTimeout(() => {
        // Flash effect
        const flash = document.createElement("div")
        flash.style.cssText = `
          position:fixed;inset:0;background:white;z-index:999;
          opacity:0;pointer-events:none;
          transition:opacity 0.18s ease;
        `
        document.body.appendChild(flash)
        requestAnimationFrame(() => {
          flash.style.opacity = "0.18"
          setTimeout(() => {
            flash.style.opacity = "0"
            setTimeout(() => flash.remove(), 300)
          }, 180)
        })

        ph1Ref.current?.classList.add("sl-out")

        setTimeout(() => {
          cancelAnimationFrame(spaceRaf) // stop space animation during welcome to save perf
          ph3Ref.current?.classList.add("sl-in")
          const nameEl = nameRef.current
          if (nameEl) {
            typeWriter(nameEl, FULL_NAME, 52, () => {
              nameEl.classList.remove("sl-cursor")
              buildSkills()
              setTimeout(() => {
                taglineRef.current?.classList.add("sl-show")
                setTimeout(() => {
                  containerRef.current?.classList.add("sl-exit")
                  setTimeout(onLoadingComplete, 900)
                }, 2400)
              }, 600)
            })
          }
        }, 500)
      }, 200)
    }

    rafRef.current = requestAnimationFrame(phaseLoad)

    const handleResize = () => {
      const cv = spaceCanvasRef.current
      if (cv) { cv.width = window.innerWidth; cv.height = window.innerHeight }
      initSpace()
    }
    window.addEventListener("resize", handleResize)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      cancelAnimationFrame(spaceRaf)
      window.removeEventListener("resize", handleResize)
    }
  }, [onLoadingComplete])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;600;700;900&display=swap');

        .sl-root {
          position:relative;
          width:100%; height:100vh;
          display:flex; align-items:center; justify-content:center;
          overflow:hidden; font-family:'Rajdhani',sans-serif;
          background:#00000a;
          transition:opacity 1s ease, transform 1s ease, filter 1s ease;
        }
        .sl-root.sl-exit {
          opacity:0; transform:scale(1.05) translateY(-10px);
          filter:blur(18px) brightness(2);
          pointer-events:none;
        }

        /* Space canvas */
        .sl-space-canvas {
          position:absolute; top:0; left:0; width:100%; height:100%;
          pointer-events:none; z-index:0;
        }

        /* Vignette */
        .sl-vignette {
          position:absolute; inset:0; pointer-events:none; z-index:1;
          background:radial-gradient(ellipse at center, transparent 20%, rgba(0,0,8,0.7) 85%);
        }

        /* Scanline */
        .sl-scanline { position:absolute; inset:0; overflow:hidden; pointer-events:none; z-index:2; }
        .sl-scanline::after {
          content:''; position:absolute; left:0; right:0; height:2px;
          background:linear-gradient(transparent,rgba(255,255,255,0.03),transparent);
          animation:sl-scan 6s linear infinite;
        }
        @keyframes sl-scan { 0%{transform:translateY(-10px)} 100%{transform:translateY(100vh)} }

        /* Content */
        .sl-content {
          position:relative; z-index:10;
          display:flex; flex-direction:column; align-items:center;
          width:100%; max-width:700px; padding:0 24px;
        }

        /* ── PHASE 1 ── */
        .sl-ph1 {
          display:flex; flex-direction:column; align-items:center; gap:28px;
          transition:opacity 0.7s cubic-bezier(0.4,0,0.2,1),
                     transform 0.7s cubic-bezier(0.4,0,0.2,1),
                     filter 0.7s ease;
          width:100%;
        }
        .sl-ph1.sl-out {
          opacity:0; transform:scale(0.94) translateY(-24px);
          filter:blur(8px); pointer-events:none; position:absolute;
        }

        @keyframes sl-blink { 0%,100%{opacity:0.45} 50%{opacity:1} }

        .sl-hud-label {
          font-family:'Orbitron',sans-serif; font-size:11px; font-weight:600;
          letter-spacing:0.52em; color:#00d4ff; text-transform:uppercase;
          text-shadow:0 0 16px rgba(0,212,255,0.9),0 0 36px rgba(0,212,255,0.4);
          animation:sl-blink 2s ease-in-out infinite;
          transition: color 0.5s ease, text-shadow 0.5s ease;
        }

        /* HUD row */
        .sl-hud-row { display:flex; align-items:center; gap:0; width:100%; }

        /* Gauge */
        .sl-gauge-wrap {
          position:relative; width:170px; height:170px; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
        }
        .sl-gauge-canvas { position:absolute; top:0; left:0; }
        .sl-gauge-pct {
          position:relative; z-index:2;
          font-family:'Orbitron',sans-serif; font-size:28px; font-weight:900;
          color:#ffffff; letter-spacing:0.04em; text-align:center; line-height:1;
          transition: text-shadow 0.4s ease;
        }
        .sl-gauge-glow {
          position:absolute; width:110px; height:110px; border-radius:50%;
          background:radial-gradient(circle,rgba(0,212,255,0.15) 0%,transparent 70%);
          filter:blur(14px); animation:sl-blink 3s ease-in-out infinite;
          pointer-events:none; transition:background 0.5s ease;
        }

        /* Connector */
        .sl-connector {
          display:flex; flex-direction:column; justify-content:center; gap:3px;
          margin:0 2px; flex-shrink:0; z-index:2;
        }
        .sl-conn-line {
          width:24px; height:2px;
          background:linear-gradient(90deg,rgba(0,212,255,0.7),rgba(0,212,255,0.1));
        }
        .sl-conn-dot {
          width:7px; height:7px; border-radius:50%;
          background:#00d4ff; margin:0 auto;
          box-shadow:0 0 10px #00d4ff,0 0 20px rgba(0,212,255,0.6);
          animation:sl-blink 1.1s ease-in-out infinite;
          transition: background 0.4s ease, box-shadow 0.4s ease;
        }

        /* Bar panel */
        .sl-bar-panel { flex:1; position:relative; }
        .sl-panel-deco-tr {
          position:absolute; top:-2px; right:-2px; width:22px; height:22px;
          border-top:2px solid #00d4ff; border-right:2px solid #00d4ff;
          box-shadow:5px -5px 14px rgba(0,212,255,0.45);
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .sl-panel-deco-bl {
          position:absolute; bottom:-2px; left:-2px; width:22px; height:22px;
          border-bottom:2px solid #00d4ff; border-left:2px solid #00d4ff;
          box-shadow:-5px 5px 14px rgba(0,212,255,0.45);
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .sl-panel-cap {
          position:absolute; top:0; left:0; bottom:0; width:16px;
          border-top:2px solid rgba(0,212,255,0.45);
          border-bottom:2px solid rgba(0,212,255,0.45);
          background:rgba(0,212,255,0.04);
          clip-path:polygon(0 8px,8px 0,100% 0,100% 100%,8px 100%,0 calc(100% - 8px));
        }
        .sl-bar-inner {
          border:2px solid rgba(0,212,255,0.3);
          border-left:none; border-radius:0 8px 8px 0;
          padding:16px 22px 16px 30px;
          background:rgba(0,4,16,0.72);
          backdrop-filter:blur(6px);
          box-shadow:0 0 40px rgba(0,212,255,0.06), inset 0 0 24px rgba(0,212,255,0.025);
          position:relative; overflow:hidden;
        }
        .sl-bar-inner::before {
          content:''; position:absolute; top:0; left:0; right:0; height:1px;
          background:linear-gradient(90deg,transparent,rgba(0,212,255,0.7),transparent);
        }
        .sl-bar-inner::after {
          content:''; position:absolute; bottom:0; left:0; right:0; height:1px;
          background:linear-gradient(90deg,transparent,rgba(0,212,255,0.3),transparent);
        }

        .sl-segs {
          display:grid; grid-template-columns:repeat(12,1fr); gap:5px;
          margin-bottom:12px;
        }
        .sl-seg {
          height:34px; border-radius:3px;
          position:relative; overflow:hidden;
          transition: background 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .sl-seg-off {
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.08);
          box-shadow:none;
        }
        .sl-seg-on {
          border:1px solid;
        }
        .sl-seg-on::after {
          content:''; position:absolute; top:0; left:0; right:0; height:40%;
          background:linear-gradient(180deg,rgba(255,255,255,0.3),transparent);
          border-radius:3px 3px 0 0;
        }

        .sl-bar-footer {
          display:flex; align-items:center; justify-content:space-between;
        }
        .sl-loading-txt {
          font-family:'Orbitron',sans-serif; font-size:10px; font-weight:600;
          letter-spacing:0.48em; color:rgba(0,212,255,0.8); text-transform:uppercase;
          animation:sl-blink 1.4s ease-in-out infinite;
          transition: color 0.4s ease;
        }
        .sl-bar-sub {
          font-family:'Orbitron',sans-serif; font-size:9px;
          color:rgba(255,255,255,0.25); letter-spacing:0.25em;
        }
        .sl-stripe-deco {
          position:absolute; right:0; top:0; bottom:0; width:30px;
          display:flex; gap:3px; align-items:stretch; padding:16px 7px;
          overflow:hidden;
        }
        .sl-stripe { flex:1; border-radius:1px; background:rgba(255,255,255,0.06); }

        /* ── PHASE 3 ── */
        .sl-ph3 {
          opacity:0; transform:translateY(28px) scale(0.97);
          position:absolute; width:100%;
          display:flex; flex-direction:column; align-items:center;
          transition:opacity 1s cubic-bezier(0.16,1,0.3,1),
                     transform 1s cubic-bezier(0.16,1,0.3,1);
        }
        .sl-ph3.sl-in { opacity:1; transform:translateY(0) scale(1); position:relative; }

        .sl-welcome-line {
          font-family:'Orbitron',sans-serif; font-size:10px; font-weight:400;
          letter-spacing:0.55em; color:rgba(0,212,255,0.85); text-transform:uppercase;
          margin-bottom:12px; text-shadow:0 0 18px rgba(0,212,255,0.55);
          animation:sl-blink 3s ease-in-out infinite;
        }
        .sl-name {
          font-family:'Orbitron',sans-serif;
          font-size:clamp(16px,4vw,26px); font-weight:700;
          color:#ffffff; letter-spacing:0.07em; text-align:center;
          text-shadow:0 0 30px rgba(0,212,255,0.8),0 0 70px rgba(0,212,255,0.35);
          margin-bottom:8px; min-height:1.5em;
        }
        .sl-cursor::after { content:'|'; color:#00d4ff; animation:sl-blink 0.7s ease-in-out infinite; }
        .sl-name-sub {
          font-family:'Rajdhani',sans-serif; font-size:13px; font-weight:500;
          letter-spacing:0.3em; color:rgba(255,255,255,0.48); text-transform:uppercase;
          margin-bottom:26px;
        }
        .sl-divline {
          width:180px; height:1px; margin-bottom:22px;
          background:linear-gradient(90deg,transparent,rgba(0,212,255,0.6),transparent);
        }
        .sl-expertise-label {
          font-family:'Orbitron',sans-serif; font-size:9px; font-weight:600;
          letter-spacing:0.5em; color:rgba(0,212,255,0.55); text-transform:uppercase;
          margin-bottom:16px;
        }
        .sl-skills-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; width:100%; }

        @keyframes sl-card-in { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
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
          font-weight:500; letter-spacing:0.42em; color:rgba(0,212,255,0.42);
          text-transform:uppercase; text-align:center;
          opacity:0; transition:opacity 1.2s ease;
        }
        .sl-tagline.sl-show { opacity:1; }
      `}</style>

      <div ref={containerRef} className="sl-root">
        {/* Space background canvas */}
        <canvas ref={spaceCanvasRef} className="sl-space-canvas" />
        <div className="sl-vignette" />
        <div className="sl-scanline" />

        <div className="sl-content">

          {/* ── Phase 1: HUD Loader ── */}
          <div ref={ph1Ref} className="sl-ph1">
            <div className="sl-hud-label">◈ System Initialization ◈</div>

            <div className="sl-hud-row">

              {/* Circular Gauge */}
              <div className="sl-gauge-wrap">
                <div className="sl-gauge-glow" />
                <canvas ref={gaugeCanvasRef} className="sl-gauge-canvas" width={170} height={170} />
                <div className="sl-gauge-pct">
                  <span ref={pctTextRef}>0%</span>
                </div>
              </div>

              {/* Connector */}
              <div className="sl-connector">
                <div className="sl-conn-line" />
                <div className="sl-conn-dot" />
                <div className="sl-conn-line" />
              </div>

              {/* Segmented Bar */}
              <div className="sl-bar-panel">
                <div className="sl-panel-cap" />
                <div className="sl-bar-inner">
                  <div className="sl-segs">
                    {Array.from({ length: SEGS }).map((_, i) => (
                      <div
                        key={i}
                        className="sl-seg sl-seg-off"
                        ref={el => { segRefs.current[i] = el }}
                      />
                    ))}
                  </div>
                  <div className="sl-bar-footer">
                    <div className="sl-loading-txt">Loading....</div>
                    <div className="sl-bar-sub">MK-VII SYSTEM</div>
                  </div>
                  <div className="sl-stripe-deco">
                    <div className="sl-stripe" />
                    <div className="sl-stripe" />
                    <div className="sl-stripe" />
                  </div>
                </div>
                <div className="sl-panel-deco-tr" />
                <div className="sl-panel-deco-bl" />
              </div>

            </div>
          </div>

          {/* ── Phase 3: Welcome ── */}
          <div ref={ph3Ref} className="sl-ph3">
            <div className="sl-welcome-line">◈ Welcome to my portfolio ◈</div>
            <div ref={nameRef} className="sl-name sl-cursor" />
            <div className="sl-name-sub">Expert Specialize</div>
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

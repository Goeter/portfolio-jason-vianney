"use client"

/**
 * SplashLoader.tsx — Jason Vianney Sugiarto Portfolio
 * ─────────────────────────────────────────────────────────────────────
 *  Phase 0  JARVIS boot screen  (green terminal, scanlines, boot log)
 *  Phase 1  MK-VII loading bar  0 → 50%  (coloured cells + progress)
 *  Phase 1b Particle burst → Arc Reactor takes over
 *  Phase 2  Arc Reactor  0 → 100%  then "ready to display"
 *  Phase 3  Dust-dissolve exit
 *  Phase 4  Deep-space welcome  → typewriter name → expertise cards
 *  Phase 5  Smooth fade → calls onLoadingComplete()
 * ─────────────────────────────────────────────────────────────────────
 *  Zero external deps — pure React refs + CSS keyframes + Canvas 2D
 *  Import Google Fonts in your global CSS or _document.tsx:
 *    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@500;600;700&display=swap');
 * ─────────────────────────────────────────────────────────────────────
 */

import { useCallback, useEffect, useRef } from "react"

/* ─── types ─── */
interface Props {
  /** Called once the entire splash has completed */
  onLoadingComplete: () => void
}

/* ─── constants ─── */
const FULL_NAME = "Jason Vianney Sugiarto"

/**
 * MK-VII cell gradient stops — red → orange → yellow → olive → silver → dark.
 * Matches the reference photo exactly.
 */
const CELL_COLORS: [string, string][] = [
  ["#b01818", "#ff2828"],
  ["#b83010", "#ff4510"],
  ["#b85000", "#ff6a00"],
  ["#b87200", "#ff9900"],
  ["#a09000", "#ffc800"],
  ["#90a000", "#c8d800"],
  ["#80a800", "#b0e000"],
  ["#88a810", "#bcd010"],
  ["#9a9a9a", "#d4d4d4"],
  ["#444455", "#7878a0"],
  ["#252535", "#454560"],
]

const BOOT_LINES = [
  "[ OK ]  Loading kernel modules...",
  "[ OK ]  Network interface online",
  "[ OK ]  Arc reactor driver v9.3.1",
  "[ OK ]  JARVIS neural core initialized",
  "[ OK ]  Portfolio system — ready",
]

const LOAD_MSGS = [
  "Initializing system modules...",
  "Loading asset pipeline...",
  "Compiling render matrix...",
]

const ARC_MSGS = [
  "Charging core matrix...",
  "Plasma conduits online...",
  "Power output: 3000%",
  "Reactor fully charged...",
]

const SKILLS = [
  { label: "Front-end Dev",         icon: "💻", grad: "rgba(0,212,255,.22),rgba(59,130,246,.22)"   },
  { label: "System Analyst",        icon: "⚙️",  grad: "rgba(168,85,247,.22),rgba(236,72,153,.22)" },
  { label: "UI/UX Design",          icon: "🎨", grad: "rgba(251,146,60,.22),rgba(236,72,153,.22)"  },
  { label: "Data Analyst",          icon: "📊", grad: "rgba(52,211,153,.22),rgba(16,185,129,.22)"  },
  { label: "Math & English\nTutor", icon: "📐", grad: "rgba(250,204,21,.22),rgba(245,158,11,.22)"  },
]

/* ─── easing ─── */
const easeOut  = (t: number) => 1 - Math.pow(1 - t, 3)
const easeOut5 = (t: number) => 1 - Math.pow(1 - t, 5)

/* ══════════════════════════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════════════════════════ */
export default function SplashLoader({ onLoadingComplete }: Props) {

  /* stage refs */
  const rootRef       = useRef<HTMLDivElement>(null)
  const s0Ref         = useRef<HTMLDivElement>(null)   // boot
  const s1Ref         = useRef<HTMLDivElement>(null)   // mk-vii bar
  const s2Ref         = useRef<HTMLDivElement>(null)   // arc reactor
  const s3Ref         = useRef<HTMLDivElement>(null)   // space welcome

  /* boot */
  const bBarRef       = useRef<HTMLDivElement>(null)
  const bLinesRef     = useRef<HTMLDivElement>(null)

  /* loading bar */
  const ldPctRef      = useRef<HTMLDivElement>(null)
  const ldSubRef      = useRef<HTMLDivElement>(null)
  const ldBarRef      = useRef<HTMLDivElement>(null)
  const ldMsgRef      = useRef<HTMLDivElement>(null)
  const ldCellsRef    = useRef<HTMLDivElement>(null)

  /* arc */
  const arcCvRef      = useRef<HTMLCanvasElement>(null)
  const arcBarRef     = useRef<HTMLDivElement>(null)
  const arcPctRef     = useRef<HTMLSpanElement>(null)
  const arcMsgRef     = useRef<HTMLDivElement>(null)

  /* space */
  const spNameRef     = useRef<HTMLDivElement>(null)
  const spSkillsRef   = useRef<HTMLDivElement>(null)
  const spStarsRef    = useRef<HTMLDivElement>(null)

  /* particle layers */
  const burstRef      = useRef<HTMLDivElement>(null)
  const dustRef       = useRef<HTMLDivElement>(null)

  const rafRef        = useRef<number>(0)

  /* ─────────────────────────────────────────
     helpers
  ───────────────────────────────────────── */

  /** Show a stage div */
  const showStage = (el: HTMLDivElement | null) => {
    if (!el) return
    el.style.transition = "opacity .7s ease"
    el.style.opacity    = "1"
    el.style.pointerEvents = "auto"
  }

  /** Hide a stage div, optionally with blur */
  const hideStage = (el: HTMLDivElement | null, blur = false) => {
    if (!el) return
    el.style.transition = blur
      ? "opacity .8s ease, filter .8s ease"
      : "opacity .65s ease"
    el.style.opacity = "0"
    if (blur) el.style.filter = "blur(7px)"
    el.style.pointerEvents = "none"
  }

  /* ─── Canvas arc ring ─── */
  const drawArc = useCallback((progress: number) => {
    const cv  = arcCvRef.current
    if (!cv)  return
    const ctx = cv.getContext("2d")
    if (!ctx) return
    const { width: w, height: h } = cv
    const cx = w / 2, cy = h / 2, r = w / 2 - 5
    ctx.clearRect(0, 0, w, h)

    // background track
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.strokeStyle = "rgba(0,212,255,0.1)"
    ctx.lineWidth   = 4
    ctx.stroke()

    if (progress <= 0) return

    const start = -Math.PI / 2
    const end   = start + Math.PI * 2 * progress

    const g = ctx.createLinearGradient(0, 0, w, 0)
    g.addColorStop(0,   "#003fff")
    g.addColorStop(.5,  "#00d4ff")
    g.addColorStop(1,   "#00ffcc")

    ctx.beginPath()
    ctx.arc(cx, cy, r, start, end)
    ctx.strokeStyle  = g
    ctx.lineWidth    = 4
    ctx.lineCap      = "round"
    ctx.shadowColor  = "#00d4ff"
    ctx.shadowBlur   = 18
    ctx.stroke()
    ctx.shadowBlur   = 0

    // glowing tip dot
    const dx = cx + r * Math.cos(end)
    const dy = cy + r * Math.sin(end)
    ctx.beginPath()
    ctx.arc(dx, dy, 4.5, 0, Math.PI * 2)
    ctx.fillStyle   = "#ffffff"
    ctx.shadowColor = "#00d4ff"
    ctx.shadowBlur  = 20
    ctx.fill()
    ctx.shadowBlur  = 0
  }, [])

  /* ─── MK-VII cells ─── */
  const updateCells = useCallback((pct: number) => {
    const wrap = ldCellsRef.current
    if (!wrap) return
    const cells  = wrap.querySelectorAll<HTMLDivElement>(".sl-cell")
    const onCount = Math.round((pct / 100) * cells.length)
    cells.forEach((cell, i) => {
      const inner = cell.querySelector<HTMLDivElement>(".sl-ci")
      if (i < onCount) {
        cell.classList.add("on")
        if (inner) {
          inner.style.background = `linear-gradient(160deg,${CELL_COLORS[i][1]},${CELL_COLORS[i][0]})`
          inner.style.boxShadow  = `0 0 14px ${CELL_COLORS[i][1]}55 inset`
        }
      } else {
        cell.classList.remove("on")
        if (inner) { inner.style.background = ""; inner.style.boxShadow = "" }
      }
    })
  }, [])

  /* ─── Particle burst (at 50%) ─── */
  const spawnBurst = useCallback(() => {
    const layer = burstRef.current
    if (!layer) return
    for (let i = 0; i < 80; i++) {
      const p     = document.createElement("div")
      const angle = Math.random() * Math.PI * 2
      const dist  = 60 + Math.random() * 200
      p.style.cssText = `
        position:absolute;border-radius:50%;pointer-events:none;
        left:50%;top:50%;
        width:${2 + Math.random() * 5}px;
        height:${2 + Math.random() * 5}px;
        background:${Math.random() > .5 ? "#00d4ff" : "#ffffff"};
        animation:sl-pb ${.4 + Math.random() * .8}s cubic-bezier(.16,1,.3,1) forwards;
        --x:${Math.cos(angle) * dist}px;
        --y:${Math.sin(angle) * dist}px;
      `
      layer.appendChild(p)
      setTimeout(() => p.remove(), 1400)
    }
  }, [])

  /* ─── Dust dissolve ─── */
  const dustDissolve = useCallback((cb: () => void) => {
    const layer   = dustRef.current
    const root    = rootRef.current
    if (!layer || !root) { cb(); return }
    const rootR   = root.getBoundingClientRect()
    const w       = rootR.width, h = rootR.height

    for (let i = 0; i < 110; i++) {
      const p     = document.createElement("div")
      const x     = Math.random() * w
      const y     = Math.random() * h
      const angle = Math.random() * Math.PI * 2
      const dist  = 80 + Math.random() * 220
      p.style.cssText = `
        position:absolute;border-radius:50%;pointer-events:none;
        left:${x}px;top:${y}px;
        width:${2 + Math.random() * 6}px;
        height:${2 + Math.random() * 6}px;
        background:rgba(0,212,255,${.3 + Math.random() * .5});
        --dx:${Math.cos(angle) * dist}px;
        --dy:${Math.sin(angle) * dist - 80}px;
        animation:sl-dust ${.7 + Math.random() * .9}s cubic-bezier(.22,1,.36,1) ${Math.random() * .35}s forwards;
      `
      layer.appendChild(p)
    }
    setTimeout(() => { layer.innerHTML = ""; cb() }, 1700)
  }, [])

  /* ─── Typewriter ─── */
  const typeWriter = useCallback((
    el: HTMLDivElement,
    text: string,
    speed: number,
    cb?: () => void
  ) => {
    el.textContent = ""
    let i = 0
    const timer = setInterval(() => {
      el.textContent += text[i++]
      if (i >= text.length) { clearInterval(timer); cb?.() }
    }, speed)
  }, [])

  /* ─── Star field ─── */
  const buildStars = useCallback(() => {
    const wrap = spStarsRef.current
    if (!wrap) return
    wrap.innerHTML = ""
    for (let i = 0; i < 160; i++) {
      const s  = document.createElement("div")
      const sz = Math.random() < .1 ? 2.5 : Math.random() < .3 ? 1.5 : 1
      s.style.cssText = `
        position:absolute;border-radius:50%;background:#fff;
        width:${sz}px;height:${sz}px;
        left:${Math.random() * 100}%;top:${Math.random() * 100}%;
        --op:${.2 + Math.random() * .7};
        animation:sl-twinkle ${2 + Math.random() * 5}s ease-in-out ${Math.random() * 5}s infinite;
      `
      wrap.appendChild(s)
    }
  }, [])

  /* ─── Skill cards ─── */
  const buildSkills = useCallback(() => {
    const grid = spSkillsRef.current
    if (!grid) return
    grid.innerHTML = ""
    SKILLS.forEach((s, i) => {
      const card = document.createElement("div")
      card.className = "sl-sp-card"
      card.innerHTML = `
        <div class="sl-sp-icon" style="background:linear-gradient(135deg,${s.grad})">${s.icon}</div>
        <div class="sl-sp-nm">${s.label.replace("\n", "<br/>")}</div>
      `
      grid.appendChild(card)
      setTimeout(() => card.classList.add("sl-show"), i * 140)
    })
  }, [])

  /* ══════════════════════════════════════════════════════════════════
     ORCHESTRATOR
  ══════════════════════════════════════════════════════════════════ */
  useEffect(() => {
    drawArc(0)
    buildStars()

    /* ── Phase 0: BOOT ── */
    const linesWrap = bLinesRef.current
    const bootBar   = bBarRef.current
    if (linesWrap) linesWrap.innerHTML = ""

    const lineEls: HTMLDivElement[] = BOOT_LINES.map(txt => {
      const d = document.createElement("div")
      d.className  = "sl-b-line"
      d.textContent = txt
      linesWrap?.appendChild(d)
      return d
    })

    let bootPct = 0, lineIdx = 0
    const bootInt = setInterval(() => {
      bootPct = Math.min(bootPct + (2.5 + Math.random() * 5), 100)
      if (bootBar) bootBar.style.width = bootPct + "%"
      if (lineIdx < lineEls.length && bootPct > lineIdx * 22)
        lineEls[lineIdx++].classList.add("sl-show")

      if (bootPct >= 100) {
        clearInterval(bootInt)
        setTimeout(() => {
          hideStage(s0Ref.current, true)
          setTimeout(startLoading, 800)
        }, 450)
      }
    }, 58)

    /* ── Phase 1: MK-VII bar  0 → 50% ── */
    function startLoading() {
      updateCells(0)
      showStage(s1Ref.current)
      let t0: number | null = null

      function raf1(ts: number) {
        if (!t0) t0 = ts
        const raw  = Math.min((ts - t0) / 2400, 1)
        const pct  = Math.floor(easeOut(raw) * 50)

        if (ldPctRef.current) ldPctRef.current.textContent = pct + "%"
        if (ldBarRef.current) ldBarRef.current.style.width = pct + "%"
        if (ldSubRef.current) ldSubRef.current.textContent =
          pct < 15 ? "Initiating" : pct < 35 ? "Loading" : "Compiling"
        if (ldMsgRef.current) ldMsgRef.current.textContent =
          LOAD_MSGS[Math.min(Math.floor(raw * 2.5), LOAD_MSGS.length - 1)]
        updateCells(pct)

        if (raw < 1) { rafRef.current = requestAnimationFrame(raf1); return }

        /* Hit 50% */
        if (ldPctRef.current) ldPctRef.current.textContent = "50%"
        if (ldSubRef.current) ldSubRef.current.textContent = "Arc Reactor Detected"
        if (ldMsgRef.current) ldMsgRef.current.textContent = "ARC REACTOR DETECTED — switching mode..."
        updateCells(50)

        setTimeout(() => {
          spawnBurst()
          setTimeout(() => {
            hideStage(s1Ref.current)
            setTimeout(startArc, 500)
          }, 450)
        }, 700)
      }
      rafRef.current = requestAnimationFrame(raf1)
    }

    /* ── Phase 2: Arc Reactor  0 → 100% ── */
    function startArc() {
      drawArc(0)
      showStage(s2Ref.current)
      let t0: number | null = null

      function rafArc(ts: number) {
        if (!t0) t0 = ts
        const raw = Math.min((ts - t0) / 2400, 1)
        const p   = easeOut5(raw)

        drawArc(p)
        if (arcBarRef.current) arcBarRef.current.style.width = (p * 100) + "%"
        if (arcPctRef.current) arcPctRef.current.textContent = Math.floor(p * 100) + "%"
        if (arcMsgRef.current) arcMsgRef.current.textContent =
          ARC_MSGS[Math.min(Math.floor(raw * ARC_MSGS.length), ARC_MSGS.length - 1)]

        if (raw < 1) { rafRef.current = requestAnimationFrame(rafArc); return }

        if (arcMsgRef.current) arcMsgRef.current.textContent = "Data process: ready to display"

        /* Dust-dissolve exit */
        setTimeout(() => {
          dustDissolve(() => {
            hideStage(s2Ref.current)
            setTimeout(startSpace, 200)
          })
        }, 900)
      }
      rafRef.current = requestAnimationFrame(rafArc)
    }

    /* ── Phase 3: Space Welcome ── */
    function startSpace() {
      const spEl = s3Ref.current
      if (spEl) {
        spEl.style.transition  = "opacity 1.1s ease"
        spEl.style.opacity     = "1"
        spEl.style.pointerEvents = "auto"
        // trigger CSS class for .sl-sp-content reveal
        requestAnimationFrame(() => spEl.classList.add("sl-active"))
      }

      setTimeout(() => {
        const nameEl = spNameRef.current
        if (!nameEl) return
        nameEl.classList.add("sl-cursor")
        typeWriter(nameEl, FULL_NAME, 55, () => {
          nameEl.classList.remove("sl-cursor")
          buildSkills()

          /* After cards appear, fade everything out → home */
          setTimeout(() => {
            const el = s3Ref.current
            if (el) {
              el.style.transition = "opacity 1.3s ease"
              el.style.opacity    = "0"
            }
            setTimeout(onLoadingComplete, 1400)
          }, 3200)
        })
      }, 700)
    }

    return () => {
      cancelAnimationFrame(rafRef.current)
      clearInterval(bootInt)
    }
  }, [onLoadingComplete, drawArc, updateCells, spawnBurst, dustDissolve, typeWriter, buildStars, buildSkills])

  /* ══════════════════════════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════════════════════════ */
  return (
    <>
      <style>{`
        /* ── Fonts (add this to your globals.css instead if preferred) ── */
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@500;600;700&display=swap');

        /* ══════════════════════════════════
           KEYFRAMES
        ══════════════════════════════════ */
        @keyframes sl-scan    { 0%{top:-4px} 100%{top:100%} }
        @keyframes sl-blink   { 0%,100%{opacity:.4} 50%{opacity:1} }
        @keyframes sl-cw      { to{transform:rotate(360deg)} }
        @keyframes sl-ccw     { to{transform:rotate(-360deg)} }
        @keyframes sl-pulse   { 0%,100%{transform:scale(1);opacity:.3} 50%{transform:scale(1.09);opacity:.65} }
        @keyframes sl-twinkle { 0%,100%{opacity:var(--op,.3)} 50%{opacity:1} }
        @keyframes sl-card-in { from{opacity:0;transform:translateY(13px)} to{opacity:1;transform:translateY(0)} }
        @keyframes sl-shimmer { 0%{background-position:-300% 0} 100%{background-position:300% 0} }
        @keyframes sl-pb      { 0%{opacity:1;transform:translate(-50%,-50%) scale(1)} 100%{opacity:0;transform:translate(calc(-50% + var(--x)),calc(-50% + var(--y))) scale(0)} }
        @keyframes sl-dust    { 0%{opacity:1;transform:translate(0,0) scale(1)} 100%{opacity:0;transform:translate(var(--dx),var(--dy)) scale(.1)} }
        @keyframes sl-glow-t  { 0%,100%{text-shadow:0 0 10px rgba(0,255,120,.5)} 50%{text-shadow:0 0 30px rgba(0,255,120,1),0 0 60px rgba(0,255,120,.4)} }
        @keyframes sl-reveal  { from{clip-path:inset(0 100% 0 0)} to{clip-path:inset(0 0% 0 0)} }
        @keyframes sl-flicker { 0%,100%{opacity:1} 42%{opacity:.95} 44%{opacity:.8} 46%{opacity:.95} }
        @keyframes sl-linein  { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:translateX(0)} }
        @keyframes sl-nbpulse { 0%,100%{opacity:.18} 50%{opacity:.35} }
        @keyframes sl-cellin  { 0%{left:-70%} 100%{left:120%} }
        @keyframes sl-welcomein { from{opacity:0;letter-spacing:.9em} to{opacity:1;letter-spacing:.52em} }
        @keyframes sl-namein    { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }

        /* ══════════════════════════════════
           ROOT
        ══════════════════════════════════ */
        .sl-root {
          position: fixed; inset: 0; overflow: hidden;
          font-family: 'Rajdhani', sans-serif;
          z-index: 9999;
        }

        /* Shared stage base */
        .sl-stage {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          will-change: opacity;
        }

        /* Particle overlay layers */
        .sl-burst, .sl-dust-layer {
          position: fixed; inset: 0;
          pointer-events: none; z-index: 10002; overflow: hidden;
        }

        /* ══════════════════════════════════
           STAGE 0 — BOOT
        ══════════════════════════════════ */
        .sl-s0 { background: #000; z-index: 100; }

        /* CRT scanlines texture */
        .sl-boot-crt {
          position: absolute; inset: 0; pointer-events: none;
          background: repeating-linear-gradient(
            0deg,
            transparent, transparent 3px,
            rgba(0,255,120,.012) 3px, rgba(0,255,120,.012) 4px
          );
          animation: sl-flicker .15s steps(1) infinite;
        }
        .sl-boot-crt::after {
          content: ''; position: absolute; left: 0; right: 0;
          height: 3px; top: -4px;
          background: linear-gradient(transparent, rgba(0,255,120,.08), transparent);
          animation: sl-scan 4s linear infinite;
        }

        /* Corner brackets */
        .sl-bc { position: absolute; width: 38px; height: 38px; border-color: rgba(0,200,90,.4); border-style: solid; }
        .sl-bc.tl { top:18px; left:18px; border-width:1.5px 0 0 1.5px; }
        .sl-bc.tr { top:18px; right:18px; border-width:1.5px 1.5px 0 0; }
        .sl-bc.bl { bottom:18px; left:18px; border-width:0 0 1.5px 1.5px; }
        .sl-bc.br { bottom:18px; right:18px; border-width:0 1.5px 1.5px 0; }

        .sl-boot-badge {
          font-family: 'Orbitron', sans-serif;
          font-size: 9px; font-weight: 600; letter-spacing: .5em;
          color: rgba(0,200,90,.75); text-transform: uppercase;
          margin-bottom: 8px; animation: sl-blink 2.2s ease-in-out infinite;
        }
        .sl-boot-title {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(24px,4.5vw,36px); font-weight: 900;
          color: #00ff88; letter-spacing: .15em;
          clip-path: inset(0 100% 0 0);
          animation:
            sl-reveal .9s cubic-bezier(.22,1,.36,1) .3s forwards,
            sl-glow-t 2s ease-in-out 1.2s infinite;
        }
        .sl-boot-sub {
          font-size: 10px; letter-spacing: .45em;
          color: rgba(0,255,120,.4); text-transform: uppercase;
          margin-top: 7px; opacity: 0;
          animation: sl-namein .4s ease .9s forwards;
        }
        .sl-boot-divider {
          width: 220px; height: 1px;
          background: linear-gradient(90deg,transparent,rgba(0,200,90,.4),transparent);
          margin: 20px 0 16px;
        }
        .sl-boot-lines { display: flex; flex-direction: column; gap: 7px; width: min(360px,88%); }
        .sl-b-line {
          font-size: 11.5px; font-weight: 500; letter-spacing: .07em;
          color: rgba(0,255,120,.6);
          opacity: 0; display: flex; align-items: center; gap: 8px;
        }
        .sl-b-line.sl-show { animation: sl-linein .3s ease forwards; }
        .sl-b-line::before { content: '›'; color: #00ff88; font-size: 15px; flex-shrink: 0; }
        .sl-boot-bar-wrap {
          margin-top: 18px; width: min(360px,88%);
          height: 2px; background: rgba(0,255,120,.1); border-radius: 1px; overflow: hidden;
        }
        .sl-boot-bar {
          height: 100%; width: 0%; background: #00ff88;
          box-shadow: 0 0 10px #00ff88; transition: width .06s linear;
        }

        /* ══════════════════════════════════
           STAGE 1 — MK-VII LOADING
        ══════════════════════════════════ */
        .sl-s1 {
          background: linear-gradient(180deg,#020f1a,#010a12 60%,#000d18);
          z-index: 90; opacity: 0; pointer-events: none;
        }
        .sl-s1-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(0,212,255,.028) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,.028) 1px, transparent 1px);
          background-size: 52px 52px;
        }
        .sl-s1-vig {
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse at center, transparent 25%, #010a12 82%);
        }
        .sl-s1-scan { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
        .sl-s1-scan::after {
          content: ''; position: absolute; left: 0; right: 0;
          height: 2px; top: -4px;
          background: linear-gradient(transparent, rgba(0,212,255,.05), transparent);
          animation: sl-scan 5.5s linear infinite;
        }

        /* HUD frame */
        .sl-frame {
          position: relative; width: min(590px,95%);
          border: 1px solid rgba(0,212,255,.13); border-radius: 5px;
          padding: 24px 28px 22px;
          background: rgba(0,10,20,.62); backdrop-filter: blur(12px);
          z-index: 2;
        }
        .sl-frame::before, .sl-frame::after {
          content: ''; position: absolute;
          width: 22px; height: 22px;
          border-color: rgba(0,212,255,.4); border-style: solid;
        }
        .sl-frame::before { top:-1px; left:-1px; border-width:2px 0 0 2px; border-top-left-radius:5px; }
        .sl-frame::after  { bottom:-1px; right:-1px; border-width:0 2px 2px 0; border-bottom-right-radius:5px; }

        .sl-f-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; }
        .sl-f-hl {
          font-family:'Orbitron',sans-serif; font-size:10px; font-weight:600;
          letter-spacing:.48em; color:rgba(0,212,255,.6); text-transform:uppercase;
          animation:sl-blink 2s ease-in-out infinite;
        }
        .sl-f-hr {
          font-family:'Orbitron',sans-serif; font-size:10px; font-weight:700;
          letter-spacing:.38em; color:rgba(255,200,50,.72); text-transform:uppercase;
        }

        /* Cells */
        .sl-cells { display:flex; gap:7px; justify-content:center; margin-bottom:22px; }
        .sl-cell {
          width: clamp(36px,6.2vw,48px); height: clamp(42px,7.5vw,56px);
          border-radius: 9px; border: 1px solid rgba(255,255,255,.06);
          background: rgba(4,14,28,.9);
          position: relative; overflow: hidden;
          transition: border-color .35s cubic-bezier(.16,1,.3,1);
        }
        .sl-cell.on { border-color: rgba(255,200,50,.3); }
        .sl-ci {
          position: absolute; inset: 3px; border-radius: 7px;
          transition: background .35s cubic-bezier(.16,1,.3,1), box-shadow .35s;
        }
        .sl-cs {
          position: absolute; top:0; left:-70%; width:40%; height:100%;
          background: linear-gradient(90deg,transparent,rgba(255,255,255,.16),transparent);
          transform: skewX(-15deg); opacity:0;
        }
        .sl-cell.on .sl-cs { opacity:1; animation:sl-cellin 1.8s ease-in-out infinite; }

        /* Pct */
        .sl-f-pct-row { display:flex; align-items:baseline; gap:10px; margin-bottom:10px; }
        .sl-f-pct {
          font-family:'Orbitron',sans-serif;
          font-size: clamp(34px,5.5vw,46px); font-weight:900;
          color:#fff; letter-spacing:.06em;
          text-shadow: 0 0 22px rgba(255,200,50,.85), 0 0 50px rgba(255,200,50,.4);
          line-height:1;
        }
        .sl-f-sub {
          font-family:'Orbitron',sans-serif; font-size:11px; font-weight:600;
          letter-spacing:.3em; color:rgba(0,212,255,.62); text-transform:uppercase;
        }

        /* Bar */
        .sl-f-bar-track {
          width:100%; height:5px;
          background:rgba(0,212,255,.07); border-radius:3px;
          overflow:hidden; border:1px solid rgba(0,212,255,.1); margin-bottom:14px;
        }
        .sl-f-bar {
          height:100%; width:0%; border-radius:3px;
          background: linear-gradient(90deg,#003fff,#00d4ff,#ffd700);
          transition: width .05s linear; position:relative;
        }
        .sl-f-bar::after {
          content:''; position:absolute; right:-1px; top:50%; transform:translateY(-50%);
          width:9px; height:9px; border-radius:50%; background:#fff;
          box-shadow: 0 0 10px #ffd700, 0 0 22px rgba(255,215,0,.8);
        }

        /* Status row */
        .sl-f-stat { display:flex; align-items:center; gap:9px; }
        .sl-f-dot {
          width:6px; height:6px; border-radius:50%; flex-shrink:0;
          background:#00d4ff; box-shadow:0 0 6px #00d4ff;
          animation:sl-blink .9s ease-in-out infinite;
        }
        .sl-f-msg {
          font-size:12px; font-weight:600; letter-spacing:.1em;
          color:rgba(0,212,255,.76); text-transform:uppercase; flex:1;
        }
        .sl-f-sys {
          font-family:'Orbitron',sans-serif; font-size:9px;
          letter-spacing:.28em; color:rgba(255,200,50,.5); text-transform:uppercase;
        }

        /* ══════════════════════════════════
           STAGE 2 — ARC REACTOR
        ══════════════════════════════════ */
        .sl-s2 {
          background: linear-gradient(180deg,#010814,#020c1a);
          z-index:80; opacity:0; pointer-events:none;
        }
        .sl-s2-grid {
          position:absolute; inset:0; pointer-events:none;
          background-image:
            linear-gradient(rgba(0,212,255,.022) 1px,transparent 1px),
            linear-gradient(90deg,rgba(0,212,255,.022) 1px,transparent 1px);
          background-size:52px 52px;
        }

        .sl-arc-box { position:relative; z-index:2; display:flex; flex-direction:column; align-items:center; gap:20px; }
        .sl-arc-pre {
          font-family:'Orbitron',sans-serif; font-size:9px; font-weight:600;
          letter-spacing:.5em; color:rgba(0,212,255,.55); text-transform:uppercase;
          animation:sl-blink 2s ease-in-out infinite; margin-bottom:-6px;
        }
        .sl-arc-rings {
          position:relative; width:220px; height:220px;
          display:flex; align-items:center; justify-content:center;
        }
        .sl-arc-glow {
          position:absolute; width:200px; height:200px; border-radius:50%;
          background:radial-gradient(circle,rgba(0,212,255,.2) 0%,transparent 70%);
          filter:blur(22px); animation:sl-pulse 3.5s ease-in-out infinite;
        }
        .sl-ar { position:absolute; border-radius:50%; }
        .sl-ar1 { width:210px; height:210px; border:1.5px solid rgba(0,212,255,.2); animation:sl-cw 13s linear infinite; }
        .sl-ar1::before {
          content:''; position:absolute; top:-5px; left:50%; transform:translateX(-50%);
          width:9px; height:9px; border-radius:50%; background:#00d4ff;
          box-shadow:0 0 12px #00d4ff, 0 0 26px rgba(0,212,255,.7);
        }
        .sl-ar2 { width:164px; height:164px; border:1px solid rgba(99,102,241,.28); animation:sl-ccw 8s linear infinite; }
        .sl-ar2::before {
          content:''; position:absolute; bottom:-3px; left:50%; transform:translateX(-50%);
          width:6px; height:6px; border-radius:50%; background:#818cf8; box-shadow:0 0 8px #818cf8;
        }
        .sl-ar3 { width:116px; height:116px; border:1px dashed rgba(0,212,255,.15); animation:sl-cw 5.5s linear infinite; }
        .sl-arc-cv { position:absolute; border-radius:50%; }

        .sl-arc-lbl { position:relative; z-index:5; text-align:center; }
        .sl-arc-lbl-t {
          font-family:'Orbitron',sans-serif; font-size:10px; font-weight:700;
          letter-spacing:.26em; color:rgba(0,212,255,.82); text-transform:uppercase; margin-bottom:2px;
        }
        .sl-arc-lbl-s {
          font-family:'Orbitron',sans-serif; font-size:8px;
          color:rgba(255,255,255,.32); letter-spacing:.22em;
        }

        .sl-arc-bar-area { width:min(370px,92%); display:flex; flex-direction:column; gap:9px; align-items:center; }
        .sl-arc-bar-lbl { display:flex; justify-content:space-between; width:100%; }
        .sl-arc-bar-lbl span {
          font-family:'Orbitron',sans-serif; font-size:10px; font-weight:600;
          letter-spacing:.26em; color:rgba(0,212,255,.62); text-transform:uppercase;
        }
        .sl-arc-bar-track {
          width:100%; height:5px;
          background:rgba(0,212,255,.07); border-radius:3px;
          overflow:hidden; border:1px solid rgba(0,212,255,.1);
        }
        .sl-arc-bar {
          height:100%; width:0%; border-radius:3px;
          background:linear-gradient(90deg,#003fff,#00d4ff,#00ffcc);
          background-size:200% 100%;
          animation:sl-shimmer 3s linear infinite;
          transition:width .05s linear; position:relative;
        }
        .sl-arc-bar::after {
          content:''; position:absolute; right:0; top:50%; transform:translateY(-50%);
          width:9px; height:9px; border-radius:50%; background:#fff;
          box-shadow:0 0 10px #00d4ff, 0 0 22px rgba(0,212,255,.8);
        }
        .sl-arc-msg {
          font-size:12px; font-weight:600; letter-spacing:.14em;
          color:rgba(0,212,255,.62); text-transform:uppercase;
          animation:sl-blink 2s ease-in-out infinite;
        }

        /* ══════════════════════════════════
           STAGE 3 — SPACE WELCOME
        ══════════════════════════════════ */
        .sl-s3 {
          background:radial-gradient(ellipse at 50% 55%,#08082a 0%,#030310 55%,#000 100%);
          z-index:70; opacity:0; pointer-events:none;
        }
        .sl-nb1, .sl-nb2 {
          position:absolute; border-radius:50%; pointer-events:none;
          animation:sl-nbpulse 5s ease-in-out infinite;
        }
        .sl-nb1 { width:350px; height:250px; background:radial-gradient(circle,rgba(80,50,180,.22),transparent); top:5%; left:0%; filter:blur(55px); }
        .sl-nb2 { width:280px; height:220px; background:radial-gradient(circle,rgba(30,80,200,.18),transparent); bottom:8%; right:2%; filter:blur(48px); animation-delay:2.5s; }
        .sl-stars { position:absolute; inset:0; pointer-events:none; }

        .sl-sp-content {
          position:relative; z-index:10;
          display:flex; flex-direction:column; align-items:center;
          text-align:center; padding:0 28px;
          width:100%; max-width:560px;
          opacity:0; transform:translateY(22px);
          transition:opacity 1s ease .25s, transform 1s ease .25s;
        }
        .sl-s3.sl-active .sl-sp-content { opacity:1; transform:translateY(0); }

        .sl-sp-welcome {
          font-family:'Orbitron',sans-serif; font-size:10px; letter-spacing:.52em;
          color:rgba(120,180,255,.78); text-transform:uppercase; margin-bottom:12px;
          opacity:0; animation:sl-welcomein .9s ease .5s forwards;
        }
        .sl-sp-name {
          font-family:'Orbitron',sans-serif;
          font-size:clamp(14px,3.5vw,22px); font-weight:700;
          color:#fff; letter-spacing:.07em;
          text-shadow:0 0 28px rgba(100,160,255,.9),0 0 65px rgba(100,160,255,.4);
          margin-bottom:7px; min-height:1.6em;
          opacity:0; animation:sl-namein .6s ease 1.4s forwards;
        }
        .sl-sp-name.sl-cursor::after {
          content:'|'; color:#64a0ff;
          animation:sl-blink .65s ease-in-out infinite;
        }
        .sl-sp-role {
          font-size:12px; font-weight:600; letter-spacing:.25em;
          color:rgba(255,255,255,.42); text-transform:uppercase; margin-bottom:20px;
          opacity:0; animation:sl-namein .5s ease 1.5s forwards;
        }
        .sl-sp-divline {
          width:140px; height:1px;
          background:linear-gradient(90deg,transparent,rgba(100,160,255,.45),transparent);
          margin-bottom:16px;
          opacity:0; animation:sl-namein .5s ease 1.6s forwards;
        }
        .sl-sp-exp-lbl {
          font-family:'Orbitron',sans-serif; font-size:9px; font-weight:600;
          letter-spacing:.44em; color:rgba(100,160,255,.5); text-transform:uppercase;
          margin-bottom:13px;
          opacity:0; animation:sl-namein .5s ease 1.7s forwards;
        }
        .sl-sp-grid {
          display:grid; grid-template-columns:repeat(5,1fr); gap:8px; width:100%;
        }
        @media(max-width:480px){ .sl-sp-grid{ grid-template-columns:repeat(3,1fr); } }

        .sl-sp-card {
          background:rgba(100,160,255,.04); border:1px solid rgba(100,160,255,.11);
          border-radius:11px; padding:11px 5px;
          display:flex; flex-direction:column; align-items:center; gap:7px;
          opacity:0; transition:background .3s,border-color .3s;
        }
        .sl-sp-card.sl-show { animation:sl-card-in .5s cubic-bezier(.16,1,.3,1) forwards; }
        .sl-sp-card:hover { background:rgba(100,160,255,.09); border-color:rgba(100,160,255,.28); }
        .sl-sp-icon { width:32px; height:32px; border-radius:9px; display:flex; align-items:center; justify-content:center; font-size:16px; }
        .sl-sp-nm {
          font-family:'Rajdhani',sans-serif; font-size:10px; font-weight:600;
          color:rgba(255,255,255,.82); text-align:center; letter-spacing:.05em;
          text-transform:uppercase; line-height:1.3;
        }
      `}</style>

      {/* ──

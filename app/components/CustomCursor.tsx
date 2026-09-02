"use client"

import { useEffect, useRef, useState } from "react"

/** Fixed pool of trail dots. They are recycled, so nothing is ever created per frame. */
const PARTICLE_COUNT = 12
const PARTICLE_LIFE = 420

interface ParticleState {
  x: number
  y: number
  size: number
  born: number
  alive: boolean
}

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)
  const particleRefs = useRef<(HTMLDivElement | null)[]>([])

  const mousePos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const lastMousePos = useRef({ x: -100, y: -100 })

  const particles = useRef<ParticleState[]>(
    Array.from({ length: PARTICLE_COUNT }, () => ({ x: -100, y: -100, size: 3, born: 0, alive: false }))
  )
  const nextParticle = useRef(0)

  const animFrameId = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(pointer: coarse)").matches) return

    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      mousePos.current = { x: clientX, y: clientY }

      // Dot follows the pointer exactly, written straight to the node.
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`
      }

      const dx = clientX - lastMousePos.current.x
      const dy = clientY - lastMousePos.current.y

      // Spawn a trail dot only when the pointer has actually travelled.
      // This mutates a ref rather than React state, so a fast mouse no longer
      // triggers a re-render on every single move event.
      if (Math.hypot(dx, dy) > 14) {
        const slot = particles.current[nextParticle.current]
        slot.x = clientX + (Math.random() - 0.5) * 8
        slot.y = clientY + (Math.random() - 0.5) * 8
        slot.size = Math.random() * 4 + 2
        slot.born = performance.now()
        slot.alive = true

        nextParticle.current = (nextParticle.current + 1) % PARTICLE_COUNT
        lastMousePos.current = { x: clientX, y: clientY }
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const isInteractive = Boolean(
        target.closest(
          'a, button, input, textarea, select, [role="button"], .cursor-pointer, .interactive-hover'
        )
      )
      // Only re-render when the state actually flips.
      setIsHovered((prev) => (prev === isInteractive ? prev : isInteractive))
    }

    const handleMouseLeaveWindow = () => setIsVisible(false)
    const handleMouseEnterWindow = () => setIsVisible(true)

    // One loop drives the ring and every trail dot.
    const render = () => {
      const lerpFactor = 0.18
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`
      }

      const now = performance.now()
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const node = particleRefs.current[i]
        if (!node) continue

        const p = particles.current[i]
        if (!p.alive) {
          if (node.style.opacity !== "0") node.style.opacity = "0"
          continue
        }

        const age = now - p.born
        if (age >= PARTICLE_LIFE) {
          p.alive = false
          node.style.opacity = "0"
          continue
        }

        const life = 1 - age / PARTICLE_LIFE
        node.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) scale(${life})`
        node.style.width = `${p.size}px`
        node.style.height = `${p.size}px`
        node.style.opacity = String(life * 0.7)
      }

      animFrameId.current = requestAnimationFrame(render)
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mouseover", handleOver, { passive: true })
    document.body.addEventListener("mouseleave", handleMouseLeaveWindow)
    document.body.addEventListener("mouseenter", handleMouseEnterWindow)

    animFrameId.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mouseover", handleOver)
      document.body.removeEventListener("mouseleave", handleMouseLeaveWindow)
      document.body.removeEventListener("mouseenter", handleMouseEnterWindow)
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current)
    }
  }, [])

  // Hide the native cursor only while the replacement is genuinely on screen.
  useEffect(() => {
    const root = document.documentElement
    if (!isVisible) {
      root.classList.remove("custom-cursor-active")
      return
    }
    root.classList.add("custom-cursor-active")
    return () => root.classList.remove("custom-cursor-active")
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Glowing Ring */}
      <div
        ref={cursorRingRef}
        className={`fixed left-0 top-0 -ml-5 -mt-5 rounded-full border border-gold-400/50 bg-gold-500/10 backdrop-blur-[1px] transition-all duration-200 ease-out ${
          isHovered
            ? "h-14 w-14 -ml-7 -mt-7 border-gold-300/80 bg-gold-400/20 shadow-[0_0_24px_rgba(200,169,110,0.5)]"
            : isClicking
            ? "h-8 w-8 -ml-4 -mt-4 scale-90 border-gold-300/80 bg-gold-400/30"
            : "h-10 w-10 shadow-[0_0_16px_rgba(220,198,148,0.35)]"
        }`}
        style={{ willChange: "transform" }}
      />

      {/* Inner Precision Dot */}
      <div
        ref={cursorDotRef}
        className={`fixed left-0 top-0 -ml-1 -mt-1 rounded-full transition-transform duration-100 ${
          isHovered
            ? "h-3 w-3 -ml-1.5 -mt-1.5 bg-gold-200 shadow-[0_0_12px_rgba(220,198,148,0.9)]"
            : "h-2 w-2 bg-gold-300 shadow-[0_0_8px_rgba(232,218,184,0.9)]"
        }`}
        style={{ willChange: "transform" }}
      />

      {/* Trail pool — rendered once, then driven entirely from the rAF loop */}
      {Array.from({ length: PARTICLE_COUNT }, (_, i) => (
        <div
          key={i}
          ref={(node) => {
            particleRefs.current[i] = node
          }}
          className="fixed left-0 top-0 rounded-full bg-gold-300/70 shadow-[0_0_6px_rgba(220,198,148,0.8)]"
          style={{ opacity: 0, willChange: "transform, opacity" }}
        />
      ))}
    </div>
  )
}

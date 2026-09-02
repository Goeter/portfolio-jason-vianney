"use client"

import { useEffect, useRef, useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
}

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])

  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)

  const mousePos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const lastMousePos = useRef({ x: -100, y: -100 })

  const animFrameId = useRef<number | null>(null)
  const particleIdRef = useRef<number>(0)

  useEffect(() => {
    // Disable custom cursor on touch devices or reduced motion
    if (typeof window === "undefined") return
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches
    if (isTouchDevice) return

    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      mousePos.current = { x: clientX, y: clientY }

      // Direct placement of dot for sub-millisecond responsiveness
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`
      }

      // Calculate movement velocity
      const dx = clientX - lastMousePos.current.x
      const dy = clientY - lastMousePos.current.y
      const distance = Math.hypot(dx, dy)

      // Spawn trail particles if mouse moves fast
      if (distance > 14) {
        particleIdRef.current += 1
        const newParticle: Particle = {
          id: particleIdRef.current,
          x: clientX + (Math.random() - 0.5) * 8,
          y: clientY + (Math.random() - 0.5) * 8,
          size: Math.random() * 4 + 2,
          opacity: 0.6,
        }

        setParticles((prev) => [...prev.slice(-10), newParticle])
        lastMousePos.current = { x: clientX, y: clientY }
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    // Detect hover state over interactive elements
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const isInteractive = Boolean(
        target.closest(
          'a, button, input, textarea, select, [role="button"], .cursor-pointer, .interactive-hover'
        )
      )
      setIsHovered(isInteractive)
    }

    const handleMouseLeaveWindow = () => setIsVisible(false)
    const handleMouseEnterWindow = () => setIsVisible(true)

    // Smooth RAF lerp loop for cursor ring
    const render = () => {
      const lerpFactor = 0.18
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`
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

  // Fade out trail particles
  useEffect(() => {
    if (particles.length === 0) return
    const timer = setTimeout(() => {
      setParticles((prev) => prev.slice(1))
    }, 60)
    return () => clearTimeout(timer)
  }, [particles])

  if (!isVisible) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Glowing Ring */}
      <div
        ref={cursorRingRef}
        className={`fixed left-0 top-0 -ml-5 -mt-5 rounded-full border border-cyan-400/50 bg-cyan-500/10 backdrop-blur-[1px] transition-all duration-200 ease-out ${
          isHovered
            ? "h-14 w-14 -ml-7 -mt-7 border-amber-400/80 bg-amber-400/20 shadow-[0_0_24px_rgba(251,191,36,0.5)]"
            : isClicking
            ? "h-8 w-8 -ml-4 -mt-4 scale-90 border-sky-300/80 bg-sky-400/30"
            : "h-10 w-10 shadow-[0_0_16px_rgba(56,189,248,0.35)]"
        }`}
        style={{ willChange: "transform" }}
      />

      {/* Inner Precision Dot */}
      <div
        ref={cursorDotRef}
        className={`fixed left-0 top-0 -ml-1 -mt-1 rounded-full transition-transform duration-100 ${
          isHovered
            ? "h-3 w-3 -ml-1.5 -mt-1.5 bg-amber-300 shadow-[0_0_12px_rgba(253,224,71,0.9)]"
            : "h-2 w-2 bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.9)]"
        }`}
        style={{ willChange: "transform" }}
      />

      {/* Motion Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="fixed left-0 top-0 rounded-full bg-cyan-300/70 shadow-[0_0_6px_rgba(56,189,248,0.8)] transition-opacity duration-300"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            transform: `translate3d(${p.x}px, ${p.y}px, 0)`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import ArcReactorCanvas from "./arc-reactor-canvas"
import NeonText from "./neon-text"

type Props = {
  onLoadingComplete: () => void
}

export default function SplashLoader({ onLoadingComplete }: Props) {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => {
        onLoadingComplete()
      }, 600)
    }, 6500) // matches CHARGE_DURATION in arc-reactor-canvas

    return () => clearTimeout(timer)
  }, [onLoadingComplete])

  return (
    <main
      className={`relative h-dvh w-full overflow-hidden bg-[oklch(0.15_0_0)] transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Animated IT background + arc reactor with integrated loading */}
      <ArcReactorCanvas className="absolute inset-0" />

      {/* Foreground content - only name and roles, no progress bar */}
      <section className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <NeonText
          title="Jason Vianney Sugiarto"
          roles={["Front End Developer", "System Analyst", "UI/UX Design", "Data Analyst"]}
        />
      </section>

      {/* Subtle vignette for cinematic depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.25) 65%, rgba(0,0,0,0.5) 100%)",
        }}
      />
    </main>
  )
}

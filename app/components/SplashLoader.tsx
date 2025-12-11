"use client"

import { useEffect, useState, useRef } from "react"
import ArcReactorCanvas from "./arc-reactor-canvas"
import NeonText from "./neon-text"
import { motion, AnimatePresence } from "framer-motion"

type Props = {
  onLoadingComplete: () => void
}

export default function SplashLoader({ onLoadingComplete }: Props) {
  const [fadeOut, setFadeOut] = useState(false)
  const [loadingPercentage, setLoadingPercentage] = useState(0)
  const [showWelcome, setShowWelcome] = useState(false)
  const [showText, setShowText] = useState(false)
  const animationFrameRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)
  const totalDuration = 6500 // 6.5 detik

  // Animasi loading persentase
  useEffect(() => {
    const animateLoading = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime
      }

      const elapsed = currentTime - startTimeRef.current
      const progress = Math.min(elapsed / totalDuration, 1)
      
      // Easing function untuk animasi yang smooth
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
      const easedProgress = easeOutCubic(progress)
      
      setLoadingPercentage(Math.floor(easedProgress * 100))

      // Tampilkan teks welcome di 85%
      if (easedProgress >= 0.85 && !showWelcome) {
        setShowWelcome(true)
        setTimeout(() => setShowText(true), 300)
      }

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animateLoading)
      }
    }

    animationFrameRef.current = requestAnimationFrame(animateLoading)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [totalDuration, showWelcome])

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => {
        onLoadingComplete()
      }, 600)
    }, totalDuration)

    return () => clearTimeout(timer)
  }, [onLoadingComplete, totalDuration])

  return (
    <main
      className={`relative h-dvh w-full overflow-hidden bg-[oklch(0.15_0_0)] transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Animated IT background + arc reactor with integrated loading */}
      <ArcReactorCanvas className="absolute inset-0" />

      {/* Foreground content */}
      <section className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <NeonText
          title="Jason Vianney Sugiarto"
          roles={["Front End Developer", "System Analyst", "UI/UX Design", "Data Analyst"]}
        />
        
        {/* Loading Percentage Display */}
        <div className="mt-16 flex flex-col items-center gap-6">
          {/* Percentage Counter */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative">
              {/* Outer glow effect */}
              <div className="absolute inset-0 animate-pulse rounded-full bg-blue-500/20 blur-2xl" />
              
              {/* Main percentage display */}
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-2 border-blue-400/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm">
                <div className="text-center">
                  <motion.span
                    key={loadingPercentage}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-5xl font-bold tracking-tighter text-white"
                  >
                    {loadingPercentage}
                  </motion.span>
                  <span className="text-2xl font-bold text-blue-400">%</span>
                  
                  {/* Loading text */}
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mt-1 text-xs font-semibold uppercase tracking-widest text-cyan-300/80"
                  >
                    Loading
                  </motion.div>
                </div>
                
                {/* Circular progress indicator */}
                <svg className="absolute inset-0 h-full w-full -rotate-90">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="60"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="377"
                    strokeDashoffset={377 - (377 * loadingPercentage) / 100}
                    className="transition-all duration-300 ease-out"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#60a5fa" stopOpacity="1" />
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity="1" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Welcome Text */}
          <AnimatePresence>
            {showWelcome && (
              <motion.div
                initial={{ y: 50, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: 0.2
                }}
                className="max-w-2xl"
              >
                {/* Decorative lines */}
                <div className="mb-4 flex items-center justify-center gap-4">
                  <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
                  <div className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/60">
                    Welcome
                  </div>
                  <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
                </div>

                {/* Main welcome text */}
                <div className="space-y-3">
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-300 bg-clip-text text-3xl font-bold tracking-tight text-transparent"
                  >
                    WELCOME TO MY WEBSITE PORTFOLIO
                  </motion.h2>
                  
                  <AnimatePresence>
                    {showText && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-lg leading-relaxed text-gray-200/90"
                      >
                        Take a seat and enjoy your time
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Decorative dots */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-6 flex justify-center gap-2"
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                      className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"
                    />
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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

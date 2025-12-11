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
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const animationFrameRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)
  const totalDuration = 6500

  // Teks keren untuk welcome message
  const welcomeLines = [
    "WHERE INNOVATION MEETS ELEGANCE",
    "EXPERIENCE DIGITAL EXCELLENCE",
    "CRAFTING THE FUTURE OF WEB"
  ]

  // Animasi loading persentase
  useEffect(() => {
    const animateLoading = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime
      }

      const elapsed = currentTime - startTimeRef.current
      const progress = Math.min(elapsed / totalDuration, 1)
      
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
      const easedProgress = easeOutCubic(progress)
      
      setLoadingPercentage(Math.floor(easedProgress * 100))

      // Tampilkan welcome di 80%
      if (easedProgress >= 0.8 && !showWelcome) {
        setShowWelcome(true)
        // Animasi teks berurutan
        const lineInterval = setInterval(() => {
          setCurrentLineIndex(prev => {
            if (prev >= welcomeLines.length - 1) {
              clearInterval(lineInterval)
              return prev
            }
            return prev + 1
          })
        }, 500)
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
      <ArcReactorCanvas className="absolute inset-0" />

      <section className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <NeonText
          title="Jason Vianney Sugiarto"
          roles={["Front End Developer", "System Analyst", "UI/UX Design", "Data Analyst"]}
        />
        
        {/* Loading Percentage dalam Lingkaran Rapi */}
        <div className="mt-12 flex flex-col items-center gap-8">
          {/* Lingkaran Loading yang Rapi */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            {/* Outer Glow Ring */}
            <motion.div
              animate={{ 
                rotate: 360,
                boxShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.3)",
                  "0 0 40px rgba(59, 130, 246, 0.5)",
                  "0 0 20px rgba(59, 130, 246, 0.3)"
                ]
              }}
              transition={{
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                boxShadow: { duration: 2, repeat: Infinity }
              }}
              className="absolute -inset-4 rounded-full border border-blue-400/20"
            />
            
            {/* Main Circle Container */}
            <div className="relative h-24 w-24">
              {/* Progress Ring */}
              <svg className="absolute inset-0 h-full w-full -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="46"
                  stroke="url(#progressGradient)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="289"
                  strokeDashoffset={289 - (289 * loadingPercentage) / 100}
                  className="transition-all duration-150 ease-out"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Inner Circle dengan Blur Effect */}
              <div className="absolute inset-4 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-sm">
                {/* Percentage Display */}
                <div className="text-center">
                  <motion.div
                    key={loadingPercentage}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="relative"
                  >
                    <span className="text-2xl font-bold text-white">
                      {loadingPercentage}
                    </span>
                    <span className="text-lg font-semibold text-blue-300">%</span>
                  </motion.div>
                  
                  {/* Tiny Loading Text */}
                  <motion.div
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-300/70"
                  >
                    Loading
                  </motion.div>
                </div>

                {/* Center Dot */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute h-1.5 w-1.5 rounded-full bg-blue-400"
                />
              </div>

              {/* Small Dots on Circle */}
              {[...Array(12)].map((_, i) => {
                const angle = (i * 30) * (Math.PI / 180)
                const x = 46 * Math.cos(angle)
                const y = 46 * Math.sin(angle)
                return (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: loadingPercentage >= (i + 1) * 8 ? 1 : 0.5,
                      opacity: loadingPercentage >= (i + 1) * 8 ? 1 : 0.3
                    }}
                    transition={{ delay: i * 0.05 }}
                    className="absolute h-1 w-1 rounded-full bg-blue-400"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                )
              })}
            </div>
          </motion.div>

          {/* Welcome Message Section */}
          <AnimatePresence>
            {showWelcome && (
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-xl space-y-4"
              >
                {/* Main Welcome Title */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6"
                >
                  <div className="mb-3 flex items-center justify-center gap-4">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/60">
                      Welcome
                    </span>
                    <div className="h-px w-12 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
                  </div>
                  
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-r from-blue-300 via-white to-cyan-300 bg-clip-text text-2xl font-bold tracking-tight text-transparent"
                  >
                    WELCOME TO MY DIGITAL REALM
                  </motion.h2>
                </motion.div>

                {/* Animated Welcome Lines */}
                <div className="space-y-2">
                  {welcomeLines.map((line, index) => (
                    <AnimatePresence key={line}>
                      {currentLineIndex >= index && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: index * 0.3 }}
                          className="overflow-hidden"
                        >
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.3 + 0.2 }}
                            className="text-lg font-medium text-gray-200/90"
                          >
                            {line}
                          </motion.p>
                          
                          {/* Animated Underline */}
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: index * 0.3 + 0.4, duration: 0.6 }}
                            className="mt-1 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  ))}
                </div>

                {/* Subtle Tagline */}
                <AnimatePresence>
                  {currentLineIndex >= welcomeLines.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="pt-4"
                    >
                      <motion.p
                        animate={{ 
                          textShadow: [
                            "0 0 8px rgba(34, 211, 238, 0)",
                            "0 0 8px rgba(34, 211, 238, 0.3)",
                            "0 0 8px rgba(34, 211, 238, 0)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-sm italic text-cyan-200/70"
                      >
                        Crafting exceptional digital experiences
                      </motion.p>
                      
                      {/* Animated Dots */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="mt-4 flex justify-center gap-1.5"
                      >
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{ 
                              y: [0, -3, 0],
                              backgroundColor: [
                                "rgba(59, 130, 246, 0.5)",
                                "rgba(34, 211, 238, 0.8)",
                                "rgba(59, 130, 246, 0.5)"
                              ]
                            }}
                            transition={{
                              duration: 1.2,
                              repeat: Infinity,
                              delay: i * 0.2
                            }}
                            className="h-1.5 w-1.5 rounded-full"
                          />
                        ))}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Vignette Effect */}
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

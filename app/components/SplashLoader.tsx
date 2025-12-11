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
  const containerRef = useRef<HTMLDivElement>(null)

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

      // Tampilkan welcome di 75%
      if (easedProgress >= 0.75 && !showWelcome) {
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
        }, 400)
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
  }, [totalDuration, showWelcome, welcomeLines.length])

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
      ref={containerRef}
      className={`relative h-dvh w-full overflow-hidden bg-[oklch(0.15_0_0)] transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <ArcReactorCanvas className="absolute inset-0" />

      {/* Main Container dengan Grid untuk alignment */}
      <section className="relative z-10 h-full">
        {/* Grid untuk mengatur semua elemen */}
        <div className="relative grid h-full grid-rows-[1fr_auto_1fr] items-center justify-center px-6">
          
          {/* Bagian Atas: Neon Text */}
          <div className="flex items-end justify-center pb-4 sm:pb-8">
            <NeonText
              title="Jason Vianney Sugiarto"
              roles={["Front End Developer", "System Analyst", "UI/UX Design", "Data Analyst"]}
            />
          </div>

          {/* Bagian Tengah: Loading & Welcome - OVERLAY di Arc Reactor */}
          <div className="relative flex flex-col items-center justify-center">
            {/* Container untuk mengelompokkan loading dan welcome */}
            <div className="relative flex flex-col items-center">
              {/* Loading Percentage - Diletakkan di atas Arc Reactor */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {/* Outer Glow Effect yang mengikuti ukuran */}
                <motion.div
                  animate={{ 
                    rotate: 360,
                    boxShadow: [
                      "0 0 15px rgba(59, 130, 246, 0.2)",
                      "0 0 30px rgba(59, 130, 246, 0.4)",
                      "0 0 15px rgba(59, 130, 246, 0.2)"
                    ]
                  }}
                  transition={{
                    rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                    boxShadow: { duration: 2, repeat: Infinity }
                  }}
                  className="absolute -inset-2 rounded-full border border-blue-400/10 sm:-inset-3"
                />
                
                {/* Main Loading Circle - Responsif */}
                <div className="relative h-[80px] w-[80px] sm:h-[100px] sm:w-[100px] md:h-[120px] md:w-[120px]">
                  {/* Progress Ring */}
                  <svg className="absolute inset-0 h-full w-full -rotate-90">
                    <circle
                      cx="50%"
                      cy="50%"
                      r="calc(50% - 4px)"
                      stroke="url(#progressGradient)"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="283"
                      strokeDashoffset={283 - (283 * loadingPercentage) / 100}
                      className="transition-all duration-100 ease-out"
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
                  <div className="absolute inset-3 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-[2px] sm:inset-4 md:inset-5">
                    {/* Percentage Display */}
                    <div className="text-center">
                      <motion.div
                        key={loadingPercentage}
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        className="relative"
                      >
                        <span className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
                          {loadingPercentage}
                        </span>
                        <span className="text-sm font-semibold text-blue-300 sm:text-lg md:text-xl">%</span>
                      </motion.div>
                      
                      {/* Tiny Loading Text */}
                      <motion.div
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.15em] text-cyan-300/70 sm:text-[10px] sm:tracking-[0.2em]"
                      >
                        Loading
                      </motion.div>
                    </div>

                    {/* Center Dot */}
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute h-1.5 w-1.5 rounded-full bg-blue-400 sm:h-2 sm:w-2"
                    />
                  </div>

                  {/* Small Dots on Circle - Responsif */}
                  {[...Array(8)].map((_, i) => {
                    const angle = (i * 45) * (Math.PI / 180)
                    const radius = "calc(50% - 4px)"
                    return (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                          scale: loadingPercentage >= (i + 1) * 12.5 ? 1 : 0.5,
                          opacity: loadingPercentage >= (i + 1) * 12.5 ? 1 : 0.3
                        }}
                        transition={{ delay: i * 0.03 }}
                        className="absolute h-1 w-1 rounded-full bg-blue-400 sm:h-1.5 sm:w-1.5"
                        style={{
                          left: `calc(50% + ${radius} * ${Math.cos(angle)})`,
                          top: `calc(50% + ${radius} * ${Math.sin(angle)})`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      />
                    )
                  })}
                </div>
              </motion.div>

              {/* Welcome Message Section - Di bawah Loading Circle */}
              <AnimatePresence>
                {showWelcome && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="mt-4 w-full max-w-md sm:mt-6 md:max-w-lg"
                  >
                    {/* Main Welcome Title */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="mb-4 sm:mb-6"
                    >
                      <div className="mb-3 flex items-center justify-center gap-3 sm:gap-4">
                        <div className="h-px w-8 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent sm:w-12" />
                        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-300/60">
                          Welcome
                        </span>
                        <div className="h-px w-8 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent sm:w-12" />
                      </div>
                      
                      <motion.h2
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gradient-to-r from-blue-300 via-white to-cyan-300 bg-clip-text text-lg font-bold tracking-tight text-transparent sm:text-xl md:text-2xl"
                      >
                        WELCOME TO MY DIGITAL REALM
                      </motion.h2>
                    </motion.div>

                    {/* Animated Welcome Lines */}
                    <div className="space-y-1.5 sm:space-y-2">
                      {welcomeLines.map((line, index) => (
                        <AnimatePresence key={line}>
                          {currentLineIndex >= index && (
                            <motion.div
                              initial={{ opacity: 0, x: -15 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 15 }}
                              transition={{ delay: index * 0.25 }}
                              className="overflow-hidden"
                            >
                              <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.25 + 0.15 }}
                                className="text-sm font-medium text-gray-200/90 sm:text-base md:text-lg"
                              >
                                {line}
                              </motion.p>
                              
                              {/* Animated Underline */}
                              <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: index * 0.25 + 0.3, duration: 0.5 }}
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
                          transition={{ delay: 0.8 }}
                          className="pt-3 sm:pt-4"
                        >
                          <motion.p
                            animate={{ 
                              textShadow: [
                                "0 0 5px rgba(34, 211, 238, 0)",
                                "0 0 8px rgba(34, 211, 238, 0.3)",
                                "0 0 5px rgba(34, 211, 238, 0)"
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-xs italic text-cyan-200/70 sm:text-sm"
                          >
                            Crafting exceptional digital experiences
                          </motion.p>
                          
                          {/* Animated Dots */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="mt-3 flex justify-center gap-1 sm:gap-1.5"
                          >
                            {[...Array(3)].map((_, i) => (
                              <motion.div
                                key={i}
                                animate={{ 
                                  y: [0, -2, 0],
                                  backgroundColor: [
                                    "rgba(59, 130, 246, 0.5)",
                                    "rgba(34, 211, 238, 0.8)",
                                    "rgba(59, 130, 246, 0.5)"
                                  ]
                                }}
                                transition={{
                                  duration: 1.2,
                                  repeat: Infinity,
                                  delay: i * 0.15
                                }}
                                className="h-1 w-1 rounded-full sm:h-1.5 sm:w-1.5"
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
          </div>

          {/* Spacer untuk bagian bawah */}
          <div className="flex items-start justify-center pt-4 sm:pt-8">
            {/* Bisa ditambahkan elemen tambahan di sini jika perlu */}
          </div>
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

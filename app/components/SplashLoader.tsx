"use client"

import { useEffect, useState, useRef } from "react"
import ArcReactorCanvas from "./arc-reactor-canvas"
import { motion } from "framer-motion"

type Props = {
  onLoadingComplete: () => void
}

export default function SplashLoader({ onLoadingComplete }: Props) {
  const [fadeOut, setFadeOut] = useState(false)
  const [loadingPercentage, setLoadingPercentage] = useState(0)
  const animationFrameRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)
  const totalDuration = 6500

  const skills = [
    "Front-end Development",
    "System Analyst", 
    "UI/UX Design",
    "Data Analyst"
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
  }, [totalDuration])

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

      <section className="relative z-10 h-full">
        <div className="relative flex h-full flex-col items-center justify-center px-6">
          
          {/* Nama dengan Typography yang Bagus */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 text-center"
          >
            <div className="relative">
              {/* Glow Effect di belakang nama */}
              <div className="absolute -inset-4 animate-pulse rounded-full bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 blur-xl" />
              
              {/* Nama Utama */}
              <h1 className="relative bg-gradient-to-r from-blue-300 via-white to-cyan-300 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl md:text-5xl lg:text-6xl">
                Jason Vianney Sugiarto
              </h1>
              
              {/* Subtitle garis tipis */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mx-auto mt-3 h-[1px] w-32 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent sm:w-48"
              />
            </div>
          </motion.div>

          {/* Loading Circle - Posisi di Tengah */}
          <div className="relative my-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Outer Glow Effect */}
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
                  rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                  boxShadow: { duration: 2, repeat: Infinity }
                }}
                className="absolute -inset-2 rounded-full border border-blue-400/20 sm:-inset-3"
              />
              
              {/* Main Loading Circle */}
              <div className="relative h-[90px] w-[90px] sm:h-[110px] sm:w-[110px] md:h-[130px] md:w-[130px]">
                {/* Progress Ring */}
                <svg className="absolute inset-0 h-full w-full -rotate-90">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="calc(50% - 5px)"
                    stroke="url(#progressGradient)"
                    strokeWidth="2.5"
                    fill="none"
                    strokeDasharray="314"
                    strokeDashoffset={314 - (314 * loadingPercentage) / 100}
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

                {/* Inner Circle */}
                <div className="absolute inset-3 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-900/40 to-cyan-900/40 backdrop-blur-[3px] sm:inset-4 md:inset-5">
                  {/* Percentage Display */}
                  <div className="text-center">
                    <motion.div
                      key={loadingPercentage}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      className="relative"
                    >
                      <span className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                        {loadingPercentage}
                      </span>
                      <span className="text-lg font-semibold text-blue-300 sm:text-xl md:text-2xl">%</span>
                    </motion.div>
                    
                    {/* Loading Text */}
                    <motion.div
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-300/80 sm:text-[11px]"
                    >
                      Loading
                    </motion.div>
                  </div>

                  {/* Center Dot */}
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute h-2 w-2 rounded-full bg-blue-400 sm:h-2.5 sm:w-2.5"
                  />
                </div>

                {/* Small Dots on Circle */}
                {[...Array(12)].map((_, i) => {
                  const angle = (i * 30) * (Math.PI / 180)
                  const radius = "calc(50% - 5px)"
                  return (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: loadingPercentage >= (i + 1) * 8.3 ? 1 : 0.5,
                        opacity: loadingPercentage >= (i + 1) * 8.3 ? 1 : 0.3
                      }}
                      transition={{ delay: i * 0.02 }}
                      className="absolute h-1.5 w-1.5 rounded-full bg-blue-400 sm:h-2 sm:w-2"
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
          </div>

          {/* Skills List dengan Layout Rapi */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-8 w-full max-w-2xl"
          >
            {/* Container untuk skills */}
            <div className="relative">
              {/* Background glow untuk skills */}
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-blue-500/5 via-transparent to-cyan-500/5 blur-lg" />
              
              {/* Grid untuk skills */}
              <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="group relative cursor-default"
                  >
                    {/* Card untuk setiap skill */}
                    <div className="relative overflow-hidden rounded-xl border border-blue-400/20 bg-gradient-to-b from-blue-900/20 to-cyan-900/20 p-3 backdrop-blur-sm transition-all duration-300 group-hover:border-blue-400/40 group-hover:bg-blue-900/30 sm:p-4">
                      {/* Animated background on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-cyan-500/0 to-blue-500/0 transition-all duration-500 group-hover:from-blue-500/10 group-hover:via-cyan-500/10 group-hover:to-blue-500/10" />
                      
                      {/* Skill Icon */}
                      <div className="relative mb-2 flex justify-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 group-hover:from-blue-500/30 group-hover:to-cyan-500/30 sm:h-10 sm:w-10">
                          <span className="text-sm font-bold text-blue-300 group-hover:text-cyan-300 sm:text-base">
                            {index + 1}
                          </span>
                        </div>
                      </div>
                      
                      {/* Skill Text */}
                      <p className="relative text-center text-xs font-semibold text-gray-200 group-hover:text-white sm:text-sm">
                        {skill}
                      </p>
                      
                      {/* Bottom border effect */}
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="absolute bottom-0 left-1/4 h-[1px] w-1/2 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"
                      />
                    </div>
                    
                    {/* Glow effect on hover */}
                    <div className="absolute -inset-1 -z-10 rounded-xl bg-gradient-to-r from-blue-500/0 to-cyan-500/0 blur-md transition-all duration-300 group-hover:from-blue-500/20 group-hover:to-cyan-500/20" />
                  </motion.div>
                ))}
              </div>
              
              {/* Connecting line between skills */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute -bottom-2 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
              />
            </div>
            
            {/* Subtle tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-6 text-center text-sm font-medium text-gray-300/70 sm:text-base"
            >
              Crafting digital experiences with precision and innovation
            </motion.p>
          </motion.div>
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

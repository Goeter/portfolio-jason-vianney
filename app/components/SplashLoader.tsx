"use client"

import { useEffect, useState, useRef } from "react"
import ArcReactorCanvas from "./arc-reactor-canvas"
import { motion } from "framer-motion"
import { 
  Code, 
  Cpu, 
  Palette, 
  BarChart3
} from "lucide-react"

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
    {
      title: "Front-end Development",
      icon: Code,
      color: "from-blue-500 to-cyan-400",
      bgColor: "bg-gradient-to-br from-blue-900/30 to-cyan-900/20",
      description: "Modern web interfaces"
    },
    {
      title: "System Analyst",
      icon: Cpu,
      color: "from-purple-500 to-pink-400",
      bgColor: "bg-gradient-to-br from-purple-900/30 to-pink-900/20",
      description: "Architecture & solutions"
    },
    {
      title: "UI/UX Design",
      icon: Palette,
      color: "from-amber-500 to-orange-400",
      bgColor: "bg-gradient-to-br from-amber-900/30 to-orange-900/20",
      description: "User-centered design"
    },
    {
      title: "Data Analyst",
      icon: BarChart3,
      color: "from-emerald-500 to-teal-400",
      bgColor: "bg-gradient-to-br from-emerald-900/30 to-teal-900/20",
      description: "Insights & analytics"
    }
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
        <div className="relative flex h-full flex-col items-center justify-center px-4 sm:px-6">
          
          {/* Nama dengan Font yang Bagus - Tidak Terpotong */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-10 w-full max-w-5xl text-center px-4"
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-8 animate-pulse rounded-full bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-purple-500/5 blur-3xl" />
              
              {/* Nama Utama dengan Font yang Lebih Bagus dan Tidak Terpotong */}
              <div className="relative">
                {/* Shadow Text untuk Depth */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-cyan-400/10 to-purple-400/10 blur-2xl" />
                
                {/* Main Text - Menggunakan font sans dengan line-height yang cukup */}
                <h1 className="relative font-['Poppins'] text-5xl font-semibold leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
                  <span className="bg-gradient-to-r from-blue-300 via-cyan-200 to-purple-300 bg-clip-text text-transparent">
                    Jason
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-cyan-200 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                    Vianney
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-300 via-cyan-200 to-blue-300 bg-clip-text text-transparent">
                    Sugiarto
                  </span>
                </h1>
              </div>
              
              {/* Decorative Lines */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mx-auto mt-6 flex items-center justify-center gap-6"
              >
                <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent sm:w-24" />
                <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent sm:w-24" />
                <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent sm:w-24" />
              </motion.div>
            </div>
          </motion.div>

          {/* Loading Circle - Posisi di Tengah */}
          <div className="relative my-10">
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
                    "0 0 25px rgba(99, 102, 241, 0.3)",
                    "0 0 45px rgba(99, 102, 241, 0.5)", 
                    "0 0 25px rgba(99, 102, 241, 0.3)"
                  ]
                }}
                transition={{
                  rotate: { duration: 12, repeat: Infinity, ease: "linear" },
                  boxShadow: { duration: 2.5, repeat: Infinity }
                }}
                className="absolute -inset-3 rounded-full border border-indigo-400/20 sm:-inset-4"
              />
              
              {/* Main Loading Circle */}
              <div className="relative h-[100px] w-[100px] sm:h-[120px] sm:w-[120px] md:h-[140px] md:w-[140px]">
                {/* Progress Ring */}
                <svg className="absolute inset-0 h-full w-full -rotate-90">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="calc(50% - 6px)"
                    stroke="url(#progressGradient)"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="314"
                    strokeDashoffset={314 - (314 * loadingPercentage) / 100}
                    className="transition-all duration-100 ease-out"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="50%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Inner Circle */}
                <div className="absolute inset-4 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-cyan-900/40 backdrop-blur-[4px] sm:inset-5 md:inset-6">
                  {/* Percentage Display */}
                  <div className="text-center">
                    <motion.div
                      key={loadingPercentage}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      className="relative"
                    >
                      <span className="font-['Inter'] text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                        {loadingPercentage}
                      </span>
                      <span className="font-['Inter'] text-xl font-semibold text-cyan-300 sm:text-2xl md:text-3xl">%</span>
                    </motion.div>
                    
                    {/* Loading Text */}
                    <motion.div
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="mt-1 font-['Inter'] text-[10px] font-medium uppercase tracking-[0.25em] text-cyan-300/90 sm:text-[12px]"
                    >
                      Loading
                    </motion.div>
                  </div>

                  {/* Center Dot */}
                  <motion.div
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute h-2.5 w-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 sm:h-3 sm:w-3"
                  />
                </div>

                {/* Small Dots on Circle */}
                {[...Array(16)].map((_, i) => {
                  const angle = (i * 22.5) * (Math.PI / 180)
                  const radius = "calc(50% - 6px)"
                  return (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: loadingPercentage >= (i + 1) * 6.25 ? 1 : 0.5,
                        opacity: loadingPercentage >= (i + 1) * 6.25 ? 1 : 0.3
                      }}
                      transition={{ delay: i * 0.015 }}
                      className="absolute h-2 w-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 sm:h-2.5 sm:w-2.5"
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

          {/* Skills Grid tanpa Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-10 w-full max-w-5xl px-4"
          >
            {/* Container untuk skills */}
            <div className="relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-900/5 via-transparent to-purple-900/5" />
              
              {/* Grid untuk skills */}
              <div className="relative grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4">
                {skills.map((skill, index) => {
                  const Icon = skill.icon
                  return (
                    <motion.div
                      key={skill.title}
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ 
                        delay: 0.5 + index * 0.15,
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                      }}
                      whileHover={{ 
                        scale: 1.05, 
                        y: -4,
                        transition: { duration: 0.2 }
                      }}
                      className="group relative cursor-default"
                    >
                      {/* Main Card */}
                      <div className={`relative overflow-hidden rounded-2xl border border-white/10 ${skill.bgColor} p-5 backdrop-blur-sm transition-all duration-300 group-hover:border-white/20 group-hover:shadow-2xl sm:p-6`}>
                        
                        {/* Animated gradient background */}
                        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                          <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-10`} />
                        </div>
                        
                        {/* Icon Container */}
                        <div className="relative mb-4 flex justify-center">
                          <div className="relative">
                            {/* Icon Background Glow */}
                            <div className={`absolute -inset-3 rounded-full bg-gradient-to-br ${skill.color} opacity-20 blur-md transition-all duration-500 group-hover:opacity-30`} />
                            
                            {/* Icon Circle */}
                            <div className={`relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${skill.color} p-3 shadow-lg sm:h-18 sm:w-18`}>
                              <Icon className="h-8 w-8 text-white sm:h-9 sm:w-9" />
                            </div>
                            
                            {/* Corner Decorations */}
                            <div className="absolute -top-1 -left-1 h-3 w-3 rounded-full bg-white/20" />
                            <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-white/20" />
                            <div className="absolute -bottom-1 -left-1 h-3 w-3 rounded-full bg-white/20" />
                            <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-white/20" />
                          </div>
                        </div>
                        
                        {/* Skill Content - Tanpa Progress Bar */}
                        <div className="relative text-center">
                          {/* Skill Title */}
                          <h3 className="font-['Inter'] text-base font-semibold text-white sm:text-lg">
                            {skill.title}
                          </h3>
                          
                          {/* Skill Description */}
                          <p className="mt-3 font-['Inter'] text-sm text-gray-300/80 sm:text-base">
                            {skill.description}
                          </p>
                        </div>
                        
                        {/* Floating Elements */}
                        <div className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-white/10 blur-sm" />
                        <div className="absolute -bottom-2 -left-2 h-4 w-4 rounded-full bg-white/10 blur-sm" />
                      </div>
                      
                      {/* Outer Glow Effect */}
                      <div className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-cyan-500/0 blur-xl transition-all duration-500 group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-cyan-500/20" />
                    </motion.div>
                  )
                })}
              </div>
              
              {/* Connecting Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 1.2 }}
                className="absolute -bottom-3 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent"
              />
            </div>
            
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="mt-10 text-center"
            >
              <p className="font-['Inter'] text-base font-medium text-gray-300/70 sm:text-lg">
                <span className="bg-gradient-to-r from-blue-300/90 via-cyan-300/90 to-purple-300/90 bg-clip-text text-transparent">
                  Crafting digital excellence through innovative solutions
                </span>
              </p>
              
              {/* Animated Dots */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="mt-6 flex justify-center gap-3"
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      y: [0, -5, 0],
                      scale: [1, 1.3, 1],
                      backgroundColor: [
                        "rgba(99, 102, 241, 0.6)",
                        "rgba(6, 182, 212, 0.9)", 
                        "rgba(99, 102, 241, 0.6)"
                      ]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                    className="h-2.5 w-2.5 rounded-full"
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Vignette Effect */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 30%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.6) 100%)",
        }}
      />
    </main>
  )
}

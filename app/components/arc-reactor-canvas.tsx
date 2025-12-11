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
            className="absolute top-8 sm:top-12 w-full max-w-5xl text-center px-4"
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-8 animate-pulse rounded-full bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-purple-500/5 blur-3xl" />
              
              {/* Nama Utama dengan Font yang Lebih Bagus dan Tidak Terpotong */}
              <div className="relative">
                {/* Shadow Text untuk Depth */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-cyan-400/10 to-purple-400/10 blur-2xl" />
                
                {/* Main Text - Menggunakan font sans dengan line-height yang cukup */}
                <h1 className="relative font-['Poppins'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight text-white">
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
                className="mx-auto mt-4 sm:mt-6 flex items-center justify-center gap-4 sm:gap-6"
              >
                <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
                <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
                <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
              </motion.div>
            </div>
          </motion.div>

          {/* Loading Circle - POSISI PUSAT TEPAT DI ATAS ARC REACTOR */}
          <div className="relative flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Outer Glow Effect - Match Arc Reactor Glow */}
              <motion.div
                animate={{ 
                  rotate: 360,
                  boxShadow: [
                    "0 0 20px rgba(0, 229, 255, 0.3)",
                    "0 0 40px rgba(0, 229, 255, 0.5)", 
                    "0 0 20px rgba(0, 229, 255, 0.3)"
                  ]
                }}
                transition={{
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                  boxShadow: { duration: 2, repeat: Infinity }
                }}
                className="absolute -inset-2 sm:-inset-3 rounded-full border border-cyan-400/20"
              />
              
              {/* Main Loading Circle - Ukuran Proporsional dengan Arc Reactor */}
              <div className="relative h-[100px] w-[100px] sm:h-[120px] sm:w-[120px] md:h-[140px] md:w-[140px]">
                {/* Progress Ring - Match Arc Reactor Charge Ring */}
                <svg className="absolute inset-0 h-full w-full -rotate-90">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="calc(50% - 8px)" // Lebih dalam dari Arc Reactor track
                    stroke="url(#progressGradient)"
                    strokeWidth="4" // Lebih tebal untuk kontras
                    fill="none"
                    strokeDasharray="314"
                    strokeDashoffset={314 - (314 * loadingPercentage) / 100}
                    className="transition-all duration-100 ease-out"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00E5FF" /> {/* COLORS.cyan */}
                      <stop offset="50%" stopColor="#19A0FF" /> {/* COLORS.blue */}
                      <stop offset="100%" stopColor="#00E5FF" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Inner Circle - Transparan agar Arc Reactor terlihat */}
                <div className="absolute inset-4 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-900/20 via-purple-900/15 to-cyan-900/20 backdrop-blur-[2px] sm:inset-5 md:inset-6">
                  {/* Percentage Display */}
                  <div className="text-center">
                    <motion.div
                      key={loadingPercentage}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      className="relative"
                    >
                      <span className="font-['Inter'] text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                        {loadingPercentage}
                      </span>
                      <span className="font-['Inter'] text-lg sm:text-xl md:text-2xl font-semibold text-cyan-300">%</span>
                    </motion.div>
                    
                    {/* Loading Text */}
                    <motion.div
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="mt-1 font-['Inter'] text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-300/90"
                    >
                      Loading
                    </motion.div>
                  </div>

                  {/* Center Dot - Match Arc Reactor Core */}
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute h-2 w-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 sm:h-2.5 sm:w-2.5"
                  />
                </div>

                {/* Small Dots on Circle - Match Arc Reactor Rotation */}
                {[...Array(12)].map((_, i) => {
                  const angle = (i * 30) * (Math.PI / 180)
                  const radius = "calc(50% - 8px)"
                  return (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: loadingPercentage >= (i + 1) * 8.33 ? 1 : 0.5,
                        opacity: loadingPercentage >= (i + 1) * 8.33 ? 1 : 0.3
                      }}
                      transition={{ delay: i * 0.02 }}
                      className="absolute h-1.5 w-1.5 rounded-full bg-cyan-400 sm:h-2 sm:w-2"
                      style={{
                        left: `calc(50% + ${radius} * ${Math.cos(angle)})`,
                        top: `calc(50% + ${radius} * ${Math.sin(angle)})`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    />
                  )
                })}
              </div>
              
              {/* Additional Glow Rings - Enhanced Effect */}
              <div className="absolute -inset-4 sm:-inset-5 rounded-full border border-cyan-400/10" />
              <div className="absolute -inset-6 sm:-inset-7 rounded-full border border-blue-400/5" />
            </motion.div>
          </div>

          {/* Skills Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="absolute bottom-8 sm:bottom-12 w-full max-w-5xl px-4"
          >
            {/* Container untuk skills */}
            <div className="relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-900/5 via-transparent to-purple-900/5" />
              
              {/* Grid untuk skills */}
              <div className="relative grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
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
                        y: -2,
                        transition: { duration: 0.2 }
                      }}
                      className="group relative cursor-default"
                    >
                      {/* Main Card */}
                      <div className={`relative overflow-hidden rounded-xl border border-white/10 ${skill.bgColor} p-3 sm:p-4 backdrop-blur-sm transition-all duration-300 group-hover:border-white/20 group-hover:shadow-xl`}>
                        
                        {/* Animated gradient background */}
                        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                          <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-10`} />
                        </div>
                        
                        {/* Icon Container */}
                        <div className="relative mb-3 flex justify-center">
                          <div className="relative">
                            {/* Icon Background Glow */}
                            <div className={`absolute -inset-2 rounded-full bg-gradient-to-br ${skill.color} opacity-20 blur-sm transition-all duration-500 group-hover:opacity-30`} />
                            
                            {/* Icon Circle */}
                            <div className={`relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${skill.color} p-2 shadow-md sm:h-14 sm:w-14`}>
                              <Icon className="h-6 w-6 text-white sm:h-7 sm:w-7" />
                            </div>
                          </div>
                        </div>
                        
                        {/* Skill Content */}
                        <div className="relative text-center">
                          {/* Skill Title */}
                          <h3 className="font-['Inter'] text-xs sm:text-sm font-semibold text-white">
                            {skill.title}
                          </h3>
                          
                          {/* Skill Description */}
                          <p className="mt-2 font-['Inter'] text-[10px] sm:text-xs text-gray-300/80">
                            {skill.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Outer Glow Effect */}
                      <div className="absolute -inset-1 -z-10 rounded-xl bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-cyan-500/0 blur-md transition-all duration-500 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-cyan-500/10" />
                    </motion.div>
                  )
                })}
              </div>
              
              {/* Connecting Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 1.2 }}
                className="absolute -bottom-2 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
              />
            </div>
            
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="mt-4 sm:mt-6 text-center"
            >
              <p className="font-['Inter'] text-xs sm:text-sm font-medium text-gray-300/70">
                <span className="bg-gradient-to-r from-blue-300/90 via-cyan-300/90 to-purple-300/90 bg-clip-text text-transparent">
                  Crafting digital excellence
                </span>
              </p>
              
              {/* Animated Dots */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="mt-3 flex justify-center gap-2"
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      y: [0, -3, 0],
                      scale: [1, 1.2, 1],
                      backgroundColor: [
                        "rgba(0, 229, 255, 0.5)",
                        "rgba(25, 160, 255, 0.8)", 
                        "rgba(0, 229, 255, 0.5)"
                      ]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.15
                    }}
                    className="h-1.5 w-1.5 rounded-full"
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

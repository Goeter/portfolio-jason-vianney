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
        <div className="relative flex h-full flex-col items-center justify-center">
          
          {/* Nama dalam Satu Baris - Dekat dengan Loading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute top-1/4 w-full max-w-4xl px-4 text-center"
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-4 animate-pulse rounded-full bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-purple-500/5 blur-xl" />
              
              {/* Nama dalam Satu Baris */}
              <div className="relative">
                <h1 className="relative font-['Poppins'] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
                  <span className="bg-gradient-to-r from-blue-300 via-cyan-200 to-purple-300 bg-clip-text text-transparent">
                    Jason Vianney Sugiarto
                  </span>
                </h1>
                
                {/* Garis dekoratif di bawah nama */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="mx-auto mt-3 h-[1px] w-48 sm:w-64 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
                />
              </div>
            </div>
          </motion.div>

          {/* Loading Circle - Tepat di Tengah */}
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
              
              {/* Main Loading Circle */}
              <div className="relative h-[100px] w-[100px] sm:h-[120px] sm:w-[120px] md:h-[140px] md:w-[140px]">
                {/* Progress Ring */}
                <svg className="absolute inset-0 h-full w-full -rotate-90">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="calc(50% - 8px)"
                    stroke="url(#progressGradient)"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="314"
                    strokeDashoffset={314 - (314 * loadingPercentage) / 100}
                    className="transition-all duration-100 ease-out"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00E5FF" />
                      <stop offset="50%" stopColor="#19A0FF" />
                      <stop offset="100%" stopColor="#00E5FF" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Inner Circle */}
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

                  {/* Center Dot */}
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute h-2 w-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 sm:h-2.5 sm:w-2.5"
                  />
                </div>

                {/* Small Dots on Circle */}
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
            </motion.div>
          </div>

          {/* Skills Grid - Di Bawah Loading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="absolute bottom-8 sm:bottom-12 w-full max-w-4xl px-4"
          >
            {/* Container untuk skills */}
            <div className="relative">
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
                    </motion.div>
                  )
                })}
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
                    Building digital solutions with precision
                  </span>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vignette Effect */}
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

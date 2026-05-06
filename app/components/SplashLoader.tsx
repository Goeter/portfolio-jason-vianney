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

// ================= AI TYPEWRITER =================
function useTypewriter(text: string, speed = 70) {
  const [displayText, setDisplayText] = useState("")

  useEffect(() => {
    let i = 0

    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i))
      i++

      if (i > text.length) {
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return displayText
}

export default function SplashLoader({ onLoadingComplete }: Props) {
  const [fadeOut, setFadeOut] = useState(false)
  const [loadingPercentage, setLoadingPercentage] = useState(0)

  const animationFrameRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)
  const totalDuration = 6500

  const typedWelcome = useTypewriter("WELCOME TO MY PORTFOLIO", 65)

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

  // ================= LOADING =================
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
  }, [])

  // ================= TRANSITION =================
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true)

      setTimeout(() => {
        onLoadingComplete()
      }, 600)

    }, totalDuration)

    return () => clearTimeout(timer)
  }, [onLoadingComplete])

  return (
    <main
      className={`relative h-dvh w-full overflow-hidden bg-[oklch(0.15_0_0)] transition-all duration-700 ${
        fadeOut ? "opacity-0 scale-105 blur-sm" : "opacity-100"
      }`}
    >

      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.10),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:42px_42px]" />
      </div>

      <ArcReactorCanvas className="absolute inset-0" />

      <section className="relative z-10 h-full flex flex-col items-center justify-center">

        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-[12%] text-center px-4"
        >

          {/* AI SYSTEM TEXT */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[10px] tracking-[0.3em] text-cyan-400/40 mb-2"
          >
            AI SYSTEM INITIALIZING
          </motion.div>

          {/* TYPEWRITER WELCOME */}
          <p className="text-xs tracking-[0.4em] text-cyan-300/70 mb-3">
            <span className="relative">
              {typedWelcome}
              <span className="ml-1 animate-pulse">|</span>
            </span>
          </p>

          {/* FLOATING NAME (ROUND MOTION) */}
          <motion.h1
            animate={{
              rotate: [-0.6, 0.6, -0.6],
              y: [0, -2, 0],
              scale: [1, 1.01, 1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-4xl md:text-6xl font-semibold bg-gradient-to-r from-blue-300 via-cyan-200 to-purple-300 bg-clip-text text-transparent"
            style={{
              borderRadius: "999px",
              display: "inline-block"
            }}
          >
            Jason Vianney Sugiarto
          </motion.h1>

          {/* underline glow */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mx-auto mt-4 h-[1px] w-44 bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent"
          />
        </motion.div>

        {/* ================= ARC REACTOR ================= */}
        <div className="relative flex items-center justify-center mt-10">

          <div className="relative h-[140px] w-[140px]">

            {/* SOFT GLOW */}
            <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-2xl" />

            {/* RING */}
            <svg className="absolute inset-0 h-full w-full -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="60"
                stroke="url(#grad)"
                strokeWidth="4"
                fill="none"
                strokeDasharray="377"
                strokeDashoffset={377 - (377 * loadingPercentage) / 100}
              />
              <defs>
                <linearGradient id="grad">
                  <stop offset="0%" stopColor="#00E5FF" />
                  <stop offset="100%" stopColor="#19A0FF" />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-white">
                {loadingPercentage}%
              </span>
            </div>

          </div>
        </div>

        {/* ================= SKILLS ================= */}
        <div className="absolute bottom-16 grid grid-cols-2 lg:grid-cols-4 gap-4 px-4 max-w-5xl w-full">

          {skills.map((skill, i) => {
            const Icon = skill.icon
            return (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className={`rounded-xl p-4 text-center border border-white/10 ${skill.bgColor}`}
              >

                <div className={`mx-auto mb-2 h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-br ${skill.color}`}>
                  <Icon className="text-white w-5 h-5"/>
                </div>

                <h3 className="text-sm font-semibold text-white">
                  {skill.title}
                </h3>

                <p className="text-xs text-gray-300/70">
                  {skill.description}
                </p>

              </motion.div>
            )
          })}

        </div>

        {/* TAGLINE */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-6 text-sm text-gray-300/70"
        >
          <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-purple-300 bg-clip-text text-transparent">
            Building digital solutions with precision
          </span>
        </motion.p>

      </section>
    </main>
  )
}

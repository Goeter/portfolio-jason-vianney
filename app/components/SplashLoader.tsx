"use client"

import { useEffect, useState, useRef } from "react"
import ArcReactorCanvas from "./arc-reactor-canvas"
import { motion } from "framer-motion"
import { Code, Cpu, Palette, BarChart3 } from "lucide-react"

type Props = {
  onLoadingComplete: () => void
}

export default function SplashLoader({ onLoadingComplete }: Props) {
  const [fadeOut, setFadeOut] = useState(false)
  const [loadingPercentage, setLoadingPercentage] = useState(0)

  const animationFrameRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)

  // ⛔ dibuat lebih cepat biar arc reactor tidak terasa lama
  const totalDuration = 4500

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

  // ================= LOADING (SYNC CLEAN) =================
  useEffect(() => {
    const animate = (time: number) => {
      if (!startTimeRef.current) startTimeRef.current = time

      const elapsed = time - startTimeRef.current
      const progress = Math.min(elapsed / totalDuration, 1)

      const eased = 1 - Math.pow(1 - progress, 3)

      setLoadingPercentage(Math.floor(eased * 100))

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate)
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // ================= COMPLETE =================
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true)

      setTimeout(() => {
        onLoadingComplete()
      }, 500)

    }, totalDuration)

    return () => clearTimeout(timer)
  }, [onLoadingComplete])

  return (
    <main
      className={`relative h-dvh w-full overflow-hidden bg-[oklch(0.15_0_0)] transition-all duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >

      {/* BACKGROUND CLEAN */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.08),transparent_65%)]" />
        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      <ArcReactorCanvas className="absolute inset-0" />

      <section className="relative z-10 h-full flex flex-col items-center justify-between py-16">

        {/* ================= TOP TEXT ================= */}
        <div className="text-center px-4 mt-10">
          <p className="text-[10px] sm:text-xs tracking-[0.35em] text-cyan-300/60 mb-2">
            WELCOME TO MY PORTFOLIO
          </p>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold text-transparent bg-gradient-to-r from-blue-300 via-cyan-200 to-purple-300 bg-clip-text">
            Jason Vianney Sugiarto
          </h1>
        </div>

        {/* ================= CENTER LOADING ================= */}
        <div className="flex flex-col items-center justify-center">

          {/* ARC REACTOR + LOADING */}
          <div className="relative h-[120px] w-[120px] sm:h-[140px] sm:w-[140px]">

            {/* soft glow */}
            <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-2xl" />

            {/* progress ring (SYNC WITH LOADING) */}
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

            {/* ONLY NUMBER (NO ANIMATION STYLE) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl sm:text-4xl font-bold text-white">
                {loadingPercentage}%
              </span>
            </div>

          </div>

        </div>

        {/* ================= SKILLS ================= */}
        <div className="w-full max-w-5xl px-4 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">

          {skills.map((skill, i) => {
            const Icon = skill.icon
            return (
              <div
                key={skill.title}
                className={`rounded-xl p-3 sm:p-4 border border-white/10 ${skill.bgColor}`}
              >

                <div className={`h-10 w-10 mx-auto mb-2 flex items-center justify-center rounded-full bg-gradient-to-br ${skill.color}`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>

                <h3 className="text-xs sm:text-sm font-semibold text-white text-center">
                  {skill.title}
                </h3>

                <p className="text-[10px] sm:text-xs text-gray-300/70 text-center mt-1">
                  {skill.description}
                </p>

              </div>
            )
          })}

        </div>

        {/* ================= TAGLINE ================= */}
        <div className="mb-6 text-center px-4">
          <p className="text-xs sm:text-sm text-gray-300/60">
            <span className="text-transparent bg-gradient-to-r from-blue-300 via-cyan-300 to-purple-300 bg-clip-text">
              Building digital solutions with precision
            </span>
          </p>
        </div>

      </section>
    </main>
  )
}

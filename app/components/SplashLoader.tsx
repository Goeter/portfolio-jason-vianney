"use client"

import { useEffect, useState, useRef } from "react"
import ArcReactorCanvas from "./arc-reactor-canvas"
import { motion } from "framer-motion"
import { Code, Cpu, Palette, BarChart3 } from "lucide-react"

type Props = {
  onLoadingComplete: () => void
}

// ================= TYPEWRITER =================
function useTypewriter(text: string, speed = 60, startDelay = 0) {
  const [display, setDisplay] = useState("")

  useEffect(() => {
    let i = 0

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplay(text.slice(0, i))
        i++
        if (i > text.length) clearInterval(interval)
      }, speed)
    }, startDelay)

    return () => clearTimeout(timeout)
  }, [text, speed, startDelay])

  return display
}

export default function SplashLoader({ onLoadingComplete }: Props) {
  const [loading, setLoading] = useState(0)
  const [stage, setStage] = useState(0)

  const startRef = useRef<number>(0)
  const totalDuration = 5000

  // TEXT SEQUENCE
  const welcome = useTypewriter("WELCOME TO MY PORTFOLIO", 55, 300)
  const name = useTypewriter("Jason Vianney Sugiarto", 70, 1800)

  const skills = [
    { title: "Front-end Development", icon: Code },
    { title: "System Analyst", icon: Cpu },
    { title: "UI/UX Design", icon: Palette },
    { title: "Data Analyst", icon: BarChart3 }
  ]

  // ================= LOADING =================
  useEffect(() => {
    const animate = (t: number) => {
      if (!startRef.current) startRef.current = t

      const progress = Math.min((t - startRef.current) / totalDuration, 1)
      setLoading(Math.floor(progress * 100))

      // stage control
      if (progress > 0.2) setStage(1) // reactor appear
      if (progress > 0.4) setStage(2) // skills appear

      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [])

  // ================= FINISH =================
  useEffect(() => {
    const t = setTimeout(() => {
      onLoadingComplete()
    }, totalDuration)

    return () => clearTimeout(t)
  }, [])

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-[oklch(0.15_0_0)]">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.08),transparent_60%)]" />
      <div className="absolute inset-0 opacity-[0.04] [background-size:40px_40px] [background-image:linear-gradient(to_right,#fff1px,transparent_1px),linear-gradient(to_bottom,#fff1px,transparent_1px)]" />

      <ArcReactorCanvas className="absolute inset-0" />

      <section className="relative z-10 h-full flex flex-col items-center justify-center px-4">

        {/* ================= TEXT TOP ================= */}
        <div className="text-center mb-8">

          {/* WELCOME */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold text-cyan-200 tracking-wide">
            {welcome}
            <span className="animate-pulse">|</span>
          </h1>

          {/* NAME */}
          {welcome.length === "WELCOME TO MY PORTFOLIO".length && (
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 text-lg sm:text-2xl md:text-3xl text-white font-medium"
            >
              {name}
              <span className="animate-pulse">|</span>
            </motion.h2>
          )}

        </div>

        {/* ================= ARC REACTOR ================= */}
        {stage >= 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative flex flex-col items-center"
          >

            {/* GLOW */}
            <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-3xl scale-150" />

            {/* REACTOR CORE */}
            <div className="h-[150px] w-[150px] relative flex items-center justify-center">

              <div className="absolute inset-0 rounded-full border border-cyan-400/20 animate-pulse" />

              <div className="text-3xl font-bold text-white">
                {loading}%
              </div>

            </div>

          </motion.div>
        )}

        {/* ================= SKILLS ================= */}
        {stage >= 2 && (
          <div className="mt-10 w-full max-w-5xl grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">

            {skills.map((skill, i) => {
              const Icon = skill.icon

              return (
                <motion.div
                  key={skill.title}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="p-3 sm:p-4 rounded-xl border border-white/10 bg-white/5"
                >
                  <Icon className="text-cyan-300 w-6 h-6 mb-2" />
                  <h3 className="text-white text-sm font-semibold">
                    {skill.title}
                  </h3>
                </motion.div>
              )
            })}

          </div>
        )}

        {/* ================= TAGLINE ================= */}
        {stage >= 2 && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center text-sm text-gray-300/70"
          >
            Building digital solutions with precision
          </motion.p>
        )}

      </section>
    </main>
  )
}

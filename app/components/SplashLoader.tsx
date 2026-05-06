"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code, Cpu, Palette, BarChart3 } from "lucide-react"
import ParticleOrbitCanvas from "./ParticleOrbitCanvas"

type Props = {
  onLoadingComplete: () => void
}

// ================= TYPEWRITER =================
function useTypewriter(text: string, speed = 55, delay = 0) {
  const [out, setOut] = useState("")

  useEffect(() => {
    let i = 0

    const start = setTimeout(() => {
      const interval = setInterval(() => {
        setOut(text.slice(0, i))
        i++
        if (i > text.length) clearInterval(interval)
      }, speed)
    }, delay)

    return () => clearTimeout(start)
  }, [text, speed, delay])

  return out
}

export default function SplashLoader({ onLoadingComplete }: Props) {
  const [loading, setLoading] = useState(0)
  const [stage, setStage] = useState(0)
  const [exit, setExit] = useState(false)

  const startRef = useRef<number>(0)
  const duration = 5200

  // TEXT ANIMATION
  const welcome = useTypewriter("WELCOME TO MY PORTFOLIO", 50, 300)
  const name = useTypewriter("Jason Vianney Sugiarto", 60, 1600)

  const skills = [
    { title: "Front-end Dev", icon: Code, color: "from-cyan-400 to-blue-500" },
    { title: "System Analyst", icon: Cpu, color: "from-purple-400 to-pink-500" },
    { title: "UI/UX Design", icon: Palette, color: "from-amber-400 to-orange-500" },
    { title: "Data Analyst", icon: BarChart3, color: "from-green-400 to-emerald-500" }
  ]

  // ================= LOADING SYSTEM =================
  useEffect(() => {
    const animate = (t: number) => {
      if (!startRef.current) startRef.current = t

      const progress = Math.min((t - startRef.current) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      setLoading(Math.floor(eased * 100))

      // stage control
      if (progress > 0.15) setStage(1)
      if (progress > 0.35) setStage(2)
      if (progress > 0.6) setStage(3)

      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [])

  // ================= EXIT TRANSITION =================
  useEffect(() => {
    const t = setTimeout(() => {
      setExit(true)
      setTimeout(() => onLoadingComplete(), 900)
    }, duration)

    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {!exit && (
        <motion.main
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
          transition={{ duration: 0.9 }}
          className="relative h-dvh w-full overflow-hidden bg-[oklch(0.15_0_0)]"
        >

          {/* ================= BACKGROUND ================= */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.08),transparent_60%)]" />
          </div>

          {/* 🌌 REAL PARTICLE ORBIT REACTOR */}
          <ParticleOrbitCanvas progress={loading} />

          {/* ================= CENTER UI ================= */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full">

            {/* ================= WELCOME ================= */}
            {stage >= 1 && (
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl sm:text-3xl font-semibold text-cyan-200 mb-2 text-center"
              >
                {welcome}
                <span className="animate-pulse">|</span>
              </motion.h1>
            )}

            {/* ================= ARC CORE ================= */}
            <div className="relative flex items-center justify-center mt-2">

              {/* glow sync */}
              <div
                className="absolute inset-0 rounded-full bg-cyan-400/20 blur-3xl"
                style={{
                  transform: `scale(${1 + loading / 140})`
                }}
              />

              <div className="relative w-[150px] h-[150px] flex items-center justify-center">

                <div className="absolute inset-0 rounded-full border border-cyan-400/30 animate-pulse" />

                <span className="text-3xl font-bold text-white">
                  {loading}%
                </span>

              </div>
            </div>

            {/* ================= NAME ================= */}
            {stage >= 2 && (
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-lg sm:text-2xl text-white font-medium text-center"
              >
                {name}
                <span className="animate-pulse">|</span>
              </motion.h2>
            )}

            {/* ================= SKILLS ================= */}
            {stage >= 3 && (
              <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 px-4 max-w-5xl w-full">

                {skills.map((s, i) => {
                  const Icon = s.icon

                  return (
                    <motion.div
                      key={s.title}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className="p-4 rounded-xl bg-white/5 border border-white/10"
                    >
                      <div className={`w-10 h-10 mb-2 rounded-full bg-gradient-to-br ${s.color} flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>

                      <p className="text-white text-sm font-semibold">
                        {s.title}
                      </p>
                    </motion.div>
                  )
                })}

              </div>
            )}

            {/* ================= TAGLINE ================= */}
            {stage >= 3 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 text-sm text-gray-300/70 text-center"
              >
                Building digital solutions with precision
              </motion.p>
            )}

          </div>

        </motion.main>
      )}
    </AnimatePresence>
  )
}

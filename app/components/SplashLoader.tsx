"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Code,
  Cpu,
  Palette,
  BarChart3,
} from "lucide-react"

import ArcReactorCanvas from "./arc-reactor-canvas"

type Props = {
  onLoadingComplete: () => void
}

/* =========================
   TYPEWRITER
========================= */

function useTypewriter(
  text: string,
  speed = 55,
  delay = 0,
) {
  const [out, setOut] = useState("")

  useEffect(() => {
    let i = 0

    const start = setTimeout(() => {
      const interval = setInterval(() => {
        setOut(text.slice(0, i))
        i++

        if (i > text.length) clearInterval(interval)
      }, speed)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(start)
  }, [text, speed, delay])

  return out
}

export default function SplashLoader({
  onLoadingComplete,
}: Props) {
  const [loading, setLoading] = useState(0)
  const [stage, setStage] = useState(0)
  const [exit, setExit] = useState(false)

  const startRef = useRef<number>(0)

  const duration = 7200

  /* =========================
     TYPEWRITER TEXT
  ========================= */

  const welcome = useTypewriter(
    "WELCOME TO MY PORTFOLIO",
    45,
    300,
  )

  const name = useTypewriter(
    "Jason Vianney Sugiarto",
    55,
    1600,
  )

  /* =========================
     SKILLS
  ========================= */

  const skills = [
    {
      title: "Front-end Dev",
      icon: Code,
      color: "from-cyan-400 to-blue-500",
    },
    {
      title: "System Analyst",
      icon: Cpu,
      color: "from-purple-400 to-pink-500",
    },
    {
      title: "UI/UX Design",
      icon: Palette,
      color: "from-amber-400 to-orange-500",
    },
    {
      title: "Data Analyst",
      icon: BarChart3,
      color: "from-green-400 to-emerald-500",
    },
  ]

  /* =========================
     LOADING SYSTEM
  ========================= */

  useEffect(() => {
    const animate = (t: number) => {
      if (!startRef.current) {
        startRef.current = t
      }

      const progress = Math.min(
        (t - startRef.current) / duration,
        1,
      )

      const eased =
        1 - Math.pow(1 - progress, 3)

      const value = Math.floor(eased * 100)

      setLoading(value)

      if (progress > 0.12) setStage(1)
      if (progress > 0.35) setStage(2)
      if (progress > 0.6) setStage(3)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [])

  /* =========================
     EXIT
  ========================= */

  useEffect(() => {
    const timer = setTimeout(() => {
      setExit(true)

      setTimeout(() => {
        onLoadingComplete()
      }, 1200)
    }, duration + 400)

    return () => clearTimeout(timer)
  }, [onLoadingComplete])

  return (
    <AnimatePresence>
      {!exit && (
        <motion.main
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(16px)",
          }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
          }}
          className="
            relative
            h-dvh
            w-full
            overflow-hidden
            bg-[#020617]
          "
        >
          {/* =========================
              BACKGROUND
          ========================= */}

          <div className="absolute inset-0">

            {/* ambient glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_60%)]" />

            {/* cinematic overlay */}
            <div className="absolute inset-0 opacity-[0.08] mix-blend-screen">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.35),transparent_60%)]" />

              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(59,130,246,0.08),transparent)]" />
            </div>

            {/* vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.75)_100%)]" />

          </div>

          {/* =========================
              ARC REACTOR
          ========================= */}

          <div className="absolute inset-0">
            <ArcReactorCanvas />
          </div>

          {/* =========================
              CENTER CONTENT
          ========================= */}

          <div className="relative z-20 flex h-full flex-col items-center justify-center px-4">

            {/* =========================
                WELCOME
            ========================= */}

            {stage >= 1 && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                }}
                className="mb-5"
              >
                <h1
                  className="
                    text-center
                    text-lg
                    sm:text-3xl
                    font-semibold
                    tracking-[0.25em]
                    text-cyan-100
                    drop-shadow-[0_0_20px_rgba(103,232,249,0.7)]
                  "
                >
                  {welcome}
                  <span className="animate-pulse">
                    |
                  </span>
                </h1>
              </motion.div>
            )}

            {/* =========================
                MAIN REACTOR UI
            ========================= */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 1,
              }}
              className="
                relative
                flex
                h-[520px]
                w-full
                items-center
                justify-center
              "
            >

              {/* center glow */}
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.5, 0.9, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  absolute
                  w-[340px]
                  h-[340px]
                  rounded-full
                  bg-cyan-400/10
                  blur-3xl
                "
              />

              {/* HUD overlay */}
              <div className="relative z-30 flex flex-col items-center">

                {/* percent */}
                <motion.div
                  animate={{
                    opacity: [0.7, 1, 0.7],
                    scale: [1, 1.03, 1],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-center"
                >
                  <h2
                    className="
                      text-[58px]
                      sm:text-[72px]
                      font-black
                      tracking-[0.18em]
                      text-cyan-100
                      drop-shadow-[0_0_30px_rgba(103,232,249,0.95)]
                    "
                  >
                    {loading}%
                  </h2>

                  <p
                    className="
                      mt-2
                      text-[10px]
                      sm:text-xs
                      tracking-[0.45em]
                      text-cyan-300/70
                    "
                  >
                    ARC REACTOR SYNCHRONIZATION
                  </p>
                </motion.div>

                {/* loading bar */}
                <div
                  className="
                    mt-6
                    h-[3px]
                    w-[260px]
                    overflow-hidden
                    rounded-full
                    bg-white/10
                  "
                >
                  <motion.div
                    className="
                      h-full
                      rounded-full
                      bg-gradient-to-r
                      from-cyan-400
                      via-blue-500
                      to-purple-500
                    "
                    animate={{
                      width: `${loading}%`,
                    }}
                    transition={{
                      ease: "easeOut",
                    }}
                  />
                </div>

              </div>
            </motion.div>

            {/* =========================
                NAME
            ========================= */}

            {stage >= 2 && (
              <motion.h2
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                }}
                className="
                  mt-2
                  text-center
                  text-xl
                  sm:text-3xl
                  font-semibold
                  text-white
                  drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]
                "
              >
                {name}
                <span className="animate-pulse">
                  |
                </span>
              </motion.h2>
            )}

            {/* =========================
                SKILLS
            ========================= */}

            {stage >= 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="
                  mt-10
                  grid
                  w-full
                  max-w-6xl
                  grid-cols-2
                  gap-4
                  px-4
                  lg:grid-cols-4
                "
              >
                {skills.map((s, i) => {
                  const Icon = s.icon

                  return (
                    <motion.div
                      key={s.title}
                      initial={{
                        opacity: 0,
                        y: 40,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: i * 0.12,
                        duration: 0.6,
                      }}
                      whileHover={{
                        y: -6,
                        scale: 1.03,
                      }}
                      className="
                        group
                        relative
                        overflow-hidden
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/[0.04]
                        p-5
                        backdrop-blur-xl
                      "
                    >

                      {/* glow */}
                      <div
                        className={`
                          absolute
                          inset-0
                          opacity-0
                          blur-2xl
                          transition-opacity
                          duration-500
                          group-hover:opacity-30
                          bg-gradient-to-br
                          ${s.color}
                        `}
                      />

                      <div className="relative z-10">

                        <div
                          className={`
                            mb-4
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-2xl
                            bg-gradient-to-br
                            ${s.color}
                            shadow-[0_0_25px_rgba(59,130,246,0.35)]
                          `}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </div>

                        <p
                          className="
                            text-sm
                            font-semibold
                            tracking-wide
                            text-white
                          "
                        >
                          {s.title}
                        </p>

                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            )}

            {/* =========================
                TAGLINE
            ========================= */}

            {stage >= 3 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.5,
                }}
                className="
                  mt-10
                  text-center
                  text-sm
                  tracking-[0.25em]
                  text-cyan-100/60
                "
              >
                BUILDING DIGITAL SYSTEMS WITH
                PRECISION & INTELLIGENCE
              </motion.p>
            )}

          </div>

          {/* =========================
              SCAN LINE
          ========================= */}

          <motion.div
            animate={{
              y: ["-10%", "110%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              pointer-events-none
              absolute
              inset-x-0
              h-[180px]
              bg-gradient-to-b
              from-transparent
              via-cyan-400/10
              to-transparent
              blur-2xl
            "
          />

        </motion.main>
      )}
    </AnimatePresence>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Code2,
  Cpu,
  Palette,
  BarChart3,
} from "lucide-react"

import ArcReactorCanvas from "./ArcReactorCanvas"

type Props = {
  onLoadingComplete: () => void
}

export default function SplashLoader({
  onLoadingComplete,
}: Props) {
  const [loading, setLoading] = useState(0)
  const [finished, setFinished] =
    useState(false)

  const startRef = useRef(0)

  const duration = 4200

  const skills = [
    {
      title: "Front-end Dev",
      icon: Code2,
      color:
        "from-cyan-400 to-blue-500",
    },
    {
      title: "System Analyst",
      icon: Cpu,
      color:
        "from-purple-400 to-fuchsia-500",
    },
    {
      title: "UI/UX Designer",
      icon: Palette,
      color:
        "from-orange-400 to-pink-500",
    },
    {
      title: "Data Analyst",
      icon: BarChart3,
      color:
        "from-emerald-400 to-green-500",
    },
  ]

  useEffect(() => {
    let raf = 0

    const animate = (time: number) => {
      if (!startRef.current) {
        startRef.current = time
      }

      const progress = Math.min(
        (time - startRef.current) /
          duration,
        1,
      )

      const eased =
        1 -
        Math.pow(1 - progress, 3)

      setLoading(
        Math.floor(eased * 100),
      )

      if (progress < 1) {
        raf =
          requestAnimationFrame(
            animate,
          )
      } else {
        setTimeout(() => {
          setFinished(true)

          setTimeout(() => {
            onLoadingComplete()
          }, 700)
        }, 350)
      }
    }

    raf =
      requestAnimationFrame(
        animate,
      )

    return () =>
      cancelAnimationFrame(raf)
  }, [onLoadingComplete])

  return (
    <AnimatePresence>
      {!finished && (
        <motion.main
          initial={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
            scale: 1.03,
            filter: "blur(10px)",
          }}
          transition={{
            duration: 0.8,
          }}
          className="relative h-screen w-full overflow-hidden bg-[#020617]"
        >
          {/* BACKGROUND */}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_60%)]" />

          <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:80px_80px]" />

          {/* ARC REACTOR */}

          <div className="absolute inset-0 z-0">
            <ArcReactorCanvas
              progress={loading}
              className="h-full w-full"
            />
          </div>

          {/* CONTENT */}

          <div className="relative z-20 flex h-full flex-col items-center justify-center px-6">

            {/* TOP TITLE */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.9,
              }}
              className="mb-10 text-center"
            >
              <motion.h1
                animate={{
                  opacity: [
                    0.6,
                    1,
                    0.6,
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="text-[13px] sm:text-[18px] font-semibold tracking-[0.45em] text-cyan-100"
              >
                WELCOME TO MY PORTFOLIO
              </motion.h1>
            </motion.div>

            {/* CENTER */}

            <div className="relative flex h-[360px] w-full items-center justify-center">

              {/* GLOW */}

              <motion.div
                animate={{
                  scale: [
                    1,
                    1.08,
                    1,
                  ],
                  opacity: [
                    0.4,
                    0.7,
                    0.4,
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute h-[260px] w-[260px] rounded-full bg-cyan-400/10 blur-3xl"
              />

              {/* LOADING TEXT */}

              <div className="relative z-30 flex flex-col items-center">

                <motion.h2
                  key={loading}
                  initial={{
                    opacity: 0.4,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.18,
                  }}
                  className="text-[60px] sm:text-[78px] font-black tracking-[0.16em] text-cyan-100 drop-shadow-[0_0_30px_rgba(34,211,238,0.9)]"
                >
                  {loading}%
                </motion.h2>

                <motion.p
                  animate={{
                    opacity: [
                      0.5,
                      1,
                      0.5,
                    ],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                  }}
                  className="mt-2 text-[10px] tracking-[0.5em] text-cyan-300/70"
                >
                  ARC REACTOR INITIALIZING
                </motion.p>

                {/* LOADING BAR */}

                <div className="mt-6 h-[4px] w-[260px] overflow-hidden rounded-full bg-white/10">

                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
                    animate={{
                      width: `${loading}%`,
                    }}
                    transition={{
                      ease: "easeOut",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* NAME */}

            <motion.h2
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity:
                  loading > 25
                    ? 1
                    : 0,
                y:
                  loading > 25
                    ? 0
                    : 20,
              }}
              transition={{
                duration: 0.7,
              }}
              className="mt-3 text-center text-2xl sm:text-4xl font-semibold text-white"
            >
              Jason Vianney Sugiarto
            </motion.h2>

            {/* SKILLS */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity:
                  loading > 50
                    ? 1
                    : 0,
              }}
              transition={{
                duration: 0.7,
              }}
              className="mt-10 grid w-full max-w-5xl grid-cols-2 gap-4 lg:grid-cols-4"
            >
              {skills.map(
                (
                  skill,
                  index,
                ) => {
                  const Icon =
                    skill.icon

                  return (
                    <motion.div
                      key={
                        skill.title
                      }
                      initial={{
                        opacity: 0,
                        y: 25,
                      }}
                      animate={{
                        opacity:
                          loading >
                          50
                            ? 1
                            : 0,
                        y:
                          loading >
                          50
                            ? 0
                            : 25,
                      }}
                      transition={{
                        delay:
                          index *
                          0.1,
                        duration: 0.45,
                      }}
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
                    >
                      {/* hover glow */}

                      <div
                        className={`absolute inset-0 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30 bg-gradient-to-br ${skill.color}`}
                      />

                      <div className="relative z-10">

                        <div
                          className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${skill.color}`}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </div>

                        <p className="text-sm font-semibold text-white">
                          {
                            skill.title
                          }
                        </p>
                      </div>
                    </motion.div>
                  )
                },
              )}
            </motion.div>

            {/* TAGLINE */}

            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity:
                  loading > 70
                    ? 1
                    : 0,
              }}
              transition={{
                duration: 1,
              }}
              className="mt-10 text-center text-[11px] tracking-[0.45em] text-cyan-100/60"
            >
              BUILDING DIGITAL SYSTEMS
              WITH PRECISION
            </motion.p>
          </div>
        </motion.main>
      )}
    </AnimatePresence>
  )
}

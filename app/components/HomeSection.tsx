"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Download, ArrowRight } from "lucide-react"

/* ─── Batik + Tech SVG background ─── */
function BatikBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="1440" height="900" fill="#0B1724" />

      <defs>
        <pattern id="kawung" x="0" y="0" width="44" height="44" patternUnits="userSpaceOnUse">
          <ellipse cx="22" cy="11" rx="9" ry="6" fill="none" stroke="#C8A96E" strokeWidth="0.45" opacity="0.22" />
          <ellipse cx="22" cy="33" rx="9" ry="6" fill="none" stroke="#C8A96E" strokeWidth="0.45" opacity="0.22" />
          <ellipse cx="11" cy="22" rx="6" ry="9" fill="none" stroke="#C8A96E" strokeWidth="0.45" opacity="0.22" />
          <ellipse cx="33" cy="22" rx="6" ry="9" fill="none" stroke="#C8A96E" strokeWidth="0.45" opacity="0.22" />
        </pattern>

        <pattern id="circuit" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
          <line x1="0" y1="24" x2="48" y2="24" stroke="#7DA5C8" strokeWidth="0.3" opacity="0.14" />
          <line x1="24" y1="0" x2="24" y2="48" stroke="#7DA5C8" strokeWidth="0.3" opacity="0.14" />
          <circle cx="24" cy="24" r="3" fill="none" stroke="#7DA5C8" strokeWidth="0.35" opacity="0.16" />
        </pattern>

        <radialGradient id="gLeft" cx="25%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#C8A96E" stopOpacity="0.11" />
          <stop offset="100%" stopColor="#C8A96E" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="gRight" cx="78%" cy="58%" r="48%">
          <stop offset="0%" stopColor="#378ADD" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#378ADD" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1440" height="900" fill="url(#kawung)" />
      <rect width="1440" height="900" fill="url(#circuit)" />
      <rect width="1440" height="900" fill="url(#gLeft)" />
      <rect width="1440" height="900" fill="url(#gRight)" />
    </svg>
  )
}

/* ─── Animated Floating Lights ─── */
function FloatingLights() {
  return (
    <>
      <motion.div
        className="absolute top-[10%] left-[8%] w-32 h-32 rounded-full blur-3xl"
        style={{
          background: "rgba(200,169,110,0.10)",
        }}
        animate={{
          y: [0, -20, 0],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-[12%] right-[8%] w-44 h-44 rounded-full blur-3xl"
        style={{
          background: "rgba(55,138,221,0.10)",
        }}
        animate={{
          y: [0, 20, 0],
          x: [0, -15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  )
}

/* ─── Premium Photo Frame ─── */
function PhotoFrame({ src }: { src?: string }) {
  return (
    <motion.div
      className="relative flex items-center justify-center"
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Soft Glow */}
      <motion.div
        className="absolute rounded-[42px] blur-3xl"
        style={{
          width: "88%",
          height: "88%",
          background: "rgba(200,169,110,0.18)",
        }}
        animate={{
          opacity: [0.45, 0.8, 0.45],
          scale: [1, 1.04, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Gold Border */}
      <motion.div
        className="relative overflow-hidden rounded-[38px]"
        style={{
          width: "100%",
          height: "100%",
          padding: "3px",
          background:
            "linear-gradient(145deg, rgba(255,220,150,0.9), rgba(200,169,110,0.25))",
          boxShadow:
            "0 0 40px rgba(200,169,110,0.18), 0 0 80px rgba(200,169,110,0.08)",
        }}
        whileHover={{
          scale: 1.02,
        }}
        transition={{
          type: "spring",
          stiffness: 220,
        }}
      >
        {/* Photo */}
        <div
          className="relative w-full h-full overflow-hidden rounded-[34px]"
          style={{
            background: "#142434",
          }}
        >
          {src && (
            <motion.div
              className="w-full h-full"
              animate={{
                scale: [1.04, 1.08, 1.04],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src={src}
                alt="Jason Vianney Sugiarto"
                fill
                priority
                sizes="(max-width: 768px) 88vw, 520px"
                className="object-cover"
              />
            </motion.div>
          )}

          {/* Shine Effect */}
          <motion.div
            className="absolute inset-y-0 -left-[40%] w-[30%]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
              transform: "skewX(-18deg)",
            }}
            animate={{
              left: ["-40%", "140%"],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Main ─── */
export default function HomeSection() {
  const projectsRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    projectsRef.current = document.querySelector("#projects")
  }, [])

  const handleDownloadPDF = () => {
    const fileId = "10Nllp8ydFAMENKFA0089aGdT5hCijCNd95oKo_DI3NU"
    const pdfUrl = `https://docs.google.com/document/d/${fileId}/export?format=pdf`

    const link = document.createElement("a")
    link.href = pdfUrl
    link.download = "Jason_Vianney_Sugiarto_Resume.pdf"

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleViewProjects = () => {
    const el = document.querySelector("#projects") as HTMLElement | null

    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  const fadeSlideLeft = (delay: number) => ({
    initial: { opacity: 0, x: -28 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.55, ease: "easeOut", delay },
  })

  const fadeSlideRight = {
    initial: { opacity: 0, x: 28 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.65, ease: "easeOut", delay: 0.35 },
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 md:pt-24 pb-12"
      style={{ background: "#0B1724" }}
    >
      <BatikBackground />
      <FloatingLights />

      {/* Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(135deg, rgba(11,23,36,0.86) 0%, rgba(11,23,36,0.58) 50%, rgba(11,23,36,0.78) 100%)",
        }}
      />

      <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-10 items-center">

          {/* LEFT */}
          <div className="flex flex-col order-2 lg:order-1">

            {/* Eyebrow */}
            <motion.div
              className="flex items-center gap-3 mb-5 flex-wrap"
              {...fadeSlideLeft(0.3)}
            >
              <span className="w-7 h-[1px] bg-[#C8A96E] opacity-70" />

              <span
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "clamp(11px, 1vw, 12px)",
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#C8A96E",
                }}
              >
                IT Professional
              </span>

              <span className="w-7 h-[1px] bg-[#C8A96E] opacity-70" />
            </motion.div>

            {/* Greeting */}
            <motion.p
              className="mb-2"
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "clamp(14px, 1.5vw, 16px)",
                color: "rgba(220,210,190,0.7)",
              }}
              {...fadeSlideLeft(0.4)}
            >
              Hello, I'm
            </motion.p>

            {/* Name */}
            <motion.h1
              className="leading-none mb-3"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(40px, 8vw, 68px)",
                fontWeight: 600,
                color: "#F4EDD8",
              }}
              {...fadeSlideLeft(0.45)}
            >
              Jason Vianney
              <br />
              <span style={{ color: "#C8A96E" }}>Sugiarto</span>
            </motion.h1>

            {/* Accent */}
            <motion.div
              style={{
                height: 2,
                width: 64,
                background: "#C8A96E",
                borderRadius: 999,
                opacity: 0.55,
                marginBottom: 26,
              }}
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
            />

            {/* Tags */}
            <motion.div
              className="flex flex-wrap gap-3 mb-7"
              {...fadeSlideLeft(0.55)}
            >
              {[
                { label: "Fullstack Dev", bg: "rgba(55,138,221,0.1)", color: "#85B7EB", border: "rgba(133,183,235,0.3)" },
                { label: "System Analysis", bg: "rgba(29,158,117,0.1)", color: "#5DCAA5", border: "rgba(93,202,165,0.3)" },
                { label: "UI / UX Design", bg: "rgba(99,153,34,0.1)", color: "#97C459", border: "rgba(151,196,89,0.3)" },
                { label: "Data Analyst", bg: "rgba(200,169,110,0.1)", color: "#FAC775", border: "rgba(250,199,117,0.3)" },
              ].map(({ label, bg, color, border }) => (
                <motion.span
                  key={label}
                  whileHover={{
                    y: -2,
                    scale: 1.03,
                  }}
                  style={{
                    padding: "7px 14px",
                    borderRadius: 10,
                    fontSize: "clamp(10px, 1vw, 12px)",
                    fontWeight: 500,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    fontFamily: "DM Sans, sans-serif",
                    background: bg,
                    color,
                    border: `0.5px solid ${border}`,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {label}
                </motion.span>
              ))}
            </motion.div>

            {/* Description */}
            <motion.p
              className="max-w-[620px]"
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "clamp(15px, 1.7vw, 18px)",
                lineHeight: 1.9,
                color: "rgba(210,200,182,0.9)",
                marginBottom: 34,
                textAlign: "justify",
              }}
              {...fadeSlideLeft(0.65)}
            >
              IT Professional focused on creating innovative digital solutions —
              transforming complex challenges into elegant, efficient, and
              user-friendly experiences through fullstack development,
              system analysis, and data-driven insights.
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              {...fadeSlideLeft(0.75)}
            >
              {/* Download */}
              <motion.button
                onClick={handleDownloadPDF}
                className="relative overflow-hidden inline-flex items-center justify-center gap-2"
                style={{
                  padding: "14px 30px",
                  background: "#C8A96E",
                  color: "#0B1724",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "clamp(12px, 1vw, 13px)",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  borderRadius: 14,
                  boxShadow:
                    "0 10px 30px rgba(200,169,110,0.22)",
                }}
                whileHover={{
                  y: -4,
                  scale: 1.02,
                  boxShadow:
                    "0 16px 38px rgba(200,169,110,0.30)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Glow */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
                  }}
                  animate={{
                    x: ["-120%", "140%"],
                  }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                <motion.div
                  animate={{
                    y: [0, 3, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative z-10"
                >
                  <Download size={17} />
                </motion.div>

                <span className="relative z-10">
                  Download Resume
                </span>
              </motion.button>

              {/* Projects */}
              <motion.button
                onClick={handleViewProjects}
                className="inline-flex items-center justify-center gap-2"
                style={{
                  padding: "13px 24px",
                  background: "rgba(255,255,255,0.03)",
                  color: "rgba(181,212,244,0.92)",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "clamp(12px, 1vw, 13px)",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  borderRadius: 14,
                  border: "0.5px solid rgba(133,183,235,0.35)",
                  backdropFilter: "blur(8px)",
                }}
                whileHover={{
                  y: -3,
                  backgroundColor: "rgba(133,183,235,0.08)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                View Projects

                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight size={15} />
                </motion.span>
              </motion.button>
            </motion.div>
          </div>

          {/* RIGHT */}
          <motion.div
            className="flex justify-center lg:justify-end order-1 lg:order-2"
            {...fadeSlideRight}
          >
            <div
              className="relative flex items-center justify-center"
              style={{
                width: "min(92vw, 520px)",
                height: "min(92vw, 520px)",
              }}
            >
              <PhotoFrame src="/assets/profile/photo.jpeg" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll */}
      <motion.div
        className="absolute bottom-5 left-1/2 hidden md:flex"
        style={{
          transform: "translateX(-50%)",
          flexDirection: "column",
          alignItems: "center",
          gap: 5,
          opacity: 0.3,
        }}
        animate={{ y: [0, 7, 0] }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div style={{ width: 1, height: 26, background: "#C8A96E" }} />
        <div
          style={{
            width: 3,
            height: 3,
            borderRadius: "50%",
            background: "#C8A96E",
          }}
        />
      </motion.div>
    </section>
  )
}

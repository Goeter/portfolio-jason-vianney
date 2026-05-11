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
      className="relative flex items-center justify-center w-full h-full"
      animate={{
        y: [0, -10, 0],
        rotate: [0, 0.6, 0, -0.6, 0],
      }}
      transition={{
        duration: 7,
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
          background: "rgba(200,169,110,0.16)",
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Gold Border */}
      <motion.div
        className="relative overflow-hidden rounded-[38px] w-full h-full"
        style={{
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
              className="relative w-full h-full"
              animate={{
                scale: [1.03, 1.06, 1.03],
                y: [0, -6, 0],
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

  const expertise = [
    {
      label: "IT Fullstack",
      bg: "rgba(55,138,221,0.12)",
      color: "#8CC8FF",
      border: "rgba(140,200,255,0.25)",
    },
    {
      label: "System Analyst",
      bg: "rgba(100,210,170,0.12)",
      color: "#73E0B6",
      border: "rgba(115,224,182,0.25)",
    },
    {
      label: "UI/UX Designer",
      bg: "rgba(255,170,80,0.12)",
      color: "#FFBC72",
      border: "rgba(255,188,114,0.25)",
    },
    {
      label: "Data Analyst",
      bg: "rgba(215,140,255,0.12)",
      color: "#D99BFF",
      border: "rgba(217,155,255,0.25)",
    },
    {
      label: "Tutor",
      bg: "rgba(255,220,120,0.12)",
      color: "#FFE083",
      border: "rgba(255,224,131,0.25)",
    },
  ]

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-10 items-center">

          {/* LEFT */}
          <div className="flex flex-col order-1 lg:order-1">

            {/* 4a */}
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
                fontSize: "clamp(16px, 1.8vw, 18px)",
                fontWeight: 500,
                letterSpacing: "0.02em",
                color: "rgba(255,255,255,0.88)",
              }}
              {...fadeSlideLeft(0.4)}
            >
              Hello, I'm
            </motion.p>

            {/* 4c */}
            <motion.h1
              className="leading-none mb-5"
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

            {/* 4d MOBILE PHOTO */}
            <motion.div
              className="flex lg:hidden justify-center mb-8"
              {...fadeSlideLeft(0.5)}
            >
              <div
                className="relative"
                style={{
                  width: "min(88vw, 380px)",
                  height: "min(88vw, 380px)",
                }}
              >
                <PhotoFrame src="/assets/profile/photo.jpeg" />
              </div>
            </motion.div>

            {/* My Expertise */}
            <motion.div
              className="mb-4"
              {...fadeSlideLeft(0.55)}
            >
              <h2
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "clamp(16px, 1.8vw, 19px)",
                  fontWeight: 600,
                  color: "#F4EDD8",
                  letterSpacing: "0.03em",
                }}
              >
                My Expertise
              </h2>
            </motion.div>

            {/* 4f */}
            <motion.div
              className="flex flex-wrap gap-3 mb-8"
              {...fadeSlideLeft(0.6)}
            >
              {expertise.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -3,
                    scale: 1.03,
                  }}
                  style={{
                    padding: "10px 16px",
                    borderRadius: 14,
                    background: item.bg,
                    color: item.color,
                    border: `1px solid ${item.border}`,
                    backdropFilter: "blur(10px)",
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "clamp(11px, 1vw, 13px)",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                  }}
                >
                  {item.label}
                </motion.div>
              ))}
            </motion.div>

            {/* Description */}
            <motion.p
              className="max-w-[620px]"
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "clamp(15px, 1.7vw, 18px)",
                lineHeight: 1.9,
                color: "rgba(255,255,255,0.92)",
                marginBottom: 34,
                textAlign: "justify",
              }}
              {...fadeSlideLeft(0.65)}
            >
              IT Professional with 4 years of experience in fullstack development, system analysis, and data
              analytics, focused on delivering efficient, scalable, and user-centered digital solutions. Also
              experienced as a Math and English Tutor with strong analytical thinking and communication skills.
            </motion.p>

            {/* 4h */}
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
                  background: "rgba(255,255,255,0.04)",
                  color: "#FFFFFF",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "clamp(12px, 1vw, 13px)",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  borderRadius: 14,
                  border: "0.5px solid rgba(255,255,255,0.22)",
                  backdropFilter: "blur(8px)",
                }}
                whileHover={{
                  y: -3,
                  backgroundColor: "rgba(255,255,255,0.08)",
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

          {/* RIGHT DESKTOP PHOTO */}
          <motion.div
            className="hidden lg:flex justify-center lg:justify-end order-2"
            {...fadeSlideRight}
          >
            <div
              className="relative"
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
    </section>
  )
}

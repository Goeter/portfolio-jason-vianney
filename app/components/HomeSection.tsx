"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Download, ArrowRight } from "lucide-react"
import { expertise, siteConfig } from "@/lib/site-content"

/* ─────────────────────────────────────────────
   Batik + Tech Background
───────────────────────────────────────────── */
function BatikBackground() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="1440" height="900" fill="#0B1724" />

      <defs>
        <pattern
          id="kawung"
          width="44"
          height="44"
          patternUnits="userSpaceOnUse"
        >
          <ellipse
            cx="22"
            cy="11"
            rx="9"
            ry="6"
            fill="none"
            stroke="#C8A96E"
            strokeWidth="0.45"
            opacity="0.22"
          />
          <ellipse
            cx="22"
            cy="33"
            rx="9"
            ry="6"
            fill="none"
            stroke="#C8A96E"
            strokeWidth="0.45"
            opacity="0.22"
          />
          <ellipse
            cx="11"
            cy="22"
            rx="6"
            ry="9"
            fill="none"
            stroke="#C8A96E"
            strokeWidth="0.45"
            opacity="0.22"
          />
          <ellipse
            cx="33"
            cy="22"
            rx="6"
            ry="9"
            fill="none"
            stroke="#C8A96E"
            strokeWidth="0.45"
            opacity="0.22"
          />
        </pattern>

        <pattern
          id="circuit"
          width="48"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="24"
            x2="48"
            y2="24"
            stroke="#7DA5C8"
            strokeWidth="0.3"
            opacity="0.14"
          />
          <line
            x1="24"
            y1="0"
            x2="24"
            y2="48"
            stroke="#7DA5C8"
            strokeWidth="0.3"
            opacity="0.14"
          />
          <circle
            cx="24"
            cy="24"
            r="3"
            fill="none"
            stroke="#7DA5C8"
            strokeWidth="0.35"
            opacity="0.16"
          />
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

/* ─────────────────────────────────────────────
   Floating Lights
───────────────────────────────────────────── */
function FloatingLights() {
  return (
    <>
      <motion.div
        className="absolute left-[8%] top-[10%] h-32 w-32 rounded-full blur-3xl"
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
        className="absolute bottom-[12%] right-[8%] h-44 w-44 rounded-full blur-3xl"
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

/* ─────────────────────────────────────────────
   Premium Photo Frame
───────────────────────────────────────────── */
function PhotoFrame({ src }: { src?: string }) {
  return (
    <motion.div
      className="relative flex h-full w-full items-center justify-center"
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
        className="absolute h-[88%] w-[88%] rounded-[42px] blur-3xl"
        style={{
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

      {/* Border */}
      <motion.div
        className="relative h-full w-full overflow-hidden rounded-[38px]"
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
        <div
          className="relative h-full w-full overflow-hidden rounded-[34px]"
          style={{
            background: "#142434",
          }}
        >
          {src && (
            <motion.div
              className="relative h-full w-full"
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

/* ─────────────────────────────────────────────
   Animation Helpers
───────────────────────────────────────────── */
const fadeSlideLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -28 },
  animate: { opacity: 1, x: 0 },
  transition: {
    duration: 0.55,
    ease: [0.22, 1, 0.36, 1] as const,
    delay,
  },
})

const fadeSlideRight = {
  initial: { opacity: 0, x: 28 },
  animate: { opacity: 1, x: 0 },
  transition: {
    duration: 0.65,
    ease: [0.22, 1, 0.36, 1] as const,
    delay: 0.35,
  },
}

/* ─────────────────────────────────────────────
   Home Section
───────────────────────────────────────────── */
export default function HomeSection() {
  const handleDownloadPDF = () => {
    window.location.href = "https://drive.google.com/uc?export=download&id=1X3l1DMvbzOeZ8C9ISJtk6pk8wMNxy_43"
  }

  const handleViewProjects = () => {
    document
      .querySelector("#projects")
      ?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="home"
      aria-label="Home Section"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[#0B1724] pt-[96px] pb-[96px] md:pt-[118px] md:pb-[118px]"
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

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">

          {/* LEFT CONTENT */}
          <div className="order-1 flex flex-col">

            {/* Greeting */}
            <motion.p
              className="mb-2"
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "clamp(16px, 1.8vw, 18px)",
                fontWeight: 500,
                color: "rgba(255,255,255,0.88)",
              }}
              {...fadeSlideLeft(0.4)}
            >
              Hello, I&apos;m
            </motion.p>

            {/* Name */}
            <motion.h1
              className="mb-5 leading-none"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(40px, 8vw, 68px)",
                fontWeight: 600,
                color: "#F4EDD8",
              }}
              {...fadeSlideLeft(0.45)}
            >
              {siteConfig.shortName}
              <br />
              <span style={{ color: "#C8A96E" }}>
                Sugiarto
              </span>
            </motion.h1>

            {/* Mobile Photo */}
            <motion.div
              className="mb-8 flex justify-center lg:hidden"
              {...fadeSlideLeft(0.5)}
            >
              <div
                className="relative"
                style={{
                  width: "min(88vw, 380px)",
                  height: "min(88vw, 380px)",
                }}
              >
                <PhotoFrame src="/assets/profile/photo.webp" />
              </div>
            </motion.div>

            {/* Expertise Title */}
            <motion.div
              className="mb-4"
              {...fadeSlideLeft(0.55)}
            >
              <h2
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "clamp(16px, 1.8vw, 18px)",
                  fontWeight: 600,
                  color: "#F4EDD8",
                  letterSpacing: "0.03em",
                }}
              >
                My Expertise
              </h2>
            </motion.div>

            {/* Expertise */}
            <motion.div
              className="mb-8 flex flex-wrap gap-3"
              {...fadeSlideLeft(0.6)}
            >
              {expertise.map((item) => (
                <motion.div
                  key={item.label}
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
              className="mb-[34px] max-w-[620px] text-justify"
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "clamp(15px, 1.7vw, 18px)",
                lineHeight: 1.9,
                color: "rgba(255,255,255,0.92)",
              }}
              {...fadeSlideLeft(0.65)}
            >
              IT Professional with 4 years of experience in
              fullstack development, system analysis, and
              data analytics, focused on delivering efficient,
              scalable, and user-centered digital solutions.
              Also experienced as a Math and English Tutor
              with strong analytical thinking and communication
              skills.
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="flex w-full flex-row flex-wrap gap-3 sm:w-auto sm:gap-4"
              {...fadeSlideLeft(0.75)}
            >
              {/* Download Resume */}
              <motion.button
                onClick={handleDownloadPDF}
                className="relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-[14px] sm:flex-none"
                style={{
                  padding: "14px 30px",
                  background: "#C8A96E",
                  color: "#0B1724",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "clamp(12px, 1vw, 13px)",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  boxShadow:
                    "0 10px 30px rgba(200,169,110,0.22)",
                }}
                whileHover={{
                  y: -4,
                  scale: 1.02,
                  boxShadow:
                    "0 16px 38px rgba(200,169,110,0.30)",
                }}
                whileTap={{
                  scale: 0.97,
                }}
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
                  className="relative z-10"
                  animate={{
                    y: [0, 3, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Download size={17} />
                </motion.div>

                <span className="relative z-10">
                  Download Resume
                </span>
              </motion.button>

              {/* View Projects */}
              <motion.button
                onClick={handleViewProjects}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-[14px] sm:flex-none"
                style={{
                  padding: "13px 24px",
                  background: "rgba(255,255,255,0.04)",
                  color: "#FFFFFF",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "clamp(12px, 1vw, 13px)",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  border: "0.5px solid rgba(255,255,255,0.22)",
                  backdropFilter: "blur(8px)",
                }}
                whileHover={{
                  y: -3,
                  backgroundColor: "rgba(255,255,255,0.08)",
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                View Projects

                <motion.span
                  animate={{
                    x: [0, 5, 0],
                  }}
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

          {/* RIGHT PHOTO */}
          <motion.div
            className="order-2 hidden justify-center lg:flex lg:justify-end"
            {...fadeSlideRight}
          >
            <div
              className="relative"
              style={{
                width: "min(92vw, 520px)",
                height: "min(92vw, 520px)",
              }}
            >
              <PhotoFrame src="/assets/profile/photo.webp" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Download, ArrowRight, Code, Network, PenTool, Database } from "lucide-react"

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
          <stop offset="0%" stopColor="#C8A96E" stopOpacity="0.09" />
          <stop offset="100%" stopColor="#C8A96E" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="gRight" cx="78%" cy="58%" r="48%">
          <stop offset="0%" stopColor="#378ADD" stopOpacity="0.06" />
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

/* ─── Rounded Photo Frame ─── */
function PhotoFrame({ src }: { src?: string }) {
  return (
    <div className="relative flex items-center justify-center w-full h-full">

      {/* Glow */}
      <motion.div
        className="absolute rounded-full blur-3xl"
        style={{
          width: "72%",
          height: "72%",
          background: "rgba(200,169,110,0.14)",
        }}
        animate={{
          scale: [1, 1.06, 1],
          opacity: [0.45, 0.7, 0.45],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Outer Rounded Square */}
      <motion.div
        className="absolute rounded-[42px]"
        style={{
          width: "100%",
          height: "100%",
          border: "1px solid rgba(200,169,110,0.22)",
          background: "rgba(255,255,255,0.015)",
          backdropFilter: "blur(8px)",
        }}
        animate={{
          rotate: [0, 1.2, 0, -1.2, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Inner Rounded Frame */}
      <div
        className="absolute rounded-[34px]"
        style={{
          width: "90%",
          height: "90%",
          border: "1px solid rgba(200,169,110,0.18)",
        }}
      />

      {/* Photo */}
      <motion.div
        className="relative z-10 overflow-hidden rounded-[28px]"
        style={{
          width: "82%",
          height: "82%",
          border: "1.5px solid rgba(200,169,110,0.45)",
          background: "rgba(25,40,58,0.92)",
          boxShadow:
            "0 0 30px rgba(200,169,110,0.14), inset 0 0 24px rgba(255,255,255,0.04)",
        }}
        whileHover={{
          y: -4,
        }}
        transition={{
          type: "spring",
          stiffness: 220,
        }}
      >
        {src ? (
          <Image
            src={src}
            alt="Jason Vianney Sugiarto"
            fill
            priority
            sizes="(max-width: 768px) 80vw, 420px"
            className="object-cover scale-[1.04]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 48,
                fontWeight: 600,
                color: "#C8A96E",
              }}
            >
              JVS
            </span>
          </div>
        )}
      </motion.div>
    </div>
  )
}

/* ─── Skill node ─── */
type SkillNodeProps = {
  icon: React.ReactNode
  label: string
  color: string
  bg: string
  border: string
  style?: React.CSSProperties
  delay: number
  floatDir: "up" | "down"
}

function SkillNode({
  icon,
  label,
  color,
  bg,
  border,
  style,
  delay,
  floatDir,
}: SkillNodeProps) {
  return (
    <motion.div
      className="absolute z-20 flex flex-col items-center gap-1"
      style={style}
      animate={{
        y: floatDir === "up" ? [0, -10, 0] : [0, 10, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <div
        className="flex items-center justify-center backdrop-blur-md"
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: bg,
          border: `0.5px solid ${border}`,
          color,
        }}
      >
        {icon}
      </div>

      <span
        style={{
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color,
          opacity: 0.8,
          whiteSpace: "nowrap",
          fontFamily: "DM Sans, sans-serif",
        }}
      >
        {label}
      </span>
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

      {/* Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(135deg, rgba(11,23,36,0.84) 0%, rgba(11,23,36,0.56) 50%, rgba(11,23,36,0.74) 100%)",
        }}
      />

      <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-7xl relative z-10">

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-10 items-center">

          {/* LEFT CONTENT */}
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
                <span
                  key={label}
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
                </span>
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
                  padding: "13px 28px",
                  background: "#C8A96E",
                  color: "#0B1724",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "clamp(12px, 1vw, 13px)",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  borderRadius: 12,
                  boxShadow: "0 10px 24px rgba(200,169,110,0.18)",
                }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.div
                  animate={{ y: [0, 3, 0] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Download size={16} />
                </motion.div>

                Download Resume
              </motion.button>

              {/* Projects */}
              <motion.button
                onClick={handleViewProjects}
                className="inline-flex items-center justify-center gap-2"
                style={{
                  padding: "12px 24px",
                  background: "transparent",
                  color: "rgba(181,212,244,0.9)",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "clamp(12px, 1vw, 13px)",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  borderRadius: 12,
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

          {/* RIGHT CONTENT */}
          <motion.div
            className="flex justify-center lg:justify-end order-1 lg:order-2"
            {...fadeSlideRight}
          >
            <div
              className="relative flex items-center justify-center"
              style={{
                width: "min(90vw, 420px)",
                height: "min(90vw, 420px)",
              }}
            >

              <PhotoFrame src="/assets/profile/photo.jpeg" />

              {/* Skill Nodes */}
              <SkillNode
                icon={<Code size={16} />}
                label="Fullstack"
                color="#85B7EB"
                bg="rgba(55,138,221,0.15)"
                border="rgba(133,183,235,0.35)"
                style={{ top: "8%", left: "2%" }}
                delay={0}
                floatDir="up"
              />

              <SkillNode
                icon={<Network size={16} />}
                label="Systems"
                color="#AFA9EC"
                bg="rgba(127,119,221,0.15)"
                border="rgba(175,169,236,0.35)"
                style={{ top: "5%", right: "2%" }}
                delay={0.5}
                floatDir="down"
              />

              <SkillNode
                icon={<PenTool size={16} />}
                label="UI / UX"
                color="#5DCAA5"
                bg="rgba(29,158,117,0.15)"
                border="rgba(93,202,165,0.35)"
                style={{ bottom: "10%", right: "1%" }}
                delay={1}
                floatDir="up"
              />

              <SkillNode
                icon={<Database size={16} />}
                label="Data"
                color="#FAC775"
                bg="rgba(200,169,110,0.15)"
                border="rgba(250,199,117,0.35)"
                style={{ bottom: "7%", left: "3%" }}
                delay={1.5}
                floatDir="down"
              />
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

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
        {/* Kawung motif */}
        <pattern id="kawung" x="0" y="0" width="44" height="44" patternUnits="userSpaceOnUse">
          <ellipse cx="22" cy="11" rx="9" ry="6" fill="none" stroke="#C8A96E" strokeWidth="0.45" opacity="0.22" />
          <ellipse cx="22" cy="33" rx="9" ry="6" fill="none" stroke="#C8A96E" strokeWidth="0.45" opacity="0.22" />
          <ellipse cx="11" cy="22" rx="6" ry="9" fill="none" stroke="#C8A96E" strokeWidth="0.45" opacity="0.22" />
          <ellipse cx="33" cy="22" rx="6" ry="9" fill="none" stroke="#C8A96E" strokeWidth="0.45" opacity="0.22" />
          <circle cx="22" cy="22" r="3.5" fill="none" stroke="#C8A96E" strokeWidth="0.4" opacity="0.15" />
          <circle cx="0" cy="0" r="1.8" fill="#C8A96E" opacity="0.12" />
          <circle cx="44" cy="44" r="1.8" fill="#C8A96E" opacity="0.12" />
          <circle cx="44" cy="0" r="1.8" fill="#C8A96E" opacity="0.12" />
          <circle cx="0" cy="44" r="1.8" fill="#C8A96E" opacity="0.12" />
        </pattern>
        {/* Truntum motif */}
        <pattern id="truntum" x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M28 14 L31 22 L39 22 L33 27 L35 35 L28 30 L21 35 L23 27 L17 22 L25 22 Z" fill="none" stroke="#C8A96E" strokeWidth="0.4" opacity="0.13" />
          <circle cx="28" cy="28" r="2.5" fill="none" stroke="#C8A96E" strokeWidth="0.35" opacity="0.11" />
        </pattern>
        {/* Circuit / tech grid — right half only */}
        <pattern id="circuit" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse" patternTransform="translate(720,0)">
          <line x1="0" y1="24" x2="48" y2="24" stroke="#7DA5C8" strokeWidth="0.3" opacity="0.14" />
          <line x1="24" y1="0" x2="24" y2="48" stroke="#7DA5C8" strokeWidth="0.3" opacity="0.14" />
          <circle cx="24" cy="24" r="3" fill="none" stroke="#7DA5C8" strokeWidth="0.35" opacity="0.16" />
          <circle cx="0" cy="24" r="1.2" fill="#7DA5C8" opacity="0.12" />
          <circle cx="48" cy="24" r="1.2" fill="#7DA5C8" opacity="0.12" />
          <circle cx="24" cy="0" r="1.2" fill="#7DA5C8" opacity="0.12" />
          <circle cx="24" cy="48" r="1.2" fill="#7DA5C8" opacity="0.12" />
          <rect x="20" y="20" width="8" height="8" fill="none" stroke="#7DA5C8" strokeWidth="0.3" opacity="0.1" />
        </pattern>
        {/* Parang diagonal lines */}
        <pattern id="parang" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse" patternTransform="rotate(18)">
          <path d="M0 16 Q8 2 16 16 Q24 30 32 16" fill="none" stroke="#7DA5C8" strokeWidth="0.35" opacity="0.14" />
          <path d="M0 26 Q8 12 16 26 Q24 40 32 26" fill="none" stroke="#7DA5C8" strokeWidth="0.25" opacity="0.09" />
        </pattern>
        <radialGradient id="gLeft" cx="25%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#C8A96E" stopOpacity="0.09" />
          <stop offset="100%" stopColor="#C8A96E" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="gRight" cx="78%" cy="58%" r="48%">
          <stop offset="0%" stopColor="#378ADD" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#378ADD" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="gVignette" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#0B1724" stopOpacity="0" />
          <stop offset="100%" stopColor="#0B1724" stopOpacity="0.4" />
        </radialGradient>
      </defs>
      <rect width="1440" height="900" fill="url(#kawung)" />
      <rect width="1440" height="900" fill="url(#truntum)" />
      <rect x="680" y="0" width="760" height="900" fill="url(#circuit)" />
      <rect x="680" y="0" width="760" height="900" fill="url(#parang)" />
      <rect width="1440" height="900" fill="url(#gLeft)" />
      <rect width="1440" height="900" fill="url(#gRight)" />
      <rect width="1440" height="900" fill="url(#gVignette)" />
      {/* edge darken top/bottom */}
      <rect width="1440" height="120" fill="#0B1724" opacity="0.55" />
      <rect y="780" width="1440" height="120" fill="#0B1724" opacity="0.6" />
    </svg>
  )
}

/* ─── Diamond photo frame ─── */
function DiamondFrame({ src }: { src?: string }) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Orbit rings */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 290, height: 290,
          border: "0.5px dashed rgba(200,169,110,0.15)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 330, height: 330,
          border: "0.5px dashed rgba(125,165,200,0.1)",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
      />

      {/* Outer dashed diamond */}
      <motion.svg
        className="absolute"
        width={240} height={240}
        viewBox="0 0 240 240"
        fill="none"
        animate={{ opacity: [0.2, 0.1, 0.2], scale: [1, 1.06, 1] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        aria-hidden="true"
      >
        <polygon points="120,3 237,120 120,237 3,120" stroke="#C8A96E" strokeWidth="0.5" strokeDasharray="4,6" />
      </motion.svg>

      {/* Inner solid diamond with corner dots */}
      <motion.svg
        className="absolute"
        width={220} height={220}
        viewBox="0 0 220 220"
        fill="none"
        animate={{ opacity: [0.35, 0.2, 0.35], scale: [1, 1.04, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <polygon points="110,4 216,110 110,216 4,110" stroke="#C8A96E" strokeWidth="1" />
        <circle cx="110" cy="4" r="3" fill="#C8A96E" opacity="0.6" />
        <circle cx="216" cy="110" r="3" fill="#C8A96E" opacity="0.6" />
        <circle cx="110" cy="216" r="3" fill="#C8A96E" opacity="0.6" />
        <circle cx="4" cy="110" r="3" fill="#C8A96E" opacity="0.6" />
      </motion.svg>

      {/* Photo clipped to diamond */}
      <div
        className="relative z-10 flex items-center justify-center overflow-hidden"
        style={{
          width: 190,
          height: 190,
          clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
          background: "rgba(25,40,58,0.92)",
          border: "none",
        }}
      >
        {src ? (
          <Image
            src={src}
            alt="Jason Vianney Sugiarto"
            width={190}
            height={190}
            className="w-full h-full object-cover"
            priority
          />
        ) : (
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 42,
              fontWeight: 600,
              color: "#C8A96E",
              letterSpacing: "-1px",
            }}
          >
            JVS
          </span>
        )}
      </div>
    </div>
  )
}

/* ─── Skill node around the frame ─── */
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

function SkillNode({ icon, label, color, bg, border, style, delay, floatDir }: SkillNodeProps) {
  return (
    <motion.div
      className="absolute z-20 flex flex-col items-center gap-1"
      style={style}
      animate={{ y: floatDir === "up" ? [0, -11, 0] : [0, 10, 0] }}
      transition={{ duration: floatDir === "up" ? 3.8 : 4.4, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <div
        className="flex items-center justify-center"
        style={{
          width: 40, height: 40,
          borderRadius: 4,
          background: bg,
          border: `0.5px solid ${border}`,
          color,
          fontSize: 17,
        }}
      >
        {icon}
      </div>
      <span
        style={{
          fontSize: 9.5,
          fontWeight: 500,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          color,
          opacity: 0.75,
          whiteSpace: "nowrap",
          fontFamily: "DM Sans, sans-serif",
        }}
      >
        {label}
      </span>
    </motion.div>
  )
}

/* ─── Main component ─── */
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
    } else {
      window.location.hash = "projects"
    }
  }

  /* Stagger variants */
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
      className="relative min-h-screen flex flex-col justify-center pt-16 md:pt-20 pb-8 overflow-hidden"
      style={{ background: "#0B1724" }}
    >
      {/* Batik background */}
      <BatikBackground />

      {/* Dark overlay for text legibility */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(135deg, rgba(11,23,36,0.82) 0%, rgba(11,23,36,0.52) 50%, rgba(11,23,36,0.72) 100%)",
        }}
      />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── LEFT CONTENT ── */}
          <div className="flex flex-col">

            {/* Eyebrow */}
            <motion.div
              className="flex items-center gap-3 mb-5"
              {...fadeSlideLeft(0.3)}
            >
              <span style={{ display: "block", width: 28, height: 1, background: "#C8A96E", opacity: 0.7 }} />
              <span
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: 10.5,
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#C8A96E",
                  opacity: 0.9,
                }}
              >
                IT Professional
              </span>
              <span style={{ display: "block", width: 28, height: 1, background: "#C8A96E", opacity: 0.7 }} />
            </motion.div>

            {/* Greeting */}
            <motion.p
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: 13,
                fontWeight: 300,
                color: "rgba(220,210,190,0.6)",
                marginBottom: 4,
              }}
              {...fadeSlideLeft(0.4)}
            >
              Hello, I'm
            </motion.p>

            {/* Name */}
            <motion.h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(32px, 5vw, 44px)",
                fontWeight: 600,
                lineHeight: 1.12,
                color: "#F4EDD8",
                marginBottom: 6,
              }}
              {...fadeSlideLeft(0.45)}
            >
              Jason Vianney
              <br />
              <span style={{ color: "#C8A96E" }}>Sugiarto</span>
            </motion.h1>

            {/* Gold accent bar */}
            <motion.div
              style={{ height: 2, background: "#C8A96E", borderRadius: 1, opacity: 0.55, marginBottom: 18 }}
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.85 }}
            />

            {/* Role tags */}
            <motion.div className="flex flex-wrap gap-2 mb-5" {...fadeSlideLeft(0.55)}>
              {[
                { label: "Fullstack Dev", bg: "rgba(55,138,221,0.1)", color: "#85B7EB", border: "rgba(133,183,235,0.3)" },
                { label: "System Analysis", bg: "rgba(29,158,117,0.1)", color: "#5DCAA5", border: "rgba(93,202,165,0.3)" },
                { label: "UI / UX Design", bg: "rgba(99,153,34,0.1)", color: "#97C459", border: "rgba(151,196,89,0.3)" },
                { label: "Data Analyst", bg: "rgba(200,169,110,0.1)", color: "#FAC775", border: "rgba(250,199,117,0.3)" },
              ].map(({ label, bg, color, border }) => (
                <span
                  key={label}
                  style={{
                    padding: "4px 12px",
                    borderRadius: 3,
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    fontFamily: "DM Sans, sans-serif",
                    background: bg,
                    color,
                    border: `0.5px solid ${border}`,
                  }}
                >
                  {label}
                </span>
              ))}
            </motion.div>

            {/* Description */}
            <motion.p
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: 13.5,
                fontWeight: 300,
                lineHeight: 1.85,
                color: "rgba(210,200,182,0.88)",
                marginBottom: 28,
                textAlign: "justify",
                textShadow: "0 1px 4px rgba(0,0,0,0.55)",
                maxWidth: 480,
              }}
              {...fadeSlideLeft(0.65)}
            >
              IT Professional focused on creating innovative digital solutions — transforming complex
              challenges into elegant, efficient, and user‑friendly experiences through fullstack
              development, system analysis, and data‑driven insights.
            </motion.p>

            {/* Buttons */}
            <motion.div className="flex items-center gap-3" {...fadeSlideLeft(0.75)}>

              {/* Download Resume */}
              <motion.button
                onClick={handleDownloadPDF}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "11px 26px",
                  background: "#C8A96E",
                  color: "#0B1724",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: 12.5,
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  borderRadius: 3,
                  border: "none",
                  cursor: "pointer",
                }}
                whileHover={{ y: -2, backgroundColor: "#D9BB7A" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <motion.span
                  whileHover={{ y: 3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Download size={14} />
                </motion.span>
                Download Resume
              </motion.button>

              {/* View Projects */}
              <motion.button
                onClick={handleViewProjects}
                style={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "10px 22px",
                  background: "transparent",
                  color: "rgba(181,212,244,0.85)",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: 12.5,
                  fontWeight: 400,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  borderRadius: 3,
                  border: "0.5px solid rgba(133,183,235,0.35)",
                  cursor: "pointer",
                }}
                whileHover={{
                  y: -2,
                  color: "#B5D4F4",
                  borderColor: "rgba(181,212,244,0.55)",
                  backgroundColor: "rgba(133,183,235,0.07)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                View Projects
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <ArrowRight size={14} />
                </motion.span>
              </motion.button>
            </motion.div>
          </div>

          {/* ── RIGHT CONTENT ── */}
          <motion.div
            className="flex justify-center lg:justify-end relative"
            style={{ height: 340 }}
            {...fadeSlideRight}
          >
            <div className="relative flex items-center justify-center" style={{ width: 340, height: 340 }}>

              <DiamondFrame src="/assets/profile/home.png" />

              {/* Skill nodes */}
              <SkillNode
                icon={<Code size={16} />}
                label="Fullstack"
                color="#85B7EB"
                bg="rgba(55,138,221,0.15)"
                border="rgba(133,183,235,0.35)"
                style={{ top: 32, left: 10 }}
                delay={0}
                floatDir="up"
              />
              <SkillNode
                icon={<Network size={16} />}
                label="Systems"
                color="#AFA9EC"
                bg="rgba(127,119,221,0.15)"
                border="rgba(175,169,236,0.35)"
                style={{ top: 18, right: 8 }}
                delay={0.5}
                floatDir="down"
              />
              <SkillNode
                icon={<PenTool size={16} />}
                label="UI / UX"
                color="#5DCAA5"
                bg="rgba(29,158,117,0.15)"
                border="rgba(93,202,165,0.35)"
                style={{ bottom: 40, right: 4 }}
                delay={1}
                floatDir="up"
              />
              <SkillNode
                icon={<Database size={16} />}
                label="Data"
                color="#FAC775"
                bg="rgba(200,169,110,0.15)"
                border="rgba(250,199,117,0.35)"
                style={{ bottom: 22, left: 16 }}
                delay={1.5}
                floatDir="down"
              />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2"
        style={{ transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 5, opacity: 0.3 }}
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div style={{ width: 1, height: 26, background: "#C8A96E" }} />
        <div style={{ width: 3, height: 3, borderRadius: "50%", background: "#C8A96E" }} />
      </motion.div>
    </section>
  )
}

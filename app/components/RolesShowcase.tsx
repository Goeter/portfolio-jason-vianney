"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"

// ─────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────

type ColorKey = "cyan" | "purple" | "rose" | "emerald" | "amber"

const roles = [
  {
    id: 1,
    number: "01",
    title: "Fullstack Developer",
    color: "cyan" as const,
    skills: ["HTML", "CSS", "PHP", "JavaScript", "SQL"],
    tools: ["Visual Studio Code", "React.js & Next.js", "PostgreSQL & MySQL"],
  },
  {
    id: 2,
    number: "02",
    title: "System Analyst",
    color: "purple" as const,
    skills: ["SRS", "QA Testing", "Agile", "BPMN"],
    tools: [
      "MS Visio & BPMN.io",
      "Google Docs & Sheets",
      "Word, Excel, PowerPoint",
      "Trello",
    ],
  },
  {
    id: 3,
    number: "03",
    title: "UI/UX Designer",
    color: "rose" as const,
    skills: ["Wireframing", "Prototyping", "User Research"],
    tools: [
      "Figma & Adobe XD",
      "Adobe Illustrator",
      "Balsamiq Wireframes",
      "Awwwards & Dribbble",
    ],
  },
  {
    id: 4,
    number: "04",
    title: "Data Analyst",
    color: "emerald" as const,
    skills: ["Data Analysis", "Cleaning", "Visualization", "Reporting"],
    tools: ["Python", "Power BI"],
  },
  {
    id: 5,
    number: "05",
    title: "Tutor",
    color: "amber" as const,
    skills: ["Teaching", "Curriculum", "Mentoring", "Assessment"],
    tools: ["Google Classroom", "Zoom & Meet", "Word & PowerPoint"],
  },
]

// ─────────────────────────────────────────────────────────────
// Color Tokens
// ─────────────────────────────────────────────────────────────

const colorMap: Record<
  ColorKey,
  {
    bar: string
    label: string
    tagBg: string
    tagText: string
    tagBorder: string
    dot: string
  }
> = {
  cyan: {
    bar: "from-cyan-600 via-cyan-400 to-sky-300",
    label: "text-cyan-400",
    tagBg: "bg-cyan-500/[0.09]",
    tagText: "text-cyan-300",
    tagBorder: "border-cyan-500/20",
    dot: "bg-cyan-400",
  },
  purple: {
    bar: "from-purple-700 via-purple-500 to-fuchsia-400",
    label: "text-purple-400",
    tagBg: "bg-purple-500/[0.09]",
    tagText: "text-purple-300",
    tagBorder: "border-purple-500/20",
    dot: "bg-purple-400",
  },
  rose: {
    bar: "from-rose-700 via-rose-500 to-pink-400",
    label: "text-rose-400",
    tagBg: "bg-rose-500/[0.09]",
    tagText: "text-rose-300",
    tagBorder: "border-rose-500/20",
    dot: "bg-rose-400",
  },
  emerald: {
    bar: "from-emerald-700 via-emerald-500 to-green-300",
    label: "text-emerald-400",
    tagBg: "bg-emerald-500/[0.09]",
    tagText: "text-emerald-300",
    tagBorder: "border-emerald-500/20",
    dot: "bg-emerald-400",
  },
  amber: {
    bar: "from-amber-700 via-amber-500 to-yellow-300",
    label: "text-amber-400",
    tagBg: "bg-amber-500/10",
    tagText: "text-amber-300",
    tagBorder: "border-amber-500/20",
    dot: "bg-amber-400",
  },
}

// ─────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────

const AUTO_PLAY_DELAY = 8000
const SWIPE_THRESHOLD = 40

// ─────────────────────────────────────────────────────────────
// Background
// ─────────────────────────────────────────────────────────────

function BatikBg() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 800 560"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="batikKawung"
          x="0"
          y="0"
          width="72"
          height="72"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="36" cy="36" r="22" fill="none" stroke="#c9a84c" strokeWidth="0.75" />
          <circle cx="36" cy="36" r="14" fill="none" stroke="#c9a84c" strokeWidth="0.5" />
          <circle cx="36" cy="36" r="7" fill="none" stroke="#c9a84c" strokeWidth="0.45" />
          <circle cx="36" cy="36" r="2.5" fill="#c9a84c" opacity="0.65" />

          <path d="M36 14 L40.5 22 L36 30 L31.5 22 Z" fill="none" stroke="#c9a84c" strokeWidth="0.5" />
          <path d="M58 36 L50 40.5 L42 36 L50 31.5 Z" fill="none" stroke="#c9a84c" strokeWidth="0.5" />
          <path d="M36 58 L31.5 50 L36 42 L40.5 50 Z" fill="none" stroke="#c9a84c" strokeWidth="0.5" />
          <path d="M14 36 L22 31.5 L30 36 L22 40.5 Z" fill="none" stroke="#c9a84c" strokeWidth="0.5" />

          <line
            x1="36"
            y1="0"
            x2="36"
            y2="12"
            stroke="#c9a84c"
            strokeWidth="0.35"
            strokeDasharray="2,2"
          />

          <line
            x1="72"
            y1="36"
            x2="60"
            y2="36"
            stroke="#c9a84c"
            strokeWidth="0.35"
            strokeDasharray="2,2"
          />

          <line
            x1="36"
            y1="72"
            x2="36"
            y2="60"
            stroke="#c9a84c"
            strokeWidth="0.35"
            strokeDasharray="2,2"
          />

          <line
            x1="0"
            y1="36"
            x2="12"
            y2="36"
            stroke="#c9a84c"
            strokeWidth="0.35"
            strokeDasharray="2,2"
          />

          <circle cx="0" cy="0" r="2.5" fill="none" stroke="#c9a84c" strokeWidth="0.4" />
          <circle cx="72" cy="0" r="2.5" fill="none" stroke="#c9a84c" strokeWidth="0.4" />
          <circle cx="0" cy="72" r="2.5" fill="none" stroke="#c9a84c" strokeWidth="0.4" />
          <circle cx="72" cy="72" r="2.5" fill="none" stroke="#c9a84c" strokeWidth="0.4" />
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill="url(#batikKawung)" opacity="0.14" />

      <line x1="0" y1="55" x2="140" y2="55" stroke="#06b6d4" strokeWidth="0.4" opacity="0.2" />
      <line x1="140" y1="55" x2="165" y2="80" stroke="#06b6d4" strokeWidth="0.4" opacity="0.2" />
      <circle cx="140" cy="55" r="2" fill="#06b6d4" opacity="0.28" />

      <line x1="660" y1="500" x2="800" y2="500" stroke="#a855f7" strokeWidth="0.4" opacity="0.2" />
      <line x1="660" y1="500" x2="635" y2="475" stroke="#a855f7" strokeWidth="0.4" opacity="0.2" />
      <circle cx="660" cy="500" r="2" fill="#a855f7" opacity="0.28" />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────
// Card
// ─────────────────────────────────────────────────────────────

function RoleCard({ role }: { role: (typeof roles)[number] }) {
  const c = colorMap[role.color]

  return (
    <div className="h-full overflow-hidden rounded-[14px] border border-[#c9a84c]/[0.18] bg-white/[0.035] transform-gpu transition-transform transition-colors duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:scale-[1.035] hover:border-[#c9a84c]/[0.45]">
      {/* Top Bar */}
      <div className={`h-[3px] w-full bg-gradient-to-r ${c.bar}`} />

      <div className="p-5 md:p-6">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <h3
            className="text-[1.15rem] md:text-[1.28rem] font-semibold leading-snug text-[#f0e8d4]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {role.title}
          </h3>

          <span className="mt-1 shrink-0 text-[10px] font-semibold tracking-[3px] text-[#c9a84c]/[0.22]">
            {role.number}
          </span>
        </div>

        <div className="my-4 h-px bg-[#c9a84c]/[0.12]" />

        {/* Skills */}
        <p className={`mb-3 text-[10px] font-semibold uppercase tracking-[3px] ${c.label}`}>
          Skills
        </p>

        <div className="mb-5 flex flex-wrap gap-2">
          {role.skills.map((skill) => (
            <span
              key={skill}
              className={`rounded-full border px-3 py-1 text-[12px] md:text-[13px] font-medium ${c.tagBg} ${c.tagText} ${c.tagBorder}`}
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="my-4 h-px bg-[#c9a84c]/[0.12]" />

        {/* Tools */}
        <p className={`mb-3 text-[10px] font-semibold uppercase tracking-[3px] ${c.label}`}>
          Tools & Stack
        </p>

        <ul className="list-none">
          {role.tools.map((tool) => (
            <li
              key={tool}
              className="flex items-center gap-2 border-b border-white/[0.04] py-[6px] text-[13px] md:text-[14px] text-[#f0e8d4]/[0.62] last:border-none last:pb-0"
            >
              <span className={`h-1 w-1 shrink-0 rounded-full ${c.dot}`} />
              {tool}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────

export default function RolesShowcase() {
  const [current, setCurrent] = useState(0)
  const [visibleCount, setVisibleCount] = useState(3)

  const wrapRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const maxIndex = useMemo(
    () => Math.max(roles.length - visibleCount, 0),
    [visibleCount]
  )

  const clearAutoPlay = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
  }

  const startAutoPlay = useCallback(() => {
    clearAutoPlay()

    timerRef.current = setTimeout(() => {
      setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, AUTO_PLAY_DELAY)
  }, [maxIndex])

  const goTo = useCallback(
    (index: number) => {
      const nextIndex =
        index < 0 ? maxIndex : index > maxIndex ? 0 : index

      setCurrent(nextIndex)
    },
    [maxIndex]
  )

  // Responsive visible cards
  useEffect(() => {
    const handleResize = () => {
      const width = wrapRef.current?.offsetWidth ?? window.innerWidth

      if (width < 560) {
        setVisibleCount(1)
      } else if (width < 900) {
        setVisibleCount(2)
      } else {
        setVisibleCount(3)
      }
    }

    handleResize()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Keep current index safe
  useEffect(() => {
    setCurrent((prev) => Math.min(prev, maxIndex))
  }, [maxIndex])

  // Autoplay
  useEffect(() => {
    startAutoPlay()

    return () => clearAutoPlay()
  }, [current, startAutoPlay])

  const cardWidth = 100 / visibleCount
  const translateX = cardWidth * current

  return (
    <section
      id="roles"
      className="relative overflow-hidden bg-[#080d1c] py-12 md:py-14"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Top Gold Line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/55 to-transparent" />

      {/* Bottom Gold Line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/55 to-transparent" />

      <BatikBg />

      <div className="relative z-10">
        {/* Header */}
        <div className="px-6 pb-10 text-center">
          <h2
            className="m-0 text-[2.4rem] sm:text-[2.8rem] md:text-[3.15rem] font-bold leading-tight text-[#f0e8d4]"
            style={{
              fontFamily: "'Playfair Display', serif",
              letterSpacing: "-0.02em",
            }}
          >
            Professional{" "}
            <em
              className="not-italic text-[#c9a84c]"
              style={{ fontStyle: "italic" }}
            >
              Expertise
            </em>
          </h2>

          <div className="mx-auto mt-4 h-0.5 w-[58px] rounded-full bg-gradient-to-r from-[#c9a84c] via-[#e8c97a] to-[#c9a84c]" />
        </div>

        {/* Carousel */}
        <div
          ref={wrapRef}
          className="overflow-x-hidden overflow-y-visible pt-3 pb-8"
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX
          }}
          onTouchEnd={(e) => {
            const diff =
              touchStartX.current - e.changedTouches[0].clientX

            if (Math.abs(diff) > SWIPE_THRESHOLD) {
              goTo(diff > 0 ? current + 1 : current - 1)
            }
          }}
        >
          <div
            className="flex"
            style={{
              transform: `translateX(-${translateX}%)`,
              transition: "transform 0.65s cubic-bezier(.4,0,.2,1)",
              paddingInline: "0.75rem",
            }}
          >
            {roles.map((role) => (
              <div
                key={role.id}
                style={{
                  flexBasis: `${cardWidth}%`,
                  minWidth: `${cardWidth}%`,
                  paddingInline: "0.75rem",
                  paddingTop: "0.35rem",
                  paddingBottom: "0.45rem",
                  boxSizing: "border-box",
                }}
              >
                <RoleCard role={role} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-[1.1rem] px-6">
          {/* Prev */}
          <button
            onClick={() => goTo(current - 1)}
            aria-label="Previous"
            className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#c9a84c]/40 bg-[#c9a84c]/[0.06] text-[#c9a84c] outline-none transition-all duration-200 hover:border-[#c9a84c]/65 hover:bg-[#c9a84c]/[0.15]"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#c9a84c"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex items-center gap-[6px]">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => {
              const active = i === current

              return (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-[6px] rounded-full transition-all duration-300 ${
                    active
                      ? "w-[20px] bg-[#c9a84c]"
                      : "w-[6px] bg-[#c9a84c]/20 hover:bg-[#c9a84c]/40"
                  }`}
                />
              )
            })}
          </div>

          {/* Next */}
          <button
            onClick={() => goTo(current + 1)}
            aria-label="Next"
            className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#c9a84c]/40 bg-[#c9a84c]/[0.06] text-[#c9a84c] outline-none transition-all duration-200 hover:border-[#c9a84c]/65 hover:bg-[#c9a84c]/[0.15]"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#c9a84c"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

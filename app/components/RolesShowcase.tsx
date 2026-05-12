"use client"

import { useEffect, useRef, useState, useCallback } from "react"

// ─── Data ────────────────────────────────────────────────────────────────────

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

// ─── Color tokens ─────────────────────────────────────────────────────────────

type ColorKey = "cyan" | "purple" | "rose" | "emerald" | "amber"

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

// ─── Batik SVG background ────────────────────────────────────────────────────

function BatikBg() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
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
          {/* Kawung concentric rings */}
          <circle cx="36" cy="36" r="22" fill="none" stroke="#c9a84c" strokeWidth="0.75" />
          <circle cx="36" cy="36" r="14" fill="none" stroke="#c9a84c" strokeWidth="0.5" />
          <circle cx="36" cy="36" r="7" fill="none" stroke="#c9a84c" strokeWidth="0.45" />
          <circle cx="36" cy="36" r="2.5" fill="#c9a84c" opacity="0.65" />
          {/* Diamond petals */}
          <path d="M36 14 L40.5 22 L36 30 L31.5 22 Z" fill="none" stroke="#c9a84c" strokeWidth="0.5" />
          <path d="M58 36 L50 40.5 L42 36 L50 31.5 Z" fill="none" stroke="#c9a84c" strokeWidth="0.5" />
          <path d="M36 58 L31.5 50 L36 42 L40.5 50 Z" fill="none" stroke="#c9a84c" strokeWidth="0.5" />
          <path d="M14 36 L22 31.5 L30 36 L22 40.5 Z" fill="none" stroke="#c9a84c" strokeWidth="0.5" />
          {/* Dashed connector lines */}
          <line x1="36" y1="0" x2="36" y2="12" stroke="#c9a84c" strokeWidth="0.35" strokeDasharray="2,2" />
          <line x1="72" y1="36" x2="60" y2="36" stroke="#c9a84c" strokeWidth="0.35" strokeDasharray="2,2" />
          <line x1="36" y1="72" x2="36" y2="60" stroke="#c9a84c" strokeWidth="0.35" strokeDasharray="2,2" />
          <line x1="0" y1="36" x2="12" y2="36" stroke="#c9a84c" strokeWidth="0.35" strokeDasharray="2,2" />
          {/* Corner dots */}
          <circle cx="0" cy="0" r="2.5" fill="none" stroke="#c9a84c" strokeWidth="0.4" />
          <circle cx="72" cy="0" r="2.5" fill="none" stroke="#c9a84c" strokeWidth="0.4" />
          <circle cx="0" cy="72" r="2.5" fill="none" stroke="#c9a84c" strokeWidth="0.4" />
          <circle cx="72" cy="72" r="2.5" fill="none" stroke="#c9a84c" strokeWidth="0.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#batikKawung)" opacity="0.14" />
      {/* Subtle circuit accent lines */}
      <line x1="0" y1="55" x2="140" y2="55" stroke="#06b6d4" strokeWidth="0.4" opacity="0.2" />
      <line x1="140" y1="55" x2="165" y2="80" stroke="#06b6d4" strokeWidth="0.4" opacity="0.2" />
      <circle cx="140" cy="55" r="2" fill="#06b6d4" opacity="0.28" />
      <line x1="660" y1="500" x2="800" y2="500" stroke="#a855f7" strokeWidth="0.4" opacity="0.2" />
      <line x1="660" y1="500" x2="635" y2="475" stroke="#a855f7" strokeWidth="0.4" opacity="0.2" />
      <circle cx="660" cy="500" r="2" fill="#a855f7" opacity="0.28" />
    </svg>
  )
}

// ─── Card ────────────────────────────────────────────────────────────────────

function RoleCard({ role }: { role: (typeof roles)[number] }) {
  const c = colorMap[role.color]
  return (
    <div className="h-full bg-white/[0.035] border border-[#c9a84c]/[0.18] rounded-[14px] overflow-hidden transition-all duration-300 hover:border-[#c9a84c]/[0.45] hover:-translate-y-1">
      {/* Colour bar */}
      <div className={`h-[3px] w-full bg-gradient-to-r ${c.bar}`} />

      <div className="p-5">
        {/* Title row */}
        <div className="flex justify-between items-start mb-4">
          <h3
            className="text-[#f0e8d4] font-semibold text-[1rem] leading-snug"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {role.title}
          </h3>
          <span className="text-[9px] font-semibold tracking-[3px] text-[#c9a84c]/[0.22] ml-2 mt-0.5 shrink-0">
            {role.number}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#c9a84c]/[0.12] my-[0.85rem]" />

        {/* Skills */}
        <p className={`text-[9.5px] font-semibold tracking-[3px] uppercase mb-[0.55rem] ${c.label}`}>
          Skills
        </p>
        <div className="flex flex-wrap gap-[5px] mb-[0.85rem]">
          {role.skills.map((s, i) => (
            <span
              key={i}
              className={`text-[10.5px] font-medium px-[9px] py-[2.5px] rounded-full border ${c.tagBg} ${c.tagText} ${c.tagBorder}`}
            >
              {s}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-[#c9a84c]/[0.12] my-[0.85rem]" />

        {/* Tools */}
        <p className={`text-[9.5px] font-semibold tracking-[3px] uppercase mb-[0.55rem] ${c.label}`}>
          Tools &amp; Stack
        </p>
        <ul className="list-none">
          {role.tools.map((t, i) => (
            <li
              key={i}
              className="flex items-center gap-[7px] py-[4.5px] border-b border-white/[0.04] last:border-none last:pb-0 text-[11.5px] text-[#f0e8d4]/[0.58]"
            >
              <span className={`w-1 h-1 rounded-full shrink-0 ${c.dot}`} />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

const DELAY = 8000

export default function RolesShowcase() {
  const [current, setCurrent] = useState(0)
  const [visibleCount, setVisibleCount] = useState(3)
  const wrapRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const touchStartX = useRef(0)

  const maxIndex = Math.max(roles.length - visibleCount, 0)

  const goTo = useCallback(
    (idx: number) => {
      if (timerRef.current) clearTimeout(timerRef.current)
      const mi = Math.max(roles.length - visibleCount, 0)
      const next = idx < 0 ? mi : idx > mi ? 0 : idx
      setCurrent(next)
      timerRef.current = setTimeout(() => {
        setCurrent((c) => {
          const m = Math.max(roles.length - visibleCount, 0)
          return c >= m ? 0 : c + 1
        })
      }, DELAY)
    },
    [visibleCount]
  )

  // Responsive visible count
  useEffect(() => {
    function onResize() {
      const w = wrapRef.current?.offsetWidth ?? window.innerWidth
      setVisibleCount(w < 500 ? 1 : w < 760 ? 2 : 3)
    }
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  // Restart autoplay when visibleCount changes
  useEffect(() => {
    const safeIdx = Math.min(current, maxIndex)
    goTo(safeIdx)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleCount])

  const cardWidthPct = 100 / visibleCount
  const translateX = cardWidthPct * current

  return (
    <section
      id="roles"
      className="relative overflow-hidden bg-[#080d1c] py-10"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Gold edge lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/55 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/55 to-transparent" />

      {/* Batik SVG background */}
      <BatikBg />

      <div className="relative z-10">
        {/* ── Header ── */}
        <div className="text-center px-6 pb-8">
          <h2
            className="text-[2.5rem] sm:text-[2.8rem] font-bold text-[#f0e8d4] leading-tight m-0"
            style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "-0.02em" }}
          >
            Professional{" "}
            <em className="italic text-[#c9a84c] not-italic" style={{ fontStyle: "italic" }}>
              Expertise
            </em>
          </h2>
          <div className="w-[52px] h-0.5 bg-gradient-to-r from-[#c9a84c] via-[#e8c97a] to-[#c9a84c] mx-auto mt-[0.9rem] rounded-full" />
        </div>

        {/* ── Carousel track ── */}
        <div
          ref={wrapRef}
          className="overflow-hidden pb-7"
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
          onTouchEnd={(e) => {
            const diff = touchStartX.current - e.changedTouches[0].clientX
            if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1)
          }}
        >
          <div
            className="flex"
            style={{
              transform: `translateX(-${translateX}%)`,
              transition: "transform 0.65s cubic-bezier(.4,0,.2,1)",
              paddingLeft: "0.6rem",
              paddingRight: "0.6rem",
            }}
          >
            {roles.map((role) => (
              <div
                key={role.id}
                style={{
                  flexBasis: `${cardWidthPct}%`,
                  minWidth: `${cardWidthPct}%`,
                  padding: "0 0.6rem",
                  boxSizing: "border-box",
                }}
              >
                <RoleCard role={role} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Navigation ── */}
        <div className="flex items-center justify-center gap-[1.1rem] px-6">
          {/* Prev button */}
          <button
            onClick={() => goTo(current - 1)}
            aria-label="Previous"
            className="w-[34px] h-[34px] rounded-full flex items-center justify-center cursor-pointer outline-none transition-all duration-200"
            style={{
              border: "0.5px solid rgba(201,168,76,0.4)",
              background: "rgba(201,168,76,0.06)",
              color: "#c9a84c",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(201,168,76,0.15)"
              e.currentTarget.style.borderColor = "rgba(201,168,76,0.65)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(201,168,76,0.06)"
              e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)"
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Dot indicators */}
          <div className="flex gap-[6px] items-center">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="border-none cursor-pointer p-0 rounded-full transition-all duration-300"
                style={{
                  width: i === current ? "20px" : "6px",
                  height: "6px",
                  borderRadius: i === current ? "3px" : "50%",
                  background: i === current ? "#c9a84c" : "rgba(201,168,76,0.2)",
                }}
                onMouseEnter={(e) => {
                  if (i !== current) e.currentTarget.style.background = "rgba(201,168,76,0.4)"
                }}
                onMouseLeave={(e) => {
                  if (i !== current) e.currentTarget.style.background = "rgba(201,168,76,0.2)"
                }}
              />
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={() => goTo(current + 1)}
            aria-label="Next"
            className="w-[34px] h-[34px] rounded-full flex items-center justify-center cursor-pointer outline-none transition-all duration-200"
            style={{
              border: "0.5px solid rgba(201,168,76,0.4)",
              background: "rgba(201,168,76,0.06)",
              color: "#c9a84c",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(201,168,76,0.15)"
              e.currentTarget.style.borderColor = "rgba(201,168,76,0.65)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(201,168,76,0.06)"
              e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)"
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

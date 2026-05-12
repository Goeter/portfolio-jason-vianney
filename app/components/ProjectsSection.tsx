"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import Link from "next/link"

// ============================================================
// DATA PROYEK
// ============================================================

const projects = [
  {
    id: 1,
    title: "PT Topas Multi Finance Website",
    description:
      "Website korporat publik yang membangun kepercayaan pelanggan dan brand awareness melalui kehadiran digital profesional.",
    icon: "building",
    link: "https://frontend.topasmultifinance.co.id",
  },
  {
    id: 2,
    title: "PT. Alfa Berkat Sigma",
    description:
      "Website toko perlengkapan plumbing yang memamerkan produk dan profil perusahaan secara profesional dan menarik.",
    icon: "droplet",
    link: "https://sigma-andrew-ten.vercel.app",
  },
  {
    id: 3,
    title: "Topas Mobile Application",
    description:
      "Aplikasi mobile untuk nasabah dan staf: manajemen pinjaman, tracking pencairan, monitoring nasabah, dan layanan keuangan lengkap.",
    icon: "mobile",
    link: null,
  },
  {
    id: 4,
    title: "HR Topas Application",
    description:
      "Sistem HRD terintegrasi: absensi, rekap gaji, perencanaan tenaga kerja berbasis KPI, dan manajemen rekrutmen lengkap.",
    icon: "users",
    link: null,
  },
  {
    id: 5,
    title: "Monitoring & Feedback Prospect",
    description:
      "Aplikasi internal pencatatan penjualan motor dari dealer, konfirmasi order, jadwal pengiriman, dan kelengkapan dokumen.",
    icon: "chart",
    link: null,
  },
  {
    id: 6,
    title: "Vehicle Registration Certificate System",
    description:
      "Sistem cetak nota pencairan yang sebelumnya manual kini dicetak rapi, cepat, dan tersimpan aman di database sistem.",
    icon: "file",
    link: null,
  },
  {
    id: 7,
    title: "Mobile Mata Elang & Subscribe",
    description:
      "Aplikasi pelacak kendaraan kredit untuk field user dan pihak ketiga, dilengkapi sistem berlangganan aplikasi.",
    icon: "map",
    link: null,
  },
  {
    id: 8,
    title: "Mobile Loan Flow Survey",
    description:
      "Aplikasi survei kunjungan rumah debitur agar data tersentralisasi dan tersimpan rapi di database perusahaan.",
    icon: "clipboard",
    link: null,
  },
  {
    id: 9,
    title: "Dashboard Admin Ticketing",
    description:
      "Dashboard monitoring tiket berbasis web untuk pengelolaan dan pemantauan sistem ticketing secara real-time.",
    icon: "dashboard",
    link: null,
  },
]

// ============================================================
// ICONS
// ============================================================

const iconClass =
  "w-8 h-8 stroke-[#d4a843] stroke-[1.5] fill-none"

const icons: Record<string, React.ReactNode> = {
  building: (
    <svg viewBox="0 0 24 24" className={iconClass}>
      <path d="M3 21h18M3 10h18M5 21V10l7-7 7 7v11M9 21v-4h6v4" />
    </svg>
  ),
  droplet: (
    <svg viewBox="0 0 24 24" className={iconClass}>
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  ),
  mobile: (
    <svg viewBox="0 0 24 24" className={iconClass}>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" className={iconClass}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" className={iconClass}>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  file: (
    <svg viewBox="0 0 24 24" className={iconClass}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  map: (
    <svg viewBox="0 0 24 24" className={iconClass}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  clipboard: (
    <svg viewBox="0 0 24 24" className={iconClass}>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="9" y1="16" x2="13" y2="16" />
    </svg>
  ),
  dashboard: (
    <svg viewBox="0 0 24 24" className={iconClass}>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
}

// ============================================================
// BATIK BACKGROUND
// ============================================================

function BatikBackground() {
  return (
    <svg
      className="absolute inset-0 z-0 h-full w-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="kraton"
          x="0"
          y="0"
          width="70"
          height="70"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="35" cy="35" r="1.4" fill="#d4a843" />
          <circle cx="0" cy="0" r="1.4" fill="#d4a843" />
          <circle cx="70" cy="0" r="1.4" fill="#d4a843" />
          <circle cx="0" cy="70" r="1.4" fill="#d4a843" />
          <circle cx="70" cy="70" r="1.4" fill="#d4a843" />

          <circle cx="35" cy="35" r="9" fill="none" stroke="#d4a843" strokeWidth="0.5" />
          <circle cx="35" cy="35" r="17" fill="none" stroke="#4a7cbf" strokeWidth="0.38" />
          <circle cx="35" cy="35" r="25" fill="none" stroke="#d4a843" strokeWidth="0.28" />
        </pattern>

        <linearGradient id="vfade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#07091a" stopOpacity="0.3" />
          <stop offset="35%" stopColor="#07091a" stopOpacity="0" />
          <stop offset="70%" stopColor="#07091a" stopOpacity="0" />
          <stop offset="100%" stopColor="#07091a" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      <rect width="100%" height="100%" fill="url(#kraton)" opacity="0.1" />
      <rect width="100%" height="100%" fill="url(#vfade)" />
    </svg>
  )
}

// ============================================================
// CARD PATTERN
// ============================================================

function CardThumbnailPattern({ id }: { id: number }) {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 300 168"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id={`tp${id}`}
          x="0"
          y="0"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="12" cy="12" r="0.8" fill="#d4a843" />
          <circle
            cx="12"
            cy="12"
            r="6"
            fill="none"
            stroke="#d4a843"
            strokeWidth="0.32"
          />
        </pattern>
      </defs>

      <rect width="300" height="168" fill={`url(#tp${id})`} opacity="0.18" />
    </svg>
  )
}

// ============================================================
// PROJECT CARD
// ============================================================

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <div className="pt-3">
      <div
        className="
          group flex h-full min-w-0 flex-1 flex-col overflow-hidden rounded-2xl
          border border-[#1e2a46] bg-[#0b1020]
          transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
          hover:scale-[1.035]
          hover:border-[#d4a84355]
          hover:shadow-[0_18px_45px_rgba(0,0,0,0.45)]
          will-change-transform
        "
      >
        {/* Thumbnail */}
        <div className="relative aspect-video w-full flex-shrink-0 overflow-hidden bg-[#060c18]">
          <CardThumbnailPattern id={project.id} />

          <div
            className="
              absolute inset-0 flex items-center justify-center
              transition-transform duration-700 ease-out
              group-hover:scale-110
            "
          >
            <div className="relative z-10 opacity-60">
              {icons[project.icon]}
            </div>
          </div>

          <span
            className="
              absolute left-[10px] top-[10px] z-20 rounded
              border border-[#d4a84325]
              bg-[#07091ab8]
              px-[7px] py-[3px]
              font-mono text-[10px]
              tracking-widest text-[#d4a84368]
            "
          >
            #P0{project.id}
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-[18px_18px_17px]">
          <h3 className="mb-3 text-[16px] md:text-[17px] font-medium leading-[1.4] text-[#c8bfa0]">
            {project.title}
          </h3>

          <p className="mb-4 flex-1 text-[13px] md:text-[14px] leading-[1.8] text-[#5b6c8d]">
            {project.description}
          </p>

          <div className="mb-3 h-px bg-[#1a2540]" />

          <div className="flex min-h-[24px] items-center">
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center gap-[6px]
                  text-[12px] md:text-[13px]
                  tracking-[0.3px]
                  text-[#4a8fd4]
                  no-underline
                  transition-colors duration-300
                  hover:text-[#80b4f0]
                "
              >
                <ExternalLink size={14} />
                Kunjungi Website
              </a>
            ) : (
              <span className="inline-block h-[24px]" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function ProjectsSection() {
  const [currentPage, setCurrentPage] = useState(0)
  const [cardsPerPage, setCardsPerPage] = useState(3)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    const handleResize = () => {
      setCardsPerPage(window.innerWidth <= 640 ? 1 : 3)
    }

    handleResize()

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    setCurrentPage(0)
  }, [cardsPerPage])

  const totalPages = useMemo(
    () => Math.ceil(projects.length / cardsPerPage),
    [cardsPerPage]
  )

  const slide = useCallback(
    (direction: number) => {
      setCurrentPage((prev) =>
        Math.max(0, Math.min(totalPages - 1, prev + direction))
      )
    },
    [totalPages]
  )

  const pageProjects = (page: number) =>
    projects.slice(
      page * cardsPerPage,
      (page + 1) * cardsPerPage
    )

  return (
    <section
      id="projects"
      className="
        relative flex min-h-screen items-center overflow-hidden
        py-16 md:py-20
      "
      style={{ background: "#07091a" }}
    >
      <BatikBackground />

      <div
        className="
          relative z-10 mx-auto w-full max-w-7xl
          px-5 sm:px-8 lg:px-12
        "
      >
        {/* HEADER */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-6">
          <h2
            className="
              font-serif font-medium leading-none
              text-[clamp(34px,5vw,52px)]
            "
            style={{
              color: "#d4a843",
              letterSpacing: "-0.5px",
            }}
          >
            Projects
          </h2>

          <Link
            href="/projects"
            className="flex-shrink-0 no-underline"
          >
            <div
              className="
                flex overflow-hidden rounded-[12px]
                border border-[#d4a84340]
              "
            >
              <div
                className="
                  flex items-center gap-2
                  bg-[#0d1226]
                  px-5 py-[12px]
                  text-[13px]
                  tracking-[0.5px]
                  text-[#d4a843]
                  transition-colors duration-300
                  hover:bg-[#14193a]
                "
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#d4a843"
                  strokeWidth="1.8"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>

                <span className="hidden whitespace-nowrap sm:inline">
                  Lihat Semua Project
                </span>
              </div>

              <div
                className="
                  flex min-w-[56px] flex-col items-center justify-center
                  bg-[#d4a843]
                  px-4 py-[12px]
                  leading-none text-[#07091a]
                "
              >
                <span className="text-[22px] font-medium">9</span>

                <span className="mt-[2px] text-[9px] uppercase tracking-widest opacity-70">
                  Projects
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Divider */}
        <div
          className="relative mb-10 h-px"
          style={{ background: "#d4a84318" }}
        >
          <span
            className="absolute left-0 top-0 h-px w-[70px]"
            style={{ background: "#d4a843" }}
          />
        </div>

        {/* CAROUSEL */}
        <div className="relative">
          {/* Prev */}
          <button
            onClick={() => slide(-1)}
            disabled={currentPage === 0}
            aria-label="Sebelumnya"
            className="
              absolute left-[-10px] top-1/2 z-10 hidden
              h-[42px] w-[42px] -translate-y-1/2
              items-center justify-center rounded-full
              border border-[#d4a84335]
              bg-[#0d1226]
              text-[#d4a843]
              transition-all duration-300
              hover:bg-[#14193a]
              disabled:cursor-default disabled:opacity-15
              sm:flex
            "
          >
            <ChevronLeft size={19} />
          </button>

          {/* Next */}
          <button
            onClick={() => slide(1)}
            disabled={currentPage === totalPages - 1}
            aria-label="Berikutnya"
            className="
              absolute right-[-10px] top-1/2 z-10 hidden
              h-[42px] w-[42px] -translate-y-1/2
              items-center justify-center rounded-full
              border border-[#d4a84335]
              bg-[#0d1226]
              text-[#d4a843]
              transition-all duration-300
              hover:bg-[#14193a]
              disabled:cursor-default disabled:opacity-15
              sm:flex
            "
          >
            <ChevronRight size={19} />
          </button>

          {/* Track */}
          <div className="overflow-x-hidden overflow-y-visible sm:mx-[30px]">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                transform: `translateX(-${currentPage * 100}%)`,
              }}
            >
              {isClient &&
                Array.from({ length: totalPages }).map((_, pageIdx) => (
                  <div
                    key={pageIdx}
                    className="
                      flex min-w-full items-stretch
                      gap-[18px]
                      px-[4px]
                      pb-2
                    "
                  >
                    {pageProjects(pageIdx).map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                      />
                    ))}

                    {pageProjects(pageIdx).length < cardsPerPage &&
                      Array.from({
                        length:
                          cardsPerPage -
                          pageProjects(pageIdx).length,
                      }).map((_, i) => (
                        <div
                          key={i}
                          className="min-w-0 flex-1"
                        />
                      ))}
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* DOTS */}
        <div className="mt-8 flex items-center justify-center gap-[7px]">
          {Array.from({ length: totalPages }).map((_, i) => {
            const active = i === currentPage

            return (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                aria-label={`Halaman ${i + 1}`}
                className="
                  h-[8px] border-none outline-none
                  transition-all duration-500
                  ease-[cubic-bezier(0.22,1,0.36,1)]
                "
                style={{
                  width: active ? "30px" : "8px",
                  borderRadius: active ? "999px" : "50%",
                  background: active ? "#d4a843" : "#1e2a46",
                }}
              />
            )
          })}

          <span
            className="ml-[7px] min-w-[30px] text-[11px]"
            style={{
              color: "#2a3d60",
              fontFamily: "var(--font-mono, monospace)",
            }}
          >
            {currentPage + 1}/{totalPages}
          </span>
        </div>
      </div>
    </section>
  )
}

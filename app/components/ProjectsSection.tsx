"use client"

import { useState, useEffect, useCallback } from "react"
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
// ICON SVG COMPONENTS
// ============================================================
const icons: Record<string, React.ReactNode> = {
  building: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d4a843" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M3 10h18M5 21V10l7-7 7 7v11M9 21v-4h6v4" />
    </svg>
  ),
  droplet: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d4a843" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  ),
  mobile: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d4a843" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
  users: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d4a843" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  chart: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d4a843" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  file: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d4a843" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  map: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d4a843" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  clipboard: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d4a843" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="9" y1="16" x2="13" y2="16" />
    </svg>
  ),
  dashboard: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d4a843" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
}

// ============================================================
// BATIK KRATON SVG BACKGROUND
// ============================================================
function BatikBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="kraton" x="0" y="0" width="70" height="70" patternUnits="userSpaceOnUse">
          {/* Center & corner dots */}
          <circle cx="35" cy="35" r="1.4" fill="#d4a843" />
          <circle cx="0" cy="0" r="1.4" fill="#d4a843" />
          <circle cx="70" cy="0" r="1.4" fill="#d4a843" />
          <circle cx="0" cy="70" r="1.4" fill="#d4a843" />
          <circle cx="70" cy="70" r="1.4" fill="#d4a843" />
          {/* Concentric circles */}
          <circle cx="35" cy="35" r="9" fill="none" stroke="#d4a843" strokeWidth="0.5" />
          <circle cx="35" cy="35" r="17" fill="none" stroke="#4a7cbf" strokeWidth="0.38" />
          <circle cx="35" cy="35" r="25" fill="none" stroke="#d4a843" strokeWidth="0.28" />
          {/* Star / kawung polygon */}
          <polygon
            points="35,26 37,31 43,31 38.5,34.5 40.5,40 35,36.5 29.5,40 31.5,34.5 27,31 33,31"
            fill="none"
            stroke="#d4a843"
            strokeWidth="0.42"
          />
          {/* Cardinal axis lines */}
          <line x1="35" y1="8" x2="35" y2="15" stroke="#4a7cbf" strokeWidth="0.38" />
          <line x1="35" y1="55" x2="35" y2="62" stroke="#4a7cbf" strokeWidth="0.38" />
          <line x1="8" y1="35" x2="15" y2="35" stroke="#4a7cbf" strokeWidth="0.38" />
          <line x1="55" y1="35" x2="62" y2="35" stroke="#4a7cbf" strokeWidth="0.38" />
          {/* Diagonal accents */}
          <line x1="15" y1="15" x2="20" y2="20" stroke="#d4a843" strokeWidth="0.28" />
          <line x1="50" y1="50" x2="55" y2="55" stroke="#d4a843" strokeWidth="0.28" />
          <line x1="55" y1="15" x2="50" y2="20" stroke="#d4a843" strokeWidth="0.28" />
          <line x1="15" y1="55" x2="20" y2="50" stroke="#d4a843" strokeWidth="0.28" />
          {/* Axis endpoint circles */}
          <circle cx="35" cy="8" r="1.8" fill="none" stroke="#d4a843" strokeWidth="0.38" />
          <circle cx="35" cy="62" r="1.8" fill="none" stroke="#d4a843" strokeWidth="0.38" />
          <circle cx="8" cy="35" r="1.8" fill="none" stroke="#d4a843" strokeWidth="0.38" />
          <circle cx="62" cy="35" r="1.8" fill="none" stroke="#d4a843" strokeWidth="0.38" />
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
// CARD THUMBNAIL SVG PATTERN
// ============================================================
function CardThumbnailPattern({ id }: { id: number }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 300 168"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id={`tp${id}`} x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="12" cy="12" r="0.8" fill="#d4a843" />
          <circle cx="12" cy="12" r="6" fill="none" stroke="#d4a843" strokeWidth="0.32" />
          <line x1="12" y1="4" x2="12" y2="7" stroke="#4a7cbf" strokeWidth="0.32" />
          <line x1="12" y1="17" x2="12" y2="20" stroke="#4a7cbf" strokeWidth="0.32" />
          <line x1="4" y1="12" x2="7" y2="12" stroke="#4a7cbf" strokeWidth="0.32" />
          <line x1="17" y1="12" x2="20" y2="12" stroke="#4a7cbf" strokeWidth="0.32" />
          <line x1="7" y1="7" x2="9" y2="9" stroke="#d4a843" strokeWidth="0.22" />
          <line x1="15" y1="15" x2="17" y2="17" stroke="#d4a843" strokeWidth="0.22" />
          <line x1="17" y1="7" x2="15" y2="9" stroke="#d4a843" strokeWidth="0.22" />
          <line x1="7" y1="17" x2="9" y2="15" stroke="#d4a843" strokeWidth="0.22" />
        </pattern>
      </defs>
      <rect width="300" height="168" fill={`url(#tp${id})`} opacity="0.18" />
    </svg>
  )
}

// ============================================================
// PROJECT CARD
// ============================================================
function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <div className="group flex flex-col flex-1 min-w-0 rounded-2xl overflow-hidden border border-[#1e2a46] bg-[#0b1020] transition-all duration-300 hover:-translate-y-[5px] hover:border-[#d4a84348]">
      {/* Thumbnail */}
      <div className="relative w-full aspect-video bg-[#060c18] flex items-center justify-center overflow-hidden flex-shrink-0">
        <CardThumbnailPattern id={project.id} />
        <div className="relative z-10 opacity-60">
          {icons[project.icon]}
        </div>
        <span className="absolute top-[9px] left-[9px] z-20 bg-[#07091ab8] border border-[#d4a84325] rounded px-[6px] py-[2px] text-[9px] text-[#d4a84368] tracking-widest font-mono">
          #P0{project.id}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-[14px_15px_15px]">
        <h3 className="text-[13px] font-medium text-[#c8bfa0] leading-[1.38] mb-2">
          {project.title}
        </h3>
        <p className="text-[11px] text-[#4e6080] leading-[1.7] flex-1 mb-3">
          {project.description}
        </p>
        <div className="h-px bg-[#1a2540] mb-[10px]" />
        <div className="flex items-center min-h-[22px]">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-[5px] text-[11px] text-[#4a8fd4] hover:text-[#80b4f0] transition-colors tracking-[0.3px] no-underline"
            >
              <ExternalLink size={13} />
              Kunjungi Website
            </a>
          ) : (
            <span className="inline-block h-[22px]" />
          )}
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

  const totalPages = Math.ceil(projects.length / cardsPerPage)

  // Responsive: detect viewport
  useEffect(() => {
    setIsClient(true)
    const update = () => {
      setCardsPerPage(window.innerWidth <= 580 ? 1 : 3)
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  // Reset page on resize
  useEffect(() => {
    setCurrentPage(0)
  }, [cardsPerPage])

  const slide = useCallback(
    (dir: number) => {
      setCurrentPage((p) => Math.max(0, Math.min(totalPages - 1, p + dir)))
    },
    [totalPages]
  )

  const goTo = useCallback((n: number) => {
    setCurrentPage(n)
  }, [])

  const pageProjects = (page: number) =>
    projects.slice(page * cardsPerPage, (page + 1) * cardsPerPage)

  return (
    <section
      id="projects"
      className="relative min-h-screen flex items-center py-20 overflow-hidden"
      style={{ background: "#07091a" }}
    >
      {/* Batik background */}
      <BatikBackground />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-7 md:px-10">

        {/* ── HEADER ── */}
        <div className="flex items-center justify-between gap-6 mb-8 flex-wrap">
          <h2
            className="font-serif text-[clamp(30px,5vw,44px)] font-medium leading-none"
            style={{ color: "#d4a843", letterSpacing: "-0.5px" }}
          >
            Projects
          </h2>

          {/* All Projects Button */}
          <Link href="/projects" className="no-underline flex-shrink-0">
            <div
              className="flex items-stretch rounded-[10px] overflow-hidden"
              style={{ border: "1px solid #d4a84340" }}
            >
              <div
                className="flex items-center gap-2 px-4 py-[10px] text-[12px] tracking-[0.5px] transition-colors duration-200"
                style={{ background: "#0d1226", color: "#d4a843" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#14193a")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#0d1226")}
              >
                {/* Grid icon */}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#d4a843" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                </svg>
                <span className="hidden sm:inline whitespace-nowrap">Lihat Semua Project</span>
              </div>
              <div
                className="flex flex-col items-center justify-center px-4 py-[10px] min-w-[52px] transition-colors duration-200 cursor-pointer"
                style={{ background: "#d4a843", color: "#07091a", lineHeight: 1 }}
              >
                <span className="text-[20px] font-medium leading-none">9</span>
                <span className="text-[9px] tracking-widest uppercase opacity-70 mt-[2px]">Projects</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Gold divider */}
        <div className="relative h-px mb-8" style={{ background: "#d4a84318" }}>
          <span className="absolute left-0 top-0 w-[60px] h-px" style={{ background: "#d4a843" }} />
        </div>

        {/* ── CAROUSEL ── */}
        <div className="relative">
          {/* Nav Prev */}
          <button
            onClick={() => slide(-1)}
            disabled={currentPage === 0}
            aria-label="Sebelumnya"
            className="absolute left-[-8px] top-1/2 -translate-y-1/2 z-10 w-[38px] h-[38px] rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-15 disabled:cursor-default sm:flex hidden"
            style={{ background: "#0d1226", border: "1px solid #d4a84335", color: "#d4a843" }}
          >
            <ChevronLeft size={18} />
          </button>

          {/* Nav Next */}
          <button
            onClick={() => slide(1)}
            disabled={currentPage === totalPages - 1}
            aria-label="Berikutnya"
            className="absolute right-[-8px] top-1/2 -translate-y-1/2 z-10 w-[38px] h-[38px] rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-15 disabled:cursor-default sm:flex hidden"
            style={{ background: "#0d1226", border: "1px solid #d4a84335", color: "#d4a843" }}
          >
            <ChevronRight size={18} />
          </button>

          {/* Track */}
          <div className="overflow-hidden sm:mx-[28px]">
            <div
              className="flex transition-transform duration-500"
              style={{
                transform: `translateX(-${currentPage * 100}%)`,
                transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              {isClient &&
                Array.from({ length: totalPages }).map((_, pageIdx) => (
                  <div
                    key={pageIdx}
                    className="flex min-w-full gap-[14px] items-stretch"
                  >
                    {pageProjects(pageIdx).map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                    {/* Fill empty slots on last page */}
                    {pageProjects(pageIdx).length < cardsPerPage &&
                      Array.from({
                        length: cardsPerPage - pageProjects(pageIdx).length,
                      }).map((_, i) => (
                        <div key={i} className="flex-1 min-w-0" />
                      ))}
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* ── DOTS INDICATOR ── */}
        <div className="flex items-center justify-center gap-[6px] mt-7">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Halaman ${i + 1}`}
              className="h-[8px] rounded-full border-none cursor-pointer outline-none transition-all duration-[350ms]"
              style={{
                width: i === currentPage ? "28px" : "8px",
                borderRadius: i === currentPage ? "4px" : "50%",
                background: i === currentPage ? "#d4a843" : "#1e2a46",
                transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
              }}
            />
          ))}
          <span
            className="text-[10px] ml-[6px] min-w-[28px]"
            style={{ color: "#2a3d60", fontFamily: "var(--font-mono, monospace)" }}
          >
            {currentPage + 1}/{totalPages}
          </span>
        </div>
      </div>
    </section>
  )
}

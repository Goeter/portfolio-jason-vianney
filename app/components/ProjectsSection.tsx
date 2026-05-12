"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react"

// ============================================================
// DATA PROJECTS
// ============================================================

const projects = [
  {
    id: 1,
    title: "PT Topas Multi Finance Website",
    description:
      "Website korporat publik yang membangun kepercayaan pelanggan dan brand awareness melalui kehadiran digital profesional.",
    image: "/assets/projects/topas-website.png",
    link: "https://frontend.topasmultifinance.co.id",
  },
  {
    id: 2,
    title: "PT. Alfa Berkat Sigma",
    description:
      "Website toko perlengkapan plumbing yang memamerkan produk dan profil perusahaan secara profesional dan menarik.",
    image: "/assets/projects/sigma-picture.png",
    link: "https://sigma-andrew-ten.vercel.app",
  },
  {
    id: 3,
    title: "Topas Mobile Application",
    description:
      "Aplikasi mobile untuk nasabah dan staf: manajemen pinjaman, tracking pencairan, monitoring nasabah, dan layanan keuangan lengkap.",
    image: "/assets/projects/mobile-app/combined",
    link: null,
  },
  {
    id: 4,
    title: "HR Topas Application",
    description:
      "Sistem HRD terintegrasi: absensi, rekap gaji, perencanaan tenaga kerja berbasis KPI, dan manajemen rekrutmen lengkap.",
    image: "/assets/projects/hr-topas-application.png",
    link: null,
  },
  {
    id: 5,
    title: "Monitoring & Feedback Prospect",
    description:
      "Aplikasi internal pencatatan penjualan motor dari dealer, konfirmasi order, jadwal pengiriman, dan kelengkapan dokumen.",
    image: "/assets/projects/monitoring-server.png",
    link: null,
  },
  {
    id: 6,
    title: "Vehicle Registration Certificate System",
    description:
      "Sistem cetak nota pencairan yang sebelumnya manual kini dicetak rapi, cepat, dan tersimpan aman di database sistem.",
    image: "/assets/projects/vehicle-registration-certificate-system.png",
    link: null,
  },
  {
    id: 7,
    title: "Mobile Mata Elang & Subscribe",
    description:
      "Aplikasi pelacak kendaraan kredit untuk field user dan pihak ketiga, dilengkapi sistem berlangganan aplikasi.",
    image: "/assets/projects/mobile-mata-elang/combined",
    link: null,
  },
  {
    id: 8,
    title: "Mobile Loan Flow Survey",
    description:
      "Aplikasi survei kunjungan rumah debitur agar data tersentralisasi dan tersimpan rapi di database perusahaan.",
    image: "/assets/projects/flow-survey-pinjaman.jpg",
    link: null,
  },
  {
    id: 9,
    title: "Dashboard Admin Ticketing",
    description:
      "Dashboard monitoring tiket berbasis web untuk pengelolaan dan pemantauan sistem ticketing secara real-time.",
    image: "/assets/projects/dashboard_ticketing.png",
    link: null,
  },
]

// ============================================================
// BATIK + TECHNOLOGY BACKGROUND
// ============================================================

function BatikBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Batik kawung-inspired pattern */}
          <pattern
            id="batikTechPattern"
            x="0"
            y="0"
            width="96"
            height="96"
            patternUnits="userSpaceOnUse"
          >
            {/* Batik dots */}
            <circle cx="48" cy="48" r="1.5" fill="#d4a843" opacity="0.7" />
            <circle cx="0" cy="0" r="1.2" fill="#d4a843" opacity="0.45" />
            <circle cx="96" cy="0" r="1.2" fill="#d4a843" opacity="0.45" />
            <circle cx="0" cy="96" r="1.2" fill="#d4a843" opacity="0.45" />
            <circle cx="96" cy="96" r="1.2" fill="#d4a843" opacity="0.45" />

            {/* Batik orbital/kawung shape */}
            <ellipse
              cx="48"
              cy="28"
              rx="13"
              ry="25"
              fill="none"
              stroke="#d4a843"
              strokeWidth="0.45"
              opacity="0.45"
            />
            <ellipse
              cx="48"
              cy="68"
              rx="13"
              ry="25"
              fill="none"
              stroke="#d4a843"
              strokeWidth="0.45"
              opacity="0.45"
            />
            <ellipse
              cx="28"
              cy="48"
              rx="25"
              ry="13"
              fill="none"
              stroke="#d4a843"
              strokeWidth="0.45"
              opacity="0.45"
            />
            <ellipse
              cx="68"
              cy="48"
              rx="25"
              ry="13"
              fill="none"
              stroke="#d4a843"
              strokeWidth="0.45"
              opacity="0.45"
            />

            {/* Tech circuit lines */}
            <path
              d="M12 48 H27 M69 48 H84 M48 12 V27 M48 69 V84"
              stroke="#4a7cbf"
              strokeWidth="0.45"
              opacity="0.35"
            />
            <path
              d="M20 20 H34 V31 M76 20 H62 V31 M20 76 H34 V65 M76 76 H62 V65"
              stroke="#5ea4ea"
              strokeWidth="0.35"
              opacity="0.25"
              fill="none"
            />

            {/* Small circuit nodes */}
            <circle cx="20" cy="20" r="1.5" fill="#5ea4ea" opacity="0.35" />
            <circle cx="76" cy="20" r="1.5" fill="#5ea4ea" opacity="0.35" />
            <circle cx="20" cy="76" r="1.5" fill="#5ea4ea" opacity="0.35" />
            <circle cx="76" cy="76" r="1.5" fill="#5ea4ea" opacity="0.35" />

            {/* Outer elegant ring */}
            <circle
              cx="48"
              cy="48"
              r="34"
              fill="none"
              stroke="#d4a843"
              strokeWidth="0.25"
              opacity="0.35"
            />
          </pattern>

          <radialGradient id="goldGlow" cx="50%" cy="45%" r="65%">
            <stop offset="0%" stopColor="#d4a843" stopOpacity="0.12" />
            <stop offset="40%" stopColor="#4a7cbf" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#07091a" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="sectionFade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#07091a" stopOpacity="0.96" />
            <stop offset="48%" stopColor="#0b1024" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#050711" stopOpacity="0.98" />
          </linearGradient>

          <linearGradient id="verticalFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#07091a" stopOpacity="0.35" />
            <stop offset="22%" stopColor="#07091a" stopOpacity="0" />
            <stop offset="72%" stopColor="#07091a" stopOpacity="0" />
            <stop offset="100%" stopColor="#07091a" stopOpacity="0.55" />
          </linearGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#sectionFade)" />
        <rect width="100%" height="100%" fill="url(#batikTechPattern)" opacity="0.18" />
        <rect width="100%" height="100%" fill="url(#goldGlow)" />
        <rect width="100%" height="100%" fill="url(#verticalFade)" />
      </svg>

      {/* Elegant blurred accents */}
      <div className="absolute left-[-160px] top-[12%] h-[360px] w-[360px] rounded-full bg-[#d4a84314] blur-[90px]" />
      <div className="absolute right-[-180px] bottom-[10%] h-[420px] w-[420px] rounded-full bg-[#4a7cbf18] blur-[100px]" />

      {/* Subtle tech grid */}
      <div
        className="
          absolute inset-0 opacity-[0.06]
          [background-image:linear-gradient(to_right,#5ea4ea_1px,transparent_1px),linear-gradient(to_bottom,#5ea4ea_1px,transparent_1px)]
          [background-size:56px_56px]
        "
      />
    </div>
  )
}

// ============================================================
// PROJECT CARD
// ============================================================

function ProjectCard({
  project,
}: {
  project: (typeof projects)[0]
}) {
  return (
    <div className="flex flex-1">
      <div
        className="
          group flex h-full min-w-0 flex-1 flex-col overflow-hidden
          rounded-[24px]
          border border-[#1f2b46]
          bg-[#0b1020]/95
          shadow-[0_18px_45px_rgba(0,0,0,0.28)]
          backdrop-blur-sm
          transition-all duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          hover:-translate-y-[6px]
          hover:scale-[1.02]
          hover:border-[#d4a84355]
          hover:shadow-[0_24px_60px_rgba(0,0,0,0.48)]
        "
      >
        {/* THUMBNAIL */}
        <div
          className="
            relative aspect-[16/9]
            overflow-hidden
            border-b border-[#17233b]
            bg-[#060c18]
          "
        >
          {project.image.includes("mobile-app/combined") ? (
            <div className="flex h-full w-full">
              <Image
                src="/assets/projects/mobile-app/topas-mobile-dashboard.jpeg"
                alt="Dashboard"
                width={300}
                height={600}
                className="h-full w-1/3 object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <Image
                src="/assets/projects/mobile-app/topas-mobile-menu.jpeg"
                alt="Menu"
                width={300}
                height={600}
                className="h-full w-1/3 object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <Image
                src="/assets/projects/mobile-app/topas-mobile-profile.jpeg"
                alt="Profile"
                width={300}
                height={600}
                className="h-full w-1/3 object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ) : project.image.includes("mobile-mata-elang/combined") ? (
            <div className="flex h-full w-full">
              <Image
                src="/assets/projects/mobile-mata-elang/foto-1.png"
                alt="Foto 1"
                width={300}
                height={600}
                className="h-full w-1/3 object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <Image
                src="/assets/projects/mobile-mata-elang/foto-2.png"
                alt="Foto 2"
                width={300}
                height={600}
                className="h-full w-1/3 object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <Image
                src="/assets/projects/mobile-mata-elang/foto-3.png"
                alt="Foto 3"
                width={300}
                height={600}
                className="h-full w-1/3 object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ) : (
            <>
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="
                  object-cover
                  transition-transform duration-700 ease-out
                  group-hover:scale-105
                "
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#07091ad9] via-transparent to-transparent" />
            </>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-[#04081610]" />

          {/* Badge */}
          <span
            className="
              absolute left-4 top-4 z-20
              rounded-md
              border border-[#d4a84325]
              bg-[#07091ad9]
              px-[9px] py-[5px]
              font-mono text-[10px]
              tracking-[0.18em]
              text-[#d4a84390]
              backdrop-blur-sm
            "
          >
            #P0{project.id}
          </span>
        </div>

        {/* BODY */}
        <div className="flex flex-1 flex-col px-5 pb-5 pt-5">
          {/* TITLE */}
          <h3
            className="
              min-h-[56px]
              text-[17px]
              font-semibold
              leading-[1.45]
              tracking-[-0.01em]
              text-[#d8ceb0]
            "
          >
            {project.title}
          </h3>

          {/* DESCRIPTION */}
          <p
            className="
              mt-3 flex-1
              text-[13.5px]
              leading-[1.85]
              text-[#64748f]
            "
          >
            {project.description}
          </p>

          {/* DIVIDER */}
          <div className="my-5 h-px bg-[#1a2540]" />

          {/* FOOTER */}
          <div className="flex min-h-[28px] items-center">
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-2
                  text-[13px]
                  font-medium
                  tracking-[0.01em]
                  text-[#5ea4ea]
                  transition-all duration-300
                  hover:text-[#8cc2f5]
                "
              >
                <ExternalLink size={15} />
                Kunjungi Website
              </a>
            ) : (
              <span className="h-[28px]" />
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
      if (window.innerWidth < 768) {
        setCardsPerPage(1)
      } else if (window.innerWidth < 1100) {
        setCardsPerPage(2)
      } else {
        setCardsPerPage(3)
      }
    }

    handleResize()

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    setCurrentPage(0)
  }, [cardsPerPage])

  const totalPages = useMemo(() => {
    return Math.ceil(projects.length / cardsPerPage)
  }, [cardsPerPage])

  const slide = useCallback(
    (direction: number) => {
      setCurrentPage((prev) =>
        Math.max(0, Math.min(totalPages - 1, prev + direction))
      )
    },
    [totalPages]
  )

  const pageProjects = useCallback(
    (page: number) =>
      projects.slice(
        page * cardsPerPage,
        (page + 1) * cardsPerPage
      ),
    [cardsPerPage]
  )

  return (
    <section
      id="projects"
      className="
        relative flex min-h-screen scroll-mt-20 items-center overflow-hidden
        py-20 md:py-24 lg:py-16
      "
      style={{ background: "#07091a" }}
    >
      <BatikBackground />

      <div
        className="
          relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-7xl
          flex-col justify-center
          px-5 sm:px-8 lg:px-12
        "
      >
        {/* HEADER */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-6 md:mb-9">
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

          <Link href="/projects" className="flex-shrink-0 no-underline">
            <div
              className="
                flex overflow-hidden rounded-[12px]
                border border-[#d4a84340]
                bg-[#0d1226]/80
                backdrop-blur-sm
                transition-all duration-300
                hover:border-[#d4a84370]
                hover:shadow-[0_12px_35px_rgba(212,168,67,0.12)]
              "
            >
              <div
                className="
                  flex items-center gap-2
                  bg-[#0d1226]/90
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
                <span className="text-[22px] font-medium">
                  {projects.length}
                </span>

                <span className="mt-[2px] text-[9px] uppercase tracking-widest opacity-70">
                  Projects
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* DIVIDER */}
        <div
          className="relative mb-8 h-px md:mb-9"
          style={{ background: "#d4a84318" }}
        >
          <span
            className="absolute left-0 top-0 h-px w-[70px]"
            style={{ background: "#d4a843" }}
          />
        </div>

        {/* CAROUSEL */}
        <div className="relative">
          {/* PREV */}
          <button
            onClick={() => slide(-1)}
            disabled={currentPage === 0}
            aria-label="Sebelumnya"
            className="
              absolute left-[-10px] top-1/2 z-10 hidden
              h-[44px] w-[44px] -translate-y-1/2
              items-center justify-center rounded-full
              border border-[#d4a84335]
              bg-[#0d1226]/90
              text-[#d4a843]
              backdrop-blur-sm
              transition-all duration-300
              hover:bg-[#14193a]
              disabled:cursor-default disabled:opacity-15
              sm:flex
            "
          >
            <ChevronLeft size={20} />
          </button>

          {/* NEXT */}
          <button
            onClick={() => slide(1)}
            disabled={currentPage === totalPages - 1}
            aria-label="Berikutnya"
            className="
              absolute right-[-10px] top-1/2 z-10 hidden
              h-[44px] w-[44px] -translate-y-1/2
              items-center justify-center rounded-full
              border border-[#d4a84335]
              bg-[#0d1226]/90
              text-[#d4a843]
              backdrop-blur-sm
              transition-all duration-300
              hover:bg-[#14193a]
              disabled:cursor-default disabled:opacity-15
              sm:flex
            "
          >
            <ChevronRight size={20} />
          </button>

          {/* TRACK */}
          <div className="overflow-x-hidden overflow-y-visible sm:mx-[34px]">
            <div
              className="
                flex transition-transform duration-700
                ease-[cubic-bezier(0.22,1,0.36,1)]
              "
              style={{
                transform: `translateX(-${currentPage * 100}%)`,
              }}
            >
              {isClient &&
                Array.from({ length: totalPages }).map((_, pageIdx) => {
                  const visibleProjects = pageProjects(pageIdx)

                  return (
                    <div
                      key={pageIdx}
                      className="
                        flex min-w-full items-stretch
                        gap-6
                        px-[4px]
                        pb-4
                      "
                    >
                      {visibleProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}

                      {visibleProjects.length < cardsPerPage &&
                        Array.from({
                          length: cardsPerPage - visibleProjects.length,
                        }).map((_, i) => (
                          <div key={i} className="min-w-0 flex-1" />
                        ))}
                    </div>
                  )
                })}
            </div>
          </div>
        </div>

        {/* DOTS + PAGE NUMBER */}
        <div className="mt-7 flex items-center justify-center gap-[7px] md:mt-8">
          {Array.from({ length: totalPages }).map((_, i) => {
            const active = i === currentPage

            return (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                aria-label={`Halaman ${i + 1}`}
                className="
                  h-[8px]
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
              color: "#59709a",
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

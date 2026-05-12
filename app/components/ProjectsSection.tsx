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

          <circle
            cx="35"
            cy="35"
            r="9"
            fill="none"
            stroke="#d4a843"
            strokeWidth="0.5"
          />

          <circle
            cx="35"
            cy="35"
            r="17"
            fill="none"
            stroke="#4a7cbf"
            strokeWidth="0.38"
          />

          <circle
            cx="35"
            cy="35"
            r="25"
            fill="none"
            stroke="#d4a843"
            strokeWidth="0.28"
          />
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
// PROJECT CARD
// ============================================================

function ProjectCard({
  project,
}: {
  project: (typeof projects)[0]
}) {
  return (
    <div className="flex flex-1 pt-4">
      <div
        className="
          group flex h-full min-w-0 flex-1 flex-col overflow-hidden
          rounded-[24px]
          border border-[#1f2b46]
          bg-[#0b1020]
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
          ) : project.image.includes(
              "mobile-mata-elang/combined"
            ) ? (
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

              <div className="absolute inset-0 bg-gradient-to-t from-[#07091ac9] via-transparent to-transparent" />
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

    return () =>
      window.removeEventListener("resize", handleResize)
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
        Math.max(
          0,
          Math.min(totalPages - 1, prev + direction)
        )
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
              bg-[#0d1226]
              text-[#d4a843]
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
              bg-[#0d1226]
              text-[#d4a843]
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
                Array.from({
                  length: totalPages,
                }).map((_, pageIdx) => (
                  <div
                    key={pageIdx}
                    className="
                      flex min-w-full items-stretch
                      gap-6
                      px-[4px]
                      pb-4
                    "
                  >
                    {pageProjects(pageIdx).map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                      />
                    ))}

                    {pageProjects(pageIdx).length <
                      cardsPerPage &&
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
        <div className="mt-9 flex items-center justify-center gap-[7px]">
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
                  borderRadius: active
                    ? "999px"
                    : "50%",
                  background: active
                    ? "#d4a843"
                    : "#1e2a46",
                }}
              />
            )
          })}

          <span
            className="ml-[7px] min-w-[30px] text-[11px]"
            style={{
              color: "#2a3d60",
              fontFamily:
                "var(--font-mono, monospace)",
            }}
          >
            {currentPage + 1}/{totalPages}
          </span>
        </div>
      </div>
    </section>
  )
}

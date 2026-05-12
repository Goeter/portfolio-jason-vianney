"use client"

import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import type { TouchEvent } from "react"
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
// NATURAL SPACE BACKGROUND
// ============================================================

function SpaceBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="spaceBase" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#02030a" />
            <stop offset="45%" stopColor="#07091a" />
            <stop offset="100%" stopColor="#02040d" />
          </linearGradient>

          <radialGradient id="edgeBlue" cx="88%" cy="18%" r="48%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.22" />
            <stop offset="48%" stopColor="#1e3a8a" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#07091a" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="edgeGold" cx="8%" cy="82%" r="45%">
            <stop offset="0%" stopColor="#d4a843" stopOpacity="0.14" />
            <stop offset="45%" stopColor="#a16207" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#07091a" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="vignette" cx="50%" cy="50%" r="78%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0" />
            <stop offset="72%" stopColor="#000000" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.68" />
          </radialGradient>

          <pattern
            id="starsSmall"
            x="0"
            y="0"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="18" cy="24" r="0.7" fill="#ffffff" opacity="0.42" />
            <circle cx="72" cy="18" r="0.6" fill="#dbeafe" opacity="0.34" />
            <circle cx="104" cy="68" r="0.8" fill="#ffffff" opacity="0.34" />
            <circle cx="35" cy="86" r="0.5" fill="#93c5fd" opacity="0.42" />
            <circle cx="92" cy="105" r="0.6" fill="#ffffff" opacity="0.28" />
            <circle cx="53" cy="42" r="0.45" fill="#ffffff" opacity="0.25" />
          </pattern>

          <pattern
            id="starsLarge"
            x="0"
            y="0"
            width="260"
            height="260"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="42" cy="58" r="1.1" fill="#ffffff" opacity="0.48" />
            <circle cx="184" cy="36" r="1" fill="#bfdbfe" opacity="0.38" />
            <circle cx="218" cy="190" r="1.2" fill="#ffffff" opacity="0.33" />
            <circle cx="95" cy="218" r="0.9" fill="#d4a843" opacity="0.34" />
            <circle cx="148" cy="142" r="0.75" fill="#93c5fd" opacity="0.3" />
          </pattern>

          <pattern
            id="starsTwinkle"
            x="0"
            y="0"
            width="190"
            height="190"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="32" cy="36" r="0.9" fill="#ffffff" opacity="0.6" />
            <circle cx="128" cy="72" r="0.7" fill="#dbeafe" opacity="0.5" />
            <circle cx="78" cy="150" r="0.8" fill="#ffffff" opacity="0.48" />
            <circle cx="160" cy="132" r="0.65" fill="#d4a843" opacity="0.42" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#spaceBase)" />
        <rect className="edge-glow-blue" width="100%" height="100%" fill="url(#edgeBlue)" />
        <rect className="edge-glow-gold" width="100%" height="100%" fill="url(#edgeGold)" />

        <rect
          className="stars-small"
          width="100%"
          height="100%"
          fill="url(#starsSmall)"
          opacity="0.72"
        />

        <rect
          className="stars-large"
          width="100%"
          height="100%"
          fill="url(#starsLarge)"
          opacity="0.58"
        />

        <rect
          className="stars-twinkle"
          width="100%"
          height="100%"
          fill="url(#starsTwinkle)"
          opacity="0.5"
        />

        <rect width="100%" height="100%" fill="url(#vignette)" />
      </svg>

      <span className="shooting-star shooting-star-1" />
      <span className="shooting-star shooting-star-2" />
      <span className="shooting-star shooting-star-3" />
      <span className="shooting-star shooting-star-4" />

      <style jsx>{`
        .stars-small {
          animation: driftSmallStars 42s linear infinite;
          will-change: transform;
        }

        .stars-large {
          animation: driftLargeStars 64s linear infinite;
          will-change: transform;
        }

        .stars-twinkle {
          animation: twinkleStars 5.5s ease-in-out infinite;
          will-change: opacity;
        }

        .edge-glow-blue {
          animation: softGlowBlue 9s ease-in-out infinite;
          transform-origin: 88% 18%;
          will-change: opacity, transform;
        }

        .edge-glow-gold {
          animation: softGlowGold 11s ease-in-out infinite;
          transform-origin: 8% 82%;
          will-change: opacity, transform;
        }

        .shooting-star {
          position: absolute;
          width: 140px;
          height: 1px;
          border-radius: 999px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(212, 168, 67, 0.45),
            rgba(255, 255, 255, 0.95)
          );
          opacity: 0;
          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.4));
          will-change: transform, opacity;
        }

        .shooting-star-1 {
          top: 12%;
          right: -180px;
          animation: shootingRightToLeftOne 8s ease-in-out infinite;
        }

        .shooting-star-2 {
          top: 24%;
          right: -180px;
          animation: shootingRightToLeftTwo 12s ease-in-out infinite;
          animation-delay: 3s;
        }

        .shooting-star-3 {
          bottom: 18%;
          right: -180px;
          animation: shootingRightToLeftThree 14s ease-in-out infinite;
          animation-delay: 5s;
        }

        .shooting-star-4 {
          top: 8%;
          right: -180px;
          animation: shootingRightToLeftFour 16s ease-in-out infinite;
          animation-delay: 7s;
        }

        @keyframes driftSmallStars {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-120px, 120px, 0);
          }
        }

        @keyframes driftLargeStars {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(260px, -260px, 0);
          }
        }

        @keyframes twinkleStars {
          0%,
          100% {
            opacity: 0.28;
          }
          50% {
            opacity: 0.82;
          }
        }

        @keyframes softGlowBlue {
          0%,
          100% {
            opacity: 0.78;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.04);
          }
        }

        @keyframes softGlowGold {
          0%,
          100% {
            opacity: 0.72;
            transform: scale(1);
          }
          50% {
            opacity: 0.95;
            transform: scale(1.05);
          }
        }

        @keyframes shootingRightToLeftOne {
          0%,
          68%,
          100% {
            opacity: 0;
            transform: translate3d(0, 0, 0) rotate(155deg);
          }
          74% {
            opacity: 1;
          }
          86% {
            opacity: 0;
            transform: translate3d(-115vw, 38vh, 0) rotate(155deg);
          }
        }

        @keyframes shootingRightToLeftTwo {
          0%,
          70%,
          100% {
            opacity: 0;
            transform: translate3d(0, 0, 0) rotate(155deg);
          }
          76% {
            opacity: 0.9;
          }
          88% {
            opacity: 0;
            transform: translate3d(-100vw, 30vh, 0) rotate(155deg);
          }
        }

        @keyframes shootingRightToLeftThree {
          0%,
          72%,
          100% {
            opacity: 0;
            transform: translate3d(0, 0, 0) rotate(205deg);
          }
          78% {
            opacity: 0.85;
          }
          89% {
            opacity: 0;
            transform: translate3d(-110vw, -24vh, 0) rotate(205deg);
          }
        }

        @keyframes shootingRightToLeftFour {
          0%,
          74%,
          100% {
            opacity: 0;
            transform: translate3d(0, 0, 0) rotate(155deg);
          }
          80% {
            opacity: 0.8;
          }
          90% {
            opacity: 0;
            transform: translate3d(-105vw, 30vh, 0) rotate(155deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .stars-small,
          .stars-large,
          .stars-twinkle,
          .edge-glow-blue,
          .edge-glow-gold,
          .shooting-star {
            animation: none;
          }
        }
      `}</style>
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

              <div className="absolute inset-0 bg-gradient-to-t from-[#07091ac9] via-transparent to-transparent" />
            </>
          )}

          <div className="absolute inset-0 bg-[#04081610]" />

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

        <div className="flex flex-1 flex-col px-5 pb-5 pt-5">
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

          <div className="my-5 h-px bg-[#1a2540]" />

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
  const sectionRef = useRef<HTMLElement | null>(null)

  const [currentPage, setCurrentPage] = useState(0)
  const [cardsPerPage, setCardsPerPage] = useState(3)
  const [isClient, setIsClient] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchEndX, setTouchEndX] = useState<number | null>(null)

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
    const section = sectionRef.current

    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.25,
      }
    )

    observer.observe(section)

    return () => observer.disconnect()
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

  const pageProjects = useCallback(
    (page: number) =>
      projects.slice(
        page * cardsPerPage,
        (page + 1) * cardsPerPage
      ),
    [cardsPerPage]
  )

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    setTouchEndX(null)
    setTouchStartX(event.targetTouches[0].clientX)
  }

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    setTouchEndX(event.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return

    const swipeDistance = touchStartX - touchEndX
    const minSwipeDistance = 50

    if (swipeDistance > minSwipeDistance) {
      slide(1)
    }

    if (swipeDistance < -minSwipeDistance) {
      slide(-1)
    }

    setTouchStartX(null)
    setTouchEndX(null)
  }

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="
        relative flex min-h-screen scroll-mt-16 items-center overflow-hidden
        py-8 sm:py-10 md:py-12 lg:py-8
      "
      style={{ background: "#07091a" }}
    >
      <SpaceBackground />

      <div
        className="
          relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-7xl
          flex-col justify-center
          px-5 sm:px-8 lg:px-12
        "
      >
        <div
          className={`
            mb-5 flex flex-wrap items-center justify-between gap-4 md:mb-6
            transition-all duration-700 ease-out
            ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }
          `}
        >
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

        <div
          className={`
            relative mb-5 h-px md:mb-6
            transition-all delay-100 duration-700 ease-out
            ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }
          `}
          style={{ background: "#d4a84318" }}
        >
          <span
            className={`
              absolute left-0 top-0 h-px bg-[#d4a843]
              transition-all delay-300 duration-700 ease-out
              ${isVisible ? "w-[70px]" : "w-0"}
            `}
          />
        </div>

        <div
          className={`
            relative
            transition-all delay-200 duration-700 ease-out
            ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }
          `}
        >
          <button
            onClick={() => slide(-1)}
            disabled={currentPage === 0}
            aria-label="Sebelumnya"
            className="
              absolute left-[-10px] top-1/2 z-20 hidden
              h-[44px] w-[44px] -translate-y-1/2
              items-center justify-center rounded-full
              border border-[#d4a84335]
              bg-[#0d1226]/90
              text-[#d4a843]
              shadow-[0_10px_30px_rgba(0,0,0,0.35)]
              backdrop-blur-md
              transition-all duration-300
              hover:bg-[#14193a]
              disabled:cursor-default disabled:opacity-20
              sm:flex
            "
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={() => slide(1)}
            disabled={currentPage === totalPages - 1}
            aria-label="Berikutnya"
            className="
              absolute right-[-10px] top-1/2 z-20 hidden
              h-[44px] w-[44px] -translate-y-1/2
              items-center justify-center rounded-full
              border border-[#d4a84335]
              bg-[#0d1226]/90
              text-[#d4a843]
              shadow-[0_10px_30px_rgba(0,0,0,0.35)]
              backdrop-blur-md
              transition-all duration-300
              hover:bg-[#14193a]
              disabled:cursor-default disabled:opacity-20
              sm:flex
            "
          >
            <ChevronRight size={20} />
          </button>

          <div
            className="overflow-x-hidden overflow-y-visible sm:mx-[34px]"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="
                flex touch-pan-y select-none transition-transform duration-700
                ease-[cubic-bezier(0.22,1,0.36,1)]
              "
              style={{
                transform: `translateX(-${currentPage * 100}%)`,
              }}
            >
              {isClient &&
                Array.from({
                  length: totalPages,
                }).map((_, pageIdx) => {
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
                        <ProjectCard
                          key={project.id}
                          project={project}
                        />
                      ))}

                      {visibleProjects.length < cardsPerPage &&
                        Array.from({
                          length:
                            cardsPerPage -
                            visibleProjects.length,
                        }).map((_, i) => (
                          <div
                            key={i}
                            className="min-w-0 flex-1"
                          />
                        ))}
                    </div>
                  )
                })}
            </div>
          </div>
        </div>

        <div
          className={`
            mt-4 flex items-center justify-center gap-4 md:mt-5
            transition-all delay-300 duration-700 ease-out
            ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }
          `}
        >
          <button
            onClick={() => slide(-1)}
            disabled={currentPage === 0}
            aria-label="Sebelumnya"
            className="
              flex h-[38px] w-[38px] items-center justify-center rounded-full
              border border-[#d4a84335]
              bg-[#0d1226]/90
              text-[#d4a843]
              shadow-[0_10px_30px_rgba(0,0,0,0.28)]
              backdrop-blur-md
              transition-all duration-300
              hover:bg-[#14193a]
              disabled:cursor-default disabled:opacity-20
              sm:hidden
            "
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center justify-center gap-[7px]">
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
                color: "#59709a",
                fontFamily:
                  "var(--font-mono, monospace)",
              }}
            >
              {currentPage + 1}/{totalPages}
            </span>
          </div>

          <button
            onClick={() => slide(1)}
            disabled={currentPage === totalPages - 1}
            aria-label="Berikutnya"
            className="
              flex h-[38px] w-[38px] items-center justify-center rounded-full
              border border-[#d4a84335]
              bg-[#0d1226]/90
              text-[#d4a843]
              shadow-[0_10px_30px_rgba(0,0,0,0.28)]
              backdrop-blur-md
              transition-all duration-300
              hover:bg-[#14193a]
              disabled:cursor-default disabled:opacity-20
              sm:hidden
            "
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}

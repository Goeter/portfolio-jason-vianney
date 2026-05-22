"use client"

import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import type { TouchEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import ImagePreviewDialog from "./ImagePreviewDialog"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"

import { projects, projectsLatestFirst, type Project } from "@/lib/site-content"

// ============================================================
// NATURAL SPACE BACKGROUND
// ============================================================

function SpaceBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="spaceBase" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#020617" />
            <stop offset="45%" stopColor="#07111f" />
            <stop offset="100%" stopColor="#030712" />
          </linearGradient>

          <radialGradient id="edgeBlue" cx="86%" cy="16%" r="48%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
            <stop offset="48%" stopColor="#1d4ed8" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="edgeGold" cx="10%" cy="82%" r="45%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.16" />
            <stop offset="45%" stopColor="#d4a843" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="centerGlow" cx="50%" cy="48%" r="62%">
            <stop offset="0%" stopColor="#1e293b" stopOpacity="0.28" />
            <stop offset="60%" stopColor="#020617" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0" />
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
        <rect width="100%" height="100%" fill="url(#centerGlow)" />

        <rect className="stars-small" width="100%" height="100%" fill="url(#starsSmall)" opacity="0.72" />
        <rect className="stars-large" width="100%" height="100%" fill="url(#starsLarge)" opacity="0.58" />
        <rect className="stars-twinkle" width="100%" height="100%" fill="url(#starsTwinkle)" opacity="0.5" />

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
  index,
  isVisible,
  onPreview,
}: {
  project: Project
  index: number
  isVisible: boolean
  onPreview: (project: Project) => void
}) {
  return (
    <div
      className={`flex flex-1 pt-4 transition-all duration-700 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${Math.min(index * 90, 360)}ms` }}
    >
      <div className="group relative flex h-full min-w-0 flex-1 flex-col overflow-hidden rounded-3xl border border-amber-300/15 bg-slate-950/62 shadow-xl shadow-black/35 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-amber-300/45 hover:bg-slate-950/75 hover:shadow-amber-500/15">
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/55 to-transparent" />
          <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-52 w-52 rounded-full bg-sky-400/10 blur-3xl" />
        </div>

        <button
          type="button"
          onClick={() => onPreview(project)}
          aria-label={`Preview ${project.title}`}
          className="relative aspect-[16/9] w-full overflow-hidden border-b border-amber-300/10 bg-slate-900 text-left"
        >
          {project.gallery ? (
            <div className="flex h-full w-full">
              {project.gallery.map((src, imageIndex) => (
                <Image
                  key={src}
                  src={src}
                  alt={`${project.title} preview ${imageIndex + 1}`}
                  width={300}
                  height={600}
                  sizes="(max-width: 768px) 33vw, 12vw"
                  className="h-full w-1/3 object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ))}
            </div>
          ) : (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1100px) 45vw, 30vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/15 to-transparent" />
          <div className="absolute inset-0 bg-slate-950/0 transition-colors duration-300 group-hover:bg-slate-950/10" />

          <div className="absolute bottom-3 left-3 z-20 rounded-full border border-amber-300/20 bg-slate-950/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-200 backdrop-blur-md">
            {project.uploadedAt}
          </div>

          <div className="absolute bottom-3 right-3 z-20 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[11px] font-medium text-white/85 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
            Click to preview
          </div>
        </button>

        <div className="relative z-10 flex flex-1 flex-col p-5">
          <h3 className="min-h-[54px] text-[17px] font-bold leading-snug tracking-tight text-white transition group-hover:text-amber-100">
            {project.title}
          </h3>

          <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">
            {project.description}
          </p>

          <div className="my-5 h-px bg-gradient-to-r from-amber-300/25 via-slate-600/20 to-transparent" />

          <div className="flex min-h-[30px] items-center justify-between gap-3">
            <span className="rounded-full border border-slate-500/25 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-slate-400">
              Project
            </span>

            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-400/10 px-3 py-1.5 text-[12px] font-semibold text-sky-200 transition-all duration-300 hover:border-sky-300/45 hover:bg-sky-400/20 hover:text-white"
              >
                Visit
                <ExternalLink size={14} />
              </a>
            ) : (
              <span className="h-[30px]" />
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
  const [previewProject, setPreviewProject] = useState<Project | null>(null)

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
    return Math.max(1, Math.ceil(projectsLatestFirst.length / cardsPerPage))
  }, [cardsPerPage])

  const slide = useCallback(
    (direction: number) => {
      setCurrentPage((prev) => Math.max(0, Math.min(totalPages - 1, prev + direction)))
    },
    [totalPages]
  )

  const pageProjects = useCallback(
    (page: number) => projectsLatestFirst.slice(page * cardsPerPage, (page + 1) * cardsPerPage),
    [cardsPerPage]
  )

  const previewImages = useMemo(() => {
    if (!previewProject) return null

    const sources = previewProject.gallery?.length ? previewProject.gallery : [previewProject.image]

    return sources.map((src, index) => ({
      src,
      alt: `${previewProject.title} preview ${index + 1}`,
    }))
  }, [previewProject])

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

    if (swipeDistance > minSwipeDistance) slide(1)
    if (swipeDistance < -minSwipeDistance) slide(-1)

    setTouchStartX(null)
    setTouchEndX(null)
  }

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section-transition-soft relative flex min-h-screen scroll-mt-16 items-center overflow-hidden py-20"
      style={{ background: "#07091a" }}
    >
      <SpaceBackground />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4">
        <div
          className={`mb-10 transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <h2 className="min-w-0 bg-gradient-to-r from-white via-amber-100 to-[#d4a843] bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
              Projects
            </h2>

            <Link href="/projects" className="mt-1 shrink-0 no-underline md:mt-2">
              <div className="group flex overflow-hidden rounded-[12px] border border-amber-300/30 bg-slate-950/70 shadow-lg shadow-amber-500/10 backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:border-amber-300/60 hover:shadow-amber-500/20">
                <div className="flex items-center justify-center gap-2 bg-slate-950/60 px-3 py-[12px] text-[13px] font-semibold tracking-[0.02em] text-amber-200 transition-colors duration-300 group-hover:bg-amber-400 group-hover:text-slate-950 sm:px-5">
                  <span className="hidden sm:inline">View All</span>
                  <ExternalLink className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <div className="flex min-w-[52px] flex-col items-center justify-center bg-amber-400 px-3 py-[8px] leading-none text-slate-950 sm:min-w-[72px] sm:px-4">
                  <span className="text-[18px] font-bold leading-none sm:text-[21px]">
                    {projects.length}
                  </span>

                  <span className="mt-[3px] text-[8px] uppercase tracking-widest opacity-70 sm:text-[9px]">
                    Projects
                  </span>
                </div>
              </div>
            </Link>
          </div>

          <p className="mt-3 w-full max-w-none text-sm leading-relaxed text-slate-300 md:max-w-4xl md:text-base lg:max-w-5xl">
            A curated collection of web, system, and digital product projects built with a focus on usability, performance, and real business needs.
          </p>
        </div>

        <div
          className={`relative transition-all delay-200 duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <button
            onClick={() => slide(-1)}
            disabled={currentPage === 0}
            aria-label="Sebelumnya"
            className="absolute -left-2 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-amber-300/30 bg-slate-950/80 text-amber-300 shadow-xl backdrop-blur-md transition hover:bg-amber-400 hover:text-slate-950 disabled:cursor-default disabled:opacity-25 md:-left-5 sm:flex"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={() => slide(1)}
            disabled={currentPage === totalPages - 1}
            aria-label="Berikutnya"
            className="absolute -right-2 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-amber-300/30 bg-slate-950/80 text-amber-300 shadow-xl backdrop-blur-md transition hover:bg-amber-400 hover:text-slate-950 disabled:cursor-default disabled:opacity-25 md:-right-5 sm:flex"
          >
            <ChevronRight size={20} />
          </button>

          <div
            className="no-card-scrollbar overflow-hidden px-4 md:px-6"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex touch-pan-y select-none transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                transform: `translateX(-${currentPage * 100}%)`,
              }}
            >
              {isClient &&
                Array.from({ length: totalPages }).map((_, pageIdx) => {
                  const visibleProjects = pageProjects(pageIdx)

                  return (
                    <div key={pageIdx} className="flex min-w-full items-stretch gap-5 px-1 pb-4">
                      {visibleProjects.map((project) => (
                        <ProjectCard
                          key={project.id}
                          project={project}
                          index={pageIdx * cardsPerPage + visibleProjects.indexOf(project)}
                          isVisible={isVisible}
                          onPreview={setPreviewProject}
                        />
                      ))}

                      {visibleProjects.length < cardsPerPage &&
                        Array.from({
                          length: cardsPerPage - visibleProjects.length,
                        }).map((_, i) => <div key={i} className="hidden min-w-0 flex-1 md:block" />)}
                    </div>
                  )
                })}
            </div>
          </div>
        </div>

        <div
          className={`mt-7 flex items-center justify-center gap-4 transition-all delay-300 duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          <button
            onClick={() => slide(-1)}
            disabled={currentPage === 0}
            aria-label="Sebelumnya"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-300/30 bg-slate-950/80 text-amber-300 shadow-lg backdrop-blur-md transition hover:bg-amber-400 hover:text-slate-950 disabled:cursor-default disabled:opacity-25 sm:hidden"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => {
              const active = i === currentPage

              return (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  aria-label={`Halaman ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    active ? "w-8 bg-amber-400" : "w-2 bg-slate-500 hover:bg-slate-300"
                  }`}
                />
              )
            })}

            <span className="ml-1 min-w-8 font-mono text-[11px] text-slate-400">
              {currentPage + 1}/{totalPages}
            </span>
          </div>

          <button
            onClick={() => slide(1)}
            disabled={currentPage === totalPages - 1}
            aria-label="Berikutnya"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-300/30 bg-slate-950/80 text-amber-300 shadow-lg backdrop-blur-md transition hover:bg-amber-400 hover:text-slate-950 disabled:cursor-default disabled:opacity-25 sm:hidden"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <ImagePreviewDialog
        images={previewImages}
        title={previewProject?.title}
        onClose={() => setPreviewProject(null)}
      />
    </section>
  )
}

"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import type { TouchEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"

import {
  getProjectPath,
  projectCategoryLabels,
  projects,
  projectsLatestFirst,
  type Project,
} from "@/lib/site-content"
import { BLUR_DATA_URL } from "@/lib/utils"
import { useScrollReveal } from "@/hooks/useScrollReveal"
import ClapButton from "./ClapButton"

const getCardsPerPage = () => {
  if (window.innerWidth < 768) return 1
  if (window.innerWidth < 1100) return 2
  return 3
}

function ProjectsBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[linear-gradient(135deg,#020617_0%,#06101e_46%,#0c1a2e_100%)]">
      {/* Modern Geometric Constellation Pattern — fresh & distinct from Home */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {/* Constellation node grid */}
          <pattern id="projConstellation" width="120" height="120" patternUnits="userSpaceOnUse">
            {/* Connecting lines — geometric web */}
            <line x1="0" y1="0" x2="60" y2="60" stroke="#38bdf8" strokeWidth="0.3" opacity="0.12" />
            <line x1="120" y1="0" x2="60" y2="60" stroke="#38bdf8" strokeWidth="0.3" opacity="0.12" />
            <line x1="60" y1="60" x2="0" y2="120" stroke="#7dd3fc" strokeWidth="0.25" opacity="0.10" />
            <line x1="60" y1="60" x2="120" y2="120" stroke="#7dd3fc" strokeWidth="0.25" opacity="0.10" />
            <line x1="0" y1="60" x2="120" y2="60" stroke="#38bdf8" strokeWidth="0.2" opacity="0.08" />
            <line x1="60" y1="0" x2="60" y2="120" stroke="#38bdf8" strokeWidth="0.2" opacity="0.08" />
            {/* Diamond shape at center */}
            <path d="M60 40 L80 60 L60 80 L40 60 Z" fill="none" stroke="#7dd3fc" strokeWidth="0.4" opacity="0.14" />
            {/* Nodes — glowing dots at intersections */}
            <circle cx="60" cy="60" r="2.5" fill="#38bdf8" opacity="0.22" />
            <circle cx="0" cy="0" r="1.8" fill="#7dd3fc" opacity="0.16" />
            <circle cx="120" cy="0" r="1.8" fill="#7dd3fc" opacity="0.16" />
            <circle cx="0" cy="120" r="1.8" fill="#38bdf8" opacity="0.14" />
            <circle cx="120" cy="120" r="1.8" fill="#38bdf8" opacity="0.14" />
            <circle cx="0" cy="60" r="1.2" fill="#7dd3fc" opacity="0.12" />
            <circle cx="120" cy="60" r="1.2" fill="#7dd3fc" opacity="0.12" />
            <circle cx="60" cy="0" r="1.2" fill="#38bdf8" opacity="0.12" />
            <circle cx="60" cy="120" r="1.2" fill="#38bdf8" opacity="0.12" />
            {/* Orbital ring around center node */}
            <circle cx="60" cy="60" r="14" fill="none" stroke="#38bdf8" strokeWidth="0.3" opacity="0.10" strokeDasharray="3,4" />
          </pattern>
          {/* Radial glow accents */}
          <radialGradient id="projGlowL" cx="15%" cy="22%" r="42%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="projGlowR" cx="85%" cy="72%" r="38%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="projGlowC" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1440" height="900" fill="url(#projConstellation)" />
        <rect width="1440" height="900" fill="url(#projGlowL)" />
        <rect width="1440" height="900" fill="url(#projGlowR)" />
        <rect width="1440" height="900" fill="url(#projGlowC)" />
        {/* Accent constellation lines — larger scale */}
        <line x1="80" y1="120" x2="280" y2="200" stroke="#22d3ee" strokeWidth="0.4" opacity="0.16" />
        <circle cx="80" cy="120" r="3" fill="#22d3ee" opacity="0.22" />
        <circle cx="280" cy="200" r="2" fill="#22d3ee" opacity="0.18" />
        <line x1="1160" y1="700" x2="1380" y2="620" stroke="#38bdf8" strokeWidth="0.35" opacity="0.14" />
        <circle cx="1160" cy="700" r="3" fill="#38bdf8" opacity="0.20" />
        <circle cx="1380" cy="620" r="2" fill="#38bdf8" opacity="0.16" />
        {/* Floating diamonds */}
        <path d="M720 80 L735 95 L720 110 L705 95 Z" fill="none" stroke="#7dd3fc" strokeWidth="0.5" opacity="0.14" />
        <path d="M400 750 L412 762 L400 774 L388 762 Z" fill="none" stroke="#38bdf8" strokeWidth="0.4" opacity="0.12" />
      </svg>
      {/* Ambient elements */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,rgba(56,189,248,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.3)_1px,transparent_1px)] bg-[size:90px_90px]" />
      <div className="portfolio-orb absolute -left-32 top-20 h-96 w-96 rounded-full bg-sky-500/16 blur-[130px]" />
      <div className="portfolio-orb-delay absolute -right-28 top-40 h-[28rem] w-[28rem] rounded-full bg-cyan-300/12 blur-[145px]" />
      <div className="portfolio-orb-slow absolute bottom-[-11rem] left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-sky-400/8 blur-[155px]" />
      <span className="portfolio-line left-[10%] top-[28%]" />
      <span className="portfolio-line portfolio-line-delay right-[12%] top-[48%]" />
      <div className="portfolio-light-sweep absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(56,189,248,0.065)_42%,transparent_68%)]" />
    </div>
  )
}

function ProjectCard({ project, index, isVisible }: { project: Project; index: number; isVisible: boolean }) {
  const delayClass = [
    "",
    "reveal-delay-1",
    "reveal-delay-2",
    "reveal-delay-3",
  ][Math.min(index, 3)]

  return (
    <div
      className={`flex flex-1 reveal-hidden ${delayClass} ${
        isVisible ? "reveal-visible" : ""
      }`}
    >
      <article className="group relative flex h-full min-w-0 flex-1 flex-col overflow-hidden rounded-[28px] border border-cyan-200/28 bg-[#0B1220]/95 shadow-[0_26px_70px_rgba(0,0,0,0.55),0_0_0_1px_rgba(103,232,249,0.10)] ring-1 ring-white/[0.06] backdrop-blur-md transition-all duration-500 ease-fluid hover:-translate-y-1 hover:border-cyan-200/65 hover:bg-[#0F1B2E]/98 hover:shadow-[0_30px_86px_rgba(14,165,233,0.25),0_0_0_1px_rgba(103,232,249,0.22)]">
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />
          <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-cyan-300/12 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-52 w-52 rounded-full bg-amber-300/10 blur-3xl" />
        </div>

        <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-cyan-200/18 bg-slate-950">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1100px) 45vw, 30vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.035]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/82 via-slate-950/12 to-transparent" />
          <span className="absolute bottom-3 left-3 z-20 rounded-full border border-white/20 bg-black px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-sm backdrop-blur-md">
            {projectCategoryLabels[project.category]}
          </span>
          <div className="absolute bottom-3 right-3 z-20">
            <ClapButton itemId={`project-${project.slug}`} title={project.title} variant="card" />
          </div>
        </div>

        <div className="relative z-10 flex flex-1 flex-col border-t border-white/[0.03] p-5">
          <h3 className="min-h-[54px] text-[17px] font-bold leading-snug tracking-tight text-slate-50 transition group-hover:text-cyan-100">
            {project.title}
          </h3>

          <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300/90">
            {project.description}
          </p>

          <div className="my-5 h-px bg-gradient-to-r from-cyan-200/55 via-white/14 to-transparent" />

          <div className="flex min-h-[34px] flex-wrap items-center justify-between gap-3">
            <Link
              href={getProjectPath(project)}
              className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] text-slate-950 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-100 hover:shadow-md"
            >
              See Details
            </Link>

            {project.link ? (
              <a
                href={project.link}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-400/70 bg-cyan-400/14 px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] text-cyan-100 shadow-[0_10px_24px_rgba(14,165,233,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-400 hover:text-slate-950 hover:shadow-[0_14px_30px_rgba(6,182,212,0.26)]"
              >
                Visit
                <ExternalLink size={14} />
              </a>
            ) : (
              <span className="h-[34px]" aria-hidden="true" />
            )}
          </div>
        </div>
      </article>
    </div>
  )
}

export default function ProjectsSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.12 })

  const [currentPage, setCurrentPage] = useState(0)
  const [cardsPerPage, setCardsPerPage] = useState(3)
  const [isClient, setIsClient] = useState(false)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchEndX, setTouchEndX] = useState<number | null>(null)

  useEffect(() => {
    setIsClient(true)
    let resizeFrame = 0

    const handleResize = () => {
      cancelAnimationFrame(resizeFrame)
      resizeFrame = requestAnimationFrame(() => {
        setCardsPerPage((current) => {
          const next = getCardsPerPage()
          return current === next ? current : next
        })
      })
    }

    handleResize()
    window.addEventListener("resize", handleResize, { passive: true })

    return () => {
      cancelAnimationFrame(resizeFrame)
      window.removeEventListener("resize", handleResize)
    }
  }, [])



  useEffect(() => {
    setCurrentPage(0)
  }, [cardsPerPage])

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(projectsLatestFirst.length / cardsPerPage)),
    [cardsPerPage]
  )

  const paginatedProjects = useMemo(
    () =>
      Array.from({ length: totalPages }, (_, page) =>
        projectsLatestFirst.slice(page * cardsPerPage, (page + 1) * cardsPerPage)
      ),
    [cardsPerPage, totalPages]
  )

  const slide = useCallback(
    (direction: number) => {
      setCurrentPage((page) => Math.max(0, Math.min(totalPages - 1, page + direction)))
    },
    [totalPages]
  )

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const firstTouch = event.targetTouches.item(0)
    if (!firstTouch) return

    setTouchEndX(null)
    setTouchStartX(firstTouch.clientX)
  }

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    const firstTouch = event.targetTouches.item(0)
    if (!firstTouch) return

    setTouchEndX(firstTouch.clientX)
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
      className="section-transition-soft relative flex min-h-screen scroll-mt-16 items-center overflow-hidden py-20 text-slate-50"
    >
      <ProjectsBackground />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4">
        <div
          className={`mb-10 reveal-hidden ${
            isVisible ? "reveal-visible" : ""
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <h2 className="min-w-0 bg-gradient-to-r from-slate-50 via-cyan-100 to-[#C8A96E] bg-clip-text pb-1 text-4xl font-bold leading-[1.15] tracking-tight text-transparent md:pb-1.5 md:text-5xl md:leading-[1.15]">
              Projects
            </h2>

            <Link href="/projects" className="mt-1 shrink-0 no-underline md:mt-2">
              <div className="group flex overflow-hidden rounded-[12px] border border-cyan-300/25 bg-slate-950/70 shadow-lg shadow-cyan-950/35 backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:border-cyan-300/55 hover:shadow-cyan-500/18">
                <div className="flex items-center justify-center gap-2 bg-white/7 px-3 py-[12px] text-[13px] font-semibold tracking-[0.02em] text-cyan-100 transition-colors duration-300 group-hover:bg-cyan-400 group-hover:text-slate-950 sm:px-5">
                  <span className="hidden sm:inline">View All</span>
                  <ExternalLink className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <div className="flex min-w-[52px] flex-col items-center justify-center bg-cyan-400 px-3 py-[8px] leading-none text-slate-950 sm:min-w-[72px] sm:px-4">
                  <span className="text-[18px] font-bold leading-none sm:text-[21px]">
                    {projects.length}
                  </span>
                  <span className="mt-[3px] text-[8px] uppercase tracking-widest opacity-70 sm:text-[9px]">
                    Items
                  </span>
                </div>
              </div>
            </Link>
          </div>

          <p className="mt-3 w-full max-w-none text-sm leading-relaxed text-slate-300 md:max-w-4xl md:text-base lg:max-w-5xl">
            A curated collection of web, application, documentation, and video projects built with a focus on usability, performance, and real business needs.
          </p>
        </div>

        <div
          className={`relative reveal-hidden reveal-delay-2 ${
            isVisible ? "reveal-visible" : ""
          }`}
        >
          <button
            type="button"
            onClick={() => slide(-1)}
            disabled={currentPage === 0}
            aria-label="Previous projects"
            className="absolute -left-2 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-300/25 bg-slate-950/80 text-cyan-100 shadow-xl backdrop-blur-xl transition hover:bg-cyan-400 hover:text-slate-950 disabled:cursor-default disabled:opacity-25 md:-left-5 sm:flex"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={() => slide(1)}
            disabled={currentPage === totalPages - 1}
            aria-label="Next projects"
            className="absolute -right-2 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-300/25 bg-slate-950/80 text-cyan-100 shadow-xl backdrop-blur-xl transition hover:bg-cyan-400 hover:text-slate-950 disabled:cursor-default disabled:opacity-25 md:-right-5 sm:flex"
          >
            <ChevronRight size={20} />
          </button>

          <div
            className="no-card-scrollbar overflow-hidden px-4 py-6 md:px-6"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex touch-pan-y select-none transition-transform duration-700 ease-fluid"
              style={{ transform: `translateX(-${currentPage * 100}%)` }}
            >
              {isClient &&
                paginatedProjects.map((visibleProjects, pageIndex) => (
                  <div key={pageIndex} className="flex min-w-full items-stretch gap-5 px-1 py-2">
                    {visibleProjects.map((project, projectIndex) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        index={pageIndex * cardsPerPage + projectIndex}
                        isVisible={isVisible}
                      />
                    ))}

                    {visibleProjects.length < cardsPerPage &&
                      Array.from({ length: cardsPerPage - visibleProjects.length }).map((_, index) => (
                        <div key={index} className="hidden min-w-0 flex-1 md:block" />
                      ))}
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div
          className={`mt-3 flex items-center justify-center gap-4 reveal-hidden reveal-delay-3 ${
            isVisible ? "reveal-visible" : ""
          }`}
        >
          <button
            type="button"
            onClick={() => slide(-1)}
            disabled={currentPage === 0}
            aria-label="Previous projects"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/25 bg-slate-950/80 text-cyan-100 shadow-lg backdrop-blur-xl transition hover:bg-cyan-400 hover:text-slate-950 disabled:cursor-default disabled:opacity-25 sm:hidden"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => {
              const active = index === currentPage

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentPage(index)}
                  aria-label={`Go to project page ${index + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    active ? "w-8 bg-cyan-300" : "w-2 bg-white/20 hover:bg-cyan-200/60"
                  }`}
                />
              )
            })}

            <span className="ml-1 min-w-8 font-mono text-[11px] text-slate-400">
              {currentPage + 1}/{totalPages}
            </span>
          </div>

          <button
            type="button"
            onClick={() => slide(1)}
            disabled={currentPage === totalPages - 1}
            aria-label="Next projects"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/25 bg-slate-950/80 text-cyan-100 shadow-lg backdrop-blur-xl transition hover:bg-cyan-400 hover:text-slate-950 disabled:cursor-default disabled:opacity-25 sm:hidden"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
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

const getCardsPerPage = () => {
  if (window.innerWidth < 768) return 1
  if (window.innerWidth < 1100) return 2
  return 3
}

function ProjectsBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[radial-gradient(circle_at_16%_16%,rgba(14,165,233,0.24),transparent_30%),radial-gradient(circle_at_84%_24%,rgba(245,158,11,0.12),transparent_32%),radial-gradient(circle_at_50%_96%,rgba(34,211,238,0.10),transparent_34%),linear-gradient(135deg,#020617_0%,#07111f_46%,#0d1829_100%)]">
      <div className="absolute inset-0 opacity-[0.10] bg-[linear-gradient(to_right,rgba(125,211,252,0.45)_1px,transparent_1px),linear-gradient(to_bottom,rgba(125,211,252,0.30)_1px,transparent_1px)] bg-[size:82px_82px]" />
      <div className="portfolio-orb absolute -left-32 top-20 h-96 w-96 rounded-full bg-sky-500/18 blur-[130px]" />
      <div className="portfolio-orb-delay absolute -right-28 top-40 h-[28rem] w-[28rem] rounded-full bg-cyan-300/14 blur-[145px]" />
      <div className="portfolio-orb-slow absolute bottom-[-11rem] left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-amber-300/10 blur-[155px]" />
      <span className="portfolio-line left-[10%] top-[28%]" />
      <span className="portfolio-line portfolio-line-delay right-[12%] top-[48%]" />
      <div className="portfolio-light-sweep absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(56,189,248,0.075)_42%,transparent_68%)]" />
    </div>
  )
}

function ProjectCard({ project, index, isVisible }: { project: Project; index: number; isVisible: boolean }) {
  return (
    <div
      className={`flex flex-1 transition-all duration-700 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${Math.min(index * 90, 360)}ms` }}
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
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.035]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/82 via-slate-950/12 to-transparent" />
          <span className="absolute bottom-3 left-3 z-20 rounded-full border border-white/20 bg-black px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-sm backdrop-blur-md">
            {projectCategoryLabels[project.category]}
          </span>
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
  const sectionRef = useRef<HTMLElement | null>(null)

  const [currentPage, setCurrentPage] = useState(0)
  const [cardsPerPage, setCardsPerPage] = useState(3)
  const [isClient, setIsClient] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
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
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.25 }
    )

    observer.observe(section)
    return () => observer.disconnect()
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
          className={`mb-10 transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
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
          className={`relative transition-all delay-200 duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
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
          className={`mt-3 flex items-center justify-center gap-4 transition-all delay-300 duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
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

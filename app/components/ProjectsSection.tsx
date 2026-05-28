"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { TouchEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"

import ImagePreviewDialog from "./ImagePreviewDialog"
import {
  getProjectPath,
  projectCategoryLabels,
  projects,
  projectsLatestFirst,
  type Project,
} from "@/lib/site-content"

// ============================================================
// LIGHT PROJECT BACKGROUND
// ============================================================

function ProjectsLightBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-gradient-to-br from-slate-50 via-sky-50 to-white">
      <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-sky-200/55 blur-3xl" />
      <div className="absolute -right-28 top-40 h-[26rem] w-[26rem] rounded-full bg-amber-100/70 blur-3xl" />
      <div className="absolute bottom-[-9rem] left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-cyan-100/70 blur-3xl" />
      <div className="absolute inset-0 opacity-[0.45] bg-[linear-gradient(to_right,rgba(14,165,233,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,0.10)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent" />
    </div>
  )
}

// ============================================================
// PROJECT PREVIEW IMAGE
// ============================================================

function ProjectPreviewImage({ project }: { project: Project }) {
  const imageFit = project.imageFit ?? "cover"

  if (project.gallery?.length) {
    return (
      <div className="flex h-full w-full gap-1 bg-slate-100 p-1.5">
        {project.gallery.slice(0, 3).map((src, imageIndex) => (
          <div key={src} className="relative h-full flex-1 overflow-hidden rounded-xl bg-white">
            <Image
              src={src}
              alt={`${project.title} preview ${imageIndex + 1}`}
              fill
              sizes="(max-width: 768px) 30vw, 12vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <Image
      src={project.image}
      alt={project.title}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1100px) 45vw, 30vw"
      className={`transition-transform duration-700 ease-out group-hover:scale-105 ${
        imageFit === "cover" ? "object-cover" : "object-contain"
      }`}
    />
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
      <article className="group relative flex h-full min-w-0 flex-1 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.10)] transition-all duration-500 ease-fluid hover:-translate-y-2 hover:border-sky-300 hover:shadow-[0_24px_60px_rgba(14,165,233,0.20)]">
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/70 to-transparent" />
          <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-sky-300/18 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-52 w-52 rounded-full bg-amber-300/18 blur-3xl" />
        </div>

        <button
          type="button"
          onClick={() => onPreview(project)}
          aria-label={`Preview ${project.title}`}
          className="relative aspect-[16/10] w-full overflow-hidden border-b border-slate-200 bg-slate-100 text-left"
        >
          <ProjectPreviewImage project={project} />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-sky-950/0 transition-colors duration-300 group-hover:bg-sky-950/5" />

          <div className="absolute bottom-3 left-3 z-20 rounded-full border border-sky-200 bg-white/92 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-sky-700 shadow-sm backdrop-blur-md">
            {projectCategoryLabels[project.category]}
          </div>

          <div className="absolute bottom-3 right-3 z-20 rounded-full border border-white/70 bg-slate-950/70 px-3 py-1 text-[11px] font-medium text-white opacity-0 shadow-sm backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
            Click to preview
          </div>
        </button>

        <div className="relative z-10 flex flex-1 flex-col p-5">
          <h3 className="min-h-[54px] text-[17px] font-bold leading-snug tracking-tight text-slate-950 transition group-hover:text-sky-700">
            {project.title}
          </h3>

          <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
            {project.description}
          </p>

          <div className="my-5 h-px bg-gradient-to-r from-sky-200 via-slate-200 to-transparent" />

          <div className="flex min-h-[34px] flex-wrap items-center justify-between gap-3">
            <Link
              href={getProjectPath(project)}
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-950 px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-950 hover:bg-sky-700 hover:shadow-md"
            >
              See Details
            </Link>

            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-sky-500 bg-sky-500 px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_10px_24px_rgba(14,165,233,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-500 hover:shadow-[0_14px_30px_rgba(6,182,212,0.32)]"
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
    let resizeFrame = 0

    const getCardsPerPage = () => {
      if (window.innerWidth < 768) return 1
      if (window.innerWidth < 1100) return 2
      return 3
    }

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

  const paginatedProjects = useMemo(
    () =>
      Array.from({ length: totalPages }, (_, page) =>
        projectsLatestFirst.slice(page * cardsPerPage, (page + 1) * cardsPerPage)
      ),
    [cardsPerPage, totalPages]
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
      className="section-transition-soft relative flex min-h-screen scroll-mt-16 items-center overflow-hidden py-20 text-slate-950"
    >
      <ProjectsLightBackground />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4">
        <div
          className={`mb-10 transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <h2 className="min-w-0 bg-gradient-to-r from-slate-950 via-sky-700 to-cyan-500 bg-clip-text pb-1 text-4xl font-bold leading-[1.15] tracking-tight text-transparent md:pb-1.5 md:text-5xl md:leading-[1.15]">
              Projects
            </h2>

            <Link href="/projects" className="mt-1 shrink-0 no-underline md:mt-2">
              <div className="group flex overflow-hidden rounded-[12px] border border-sky-200 bg-white shadow-lg shadow-sky-200/40 transition-all duration-300 hover:scale-[1.03] hover:border-sky-400 hover:shadow-sky-300/50">
                <div className="flex items-center justify-center gap-2 bg-white px-3 py-[12px] text-[13px] font-semibold tracking-[0.02em] text-sky-700 transition-colors duration-300 group-hover:bg-sky-500 group-hover:text-white sm:px-5">
                  <span className="hidden sm:inline">View All</span>
                  <ExternalLink className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <div className="flex min-w-[52px] flex-col items-center justify-center bg-sky-500 px-3 py-[8px] leading-none text-white sm:min-w-[72px] sm:px-4">
                  <span className="text-[18px] font-bold leading-none sm:text-[21px]">
                    {projects.length}
                  </span>

                  <span className="mt-[3px] text-[8px] uppercase tracking-widest opacity-80 sm:text-[9px]">
                    Items
                  </span>
                </div>
              </div>
            </Link>
          </div>

          <p className="mt-3 w-full max-w-none text-sm leading-relaxed text-slate-600 md:max-w-4xl md:text-base lg:max-w-5xl">
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
            className="absolute -left-2 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-sky-200 bg-white text-sky-700 shadow-xl transition hover:bg-sky-500 hover:text-white disabled:cursor-default disabled:opacity-25 md:-left-5 sm:flex"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={() => slide(1)}
            disabled={currentPage === totalPages - 1}
            aria-label="Next projects"
            className="absolute -right-2 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-sky-200 bg-white text-sky-700 shadow-xl transition hover:bg-sky-500 hover:text-white disabled:cursor-default disabled:opacity-25 md:-right-5 sm:flex"
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
              className="flex touch-pan-y select-none transition-transform duration-700 ease-fluid"
              style={{
                transform: `translateX(-${currentPage * 100}%)`,
              }}
            >
              {isClient &&
                paginatedProjects.map((visibleProjects, pageIdx) => {
                  return (
                    <div key={pageIdx} className="flex min-w-full items-stretch gap-5 px-1 pb-4">
                      {visibleProjects.map((project, projectIndex) => (
                        <ProjectCard
                          key={project.id}
                          project={project}
                          index={pageIdx * cardsPerPage + projectIndex}
                          isVisible={isVisible}
                          onPreview={setPreviewProject}
                        />
                      ))}

                      {visibleProjects.length < cardsPerPage &&
                        Array.from({ length: cardsPerPage - visibleProjects.length }).map((_, i) => (
                          <div key={i} className="hidden min-w-0 flex-1 md:block" />
                        ))}
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
            type="button"
            onClick={() => slide(-1)}
            disabled={currentPage === 0}
            aria-label="Previous projects"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-sky-200 bg-white text-sky-700 shadow-lg transition hover:bg-sky-500 hover:text-white disabled:cursor-default disabled:opacity-25 sm:hidden"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => {
              const active = i === currentPage

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentPage(i)}
                  aria-label={`Go to project page ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    active ? "w-8 bg-sky-500" : "w-2 bg-slate-300 hover:bg-sky-300"
                  }`}
                />
              )
            })}

            <span className="ml-1 min-w-8 font-mono text-[11px] text-slate-500">
              {currentPage + 1}/{totalPages}
            </span>
          </div>

          <button
            type="button"
            onClick={() => slide(1)}
            disabled={currentPage === totalPages - 1}
            aria-label="Next projects"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-sky-200 bg-white text-sky-700 shadow-lg transition hover:bg-sky-500 hover:text-white disabled:cursor-default disabled:opacity-25 sm:hidden"
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

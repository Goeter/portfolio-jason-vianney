"use client"

import { useMemo, useState } from "react"
import type { TouchEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ExternalLink, CalendarDays, Tag, Layers } from "lucide-react"

import ArchiveHeader from "@/app/components/ArchiveHeader"
import Footer from "@/app/components/Footer"
import {
  getProjectPath,
  projectCategoryLabels,
  projectsLatestFirst,
  type Project,
} from "@/lib/site-content"
import { BLUR_DATA_URL } from "@/lib/utils"

interface ProjectDetailClientProps {
  project: Project
}

/* ─────────────────────────────────────────────
   Batik × Technology Light Background
───────────────────────────────────────────── */
function DetailBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden bg-[linear-gradient(135deg,#f0f9ff_0%,#ffffff_32%,#ecfeff_60%,#fff7ed_100%)]">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {/* Batik Kawung — sky blue accent, fresh & light */}
          <pattern id="detailKawung" width="72" height="72" patternUnits="userSpaceOnUse">
            <ellipse cx="36" cy="16" rx="14" ry="9" fill="none" stroke="#0ea5e9" strokeWidth="0.45" opacity="0.12" />
            <ellipse cx="36" cy="56" rx="14" ry="9" fill="none" stroke="#0ea5e9" strokeWidth="0.45" opacity="0.12" />
            <ellipse cx="16" cy="36" rx="9" ry="14" fill="none" stroke="#0ea5e9" strokeWidth="0.45" opacity="0.12" />
            <ellipse cx="56" cy="36" rx="9" ry="14" fill="none" stroke="#0ea5e9" strokeWidth="0.45" opacity="0.12" />
            <circle cx="36" cy="36" r="4" fill="none" stroke="#0ea5e9" strokeWidth="0.4" opacity="0.10" />
            {/* Batik Nitik dots */}
            <circle cx="36" cy="36" r="1.2" fill="#0ea5e9" opacity="0.08" />
            <circle cx="16" cy="16" r="1" fill="#06b6d4" opacity="0.06" />
            <circle cx="56" cy="56" r="1" fill="#06b6d4" opacity="0.06" />
            <circle cx="16" cy="56" r="1" fill="#06b6d4" opacity="0.06" />
            <circle cx="56" cy="16" r="1" fill="#06b6d4" opacity="0.06" />
          </pattern>
          {/* Circuit board tech overlay */}
          <pattern id="detailCircuit" width="80" height="80" patternUnits="userSpaceOnUse">
            <line x1="0" y1="40" x2="80" y2="40" stroke="#7dd3fc" strokeWidth="0.3" opacity="0.08" />
            <line x1="40" y1="0" x2="40" y2="80" stroke="#7dd3fc" strokeWidth="0.3" opacity="0.08" />
            <circle cx="40" cy="40" r="2.5" fill="none" stroke="#7dd3fc" strokeWidth="0.35" opacity="0.10" />
            <circle cx="0" cy="0" r="1" fill="#38bdf8" opacity="0.07" />
            <circle cx="80" cy="80" r="1" fill="#38bdf8" opacity="0.07" />
            <line x1="40" y1="40" x2="55" y2="40" stroke="#bae6fd" strokeWidth="0.3" opacity="0.10" />
            <line x1="40" y1="40" x2="40" y2="25" stroke="#bae6fd" strokeWidth="0.3" opacity="0.10" />
          </pattern>
          {/* Warm glow accents */}
          <radialGradient id="detailGlowTL" cx="12%" cy="15%" r="38%">
            <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="detailGlowBR" cx="85%" cy="80%" r="36%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="detailGlowCenter" cx="50%" cy="45%" r="40%">
            <stop offset="0%" stopColor="#a5f3fc" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#a5f3fc" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1440" height="900" fill="url(#detailKawung)" />
        <rect width="1440" height="900" fill="url(#detailCircuit)" />
        <rect width="1440" height="900" fill="url(#detailGlowTL)" />
        <rect width="1440" height="900" fill="url(#detailGlowBR)" />
        <rect width="1440" height="900" fill="url(#detailGlowCenter)" />
        {/* Decorative circuit traces */}
        <line x1="0" y1="180" x2="220" y2="180" stroke="#38bdf8" strokeWidth="0.5" opacity="0.10" />
        <line x1="220" y1="180" x2="250" y2="210" stroke="#38bdf8" strokeWidth="0.5" opacity="0.10" />
        <circle cx="220" cy="180" r="3" fill="#38bdf8" opacity="0.14" />
        <line x1="1220" y1="720" x2="1440" y2="720" stroke="#f59e0b" strokeWidth="0.5" opacity="0.10" />
        <line x1="1220" y1="720" x2="1190" y2="690" stroke="#f59e0b" strokeWidth="0.5" opacity="0.10" />
        <circle cx="1220" cy="720" r="3" fill="#f59e0b" opacity="0.14" />
      </svg>
      {/* Floating ambient orbs */}
      <div className="portfolio-orb absolute -left-28 top-16 h-[26rem] w-[26rem] rounded-full bg-sky-200/50 blur-[120px]" />
      <div className="portfolio-orb-delay absolute -right-24 top-48 h-[28rem] w-[28rem] rounded-full bg-cyan-100/45 blur-[140px]" />
      <div className="portfolio-orb-slow absolute bottom-[-10rem] left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-amber-100/40 blur-[150px]" />
      {/* Animated lines */}
      <span className="portfolio-line left-[14%] top-[22%]" />
      <span className="portfolio-line portfolio-line-delay right-[10%] top-[54%]" />
      {/* Light sweep */}
      <div className="portfolio-light-sweep absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(14,165,233,0.08)_42%,transparent_68%)]" />
    </div>
  )
}

/* ─────────────────────────────────────────────
   Project Image
───────────────────────────────────────────── */
function ProjectImage({
  project,
  src,
  index,
  priority = false,
}: {
  project: Project
  src: string
  index: number
  priority?: boolean
}) {
  const imageFit = project.imageFit ?? "cover"
  const isLogoImage = imageFit === "logo" || (project.logoImageIndexes ?? []).includes(index)

  return (
    <Image
      src={src}
      alt={`${project.title} screenshot ${index + 1}`}
      fill
      priority={priority}
      sizes="(max-width: 1024px) 100vw, 1120px"
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
      className={`transition-transform duration-700 ${
        isLogoImage || imageFit === "contain" ? "object-contain" : "object-cover"
      }`}
    />
  )
}

/* ─────────────────────────────────────────────
   Latest Project Card
───────────────────────────────────────────── */
function LatestProjectCard({ project }: { project: Project }) {
  const imageFit = project.imageFit ?? "cover"

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-sky-200/40 bg-white/80 text-slate-950 shadow-[0_20px_60px_rgba(15,23,42,0.08),0_0_0_1px_rgba(14,165,233,0.08)] backdrop-blur-xl transition-all duration-500 ease-fluid hover:-translate-y-1.5 hover:border-sky-300/60 hover:shadow-[0_28px_80px_rgba(14,165,233,0.14),0_0_0_1px_rgba(14,165,233,0.16)]">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/70 to-transparent" />
        <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-sky-200/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-amber-200/15 blur-3xl" />
      </div>

      <div className="relative aspect-[16/10] overflow-hidden border-b border-sky-100/50 bg-slate-50">
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className={`object-center transition-transform duration-700 ease-out group-hover:scale-[1.035] ${
            imageFit === "cover" ? "object-cover" : "object-contain"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
        <span className="absolute bottom-3 left-3 z-20 rounded-full border border-sky-200/60 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-sky-700 shadow-sm backdrop-blur-md">
          {projectCategoryLabels[project.category]}
        </span>
      </div>

      <div className="relative z-10 flex flex-1 flex-col p-5">
        <h3 className="min-h-[54px] break-words text-[17px] font-bold leading-snug tracking-tight text-slate-900 transition group-hover:text-sky-700">
          {project.title}
        </h3>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500">
          {project.description}
        </p>

        <div className="my-5 h-px bg-gradient-to-r from-sky-200/60 via-slate-200/40 to-transparent" />

        <div className="flex min-h-[34px] flex-wrap items-center justify-between gap-3">
          <Link
            href={getProjectPath(project)}
            className="inline-flex items-center justify-center rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] text-sky-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-400 hover:bg-sky-500 hover:text-white hover:shadow-md"
          >
            See Details
          </Link>

          {project.link ? (
            <a
              href={project.link}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-sky-400 bg-sky-500 px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_10px_24px_rgba(14,165,233,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-600 hover:shadow-[0_14px_30px_rgba(14,165,233,0.28)]"
            >
              View Project
              <ExternalLink size={14} />
            </a>
          ) : (
            <span className="h-[34px]" aria-hidden="true" />
          )}
        </div>
      </div>
    </article>
  )
}

/* ─────────────────────────────────────────────
   Project Detail Page
───────────────────────────────────────────── */
export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchEndX, setTouchEndX] = useState<number | null>(null)

  const images = useMemo(() => project.gallery?.length ? project.gallery : [project.image], [project])

  const latestProjects = useMemo(
    () => projectsLatestFirst.filter((item) => item.slug !== project.slug).slice(0, 3),
    [project.slug]
  )

  const goToImage = (direction: number) => {
    setActiveIndex((current) => {
      const next = current + direction
      if (next < 0) return images.length - 1
      if (next >= images.length) return 0
      return next
    })
  }

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
    if (touchStartX === null || touchEndX === null || images.length <= 1) return

    const swipeDistance = touchStartX - touchEndX
    const minSwipeDistance = 50

    if (swipeDistance > minSwipeDistance) goToImage(1)
    if (swipeDistance < -minSwipeDistance) goToImage(-1)

    setTouchStartX(null)
    setTouchEndX(null)
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden text-slate-950">
      <DetailBackground />

      <ArchiveHeader title="Detail Project" backHref="/#projects" />

      <main className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-9 sm:px-8 lg:px-12">
        {/* ── Hero Title ── */}
        <section className="mx-auto max-w-5xl text-center">
          <h1 className="mx-auto max-w-5xl break-words bg-gradient-to-r from-slate-900 via-sky-800 to-cyan-600 bg-clip-text pb-3 text-3xl font-black leading-[1.12] tracking-[-0.03em] text-transparent md:text-5xl">
            {project.title}
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-500 md:text-lg">
            {project.description}
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200/70 bg-white/90 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-sky-700 shadow-sm backdrop-blur-md">
              <Tag className="h-3.5 w-3.5" />
              {projectCategoryLabels[project.category]}
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200/70 bg-white/90 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-amber-700 shadow-sm backdrop-blur-md">
              <CalendarDays className="h-3.5 w-3.5" />
              {project.uploadedAt}
            </span>

            {project.link ? (
              <a
                href={project.link}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-sky-400 bg-gradient-to-r from-sky-500 to-cyan-500 px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_12px_30px_rgba(14,165,233,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:from-sky-600 hover:to-cyan-600 hover:shadow-[0_16px_36px_rgba(6,182,212,0.32)]"
              >
                View Project
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        </section>

        {/* ── Image Gallery ── */}
        <section className="mx-auto mt-10 max-w-6xl overflow-hidden rounded-[32px] border border-sky-200/40 bg-white/70 p-3 shadow-[0_24px_70px_rgba(14,165,233,0.08),0_0_0_1px_rgba(14,165,233,0.05)] backdrop-blur-xl md:p-4">
          <div
            className="relative aspect-[16/9] overflow-hidden rounded-[24px] bg-gradient-to-br from-slate-50 to-sky-50/50"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative h-full w-full">
              <ProjectImage project={project} src={images[activeIndex]} index={activeIndex} priority />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/16 via-transparent to-transparent" />
            </div>

            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => goToImage(-1)}
                  aria-label="Previous project image"
                  className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/95 text-slate-600 shadow-[0_8px_24px_rgba(0,0,0,0.10)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1/2 hover:scale-105 hover:bg-sky-500 hover:text-white hover:shadow-[0_12px_30px_rgba(14,165,233,0.25)]"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => goToImage(1)}
                  aria-label="Next project image"
                  className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/95 text-slate-600 shadow-[0_8px_24px_rgba(0,0,0,0.10)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1/2 hover:scale-105 hover:bg-sky-500 hover:text-white hover:shadow-[0_12px_30px_rgba(14,165,233,0.25)]"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            ) : null}

            {/* Image counter badge */}
            {images.length > 1 ? (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/60 bg-white/90 px-3 py-1 text-[11px] font-bold tabular-nums text-slate-600 shadow-sm backdrop-blur-md">
                {activeIndex + 1} / {images.length}
              </div>
            ) : null}
          </div>

          {images.length > 1 ? (
            <div className="no-card-scrollbar mt-4 flex gap-3 overflow-x-auto pb-1">
              {images.map((src, index) => {
                const active = index === activeIndex

                return (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Show ${project.title} image ${index + 1}`}
                    className={`relative h-20 w-32 shrink-0 overflow-hidden rounded-2xl border-2 bg-slate-50 transition-all duration-300 md:h-24 md:w-40 ${
                      active
                        ? "border-sky-500 shadow-[0_8px_20px_rgba(14,165,233,0.22)] ring-2 ring-sky-200/50"
                        : "border-slate-200/60 opacity-70 hover:border-sky-300 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`${project.title} thumbnail ${index + 1}`}
                      fill
                      sizes="160px"
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                      className="object-cover"
                    />
                  </button>
                )
              })}
            </div>
          ) : null}
        </section>

        {/* ── Project Overview ── */}
        <section className="mx-auto mt-8 max-w-6xl overflow-hidden rounded-[30px] border border-sky-200/35 bg-white/80 shadow-[0_18px_55px_rgba(14,165,233,0.06),0_0_0_1px_rgba(14,165,233,0.04)] backdrop-blur-xl">
          <div className="border-b border-sky-100/50 bg-gradient-to-r from-sky-50/60 via-white to-amber-50/30 px-6 py-4 md:px-8">
            <h3 className="flex items-center gap-2.5 text-xl font-bold tracking-[-0.02em] text-slate-900 md:text-2xl">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-sky-600">
                <Layers className="h-4 w-4" />
              </span>
              Project Overview
            </h3>
          </div>
          <div className="px-6 py-6 md:px-8 md:py-8">
            <p className="text-base leading-[1.85] text-slate-600 md:text-lg">{project.detailDescription}</p>
          </div>
        </section>

        {/* ── Latest Projects ── */}
        {latestProjects.length ? (
          <section className="mt-14">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-sky-600">Latest Projects</p>
                <h3 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-slate-900">Explore More Work</h3>
              </div>
              <Link
                href="/projects"
                className="inline-flex w-fit items-center justify-center rounded-full border border-sky-200 bg-gradient-to-r from-sky-500 to-cyan-500 px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_12px_30px_rgba(14,165,233,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:from-sky-600 hover:to-cyan-600 hover:shadow-[0_16px_36px_rgba(14,165,233,0.28)]"
              >
                View All Project
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {latestProjects.map((item) => (
                <LatestProjectCard key={item.id} project={item} />
              ))}
            </div>
          </section>
        ) : null}
      </main>

      <Footer />
    </div>
  )
}

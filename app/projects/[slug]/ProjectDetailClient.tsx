"use client"

import { useMemo, useState } from "react"
import type { TouchEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ExternalLink, CalendarDays, Tag, Layers, UserCog, Wrench, Target } from "lucide-react"

import { motion } from "framer-motion"

import ArchiveHeader from "@/app/components/ArchiveHeader"
import Footer from "@/app/components/Footer"
import {
  getProjectPath,
  projectCategoryLabels,
  projectsLatestFirst,
  type Project,
} from "@/lib/site-content"
import { BLUR_DATA_URL } from "@/lib/utils"

import { ProjectsBackground } from "@/app/components/ProjectsSection"

interface ProjectDetailClientProps {
  project: Project
}

/* ─────────────────────────────────────────────
   Batik × Technology Background
───────────────────────────────────────────── */
function DetailBackground() {
  return <ProjectsBackground />
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
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-gold-300/20 bg-slate-950/80 text-slate-50 shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-500 ease-fluid hover:-translate-y-1.5 hover:border-gold-300/50 hover:shadow-[0_28px_80px_rgba(200,169,110,0.2)]">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" />
        <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <div className="relative aspect-[16/10] overflow-hidden border-b border-gold-200/15 bg-slate-900">
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
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
        <span className="absolute bottom-3 left-3 z-20 rounded-full border border-gold-200/40 bg-slate-950/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-gold-100 shadow-sm backdrop-blur-md">
          {projectCategoryLabels[project.category]}
        </span>
      </div>

      <div className="relative z-10 flex flex-1 flex-col p-5">
        <h3 className="min-h-[54px] break-words text-[17px] font-bold leading-snug tracking-tight text-slate-50 transition group-hover:text-gold-200">
          {project.title}
        </h3>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">
          {project.description}
        </p>

        <div className="my-5 h-px bg-gradient-to-r from-gold-300/30 via-slate-700/40 to-transparent" />

        <div className="flex min-h-[34px] flex-wrap items-center justify-between gap-3">
          <Link
            href={getProjectPath(project)}
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] text-slate-950 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-300 hover:bg-gold-100 hover:shadow-md"
          >
            See Details
          </Link>

          {project.link ? (
            <a
              href={project.link}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gold-400/70 bg-gold-400/15 px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] text-gold-100 shadow-[0_10px_24px_rgba(200,169,110,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400 hover:text-slate-950 hover:shadow-[0_14px_30px_rgba(200,169,110,0.28)]"
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
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#020617] text-slate-50"
    >
      <DetailBackground />

      <ArchiveHeader title="Detail Project" backHref="/#projects" />

      <main className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-9 sm:px-8 lg:px-12">
        {/* ── Hero Title ── */}
        <section className="mx-auto max-w-5xl text-center">
          <h1 className="mx-auto max-w-5xl break-words bg-gradient-to-r from-slate-50 via-gold-200 to-gold-300 bg-clip-text pb-3 text-3xl font-black leading-[1.12] tracking-[-0.03em] text-transparent md:text-5xl">
            {project.title}
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-300 md:text-lg">
            {project.description}
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-300/30 bg-slate-950/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-gold-200 shadow-sm backdrop-blur-md">
              <Tag className="h-3.5 w-3.5 text-gold-400" />
              {projectCategoryLabels[project.category]}
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/30 bg-slate-950/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-amber-200 shadow-sm backdrop-blur-md">
              <CalendarDays className="h-3.5 w-3.5 text-amber-400" />
              {project.uploadedAt}
            </span>

            {project.link ? (
              <a
                href={project.link}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-gold-400 bg-gradient-to-r from-gold-500 to-gold-500 px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_12px_30px_rgba(200,169,110,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:from-gold-600 hover:to-gold-600 hover:shadow-[0_16px_36px_rgba(200,169,110,0.32)]"
              >
                View Project
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        </section>

        {/* ── Image Gallery ── */}
        <section className="mx-auto mt-10 max-w-6xl overflow-hidden rounded-[32px] border border-gold-300/20 bg-slate-950/70 p-3 shadow-[0_24px_70px_rgba(0,0,0,0.5)] backdrop-blur-xl md:p-4">
          <div
            className="relative aspect-[16/9] overflow-hidden rounded-[24px] bg-slate-900"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative h-full w-full">
              <ProjectImage project={project} src={images[activeIndex]} index={activeIndex} priority />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />
            </div>

            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => goToImage(-1)}
                  aria-label="Previous project image"
                  className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/80 text-slate-200 shadow-[0_8px_24px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1/2 hover:scale-105 hover:bg-gold-500 hover:text-white hover:shadow-[0_12px_30px_rgba(200,169,110,0.35)]"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => goToImage(1)}
                  aria-label="Next project image"
                  className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/80 text-slate-200 shadow-[0_8px_24px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1/2 hover:scale-105 hover:bg-gold-500 hover:text-white hover:shadow-[0_12px_30px_rgba(200,169,110,0.35)]"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            ) : null}

            {/* Image counter badge */}
            {images.length > 1 ? (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-slate-950/85 px-3.5 py-1 text-[11px] font-bold tabular-nums text-slate-200 shadow-sm backdrop-blur-md">
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
                    className={`relative h-20 w-32 shrink-0 overflow-hidden rounded-2xl border-2 bg-slate-950 transition-all duration-300 md:h-24 md:w-40 ${
                      active
                        ? "border-gold-400 shadow-[0_8px_20px_rgba(200,169,110,0.35)] ring-2 ring-gold-300/40"
                        : "border-slate-800 opacity-60 hover:border-gold-300 hover:opacity-100"
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
        <section className="mx-auto mt-8 max-w-6xl overflow-hidden rounded-[30px] border border-gold-300/20 bg-slate-950/80 shadow-[0_22px_70px_rgba(0,0,0,0.4)] backdrop-blur-xl">
          <div className="border-b border-gold-200/15 bg-gradient-to-r from-slate-900/90 via-slate-950 to-slate-900/90 px-6 py-4 md:px-8">
            <h3 className="flex items-center gap-2.5 text-xl font-bold tracking-[-0.02em] text-slate-100 md:text-2xl">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-gold-300/30 bg-gold-500/15 text-gold-300">
                <Layers className="h-4 w-4" />
              </span>
              Project Overview
            </h3>
          </div>
          <div className="px-6 py-6 md:px-8 md:py-8">
            <p className="text-base leading-[1.85] text-slate-300 md:text-lg">{project.detailDescription}</p>

            {project.role || project.stack?.length || project.impact ? (
              <dl className="mt-7 grid gap-4 border-t border-gold-200/10 pt-7 sm:grid-cols-2 lg:grid-cols-3">
                {project.role ? (
                  <div className="rounded-2xl border border-gold-300/15 bg-slate-900/50 p-4">
                    <dt className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-gold-300">
                      <UserCog className="h-3.5 w-3.5" />
                      My Role
                    </dt>
                    <dd className="text-sm leading-relaxed text-slate-300">{project.role}</dd>
                  </div>
                ) : null}

                {project.stack?.length ? (
                  <div className="rounded-2xl border border-gold-300/15 bg-slate-900/50 p-4">
                    <dt className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-gold-300">
                      <Wrench className="h-3.5 w-3.5" />
                      Stack
                    </dt>
                    <dd className="flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-gold-300/25 bg-gold-500/10 px-2.5 py-1 text-[11px] font-semibold text-gold-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </dd>
                  </div>
                ) : null}

                {project.impact ? (
                  <div className="rounded-2xl border border-amber-300/20 bg-amber-500/[0.06] p-4">
                    <dt className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-amber-300">
                      <Target className="h-3.5 w-3.5" />
                      What Changed
                    </dt>
                    <dd className="text-sm leading-relaxed text-slate-300">{project.impact}</dd>
                  </div>
                ) : null}
              </dl>
            ) : null}
          </div>
        </section>

        {/* ── Latest Projects ── */}
        {latestProjects.length ? (
          <section className="mt-14">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-400">Latest Projects</p>
                <h3 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-slate-50">Explore More Work</h3>
              </div>
              <Link
                href="/projects"
                className="inline-flex w-fit items-center justify-center rounded-full border border-gold-200 bg-gradient-to-r from-gold-500 to-gold-500 px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_12px_30px_rgba(200,169,110,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:from-gold-600 hover:to-gold-600 hover:shadow-[0_16px_36px_rgba(200,169,110,0.28)]"
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
    </motion.div>
  )
}

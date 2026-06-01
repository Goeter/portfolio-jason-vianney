"use client"

import { useMemo, useState } from "react"
import type { TouchEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"

import ArchiveHeader from "@/app/components/ArchiveHeader"
import Footer from "@/app/components/Footer"
import {
  getProjectPath,
  projectCategoryLabels,
  projectsLatestFirst,
  type Project,
} from "@/lib/site-content"

interface ProjectDetailClientProps {
  project: Project
}

function DetailBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden bg-[radial-gradient(circle_at_15%_18%,rgba(125,211,252,0.34),transparent_32%),radial-gradient(circle_at_84%_28%,rgba(253,186,116,0.26),transparent_34%),linear-gradient(135deg,#ffffff_0%,#eef9ff_48%,#fff7ed_100%)]">
      <div className="portfolio-orb absolute -left-32 top-20 h-[28rem] w-[28rem] rounded-full bg-sky-300/40 blur-[125px]" />
      <div className="portfolio-orb-delay absolute -right-28 top-56 h-[30rem] w-[30rem] rounded-full bg-cyan-200/40 blur-[150px]" />
      <div className="portfolio-orb-slow absolute bottom-[-12rem] left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-amber-200/40 blur-[160px]" />
      <span className="portfolio-line left-[12%] top-[24%]" />
      <span className="portfolio-line portfolio-line-delay right-[12%] top-[56%]" />
      <div className="portfolio-light-sweep absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(14,165,233,0.10)_42%,transparent_68%)]" />
    </div>
  )
}

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
      className={`transition-transform duration-700 ${
        isLogoImage || imageFit === "contain" ? "object-contain" : "object-cover"
      }`}
    />
  )
}

function LatestProjectCard({ project }: { project: Project }) {
  const imageFit = project.imageFit ?? "cover"

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-cyan-200/28 bg-[#0B1220]/95 text-slate-50 shadow-[0_26px_70px_rgba(15,23,42,0.24),0_0_0_1px_rgba(103,232,249,0.10)] ring-1 ring-white/[0.06] backdrop-blur-md transition-all duration-500 ease-fluid hover:-translate-y-1 hover:border-cyan-200/65 hover:bg-[#0F1B2E]/98 hover:shadow-[0_30px_86px_rgba(14,165,233,0.22),0_0_0_1px_rgba(103,232,249,0.20)]">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />
        <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-cyan-300/12 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-52 w-52 rounded-full bg-amber-300/10 blur-3xl" />
      </div>

      <div className="relative aspect-[16/10] overflow-hidden border-b border-cyan-200/18 bg-slate-950">
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={`object-center transition-transform duration-700 ease-out group-hover:scale-[1.035] ${
            imageFit === "cover" ? "object-cover" : "object-contain"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/82 via-slate-950/12 to-transparent" />
        <span className="absolute bottom-3 left-3 z-20 rounded-full border border-cyan-200/25 bg-cyan-300/12 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-cyan-100 shadow-sm backdrop-blur-md">
          {projectCategoryLabels[project.category]}
        </span>
      </div>

      <div className="relative z-10 flex flex-1 flex-col border-t border-white/[0.03] p-5">
        <h3 className="min-h-[54px] break-words text-[17px] font-bold leading-snug tracking-tight text-slate-50 transition group-hover:text-cyan-100">
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
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-400/70 bg-cyan-400/14 px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] text-cyan-100 shadow-[0_10px_24px_rgba(14,165,233,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-400 hover:text-slate-950 hover:shadow-[0_14px_30px_rgba(6,182,212,0.26)]"
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
        <section className="mx-auto max-w-6xl text-center">
          <h1 className="mx-auto max-w-5xl break-words bg-gradient-to-r from-slate-950 via-sky-700 to-cyan-500 bg-clip-text pb-2 text-3xl font-black leading-[1.12] tracking-[-0.03em] text-transparent md:text-5xl">
            {project.title}
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex rounded-full border border-sky-200 bg-white/90 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-sky-700 shadow-sm backdrop-blur-md">
              {projectCategoryLabels[project.category]}
            </span>

            <span className="inline-flex rounded-full border border-amber-200 bg-white/90 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-amber-700 shadow-sm backdrop-blur-md">
              {project.uploadedAt}
            </span>

            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-sky-500 bg-sky-500 px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_12px_30px_rgba(14,165,233,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-500 hover:shadow-[0_16px_36px_rgba(6,182,212,0.32)]"
              >
                View Project
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-6xl overflow-hidden rounded-[32px] border border-slate-200 bg-white/90 p-3 shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur-xl md:p-4">
          <div
            className="relative aspect-[16/9] overflow-hidden rounded-[24px] bg-slate-100"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative h-full w-full">
              <ProjectImage project={project} src={images[activeIndex]} index={activeIndex} priority />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/24 via-transparent to-transparent" />
            </div>

            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => goToImage(-1)}
                  aria-label="Previous project image"
                  className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/90 text-slate-700 shadow-lg backdrop-blur-md transition hover:bg-sky-500 hover:text-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => goToImage(1)}
                  aria-label="Next project image"
                  className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/90 text-slate-700 shadow-lg backdrop-blur-md transition hover:bg-sky-500 hover:text-white"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            ) : null}
          </div>

          <div className="no-card-scrollbar mt-4 flex gap-3 overflow-x-auto pb-1">
            {images.map((src, index) => {
              const active = index === activeIndex

              return (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show ${project.title} image ${index + 1}`}
                  className={`relative h-20 w-32 shrink-0 overflow-hidden rounded-2xl border bg-slate-100 transition-all duration-300 md:h-24 md:w-40 ${
                    active
                      ? "border-sky-500 shadow-[0_10px_24px_rgba(14,165,233,0.22)]"
                      : "border-slate-200 opacity-75 hover:border-sky-300 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${project.title} thumbnail ${index + 1}`}
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </button>
              )
            })}
          </div>
        </section>

        <section className="mx-auto mt-8 max-w-6xl rounded-[30px] border border-slate-200 bg-white/90 p-6 text-base leading-relaxed text-slate-700 shadow-[0_18px_55px_rgba(15,23,42,0.10)] backdrop-blur-xl md:p-8 md:text-lg">
          <h3 className="mb-4 text-xl font-bold tracking-[-0.02em] text-slate-950 md:text-2xl">
            Project Overview
          </h3>
          <p>{project.detailDescription}</p>
        </section>

        {latestProjects.length ? (
          <section className="mt-12">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-sky-700">Latest Projects</p>
                <h3 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-slate-950">Explore More Work</h3>
              </div>
              <Link
                href="/projects"
                className="inline-flex w-fit items-center justify-center rounded-full border border-slate-200 bg-slate-950 px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_12px_30px_rgba(15,23,42,0.16)] transition hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-600"
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

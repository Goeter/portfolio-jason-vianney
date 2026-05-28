"use client"

import { useMemo, useState } from "react"
import type { TouchEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"

import ImagePreviewDialog from "@/app/components/ImagePreviewDialog"
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
    <div className="pointer-events-none fixed inset-0 overflow-hidden bg-gradient-to-br from-white via-sky-50 to-slate-100">
      <div className="absolute -left-32 top-20 h-[28rem] w-[28rem] rounded-full bg-sky-200/65 blur-3xl" />
      <div className="absolute -right-28 top-56 h-[30rem] w-[30rem] rounded-full bg-cyan-100/85 blur-3xl" />
      <div className="absolute bottom-[-12rem] left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-amber-100/75 blur-3xl" />
      <div className="absolute inset-0 opacity-[0.42] bg-[linear-gradient(to_right,rgba(14,165,233,0.11)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,0.11)_1px,transparent_1px)] bg-[size:72px_72px]" />
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
    <Link
      href={getProjectPath(project)}
      className="group block overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-[0_22px_55px_rgba(14,165,233,0.16)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={`transition-transform duration-700 group-hover:scale-105 ${
            imageFit === "cover" ? "object-cover" : "object-contain"
          }`}
        />
        <span className="absolute bottom-3 left-3 rounded-full border border-sky-200 bg-white/92 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-sky-700 shadow-sm backdrop-blur-md">
          {projectCategoryLabels[project.category]}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-base font-bold leading-snug text-slate-950 transition-colors duration-300 group-hover:text-sky-700">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
          {project.description}
        </p>
      </div>
    </Link>
  )
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchEndX, setTouchEndX] = useState<number | null>(null)

  const images = useMemo(() => project.gallery?.length ? project.gallery : [project.image], [project])

  const previewImages = useMemo(
    () => images.map((src, index) => ({ src, alt: `${project.title} preview ${index + 1}` })),
    [images, project.title]
  )

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
    <div className="relative min-h-screen overflow-x-hidden text-slate-950">
      <DetailBackground />

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/86 shadow-sm backdrop-blur-xl">
        <div className="relative mx-auto flex h-[68px] w-full max-w-7xl items-center px-4 sm:px-8 lg:px-12">
          <Link
            href="/#projects"
            className="group relative z-10 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-[10px] text-slate-700 shadow-sm transition-all duration-300 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
          >
            <ChevronLeft size={18} className="transition-transform duration-300 group-hover:-translate-x-[2px]" />
            <span className="hidden text-[13px] font-semibold sm:inline">Back</span>
          </Link>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-24 text-center">
            <h1 className="truncate text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-700">
              Detail Project
            </h1>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-9 sm:px-8 lg:px-12">
        <section className="mx-auto max-w-5xl text-center">
          <span className="inline-flex rounded-full border border-sky-200 bg-white/85 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-sky-700 shadow-sm backdrop-blur-md">
            {projectCategoryLabels[project.category]}
          </span>

          <h2 className="mt-5 bg-gradient-to-r from-slate-950 via-sky-700 to-cyan-500 bg-clip-text text-3xl font-black leading-tight tracking-[-0.03em] text-transparent md:text-5xl">
            {project.title}
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
            {project.description}
          </p>

          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-sky-500 bg-sky-500 px-5 py-3 text-[12px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_12px_30px_rgba(14,165,233,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-500 hover:shadow-[0_16px_36px_rgba(6,182,212,0.32)]"
            >
              Visit Project
              <ExternalLink className="h-4 w-4" />
            </a>
          ) : null}
        </section>

        <section className="mx-auto mt-10 max-w-6xl overflow-hidden rounded-[32px] border border-slate-200 bg-white/88 p-3 shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur-xl md:p-4">
          <div
            className="relative aspect-[16/9] overflow-hidden rounded-[24px] bg-slate-100"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <button
              type="button"
              onClick={() => setIsPreviewOpen(true)}
              aria-label={`Preview ${project.title}`}
              className="relative h-full w-full text-left"
            >
              <ProjectImage project={project} src={images[activeIndex]} index={activeIndex} priority />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/28 via-transparent to-transparent" />
              <span className="absolute bottom-4 right-4 rounded-full border border-white/70 bg-slate-950/70 px-4 py-2 text-sm font-medium text-white shadow-sm backdrop-blur-md">
                Click to preview
              </span>
            </button>

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

        <section className="mx-auto mt-8 max-w-5xl rounded-[30px] border border-slate-200 bg-white/88 p-6 text-base leading-relaxed text-slate-700 shadow-[0_18px_55px_rgba(15,23,42,0.10)] backdrop-blur-xl md:p-8 md:text-lg">
          <h3 className="mb-4 text-xl font-bold tracking-[-0.02em] text-slate-950 md:text-2xl">
            Project Overview
          </h3>
          <p>{project.detailDescription}</p>
        </section>

        {latestProjects.length ? (
          <section className="mt-12">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-sky-700">Latest Projects</p>
                <h3 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-slate-950">Explore More Work</h3>
              </div>
              <Link
                href="/projects"
                className="inline-flex w-fit items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-[12px] font-bold uppercase tracking-[0.1em] text-slate-700 shadow-sm transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
              >
                View Archive
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

      <ImagePreviewDialog
        images={isPreviewOpen ? previewImages : null}
        title={project.title}
        onClose={() => setIsPreviewOpen(false)}
      />
    </div>
  )
}

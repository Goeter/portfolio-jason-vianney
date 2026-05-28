"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ChevronLeft, Search, X } from "lucide-react"

import {
  getProjectPath,
  projectCategoryLabels,
  projectCategoryOptions,
  projectsLatestFirst,
  type Project,
  type ProjectCategory,
} from "@/lib/site-content"

// ============================================================
// LIGHT ARCHIVE BACKGROUND
// ============================================================

function ArchiveBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_14%_16%,rgba(125,211,252,0.34),transparent_32%),radial-gradient(circle_at_86%_24%,rgba(253,186,116,0.26),transparent_34%),linear-gradient(135deg,#ffffff_0%,#eef9ff_48%,#fff7ed_100%)]">
      <div className="portfolio-orb absolute -left-32 top-16 h-[26rem] w-[26rem] rounded-full bg-sky-300/40 blur-[120px]" />
      <div className="portfolio-orb-delay absolute -right-28 top-52 h-[28rem] w-[28rem] rounded-full bg-cyan-200/40 blur-[145px]" />
      <div className="portfolio-orb-slow absolute bottom-[-10rem] left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-amber-200/40 blur-[155px]" />
      <span className="portfolio-line left-[11%] top-[24%]" />
      <span className="portfolio-line portfolio-line-delay right-[14%] top-[58%]" />
      <div className="portfolio-light-sweep absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(14,165,233,0.10)_42%,transparent_68%)]" />
      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-white to-transparent" />
    </div>
  )
}

// ============================================================
// PROJECT IMAGE
// ============================================================

function ProjectImage({ project }: { project: Project }) {
  return (
    <Image
      src={project.image}
      alt={project.title}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
    />
  )
}

// ============================================================
// IMAGE MODAL
// ============================================================

function ImageModal({
  project,
  onClose,
}: {
  project: Project | null
  onClose: () => void
}) {
  if (!project) return null

  const images = project.gallery?.length ? project.gallery : [project.image]

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/90 p-3 backdrop-blur-md sm:p-4"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[94vh] w-[min(96vw,1040px)] flex-col overflow-hidden rounded-[24px] border border-white/20 bg-white p-2 shadow-[0_25px_80px_rgba(0,0,0,0.35)]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project preview"
          className="absolute right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-sky-300 hover:bg-sky-500 hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="no-card-scrollbar min-h-0 max-h-[90vh] max-w-full overflow-auto rounded-[18px] bg-slate-100 p-2">
          {images.length > 1 ? (
            <div className="no-card-scrollbar flex max-h-[88vh] gap-4 overflow-x-auto pb-2 pr-11">
              {images.map((src, index) => (
                <Image
                  key={src}
                  src={src}
                  alt={`${project.title} preview ${index + 1}`}
                  width={1100}
                  height={1600}
                  sizes="(max-width: 768px) 82vw, 470px"
                  className="block h-auto max-h-[86vh] w-auto max-w-[82vw] rounded-2xl object-contain sm:max-w-[470px]"
                />
              ))}
            </div>
          ) : (
            <Image
              src={project.image}
              alt={project.title}
              width={1800}
              height={1200}
              sizes="(max-width: 768px) 96vw, 1200px"
              className="block h-auto max-h-[88vh] w-auto max-w-[calc(100vw-1.75rem)] rounded-2xl object-contain sm:max-w-[calc(100vw-3rem)] lg:max-w-[1200px]"
            />
          )}
        </div>
      </div>
    </div>
  )
}

// ============================================================
// PROJECT CARD
// ============================================================

function ProjectCard({
  project,
  onOpen,
  index,
}: {
  project: Project
  onOpen: (project: Project) => void
  index: number
}) {
  return (
    <article
      style={{ animationDelay: `${index * 80}ms` }}
      className="project-archive-card group flex h-full flex-col overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.10)] transition-all duration-500 hover:-translate-y-[3px] hover:border-sky-300 hover:shadow-[0_24px_60px_rgba(14,165,233,0.18)]"
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="relative aspect-[16/10] overflow-hidden border-b border-slate-200 bg-slate-100 text-left"
      >
        <ProjectImage project={project} />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />

        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-sky-200 bg-sky-100/95 px-3 py-[6px] text-[10px] font-bold uppercase tracking-[0.14em] text-sky-700 shadow-sm backdrop-blur-md">
            {projectCategoryLabels[project.category]}
          </span>
        </div>

        <div className="absolute bottom-4 right-4 rounded-full border border-white/70 bg-slate-950/70 px-3 py-[6px] text-[11px] font-medium text-white opacity-0 shadow-sm backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
          Click to preview
        </div>
      </button>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="min-h-[58px] text-[18px] font-bold leading-[1.45] tracking-[-0.01em] text-slate-950 transition-colors duration-300 group-hover:text-sky-700">
          {project.title}
        </h3>

        <p className="mt-3 flex-1 text-[14px] leading-[1.8] text-slate-600">
          {project.description}
        </p>

        <div className="mt-6">
          <div className="mb-4 h-px bg-slate-200" />

          <div className="flex min-h-[36px] flex-wrap items-center justify-between gap-3">
            <Link
              href={getProjectPath(project)}
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-950 px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-700 hover:shadow-md"
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
                <ArrowUpRight size={14} />
              </a>
            ) : (
              <span className="h-[36px]" aria-hidden="true" />
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

// ============================================================
// PAGE
// ============================================================

export default function AllProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | "all">("all")

  const filteredProjects = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return projectsLatestFirst.filter((project) => {
      const matchesCategory = selectedCategory === "all" || project.category === selectedCategory
      const matchesSearch =
        !normalizedSearch ||
        [project.title, project.description, project.detailDescription, projectCategoryLabels[project.category]]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch)

      return matchesCategory && matchesSearch
    })
  }, [searchTerm, selectedCategory])


  return (
    <main className="relative min-h-screen overflow-x-hidden text-slate-950">
      <ArchiveBackground />

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-xl">
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
              Project Archive
            </h1>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-8 sm:px-8 lg:px-12">
        <section className="mb-6 animate-[fadeInUp_0.75s_ease-out_both] rounded-[28px] border border-slate-200 bg-white/90 p-5 shadow-[0_22px_70px_rgba(15,23,42,0.10)] backdrop-blur-xl md:p-7">
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-sky-700">Latest projects first</p>

            <div className="flex w-full items-center justify-between gap-4">
              <h2 className="min-w-0 text-2xl font-bold tracking-[-0.02em] text-slate-950 md:text-3xl">
                Project Collection
              </h2>

              <span className="shrink-0 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.12em] text-sky-700 sm:px-4">
                {filteredProjects.length} shown
              </span>
            </div>

            <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
              Newest items appear first, with filters for website, application, documentation, and video.
            </p>
          </div>
        </section>

        <section className="mb-8 animate-[fadeInUp_0.85s_ease-out_both] rounded-[24px] border border-slate-200 bg-white/90 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <div className="flex flex-col gap-4">
            <label className="relative flex min-h-[46px] w-full items-center">
              <Search className="pointer-events-none absolute left-4 h-4 w-4 text-slate-400" />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search project title, description, or category..."
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-800 shadow-sm outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              />
            </label>

            <div className="flex flex-wrap items-center gap-2">
              {projectCategoryOptions.map((option) => {
                const active = selectedCategory === option.value

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSelectedCategory(option.value)}
                    className={`rounded-full px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.08em] transition-all duration-300 sm:px-4 sm:text-[12px] ${
                      active
                        ? "border border-sky-500 bg-sky-500 text-white shadow-[0_10px_24px_rgba(14,165,233,0.24)]"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
                    }`}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {filteredProjects.length ? (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} index={index} />
            ))}
          </div>
        ) : (
          <div className="rounded-[26px] border border-dashed border-slate-300 bg-white/80 p-8 text-center text-slate-600 shadow-sm">
            No projects match the selected search and category.
          </div>
        )}
      </div>

      <ImageModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </main>
  )
}

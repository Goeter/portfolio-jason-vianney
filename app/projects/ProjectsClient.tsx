"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Search } from "lucide-react"

import ArchiveHeader from "../components/ArchiveHeader"
import Footer from "../components/Footer"
import {
  getProjectPath,
  projectCategoryLabels,
  projectsLatestFirst,
  type Project,
  type ProjectCategory,
} from "@/lib/site-content"

const archiveFilterOptions: { value: ProjectCategory | "all"; label: string }[] = [
  { value: "all", label: "All Projects" },
  { value: "website", label: "Website" },
  { value: "application", label: "Application" },
]

function ArchiveBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[radial-gradient(circle_at_16%_16%,rgba(14,165,233,0.24),transparent_30%),radial-gradient(circle_at_84%_24%,rgba(245,158,11,0.12),transparent_32%),radial-gradient(circle_at_50%_96%,rgba(34,211,238,0.10),transparent_34%),linear-gradient(135deg,#020617_0%,#07111f_46%,#0d1829_100%)]">
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

function ProjectCardImage({ project }: { project: Project }) {
  return (
    <Image
      src={project.image}
      alt={`${project.title} preview`}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
      className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.035]"
    />
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article
      style={{ animationDelay: `${index * 80}ms` }}
      className="project-archive-card group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-cyan-200/28 bg-[#0B1220]/95 shadow-[0_26px_70px_rgba(0,0,0,0.55),0_0_0_1px_rgba(103,232,249,0.10)] ring-1 ring-white/[0.06] backdrop-blur-md transition-all duration-500 ease-fluid hover:-translate-y-1 hover:border-cyan-200/65 hover:bg-[#0F1B2E]/98 hover:shadow-[0_30px_86px_rgba(14,165,233,0.25),0_0_0_1px_rgba(103,232,249,0.22)]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />
        <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-cyan-300/12 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-52 w-52 rounded-full bg-amber-300/10 blur-3xl" />
      </div>

      <div className="relative aspect-[16/10] overflow-hidden border-b border-cyan-200/18 bg-slate-950">
        <ProjectCardImage project={project} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/82 via-slate-950/12 to-transparent" />
        <span className="absolute bottom-3 left-3 z-20 rounded-full border border-cyan-200/45 bg-slate-950/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-cyan-100 shadow-[0_8px_20px_rgba(0,0,0,0.35)] backdrop-blur-md">
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
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-400/70 bg-cyan-400/14 px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] text-cyan-100 shadow-[0_10px_24px_rgba(14,165,233,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-400 hover:text-slate-950 hover:shadow-[0_14px_30px_rgba(6,182,212,0.26)]"
            >
              Visit
              <ArrowUpRight size={14} />
            </a>
          ) : (
            <span className="h-[34px]" aria-hidden="true" />
          )}
        </div>
      </div>
    </article>
  )
}

export default function AllProjects() {
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
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#020617] text-slate-50">
      <ArchiveBackground />
      <ArchiveHeader title="Project Archive" backHref="/#projects" />

      <main className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-5 pb-16 pt-8 sm:px-8 lg:px-12">
        <section className="mb-6 animate-[fadeInUp_0.75s_ease-out_both] rounded-[28px] border border-cyan-200/20 bg-slate-950/65 p-5 shadow-[0_22px_70px_rgba(0,0,0,0.34)] backdrop-blur-xl md:p-7">
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-200">
              Portfolio Work Library
            </p>

            <h1 className="min-w-0 bg-gradient-to-r from-slate-50 via-cyan-100 to-[#C8A96E] bg-clip-text pb-1 text-2xl font-bold leading-[1.16] tracking-[-0.02em] text-transparent md:text-3xl md:leading-[1.16]">
              Project Collection
            </h1>

            <p className="max-w-3xl text-sm leading-relaxed text-slate-300">
              Newest items appear first. Search by title, description, or category, then use the category filter to show Website or Application projects.
            </p>
          </div>
        </section>

        <section className="mb-8 animate-[fadeInUp_0.85s_ease-out_both] rounded-[24px] border border-cyan-200/18 bg-slate-950/60 p-4 shadow-[0_18px_45px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          <div className="flex flex-col gap-4">
            <label className="relative flex min-h-[46px] w-full items-center">
              <Search className="pointer-events-none absolute left-4 h-4 w-4 text-cyan-100/65" />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search project title, description, or category..."
                className="h-12 w-full rounded-2xl border border-cyan-200/18 bg-slate-950/80 pl-11 pr-4 text-sm text-slate-100 shadow-sm outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-cyan-300/65 focus:ring-4 focus:ring-cyan-300/10"
              />
            </label>

            <div className="rounded-2xl border border-cyan-200/14 bg-white/[0.035] p-3">
              <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.20em] text-cyan-100/90">
                    Filter Category
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">
                    Choose a category to narrow the project list. Available filters: Website and Application.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {archiveFilterOptions.map((option) => {
                  const active = selectedCategory === option.value

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setSelectedCategory(option.value)}
                      className={`rounded-full px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.08em] transition-all duration-300 sm:px-4 sm:text-[12px] ${
                        active
                          ? "border border-cyan-300 bg-cyan-300 text-slate-950 shadow-[0_10px_24px_rgba(14,165,233,0.24)]"
                          : "border border-cyan-200/18 bg-white/[0.06] text-slate-300 hover:border-cyan-300/55 hover:bg-cyan-300/12 hover:text-cyan-100"
                      }`}
                    >
                      {option.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </section>


        <div className="mb-4 flex animate-[fadeInUp_0.9s_ease-out_both] flex-wrap items-center justify-between gap-2">
          <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.12em] text-slate-300 sm:px-4">
            Sorted by Latest Upload
          </span>
          <span className="rounded-full border border-cyan-200/25 bg-cyan-300/12 px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.12em] text-cyan-100 sm:px-4">
            {filteredProjects.length} shown
          </span>
        </div>

        {filteredProjects.length ? (
          <section className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </section>
        ) : (
          <div className="rounded-[26px] border border-dashed border-cyan-300/35 bg-slate-950/65 p-8 text-center text-slate-300 shadow-sm backdrop-blur-xl">
            No projects match the selected search and category.
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

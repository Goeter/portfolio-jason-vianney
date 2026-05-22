"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ArrowUpRight, X } from "lucide-react"
import { projects, type Project } from "@/lib/site-content"

// ============================================================
// BATIK BACKGROUND
// ============================================================

function BatikBackground() {
  return (
    <svg
      className="absolute inset-0 h-full w-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="kraton-tech"
          x="0"
          y="0"
          width="72"
          height="72"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="36" cy="36" r="1.4" fill="#d4a843" />

          <circle
            cx="36"
            cy="36"
            r="10"
            fill="none"
            stroke="#d4a843"
            strokeWidth="0.4"
          />

          <circle
            cx="36"
            cy="36"
            r="20"
            fill="none"
            stroke="#4a7cbf"
            strokeWidth="0.28"
          />

          <line
            x1="36"
            y1="0"
            x2="36"
            y2="72"
            stroke="#4a7cbf"
            strokeWidth="0.18"
          />

          <line
            x1="0"
            y1="36"
            x2="72"
            y2="36"
            stroke="#4a7cbf"
            strokeWidth="0.18"
          />

          <polygon
            points="36,24 42,36 36,48 30,36"
            fill="none"
            stroke="#d4a843"
            strokeWidth="0.3"
          />
        </pattern>

        <linearGradient id="overlay" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#07091a" stopOpacity="0.22" />
          <stop offset="50%" stopColor="#07091a" stopOpacity="0" />
          <stop offset="100%" stopColor="#07091a" stopOpacity="0.72" />
        </linearGradient>
      </defs>

      <rect
        width="100%"
        height="100%"
        fill="url(#kraton-tech)"
        opacity="0.11"
      />

      <rect width="100%" height="100%" fill="url(#overlay)" />
    </svg>
  )
}

// ============================================================
// PROJECT IMAGE
// ============================================================

function ProjectImage({
  project,
}: {
  project: Project
}) {
  if (project.gallery) {
    return (
      <div className="flex h-full gap-[3px] bg-[#050816] p-[7px]">
        {project.gallery.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`${project.title} preview ${index + 1}`}
            width={120}
            height={240}
            sizes="(max-width: 768px) 33vw, 12vw"
            className="h-full w-1/3 rounded-lg object-cover"
          />
        ))}
      </div>
    )
  }

  return (
    <Image
      src={project.image}
      alt={project.title}
      width={600}
      height={400}
      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
      className="
        h-full w-full object-cover
        transition-transform duration-700
        group-hover:scale-105
      "
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

  return (
    <div
      className="
        fixed inset-0 z-[999]
        flex items-center justify-center
        bg-black/80
        backdrop-blur-md
        p-4
      "
    >
      <div
        className="
          relative w-full max-w-6xl
          overflow-hidden rounded-[30px]
          border border-[#1f2b47]
          bg-[#0a1020]
          shadow-[0_25px_80px_rgba(0,0,0,0.7)]
        "
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="
            absolute right-4 top-4 z-50
            flex h-11 w-11 items-center justify-center
            rounded-full
            border border-[#d4a84330]
            bg-[#0d1226]/90
            text-[#d4a843]
            transition-all duration-300
            hover:border-[#d4a84360]
            hover:bg-[#141b35]
          "
        >
          <X size={18} />
        </button>

        {/* Image */}
        <div
          className="
            max-h-[90vh]
            no-card-scrollbar overflow-auto
            bg-[#050816]
            p-4
          "
        >
          {project.gallery ? (
            <div className="no-card-scrollbar flex gap-3 overflow-x-auto">
              {project.gallery.map((src, index) => (
                <Image
                  key={src}
                  src={src}
                  alt={`${project.title} preview ${index + 1}`}
                  width={350}
                  height={700}
                  sizes="350px"
                  className="rounded-2xl object-contain"
                />
              ))}
            </div>
          ) : (
            <Image
              src={project.image}
              alt={project.title}
              width={1600}
              height={1000}
              sizes="90vw"
              className="
                h-auto max-h-[82vh]
                w-full rounded-2xl
                object-contain
              "
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
}: {
  project: Project
  onOpen: (project: Project) => void
}) {
  return (
    <article
      className="
        group flex h-full flex-col overflow-hidden rounded-[26px]
        border border-[#1e2a46]
        bg-[#0b1020]/95
        backdrop-blur-xl
        transition-all duration-500
        hover:-translate-y-[3px]
        hover:border-[#d4a84345]
        hover:shadow-[0_18px_45px_rgba(0,0,0,0.5)]
      "
    >
      {/* Thumbnail */}
      <button
        onClick={() => onOpen(project)}
        className="
          relative aspect-video overflow-hidden
          border-b border-[#1b2742]
          bg-[#060c18]
          text-left
        "
      >
        <ProjectImage project={project} />

        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-[#060816]
            via-transparent
            to-transparent
          "
        />

        <div
          className="
            absolute left-4 top-4
            rounded-md border border-[#d4a84325]
            bg-[#07091ab8]
            px-3 py-[5px]
            font-mono text-[10px]
            tracking-[0.18em]
            text-[#d4a8438a]
            backdrop-blur-md
          "
        >
          PROJECT #{project.id}
        </div>
      </button>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3
          className="
            min-h-[58px]
            text-[18px]
            font-medium
            leading-[1.45]
            text-[#d7ccb0]
          "
        >
          {project.title}
        </h3>

        <p
          className="
            mt-3 flex-1
            text-[14px]
            leading-[1.85]
            text-[#6d7f9f]
          "
        >
          {project.description}
        </p>

        <div className="mt-6">
          <div className="mb-4 h-px bg-[#1b2742]" />

          <div className="flex min-h-[22px] items-center">
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-2
                  text-[12px]
                  tracking-[0.12em]
                  text-[#4a8fd4]
                  transition-all duration-300
                  hover:text-[#7db4f0]
                "
              >
                VIEW WEBSITE
                <ArrowUpRight size={14} />
              </a>
            ) : (
              <span className="h-[18px]" />
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
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null)

  return (
    <main
      className="
        custom-scrollbar
        relative min-h-screen overflow-x-hidden
        bg-[#07091a]
      "
    >
      {/* Background */}
      <BatikBackground />

      {/* Glow */}
      <div
        className="
          absolute left-1/2 top-[-240px]
          h-[540px] w-[540px]
          -translate-x-1/2
          rounded-full blur-3xl
        "
        style={{
          background:
            "radial-gradient(circle, rgba(74,124,191,0.14), transparent 72%)",
        }}
      />

      {/* Navbar */}
      <header
        className="
          sticky top-0 z-50
          border-b border-[#141d33]
          bg-[#07091ad9]
          backdrop-blur-xl
        "
      >
        <div
          className="
            mx-auto flex h-[68px]
            w-full max-w-7xl
            items-center justify-between
            px-4 sm:px-8 lg:px-12
          "
        >
          {/* Left */}
          <div className="w-[80px] sm:w-[120px]">
            <Link
              href="/#projects"
              className="
                group inline-flex items-center gap-2
                rounded-full border border-[#d4a84325]
                bg-[#0d1226]
                px-3 py-[10px]
                text-[#d4a843]
                transition-all duration-300
                hover:border-[#d4a84355]
                hover:bg-[#111831]
              "
            >
              <ChevronLeft
                size={18}
                className="
                  transition-transform duration-300
                  group-hover:-translate-x-[2px]
                "
              />

              <span className="hidden text-[13px] sm:inline">
                Back
              </span>
            </Link>
          </div>

          {/* Center */}
          <div className="flex-1 text-center">
            <h1
              className="
                whitespace-nowrap
                font-serif text-[18px]
                font-medium tracking-[0.02em]
                text-[#d4a843]
                sm:text-[28px]
              "
            >
              Project Archive
            </h1>
          </div>

          {/* Spacer */}
          <div className="w-[80px] sm:w-[120px]" />
        </div>
      </header>

      {/* Content */}
      <div
        className="
          relative z-10 mx-auto
          w-full max-w-7xl
          px-5 pb-16 pt-8
          sm:px-8 lg:px-12
        "
      >
        <div
          className="
            grid grid-cols-1 gap-7
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <ImageModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Scrollbar */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(212, 168, 67, 0.58) transparent;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-track,
        .custom-scrollbar::-webkit-scrollbar-track-piece {
          background: transparent;
          border: 0;
          box-shadow: none;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          min-height: 48px;
          border: 2px solid transparent;
          background: rgba(212, 168, 67, 0.58);
          background-clip: content-box;
          border-radius: 999px;
          box-shadow: none;
          transition: background 0.3s ease;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 168, 67, 0.82);
          background-clip: content-box;
        }

        .custom-scrollbar::-webkit-scrollbar-corner {
          background: transparent;
        }

        body {
          background: #07091a;
        }
      `}</style>
    </main>
  )
}

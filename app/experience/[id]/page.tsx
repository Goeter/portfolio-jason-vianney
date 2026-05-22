"use client"

import { useMemo, useState } from "react"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { projects } from "@/lib/site-content"
import ImagePreviewDialog from "../../components/ImagePreviewDialog"

interface ExperienceDetailProps {
  params: {
    id: string
  }
}

export default function ExperienceDetail({ params }: ExperienceDetailProps) {
  const projectId = Number.parseInt(params.id, 10)

  if (Number.isNaN(projectId)) {
    notFound()
  }

  const project = projects.find((item) => item.id === projectId)

  if (!project) {
    notFound()
  }

  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const previewImages = useMemo(() => {
    const sources = project.gallery?.length ? project.gallery : [project.image]

    return sources.map((src, index) => ({
      src,
      alt: `${project.title} preview ${index + 1}`,
    }))
  }, [project])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#07091a] text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.18),transparent_32%),radial-gradient(circle_at_82%_22%,rgba(168,85,247,0.20),transparent_34%),radial-gradient(circle_at_50%_90%,rgba(212,168,67,0.14),transparent_38%),linear-gradient(135deg,#020617_0%,#07111f_45%,#111827_100%)]" />
      <div className="fixed inset-0 opacity-[0.12] bg-[linear-gradient(to_right,rgba(34,211,238,0.26)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,168,67,0.18)_1px,transparent_1px)] bg-[size:76px_76px]" />
      <div className="fixed left-[-8rem] top-24 h-80 w-80 rounded-full bg-cyan-400/20 blur-[130px]" />
      <div className="fixed right-[-8rem] bottom-20 h-96 w-96 rounded-full bg-purple-500/20 blur-[150px]" />

      <header className="relative z-10 border-b border-cyan-400/15 bg-slate-950/70 py-4 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <Link href="/#projects">
            <Button variant="ghost" size="sm" className="flex items-center gap-2 text-cyan-200 hover:bg-cyan-300/10 hover:text-white">
              <ChevronLeft className="h-5 w-5" />
              Back
            </Button>
          </Link>
        </div>
      </header>

      <main className="container relative z-10 mx-auto px-4 py-10">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Project Detail</p>
          <h1 className="mb-8 bg-gradient-to-r from-cyan-200 via-white to-[#d4a843] bg-clip-text text-3xl font-black leading-tight text-transparent md:text-5xl">
            {project.title}
          </h1>

          <div className="mb-8 overflow-hidden rounded-[28px] border border-cyan-400/15 bg-slate-950/70 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <button
              type="button"
              onClick={() => setIsPreviewOpen(true)}
              aria-label={`Preview ${project.title}`}
              className="group relative aspect-video w-full overflow-hidden rounded-[20px] bg-[#050816] text-left"
            >
              {project.gallery ? (
                <div className="flex h-full gap-3 p-4">
                  {project.gallery.map((src, index) => (
                    <Image
                      key={src}
                      src={src}
                      alt={`${project.title} screenshot ${index + 1}`}
                      width={320}
                      height={640}
                      sizes="(max-width: 768px) 33vw, 320px"
                      className="h-full w-1/3 rounded-2xl object-cover shadow-lg transition-transform duration-500 group-hover:scale-[1.02]"
                      priority={index === 0}
                    />
                  ))}
                </div>
              ) : (
                <Image
                  src={project.image}
                  alt={`${project.title} project screenshot`}
                  width={1200}
                  height={760}
                  sizes="(max-width: 1024px) 100vw, 960px"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  priority
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-4 right-4 rounded-full border border-white/20 bg-black/45 px-4 py-2 text-sm font-medium text-white/90 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                Click to preview
              </div>
            </button>
          </div>

          <article className="rounded-[28px] border border-cyan-400/15 bg-slate-950/70 p-6 text-lg leading-relaxed text-slate-300 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-8">
            {project.detailDescription}
          </article>
        </div>
      </main>

      <ImagePreviewDialog
        images={isPreviewOpen ? previewImages : null}
        title={project.title}
        onClose={() => setIsPreviewOpen(false)}
      />
    </div>
  )
}

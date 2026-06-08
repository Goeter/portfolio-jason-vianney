"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import type { TouchEvent } from "react"
import { Award, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { certificates, certificatesLatestFirst, type Certificate } from "@/lib/site-content"
import ImagePreviewDialog from "./ImagePreviewDialog"

const getCardsPerPage = () => {
  if (window.innerWidth < 768) return 1
  if (window.innerWidth < 1024) return 2
  return 3
}

function CertificatesBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[radial-gradient(circle_at_18%_18%,rgba(16,185,129,0.20),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(45,212,191,0.16),transparent_32%),radial-gradient(circle_at_50%_92%,rgba(200,169,110,0.10),transparent_34%),linear-gradient(135deg,#02110d_0%,#061a18_48%,#071524_100%)]">
      <div className="absolute inset-0 opacity-[0.09] bg-[linear-gradient(to_right,rgba(52,211,153,0.42)_1px,transparent_1px),linear-gradient(to_bottom,rgba(45,212,191,0.30)_1px,transparent_1px)] bg-[size:88px_88px]" />
      <div className="certificate-orb absolute -left-24 top-24 h-80 w-80 rounded-full bg-emerald-400/16 blur-[130px]" />
      <div className="certificate-orb-delay absolute -right-24 bottom-16 h-96 w-96 rounded-full bg-teal-300/14 blur-[150px]" />
      <div className="certificate-orb-slow absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C8A96E]/9 blur-[180px]" />
      <span className="certificate-line left-[10%] top-[28%]" />
      <span className="certificate-line certificate-line-delay right-[12%] top-[52%]" />
      <span className="certificate-line certificate-line-slow left-[46%] top-[75%]" />
      <div className="portfolio-light-sweep absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(16,185,129,0.070)_42%,transparent_68%)]" />
    </div>
  )
}

function CertificateCard({
  certificate,
  onPreview,
}: {
  certificate: Certificate
  onPreview: (image: string) => void
}) {
  return (
    <article className="group relative flex h-full min-w-0 flex-1 flex-col overflow-hidden rounded-[28px] border border-emerald-200/28 bg-[#071A16]/95 shadow-[0_26px_70px_rgba(0,0,0,0.55),0_0_0_1px_rgba(110,231,183,0.10)] ring-1 ring-white/[0.06] backdrop-blur-md transition-all duration-500 ease-fluid hover:-translate-y-1 hover:border-emerald-200/65 hover:bg-[#0A211C]/98 hover:shadow-[0_30px_86px_rgba(16,185,129,0.25),0_0_0_1px_rgba(110,231,183,0.22)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <button
        type="button"
        onClick={() => onPreview(certificate.image)}
        aria-label={`Preview ${certificate.title} certificate`}
        className="relative aspect-[16/10] w-full overflow-hidden border-b border-emerald-200/18 bg-slate-950 text-left"
      >
        <Image
          src={certificate.image || "/placeholder.svg"}
          alt={`${certificate.title} certificate`}
          width={500}
          height={320}
          sizes="(max-width: 768px) 88vw, (max-width: 1024px) 42vw, 30vw"
          className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.035]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/86 via-slate-950/18 to-transparent" />
        <div className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
          Click to preview
        </div>
      </button>

      <div className="relative flex flex-1 flex-col border-t border-white/[0.03] p-5">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200/35 bg-emerald-300/14 px-3 py-1 font-medium text-emerald-50">
            <Award className="h-3.5 w-3.5" />
            {certificate.issuer}
          </span>

          <span className="rounded-full border border-white/16 bg-white/[0.08] px-3 py-1 text-slate-200">
            {certificate.date}
          </span>
        </div>

        <h3 className="mb-3 text-lg font-bold leading-snug text-slate-50 transition group-hover:text-emerald-100">
          {certificate.title}
        </h3>

        <p className="flex-1 text-sm leading-relaxed text-slate-300/90">
          {certificate.description}
        </p>
      </div>
    </article>
  )
}

export default function CertificatesSection() {
  const [currentPage, setCurrentPage] = useState(0)
  const [cardsPerPage, setCardsPerPage] = useState(3)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchEndX, setTouchEndX] = useState<number | null>(null)

  const previewImages = useMemo(
    () =>
      selectedImage
        ? [
            {
              src: selectedImage,
              alt: "Certificate preview",
            },
          ]
        : null,
    [selectedImage]
  )

  useEffect(() => {
    let resizeFrame = 0

    const updateCardsPerPage = () => {
      cancelAnimationFrame(resizeFrame)
      resizeFrame = requestAnimationFrame(() => {
        setCardsPerPage((current) => {
          const next = getCardsPerPage()
          return current === next ? current : next
        })
      })
    }

    updateCardsPerPage()
    window.addEventListener("resize", updateCardsPerPage, { passive: true })

    return () => {
      cancelAnimationFrame(resizeFrame)
      window.removeEventListener("resize", updateCardsPerPage)
    }
  }, [])

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(certificatesLatestFirst.length / cardsPerPage)),
    [cardsPerPage]
  )

  const paginatedCertificates = useMemo(
    () =>
      Array.from({ length: totalPages }, (_, page) =>
        certificatesLatestFirst.slice(page * cardsPerPage, (page + 1) * cardsPerPage)
      ),
    [cardsPerPage, totalPages]
  )

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages - 1))
  }, [totalPages])

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
      id="certificates"
      className="section-transition-soft relative flex min-h-screen items-center overflow-hidden py-20 text-slate-50"
    >
      <CertificatesBackground />

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="mb-10 animate-[fadeInUp_0.8s_ease-out]">
          <div className="flex items-start justify-between gap-4">
            <h2 className="min-w-0 bg-gradient-to-r from-slate-50 via-emerald-100 to-[#C8A96E] bg-clip-text pb-1 text-4xl font-bold tracking-tight text-transparent md:text-5xl">
              Certificates
            </h2>

            <Link href="/certificates" className="mt-1 shrink-0 no-underline md:mt-2">
              <div className="group flex overflow-hidden rounded-[12px] border border-emerald-300/25 bg-slate-950/70 shadow-lg shadow-emerald-950/35 backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:border-emerald-300/55 hover:shadow-emerald-500/18">
                <div className="flex items-center justify-center gap-2 bg-white/7 px-3 py-[12px] text-[13px] font-semibold tracking-[0.02em] text-emerald-100 transition-colors duration-300 group-hover:bg-emerald-400 group-hover:text-slate-950 sm:px-5">
                  <span className="hidden sm:inline">View All</span>
                  <ExternalLink className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <div className="flex min-w-[52px] flex-col items-center justify-center bg-emerald-400 px-3 py-[8px] leading-none text-slate-950 sm:min-w-[64px] sm:px-4">
                  <span className="text-[18px] font-bold leading-none sm:text-[21px]">
                    {certificates.length}
                  </span>
                  <span className="mt-[3px] text-[8px] uppercase tracking-widest opacity-70 sm:text-[9px]">
                    Items
                  </span>
                </div>
              </div>
            </Link>
          </div>

          <p className="mt-3 w-full max-w-none text-sm leading-relaxed text-slate-300 md:max-w-4xl md:text-base lg:max-w-5xl">
            A complete collection of certifications and learning achievements that support my professional development journey.
          </p>
        </div>

        <div className="relative animate-[fadeInUp_1s_ease-out]">
          <button
            type="button"
            onClick={() => slide(-1)}
            disabled={currentPage === 0}
            aria-label="Previous certificates"
            className="absolute -left-2 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-300/25 bg-slate-950/80 text-emerald-100 shadow-xl backdrop-blur-xl transition hover:bg-emerald-400 hover:text-slate-950 disabled:cursor-default disabled:opacity-25 md:-left-5 sm:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => slide(1)}
            disabled={currentPage === totalPages - 1}
            aria-label="Next certificates"
            className="absolute -right-2 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-300/25 bg-slate-950/80 text-emerald-100 shadow-xl backdrop-blur-xl transition hover:bg-emerald-400 hover:text-slate-950 disabled:cursor-default disabled:opacity-25 md:-right-5 sm:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            className="overflow-hidden px-4 py-6 md:px-6"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex touch-pan-y select-none transition-transform duration-700 ease-fluid"
              style={{ transform: `translateX(-${currentPage * 100}%)` }}
            >
              {paginatedCertificates.map((pageCertificates, pageIndex) => (
                <div key={pageIndex} className="flex min-w-full items-stretch gap-5 px-1 py-2">
                  {pageCertificates.map((certificate) => (
                    <div key={certificate.id} className="min-w-0 flex-1">
                      <CertificateCard certificate={certificate} onPreview={setSelectedImage} />
                    </div>
                  ))}

                  {pageCertificates.length < cardsPerPage &&
                    Array.from({ length: cardsPerPage - pageCertificates.length }).map((_, index) => (
                      <div key={index} className="hidden min-w-0 flex-1 md:block" />
                    ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => slide(-1)}
              disabled={currentPage === 0}
              aria-label="Previous certificates"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-300/25 bg-slate-950/80 text-emerald-100 shadow-lg backdrop-blur-xl transition hover:bg-emerald-400 hover:text-slate-950 disabled:cursor-default disabled:opacity-25 sm:hidden"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, index) => {
                const active = currentPage === index

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentPage(index)}
                    aria-label={`Go to certificate page ${index + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      active ? "w-8 bg-emerald-300" : "w-2 bg-white/20 hover:bg-emerald-200/60"
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
              aria-label="Next certificates"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-300/25 bg-slate-950/80 text-emerald-100 shadow-lg backdrop-blur-xl transition hover:bg-emerald-400 hover:text-slate-950 disabled:cursor-default disabled:opacity-25 sm:hidden"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <ImagePreviewDialog
        images={previewImages}
        title="Certificate preview"
        onClose={() => setSelectedImage(null)}
      />
    </section>
  )
}

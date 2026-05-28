"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import type { TouchEvent } from "react"
import { Award, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { certificates, certificatesLatestFirst } from "@/lib/site-content"
import ImagePreviewDialog from "./ImagePreviewDialog"

const getCardsPerPage = () => {
  if (typeof window === "undefined") return 3
  if (window.innerWidth < 768) return 1
  if (window.innerWidth < 1024) return 2
  return 3
}

export default function CertificatesSection() {
  const [currentPage, setCurrentPage] = useState(0)
  const [cardsPerPage, setCardsPerPage] = useState(3)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

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
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchEndX, setTouchEndX] = useState<number | null>(null)

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

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages - 1))
  }, [totalPages])

  const slide = useCallback(
    (direction: number) => {
      setCurrentPage((page) => Math.max(0, Math.min(totalPages - 1, page + direction)))
    },
    [totalPages]
  )

  const paginatedCertificates = useMemo(
    () =>
      Array.from({ length: totalPages }, (_, page) =>
        certificatesLatestFirst.slice(page * cardsPerPage, (page + 1) * cardsPerPage)
      ),
    [cardsPerPage, totalPages]
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
      className="section-transition-soft section-transition-light relative flex min-h-screen items-center overflow-hidden py-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(134,239,172,0.34),transparent_32%),radial-gradient(circle_at_82%_20%,rgba(45,212,191,0.26),transparent_34%),linear-gradient(135deg,#ffffff_0%,#effdf5_48%,#ecfeff_100%)]" />

      <div className="certificate-orb absolute -left-24 top-24 h-80 w-80 rounded-full bg-emerald-300/30 blur-[130px]" />
      <div className="certificate-orb-delay absolute -right-24 bottom-16 h-96 w-96 rounded-full bg-teal-200/30 blur-[150px]" />
      <div className="certificate-orb-slow absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-200/25 blur-[180px]" />
      <span className="certificate-line left-[10%] top-[28%]" />
      <span className="certificate-line certificate-line-delay right-[12%] top-[52%]" />
      <div className="portfolio-light-sweep absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(16,185,129,0.095)_42%,transparent_68%)]" />

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="mb-10 animate-[fadeInUp_0.8s_ease-out]">
          <div className="flex items-start justify-between gap-4">
            <h2 className="min-w-0 bg-gradient-to-r from-slate-950 via-emerald-700 to-teal-500 bg-clip-text pb-1 text-4xl font-bold tracking-tight text-transparent md:text-5xl">
              Certificates
            </h2>

            <Link href="/certificates" className="mt-1 shrink-0 no-underline md:mt-2">
              <div className="group flex overflow-hidden rounded-[12px] border border-emerald-200 bg-white shadow-lg shadow-emerald-200/40 backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:border-emerald-400 hover:shadow-emerald-300/50">
                <div className="flex items-center justify-center gap-2 bg-white px-3 py-[12px] text-[13px] font-semibold tracking-[0.02em] text-emerald-700 transition-colors duration-300 group-hover:bg-emerald-500 group-hover:text-white sm:px-5">
                  <span className="hidden sm:inline">View All</span>
                  <ExternalLink className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <div className="flex min-w-[52px] flex-col items-center justify-center bg-emerald-500 px-3 py-[8px] leading-none text-white sm:min-w-[64px] sm:px-4">
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

          <p className="mt-3 w-full max-w-none text-sm leading-relaxed text-slate-600 md:max-w-4xl md:text-base lg:max-w-5xl">
            A complete collection of certifications and learning achievements that support my professional development journey.
          </p>
        </div>

        <div className="relative animate-[fadeInUp_1s_ease-out]">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => slide(-1)}
            disabled={currentPage === 0}
            aria-label="Previous certificates"
            className="absolute -left-2 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 rounded-full border-emerald-200 bg-white text-emerald-700 shadow-xl backdrop-blur-md transition hover:bg-emerald-500 hover:text-white disabled:cursor-default disabled:opacity-25 md:-left-5 sm:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => slide(1)}
            disabled={currentPage === totalPages - 1}
            aria-label="Next certificates"
            className="absolute -right-2 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 rounded-full border-emerald-200 bg-white text-emerald-700 shadow-xl backdrop-blur-md transition hover:bg-emerald-500 hover:text-white disabled:cursor-default disabled:opacity-25 md:-right-5 sm:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          <div
            className="overflow-hidden px-4 md:px-6"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex touch-pan-y select-none transition-transform duration-700 ease-fluid"
              style={{ transform: `translateX(-${currentPage * 100}%)` }}
            >
              {paginatedCertificates.map((pageCertificates, pageIndex) => {
                return (
                  <div key={pageIndex} className="flex min-w-full items-stretch gap-5 px-1 pb-4">
                    {pageCertificates.map((certificate) => (
                      <div key={certificate.id} className="min-w-0 flex-1">
                        <Card className="group h-full overflow-hidden rounded-3xl border border-emerald-200 bg-white shadow-[0_18px_45px_rgba(15,118,110,0.10)] backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-[0_24px_60px_rgba(16,185,129,0.18)]">
                          <CardContent className="flex h-full flex-col p-0">
                            <button
                              type="button"
                              onClick={() => setSelectedImage(certificate.image)}
                              aria-label={`Preview ${certificate.title} certificate`}
                              className="relative aspect-[16/10] w-full overflow-hidden border-b border-slate-200 bg-slate-100 text-left"
                            >
                              <Image
                                src={certificate.image || "/placeholder.svg"}
                                alt={`${certificate.title} certificate`}
                                width={500}
                                height={320}
                                sizes="(max-width: 768px) 88vw, (max-width: 1024px) 42vw, 30vw"
                                className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
                              />

                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent opacity-80" />

                              <div className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                                Click to preview
                              </div>
                            </button>

                            <div className="flex flex-1 flex-col border-t border-emerald-100 bg-white p-5">
                              <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
                                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-medium text-emerald-700">
                                  <Award className="h-3.5 w-3.5" />
                                  {certificate.issuer}
                                </span>

                                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-600">
                                  {certificate.date}
                                </span>
                              </div>

                              <h3 className="mb-3 text-lg font-bold leading-snug text-slate-950 transition group-hover:text-emerald-700">
                                {certificate.title}
                              </h3>

                              <p className="flex-1 text-sm leading-relaxed text-slate-600">
                                {certificate.description}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ))}

                    {pageCertificates.length < cardsPerPage &&
                      Array.from({ length: cardsPerPage - pageCertificates.length }).map((_, index) => (
                        <div key={index} className="hidden min-w-0 flex-1 md:block" />
                      ))}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-7 flex items-center justify-center gap-4">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => slide(-1)}
              disabled={currentPage === 0}
              aria-label="Previous certificates"
              className="h-9 w-9 rounded-full border-emerald-200 bg-white text-emerald-700 shadow-lg backdrop-blur-md transition hover:bg-emerald-500 hover:text-white disabled:cursor-default disabled:opacity-25 sm:hidden"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

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
                      active ? "w-8 bg-emerald-500" : "w-2 bg-emerald-200 hover:bg-emerald-300"
                    }`}
                  />
                )
              })}

              <span className="ml-1 min-w-8 font-mono text-[11px] text-slate-500">
                {currentPage + 1}/{totalPages}
              </span>
            </div>

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => slide(1)}
              disabled={currentPage === totalPages - 1}
              aria-label="Next certificates"
              className="h-9 w-9 rounded-full border-emerald-200 bg-white text-emerald-700 shadow-lg backdrop-blur-md transition hover:bg-emerald-500 hover:text-white disabled:cursor-default disabled:opacity-25 sm:hidden"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
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

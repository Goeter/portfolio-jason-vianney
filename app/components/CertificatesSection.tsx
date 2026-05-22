"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import type { TouchEvent } from "react"
import { Award, ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { certificates, certificatesLatestFirst } from "@/lib/site-content"

const getCardsPerPage = () => {
  if (window.innerWidth < 768) return 1
  if (window.innerWidth < 1024) return 2
  return 3
}

export default function CertificatesSection() {
  const [currentPage, setCurrentPage] = useState(0)
  const [cardsPerPage, setCardsPerPage] = useState(3)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchEndX, setTouchEndX] = useState<number | null>(null)

  useEffect(() => {
    const updateCardsPerPage = () => setCardsPerPage(getCardsPerPage())

    updateCardsPerPage()
    window.addEventListener("resize", updateCardsPerPage)

    return () => window.removeEventListener("resize", updateCardsPerPage)
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

  const getPageCertificates = useCallback(
    (page: number) => certificatesLatestFirst.slice(page * cardsPerPage, (page + 1) * cardsPerPage),
    [cardsPerPage]
  )

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    setTouchEndX(null)
    setTouchStartX(event.targetTouches[0].clientX)
  }

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    setTouchEndX(event.targetTouches[0].clientX)
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
      className="section-transition-soft relative flex min-h-screen items-center overflow-hidden py-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(34,197,94,0.22),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(45,212,191,0.18),transparent_32%),radial-gradient(circle_at_48%_88%,rgba(16,185,129,0.16),transparent_34%),linear-gradient(135deg,#020617_0%,#05231c_44%,#062c2c_100%)]" />

      <div className="absolute inset-0 opacity-[0.11]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(34,197,94,0.28)_1px,transparent_1px),linear-gradient(to_bottom,rgba(45,212,191,0.22)_1px,transparent_1px)] bg-[size:84px_84px]" />
      </div>

      <div className="absolute inset-0 opacity-[0.12]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(134,239,172,0.32)_1px,transparent_1.5px)] bg-[size:34px_34px]" />
      </div>

      <div className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-green-500/16 blur-[130px]" />
      <div className="absolute -right-24 bottom-16 h-96 w-96 rounded-full bg-teal-400/16 blur-[150px]" />
      <div className="absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/8 blur-[180px]" />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(34,197,94,0.055)_42%,transparent_68%)]" />

      {selectedImage && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative flex items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative rounded-2xl border border-white/15 bg-slate-950/85 p-3 shadow-2xl shadow-black/60 backdrop-blur-xl">
              <button
                type="button"
                className="absolute right-3 top-3 z-20 rounded-full border border-white/20 bg-slate-900/90 p-2 text-white transition hover:bg-slate-800"
                onClick={() => setSelectedImage(null)}
                aria-label="Close certificate preview"
              >
                <X className="h-5 w-5" />
              </button>

              <Image
                src={selectedImage}
                alt="Certificate Detail"
                width={1000}
                height={700}
                sizes="88vw"
                className="max-h-[72vh] w-auto max-w-[88vw] rounded-xl object-contain"
              />
            </div>
          </div>
        </div>
      )}

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="mb-10 animate-[fadeInUp_0.8s_ease-out]">
          <div className="flex items-start justify-between gap-4">
            <h2 className="min-w-0 bg-gradient-to-r from-white via-green-100 to-emerald-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
              Certificates
            </h2>

            <Link href="/certificates" className="mt-1 shrink-0 no-underline md:mt-2">
              <div className="group flex overflow-hidden rounded-[12px] border border-green-300/30 bg-slate-950/70 shadow-lg shadow-green-500/10 backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:border-green-300/60 hover:shadow-green-500/20">
                <div className="flex items-center justify-center gap-2 bg-slate-950/60 px-3 py-[12px] text-[13px] font-semibold tracking-[0.02em] text-green-200 transition-colors duration-300 group-hover:bg-green-400 group-hover:text-slate-950 sm:px-5">
                  <span className="hidden sm:inline">View All</span>
                  <ExternalLink className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <div className="flex min-w-[52px] flex-col items-center justify-center bg-green-400 px-3 py-[8px] leading-none text-slate-950 sm:min-w-[64px] sm:px-4">
                  <span className="text-[18px] font-bold leading-none sm:text-[21px]">
                    {certificates.length}
                  </span>

                  <span className="mt-[3px] text-[8px] uppercase tracking-widest opacity-70 sm:text-[9px]">
                    Certif
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
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => slide(-1)}
            disabled={currentPage === 0}
            aria-label="Previous certificates"
            className="absolute -left-2 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 rounded-full border-green-400/30 bg-slate-950/80 text-green-300 shadow-xl backdrop-blur-md transition hover:bg-green-500 hover:text-white disabled:cursor-default disabled:opacity-25 md:-left-5 sm:flex"
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
            className="absolute -right-2 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 rounded-full border-green-400/30 bg-slate-950/80 text-green-300 shadow-xl backdrop-blur-md transition hover:bg-green-500 hover:text-white disabled:cursor-default disabled:opacity-25 md:-right-5 sm:flex"
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
              className="flex touch-pan-y select-none transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: `translateX(-${currentPage * 100}%)` }}
            >
              {Array.from({ length: totalPages }).map((_, pageIndex) => {
                const pageCertificates = getPageCertificates(pageIndex)

                return (
                  <div key={pageIndex} className="flex min-w-full items-stretch gap-5 px-1 pb-4">
                    {pageCertificates.map((certificate) => (
                      <div key={certificate.id} className="min-w-0 flex-1">
                        <Card className="group h-full overflow-hidden rounded-3xl border border-green-400/20 bg-slate-950/58 shadow-xl shadow-black/30 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-green-300/50 hover:shadow-green-500/20">
                          <CardContent className="flex h-full flex-col p-0">
                            <button
                              type="button"
                              onClick={() => setSelectedImage(certificate.image)}
                              className="relative aspect-video w-full overflow-hidden bg-slate-900 text-left"
                            >
                              <Image
                                src={certificate.image || "/placeholder.svg"}
                                alt={`${certificate.title} certificate`}
                                width={500}
                                height={320}
                                sizes="(max-width: 768px) 88vw, (max-width: 1024px) 42vw, 30vw"
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                              />

                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent opacity-80" />

                              <div className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                                Click to preview
                              </div>
                            </button>

                            <div className="flex flex-1 flex-col p-5">
                              <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
                                <span className="inline-flex items-center gap-1 rounded-full border border-green-400/25 bg-green-400/10 px-3 py-1 font-medium text-green-300">
                                  <Award className="h-3.5 w-3.5" />
                                  {certificate.issuer}
                                </span>

                                <span className="rounded-full border border-slate-500/30 bg-white/5 px-3 py-1 text-slate-300">
                                  {certificate.date}
                                </span>
                              </div>

                              <h3 className="mb-3 text-lg font-bold leading-snug text-white transition group-hover:text-green-200">
                                {certificate.title}
                              </h3>

                              <p className="flex-1 text-sm leading-relaxed text-slate-300">
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
              className="h-9 w-9 rounded-full border-green-400/30 bg-slate-950/80 text-green-300 shadow-lg backdrop-blur-md transition hover:bg-green-500 hover:text-white disabled:cursor-default disabled:opacity-25 sm:hidden"
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
                      active ? "w-8 bg-green-400" : "w-2 bg-slate-500 hover:bg-slate-300"
                    }`}
                  />
                )
              })}

              <span className="ml-1 min-w-8 font-mono text-[11px] text-slate-400">
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
              className="h-9 w-9 rounded-full border-green-400/30 bg-slate-950/80 text-green-300 shadow-lg backdrop-blur-md transition hover:bg-green-500 hover:text-white disabled:cursor-default disabled:opacity-25 sm:hidden"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}

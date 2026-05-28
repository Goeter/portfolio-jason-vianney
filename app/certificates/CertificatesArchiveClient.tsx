"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Award, CalendarDays, ChevronLeft, Eye, GraduationCap, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { certificatesLatestFirst, type Certificate } from "@/lib/site-content"
import ImagePreviewDialog from "../components/ImagePreviewDialog"

export default function CertificatesArchiveClient() {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCertificates = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    if (!normalizedSearch) return certificatesLatestFirst

    return certificatesLatestFirst.filter((certificate) =>
      [certificate.title, certificate.description, certificate.issuer, certificate.date]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch)
    )
  }, [searchTerm])

  const previewImages = useMemo(() => {
    if (!selectedCertificate) return null

    return [
      {
        src: selectedCertificate.image,
        alt: `${selectedCertificate.title} certificate preview`,
      },
    ]
  }, [selectedCertificate])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-emerald-50 text-slate-950">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(134,239,172,0.34),transparent_32%),radial-gradient(circle_at_84%_24%,rgba(45,212,191,0.26),transparent_34%),linear-gradient(135deg,#ffffff_0%,#effdf5_48%,#ecfeff_100%)]" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="certificate-orb absolute -left-24 top-24 h-80 w-80 rounded-full bg-emerald-300/30 blur-[130px]" />
        <div className="certificate-orb-delay absolute -right-28 bottom-20 h-96 w-96 rounded-full bg-teal-200/30 blur-[150px]" />
        <div className="certificate-orb-slow absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-200/25 blur-[170px]" />
        <span className="certificate-line left-[12%] top-[22%]" />
        <span className="certificate-line certificate-line-delay left-[74%] top-[34%]" />
        <span className="certificate-line certificate-line-slow left-[44%] top-[78%]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black shadow-[0_12px_45px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="container relative mx-auto flex h-[68px] max-w-6xl items-center px-4">
          <Link href="/#certificates" className="relative z-10 shrink-0">
            <Button className="group rounded-full border border-white/10 bg-zinc-950 px-4 py-5 text-sm font-semibold text-zinc-100 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-x-1 hover:border-white hover:bg-white hover:text-black">
              <ChevronLeft className="h-5 w-5 transition group-hover:-translate-x-1 sm:mr-2" />
              <span className="hidden text-[13px] sm:inline">Back</span>
            </Button>
          </Link>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-24 text-center">
            <p className="truncate text-[11px] font-semibold uppercase tracking-[0.28em] text-white">
              Certificate Archive
            </p>
          </div>
        </div>
      </header>

      <main className="container relative z-10 mx-auto max-w-6xl px-4 py-12 md:py-16">
        <section className="mb-8 overflow-hidden rounded-[28px] border border-emerald-200 bg-white/90 p-5 shadow-[0_22px_70px_rgba(15,118,110,0.12)] backdrop-blur-xl md:p-7">
          <div className="flex flex-col gap-3">
            <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-700 sm:text-[10px]">
              <GraduationCap className="h-3.5 w-3.5" />
              Professional Learning Record
            </div>

            <div className="flex w-full items-center justify-between gap-4">
              <h1 className="min-w-0 text-2xl font-bold tracking-[-0.02em] text-slate-950 md:text-3xl">
                Certificates
              </h1>

              <span className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.12em] text-emerald-700 sm:px-4">
                {filteredCertificates.length} shown
              </span>
            </div>

            <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
              A complete collection of certifications and learning achievements that support my professional development journey.
            </p>
          </div>
        </section>

        <section className="mb-8 rounded-[24px] border border-emerald-200 bg-white/90 p-4 shadow-[0_18px_45px_rgba(15,118,110,0.10)] backdrop-blur-xl">
          <label className="relative flex min-h-[46px] w-full items-center">
            <Search className="pointer-events-none absolute left-4 h-4 w-4 text-slate-400" />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search certificate title, issuer, description, or date..."
              className="h-12 w-full rounded-2xl border border-emerald-200 bg-white pl-11 pr-4 text-sm text-slate-800 shadow-sm outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
            />
          </label>
        </section>

        {filteredCertificates.length ? (
          <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCertificates.map((certificate, index) => (
              <Card
                key={certificate.id}
                id={`certificate-${certificate.id}`}
                className="group certificate-card h-full overflow-hidden rounded-3xl border border-emerald-200 bg-white shadow-[0_18px_45px_rgba(15,118,110,0.10)] backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-[0_24px_60px_rgba(16,185,129,0.18)]"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <CardContent className="flex h-full flex-col p-0">
                  <button
                    type="button"
                    onClick={() => setSelectedCertificate(certificate)}
                    aria-label={`Preview ${certificate.title}`}
                    className="relative aspect-[16/10] w-full flex-shrink-0 overflow-hidden border-b border-slate-200 bg-slate-100 text-left"
                  >
                    <Image
                      src={certificate.image || "/placeholder.svg"}
                      alt={`${certificate.title} certificate`}
                      width={500}
                      height={320}
                      sizes="(max-width: 768px) 92vw, (max-width: 1024px) 45vw, 30vw"
                      className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent opacity-80" />

                    <div className="absolute left-3 top-3 rounded-full border border-white/70 bg-emerald-600/90 p-2 text-white shadow-sm backdrop-blur-md">
                      <Award className="h-4 w-4" />
                    </div>

                    <div className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs font-medium text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                      <Eye className="h-3.5 w-3.5" />
                      Preview
                    </div>
                  </button>

                  <div className="flex flex-grow flex-col border-t border-emerald-100 bg-white p-5">
                    <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-medium text-emerald-700">
                        <Award className="h-3.5 w-3.5" />
                        {certificate.issuer}
                      </span>

                      <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-600">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {certificate.date}
                      </span>
                    </div>

                    <h2 className="mb-3 text-lg font-bold leading-snug text-slate-950 transition group-hover:text-emerald-700">
                      {certificate.title}
                    </h2>

                    <p className="flex-1 text-sm leading-relaxed text-slate-600">
                      {certificate.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>
        ) : (
          <div className="rounded-[26px] border border-dashed border-emerald-300 bg-white/80 p-8 text-center text-slate-600 shadow-sm backdrop-blur-xl">
            No certificates match the selected search.
          </div>
        )}
      </main>

      <ImagePreviewDialog
        images={previewImages}
        title={selectedCertificate?.title}
        onClose={() => setSelectedCertificate(null)}
      />
    </div>
  )
}

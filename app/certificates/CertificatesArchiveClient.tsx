"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Award, Eye, GraduationCap, Search } from "lucide-react"

import ArchiveHeader from "../components/ArchiveHeader"
import Footer from "../components/Footer"
import ImagePreviewDialog from "../components/ImagePreviewDialog"
import { certificatesLatestFirst, type Certificate } from "@/lib/site-content"
import { BLUR_DATA_URL } from "@/lib/utils"

function ArchiveBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[radial-gradient(circle_at_20%_15%,rgba(20,184,166,0.20),transparent_32%),radial-gradient(circle_at_84%_24%,rgba(45,212,191,0.15),transparent_32%),radial-gradient(circle_at_50%_90%,rgba(251,191,36,0.07),transparent_36%),linear-gradient(135deg,#04130f_0%,#061a16_46%,#071f1a_100%)]">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="archCertLeaf" width="72" height="72" patternUnits="userSpaceOnUse">
            <path d="M36 10 Q48 22 36 36 Q24 22 36 10" fill="none" stroke="#2dd4bf" strokeWidth="0.5" opacity="0.16" />
            <path d="M62 36 Q50 48 36 36 Q50 24 62 36" fill="none" stroke="#5eead4" strokeWidth="0.5" opacity="0.14" />
            <path d="M36 62 Q24 50 36 36 Q48 50 36 62" fill="none" stroke="#2dd4bf" strokeWidth="0.5" opacity="0.14" />
            <path d="M10 36 Q22 24 36 36 Q22 48 10 36" fill="none" stroke="#5eead4" strokeWidth="0.5" opacity="0.14" />
            <circle cx="36" cy="36" r="3" fill="none" stroke="#2dd4bf" strokeWidth="0.45" opacity="0.16" />
            <circle cx="36" cy="36" r="1.2" fill="#5eead4" opacity="0.12" />
          </pattern>
          <radialGradient id="archCertGlowL" cx="15%" cy="18%" r="44%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="archCertGlowR" cx="85%" cy="78%" r="40%">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1440" height="900" fill="url(#archCertLeaf)" />
        <rect width="1440" height="900" fill="url(#archCertGlowL)" />
        <rect width="1440" height="900" fill="url(#archCertGlowR)" />
        <path d="M0 180 Q100 160 200 190 Q260 205 320 182" stroke="#2dd4bf" strokeWidth="0.4" opacity="0.22" fill="none" />
        <circle cx="200" cy="190" r="2.5" fill="#2dd4bf" opacity="0.28" />
        <path d="M1100 720 Q1200 695 1300 730 Q1360 742 1440 718" stroke="#5eead4" strokeWidth="0.4" opacity="0.18" fill="none" />
        <circle cx="1300" cy="730" r="2.5" fill="#5eead4" opacity="0.24" />
        <path d="M600 50 Q680 35 760 55 Q800 65 840 48" stroke="#2dd4bf" strokeWidth="0.35" opacity="0.15" fill="none" />
        <circle cx="760" cy="55" r="2" fill="#2dd4bf" opacity="0.20" />
      </svg>
      <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,rgba(20,184,166,0.42)_1px,transparent_1px),linear-gradient(to_bottom,rgba(45,212,191,0.28)_1px,transparent_1px)] bg-[size:88px_88px]" />
      <div className="certificate-orb absolute -left-24 top-24 h-80 w-80 rounded-full bg-teal-500/16 blur-[130px]" />
      <div className="certificate-orb-delay absolute -right-24 bottom-16 h-96 w-96 rounded-full bg-emerald-400/14 blur-[150px]" />
      <div className="certificate-orb-slow absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-300/8 blur-[180px]" />
      <span className="certificate-line left-[10%] top-[28%]" />
      <span className="certificate-line certificate-line-delay right-[12%] top-[52%]" />
      <span className="certificate-line certificate-line-slow left-[46%] top-[75%]" />
      <div className="portfolio-light-sweep absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(20,184,166,0.065)_42%,transparent_68%)]" />
    </div>
  )
}

function CertificateCard({
  certificate,
  index,
  onPreview,
}: {
  certificate: Certificate
  index: number
  onPreview: (certificate: Certificate) => void
}) {
  return (
    <article
      id={`certificate-${certificate.id}`}
      style={{ animationDelay: `${index * 120}ms` }}
      className="certificate-card group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-teal-200/28 bg-[#04130f]/95 shadow-[0_26px_70px_rgba(0,0,0,0.55),0_0_0_1px_rgba(45,212,191,0.10)] ring-1 ring-white/[0.06] backdrop-blur-md transition-all duration-500 ease-fluid hover:-translate-y-1 hover:border-teal-200/65 hover:bg-[#061a16]/98 hover:shadow-[0_30px_86px_rgba(20,184,166,0.25),0_0_0_1px_rgba(45,212,191,0.22)]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-300/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <button
        type="button"
        onClick={() => onPreview(certificate)}
        aria-label={`Preview ${certificate.title}`}
        className="relative aspect-[16/10] w-full flex-shrink-0 overflow-hidden border-b border-teal-200/18 bg-slate-950 text-left"
      >
        <Image
          src={certificate.image || "/placeholder.svg"}
          alt={`${certificate.title} certificate`}
          width={500}
          height={320}
          sizes="(max-width: 768px) 92vw, (max-width: 1024px) 45vw, 30vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.035]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/86 via-slate-950/18 to-transparent" />

        <div className="absolute left-3 top-3 rounded-full border border-white/25 bg-teal-400/20 p-2 text-teal-50 shadow-sm backdrop-blur-md">
          <Award className="h-4 w-4" />
        </div>

        <div className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs font-medium text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
          <Eye className="h-3.5 w-3.5" />
          Preview
        </div>
      </button>

      <div className="relative flex flex-1 flex-col border-t border-white/[0.03] p-5">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 rounded-full border border-teal-200/35 bg-teal-300/14 px-3 py-1 font-medium text-teal-50">
            <Award className="h-3.5 w-3.5" />
            {certificate.issuer}
          </span>
        </div>

        <h2 className="mb-3 text-lg font-bold leading-snug text-slate-50 transition group-hover:text-teal-100">
          {certificate.title}
        </h2>

        <p className="flex-1 text-sm leading-relaxed text-slate-300/90">
          {certificate.description}
        </p>
      </div>
    </article>
  )
}

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
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#04130f] text-slate-50">
      <ArchiveBackground />
      <ArchiveHeader title="Certificate Archive" backHref="/#certificates" />

      <main className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-5 py-12 sm:px-8 md:py-16 lg:px-12">
        <section className="mb-8 animate-[fadeInUp_0.75s_ease-out_both] rounded-[28px] border border-teal-200/20 bg-slate-950/58 p-5 shadow-[0_22px_70px_rgba(0,0,0,0.34)] backdrop-blur-xl md:p-7">
          <div className="flex flex-col gap-3">
            <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-teal-200/25 bg-teal-300/12 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-teal-100 sm:text-[10px]">
              <GraduationCap className="h-3.5 w-3.5" />
              Professional Learning Record
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="min-w-0 bg-gradient-to-r from-slate-50 via-teal-100 to-[#C8A96E] bg-clip-text text-2xl font-bold tracking-[-0.02em] text-transparent md:text-3xl">
                Certificates
              </h1>

              <span className="w-fit shrink-0 rounded-full border border-teal-200/25 bg-teal-300/12 px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.12em] text-teal-100 sm:px-4">
                {filteredCertificates.length} shown
              </span>
            </div>

            <p className="max-w-4xl text-sm leading-relaxed text-slate-300">
              A complete collection of certifications and learning achievements that support my professional development journey.
            </p>
          </div>
        </section>

        <section className="mb-8 animate-[fadeInUp_0.85s_ease-out_both] rounded-[24px] border border-teal-200/18 bg-slate-950/58 p-4 shadow-[0_18px_45px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          <label className="relative flex min-h-[46px] w-full items-center">
            <Search className="pointer-events-none absolute left-4 h-4 w-4 text-teal-100/65" />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search certificate title, issuer, description, or date..."
              className="h-12 w-full rounded-2xl border border-teal-200/18 bg-slate-950/80 pl-11 pr-4 text-sm text-slate-100 shadow-sm outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-teal-300/65 focus:ring-4 focus:ring-teal-300/10"
            />
          </label>
        </section>

        {filteredCertificates.length ? (
          <section className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
            {filteredCertificates.map((certificate, index) => (
              <CertificateCard
                key={certificate.id}
                certificate={certificate}
                index={index}
                onPreview={setSelectedCertificate}
              />
            ))}
          </section>
        ) : (
          <div className="rounded-[26px] border border-dashed border-teal-300/35 bg-slate-950/65 p-8 text-center text-slate-300 shadow-sm backdrop-blur-xl">
            No certificates match the selected search.
          </div>
        )}
      </main>

      <Footer />

      <ImagePreviewDialog
        images={previewImages}
        title={selectedCertificate?.title}
        onClose={() => setSelectedCertificate(null)}
      />
    </div>
  )
}

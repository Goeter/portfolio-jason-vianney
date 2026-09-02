"use client"

import { useMemo, useState } from "react"
import { Award, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { certificates, certificatesLatestFirst, type Certificate } from "@/lib/site-content"
import { BLUR_DATA_URL } from "@/lib/utils"
import ImagePreviewDialog from "./ImagePreviewDialog"
import { motion } from "framer-motion"
import { useScrollReveal } from "@/hooks/useScrollReveal"
import { useParallax } from "@/hooks/useParallax"

function CertificatesBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[radial-gradient(circle_at_20%_15%,rgba(180,148,90,0.18),transparent_32%),radial-gradient(circle_at_82%_22%,rgba(200,169,110,0.14),transparent_30%),radial-gradient(circle_at_50%_90%,rgba(200,169,110,0.07),transparent_36%),linear-gradient(135deg,#020617_0%,#060d1c_46%,#060d1c_100%)]">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="certLeaf" width="72" height="72" patternUnits="userSpaceOnUse">
            <path d="M36 10 Q48 22 36 36 Q24 22 36 10" fill="none" stroke="#2dd4bf" strokeWidth="0.5" opacity="0.16" />
            <path d="M62 36 Q50 48 36 36 Q50 24 62 36" fill="none" stroke="#5eead4" strokeWidth="0.5" opacity="0.14" />
            <path d="M36 62 Q24 50 36 36 Q48 50 36 62" fill="none" stroke="#2dd4bf" strokeWidth="0.5" opacity="0.14" />
            <path d="M10 36 Q22 24 36 36 Q22 48 10 36" fill="none" stroke="#5eead4" strokeWidth="0.5" opacity="0.14" />
            <circle cx="36" cy="36" r="3" fill="none" stroke="#2dd4bf" strokeWidth="0.45" opacity="0.16" />
            <circle cx="36" cy="36" r="1.2" fill="#5eead4" opacity="0.12" />
          </pattern>
          <radialGradient id="certGlowL" cx="18%" cy="20%" r="42%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="certGlowR" cx="82%" cy="75%" r="38%">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1440" height="900" fill="url(#certLeaf)" />
        <rect width="1440" height="900" fill="url(#certGlowL)" />
        <rect width="1440" height="900" fill="url(#certGlowR)" />
        <path d="M0 220 Q90 195 180 225 Q220 240 260 215" stroke="#2dd4bf" strokeWidth="0.4" opacity="0.20" fill="none" />
        <circle cx="180" cy="225" r="2.5" fill="#2dd4bf" opacity="0.26" />
        <path d="M1180 680 Q1270 655 1360 690 Q1400 700 1440 680" stroke="#5eead4" strokeWidth="0.4" opacity="0.18" fill="none" />
        <circle cx="1360" cy="690" r="2.5" fill="#5eead4" opacity="0.24" />
      </svg>
      <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,rgba(180,148,90,0.42)_1px,transparent_1px),linear-gradient(to_bottom,rgba(200,169,110,0.28)_1px,transparent_1px)] bg-[size:88px_88px]" />
      <div className="certificate-orb absolute -left-24 top-24 h-80 w-80 rounded-full bg-gold-500/16 blur-[130px]" />
      <div className="certificate-orb-delay absolute -right-24 bottom-16 h-96 w-96 rounded-full bg-gold-400/14 blur-[150px]" />
      <div className="certificate-orb-slow absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-300/8 blur-[180px]" />
      <span className="certificate-line left-[10%] top-[28%]" />
      <span className="certificate-line certificate-line-delay right-[12%] top-[52%]" />
      <span className="certificate-line certificate-line-slow left-[46%] top-[75%]" />
      <div className="portfolio-light-sweep absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(180,148,90,0.065)_42%,transparent_68%)]" />
    </div>
  )
}

function CertificateCard({
  certificate,
  onPreview,
  index,
  isVisible,
}: {
  certificate: Certificate
  onPreview: (image: string) => void
  index: number
  isVisible: boolean
}) {
  const delayClasses = ["", "reveal-delay-1", "reveal-delay-2"]
  const delayClass = delayClasses[Math.min(index % 3, 2)]

  return (
    <div className={`min-w-0 flex-1 reveal-hidden-scale ${delayClass} ${isVisible ? "reveal-visible" : ""}`}>
      <article className="group relative flex h-full min-w-0 flex-1 flex-col overflow-hidden rounded-[28px] border border-gold-200/28 bg-[#020617]/95 shadow-[0_26px_70px_rgba(0,0,0,0.55),0_0_0_1px_rgba(200,169,110,0.10)] ring-1 ring-white/[0.06] backdrop-blur-md transition-all duration-500 ease-fluid hover:-translate-y-1 hover:border-gold-200/65 hover:bg-[#060d1c]/98 hover:shadow-[0_30px_86px_rgba(180,148,90,0.25),0_0_0_1px_rgba(200,169,110,0.22)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-300/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <button
          type="button"
          onClick={() => onPreview(certificate.image)}
          aria-label={`Preview ${certificate.title} certificate`}
          className="relative aspect-[16/10] w-full overflow-hidden border-b border-gold-200/18 bg-slate-950 text-left flex items-center justify-center group/img"
        >
          <Image
            src={certificate.image || "/placeholder.svg"}
            alt={`${certificate.title} certificate`}
            width={800}
            height={520}
            quality={95}
            sizes="(max-width: 768px) 88vw, (max-width: 1024px) 42vw, 30vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="h-full w-full object-cover object-center transition duration-500 group-hover/img:scale-[1.025]"
          />

          <div className="absolute inset-0 z-20 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/img:opacity-100" />
          <div className="absolute bottom-2.5 right-2.5 z-30 rounded-full border border-gold-200/30 bg-black/60 px-2.5 py-1 text-[11px] font-medium text-gold-100 shadow-md backdrop-blur-md opacity-90 transition group-hover/img:opacity-100 group-hover/img:bg-gold-500 group-hover/img:text-slate-950">
            Click to preview
          </div>
        </button>

        <div className="relative flex flex-1 flex-col border-t border-white/[0.03] p-5">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 rounded-full border border-gold-200/35 bg-gold-300/14 px-3 py-1 font-medium text-gold-50">
              <Award className="h-3.5 w-3.5" />
              {certificate.issuer}
            </span>
          </div>

          <h3 className="mb-3 text-lg font-bold leading-snug text-slate-50 transition group-hover:text-gold-100">
            {certificate.title}
          </h3>

          <p className="flex-1 text-sm leading-relaxed text-slate-300/90">
            {certificate.description}
          </p>
        </div>
      </article>
    </div>
  )
}

export default function CertificatesSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 })

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

  const { ref: parallaxRef, y: parallaxY } = useParallax(50)

  return (
    <section
      ref={sectionRef}
      id="certificates"
      className="section-transition-soft relative flex min-h-screen items-center overflow-hidden py-20 text-slate-50"
    >
      <div ref={parallaxRef} className="absolute inset-0 z-0">
        <motion.div style={{ y: parallaxY }} className="h-full w-full">
          <CertificatesBackground />
        </motion.div>
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className={`mb-10 reveal-hidden ${isVisible ? "reveal-visible" : ""}`}>
          <div className="flex items-start justify-between gap-4">
            <h2 className="min-w-0 bg-gradient-to-r from-slate-50 via-gold-100 to-[#C8A96E] bg-clip-text pb-1 text-4xl font-bold tracking-tight text-transparent md:text-5xl">
              Certificates
            </h2>

            <Link href="/certificates" className="mt-1 shrink-0 no-underline md:mt-2">
              <div className="group flex overflow-hidden rounded-[12px] border border-gold-300/25 bg-slate-950/70 shadow-lg shadow-gold-950/35 backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:border-gold-300/55 hover:shadow-gold-500/18">
                <div className="flex items-center justify-center gap-2 bg-white/7 px-3 py-[12px] text-[13px] font-semibold tracking-[0.02em] text-gold-100 transition-colors duration-300 group-hover:bg-gold-400 group-hover:text-slate-950 sm:px-5">
                  <span className="hidden sm:inline">View All</span>
                  <ExternalLink className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <div className="flex min-w-[52px] flex-col items-center justify-center bg-gold-400 px-3 py-[8px] leading-none text-slate-950 sm:min-w-[64px] sm:px-4">
                  <span className="text-[18px] font-bold leading-none sm:text-[21px]">
                    {certificates.length}
                  </span>
                  <span className="mt-[3px] text-[11px] uppercase tracking-widest opacity-70 sm:text-[11px]">
                    Items
                  </span>
                </div>
              </div>
            </Link>
          </div>

          <p className="mt-3 w-full max-w-none text-sm leading-relaxed text-slate-300 md:max-w-4xl md:text-base lg:max-w-5xl">
            Courses finished, tests passed, and work recognised — with the certificate itself, not just a claim.
          </p>
        </div>

        {/* Static grid — five certificates fit on screen, so there is nothing to page through */}
        <div className={`reveal-hidden reveal-delay-2 ${isVisible ? "reveal-visible" : ""}`}>
          <div className="grid gap-5 px-1 py-2 sm:grid-cols-2 lg:grid-cols-3">
            {certificatesLatestFirst.map((certificate, index) => (
              <CertificateCard
                key={certificate.id}
                certificate={certificate}
                index={index}
                isVisible={isVisible}
                onPreview={setSelectedImage}
              />
            ))}
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

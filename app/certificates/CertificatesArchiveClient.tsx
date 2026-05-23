"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Award, CalendarDays, ChevronLeft, Eye, GraduationCap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { certificatesLatestFirst, type Certificate } from "@/lib/site-content"
import ImagePreviewDialog from "../components/ImagePreviewDialog"

export default function CertificatesArchiveClient() {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)

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
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(34,197,94,0.22),transparent_32%),radial-gradient(circle_at_82%_20%,rgba(20,184,166,0.18),transparent_34%),radial-gradient(circle_at_50%_90%,rgba(16,185,129,0.18),transparent_36%),linear-gradient(135deg,#020617_0%,#03251c_45%,#042f2e_100%)]" />

      <div className="fixed inset-0 opacity-[0.13]">
        <div className="certificate-grid absolute inset-0 bg-[linear-gradient(to_right,rgba(74,222,128,0.30)_1px,transparent_1px),linear-gradient(to_bottom,rgba(45,212,191,0.22)_1px,transparent_1px)] bg-[size:78px_78px]" />
      </div>

      <div className="fixed inset-0 overflow-hidden">
        <div className="certificate-orb absolute -left-24 top-24 h-80 w-80 rounded-full bg-green-400/20 blur-[130px]" />
        <div className="certificate-orb-delay absolute -right-28 bottom-20 h-96 w-96 rounded-full bg-teal-400/20 blur-[150px]" />
        <span className="certificate-line left-[12%] top-[22%]" />
        <span className="certificate-line certificate-line-delay left-[74%] top-[34%]" />
        <span className="certificate-line certificate-line-slow left-[44%] top-[78%]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">
        <div className="container relative mx-auto flex h-[68px] max-w-6xl items-center px-4">
          <Link href="/#certificates" className="relative z-10 shrink-0">
            <Button className="group rounded-full border border-green-300/30 bg-white/10 px-4 py-5 text-sm font-semibold text-white shadow-lg shadow-green-500/10 backdrop-blur-md transition-all duration-300 hover:-translate-x-1 hover:bg-green-400 hover:text-slate-950">
              <ChevronLeft className="h-5 w-5 transition group-hover:-translate-x-1 sm:mr-2" />
              <span className="hidden text-[13px] sm:inline">Back</span>
            </Button>
          </Link>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-24 text-center">
            <p className="truncate text-[11px] font-semibold uppercase tracking-[0.28em] text-green-300/80">
              Certificate Archive
            </p>
          </div>
        </div>
      </header>

      <main className="container relative z-10 mx-auto max-w-6xl px-4 py-12 md:py-16">
        <section className="mb-12 overflow-hidden rounded-[32px] border border-green-300/20 bg-slate-950/55 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-300/25 bg-green-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-green-200">
                <GraduationCap className="h-4 w-4" />
                Professional Learning Record
              </div>

              <h1 className="bg-gradient-to-r from-white via-green-100 to-emerald-300 bg-clip-text pb-2 text-4xl font-bold leading-tight tracking-tight text-transparent md:text-5xl lg:text-6xl">
                Certificates
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
                A complete collection of certifications and learning achievements that support my professional development journey.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:min-w-[260px]">
              <div className="rounded-2xl border border-green-300/20 bg-white/5 p-4 text-center">
                <div className="text-3xl font-bold text-green-200">{certificatesLatestFirst.length}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-slate-400">Certificates</div>
              </div>

              <div className="rounded-2xl border border-green-300/20 bg-white/5 p-4 text-center">
                <div className="text-3xl font-bold text-green-200">2025</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-slate-400">Latest Year</div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certificatesLatestFirst.map((certificate, index) => (
            <Card
              key={certificate.id}
              id={`certificate-${certificate.id}`}
              className="group certificate-card h-full overflow-hidden rounded-3xl border border-green-400/20 bg-slate-950/58 shadow-xl shadow-black/30 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-green-300/50 hover:shadow-green-500/20"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <CardContent className="flex h-full flex-col p-0">
                <button
                  type="button"
                  onClick={() => setSelectedCertificate(certificate)}
                  aria-label={`Preview ${certificate.title}`}
                  className="relative aspect-video w-full flex-shrink-0 overflow-hidden bg-slate-900 text-left"
                >
                  <Image
                    src={certificate.image || "/placeholder.svg"}
                    alt={`${certificate.title} certificate`}
                    width={500}
                    height={320}
                    sizes="(max-width: 768px) 92vw, (max-width: 1024px) 45vw, 30vw"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent opacity-80" />

                  <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/40 p-2 text-green-200 backdrop-blur-md">
                    <Award className="h-4 w-4" />
                  </div>

                  <div className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-xs font-medium text-white backdrop-blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Eye className="h-3.5 w-3.5" />
                    Preview
                  </div>
                </button>

                <div className="flex flex-grow flex-col border-t border-green-300/10 bg-slate-950/72 p-5">
                  <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 rounded-full border border-green-400/25 bg-green-400/10 px-3 py-1 font-medium text-green-300">
                      <Award className="h-3.5 w-3.5" />
                      {certificate.issuer}
                    </span>

                    <span className="inline-flex items-center gap-1 rounded-full border border-slate-500/30 bg-white/5 px-3 py-1 text-slate-300">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {certificate.date}
                    </span>
                  </div>

                  <h2 className="mb-3 text-lg font-bold leading-snug text-white transition group-hover:text-green-200">
                    {certificate.title}
                  </h2>

                  <p className="flex-1 text-sm leading-relaxed text-slate-300">
                    {certificate.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>

      <ImagePreviewDialog
        images={previewImages}
        title={selectedCertificate?.title}
        onClose={() => setSelectedCertificate(null)}
      />

      <style jsx>{`
        .certificate-grid {
          animation: gridMove 20s linear infinite;
        }

        .certificate-orb {
          animation: orbFloat 9s ease-in-out infinite;
        }

        .certificate-orb-delay {
          animation: orbFloat 11s ease-in-out infinite;
          animation-delay: 1.5s;
        }

        .certificate-line {
          position: absolute;
          width: 170px;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(134, 239, 172, 0.85),
            transparent
          );
          transform: rotate(-22deg);
          animation: lineMove 5.5s ease-in-out infinite;
        }

        .certificate-line-delay {
          animation-delay: 1.6s;
        }

        .certificate-line-slow {
          animation-delay: 2.4s;
          animation-duration: 7s;
        }

        .certificate-card {
          animation: fadeInUp 0.8s ease-out both;
        }

        @keyframes gridMove {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(78px, 78px, 0);
          }
        }

        @keyframes orbFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(26px, -20px, 0) scale(1.08);
          }
        }

        @keyframes lineMove {
          0% {
            opacity: 0;
            transform: translate3d(-50px, 35px, 0) rotate(-22deg);
          }
          35% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate3d(100px, -50px, 0) rotate(-22deg);
          }
        }

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
    </div>
  )
}

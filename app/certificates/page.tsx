"use client"

import { ChevronLeft, Award, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { certificates } from "@/lib/site-content"

export default function AllCertificates() {
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

      <div className="relative z-10 border-b border-white/10 bg-slate-950/50 backdrop-blur-xl">
        <div className="container mx-auto max-w-6xl px-4 py-5">
          <Link href="/#certificates">
            <Button className="group rounded-full border border-green-300/30 bg-white/10 px-4 py-5 text-sm font-semibold text-white shadow-lg shadow-green-500/10 backdrop-blur-md transition-all duration-300 hover:-translate-x-1 hover:bg-green-400 hover:text-slate-950">
              <ChevronLeft className="mr-2 h-5 w-5 transition group-hover:-translate-x-1" />
              Back to Certificates
            </Button>
          </Link>
        </div>
      </div>

      <main className="relative z-10 container mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-300/25 bg-green-300/10 px-4 py-2 text-sm font-semibold text-green-200 shadow-lg shadow-green-500/10 backdrop-blur-md">
            <Sparkles className="h-4 w-4" />
            Certificate Archive
          </div>

          <h1 className="bg-gradient-to-r from-green-200 via-white to-emerald-300 bg-clip-text pb-2 text-4xl font-black leading-[1.15] tracking-[-0.03em] text-transparent drop-shadow-[0_0_28px_rgba(74,222,128,0.28)] md:text-5xl lg:text-6xl">
            All My Certificates
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
            A complete collection of certifications and learning achievements
            that support my professional development journey.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certificates.map((certificate, index) => (
            <Card
              key={certificate.id}
              className="group certificate-card h-full overflow-hidden rounded-3xl border border-green-300/20 bg-slate-950/60 shadow-2xl shadow-black/30 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-green-300/50 hover:shadow-green-500/20"
              style={{
                animationDelay: `${index * 120}ms`,
              }}
            >
              <CardContent className="flex h-full flex-col p-0">
                <div className="relative aspect-video flex-shrink-0 overflow-hidden bg-slate-900">
                  <Image
                    src={certificate.image || "/placeholder.svg"}
                    alt={`${certificate.title} certificate`}
                    width={500}
                    height={320}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />

                  <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/40 p-2 text-green-200 backdrop-blur-md">
                    <Award className="h-4 w-4" />
                  </div>
                </div>

                <div className="flex flex-grow flex-col rounded-b-3xl border-t border-green-300/10 bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 p-5">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-green-700/10 px-3 py-1 text-xs font-semibold text-green-800">
                      {certificate.issuer}
                    </span>

                    <span className="text-xs text-slate-500">•</span>

                    <span className="rounded-full bg-slate-900/10 px-3 py-1 text-xs font-medium text-slate-600">
                      {certificate.date}
                    </span>
                  </div>

                  <h3 className="mb-2 text-lg font-bold leading-snug text-slate-950">
                    {certificate.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-slate-800">
                    {certificate.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

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

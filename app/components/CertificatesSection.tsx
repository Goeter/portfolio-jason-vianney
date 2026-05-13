"use client"

import { useEffect, useMemo, useState } from "react"
import { ChevronLeft, ChevronRight, Award, X, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

const certificates = [
  {
    id: 1,
    title: "English Certificate",
    description:
      "Has achieved CEFR C1 - Advanced (Score 599), Compare to IELTS (same with band 8).",
    image: "/assets/certificates/English Certificate Gabung_1.jpg",
    issuer: "British Council",
    date: "09 October 2025",
  },
  {
    id: 2,
    title: "Teaching Certification",
    description: "Teaching Mathematic, English and Physics",
    image: "/assets/certificates/Teaching Certification.png",
    issuer: "British Council",
    date: "09 October 2025",
  },
  {
    id: 3,
    title: "Data Analyst Python & SQL",
    description:
      "In depth training in Python for data analysis, data organization, and SQL database management.",
    image: "/assets/certificates/data-analyst-udemy.jpeg",
    issuer: "Udemy",
    date: "02 August 2025",
  },
  {
    id: 4,
    title: "Intro to Data Analytics",
    description:
      "Fundamentals of data analysis, including organizing and interpreting data using spreadsheets.",
    image: "/assets/certificates/data-analyst-revou.jpeg",
    issuer: "RevoU",
    date: "18 July 2025",
  },
  {
    id: 5,
    title: "UI/UX Webinar Participation",
    description:
      "Comprehensive training on UI/UX principles, design tools, and best practice.",
    image: "/assets/certificates/ui-ux-webinar-ubaya.png",
    issuer: "Universitas Surabaya (UBAYA)",
    date: "24 May 2025",
  },
]

export default function CertificatesSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(3)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1)
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2)
      } else {
        setCardsPerView(3)
      }
    }

    updateCardsPerView()
    window.addEventListener("resize", updateCardsPerView)

    return () => window.removeEventListener("resize", updateCardsPerView)
  }, [])

  const maxIndex = useMemo(() => {
    return Math.max(0, certificates.length - cardsPerView)
  }, [cardsPerView])

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex)
    }
  }, [currentIndex, maxIndex])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const minSwipeDistance = 50

    if (distance > minSwipeDistance) {
      nextSlide()
    }

    if (distance < -minSwipeDistance) {
      prevSlide()
    }
  }

  return (
    <section
      id="certificates"
      className="relative flex min-h-screen items-center overflow-hidden py-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(34,197,94,0.28),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(45,212,191,0.22),transparent_32%),radial-gradient(circle_at_48%_88%,rgba(16,185,129,0.20),transparent_34%),linear-gradient(135deg,#020617_0%,#042018_42%,#052e2b_100%)]" />

      <div className="absolute inset-0 opacity-[0.14]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(34,197,94,0.30)_1px,transparent_1px),linear-gradient(to_bottom,rgba(45,212,191,0.22)_1px,transparent_1px)] bg-[size:76px_76px]" />
      </div>

      <div className="absolute inset-0 opacity-[0.16]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(134,239,172,0.35)_1px,transparent_1.5px)] bg-[size:30px_30px]" />
      </div>

      <div className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-green-500/20 blur-[120px]" />
      <div className="absolute -right-24 bottom-16 h-96 w-96 rounded-full bg-teal-400/20 blur-[140px]" />
      <div className="absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/10 blur-[170px]" />

      <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(34,197,94,0.07)_42%,transparent_68%)]" />

      {selectedImage && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
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
                className="max-h-[72vh] w-auto max-w-[88vw] rounded-xl object-contain"
              />
            </div>
          </div>
        </div>
      )}

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="mb-10 flex translate-y-0 animate-[fadeInUp_0.8s_ease-out] flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="bg-gradient-to-r from-white via-green-100 to-emerald-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
              Certificates
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
              A complete collection of certifications and learning achievements
              that support my professional development journey.
            </p>
          </div>

          <Link href="/certificates">
            <Button className="group w-fit rounded-full border border-green-300/30 bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-4 text-sm font-semibold text-white shadow-lg shadow-green-500/25 transition-all duration-300 hover:scale-[1.03] hover:from-green-400 hover:to-emerald-400 hover:shadow-green-500/40 md:px-5">
              View All
              <span className="ml-2 rounded-full border border-white/25 bg-white/15 px-2 py-0.5 text-xs">
                {certificates.length}
              </span>
              <ExternalLink className="ml-1.5 h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </Link>
        </div>

        <div className="relative animate-[fadeInUp_1s_ease-out]">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={prevSlide}
            aria-label="Previous certificates"
            className="absolute -left-2 top-1/2 z-20 h-10 w-10 -translate-y-1/2 rounded-full border-green-400/30 bg-slate-950/80 text-green-300 shadow-xl backdrop-blur-md transition hover:bg-green-500 hover:text-white md:-left-5"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={nextSlide}
            aria-label="Next certificates"
            className="absolute -right-2 top-1/2 z-20 h-10 w-10 -translate-y-1/2 rounded-full border-green-400/30 bg-slate-950/80 text-green-300 shadow-xl backdrop-blur-md transition hover:bg-green-500 hover:text-white md:-right-5"
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
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
              }}
            >
              {certificates.map((certificate) => (
                <div
                  key={certificate.id}
                  className="w-full flex-shrink-0 px-2 md:w-1/2 lg:w-1/3"
                >
                  <Card className="group h-full overflow-hidden rounded-3xl border border-green-400/20 bg-slate-950/60 shadow-xl shadow-black/30 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-green-300/50 hover:shadow-green-500/20">
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
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to certificate slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "w-8 bg-green-400"
                    : "w-2.5 bg-slate-500 hover:bg-slate-300"
                }`}
              />
            ))}
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

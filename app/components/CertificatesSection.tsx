"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Award, X } from "lucide-react"
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
    description:
      "Teaching Mathematic, English and Physics",
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
  const [isClient, setIsClient] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    setIsClient(true)

    const updateCardsPerView = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 768) {
          setCardsPerView(1)
        } else if (window.innerWidth < 1024) {
          setCardsPerView(2)
        } else {
          setCardsPerView(3)
        }
      }
    }

    updateCardsPerView()
    if (typeof window !== "undefined") {
      window.addEventListener("resize", updateCardsPerView)
      return () => window.removeEventListener("resize", updateCardsPerView)
    }
  }, [])

  const maxIndex = Math.max(1, certificates.length - cardsPerView + 1)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % maxIndex)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + maxIndex) % maxIndex)
  }

  const getTransformValue = () => {
    if (!isClient) return 0
    const percentage = 100 / cardsPerView
    return currentIndex * percentage
  }

  return (
    <section id="certificates" className="min-h-screen flex items-center py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-green-900/60 to-emerald-900/60 backdrop-blur-sm">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fillRule=%22evenodd%22%3E%3Cg stroke=%22%2300ff00%22 strokeWidth=%221%22%3E%3Cpath d=%22M0 0h60v60H0z%22/%3E%3Cpath d=%22M15 0v60M30 0v60M45 0v60M0 15h60M0 30h60M0 45h60%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        </div>
      </div>

      {/* Modal Image Viewer */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] mx-auto">
            <button
              className="absolute top-2 right-2 bg-slate-800 hover:bg-slate-700 text-white p-1 rounded-full z-10"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(null)
              }}
            >
              <X className="w-5 h-5" />
            </button>
            <Image
              src={selectedImage}
              alt="Certificate Detail"
              width={1200}
              height={800}
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-white text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent flex items-center gap-3">
            Certificates
          </h2>
          <Link href="/certificates">
            <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-semibold px-6 py-2 rounded-lg shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transform hover:scale-105 transition-all duration-300">
              All Certificates{" "}
              <span className="bg-green-600 text-white px-2 py-1 rounded-md border border-green-700 ml-2">
                {certificates.length}
              </span>{" "}
              {">"}
            </Button>
          </Link>
        </div>

        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-slate-800/80 border-green-500/50 hover:bg-slate-700/80 shadow-lg text-green-300 hover:text-green-200"
            onClick={prevSlide}
            aria-label="Previous certificates"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-slate-800/80 border-green-500/50 hover:bg-slate-700/80 shadow-lg text-green-300 hover:text-green-200"
            onClick={nextSlide}
            aria-label="Next certificates"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          <div className="overflow-hidden mx-8">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${getTransformValue()}%)` }}
            >
              {certificates.map((certificate) => (
                <div key={certificate.id} className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-2">
                  <Card className="bg-gradient-to-br from-slate-800/90 to-green-900/90 backdrop-blur-sm border-green-500/30 hover:border-green-400/50 transition-all duration-300 transform hover:scale-105 h-full shadow-lg shadow-green-500/20">
                    <CardContent className="p-0 flex flex-col h-full">
                      <div
                        className="aspect-video bg-gray-800 rounded-t-lg flex-shrink-0 overflow-hidden cursor-pointer"
                        onClick={() => setSelectedImage(certificate.image)}
                      >
                        <Image
                          src={certificate.image || "/placeholder.svg"}
                          alt={`${certificate.title} certificate`}
                          width={300}
                          height={200}
                          className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                        />
                      </div>
                      <div className="bg-gradient-to-br from-green-900/80 to-emerald-900/80 p-4 rounded-b-lg flex-grow">
                        <div className="flex items-center gap-2 mb-2">
                          <Award className="w-4 h-4 text-green-400" />
                          <span className="text-green-300 text-xs font-medium">{certificate.issuer}</span>
                          <span className="text-gray-400 text-xs">•</span>
                          <span className="text-gray-400 text-xs">{certificate.date}</span>
                        </div>
                        <h3 className="text-white font-bold text-lg mb-2">{certificate.title}</h3>
                        <p className="text-gray-300 text-sm">{certificate.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

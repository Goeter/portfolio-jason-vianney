"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

const projects = [
  {
    id: 1,
    title: "PT Topas Multi Finance Website",
    description:
      "Public-facing corporate website that sells Topas Multi Finance products and builds brand awareness and customer trust through professional digital presence",
    image: "/assets/projects/topas-website.png",
  },
  {
    id: 2,
    title: "Topas Multi Finance Mobile Application",
    description:
      "Mobile application for Topas Multi Finance customers and internal staff with features for loan management, disbursement tracking, customer monitoring, and comprehensive financial services",
    image: "/assets/projects/mobile-app/combined",
  },
  {
    id: 3,
    title: "HR Topas Application",
    description:
      "A project to develop an HRD application for tracking employee attendance, recording absences, tracking salaries, workforce planning with KPIs, and comprehensive recruitment process management",
    image: "/assets/projects/hr-topas-application.png",
  },
  {
    id: 4,
    title: "Monitoring Server",
    description:
      "Developing an internal application for recording motorcycle sales from dealers, order confirmation, delivery scheduling, and document completeness checks.",
    image: "/assets/projects/monitoring-server.png",
  },
  {
    id: 5,
    title: "Vehicle Registration Certificate System",
    description:
      "A new menu for printing the disbursement note, which was previously written manually by hand. It can now be printed more neatly and quickly using the system, and is stored securely in the system",
    image: "/assets/projects/vehicle-registration-certificate-system.png",
  },
  {
    id: 6,
    title: "Mobile Mata Elang & Subscribe",
    description:
      "Create a mobile application to track credit vehicles and help field users or third parties use the application by subscribing to our application.",
    image: "/assets/projects/mobile-mata-elang/combined",
  },
  {
    id: 7,
    title: "Mobile Loan Flow Survey",
    description:
      "Create a survey application to be used when visiting debtors' homes, so that the data is centralized and neatly stored in the company database, and can be followed up properly.",
    image: "/assets/projects/flow-survey-pinjaman.jpg",
  },
]

export default function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(3)
  const [isClient, setIsClient] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)

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

  const maxIndex = Math.max(1, projects.length - cardsPerView + 1)

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

  const handleImageClick = (image: string, id: number) => {
    setSelectedImage(image)
    setSelectedProjectId(id)
  }

  return (
    <>
      <section id="projects" className="min-h-screen flex items-center py-20 relative">
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-white text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Projects
            </h2>
            <Link href="/projects">
              <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-semibold px-6 py-2 rounded-lg shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transform hover:scale-105 transition-all duration-300">
                All Projects
                <span className="bg-green-600 text-white px-2 py-1 rounded-md border border-green-700 ml-2">
                  {projects.length}
                </span>{" "}
                {">"}
              </Button>
            </Link>
          </div>

          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-slate-800/80 border-cyan-500/50 hover:bg-slate-700/80 shadow-lg text-cyan-300 hover:text-cyan-200"
              onClick={prevSlide}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-slate-800/80 border-cyan-500/50 hover:bg-slate-700/80 shadow-lg text-cyan-300 hover:text-cyan-200"
              onClick={nextSlide}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            <div className="overflow-hidden mx-8">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${getTransformValue()}%)` }}
              >
                {projects.map((project) => (
                  <div key={project.id} className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-2">
                    <Card className="bg-gradient-to-br from-slate-800 to-blue-900 shadow-lg h-full">
                      <CardContent className="p-0 flex flex-col h-full">
                        <div
                          className="aspect-video bg-gray-800 rounded-t-lg overflow-hidden cursor-pointer"
                          onClick={() => handleImageClick(project.image, project.id)}
                        >
                          {project.image.includes("mobile-app/combined") ? (
                            <div className="flex h-full">
                              <Image src="/assets/projects/mobile-app/topas-mobile-dashboard.jpeg" alt="Dashboard" width={100} height={200} className="w-1/3 object-cover" />
                              <Image src="/assets/projects/mobile-app/topas-mobile-menu.jpeg" alt="Menu" width={100} height={200} className="w-1/3 object-cover" />
                              <Image src="/assets/projects/mobile-app/topas-mobile-profile.jpeg" alt="Profile" width={100} height={200} className="w-1/3 object-cover" />
                            </div>
                          ) : project.image.includes("mobile-mata-elang/combined") ? (
                            <div className="flex h-full">
                              <Image src="/assets/projects/mobile-mata-elang/foto-1.png" alt="Foto 1" width={100} height={200} className="w-1/3 object-cover" />
                              <Image src="/assets/projects/mobile-mata-elang/foto-2.png" alt="Foto 2" width={100} height={200} className="w-1/3 object-cover" />
                              <Image src="/assets/projects/mobile-mata-elang/foto-3.png" alt="Foto 3" width={100} height={200} className="w-1/3 object-cover" />
                            </div>
                          ) : (
                            <Image src={project.image || "/placeholder.svg"} alt={project.title} width={300} height={200} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                          <h3 className="text-white font-bold text-lg mb-2">{project.title}</h3>
                          <p className="text-gray-300 text-sm mb-4 flex-grow">{project.description}</p>
                          {project.id === 1 && (
                            <Button
                              variant="link"
                              className="text-cyan-400 p-0 self-start"
                              onClick={() => setShowModal(true)}
                            >
                              Visit Website &gt;
                            </Button>
                          )}
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

      {/* Modal untuk Link Website */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative animate-fade-in-up">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={() => setShowModal(false)} aria-label="Close Modal">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-gray-800 mb-2">PT Topas Multi Finance Website</h2>
            <p className="text-sm text-gray-600 mb-4">Klik tombol di bawah ini untuk mengunjungi website resmi.</p>
            <Link href="https://frontend.topasmultifinance.co.id" target="_blank" rel="noopener noreferrer">
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-white w-full">Buka Website</Button>
            </Link>
          </div>
        </div>
      )}

      {/* Modal Gambar dengan Tampilan Baru */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center animate-fade-in-up">
          <div className="relative w-full max-w-[600px] max-h-[90vh] mx-4 bg-white p-4 rounded-lg shadow-2xl overflow-auto">
            <button
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-800 flex items-center justify-center shadow-md"
              onClick={() => {
                setSelectedImage(null)
                setSelectedProjectId(null)
              }}
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {selectedProjectId === 2 ? (
              <div className="flex gap-2 overflow-x-auto max-w-full">
                <Image src="/assets/projects/mobile-app/topas-mobile-dashboard.jpeg" alt="Dashboard" width={180} height={360} className="rounded-lg object-contain" />
                <Image src="/assets/projects/mobile-app/topas-mobile-menu.jpeg" alt="Menu" width={180} height={360} className="rounded-lg object-contain" />
                <Image src="/assets/projects/mobile-app/topas-mobile-profile.jpeg" alt="Profile" width={180} height={360} className="rounded-lg object-contain" />
              </div>
            ) : selectedProjectId === 6 ? (
              <div className="flex gap-2 overflow-x-auto max-w-full">
                <Image src="/assets/projects/mobile-mata-elang/foto-1.png" alt="Foto 1" width={180} height={360} className="rounded-lg object-contain" />
                <Image src="/assets/projects/mobile-mata-elang/foto-2.png" alt="Foto 2" width={180} height={360} className="rounded-lg object-contain" />
                <Image src="/assets/projects/mobile-mata-elang/foto-3.png" alt="Foto 3" width={180} height={360} className="rounded-lg object-contain" />
              </div>
            ) : (
              <Image
                src={selectedImage}
                alt="Full Size Project"
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg object-contain max-w-full max-h-[80vh]"
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}

"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

const projects = [
  {
    id: 1,
    title: "PT Topas Multi Finance Website",
    description:
      "Public-facing corporate website that sells products and builds brand awareness and customer trust through professional digital presence",
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
      "This application is a new version of S_AHMITSYS023 used to monitor and display data prepared by AHM to be retrieved by dealers and data sent by dealers that has been entered into the AHM B2B database",
    image: "/assets/projects/monitoring-server.png",
  },
  {
    id: 5,
    title: "Vehicle Registration Certificate System",
    description:
      "A new menu for printing the disbursement note, which was previously written manually by hand. It can now be printed more neatly and quickly using the system, and is stored securely in the system",
    image: "/assets/projects/vehicle-registration-certificate-system.png",
  },
]

export default function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(3)
  const [isClient, setIsClient] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const updateCardsPerView = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 768) setCardsPerView(1)
        else if (window.innerWidth < 1024) setCardsPerView(2)
        else setCardsPerView(3)
      }
    }
    updateCardsPerView()
    if (typeof window !== "undefined") {
      window.addEventListener("resize", updateCardsPerView)
      return () => window.removeEventListener("resize", updateCardsPerView)
    }
  }, [])

  const maxIndex = Math.max(1, projects.length - cardsPerView + 1)
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % maxIndex)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + maxIndex) % maxIndex)
  const getTransformValue = () => (isClient ? (100 / cardsPerView) * currentIndex : 0)

  return (
    <section id="projects" className="min-h-screen flex items-center py-20 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-blue-900/60 to-purple-900/60 backdrop-blur-sm" />

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-full max-w-6xl h-[90vh] bg-white rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 z-10 bg-slate-800 hover:bg-slate-700 text-white p-1 rounded-full"
              onClick={() => setShowModal(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <iframe
              src="https://frontend.topasmultifinance.co.id/"
              title="Topas Website Preview"
              className="w-full h-full border-0"
            />
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-white text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Projects
          </h2>
          <Link href="/projects">
            <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-semibold px-6 py-2 rounded-lg">
              All Projects
            </Button>
          </Link>
        </div>

        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
            onClick={prevSlide}
            aria-label="Previous projects"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
            onClick={nextSlide}
            aria-label="Next projects"
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
                  <Card className="bg-gradient-to-br from-slate-800/90 to-blue-900/90">
                    <CardContent className="p-0 flex flex-col h-full">
                      <div className="aspect-video bg-gray-800 rounded-t-lg overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={300}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="bg-gradient-to-br from-cyan-900/80 to-blue-900/80 p-4 rounded-b-lg flex-grow flex flex-col">
                        <h3 className="text-white font-bold text-lg mb-2">{project.title}</h3>
                        <p className="text-gray-300 text-sm mb-4 flex-grow line-clamp-3">{project.description}</p>
                        {project.id === 1 ? (
                          <Button
                            variant="link"
                            className="text-cyan-400 hover:text-cyan-300 p-0 text-sm self-start font-semibold"
                            onClick={() => setShowModal(true)}
                          >
                            Live Preview {">"}
                          </Button>
                        ) : (
                          <Link href={`/experience/${project.id}`}>
                            <Button
                              variant="link"
                              className="text-cyan-400 hover:text-cyan-300 p-0 text-sm self-start font-semibold"
                            >
                              See Detail {">"}
                            </Button>
                          </Link>
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
  )
}

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
  {
      id: 6,
      title: "Flow Survey Pinjaman Mobile Application",
      description: "How the loan survey flow application is implemented for field users to simplify surveys and centralized, organized data recording, and allow for temporary storage if there is no signal in the area.",
      image: "/projects/flow-survey.jpg",
    },
    {
      id: 7,
      title: "Application Mobile Mata Elang & Subscribe",
      description: "Developing a vehicle tracking application that is still in the credit phase, connecting it to the database of multifinance companies such as Topas, to facilitate on-site retrieval and tracking, and enabling collaboration with other companies through subscription using the Topas application.",
      image: "/projects/foto1.png",
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

  return (
    <section id="projects" className="min-h-screen flex items-center py-20 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-blue-900/60 to-purple-900/60 backdrop-blur-sm">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fillRule=%22evenodd%22%3E%3Cg stroke=%22%2300ffff%22 strokeWidth=%221%22%3E%3Cpath d=%22M0 0h60v60H0z%22/%3E%3Cpath d=%22M15 0v60M30 0v60M45 0v60M0 15h60M0 30h60M0 45h60%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"] />
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-xl animate-pulse" />
        <div
          className="absolute bottom-40 left-20 w-48 h-48 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
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
            ></iframe>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-white text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Projects
          </h2>
        </div>

        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-slate-800/80 border-cyan-500/50 hover:bg-slate-700/80 shadow-lg text-cyan-300 hover:text-cyan-200"
            onClick={prevSlide}
            aria-label="Previous projects"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-slate-800/80 border-cyan-500/50 hover:bg-slate-700/80 shadow-lg text-cyan-300 hover:text-cyan-200"
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
                  <Card className="bg-gradient-to-br from-slate-800/90 to-blue-900/90 backdrop-blur-sm border-cyan-500/30 hover:border-cyan-400/50 hover:bg-slate-700/90 transition-all duration-300 transform hover:scale-105 h-full shadow-lg shadow-cyan-500/20">
                    <CardContent className="p-0 flex flex-col h-[460px]">
                      <div className="aspect-video bg-gray-800 rounded-t-lg flex-shrink-0 overflow-hidden">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={`${project.title} screenshot`}
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

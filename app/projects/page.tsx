"use client"

import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

interface Project {
  id: number
  title: string
  description: string
  image: string
}

const projects: Project[] = [
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

export default function AllProjects() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-x-hidden">
      {/* Tech Background Pattern */}
      <div className="fixed inset-0">
        {/* Purple geometric lines on the right */}
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <svg className="w-full h-full opacity-30" viewBox="0 0 400 800" fill="none" aria-hidden="true">
            <path
              d="M200 0L350 100L300 200L400 300L250 400L350 500L200 600L300 700L150 800"
              stroke="#a855f7"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M250 50L400 150L350 250L450 350L300 450L400 550L250 650L350 750L200 850"
              stroke="#c084fc"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </div>

        {/* Blue hexagonal pattern on bottom left */}
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2">
          <svg className="w-full h-full opacity-20" viewBox="0 0 400 400" fill="none" aria-hidden="true">
            <polygon points="50,25 75,50 75,100 50,125 25,100 25,50" stroke="#3b82f6" strokeWidth="1" fill="none" />
            <polygon
              points="100,75 125,100 125,150 100,175 75,150 75,100"
              stroke="#60a5fa"
              strokeWidth="1"
              fill="none"
            />
            <polygon
              points="150,25 175,50 175,100 150,125 125,100 125,50"
              stroke="#93c5fd"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-cyan-400 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-black hover:bg-cyan-300 flex items-center gap-2">
                <ChevronLeft className="w-5 h-5" />
                Back
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <h1 className="text-white text-3xl font-bold mb-8">All my project</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 h-full"
            >
              <CardContent className="p-0 flex flex-col h-full">
                <div className="aspect-video bg-gray-300 rounded-t-lg flex-shrink-0 overflow-hidden">
                  {project.image.includes("mobile-app/combined") ? (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center p-2">
                      <div className="flex space-x-1 w-full h-full">
                        <div className="flex-1 rounded-lg overflow-hidden">
                          <Image
                            src="/assets/projects/mobile-app/topas-mobile-dashboard.jpeg"
                            alt="Topas Mobile App Dashboard"
                            width={100}
                            height={200}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 rounded-lg overflow-hidden">
                          <Image
                            src="/assets/projects/mobile-app/topas-mobile-menu.jpeg"
                            alt="Topas Mobile App Menu"
                            width={100}
                            height={200}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 rounded-lg overflow-hidden">
                          <Image
                            src="/assets/projects/mobile-app/topas-mobile-profile.jpeg"
                            alt="Topas Mobile App Profile"
                            width={100}
                            height={200}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={`${project.title} screenshot`}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="bg-cyan-200 p-4 rounded-b-lg flex-grow flex flex-col">
                  <h3 className="text-black font-bold text-lg mb-2">{project.title}</h3>
                  <p className="text-black text-sm mb-4 flex-grow line-clamp-4">{project.description}</p>
                  <Link href={`/experience/${project.id}`}>
                    <Button
                      variant="link"
                      className="text-blue-600 hover:text-blue-500 p-0 text-sm self-start font-semibold"
                    >
                      See Detail {">"}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

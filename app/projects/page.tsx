"use client"

import { ChevronLeft } from 'lucide-react'
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
    title: "PT. Alfa Berkat Sigma",
    description:
      "Public-facing corporate website that sells Topas Multi Finance products and builds brand awareness and customer trust through professional digital presence",
    image: "/assets/projects/sigma-picture.png",
  },
  {
    id: 3,
    title: "Topas Multi Finance Mobile Application",
    description:
      "Mobile application for Topas Multi Finance customers and internal staff with features for loan management, disbursement tracking, customer monitoring, and comprehensive financial services",
    image: "/assets/projects/mobile-app/combined",
  },
  {
    id: 4,
    title: "HR Topas Application",
    description:
      "A project to develop an HRD application for tracking employee attendance, recording absences, tracking salaries, workforce planning with KPIs, and comprehensive recruitment process management",
    image: "/assets/projects/hr-topas-application.png",
  },
  {
    id: 5,
    title: "Monitoring & Feedback Prospect",
    description:
      "Developing an internal application for recording motorcycle sales from dealers, order confirmation, delivery scheduling, and document completeness checks.",
    image: "/assets/projects/monitoring-server.png",
  },
  {
    id: 6,
    title: "Vehicle Registration Certificate System",
    description:
      "A new menu for printing the disbursement note, which was previously written manually by hand. It can now be printed more neatly and quickly using the system, and is stored securely in the system",
    image: "/assets/projects/vehicle-registration-certificate-system.png",
  },
  {
    id: 7,
    title: "Mobile Mata Elang & Subscribe",
    description:
      "Create a mobile application to track credit vehicles and help field users or third parties use the application by subscribing to our application.",
    image: "/assets/projects/mobile-mata-elang/combined",
  },
  {
    id: 8,
    title: "Mobile Loan Flow Survey",
    description:
      "Create a survey application to be used when visiting debtors' homes, so that the data is centralized and neatly stored in the company database, and can be followed up properly.",
    image: "/assets/projects/flow-survey-pinjaman.jpg",
  },
  {
    id: 9,
    title: "Dashboard Admin Ticketing",
    description:
      "Create a website dashboard monitoring ticketing.",
    image: "/assets/projects/dashboard_ticketing.png",
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
            <polygon points="100,75 125,100 125,150 100,175 75,150 75,100" stroke="#60a5fa" strokeWidth="1" fill="none" />
            <polygon points="150,25 175,50 175,100 150,125 125,100 125,50" stroke="#93c5fd" strokeWidth="1" fill="none" />
          </svg>
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-gradient-to-r from-cyan-500 via-blue-700 to-purple-800 py-4 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Link href="/#projects">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-cyan-300 transition-colors flex items-center gap-2 hover:shadow-[0_0_10px_2px_rgba(34,211,238,0.7)]"
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <h1 className="text-white text-3xl font-bold mb-8">All my projects</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="relative group bg-gradient-to-br from-[#1a1c2c] to-[#2e3a59] border border-transparent rounded-xl p-[1px] shadow-lg hover:scale-[1.02] transition-transform duration-300 h-full"
            >
              <div className="absolute inset-0 rounded-xl pointer-events-none group-hover:opacity-100 opacity-20 transition-opacity duration-500 border-2 border-transparent group-hover:border-cyan-400 animate-[pulse_4s_infinite]"></div>

              <CardContent className="p-0 flex flex-col h-full bg-[#0f172a]/80 backdrop-blur-md rounded-xl z-10 relative">
                <div className="aspect-video bg-gray-300 rounded-t-xl flex-shrink-0 overflow-hidden">
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
                  ) : project.image.includes("mobile-mata-elang/combined") ? (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center p-2">
                      <div className="flex space-x-1 w-full h-full">
                        <div className="flex-1 rounded-lg overflow-hidden">
                          <Image
                            src="/assets/projects/mobile-mata-elang/foto-1.png"
                            alt="Mata Elang Dashboard"
                            width={100}
                            height={200}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 rounded-lg overflow-hidden">
                          <Image
                            src="/assets/projects/mobile-mata-elang/foto-2.png"
                            alt="Mata Elang Subscription Offer"
                            width={100}
                            height={200}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 rounded-lg overflow-hidden">
                          <Image
                            src="/assets/projects/mobile-mata-elang/foto-3.png"
                            alt="Mata Elang Subscription Options"
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
                <div className="p-4 rounded-b-xl flex-grow flex flex-col text-white">
                  <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                  <p className="text-sm mb-4 flex-grow line-clamp-4 opacity-90">{project.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

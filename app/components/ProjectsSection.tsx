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
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fillRule=%22evenodd%22%3E%3Cg stroke=%22%2300ffff%22 strokeWidth=%221%22%3E%3Cpath d=%22M0 0h60v60H0z%22/%3E%3Cpath d=%22M15 0v60M30 0v60M45 0v60M0 15h60M0 30h60M0 45h60%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
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
          <h2 className="text-white text-3

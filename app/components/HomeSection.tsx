"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const roles = [
  {
    id: 1,
    title: "System Analyst",
    emoji: "✅",
    gradient: "bg-gradient-to-br from-blue-50 to-blue-100",
    borderColor: "border-blue-200",
    skills: [
      "Requirement analysis",
      "Business process modeling",
      "Critical Thinking & Problem Solving",
      "Communication & Documentation",
      "System Design (High Level Fidelity)",
      "Database Understanding (ERD)",
    ],
    tools: [
      "Microsoft Visio (Flowchart)",
      "SQL (MySQL, PostgreSQL, Oracle)",
      "Jira / Trello",
      "Microsoft Office (Excel, Word, Power Point)",
      "BPMN tools (BPMN.io)",
    ],
  },
  {
    id: 2,
    title: "Data Analyst",
    emoji: "✅",
    gradient: "bg-gradient-to-br from-green-50 to-green-100",
    borderColor: "border-green-200",
    skills: [
      "Data Cleaning & Wrangling",
      "Data Visualization",
      "Statistical Analysis",
      "SQL Querying",
      "Spreadsheet Analysis",
      "Communication & Presentation with Data",
    ],
    tools: [
      "Excel / Google Sheets",
      "SQL (PostgreSQL, MySQL)",
      "Python (Pandas, NumPy)",
      "Power BI / Tableau",
      "Google Data Studio",
    ],
  },
  {
    id: 3,
    title: "UI/UX Designer",
    emoji: "✅",
    gradient: "bg-gradient-to-br from-purple-50 to-purple-100",
    borderColor: "border-purple-200",
    skills: [
      "User Research & Persona Creation",
      "Wireframing & Prototyping",
      "Interaction Design",
      "Usability Testing",
      "Design Thinking",
      "Accessibility Principles",
    ],
    tools: ["Figma / Adobe XD", "Balsamiq (Wireframe / UI)", "Trello"],
  },
]

export default function HomeSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || isPaused) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % roles.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isClient, isPaused])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % roles.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + roles.length) % roles.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section id="home" className="min-h-screen flex items-center pt-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6 scroll-animate opacity-0 translate-y-8 transition-all duration-1000">
            <div className="space-y-4">
              <h1 className="text-gray-800 text-3xl lg:text-4xl xl:text-5xl font-light leading-tight">
                Hello my name is <span className="font-bold text-blue-600">Jason Vianney Sugiarto</span>
              </h1>

              <h2 className="text-indigo-600 text-xl lg:text-2xl xl:text-3xl font-semibold leading-tight">
                System Analyst, UI/UX Design,
                <br />
                Data Analyst, Remote
              </h2>

              <p className="text-gray-600 text-base lg:text-lg leading-relaxed text-justify">
                I am motivated by a passion for solving problems through intelligent system analysis and well-planned
                design. This portfolio showcases my dedication to designing clean, high-detail user interfaces (UI) and
                user experiences (UX) using Figma, then implementing them with various programming languages and
                seamlessly deploying them via Vercel. I invite you to explore my work—each project reflects my
                commitment to building efficient, user-friendly solutions by blending logic and creativity.
              </p>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="flex justify-center lg:justify-end scroll-animate opacity-0 translate-y-8 transition-all duration-1000 delay-300">
            <div className="relative">
              <div className="w-72 h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-4 border-white shadow-2xl hover:shadow-3xl transition-shadow duration-500">
                <Image
                  src="/assets/profile/home.png"
                  alt="Jason Vianney Sugiarto"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full border-2 border-blue-200 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

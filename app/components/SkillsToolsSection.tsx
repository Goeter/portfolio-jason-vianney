"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

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

export default function SkillsToolsSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [cardsPerView, setCardsPerView] = useState(3)

  useEffect(() => {
    setIsClient(true)

    const updateCardsPerView = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 768) {
          setCardsPerView(1)
          setIsMobile(true)
        } else if (window.innerWidth < 1024) {
          setCardsPerView(2)
          setIsMobile(true)
        } else {
          setCardsPerView(3)
          setIsMobile(false)
        }
      }
    }

    updateCardsPerView()
    window.addEventListener("resize", updateCardsPerView)

    return () => window.removeEventListener("resize", updateCardsPerView)
  }, [])

  useEffect(() => {
    if (!isClient || isPaused || !isMobile) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % roles.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isClient, isPaused, isMobile])

  const maxIndex = Math.max(1, roles.length - cardsPerView + 1)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % maxIndex)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + maxIndex) % maxIndex)
  }

  const getTransformValue = () => {
    if (!isClient) return 0
    const percentage = 100 / cardsPerView
    return currentSlide * percentage
  }

  return (
    <section id="skills" className="min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8 scroll-animate opacity-0 translate-y-8 transition-all duration-1000">
          <h2 className="text-gray-800 text-3xl lg:text-4xl xl:text-5xl font-bold text-left">My Skills and Tools</h2>
        </div>

        <div className="relative scroll-animate opacity-0 translate-y-8 transition-all duration-1000 delay-300">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 border-gray-300 hover:bg-white shadow-lg"
            onClick={prevSlide}
            aria-label="Previous skills"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 border-gray-300 hover:bg-white shadow-lg"
            onClick={nextSlide}
            aria-label="Next skills"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </Button>

          {/* Carousel */}
          <div className="overflow-hidden mx-8">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${getTransformValue()}%)`,
              }}
            >
              {roles.map((role) => (
                <div key={role.id} className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-2">
                  <Card className="bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 h-full">
                    <CardContent className="p-0 flex flex-col h-full">
                      <div
                        className={`${role.gradient} ${role.borderColor} p-4 rounded-t-lg border-2 border-b-0 flex-grow flex flex-col`}
                      >
                        {/* Role Title */}
                        <div className="mb-4">
                          <h3 className="text-black font-bold text-lg flex items-center gap-2">
                            <span className="text-lg">{role.emoji}</span>
                            {role.title}
                          </h3>
                        </div>

                        {/* Skills and Tools Grid */}
                        <div className="grid grid-cols-2 gap-4 flex-1">
                          {/* Skills Column */}
                          <div className="space-y-2">
                            <h4 className="text-black font-semibold text-sm flex items-center gap-1">
                              <span>🧠</span>
                              Skills:
                            </h4>
                            <ul className="space-y-1">
                              {role.skills.map((skill, skillIndex) => (
                                <li key={skillIndex} className="text-black text-xs flex items-start gap-2">
                                  <span className="text-blue-500 mt-0.5 flex-shrink-0 text-xs">•</span>
                                  <span className="leading-relaxed">{skill}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Tools Column */}
                          <div className="space-y-2">
                            <h4 className="text-black font-semibold text-sm flex items-center gap-1">
                              <span>🛠️</span>
                              Tools:
                            </h4>
                            <ul className="space-y-1">
                              {role.tools.map((tool, toolIndex) => (
                                <li key={toolIndex} className="text-black text-xs flex items-start gap-2">
                                  <span className="text-green-500 mt-0.5 flex-shrink-0 text-xs">•</span>
                                  <span className="leading-relaxed">{tool}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
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

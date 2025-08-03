"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

// Tambahkan ini jika kamu belum punya komponen Button
function Button({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 
      text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 
      shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 transform hover:scale-105`}
    >
      {children}
    </button>
  )
}

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
  
  const handleDownloadCV = () => {
    const fileId = "13NU5NaR9tItyhTbfPnrH9ufsxWzxKjOc5k7DeqySLXM"
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`

    const link = document.createElement("a")
    link.href = downloadUrl
    link.download = "Jason_Vianney_Sugiarto_Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="home" className="min-h-screen flex items-center pt-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6 scroll-animate opacity-0 translate-y-8 transition-all duration-1000">
            <div className="space-y-4">
              <h1 className="text-white text-3xl lg:text-4xl xl:text-5xl font-light leading-tight">
                Hello my name is{" "}
                <span className="font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Jason Vianney Sugiarto
                </span>
              </h1>

              <h2 className="text-cyan-300 text-xl lg:text-2xl xl:text-3xl font-semibold leading-tight">
                System Analyst, UI/UX Design,
                <br />
                Data Analyst, Remote
              </h2>

              <p className="text-white text-base lg:text-lg leading-relaxed text-justify font-medium">
                I am an IT professional with 3 years of experience in the manufacturing and finance industries, focusing
                on System Analyst, UI/UX Designer, and Data Analyst. I am skilled at translating business needs into
                efficient, secure, and user-friendly digital solutions. I have experience designing intuitive,
                data-driven interfaces and am accustomed to working across teams to ensure targeted and impactful
                results.
              </p>

              <Button onClick={handleDownloadCV}>
                Download Resume
              </Button>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="flex justify-center lg:justify-end scroll-animate opacity-0 translate-y-8 transition-all duration-1000 delay-300">
            <div className="relative">
              <div className="w-72 h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-4 border-cyan-400 shadow-2xl shadow-cyan-500/30 hover:shadow-3xl transition-shadow duration-500">
                <Image
                  src="/assets/profile/home.png"
                  alt="Jason Vianney Sugiarto"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-cyan-300 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

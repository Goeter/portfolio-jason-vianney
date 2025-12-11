"use client"

import { Card, CardContent } from "@/components/ui/card"

const roles = [
  {
    id: 1,
    title: "System Analyst",
    bgColor: "bg-gradient-to-br from-cyan-900/80 to-blue-900/80",
    borderColor: "border-cyan-400/50",
    titleColor: "text-cyan-300",
    skills: [
      "Software Requirement Specification",
      "Database SQL Management",
      "QA Support & Testing",
      "Agile Project Lifecycle",
    ],
    tools: [
      "Microsoft Visio, BPMN.io",
      "Trello",
      "SQL Clients",
      "Google Docs, MS Word",
    ],
  },
  {
    id: 2,
    title: "UI/UX Designer",
    bgColor: "bg-gradient-to-br from-purple-900/80 to-pink-900/80",
    borderColor: "border-purple-400/50",
    titleColor: "text-purple-300",
    skills: [
      "Wireframing & Prototyping",
      "User Research (Awwwards & Dribbble)",
      "HTML, CSS, PHP, Javascript",
      "React/Next.Js",
    ],
    tools: [
      "Figma, Adobe XD",
      "Adobe Illustrator",
      "Balsamiq Wireframes",
    ],
  },
  {
    id: 3,
    title: "Data Analyst",
    bgColor: "bg-gradient-to-br from-green-900/80 to-emerald-900/80",
    borderColor: "border-green-400/50",
    titleColor: "text-green-300",
    skills: [
      "Analysis Data, Cleaning",
      "Data Visualization",
      "SQL Querying",
      "Report Preparation",
    ],
    tools: [
      "Excel, Google Sheets",
      "SQL",
      "Python",
      "Power BI",
    ],
  },
]

export default function RolesShowcase() {
  return (
    <section id="roles" className="py-16 px-4 relative">
      {/* Futuristic Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-blue-900/60 to-purple-900/60 backdrop-blur-sm">
        {/* Animated Circuit Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 800 600" fill="none">
            <path
              d="M0 100 L200 100 L250 150 L400 150 L450 100 L800 100"
              stroke="#00ffff"
              strokeWidth="1"
              className="animate-pulse"
            />
            <path
              d="M0 300 L150 300 L200 250 L350 250 L400 300 L600 300 L650 350 L800 350"
              stroke="#ff00ff"
              strokeWidth="1"
              className="animate-pulse"
              style={{ animationDelay: "1s" }}
            />
            <path
              d="M0 500 L300 500 L350 450 L500 450 L550 500 L800 500"
              stroke="#00ff00"
              strokeWidth="1"
              className="animate-pulse"
              style={{ animationDelay: "2s" }}
            />
            <circle cx="200" cy="100" r="4" fill="#00ffff" className="animate-ping" />
            <circle cx="400" cy="250" r="4" fill="#ff00ff" className="animate-ping" style={{ animationDelay: "1s" }} />
            <circle cx="500" cy="450" r="4" fill="#00ff00" className="animate-ping" style={{ animationDelay: "2s" }} />
          </svg>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Professional Expertise
          </h2>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {roles.map((role) => (
            <Card
              key={role.id}
              className={`${role.bgColor} ${role.borderColor} border-2 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm`}
            >
              <CardContent className="p-6">
                {/* Role Title */}
                <div className="text-center mb-6">
                  <h3 className={`text-2xl font-bold ${role.titleColor} mb-2`}>{role.title}</h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full animate-pulse"></div>
                </div>

                {/* Skills Section */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold text-lg mb-3 flex items-center">
                    <span className="mr-2">🧠</span>
                    Skills
                  </h4>
                  <ul className="space-y-2">
                    {role.skills.map((skill, index) => (
                      <li key={index} className="flex items-start text-white text-sm">
                        <span className="text-cyan-400 mr-2 mt-1 text-xs animate-pulse">▪</span>
                        <span className="leading-relaxed">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tools Section */}
                <div>
                  <h4 className="text-white font-semibold text-lg mb-3 flex items-center">
                    <span className="mr-2">🛠️</span>
                    Tools
                  </h4>
                  <ul className="space-y-2">
                    {role.tools.map((tool, index) => (
                      <li key={index} className="flex items-start text-white text-sm">
                        <span className="text-green-400 mr-2 mt-1 text-xs animate-pulse">▪</span>
                        <span className="leading-relaxed">{tool}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

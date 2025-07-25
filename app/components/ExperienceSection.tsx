"use client"

import Image from "next/image"

const experiences = [
  {
    id: 1,
    company: "PT Topas Multi Finance - Member of Mayapada Group",
    division: "System Analyst",
    period: "March 2024 - June 2025",
    logo: "/assets/company-logos/icon_topas.png",
    details: [
      "Led system design and business analysis to develop applications that improved operational efficiency by 30% through structured document tracking, streamlined data recording, and integrated financial workflows.",
      "Processing data, cleaning data, making it useful for the company, creating a mobile application system to make it easier for users to borrow money, and from the company's perspective, obtaining location data and new user data.",
      "Providing a modern and user friendly company website that enhances product visibility, displays job vacancies, and facilitates user access, enabling follow up with new users, accelerating responses to customer inquiries, and increasing engagement levels.",
      "Designed an internal HR application with enhanced features for workforce planning, performance tracking, attendance, leave, and payroll streamlining HR processes and ensuring secure, centralized data management.",
      "Designed high fidelity user experiences and effectively aligned solutions with business and stakeholder needs.",
      "Efficiently managed tasks to meet tight deadlines, ensuring on time go live of applications with successful QA validation.",
    ],
  },
  {
    id: 2,
    company: "PT Astra Honda Motor",
    division: "System Analyst",
    period: "February 2023 - February 2024",
    logo: "/assets/company-logos/icon_astra.png",
    details: [
      "Developed internal monitoring tools to track part movement between dealers and warehouses, improving stock visibility and streamlining motorcycle assembly operations.",
      "Redesigning the old application into a new version that is more secure, has more complete features, and is more user friendly, improving the overall reliability of the system in data storage and more organized data monitoring.",
      "Performing unit testing prior to launch reduces bugs and minimizes human error by validating the system's inputs to ensure a smoother user experience at launch.",
    ],
  },
  {
    id: 3,
    company: "PT Wings Group",
    division: "Full-stack Developer",
    period: "February 2022 - February 2023",
    logo: "/assets/company-logos/icon_wings.png",
    details: [
      "Improved internal international sales system by refining features, and adding user friendly menus to enhance stock recording and digital sales monitoring across Asia.",
      "Enhanced mobile application with barcode photo capture feature, enabling seamless product recording and real time data input into a centralized database.",
      "Resolved critical bugs in web and mobile applications during field use, restoring functionality and ensuring uninterrupted user operations.",
    ],
  },
  {
    id: 4,
    company: "Universitas Surabaya",
    division: "Bachelor of Information Systems",
    period: "2017 – 2021",
    logo: "/assets/company-logos/icon_ubaya.png",
    details: [
      "Supported programming courses by assisting lecturers, guiding first semester students, and preparing as well as reviewing coding exercises to strengthen learning outcomes.",
      "Assisted in teaching Business Mathematics by guiding first semester students, conducting assistant-led classes, and providing as well as evaluating practice exercises to support student understanding.",
    ],
  },
]

export default function ExperienceSection() {
  return (
    <section id="experience" className="min-h-screen flex items-center py-20 relative">
      {/* Modern Professional Background - Same as other sections */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fillRule=%22evenodd%22%3E%3Cg fill=%22%23334155%22 fillOpacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        </div>

        {/* Subtle Gradient Overlays */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-blue-500/5 to-transparent" />
        <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-indigo-500/5 to-transparent" />

        {/* Modern Geometric Shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-xl" />
        <div className="absolute bottom-40 left-20 w-48 h-48 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/5 to-blue-400/5 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Section Title */}
        <div className="mb-8 scroll-animate opacity-0 translate-y-8 transition-all duration-1000">
          <h2 className="text-gray-800 text-3xl lg:text-4xl xl:text-5xl font-bold text-center lg:text-left">
            My Experiences
          </h2>
        </div>

        {/* Experience Timeline */}
        <div className="max-w-5xl mx-auto">
          <div className="space-y-6 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 delay-300">
            {experiences.map((experience, index) => (
              <div
                key={experience.id}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl cursor-pointer group border border-white/30"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="flex flex-col lg:flex-row lg:items-start space-y-4 lg:space-y-0 lg:space-x-6">
                  {/* Company Logo */}
                  <div className="flex-shrink-0 flex justify-center lg:justify-start">
                    <div className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center p-2 transition-transform duration-300 group-hover:scale-110">
                      <Image
                        src={experience.logo || "/placeholder.svg"}
                        alt={`${experience.company} logo`}
                        width={48}
                        height={48}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  {/* Company Details */}
                  <div className="flex-grow text-center lg:text-left">
                    {/* Header Information */}
                    <div className="mb-4">
                      <h3 className="text-gray-800 font-bold text-xl mb-1 transition-colors duration-300 group-hover:text-blue-600">
                        {experience.company}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center lg:justify-start gap-1 sm:gap-3">
                        <p className="text-blue-600 font-semibold text-lg transition-colors duration-300 group-hover:text-blue-700">
                          {experience.division}
                        </p>
                        <span className="hidden sm:block text-gray-400">•</span>
                        <p className="text-gray-500 font-medium transition-colors duration-300 group-hover:text-gray-600">
                          {experience.period}
                        </p>
                      </div>
                    </div>

                    {/* Experience Details */}
                    <div className="space-y-2">
                      <h4 className="text-gray-700 font-semibold text-base mb-3">
                        Key Responsibilities & Achievements:
                      </h4>
                      {experience.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-start space-x-2 text-left">
                          <span className="text-blue-500 mt-1 flex-shrink-0 text-sm">▪</span>
                          <p className="text-gray-700 text-sm leading-relaxed">{detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

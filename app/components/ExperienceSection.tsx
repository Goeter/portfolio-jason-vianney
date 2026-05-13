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
      "Developing systems to increase operational efficiency 50% through integrated document and financial workflows.",
      "Developing a corporate website to boost product visibility, enable secure oversight, engage customers, and list job vacancies.",
      "Creating an online loan mobile application to make it easier for customers.",
      "Building a centralized HR system to manage payroll, attendance, performance, and employee records securely.",
    ],
  },
  {
    id: 2,
    company: "PT Astra Honda Motor",
    division: "System Analyst",
    period: "February 2023 - February 2024",
    logo: "/assets/company-logos/icon_astra.png",
    details: [
      "Developed an internal application for dealer motorcycle sales, order confirmation, delivery scheduling, and document validation.",
      "Modernized an outdated system to be more secure, user-friendly, and reliable.",
      "Performing unit testing to minimize bugs and human error, ensuring smooth deployment and user adoption.",
    ],
  },
  {
    id: 3,
    company: "PT Wings Group",
    division: "Full-stack Developer",
    period: "February 2022 - February 2023",
    logo: "/assets/company-logos/icon_wings.png",
    details: [
      "Enhancing the international sales website for seamless inventory tracking and real time digital sales monitoring across Asia.",
      "Enhanced the mobile app with scanning features for accurate, real-time data capture.",
      "Resolving critical bugs on the web and mobile platforms during live operations, restoring full functionality and uninterrupted use.",
    ],
  },
  {
    id: 4,
    company: "Universitas Surabaya",
    division: "Bachelor of Information Systems",
    period: "2017 – 2021",
    logo: "/assets/company-logos/icon_ubaya.png",
    details: [
      "Assisting professors by preparing programming exercises and reviewing assignments to reinforce programming fundamentals.",
      "Opening a Business Mathematics class provides tutoring and exercises to hone mathematical logic skills in business.",
    ],
  },
]

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative flex min-h-screen items-center overflow-hidden py-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.18),transparent_32%),radial-gradient(circle_at_82%_22%,rgba(168,85,247,0.18),transparent_34%),radial-gradient(circle_at_50%_90%,rgba(59,130,246,0.16),transparent_36%),linear-gradient(135deg,#020617_0%,#0f172a_45%,#111827_100%)]" />

      <div className="absolute inset-0 opacity-[0.12]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(34,211,238,0.28)_1px,transparent_1px),linear-gradient(to_bottom,rgba(168,85,247,0.22)_1px,transparent_1px)] bg-[size:76px_76px]" />
      </div>

      <div className="absolute left-[-8rem] top-24 h-80 w-80 rounded-full bg-cyan-400/20 blur-[130px]" />
      <div className="absolute right-[-8rem] bottom-20 h-96 w-96 rounded-full bg-purple-500/20 blur-[150px]" />
      <div className="absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[170px]" />

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="mb-10 animate-[fadeInUp_0.8s_ease-out] text-center lg:text-left">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Career Journey
          </p>

          <h2 className="bg-gradient-to-r from-white via-cyan-100 to-purple-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
            My Experiences
          </h2>
        </div>

        <div className="mx-auto max-w-5xl space-y-5">
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              className="group relative animate-[fadeInUp_0.9s_ease-out_both] overflow-hidden rounded-3xl border border-cyan-400/20 bg-slate-950/65 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/45 hover:shadow-cyan-500/15 md:p-6"
              style={{
                animationDelay: `${index * 130}ms`,
              }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />

              <div className="flex flex-col gap-5 md:flex-row md:items-start">
                <div className="flex justify-center md:justify-start">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/95 p-2.5 shadow-lg shadow-cyan-500/10 transition duration-300 group-hover:scale-105 md:h-18 md:w-18">
                    <Image
                      src={experience.logo || "/placeholder.svg"}
                      alt={`${experience.company} logo`}
                      width={56}
                      height={56}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold leading-snug text-white transition duration-300 group-hover:text-cyan-100 md:text-xl">
                      {experience.company}
                    </h3>

                    <div className="mt-3 flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start">
                      <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-sm font-semibold text-cyan-200">
                        {experience.division}
                      </span>

                      <span className="rounded-full border border-purple-300/25 bg-purple-300/10 px-3 py-1 text-sm font-medium text-purple-200">
                        {experience.period}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <h4 className="mb-3 text-sm font-semibold text-cyan-200 md:text-base">
                      Key Responsibilities & Achievements:
                    </h4>

                    <div className="space-y-2.5">
                      {experience.details.map((detail, detailIndex) => (
                        <div
                          key={detailIndex}
                          className="flex items-start gap-3 text-left"
                        >
                          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)]" />
                          <p className="text-sm leading-relaxed text-slate-300">
                            {detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}

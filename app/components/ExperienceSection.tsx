"use client"

import Image from "next/image"
import { BriefcaseBusiness, CalendarDays, GraduationCap, MapPin } from "lucide-react"
import { education, experiences } from "@/lib/site-content"
import { BLUR_DATA_URL } from "@/lib/utils"
import { motion } from "framer-motion"
import { useScrollReveal } from "@/hooks/useScrollReveal"
import { useParallax } from "@/hooks/useParallax"

export default function ExperienceSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.06 })
  const { ref: parallaxRef, y: parallaxY } = useParallax(55)

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="section-transition-soft relative overflow-hidden py-16 sm:py-20 lg:flex lg:min-h-screen lg:items-center"
    >
      <div ref={parallaxRef} className="absolute inset-0 z-0">
        <motion.div style={{ y: parallaxY }} className="h-full w-full">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(212,168,67,0.16),transparent_32%),radial-gradient(circle_at_82%_22%,rgba(74,124,191,0.18),transparent_34%),radial-gradient(circle_at_45%_92%,rgba(220,198,148,0.10),transparent_38%),linear-gradient(135deg,#02030a_0%,#07091a_48%,#060d1c_100%)]" />

          <div className="absolute inset-0 opacity-[0.13]">
            <div className="experience-grid absolute inset-0 bg-[linear-gradient(to_right,rgba(212,168,67,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(74,124,191,0.22)_1px,transparent_1px)] bg-[size:84px_84px]" />
          </div>

          <div className="experience-orb absolute left-[-9rem] top-24 h-80 w-80 rounded-full bg-[#C8A96E]/15 blur-[140px]" />
          <div className="experience-orb-delay absolute right-[-9rem] bottom-24 h-96 w-96 rounded-full bg-blue-500/15 blur-[160px]" />
          <div className="experience-orb-slow absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-400/8 blur-[170px]" />
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden sm:block">
        <span className="experience-line left-[10%] top-[20%]" />
        <span className="experience-line experience-line-delay left-[74%] top-[31%]" />
        <span className="experience-line experience-line-slow left-[42%] top-[73%]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div
          className={`mx-auto mb-10 max-w-3xl text-center reveal-hidden sm:mb-14 lg:mx-0 lg:text-left ${
            isVisible ? "reveal-visible" : ""
          }`}
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-[#C8A96E] sm:text-sm sm:tracking-[0.32em]">
            Career Journey
          </p>

          <h2 className="font-serif bg-gradient-to-r from-[#F4EDD8] via-[#C8A96E] to-[#E8DAB8] bg-clip-text pb-2 text-3xl font-semibold leading-[1.12] tracking-[-0.03em] text-transparent drop-shadow-[0_0_28px_rgba(212,168,67,0.18)] sm:text-4xl md:text-5xl lg:text-6xl">
            Experience Timeline
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-400 md:text-base">
            A focused record of professional, freelance, teaching, and academic experiences across system analysis, fullstack development, UI/UX design, data analysis, and tutoring.
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          <div className="absolute left-5 top-3 hidden h-[calc(100%-1.5rem)] w-px bg-gradient-to-b from-[#C8A96E]/60 via-[#C8A96E]/45 to-transparent md:block" />

          <div className="space-y-5">
            {experiences.map((experience, index) => (
              <article
                key={experience.id}
                className={`group relative overflow-hidden rounded-[24px] border border-white/10 bg-[#060d1c]/78 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl transition-all duration-700 ease-out hover:-translate-y-1 hover:border-[#C8A96E]/35 hover:bg-[#060d1c]/88 hover:shadow-[0_22px_65px_rgba(0,0,0,0.48)] sm:rounded-[28px] sm:p-5 md:ml-12 md:p-6 reveal-hidden ${
                  isVisible ? "reveal-visible" : ""
                }`}
                style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C8A96E]/55 to-transparent" />
                <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-[#C8A96E]/5 transition duration-500 group-hover:bg-[#C8A96E]/10 sm:h-28 sm:w-28" />

                <div className="absolute left-[-3.6rem] top-8 hidden h-10 w-10 items-center justify-center rounded-full border border-[#C8A96E]/35 bg-[#060d1c] text-sm font-semibold text-[#C8A96E] shadow-[0_0_24px_rgba(212,168,67,0.16)] md:flex">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  <div className="flex items-center justify-center sm:justify-start">
                    <div className="relative flex h-[4.25rem] w-[4.25rem] shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/95 p-1.5 shadow-lg shadow-black/20 transition duration-300 group-hover:scale-105 sm:h-20 sm:w-20 sm:p-2">
                      <Image
                        src={experience.logo || "/placeholder.svg"}
                        alt={`${experience.company} logo`}
                        width={80}
                        height={80}
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </div>

                  <div className="min-w-0 flex-1 text-center sm:text-left">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0">
                        <h3 className="break-words text-lg font-bold leading-snug text-[#F4EDD8] transition duration-300 group-hover:text-white md:text-xl">
                          {experience.company}
                        </h3>

                        <div className="mt-3 inline-flex max-w-full items-center gap-2 rounded-full border border-[#C8A96E]/25 bg-[#C8A96E]/10 px-3 py-1 text-left text-xs font-semibold leading-relaxed text-[#f3d585] sm:text-sm">
                          <BriefcaseBusiness size={15} className="shrink-0" />
                          <span>{experience.division}</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-center gap-2 sm:items-start lg:items-end">
                        <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#C8A96E]/30 bg-[#C8A96E]/12 px-3 py-1 text-xs font-medium leading-relaxed text-[#b9d7ff] sm:text-sm">
                          <CalendarDays size={15} className="shrink-0" />
                          <span>{experience.period}</span>
                        </span>

                        {(experience.location || experience.workMode) && (
                          <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium leading-relaxed text-slate-300">
                            <MapPin size={14} className="shrink-0" />
                            <span>
                              {[experience.location, experience.workMode]
                                .filter(Boolean)
                                .join(" · ")}
                            </span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                      <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#C8A96E]/90 sm:text-sm">
                        Key Responsibilities & Achievements
                      </h4>

                      <div className="space-y-2.5">
                        {experience.details.map((detail, detailIndex) => (
                          <div
                            key={detailIndex}
                            className="flex items-start gap-3 text-left"
                          >
                            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C8A96E] shadow-[0_0_12px_rgba(212,168,67,0.72)]" />
                            <p className="text-sm leading-relaxed text-slate-300">
                              {detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* ── Education ── */}
          <div className="mx-auto mt-14 max-w-3xl">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold-400/50" />
              <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-gold-400/80">
                <GraduationCap className="h-4 w-4" />
                Education
              </span>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold-400/50" />
            </div>

            <div className="flex flex-col items-center gap-4 rounded-3xl border border-gold-400/20 bg-slate-950/60 px-6 py-6 text-center backdrop-blur-sm sm:flex-row sm:items-center sm:gap-5 sm:text-left">
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-white/5">
                <Image
                  src={education.logo}
                  alt={`${education.school} logo`}
                  fill
                  sizes="56px"
                  className="object-contain p-1.5"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                />
              </span>

              <div className="min-w-0 flex-1">
                <h3 className="font-serif text-xl font-semibold text-gold-100 md:text-2xl">
                  {education.degree}
                </h3>
                <p className="mt-0.5 text-sm text-slate-300">{education.school}</p>
              </div>

              <div className="flex shrink-0 flex-col items-center gap-1.5 sm:items-end">
                <span className="rounded-full border border-gold-400/30 bg-gold-400/10 px-3 py-1 text-[11px] font-bold tracking-wide text-gold-200">
                  {education.result}
                </span>
                <span className="text-[11px] text-slate-400">{education.period}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

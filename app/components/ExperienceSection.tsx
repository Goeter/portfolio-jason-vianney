"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { BriefcaseBusiness, CalendarDays, MapPin } from "lucide-react"
import { experiences } from "@/lib/site-content"

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="section-transition-soft relative flex min-h-screen items-center overflow-hidden py-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(212,168,67,0.16),transparent_32%),radial-gradient(circle_at_82%_22%,rgba(74,124,191,0.18),transparent_34%),radial-gradient(circle_at_45%_92%,rgba(34,211,238,0.10),transparent_38%),linear-gradient(135deg,#02030a_0%,#07091a_48%,#0b1020_100%)]" />

      <div className="absolute inset-0 opacity-[0.13]">
        <div className="experience-grid absolute inset-0 bg-[linear-gradient(to_right,rgba(212,168,67,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(74,124,191,0.22)_1px,transparent_1px)] bg-[size:84px_84px]" />
      </div>

      <div className="experience-orb absolute left-[-9rem] top-24 h-80 w-80 rounded-full bg-[#d4a843]/15 blur-[140px]" />
      <div className="experience-orb-delay absolute right-[-9rem] bottom-24 h-96 w-96 rounded-full bg-blue-500/15 blur-[160px]" />
      <div className="experience-orb-slow absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/8 blur-[170px]" />

      <div className="absolute inset-0 overflow-hidden">
        <span className="experience-line left-[10%] top-[20%]" />
        <span className="experience-line experience-line-delay left-[74%] top-[31%]" />
        <span className="experience-line experience-line-slow left-[42%] top-[73%]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div
          className={`mb-14 max-w-3xl text-center transition-all duration-700 ease-out lg:text-left ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.32em] text-[#d4a843]">
            Career Journey
          </p>

          <h2 className="font-serif bg-gradient-to-r from-[#f8f1d8] via-[#d4a843] to-[#8cc8ff] bg-clip-text pb-2 text-4xl font-semibold leading-[1.12] tracking-[-0.03em] text-transparent drop-shadow-[0_0_28px_rgba(212,168,67,0.18)] md:text-5xl lg:text-6xl">
            Experience Timeline
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-400 md:text-base">
            A focused record of professional, freelance, teaching, and academic experiences across system analysis, fullstack development, UI/UX design, data analysis, and tutoring.
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          <div className="absolute left-5 top-3 hidden h-[calc(100%-1.5rem)] w-px bg-gradient-to-b from-[#d4a843]/60 via-[#4a7cbf]/45 to-transparent md:block" />

          <div className="space-y-5">
            {experiences.map((experience, index) => (
              <article
                key={experience.id}
                className={`group relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0b1020]/78 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl transition-all duration-700 ease-out hover:-translate-y-1 hover:border-[#d4a843]/35 hover:bg-[#0d1226]/88 hover:shadow-[0_22px_65px_rgba(0,0,0,0.48)] md:ml-12 md:p-6 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: isVisible ? `${index * 110}ms` : "0ms" }}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4a843]/55 to-transparent" />
                <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-[#d4a843]/5 transition duration-500 group-hover:bg-[#d4a843]/10" />

                <div className="absolute left-[-3.6rem] top-8 hidden h-10 w-10 items-center justify-center rounded-full border border-[#d4a843]/35 bg-[#0d1226] text-sm font-semibold text-[#d4a843] shadow-[0_0_24px_rgba(212,168,67,0.16)] md:flex">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="flex flex-col gap-5 md:flex-row md:items-start">
                  <div className="flex items-center justify-center md:justify-start">
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/95 p-2.5 shadow-lg shadow-black/20 transition duration-300 group-hover:scale-105">
                      <Image
                        src={experience.logo || "/placeholder.svg"}
                        alt={`${experience.company} logo`}
                        width={56}
                        height={56}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </div>

                  <div className="min-w-0 flex-1 text-center md:text-left">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <h3 className="text-lg font-bold leading-snug text-[#f8f1d8] transition duration-300 group-hover:text-white md:text-xl">
                          {experience.company}
                        </h3>

                        <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#d4a843]/25 bg-[#d4a843]/10 px-3 py-1 text-sm font-semibold text-[#f3d585]">
                          <BriefcaseBusiness size={15} />
                          <span>{experience.division}</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-center gap-2 lg:items-end">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#4a7cbf]/30 bg-[#4a7cbf]/12 px-3 py-1 text-sm font-medium text-[#b9d7ff]">
                          <CalendarDays size={15} />
                          {experience.period}
                        </span>

                        {(experience.location || experience.workMode) && (
                          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-slate-300">
                            <MapPin size={14} />
                            {[experience.location, experience.workMode]
                              .filter(Boolean)
                              .join(" · ")}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                      <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#d4a843]/90">
                        Key Responsibilities & Achievements
                      </h4>

                      <div className="space-y-2.5">
                        {experience.details.map((detail, detailIndex) => (
                          <div
                            key={detailIndex}
                            className="flex items-start gap-3 text-left"
                          >
                            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#d4a843] shadow-[0_0_12px_rgba(212,168,67,0.72)]" />
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
        </div>
      </div>

      <style jsx>{`
        .experience-grid {
          animation: gridMove 20s linear infinite;
        }

        .experience-orb {
          animation: orbFloat 8s ease-in-out infinite;
        }

        .experience-orb-delay {
          animation: orbFloat 10s ease-in-out infinite;
          animation-delay: 1.5s;
        }

        .experience-orb-slow {
          animation: orbPulse 7s ease-in-out infinite;
        }

        .experience-line {
          position: absolute;
          width: 160px;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(212, 168, 67, 0.76),
            transparent
          );
          transform: rotate(-24deg);
          animation: lineMove 5s ease-in-out infinite;
        }

        .experience-line-delay {
          animation-delay: 1.4s;
        }

        .experience-line-slow {
          animation-delay: 2.2s;
          animation-duration: 7s;
        }

        @keyframes gridMove {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(84px, 84px, 0);
          }
        }

        @keyframes orbFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(24px, -18px, 0) scale(1.08);
          }
        }

        @keyframes orbPulse {
          0%,
          100% {
            opacity: 0.7;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.08);
          }
        }

        @keyframes lineMove {
          0% {
            opacity: 0;
            transform: translate3d(-40px, 30px, 0) rotate(-24deg);
          }
          35% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate3d(90px, -45px, 0) rotate(-24deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .experience-grid,
          .experience-orb,
          .experience-orb-delay,
          .experience-orb-slow,
          .experience-line {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}

"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ArrowUpRight } from "lucide-react"

// ============================================================
// TYPES
// ============================================================

interface Project {
  id: number
  title: string
  description: string
  image: string
  link?: string | null
}

// ============================================================
// DATA
// ============================================================

const projects: Project[] = [
  {
    id: 1,
    title: "PT Topas Multi Finance Website",
    description:
      "Public-facing corporate website that sells Topas Multi Finance products and builds brand awareness and customer trust through professional digital presence.",
    image: "/assets/projects/topas-website.png",
    link: "https://frontend.topasmultifinance.co.id",
  },
  {
    id: 2,
    title: "PT. Alfa Berkat Sigma",
    description:
      "Professional plumbing supply store website showcasing products, company profile, and modern digital branding.",
    image: "/assets/projects/sigma-picture.png",
    link: "https://sigma-andrew-ten.vercel.app",
  },
  {
    id: 3,
    title: "Topas Multi Finance Mobile Application",
    description:
      "Mobile application for customers and internal staff with loan management, monitoring, and financial service features.",
    image: "/assets/projects/mobile-app/combined",
  },
  {
    id: 4,
    title: "HR Topas Application",
    description:
      "Integrated HR platform for attendance, payroll, KPI workforce planning, and recruitment management.",
    image: "/assets/projects/hr-topas-application.png",
  },
  {
    id: 5,
    title: "Monitoring & Feedback Prospect",
    description:
      "Internal monitoring system for dealer motorcycle sales, order confirmation, scheduling, and document tracking.",
    image: "/assets/projects/monitoring-server.png",
  },
  {
    id: 6,
    title: "Vehicle Registration Certificate System",
    description:
      "Systemized disbursement note printing workflow replacing manual handwriting with secure digital processing.",
    image: "/assets/projects/vehicle-registration-certificate-system.png",
  },
  {
    id: 7,
    title: "Mobile Mata Elang & Subscribe",
    description:
      "Vehicle tracking application for field users and third parties with integrated subscription management.",
    image: "/assets/projects/mobile-mata-elang/combined",
  },
  {
    id: 8,
    title: "Mobile Loan Flow Survey",
    description:
      "Survey application for debtor field visits with centralized database storage and operational follow-up support.",
    image: "/assets/projects/flow-survey-pinjaman.jpg",
  },
  {
    id: 9,
    title: "Dashboard Admin Ticketing",
    description:
      "Real-time web dashboard monitoring system for managing operational ticketing workflows efficiently.",
    image: "/assets/projects/dashboard_ticketing.png",
  },
]

// ============================================================
// BATIK TECHNOLOGY BACKGROUND
// ============================================================

function BatikBackground() {
  return (
    <svg
      className="absolute inset-0 h-full w-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="kraton-tech"
          x="0"
          y="0"
          width="72"
          height="72"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="36" cy="36" r="1.4" fill="#d4a843" />

          <circle
            cx="36"
            cy="36"
            r="10"
            fill="none"
            stroke="#d4a843"
            strokeWidth="0.4"
          />

          <circle
            cx="36"
            cy="36"
            r="20"
            fill="none"
            stroke="#4a7cbf"
            strokeWidth="0.28"
          />

          <line
            x1="36"
            y1="0"
            x2="36"
            y2="72"
            stroke="#4a7cbf"
            strokeWidth="0.2"
          />

          <line
            x1="0"
            y1="36"
            x2="72"
            y2="36"
            stroke="#4a7cbf"
            strokeWidth="0.2"
          />

          <polygon
            points="36,24 42,36 36,48 30,36"
            fill="none"
            stroke="#d4a843"
            strokeWidth="0.3"
          />
        </pattern>

        <linearGradient id="overlay" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#07091a" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#07091a" stopOpacity="0" />
          <stop offset="100%" stopColor="#07091a" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      <rect
        width="100%"
        height="100%"
        fill="url(#kraton-tech)"
        opacity="0.12"
      />

      <rect width="100%" height="100%" fill="url(#overlay)" />
    </svg>
  )
}

// ============================================================
// PROJECT IMAGE
// ============================================================

function ProjectImage({ project }: { project: Project }) {
  if (project.image.includes("mobile-app/combined")) {
    return (
      <div className="flex h-full gap-[3px] bg-[#050816] p-[6px]">
        <Image
          src="/assets/projects/mobile-app/topas-mobile-dashboard.jpeg"
          alt="Dashboard"
          width={120}
          height={240}
          className="h-full w-1/3 rounded-lg object-cover"
        />

        <Image
          src="/assets/projects/mobile-app/topas-mobile-menu.jpeg"
          alt="Menu"
          width={120}
          height={240}
          className="h-full w-1/3 rounded-lg object-cover"
        />

        <Image
          src="/assets/projects/mobile-app/topas-mobile-profile.jpeg"
          alt="Profile"
          width={120}
          height={240}
          className="h-full w-1/3 rounded-lg object-cover"
        />
      </div>
    )
  }

  if (project.image.includes("mobile-mata-elang/combined")) {
    return (
      <div className="flex h-full gap-[3px] bg-[#050816] p-[6px]">
        <Image
          src="/assets/projects/mobile-mata-elang/foto-1.png"
          alt="Foto 1"
          width={120}
          height={240}
          className="h-full w-1/3 rounded-lg object-cover"
        />

        <Image
          src="/assets/projects/mobile-mata-elang/foto-2.png"
          alt="Foto 2"
          width={120}
          height={240}
          className="h-full w-1/3 rounded-lg object-cover"
        />

        <Image
          src="/assets/projects/mobile-mata-elang/foto-3.png"
          alt="Foto 3"
          width={120}
          height={240}
          className="h-full w-1/3 rounded-lg object-cover"
        />
      </div>
    )
  }

  return (
    <Image
      src={project.image}
      alt={project.title}
      width={800}
      height={500}
      className="
        h-full w-full object-cover
        transition-transform duration-700
        group-hover:scale-105
      "
    />
  )
}

// ============================================================
// PROJECT CARD
// ============================================================

function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className="
        group relative flex h-full flex-col overflow-hidden rounded-[28px]
        border border-[#1d2945]
        bg-[#0b1020]/95
        backdrop-blur-xl
        transition-all duration-500
        hover:-translate-y-1.5
        hover:border-[#d4a84340]
        hover:shadow-[0_22px_55px_rgba(0,0,0,0.55)]
      "
    >
      {/* Glow */}
      <div
        className="
          absolute inset-0 opacity-0
          transition-opacity duration-500
          group-hover:opacity-100
        "
        style={{
          background:
            "radial-gradient(circle at top right, rgba(212,168,67,0.08), transparent 55%)",
        }}
      />

      {/* Thumbnail */}
      <div
        className="
          relative aspect-video overflow-hidden
          border-b border-[#18243d]
          bg-[#050816]
        "
      >
        <ProjectImage project={project} />

        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-[#050816]
            via-transparent
            to-transparent
          "
        />

        <div
          className="
            absolute left-4 top-4 z-10
            rounded-md border border-[#d4a84325]
            bg-[#07091ab8]
            px-3 py-[5px]
            font-mono text-[10px]
            tracking-[0.18em]
            text-[#d4a8438a]
            backdrop-blur-md
          "
        >
          PROJECT #{project.id}
        </div>
      </div>

      {/* Content */}
      <div className="relative flex flex-1 flex-col p-6">
        {/* Title */}
        <h3
          className="
            min-h-[58px]
            text-[18px]
            font-medium
            leading-[1.5]
            text-[#d7ccb0]
          "
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="
            mt-3 flex-1
            text-[14px]
            leading-[1.9]
            text-[#6d7f9f]
          "
        >
          {project.description}
        </p>

        {/* Bottom */}
        <div className="mt-6">
          <div className="mb-4 h-px bg-[#1a2540]" />

          <div className="flex min-h-[24px] items-center">
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-2
                  text-[12px]
                  tracking-[0.12em]
                  text-[#4a8fd4]
                  transition-colors duration-300
                  hover:text-[#7cb6f5]
                "
              >
                VIEW WEBSITE
                <ArrowUpRight size={14} />
              </a>
            ) : (
              <span className="inline-block h-[20px]" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// PAGE
// ============================================================

export default function AllProjects() {
  return (
    <main
      className="
        relative min-h-screen overflow-hidden
        bg-[#07091a]
      "
    >
      {/* Background */}
      <BatikBackground />

      {/* Glow */}
      <div
        className="
          absolute left-1/2 top-[-220px]
          h-[520px] w-[520px]
          -translate-x-1/2
          rounded-full blur-3xl
        "
        style={{
          background:
            "radial-gradient(circle, rgba(74,124,191,0.14), transparent 70%)",
        }}
      />

      {/* NAVBAR */}
      <header
        className="
          sticky top-0 z-50
          border-b border-[#18243d]
          bg-[#07091ad9]
          backdrop-blur-xl
        "
      >
        <div
          className="
            relative mx-auto flex h-[72px]
            w-full max-w-7xl
            items-center justify-between
            px-5 sm:px-8 lg:px-12
          "
        >
          {/* Back */}
          <Link href="/#projects">
            <button
              className="
                group flex items-center gap-3
                rounded-2xl border border-[#d4a84330]
                bg-[#0d1226]
                px-3 py-2.5
                text-[#d4a843]
                transition-all duration-300
                hover:border-[#d4a84360]
                hover:bg-[#131936]
              "
            >
              <div
                className="
                  flex h-9 w-9 items-center justify-center
                  rounded-full border border-[#d4a84335]
                  bg-[#11172d]
                  transition-transform duration-300
                  group-hover:-translate-x-1
                "
              >
                <ChevronLeft size={18} />
              </div>

              <span
                className="
                  hidden text-[13px]
                  tracking-[0.08em]
                  sm:inline
                "
              >
                Back
              </span>
            </button>
          </Link>

          {/* Title */}
          <div
            className="
              absolute left-1/2
              -translate-x-1/2
              text-center
            "
          >
            <span
              className="
                block text-[10px]
                uppercase tracking-[0.28em]
                text-[#4a7cbf]
              "
            >
              Portfolio Collection
            </span>

            <h1
              className="
                mt-[3px]
                font-serif text-[22px]
                font-medium tracking-[0.03em]
                text-[#d4a843]
                sm:text-[26px]
              "
            >
              Project Archive
            </h1>
          </div>

          {/* Spacer */}
          <div className="w-[52px] sm:w-[95px]" />
        </div>
      </header>

      {/* CONTENT */}
      <section
        className="
          relative z-10 mx-auto
          w-full max-w-7xl
          px-5 pt-10 pb-16
          sm:px-8 lg:px-12
        "
      >
        {/* Description */}
        <div className="mb-10 max-w-3xl">
          <p
            className="
              text-[15px]
              leading-[1.9]
              text-[#6d7f9f]
            "
          >
            A curated collection of enterprise systems, mobile applications,
            digital platforms, and internal solutions crafted with a focus on
            modern technology, usability, and scalable architecture.
          </p>
        </div>

        {/* Divider */}
        <div
          className="relative mb-10 h-px"
          style={{ background: "#d4a84318" }}
        >
          <span
            className="absolute left-0 top-0 h-px w-[90px]"
            style={{ background: "#d4a843" }}
          />
        </div>

        {/* Grid */}
        <div
          className="
            grid grid-cols-1 gap-7
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

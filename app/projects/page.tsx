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
}

// ============================================================
// DATA
// ============================================================

const projects: Project[] = [
  {
    id: 1,
    title: "PT Topas Multi Finance Website",
    description:
      "Public-facing corporate website that sells Topas Multi Finance products and builds brand awareness and customer trust through professional digital presence",
    image: "/assets/projects/topas-website.png",
  },
  {
    id: 2,
    title: "PT. Alfa Berkat Sigma",
    description:
      "Public-facing corporate website that sells Topas Multi Finance products and builds brand awareness and customer trust through professional digital presence",
    image: "/assets/projects/sigma-picture.png",
  },
  {
    id: 3,
    title: "Topas Multi Finance Mobile Application",
    description:
      "Mobile application for Topas Multi Finance customers and internal staff with features for loan management, disbursement tracking, customer monitoring, and comprehensive financial services",
    image: "/assets/projects/mobile-app/combined",
  },
  {
    id: 4,
    title: "HR Topas Application",
    description:
      "A project to develop an HRD application for tracking employee attendance, recording absences, tracking salaries, workforce planning with KPIs, and comprehensive recruitment process management",
    image: "/assets/projects/hr-topas-application.png",
  },
  {
    id: 5,
    title: "Monitoring & Feedback Prospect",
    description:
      "Developing an internal application for recording motorcycle sales from dealers, order confirmation, delivery scheduling, and document completeness checks.",
    image: "/assets/projects/monitoring-server.png",
  },
  {
    id: 6,
    title: "Vehicle Registration Certificate System",
    description:
      "A new menu for printing the disbursement note, which was previously written manually by hand. It can now be printed more neatly and quickly using the system, and is stored securely in the system",
    image: "/assets/projects/vehicle-registration-certificate-system.png",
  },
  {
    id: 7,
    title: "Mobile Mata Elang & Subscribe",
    description:
      "Create a mobile application to track credit vehicles and help field users or third parties use the application by subscribing to our application.",
    image: "/assets/projects/mobile-mata-elang/combined",
  },
  {
    id: 8,
    title: "Mobile Loan Flow Survey",
    description:
      "Create a survey application to be used when visiting debtors' homes, so that the data is centralized and neatly stored in the company database, and can be followed up properly.",
    image: "/assets/projects/flow-survey-pinjaman.jpg",
  },
  {
    id: 9,
    title: "Dashboard Admin Ticketing",
    description:
      "Create a website dashboard monitoring ticketing.",
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
          <stop offset="0%" stopColor="#07091a" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#07091a" stopOpacity="0" />
          <stop offset="100%" stopColor="#07091a" stopOpacity="0.65" />
        </linearGradient>
      </defs>

      <rect width="100%" height="100%" fill="url(#kraton-tech)" opacity="0.12" />
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
      <div className="flex h-full gap-[2px] bg-[#050816] p-[6px]">
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
      <div className="flex h-full gap-[2px] bg-[#050816] p-[6px]">
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
      width={600}
      height={400}
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
        group relative overflow-hidden rounded-3xl
        border border-[#1e2a46]
        bg-[#0b1020]/95
        backdrop-blur-xl
        transition-all duration-500
        hover:-translate-y-1
        hover:border-[#d4a84345]
        hover:shadow-[0_18px_50px_rgba(0,0,0,0.55)]
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
          border-b border-[#1b2742]
          bg-[#060c18]
        "
      >
        <ProjectImage project={project} />

        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-[#060816]
            via-transparent
            to-transparent
          "
        />

        <div
          className="
            absolute left-4 top-4
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
      <div className="relative flex flex-col p-6">
        <h3
          className="
            mb-3 text-[18px]
            font-medium leading-[1.45]
            text-[#d7ccb0]
          "
        >
          {project.title}
        </h3>

        <p
          className="
            flex-1 text-[14px]
            leading-[1.85]
            text-[#6d7f9f]
          "
        >
          {project.description}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <div className="h-px flex-1 bg-[#1c2945]" />

          <div
            className="
              ml-4 flex items-center gap-1
              text-[12px]
              tracking-[0.14em]
              text-[#4a8fd4]
            "
          >
            VIEW
            <ArrowUpRight size={14} />
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

      {/* Top Glow */}
      <div
        className="
          absolute left-1/2 top-[-200px]
          h-[500px] w-[500px]
          -translate-x-1/2
          rounded-full blur-3xl
        "
        style={{
          background:
            "radial-gradient(circle, rgba(74,124,191,0.14), transparent 70%)",
        }}
      />

      {/* Content */}
      <div
        className="
          relative z-10 mx-auto
          w-full max-w-7xl
          px-5 py-14
          sm:px-8 lg:px-12
        "
      >
        {/* HEADER */}
        <div
          className="
            mb-14 flex flex-col gap-8
            md:flex-row md:items-center md:justify-between
          "
        >
          {/* Back Button */}
          <Link href="/#projects">
            <button
              className="
                group inline-flex items-center gap-3
                rounded-2xl border border-[#d4a84330]
                bg-[#0c1224]
                px-5 py-3
                text-[14px]
                tracking-[0.04em]
                text-[#d4a843]
                transition-all duration-300
                hover:border-[#d4a84370]
                hover:bg-[#121933]
                hover:shadow-[0_0_30px_rgba(212,168,67,0.08)]
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

              <div className="flex flex-col items-start leading-none">
                <span className="text-[11px] uppercase tracking-[0.18em] text-[#5c7092]">
                  Navigation
                </span>

                <span className="mt-[5px] font-medium">
                  Back to Home
                </span>
              </div>
            </button>
          </Link>

          {/* Title */}
          <div className="text-left md:text-right">
            <span
              className="
                mb-3 inline-block
                text-[11px]
                uppercase tracking-[0.28em]
                text-[#4a7cbf]
              "
            >
              Portfolio Collection
            </span>

            <h1
              className="
                font-serif text-[clamp(38px,6vw,68px)]
                font-medium leading-none
                text-[#d4a843]
              "
            >
              Project Archive
            </h1>

            <p
              className="
                mt-4 max-w-[620px]
                text-[15px] leading-[1.9]
                text-[#6d7f9f]
                md:ml-auto
              "
            >
              A curated collection of enterprise systems, mobile applications,
              digital platforms, and internal solutions crafted with a focus on
              performance, usability, and modern technology architecture.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div
          className="relative mb-14 h-px"
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
      </div>
    </main>
  )
}

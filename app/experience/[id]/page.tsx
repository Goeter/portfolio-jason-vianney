"use client"

import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

interface Project {
  id: number
  title: string
  description: string
  image: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "PT Topas Multi Finance Website",
    description:
      "A comprehensive corporate website for PT Topas Multi Finance that serves as the primary digital touchpoint for customers and stakeholders. This public-facing platform showcases the company's financial products and services while building strong brand awareness and customer trust. The website features a modern, professional design that reflects the company's commitment to providing accessible financial solutions. Key features include detailed product information, easy financing options, accurate terms presentation, and quick approval processes. The site is built with user experience in mind, ensuring that potential customers can easily navigate through various financial products and services. It also includes customer testimonials, company information, and regulatory compliance details including OJK (Otoritas Jasa Keuangan) certification, which builds additional trust with Indonesian customers seeking reliable financial services.",
    image: "/assets/projects/topas-website.png",
  },
  {
    id: 2,
    title: "Topas Multi Finance Mobile Application",
    description:
      "A comprehensive mobile application designed for both Topas Multi Finance customers and internal staff, featuring a modern and intuitive user interface. The app provides secure access to financing services with a personalized dashboard that welcomes users and displays their account information. Key features include financing application submission (Ajukan Pembiayaan), contract management (Kontrak Pembiayaan), multiple payment methods (Cara Pembayaran), and outlet location finder (Lokasi Outlet). The application also offers customer reference management (Referensi Calon), direct communication channels (Hubungi Kami), privacy policy access (Kebijakan Privasi), and comprehensive FAQ section. Users can manage their personal data, view loan portfolios with maturity tracking, perform loan calculation simulations, and access real-time account information. The app features secure user authentication, profile management, and seamless navigation between different service modules, making it easy for customers to access Topas Multi Finance services on-the-go.",
    image: "/assets/projects/mobile-app/combined",
  },
  {
    id: 3,
    title: "HR Topas Application",
    description:
      "A comprehensive Human Resources management system developed for PT Topas Multi Finance to streamline HR operations and improve workforce management efficiency. The application features a modern dashboard displaying key HR metrics including employment status distribution, length of service analytics, job level hierarchy, and gender diversity statistics. The system enables tracking of employee attendance, recording absences, managing salary information, workforce planning with KPIs, and comprehensive recruitment process management. Key features include automated attendance tracking with check-in/check-out functionality, leave management system, expense reimbursement tracking, payroll processing automation, and performance evaluation tools. The application also supports Manpower Planning (MPP) processes and KPI-based recruitment workflows, making it easier for HR departments to manage their workforce effectively and make data-driven decisions.",
    image: "/assets/projects/hr-topas-application.png",
  },
  {
    id: 4,
    title: "Monitoring Server",
    description:
      "An advanced monitoring application developed as the new version of S_AHMITSYS023, designed to monitor and display data transactions between AHM (Astra Honda Motor) and its dealer network. The system provides comprehensive monitoring capabilities for B2B data exchanges, tracking both inbound and outbound data flows stored on the AHM B2B server. The application features separate user interfaces for AHM internal users and main dealer users, each with tailored access permissions and functionalities. Key features include real-time monitoring of data synchronization, filtering capabilities by various parameters such as MD Code, Dealer Code, Business Type, and date ranges. The system provides detailed views of inbound and outbound headers, comprehensive search functionality, data re-run capabilities, text download options, and notification systems for dealer codes, user active periods, and license active periods. This monitoring solution ensures data integrity, improves operational visibility, and facilitates quick troubleshooting of B2B communication issues.",
    image: "/assets/projects/monitoring-server.png",
  },
  {
    id: 5,
    title: "Vehicle Registration Certificate System",
    description:
      "A comprehensive digital system designed to modernize and streamline the vehicle registration certificate (BPKB) management process. This system replaces the traditional manual, handwritten disbursement notes with a secure, digital solution that ensures accuracy, efficiency, and proper documentation. The application features multiple integrated modules including contract management, customer information tracking, vehicle details recording, and comprehensive document generation capabilities. Key functionalities include automated BPKB processing, secure data storage and retrieval, online verification systems, and multiple lookup dialogs for different data types. The system provides enhanced security features, audit trails, and real-time status tracking. Users can efficiently manage the entire BPKB lifecycle from initial registration through final disbursement, with built-in validation checks and error prevention mechanisms. The digital transformation has significantly reduced processing time, minimized human errors, and improved overall customer satisfaction while maintaining compliance with regulatory requirements.",
    image: "/assets/projects/vehicle-registration-certificate-system.png",
  },
]

interface ExperienceDetailProps {
  params: {
    id: string
  }
}

export default function ExperienceDetail({ params }: ExperienceDetailProps) {
  const projectId = Number.parseInt(params.id, 10)

  if (isNaN(projectId)) {
    notFound()
  }

  const project = projects.find((p) => p.id === projectId)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-x-hidden">
      {/* Tech Background Pattern */}
      <div className="fixed inset-0">
        {/* Purple geometric lines on the right */}
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <svg className="w-full h-full opacity-30" viewBox="0 0 400 800" fill="none" aria-hidden="true">
            <path
              d="M200 0L350 100L300 200L400 300L250 400L350 500L200 600L300 700L150 800"
              stroke="#a855f7"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M250 50L400 150L350 250L450 350L300 450L400 550L250 650L350 750L200 850"
              stroke="#c084fc"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M300 100L450 200L400 300L500 400L350 500L450 600L300 700L400 800L250 900"
              stroke="#e879f9"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>

        {/* Blue hexagonal pattern on bottom left */}
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2">
          <svg className="w-full h-full opacity-20" viewBox="0 0 400 400" fill="none" aria-hidden="true">
            <polygon points="50,25 75,50 75,100 50,125 25,100 25,50" stroke="#3b82f6" strokeWidth="1" fill="none" />
            <polygon
              points="100,75 125,100 125,150 100,175 75,150 75,100"
              stroke="#60a5fa"
              strokeWidth="1"
              fill="none"
            />
            <polygon
              points="150,25 175,50 175,100 150,125 125,100 125,50"
              stroke="#93c5fd"
              strokeWidth="1"
              fill="none"
            />
            <polygon
              points="200,75 225,100 225,150 200,175 175,150 175,100"
              stroke="#3b82f6"
              strokeWidth="1"
              fill="none"
            />
            <polygon points="50,175 75,200 75,250 50,275 25,250 25,200" stroke="#60a5fa" strokeWidth="1" fill="none" />
            <polygon
              points="100,225 125,250 125,300 100,325 75,300 75,250"
              stroke="#93c5fd"
              strokeWidth="1"
              fill="none"
            />
            <polygon
              points="150,175 175,200 175,250 150,275 125,250 125,200"
              stroke="#3b82f6"
              strokeWidth="1"
              fill="none"
            />
            <polygon
              points="200,225 225,250 225,300 200,325 175,300 175,250"
              stroke="#60a5fa"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-cyan-400 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Link href="/#projects">
              <Button variant="ghost" size="sm" className="text-black hover:bg-cyan-300 flex items-center gap-2">
                <ChevronLeft className="w-5 h-5" />
                Back
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <h1 className="text-white text-3xl font-bold mb-8">Detail Experience</h1>

          {/* Main Image */}
          <div className="mb-8">
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-2xl">
              {project.image.includes("mobile-app/combined") ? (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center p-8">
                  <div className="flex space-x-4 w-full h-full max-w-2xl">
                    <div className="flex-1 rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src="/assets/projects/mobile-app/topas-mobile-dashboard.jpeg"
                        alt="Topas Mobile App Dashboard"
                        width={200}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src="/assets/projects/mobile-app/topas-mobile-menu.jpeg"
                        alt="Topas Mobile App Menu"
                        width={200}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src="/assets/projects/mobile-app/topas-mobile-profile.jpeg"
                        alt="Topas Mobile App Profile"
                        width={200}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={`${project.title} project screenshot`}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                  priority
                />
              )}
            </div>
          </div>

          {/* Project Title */}
          <h2 className="text-white text-2xl font-bold mb-4">{project.title}</h2>

          {/* Project Content */}
          <div className="text-gray-300 text-lg leading-relaxed">{project.description}</div>
        </div>
      </div>
    </div>
  )
}

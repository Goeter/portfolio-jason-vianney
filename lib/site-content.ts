import type { LucideIcon } from "lucide-react"
import { Award, Briefcase, FolderOpen, Home, Wrench } from "lucide-react"

export type NavItem = {
  id: string
  label: string
  icon: LucideIcon
}

export type Project = {
  id: number
  title: string
  description: string
  detailDescription: string
  image: string
  link?: string | null
  gallery?: string[]
  uploadedAt: string
}

export type Certificate = {
  id: number
  title: string
  description: string
  image: string
  issuer: string
  date: string
  uploadedAt: string
}

export type Experience = {
  id: number
  company: string
  division: string
  period: string
  logo: string
  details: string[]
  location?: string
  workMode?: string
}

export const siteConfig = {
  owner: "Jason Vianney Sugiarto",
  shortName: "Jason Vianney",
  role: "IT Professional",
  headline: "System Analyst, UI/UX Designer, Data Analyst, and Fullstack Developer",
  description:
    "Portfolio of Jason Vianney Sugiarto, an IT professional experienced in system analysis, UI/UX design, data analytics, fullstack development, freelance IT projects, tutoring, HR systems, corporate websites, CMS websites, mobile applications, and business process digitalization.",
  url: "https://jasonvianney.com",
  locale: "en_US",
  keywords: [
    "Jason Vianney Sugiarto",
    "System Analyst Portfolio",
    "UI UX Designer Portfolio",
    "Data Analyst Portfolio",
    "Fullstack Developer Portfolio",
    "Business Analyst",
    "Information Systems",
    "Next.js Portfolio",
    "HR System",
    "Corporate Website",
    "Mobile Application",
    "Freelance IT Portfolio",
    "PT Steda Roaster Website",
    "PT Sigma Website",
    "Math Physics English Tutor",
  ],
  contacts: {
    email: "jasonvianneys@gmail.com",
    resumeFileId: "10Nllp8ydFAMENKFA0089aGdT5hCijCNd95oKo_DI3NU",
  },
  footer: "Copyright © 2025 Jason Vianney S Portfolio Web Design. All rights reserved.",
}

export const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "roles", label: "Professional Expertise", icon: Wrench },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "experience", label: "Experience", icon: Briefcase },
]

export const expertise = [
  { label: "IT Fullstack", bg: "rgba(55,138,221,0.12)", color: "#8CC8FF", border: "rgba(140,200,255,0.25)" },
  { label: "System Analyst", bg: "rgba(100,210,170,0.12)", color: "#73E0B6", border: "rgba(115,224,182,0.25)" },
  { label: "UI/UX Designer", bg: "rgba(255,170,80,0.12)", color: "#FFBC72", border: "rgba(255,188,114,0.25)" },
  { label: "Data Analyst", bg: "rgba(215,140,255,0.12)", color: "#D99BFF", border: "rgba(217,155,255,0.25)" },
  { label: "Tutor", bg: "rgba(255,220,120,0.12)", color: "#FFE083", border: "rgba(255,224,131,0.25)" },
]

export const projects: Project[] = [
  {
    id: 1,
    title: "PT Topas Multi Finance Website",
    description: "Website korporat publik yang membangun kepercayaan pelanggan dan brand awareness melalui kehadiran digital profesional.",
    detailDescription:
      "A comprehensive corporate website for PT Topas Multi Finance that serves as the primary digital touchpoint for customers and stakeholders. This public-facing platform showcases the company's financial products and services while building strong brand awareness and customer trust. Key features include product information, financing options, job vacancy publication, customer-facing content, and regulatory trust signals for Indonesian financial services customers.",
    image: "/assets/projects/topas-website.png",
    uploadedAt: "June 2025",
    link: "https://frontend.topasmultifinance.co.id",
  },
  {
    id: 2,
    title: "PT Alfa Berkat Sigma",
    description: "Website toko perlengkapan plumbing yang memamerkan produk dan profil perusahaan secara profesional dan menarik.",
    detailDescription:
      "A corporate website for PT. Alfa Berkat Sigma focused on company profile presentation, plumbing product visibility, and a clean digital brand identity. The project emphasizes responsive layout, clear product communication, and a professional user experience for prospective business customers.",
    image: "/assets/projects/sigma-picture.png",
    uploadedAt: "June 2025",
    link: "https://sigma-andrew-ten.vercel.app",
  },
  {
    id: 3,
    title: "Topas Multi Finance Mobile Application",
    description: "Aplikasi mobile untuk nasabah dan staf: manajemen pinjaman, tracking pencairan, monitoring nasabah, dan layanan keuangan lengkap.",
    detailDescription:
      "A mobile application designed for Topas Multi Finance customers and internal staff, featuring a modern interface for financing application submission, contract management, payment guidance, outlet location access, profile management, loan simulation, and secure financial service navigation.",
    image: "/assets/projects/mobile-app/combined",
    uploadedAt: "June 2025",
    gallery: [
      "/assets/projects/mobile-app/topas-mobile-dashboard.jpeg",
      "/assets/projects/mobile-app/topas-mobile-menu.jpeg",
      "/assets/projects/mobile-app/topas-mobile-profile.jpeg",
    ],
  },
  {
    id: 4,
    title: "HR Topas Application",
    description: "Sistem HRD terintegrasi: absensi, rekap gaji, perencanaan tenaga kerja berbasis KPI, dan manajemen rekrutmen lengkap.",
    detailDescription:
      "An integrated HR management system for PT Topas Multi Finance that streamlines attendance, payroll recap, employee records, manpower planning, recruitment workflows, and KPI-based workforce management through centralized digital modules.",
    image: "/assets/projects/hr-topas-application.png",
    uploadedAt: "June 2025",
  },
  {
    id: 5,
    title: "Monitoring & Feedback Prospect",
    description: "Aplikasi internal pencatatan penjualan motor dari dealer, konfirmasi order, jadwal pengiriman, dan kelengkapan dokumen.",
    detailDescription:
      "An internal monitoring application for dealer motorcycle sales, order confirmation, delivery scheduling, document validation, and transaction tracking. The system improves operational visibility and reduces manual follow-up across dealer-related workflows.",
    image: "/assets/projects/monitoring-server.png",
    uploadedAt: "February 2024",
  },
  {
    id: 6,
    title: "Vehicle Registration Certificate System",
    description: "Sistem cetak nota pencairan yang sebelumnya manual kini dicetak rapi, cepat, dan tersimpan aman di database sistem.",
    detailDescription:
      "A digital system that modernizes vehicle registration certificate and disbursement note processes by replacing handwritten workflows with structured printing, centralized storage, validation, audit trails, and faster document retrieval.",
    image: "/assets/projects/vehicle-registration-certificate-system.png",
    uploadedAt: "February 2024",
  },
  {
    id: 7,
    title: "Mobile Mata Elang & Subscribe",
    description: "Aplikasi pelacak kendaraan kredit untuk field user dan pihak ketiga, dilengkapi sistem berlangganan aplikasi.",
    detailDescription:
      "A field-oriented vehicle tracking mobile application for internal users and third-party partners. The solution supports credit vehicle monitoring, structured field reporting, and subscription-based access management.",
    image: "/assets/projects/mobile-mata-elang/combined",
    uploadedAt: "June 2025",
    gallery: [
      "/assets/projects/mobile-mata-elang/foto-1.png",
      "/assets/projects/mobile-mata-elang/foto-2.png",
      "/assets/projects/mobile-mata-elang/foto-3.png",
    ],
  },
  {
    id: 8,
    title: "Mobile Loan Flow Survey",
    description: "Aplikasi survei kunjungan rumah debitur agar data tersentralisasi dan tersimpan rapi di database perusahaan.",
    detailDescription:
      "A mobile survey application for debtor home visits, designed to centralize survey data, standardize field input, and improve the accuracy of loan-related customer verification processes.",
    image: "/assets/projects/flow-survey-pinjaman.jpg",
    uploadedAt: "June 2025",
  },
  {
    id: 9,
    title: "Dashboard Admin Ticketing",
    description: "Dashboard monitoring tiket berbasis web untuk pengelolaan dan pemantauan sistem ticketing secara real-time.",
    detailDescription:
      "A web-based admin dashboard for ticket management, operational monitoring, and real-time tracking of issue handling workflows across internal systems.",
    image: "/assets/projects/dashboard_ticketing.png",
    uploadedAt: "June 2025",
  },
  {
    id: 10,
    title: "PT Steda Roaster Company Profile & CMS",
    description:
      "Responsive company profile website with CMS support to present Steda Roaster's coffee roasting services, products, and business information clearly.",
    detailDescription:
      "A responsive company profile website and CMS for PT Steda Roaster, designed to strengthen the brand's digital presence, present coffee roasting services and business offerings clearly, and make content updates easier through a structured content management workflow. The website focuses on clean visual hierarchy, accessible information, responsive layouts, and a professional user experience for customers and business partners.",
    image: "/assets/projects/steda-roaster.png",
    uploadedAt: "May 2026",
    link: "https://stedaroaster.vercel.app/",
  },
]

export const certificates: Certificate[] = [
  {
    id: 1,
    title: "English Certificate",
    description: "English proficiency certification demonstrating communication and academic language capability.",
    image: "/assets/certificates/English Certificate Gabung_1.jpg",
    issuer: "English Test Center",
    date: "2025",
    uploadedAt: "2025",
  },
  {
    id: 2,
    title: "Teaching Certification",
    description: "Certification for teaching and tutoring with structured learning methods.",
    image: "/assets/certificates/Teaching Certification.png",
    issuer: "Teaching Program",
    date: "2025",
    uploadedAt: "2025",
  },
  {
    id: 3,
    title: "Data Analyst Certification",
    description: "In depth training in Python for data analysis, data organization, and SQL database management.",
    image: "/assets/certificates/data-analyst-udemy.jpeg",
    issuer: "Udemy",
    date: "02 August 2025",
    uploadedAt: "02 August 2025",
  },
  {
    id: 4,
    title: "Intro to Data Analytics",
    description: "Fundamentals of data analysis, including organizing and interpreting data using spreadsheets.",
    image: "/assets/certificates/data-analyst-revou.jpeg",
    issuer: "RevoU",
    date: "18 July 2025",
    uploadedAt: "18 July 2025",
  },
  {
    id: 5,
    title: "UI/UX Webinar Participation",
    description: "Comprehensive training on UI/UX principles, design tools, and best practice.",
    image: "/assets/certificates/ui-ux-webinar-ubaya.png",
    issuer: "Universitas Surabaya (UBAYA)",
    date: "24 May 2025",
    uploadedAt: "24 May 2025",
  },
]

const projectOrderLatestFirst = [10, 1, 2, 3, 8, 4, 7, 9, 6, 5]

export const projectsLatestFirst = projectOrderLatestFirst
  .map((projectId) => projects.find((project) => project.id === projectId))
  .filter((project): project is Project => Boolean(project))

export const certificatesLatestFirst = [...certificates].sort((a, b) => b.id - a.id)

export const experiences: Experience[] = [
  {
    id: 1,
    company: "Freelance IT",
    division: "Fullstack Developer, System Analyst, UI/UX Designer, Data Analyst",
    period: "June 2025 – Now",
    location: "Surabaya, Indonesia",
    workMode: "On-Site",
    logo: "/assets/company-logos/icon_freelance_it.svg",
    details: [
      "Built a responsive front-end company profile website for PT Sigma to enhance digital credibility and improve customer access to company information.",
      "Built a responsive company profile website and CMS for PT Steda Roaster to streamline content updates and present business offerings clearly to customers.",
    ],
  },
  {
    id: 2,
    company: "Student Center",
    division: "Math, Physics and English Tutor",
    period: "September 2024 – Now",
    location: "Jakarta - Surabaya, Indonesia",
    workMode: "On-Site",
    logo: "/assets/company-logos/icon_student_center.jpg",
    details: [
      "Taught Mathematics, Physics, and English to elementary and high school students through interactive learning methods, helping strengthen fundamentals, improve comprehension, and prepare for exams.",
    ],
  },
  {
    id: 3,
    company: "PT Topas Multi Finance - Member of Mayapada Group",
    division: "System Analyst",
    period: "March 2024 - June 2025",
    location: "Jakarta, Indonesia",
    workMode: "On-Site",
    logo: "/assets/company-logos/icon_topas.png",
    details: [
      "Developing systems to increase operational efficiency 50% through integrated document and financial workflows.",
      "Developing a corporate website to boost product visibility, enable secure oversight, engage customers, and list job vacancies.",
      "Creating an online loan mobile application to make it easier for customers.",
      "Building a centralized HR system to manage payroll, attendance, performance, and employee records securely.",
    ],
  },
  {
    id: 4,
    company: "PT Astra Honda Motor",
    division: "System Analyst",
    period: "February 2023 - February 2024",
    location: "Jakarta, Indonesia",
    workMode: "On-Site",
    logo: "/assets/company-logos/icon_astra.png",
    details: [
      "Developed an internal application for dealer motorcycle sales, order confirmation, delivery scheduling, and document validation.",
      "Modernized an outdated system to be more secure, user-friendly, and reliable.",
      "Performing unit testing to minimize bugs and human error, ensuring smooth deployment and user adoption.",
    ],
  },
  {
    id: 5,
    company: "PT Wings Group",
    division: "Full-stack Developer",
    period: "February 2022 - February 2023",
    location: "Surabaya, Indonesia",
    workMode: "On-Site",
    logo: "/assets/company-logos/icon_wings.png",
    details: [
      "Enhancing the international sales website for seamless inventory tracking and real time digital sales monitoring across Asia.",
      "Enhanced the mobile app with scanning features for accurate, real-time data capture.",
      "Resolving critical bugs on the web and mobile platforms during live operations, restoring full functionality and uninterrupted use.",
    ],
  },
  {
    id: 6,
    company: "Universitas Surabaya",
    division: "Bachelor of Information Systems",
    period: "2017 – 2021",
    location: "Surabaya, Indonesia",
    workMode: "Academic",
    logo: "/assets/company-logos/icon_ubaya.png",
    details: [
      "Assisting professors by preparing programming exercises and reviewing assignments to reinforce programming fundamentals.",
      "Opening a Business Mathematics class provides tutoring and exercises to hone mathematical logic skills in business.",
    ],
  },
]


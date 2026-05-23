import type { LucideIcon } from "lucide-react"
import { Award, Briefcase, FolderOpen, Home, Wrench } from "lucide-react"

export type NavItem = {
  id: string
  label: string
  icon: LucideIcon
}

export type Project = {
  id: number
  slug: string
  title: string
  description: string
  detailDescription: string
  image: string
  link?: string | null
  gallery?: string[]
  seoTitle?: string
  seoDescription?: string
  ogImage?: string
  /** Kept for CMS/front-end ordering data. Hidden from selected UI when not needed. */
  uploadedAt: string
}

export type Certificate = {
  id: number
  slug: string
  title: string
  description: string
  image: string
  issuer: string
  date: string
  seoTitle?: string
  seoDescription?: string
  ogImage?: string
  /** Kept for CMS/front-end ordering data. Hidden from the certificate UI. */
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

export type ProfessionalRoleColor = "cyan" | "purple" | "rose" | "emerald" | "amber"

export type ProfessionalRole = {
  id: number
  number: string
  title: string
  color: ProfessionalRoleColor
  skills: string[]
  tools: string[]
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
  defaultOgImage: "/assets/profile/home.png",
  seoTitle: "Jason Vianney Sugiarto - System Analyst, UI/UX Designer, Data Analyst & Fullstack Developer",
  seoDescription:
    "Explore Jason Vianney Sugiarto's professional portfolio featuring system analysis, UI/UX design, data analysis, fullstack development, CMS websites, corporate profiles, mobile applications, HR systems, and digital business solutions.",
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
    github: "https://github.com/Goeter",
    linkedin: "https://www.linkedin.com/in/jasonvianneysugiarto",
    instagram: "https://www.instagram.com/pixelnav.id/",
  },
  sameAs: [
    "https://github.com/Goeter",
    "https://www.linkedin.com/in/jasonvianneysugiarto",
    "https://www.instagram.com/pixelnav.id/",
  ],
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

export const professionalRoles: ProfessionalRole[] = [
  {
    id: 1,
    number: "01",
    title: "Fullstack Developer",
    color: "cyan",
    skills: ["HTML", "CSS", "PHP", "JavaScript", "SQL"],
    tools: ["Visual Studio Code", "React.js & Next.js", "PostgreSQL & MySQL"],
  },
  {
    id: 2,
    number: "02",
    title: "System Analyst",
    color: "purple",
    skills: ["SRS", "QA Testing", "Agile", "BPMN"],
    tools: ["MS Visio & BPMN.io", "Google Docs & Sheets", "Word, Excel, PowerPoint", "Trello"],
  },
  {
    id: 3,
    number: "03",
    title: "UI/UX Designer",
    color: "rose",
    skills: ["Wireframing", "Prototyping", "User Research"],
    tools: ["Figma & Adobe XD", "Adobe Illustrator", "Balsamiq Wireframes", "Awwwards & Dribbble"],
  },
  {
    id: 4,
    number: "04",
    title: "Data Analyst",
    color: "emerald",
    skills: ["Data Analysis", "Cleaning", "Visualization", "Reporting"],
    tools: ["Python", "Power BI"],
  },
  {
    id: 5,
    number: "05",
    title: "Tutor",
    color: "amber",
    skills: ["Teaching", "Curriculum", "Mentoring", "Assessment"],
    tools: ["Google Classroom", "Zoom & Meet", "Word & PowerPoint"],
  },
]

export const projects: Project[] = [
  {
    id: 10,
    slug: "pt-steda-roaster-company-profile-cms",
    title: "PT Steda Roaster Company Profile & CMS",
    description:
      "Responsive company profile website with CMS support to present Steda Roaster's coffee roasting services, products, and business information clearly.",
    detailDescription:
      "A responsive company profile website and CMS for PT Steda Roaster, designed to strengthen the brand's digital presence, present coffee roasting services and business offerings clearly, and make content updates easier through a structured content management workflow. The website focuses on clean visual hierarchy, accessible information, responsive layouts, and a professional user experience for customers and business partners.",
    image: "/assets/projects/steda-roaster.png",
    uploadedAt: "May 2026",
    link: "https://stedaroaster.vercel.app/",
  },
  {
    id: 9,
    slug: "pt-topas-multi-finance-website",
    title: "PT Topas Multi Finance Website",
    description: "Public corporate website that builds customer trust and brand awareness through a professional digital presence.",
    detailDescription:
      "A comprehensive corporate website for PT Topas Multi Finance that serves as the primary digital touchpoint for customers and stakeholders. This public-facing platform showcases the company's financial products and services while building strong brand awareness and customer trust. Key features include product information, financing options, job vacancy publication, customer-facing content, and regulatory trust signals for Indonesian financial services customers.",
    image: "/assets/projects/topas-website.png",
    uploadedAt: "June 2025",
    link: "https://frontend.topasmultifinance.co.id",
  },
  {
    id: 8,
    slug: "pt-alfa-berkat-sigma",
    title: "PT Alfa Berkat Sigma",
    description: "Professional plumbing product website that presents company information and product offerings clearly.",
    detailDescription:
      "A corporate website for PT. Alfa Berkat Sigma focused on company profile presentation, plumbing product visibility, and a clean digital brand identity. The project emphasizes responsive layout, clear product communication, and a professional user experience for prospective business customers.",
    image: "/assets/projects/sigma-picture.png",
    uploadedAt: "June 2025",
    link: "https://sigma-andrew-ten.vercel.app",
  },
  {
    id: 7,
    slug: "topas-multi-finance-mobile-application",
    title: "Topas Multi Finance Mobile Application",
    description: "Mobile application for customers and staff, covering loan management, disbursement tracking, customer monitoring, and financial services.",
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
    id: 6,
    slug: "mobile-loan-flow-survey",
    title: "Mobile Loan Flow Survey",
    description: "Mobile debtor home-visit survey application that centralizes field data and stores it neatly in the company database.",
    detailDescription:
      "A mobile survey application for debtor home visits, designed to centralize survey data, standardize field input, and improve the accuracy of loan-related customer verification processes.",
    image: "/assets/projects/flow-survey-pinjaman.jpg",
    uploadedAt: "June 2025",
  },
  {
    id: 5,
    slug: "hr-topas-application",
    title: "HR Topas Application",
    description: "Integrated HR system for attendance, payroll recap, KPI-based manpower planning, and end-to-end recruitment management.",
    detailDescription:
      "An integrated HR management system for PT Topas Multi Finance that streamlines attendance, payroll recap, employee records, manpower planning, recruitment workflows, and KPI-based workforce management through centralized digital modules.",
    image: "/assets/projects/hr-topas-application.png",
    uploadedAt: "June 2025",
  },
  {
    id: 4,
    slug: "mobile-mata-elang-subscribe",
    title: "Mobile Mata Elang & Subscribe",
    description: "Credit vehicle tracking application for field users and third-party partners, supported by subscription-based access.",
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
    id: 3,
    slug: "dashboard-admin-ticketing",
    title: "Dashboard Admin Ticketing",
    description: "Web-based ticket monitoring dashboard for managing and tracking ticketing workflows in real time.",
    detailDescription:
      "A web-based admin dashboard for ticket management, operational monitoring, and real-time tracking of issue handling workflows across internal systems.",
    image: "/assets/projects/dashboard_ticketing.png",
    uploadedAt: "June 2025",
  },
  {
    id: 2,
    slug: "vehicle-registration-certificate-system",
    title: "Vehicle Registration Certificate System",
    description: "Digital disbursement note printing system that replaces manual writing with fast, neat, and securely stored documents.",
    detailDescription:
      "A digital system that modernizes vehicle registration certificate and disbursement note processes by replacing handwritten workflows with structured printing, centralized storage, validation, audit trails, and faster document retrieval.",
    image: "/assets/projects/vehicle-registration-certificate-system.png",
    uploadedAt: "February 2024",
  },
  {
    id: 1,
    slug: "monitoring-feedback-prospect",
    title: "Monitoring & Feedback Prospect",
    description: "Internal application for recording dealer motorcycle sales, order confirmation, delivery schedules, and document completeness.",
    detailDescription:
      "An internal monitoring application for dealer motorcycle sales, order confirmation, delivery scheduling, document validation, and transaction tracking. The system improves operational visibility and reduces manual follow-up across dealer-related workflows.",
    image: "/assets/projects/monitoring-server.png",
    uploadedAt: "February 2024",
  },
]

export const certificates: Certificate[] = [
  {
    id: 5,
    slug: "english-certificate",
    title: "English Certificate",
    description: "English proficiency certification demonstrating communication and academic language capability.",
    image: "/assets/certificates/English Certificate Gabung_1.jpg",
    issuer: "English Test Center",
    date: "09 October 2025",
    uploadedAt: "09 October 2025",
  },
  {
    id: 4,
    slug: "teaching-certification",
    title: "Teaching Certification",
    description: "Certification for teaching and tutoring with structured learning methods.",
    image: "/assets/certificates/Teaching Certification.png",
    issuer: "Teaching Program",
    date: "10 November 2025",
    uploadedAt: "10 November 2025",
  },
  {
    id: 3,
    slug: "data-analyst-certification",
    title: "Data Analyst Certification",
    description: "In-depth training in Python for data analysis, data organization, and SQL database management.",
    image: "/assets/certificates/data-analyst-udemy.jpeg",
    issuer: "Udemy",
    date: "02 August 2025",
    uploadedAt: "02 August 2025",
  },
  {
    id: 2,
    slug: "intro-to-data-analytics",
    title: "Intro to Data Analytics",
    description: "Fundamentals of data analysis, including organizing and interpreting data using spreadsheets.",
    image: "/assets/certificates/data-analyst-revou.jpeg",
    issuer: "RevoU",
    date: "18 July 2025",
    uploadedAt: "18 July 2025",
  },
  {
    id: 1,
    slug: "ui-ux-webinar-participation",
    title: "UI/UX Webinar Participation",
    description: "Comprehensive training on UI/UX principles, design tools, and best practices.",
    image: "/assets/certificates/ui-ux-webinar-ubaya.png",
    issuer: "Universitas Surabaya (UBAYA)",
    date: "24 May 2025",
    uploadedAt: "24 May 2025",
  },
]

export const getProjectPath = (project: Project) => `/projects/${project.slug}`

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug || String(project.id) === slug)

export const getProjectSeoTitle = (project: Project) =>
  project.seoTitle ?? `${project.title} | ${siteConfig.shortName} Portfolio`

export const getProjectSeoDescription = (project: Project) =>
  project.seoDescription ?? project.detailDescription

export const getProjectOgImage = (project: Project) =>
  project.ogImage ?? (project.gallery?.[0] || project.image || siteConfig.defaultOgImage)

const sortByNewestId = <T extends { id: number }>(items: T[]) =>
  [...items].sort((a, b) => b.id - a.id)

// CMS-ready derived lists.
// Upload new project/certificate data once in `projects` or `certificates`;
// the home sections and archive pages consume these sorted lists automatically.
export const projectsLatestFirst = sortByNewestId(projects)

export const certificatesLatestFirst = sortByNewestId(certificates)

export const experiences: Experience[] = [
  {
    id: 1,
    company: "Freelance IT",
    division: "Fullstack Developer, System Analyst, UI/UX Designer, Data Analyst",
    period: "June 2025 – Now",
    location: "Surabaya, Indonesia",
    workMode: "On-Site",
    logo: "/assets/company-logos/icon_freelance_it.png",
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
    logo: "/assets/company-logos/icon_student_center.png",
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
      "Developed systems that improved operational efficiency by up to 50% through integrated document and financial workflows.",
      "Developed a corporate website to improve product visibility, support secure oversight, engage customers, and publish job vacancies.",
      "Created an online loan mobile application to make financing services easier for customers to access.",
      "Built a centralized HR system to manage payroll, attendance, performance, and employee records securely.",
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
      "Performed unit testing to minimize bugs and human error, ensuring smooth deployment and user adoption.",
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
      "Opened a Business Mathematics class that provided tutoring and exercises to strengthen mathematical logic for business contexts.",
    ],
  },
]

export const cmsContent = {
  source: "local-typescript-content",
  version: "1.0.0",
  site: siteConfig,
  navigation: navItems,
  expertise,
  professionalRoles,
  projects,
  projectsLatestFirst,
  getProjectPath,
  getProjectBySlug,
  certificates,
  certificatesLatestFirst,
  experiences,
}

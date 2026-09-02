import type { LucideIcon } from "lucide-react"
import { Award, Briefcase, FolderOpen, Home, Mail, Wrench } from "lucide-react"

export type NavItem = {
  id: string
  label: string
  icon: LucideIcon
}

export type ProjectImageFit = "cover" | "contain" | "logo"

export type ProjectCategory = "website" | "application" | "documentation" | "video"

export const projectCategoryLabels: Record<ProjectCategory, string> = {
  website: "Website",
  application: "Application",
  documentation: "Documentation",
  video: "Video",
}

export type Project = {
  id: number
  slug: string
  title: string
  description: string
  detailDescription: string
  category: ProjectCategory
  image: string
  link?: string | null
  gallery?: string[]
  imageFit?: ProjectImageFit
  logoImageIndexes?: number[]
  seoTitle?: string
  seoDescription?: string
  ogImage?: string
  /** What I personally did on the project, and where. */
  role?: string
  /** Tools and technologies used. */
  stack?: string[]
  /** What changed for the people using it. */
  impact?: string
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
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-jasonvianney.vercel.app").replace(/[/]+$/, ""),
  locale: "en_US",
  defaultOgImage: "/assets/profile/photo.webp",
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
    "PT Steda Multi Usaha Website",
    "Steda Roaster CMS",
    "Math Physics English Tutor",
  ],
  contacts: {
    resumeDownloadUrl: "https://drive.google.com/file/d/1k0B0ggaPiwOyRPs3EaJpcuIGK8rWNnNQ/view?usp=sharing",
    email: "jasonvianneys@gmail.com",
    resumeFileId: "1k0B0ggaPiwOyRPs3EaJpcuIGK8rWNnNQ",
    github: "https://github.com/Goeter",
    linkedin: "https://www.linkedin.com/in/jasonvianneysugiarto",
    whatsapp: "https://wa.me/6283856681999",
    instagram: "https://www.instagram.com/pixelnav.id/",
  },
  sameAs: [
    "https://github.com/Goeter",
    "https://www.linkedin.com/in/jasonvianneysugiarto",
  ],
  footer: "Copyright © 2025 Jason Vianney S Portfolio Web Design. All rights reserved.",
}

export const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "roles", label: "Professional Expertise", icon: Wrench },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "contact", label: "Contact", icon: Mail },
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
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "PHP", "Java", "SQL", "REST API"],
    tools: ["React.js & Next.js", "Laravel", "PostgreSQL & MySQL", "Git & GitHub", "Docker", "AWS / Azure / GCP", "AI & LLM API Integration", "Visual Studio Code"],
  },
  {
    id: 2,
    number: "02",
    title: "System Analyst",
    color: "purple",
    skills: ["Requirements Gathering", "SRS & Functional Docs", "Flowcharting & BPMN", "Database Design", "Unit Testing", "QA Testing", "Agile"],
    tools: ["MS Visio & BPMN.io", "SQL & MySQL", "Google Docs & Sheets", "Word, Excel, PowerPoint", "Trello"],
  },
  {
    id: 3,
    number: "03",
    title: "UI/UX Designer",
    color: "rose",
    skills: ["Wireframing", "Prototyping", "User Research", "CMS Implementation", "SEO & Performance", "Visual Branding"],
    tools: ["Figma & Adobe XD", "Adobe Illustrator", "Balsamiq Wireframes", "Awwwards & Dribbble"],
  },
  {
    id: 4,
    number: "04",
    title: "Data Analyst",
    color: "emerald",
    skills: ["Data Analysis", "Cleaning", "Visualization", "Reporting", "SQL Querying"],
    tools: ["Python", "SQL & MySQL", "Power BI", "Excel & Google Sheets"],
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
    id: 1,
    slug: "monitoring-feedback-prospect",
    title: "Monitoring & Feedback Prospect",
    description:
      "Internal tool that follows a dealer's motorcycle order from confirmation through to delivery, so nobody has to chase status by phone.",
    detailDescription:
      "Dealers confirmed orders, delivery dates, and document status through scattered channels, which meant a lot of follow-up calls just to answer simple questions. This tool puts it all in one place: what was ordered, when it ships, and which documents are still missing. I sat with the business team to map how the process actually ran day to day, then turned that into the flowcharts and BPMN diagrams the developers built from.",
    category: "application",
    image: "/assets/projects/monitoring-server.webp",
    role: "System Analyst · PT Astra Honda Motor",
    stack: ["Functional Specification", "Flowchart & BPMN", "SQL Query", "Hi-Fidelity UI Design", "UX Flow", "Stakeholder Presentation"],
    impact:
      "Order status, delivery schedule, and document completeness moved out of phone calls and into one shared view.",
    uploadedAt: "February 2024",
  },
  {
    id: 2,
    slug: "vehicle-registration-certificate-system",
    title: "Vehicle Registration Certificate System",
    description:
      "Gate system for vendor vehicles entering the Astra Honda Motor plant — the driver taps a card and the movement is recorded, instead of being written down at the gate.",
    detailDescription:
      "Vendor vehicles arrive at the plant all day carrying finished goods and motorcycle spare parts, and every one of them used to be logged by hand at the gate. That was slow, and it left no dependable way to tell whether a vehicle was supposed to be there at all. I wrote the functional specification behind the replacement: what the company actually needed, how the process should be standardised across gates, and the security rules governing who gets in. A registered vehicle now taps its card, the entry and exit are written straight to the database, and anything unregistered stops at the gate.",
    category: "application",
    image: "/assets/projects/vehicle-registration-certificate-system.webp",
    role: "System Analyst · PT Astra Honda Motor — functional specification, user requirements, process standardisation, access-security rules",
    stack: ["Functional Specification", "Flowchart & BPMN", "SQL Query", "Hi-Fidelity UI Design", "UX Flow", "Stakeholder Presentation"],
    impact:
      "Gate logging moved from handwritten notes to a card tap, and only vehicles registered in advance can enter the plant.",
    uploadedAt: "February 2024",
  },
  {
    id: 3,
    slug: "dashboard-admin-ticketing",
    title: "Dashboard Admin Ticketing",
    description:
      "Personal project — an admin dashboard for monitoring ticket sales and reading the analytics behind them.",
    detailDescription:
      "Built on my own initiative, as an exercise in turning raw sales data into something a manager could actually act on. It tracks ticket sales as they come in and puts the analytics right beside them — what is selling, when, and which way the trend is moving — so that answering \"how are we doing?\" is a glance at a screen rather than an export to a spreadsheet.",
    category: "application",
    image: "/assets/projects/dashboard_ticketing.webp",
    role: "Personal project — full-stack build, dashboard and analytics design",
    uploadedAt: "June 2025",
  },
  {
    id: 4,
    slug: "hr-topas-application",
    title: "HR Topas Application",
    description:
      "Internal HR system covering attendance, payroll, leave, employee monitoring, KPIs, and approval requests that everyone can actually follow.",
    detailDescription:
      "Attendance, payroll, leave, and employee records each lived in their own files, so every report began with reconciling them by hand — and every approval began with asking someone where it had got to. This system holds all of it in one place. Staff clock attendance and submit leave or other requests from the same screen, then watch the request move through its stages instead of wondering; managers see what is waiting on them, approve it in place, and the decision is written to the database with a record of who approved what and when. Payroll draws from the same attendance data rather than a separate spreadsheet, KPIs are set and tracked against the people they belong to, and validation rules catch a bad entry at the moment it is typed rather than after it has already reached a report.",
    category: "application",
    image: "/assets/projects/hr-topas-application.webp",
    role: "System Analyst · PT Topas Multi Finance — requirements, functional specs, validation rules, testing support",
    stack: ["Functional Specification", "Flowchart & BPMN", "SQL Query", "Hi-Fidelity UI Design", "UX Flow", "Stakeholder Presentation"],
    impact:
      "Approvals became traceable end to end, payroll stopped depending on manual reconciliation, and bad entries are caught before they reach reporting.",
    uploadedAt: "June 2025",
  },
  {
    id: 5,
    slug: "topas-multi-finance-mobile-application",
    title: "Topas Multi Finance Mobile Application",
    description:
      "Loan app that lets Topas customers track an active financing agreement, get reminded before a payment is due, and apply for new financing from their phone.",
    detailDescription:
      "Before this, a customer who simply wanted to know how many instalments were left had to phone the office or come into a branch. The app answers that on the home screen: how long the financing runs, which instalments are paid, which are still outstanding, and whether anything is overdue. A push notification arrives before a due date, so a missed payment is far more likely to be forgetfulness solved than a penalty incurred. There is a loan calculator built on the formula the company itself set, so the figure a customer sees is the figure they will actually be quoted. From the same app they can submit a new financing application, follow step-by-step payment instructions written out in full rather than assumed, and check their own registered details. I mapped what each screen had to do, then designed the flows and the interface around the questions customers ask first.",
    category: "application",
    image: "/assets/projects/mobile-app.webp",
    role: "System Analyst & UI/UX Designer · PT Topas Multi Finance — user flows, wireframes, interface design, functional specs",
    stack: ["Functional Specification", "Flowchart & BPMN", "SQL Query", "Hi-Fidelity UI Design", "UX Flow", "Stakeholder Presentation"],
    impact:
      "Instalment status, payment reminders, loan simulation, and new applications all moved from the branch counter to the customer's phone.",
    uploadedAt: "June 2025",
  },
  {
    id: 6,
    slug: "mobile-loan-flow-survey",
    title: "Mobile Loan Flow Survey",
    description:
      "Field app for surveyors visiting prospective borrowers, so what they record on site goes straight into the database.",
    detailDescription:
      "Surveyors filled in home-visit forms on paper, then retyped them back at the office — which is exactly where mistakes crept in. The app captures the same information on the spot and sends it straight through, so what the surveyor wrote down in the field is what the credit team reads.",
    category: "application",
    image: "/assets/projects/flow-survey-pinjaman.webp",
    role: "System Analyst & UI/UX Designer · PT Topas Multi Finance — survey flow, form design, data requirements",
    stack: ["Functional Specification", "Flowchart & BPMN", "SQL Query", "Hi-Fidelity UI Design", "UX Flow", "Stakeholder Presentation"],
    impact:
      "Cut out the paper-then-retype step, so field data reaches the credit team as it was originally recorded.",
    uploadedAt: "June 2025",
  },
  {
    id: 7,
    slug: "pt-topas-multi-finance-website",
    title: "PT Topas Multi Finance Website",
    description:
      "Corporate website that sets out Topas's financing products and gives new customers something credible to check first.",
    detailDescription:
      "Anyone looking the company up found very little, which is a problem when you are asking people to trust you with financing. The site lays out the products, the company background, and how to get in touch, in plain terms. I led the UI/UX so the structure follows what a first-time visitor is actually trying to find out, rather than how the company happens to be organised internally.",
    category: "website",
    image: "/assets/projects/topas-website.webp",
    link: "https://frontend.topasmultifinance.co.id",
    role: "System Analyst & UI/UX Designer · PT Topas Multi Finance — information architecture, wireframes, interface design",
    stack: ["Functional Specification", "Flowchart & BPMN", "SQL Query", "Hi-Fidelity UI Design", "UX Flow", "Stakeholder Presentation"],
    impact:
      "Gave the company a public presence customers could check before ever walking into a branch.",
    uploadedAt: "June 2025",
  },
  {
    id: 8,
    slug: "pt-steda-roaster-company-profile-cms",
    title: "Steda Roaster Company Profile & CMS",
    description:
      "Company profile site for a coffee roaster, plus a CMS the team can run themselves without calling a developer.",
    detailDescription:
      "PT Steda Multi Usaha needed to present their roasting machines under the Steda Roaster brand, and to keep that content current on their own. Rather than putting them on a licensed platform with a fee attached every month, I built the CMS from scratch and shaped it around how they actually work: OTP verification on new sign-ups, caching so repeated page loads stop hitting the database again, and role-based access so an editor cannot wander into admin settings.",
    category: "website",
    image: "/assets/projects/steda-roaster.webp",
    link: "https://stedaroaster.vercel.app/",
    role: "Full-Stack Developer, System Analyst & UI/UX Designer · Freelance IT",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    impact:
      "Content updates moved in-house with no platform licence fee, on a CMS with OTP sign-up, caching, and role-based access.",
    uploadedAt: "May 2026",
  },
  {
    id: 9,
    slug: "pemenang-konsultan-professional-consulting-website",
    title: "Pemenang Konsultan Professional Website",
    description:
      "Website for a management consultancy: its services, its track record, and an easy way to start a conversation.",
    detailDescription:
      "A consultancy gets judged on how it presents itself long before the first meeting, so the site had to read as considered rather than templated. It covers the service lines and the firm's background, with an AI chatbot that handles the routine questions people ask before they get in touch. SEO and page speed were part of the build from the start, not something bolted on at the end.",
    category: "website",
    image: "/assets/projects/pemenang-konsultan.webp",
    link: "https://pemenangkonsultan.com/",
    role: "Full-Stack Developer, System Analyst & UI/UX Designer · Freelance IT",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    impact:
      "Clearer service presentation, an AI chatbot fielding first-contact questions, and SEO work built in from the start.",
    uploadedAt: "May 2026",
  },
  {
    id: 10,
    slug: "pemenang-mandiri-law-firm-partners",
    title: "Pemenang Mandiri Law Firm & Partners",
    description:
      "Bilingual site for a law firm division covering criminal law, civil law, and legal support for insurance claim disputes.",
    detailDescription:
      "The law firm sits alongside the insurance consultancy, so the site had to make that relationship obvious without letting one side swallow the other. It sets out the three areas of practice — criminal law, civil law, and legal backing when an insurance claim turns into a dispute — in both English and Indonesian, so a client reads the same page in whichever language they think in. The tone matters as much as the content here: someone looking for a lawyer is usually already worried, and the page is written to steady them rather than sell at them.",
    category: "website",
    image: "/assets/projects/pemenang-konsultan.webp",
    link: "https://pemenangkonsultan.com/pml",
    role: "Full-Stack Developer, System Analyst & UI/UX Designer · Freelance IT",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    impact:
      "Gave the law firm division its own clear presence, in both English and Indonesian, on the firm's existing site.",
    uploadedAt: "May 2026",
  },
  {
    id: 11,
    slug: "steda-roaster-cms",
    title: "Steda Roaster CMS",
    description:
      "Custom-built CMS that lets the Steda team edit every part of their website themselves — no developer, no monthly platform fee.",
    detailDescription:
      "Steda's website is only useful if the people who run it can change it, so I built them a CMS rather than putting them on a licensed platform. Every section of the public site maps to a screen here: company profile, products, news, FAQ, and site settings such as the logo and footer. Two things drove the design. First, the person editing should never need to be told what a field does — each screen opens with a short guide written in plain Indonesian. Second, nothing should be quietly breakable: new sign-ups pass OTP verification, roles separate what an admin can reach from what an ordinary editor can, caching keeps repeated page loads off the database, and an activity log records who changed what and when.",
    category: "application",
    image: "/assets/projects/steda-cms-dashboard.webp",
    gallery: [
      "/assets/projects/steda-cms-dashboard.webp",
      "/assets/projects/steda-cms-company-profile.webp",
      "/assets/projects/steda-cms-logs.webp",
    ],
    role: "Full-Stack Developer, System Analyst & UI/UX Designer · Freelance IT — built from scratch",
    stack: ["Laravel", "Livewire", "PHP 8.4", "Vite", "MySQL", "Blade"],
    impact:
      "Content updates moved in-house with no platform licence fee, protected by OTP sign-up, role-based access, and a full activity log.",
    uploadedAt: "May 2026",
  },
]

export const certificates: Certificate[] = [
  {
    id: 1,
    slug: "ui-ux-webinar-participation",
    title: "UI/UX Webinar Participation",
    description:
      "A session on UI/UX fundamentals: how to structure a screen, work with the standard design tools, and tell a usable layout apart from a merely decorative one.",
    image: "/assets/certificates/ui-ux-webinar-ubaya.webp",
    issuer: "Universitas Surabaya (UBAYA)",
    date: "24 May 2025",
    uploadedAt: "24 May 2025",
  },
  {
    id: 2,
    slug: "intro-to-data-analytics",
    title: "Intro to Data Analytics",
    description:
      "Foundations of data analysis — cleaning and organising raw spreadsheet data, then reading it closely enough to say something useful about it.",
    image: "/assets/certificates/data-analyst-revou.webp",
    issuer: "RevoU",
    date: "18 July 2025",
    uploadedAt: "18 July 2025",
  },
  {
    id: 3,
    slug: "data-analyst-certification",
    title: "Python for Data Analysis & SQL",
    description:
      "Hands-on course in Python for data analysis and SQL for database work: querying, cleaning, and shaping raw data into something worth reporting.",
    image: "/assets/certificates/data-analyst-udemy.webp",
    issuer: "Udemy",
    date: "02 August 2025",
    uploadedAt: "02 August 2025",
  },
  {
    id: 4,
    slug: "teaching-certification",
    title: "Outstanding Teaching Performance",
    description:
      "Recognition for teaching performance in Mathematics and English through 2025 — awarded on results with students, not on completing a course.",
    image: "/assets/certificates/Teaching Certification.webp",
    issuer: "VIP Course",
    date: "10 November 2025",
    uploadedAt: "10 November 2025",
  },
  {
    id: 5,
    slug: "english-certificate",
    title: "CEFR C1 Advanced English",
    description:
      "Scored 599 at CEFR C1 Advanced, equivalent to IELTS Band 8 — comfortable working, writing, and presenting in English in a professional setting.",
    image: "/assets/certificates/English Certificate Gabung_1.webp",
    issuer: "British Council",
    date: "09 October 2025",
    uploadedAt: "09 October 2025",
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

export type Education = {
  degree: string
  school: string
  period: string
  result: string
  logo: string
}

export const education: Education = {
  degree: "Bachelor of Computer Science",
  school: "University of Surabaya",
  period: "July 2017 – July 2021",
  result: "GPA 3.54 — Cum Laude",
  logo: "/assets/company-logos/icon_ubaya.webp",
}

export const experiences: Experience[] = [
  {
    id: 1,
    company: "Freelance IT",
    division: "Full-Stack Developer, System Analyst & UI/UX Designer",
    period: "June 2025 – Now",
    location: "Surabaya, Indonesia",
    workMode: "On-Site",
    logo: "/assets/company-logos/icon_freelance_it.webp",
    details: [
      "Ran website and CMS projects end to end for PT Pemenang Konsultan Manajemen, Pemenang Mandiri Law Firm, and PT Steda Multi Usaha — from systems analysis and UI/UX design through to development, AI chatbot integration, and SEO.",
      "Built each CMS from scratch instead of renting a licensed platform, which kept the running cost down and let the system follow how each client actually works. Added OTP verification for new sign-ups, caching so repeated page loads stop hitting the database, and role-based access that keeps admin settings out of an editor's reach.",
    ],
  },
  {
    id: 2,
    company: "PT Topas Multi Finance - Member of Mayapada Group",
    division: "System Analyst, UI/UX Designer & Data Analyst",
    period: "March 2024 – June 2025",
    location: "Jakarta, Indonesia",
    workMode: "On-Site",
    logo: "/assets/company-logos/icon_topas.webp",
    details: [
      "Translated business needs into functional specifications and BPMN workflows, then led the UI/UX design for the corporate website and the mobile loan application.",
      "Built a centralized HR system covering payroll, attendance, performance, and employee records, with validation checks that catch a bad entry before it reaches a report rather than after.",
    ],
  },
  {
    id: 3,
    company: "PT Astra Honda Motor",
    division: "System Analyst",
    period: "February 2023 – February 2024",
    location: "Jakarta, Indonesia",
    workMode: "On-Site",
    logo: "/assets/company-logos/icon_astra.webp",
    details: [
      "Worked alongside the business team to pin down what an internal sales application actually needed, then documented the process in flowcharts and BPMN diagrams the developers could build from.",
      "Helped modernize a legacy system by tightening its data checks and running unit and functional tests, so problems surfaced before deployment instead of after it.",
    ],
  },
  {
    id: 4,
    company: "Student Center",
    division: "Math, Physics & English Tutor (Part-time)",
    period: "September 2024 – Now",
    location: "Jakarta - Surabaya, Indonesia",
    workMode: "On-Site",
    logo: "/assets/company-logos/icon_student_center.webp",
    details: [
      "Taught Mathematics, Physics, and English to elementary and high school students, adapting each lesson to the student's own pace to build problem-solving confidence and prepare them for exams.",
    ],
  },
  {
    id: 5,
    company: "PT Wings Group",
    division: "Full-Stack Developer",
    period: "February 2022 – February 2023",
    location: "Jakarta, Indonesia",
    workMode: "On-Site",
    logo: "/assets/company-logos/icon_wings.webp",
    details: [
      "Built a barcode scanning feature for an international sales platform and its companion mobile app, giving store and supermarket staff one consistent way to check stock and pricing.",
      "Ran it on a hybrid cloud-and-local setup so scanning kept working out in the field even with no internet, and fixed production issues that were quietly eroding data accuracy.",
    ],
  },
]


/** Headline numbers for the hero. Counts come from the data itself so they cannot go stale. */
export const siteStats = [
  { value: 4, suffix: "+", label: "Years Experience" },
  { value: experiences.length, suffix: "", label: "Companies" },
  { value: projects.length, suffix: "", label: "Projects Delivered" },
  { value: 3, suffix: "", label: "Industries" },
]

export const getAbsoluteUrl = (path = "") => {
  if (!path) return siteConfig.url
  if (/^https?:\/\//.test(path)) return path
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`
}

export const getAbsoluteImageUrl = (imagePath?: string) =>
  getAbsoluteUrl(imagePath || siteConfig.defaultOgImage)

export const siteStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.owner,
    url: siteConfig.url,
    image: getAbsoluteImageUrl(siteConfig.defaultOgImage),
    jobTitle: siteConfig.headline,
    description: siteConfig.description,
    email: siteConfig.contacts.email,
    sameAs: siteConfig.sameAs,
    knowsAbout: siteConfig.keywords,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${siteConfig.shortName} Portfolio`,
    url: siteConfig.url,
    description: siteConfig.seoDescription,
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: siteConfig.owner,
      url: siteConfig.url,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${siteConfig.shortName} Portfolio`,
    url: siteConfig.url,
    description: siteConfig.description,
    image: getAbsoluteImageUrl(siteConfig.defaultOgImage),
    creator: {
      "@type": "Person",
      name: siteConfig.owner,
      url: siteConfig.url,
    },
    hasPart: projects.map((project) => ({
      "@type": "CreativeWork",
      name: project.title,
      url: getAbsoluteUrl(getProjectPath(project)),
      description: getProjectSeoDescription(project),
      image: getAbsoluteImageUrl(getProjectOgImage(project)),
    })),
  },
]

export const getProjectStructuredData = (project: Project) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: project.title,
  description: getProjectSeoDescription(project),
  image: getAbsoluteImageUrl(getProjectOgImage(project)),
  url: getAbsoluteUrl(getProjectPath(project)),
  genre: projectCategoryLabels[project.category],
  creator: {
    "@type": "Person",
    name: siteConfig.owner,
    url: siteConfig.url,
  },
})

export const projectsCollectionStructuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: `${siteConfig.shortName} Projects`,
  url: getAbsoluteUrl("/projects"),
  description:
    "Portfolio projects by Jason Vianney Sugiarto across system analysis, UI/UX design, data analytics, fullstack development, CMS websites, HR systems, and mobile applications.",
  creator: {
    "@type": "Person",
    name: siteConfig.owner,
    url: siteConfig.url,
  },
  hasPart: projectsLatestFirst.map((project) => ({
    "@type": "CreativeWork",
    name: project.title,
    url: getAbsoluteUrl(getProjectPath(project)),
    description: getProjectSeoDescription(project),
    image: getAbsoluteImageUrl(getProjectOgImage(project)),
    genre: projectCategoryLabels[project.category],
  })),
}

export const certificatesCollectionStructuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: `${siteConfig.shortName} Certificates`,
  url: getAbsoluteUrl("/certificates"),
  description:
    "Certificate archive and professional learning achievements of Jason Vianney Sugiarto.",
  creator: {
    "@type": "Person",
    name: siteConfig.owner,
    url: siteConfig.url,
  },
  hasPart: certificatesLatestFirst.map((certificate) => ({
    "@type": "EducationalOccupationalCredential",
    name: certificate.title,
    description: certificate.seoDescription ?? certificate.description,
    image: getAbsoluteImageUrl(certificate.ogImage ?? certificate.image),
    credentialCategory: "Certificate",
    recognizedBy: {
      "@type": "Organization",
      name: certificate.issuer,
    },
  })),
}

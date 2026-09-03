"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import {
  Download,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Send,
  X,
  type LucideIcon,
} from "lucide-react"
import {
  siteConfig,
  professionalRoles,
  projects,
  projectsLatestFirst,
  certificates,
  experiences,
  education,
} from "@/lib/site-content"

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
type Message = {
  id: number
  text: string
  sender: "bot" | "user"
}

/* ─────────────────────────────────────────────
   Knowledge base

   Every answer is generated from the data in site-content.ts, so nothing here
   goes stale when a project or certificate is added. Rules are checked in order,
   most specific first — a question like "what is your work experience" contains
   "work", which the projects rule would otherwise swallow.
───────────────────────────────────────────── */
type Rule = {
  id: string
  test: RegExp
  answer: () => string
}

/**
 * Marker an answer can embed to offer a jump to a section of the page.
 * The renderer turns `[[goto:projects|See all my projects]]` into a button that
 * closes the chat and scrolls there — so the bot can hand the visitor onward
 * instead of only describing what exists.
 */
const goto = (section: string, label: string) => `\n[[goto:${section}|${label}]]`

const GOTO_PATTERN = /\[\[goto:([a-z-]+)\|([^\]]+)\]\]/g

const KNOWLEDGE: Rule[] = [
  /* ── Greetings & small talk ── */
  {
    id: "greeting",
    test: /^(hi|hello|hey|halo|hai|yo|hola|good (morning|afternoon|evening)|siang|pagi|sore|malam)\b/,
    answer: () =>
      `Hi there! 👋 I'm ${siteConfig.shortName}'s assistant.\n\nAsk me anything about his work, or tap one of the buttons below to jump straight to a topic.`,
  },
  {
    id: "thanks",
    test: /\b(thanks|thank you|thx|appreciate|makasih|terima kasih|suwun)\b/,
    answer: () =>
      `You're very welcome. 😊 If anything else comes to mind, just ask — and the Contact section at the bottom of the page has ${siteConfig.shortName}'s email and WhatsApp.`,
  },
  {
    id: "bye",
    test: /\b(bye|goodbye|see you|dadah|sampai jumpa)\b/,
    answer: () => `Thanks for stopping by! 👋 Feel free to reach out any time — good luck with whatever you're working on.`,
  },

  /* ── About the site itself ── */
  {
    id: "what-is-this",
    test: /\b(what is this|what's this|apa ini|website apa|situs apa|this website|this site|about this|purpose of this)\b/,
    answer: () =>
      `This is ${siteConfig.owner}'s portfolio website. 🌐\n\nIt brings together more than four years of work as a Full-Stack Developer and System Analyst across the finance, manufacturing, and legal industries — including projects for PT Astra Honda Motor and Mayapada Group.\n\nInside you'll find ${projects.length} projects with the story behind each one, ${certificates.length} certificates, the full work history, and the tools used along the way.\n\nPlease explore freely. If you would rather not scroll, just tell me what you are looking for and I'll point you to it.`,
  },
  {
    id: "who-built",
    test: /\b(who (built|made|created|designed) (this|it)|siapa yang buat|dibuat oleh)\b/,
    answer: () =>
      `${siteConfig.owner} built this site himself — design, front-end, back-end, and content.\n\nIt runs on Next.js and React with TypeScript and Tailwind CSS, which is the same stack he uses for client work.`,
  },
  {
    id: "site-tech",
    test: /\b(built with|made with|what (tech|stack|frameworks?)( is| does)? this|technology behind)\b/,
    answer: () =>
      `This site runs on Next.js, React, TypeScript, and Tailwind CSS, deployed on Vercel. 🛠️\n\nThe AI assistant you're talking to is rule-based, so it answers instantly and works even on a slow connection.`,
  },
  {
    id: "are-you-real",
    test: /\b(are you (a )?(real|human|bot|ai|robots?)|is this (a )?bot|talking to a human|apakah kamu (manusia|robot))\b/,
    answer: () =>
      `I'm an assistant built into this site, not ${siteConfig.shortName} himself. 🤖\n\nI can answer anything about his work, projects, and background. For a real conversation, his email and WhatsApp are in the Contact section — he usually replies the same day.`,
  },

  /* ── Availability & hiring — the questions a recruiter actually opens with ── */
  {
    id: "hire",
    test: /\b(hire|hiring|available|availability|open to work|looking for (work|a job)|recruit|vacancys?|lowongan|terima kerja|bisa dihubungi untuk kerja)\b/,
    answer: () =>
      `Yes — ${siteConfig.shortName} is open to System Analyst, UI/UX, and Full-Stack roles, and to freelance projects. 💼\n\nHe is based in Surabaya, Indonesia, and is available for both on-site and remote work.\n\nThe quickest way to reach him:\n\nmailto:${siteConfig.contacts.email}\n${siteConfig.contacts.whatsapp}`,
  },
  {
    id: "freelance",
    test: /\b(freelance|project basis|part.?time|contract work|side project|borongan)\b/,
    answer: () =>
      `Yes, ${siteConfig.shortName} takes freelance work — that is how the Pemenang Konsultan, Pemenang Mandiri Law Firm, and Steda Roaster projects came about. 🤝\n\nEach one covered the whole scope: systems analysis, UI/UX design, development, and SEO.\n\nTo discuss a project:\n\nmailto:${siteConfig.contacts.email}\n${siteConfig.contacts.whatsapp}`,
  },
  {
    id: "rate",
    test: /\b(rates?|price|pricing|cost|how much|budget|fees?|charge|tarif\w*|harga\w*|biaya\w*|bayaran\w*|ongkos)\b/,
    answer: () =>
      `Rates depend on scope, timeline, and how much of the work is analysis versus build — so ${siteConfig.shortName} prefers to quote after a short conversation about what you need. 💬\n\nSend him the outline and he'll come back with something concrete:\n\nmailto:${siteConfig.contacts.email}\n${siteConfig.contacts.whatsapp}`,
  },
  {
    id: "location",
    test: /\b(where (are you|is he|do you live|based)|location|city|domisili|tinggal di mana|lokasi|remote|onsite|on.?site|relocat\w*)\b/,
    answer: () =>
      `${siteConfig.shortName} is based in Surabaya, Indonesia. 📍\n\nHe has worked on-site in both Jakarta and Surabaya, and is open to remote work as well.`,
  },
  {
    id: "language",
    test: /\b(english|bahasa|language|speak|communicat\w*|ielts|cefr|toefl)\b/,
    answer: () =>
      `${siteConfig.shortName} works in both English and Indonesian. 🗣️\n\nHis English is certified at CEFR C1 Advanced by the British Council, scoring 599 — equivalent to IELTS Band 8. That covers technical documentation, client meetings, and presentations.`,
  },

  /* ── Background ── */
  {
    id: "who-are-you",
    test: /\b(who (are|is) (you|he|jason)|about (you|him|jason)|yourself|tentang|siapa|profil)\b/,
    answer: () =>
      `👤 ${siteConfig.owner}\n\nA Full-Stack Developer and System Analyst with over four years of experience across the finance, manufacturing, and legal industries, including projects for PT Astra Honda Motor and Mayapada Group.\n\nHe handles a project from requirements through UI/UX design to launch, bringing in cloud or AI tools where they genuinely add value.\n\nHe also teaches Mathematics, Physics, and English part-time — and was recognised for it by VIP Course in 2025.`,
  },
  {
    id: "education",
    test: /\b(education|study|studied|degrees?|university|college|campus|gpa|graduat\w*|kuliah|pendidikan\w*|kampus|s1|sarjana)\b/,
    answer: () =>
      `🎓 ${education.degree}\n${education.school}\n${education.period}\n${education.result}`,
  },
  {
    id: "years",
    test: /\b(how (long|many years)|years of experience|berapa (lama|tahun)|pengalaman berapa)\b/,
    answer: () =>
      `Over four years of professional experience, across ${experiences.length} organisations and ${projects.length} projects. 📊\n\nIt spans three industries — finance, manufacturing, and legal — which is unusual, and it means he has seen how differently each one defines "done".`,
  },

  /* ── Experience — checked before projects, since "work experience" contains "work" ── */
  {
    id: "experience",
    test: /\b(experience|pengalaman\w*|kerja\w*|career|employment|work history|riwayat|magang|intern|companies|perusahaan\w*|worked (at|for))\b/,
    answer: () =>
      `💼 Work Experience:\n\n${experiences
        .map((e, i) => `${i + 1}. ${e.company}\n   Job as : ${e.division}`)
        .join("\n\n")}${goto("experience", "See my full experience")}`,
  },

  /* ── Projects ── */
  {
    id: "projects",
    test: /\b(projects?|proyek\w*|portfolio|portofolio|karya\w*|case study|work samples|what have you built|apa saja yang dibuat)\b/,
    answer: () =>
      `📁 ${siteConfig.shortName} has delivered ${projects.length} projects. Here are the 5 most recent:\n\n${projectsLatestFirst
        .slice(0, 5)
        .map(
          (p, i) =>
            `${i + 1}. ${p.title}\n   ${p.description}${
              p.stack?.length ? `\n   Skills: ${p.stack.slice(0, 4).join(", ")}` : ""
            }`
        )
        .join("\n\n")}${goto("projects", "See all my projects")}`,
  },
  {
    id: "best-project",
    test: /\b(best|favourite|favorite|proudest|biggest|most (complex|difficult|challenging)|terbaik|paling)\b/,
    answer: () =>
      `Two stand out for different reasons. 🌟\n\n• Steda Roaster CMS — built from scratch in Laravel and Livewire rather than renting a licensed platform, with OTP sign-up, caching, and role-based access. It removed a recurring monthly fee for the client.\n\n• HR Topas Application — attendance, payroll, leave, KPIs, and approvals in one place, with validation that catches a bad entry before it ever reaches a report.\n\nBoth are in the Projects section with the full story.`,
  },

  /* ── Skills & tools ── */
  {
    id: "specific-tech",
    test: /\b(react|next\.?js|laravel|php|python|typescript|javascript|docker|aws|azure|gcp|cloud|mysql|sql|figma|bpmn|tailwind|livewire|java\b|git\b|ai|llm|api)\b/,
    answer: () => {
      const dev = professionalRoles.find((r) => r.title.toLowerCase().includes("fullstack"))
      return `Yes — here is the full technical toolkit: 🛠️\n\n• Development: ${dev?.skills.join(", ")}\n• Tools & platforms: ${dev?.tools.join(", ")}\n\nFor systems work: flowcharting and BPMN, functional documentation, SQL, database design, and unit testing.\n\nAsk about any specific project and I'll tell you what was used there.`
    },
  },
  {
    // One rule for both skills and tools — the section itself holds the detail,
    // so the answer stays a short menu rather than a wall of chips.
    id: "skills",
    test: /\b(skills?|keahlian\w*|expertise|capable|abilitys?|strengths?|good at|specialis\w*|specializ\w*|bisa apa|kemampuan\w*|tools?|tech stack|stack|teknologi|software|frameworks?|platforms?)\b/,
    answer: () =>
      `🛠️ ${siteConfig.shortName} works across ${professionalRoles.length} roles:\n\n${professionalRoles
        .map((r, i) => `${i + 1}. ${r.title}`)
        .join("\n")}${goto("roles", "See skills and tools")}`,
  },
  {
    id: "design",
    test: /\b(ui|ux|design|wireframes?|prototypes?|mockups?|desain|figma)\b/,
    answer: () =>
      `🎨 UI/UX is one of ${siteConfig.shortName}'s core roles, not a side interest.\n\nHe led the interface design for the Topas Multi Finance corporate website and its mobile loan application, working from user flows and wireframes through to high-fidelity screens.\n\nTools: Figma, Adobe XD, Adobe Illustrator, and Balsamiq for early wireframes.`,
  },
  {
    id: "analyst",
    test: /\b(system analyst|business analyst|requirements?|documentation|flowcharts?|analysis|analis)\b/,
    answer: () =>
      `📋 System analysis is where ${siteConfig.shortName} started, at PT Astra Honda Motor and later PT Topas Multi Finance.\n\nThe work covers gathering requirements from business teams, mapping processes into flowcharts and BPMN, writing functional specifications developers can build from, defining data and validation rules, and supporting UAT before release.`,
  },

  /* ── Certificates ── */
  {
    id: "certificates",
    test: /\b(certif\w*|sertif\w*|credential\w*|trainings?|courses?|kursuss?|award\w*|achievement\w*|penghargaan)\b/,
    answer: () =>
      `🏆 ${siteConfig.shortName} holds ${certificates.length} certificates:\n\n${certificates
        .map((c, i) => `${i + 1}. ${c.title}\n   ${c.issuer} · ${c.date}`)
        .join("\n\n")}${goto("certificates", "See my certificates")}`,
  },

  /* ── Teaching ── */
  {
    id: "teaching",
    test: /\b(teach|tutor|mengajar|guru|students?|les|bimbel|math|physics)\b/,
    answer: () =>
      `📚 ${siteConfig.shortName} teaches Mathematics, Physics, and English part-time at Student Center, adapting each lesson to the student's own pace.\n\nVIP Course recognised him in 2025 for outstanding teaching performance in Mathematics and English.`,
  },

  /* ── Contact & resume ── */
  {
    id: "resume",
    test: /\b(resume|cv|curriculum|download|unduh)\b/,
    answer: () =>
      `📄 Here is the latest resume:\n\n${siteConfig.contacts.resumeDownloadUrl}`,
  },
  {
    id: "whatsapp",
    test: /\b(whatsapp|wa\b|phone|call|telp|hp|nomor|number)\b/,
    answer: () => `📱 Message ${siteConfig.shortName} on WhatsApp:\n\n${siteConfig.contacts.whatsapp}`,
  },
  {
    id: "email",
    test: /\b(e.?mail|gmail|surat)\b/,
    answer: () => `📧 You can reach him by email:\n\nmailto:${siteConfig.contacts.email}`,
  },
  {
    id: "contact",
    test: /\b(contact|reach|get in touch|social|media|sosmed|follow|instagram|ig\b|linkedin|hubungi|kontak)\b/,
    answer: () =>
      `🔗 Here is how to reach ${siteConfig.shortName}:\n\nmailto:${siteConfig.contacts.email}\n${siteConfig.contacts.whatsapp}\n${siteConfig.contacts.linkedin}\n${siteConfig.contacts.instagram}\n\nEmail and WhatsApp are quickest — he usually replies the same day.`,
  },

  /* ── Meta ── */
  {
    id: "help",
    test: /\b(help|bantuan|menu|what can you|apa saja|options|topics)\b/,
    answer: () =>
      `Happy to help. Here is what I can cover: 💡\n\n• 📁 Projects — "Show me your projects"\n• 💼 Experience — "Where has he worked?"\n• 🛠️ Skills — "Does he know Laravel?"\n• 🎓 Education — "Where did he study?"\n• 🏆 Certificates — "What certificates?"\n• 💼 Hiring — "Is he available for work?"\n• 📄 Resume — "Can I download the CV?"\n• 📱 Contact — "How do I get in touch?"\n\nOr just ask in your own words — I'll do my best.`,
  },
]

/** Try to match a specific project by name before falling back. */
/**
 * Words that appear in a project title but also carry their own topic, so
 * matching on them hijacks the wrong answer — "what certificates do you have"
 * would otherwise return the Vehicle Registration Certificate System project.
 */
const TITLE_STOPWORDS = new Set([
  "multi",
  "finance",
  "website",
  "system",
  "application",
  "certificate",
  "certificates",
  "project",
  "projects",
  "profile",
  "company",
  "professional",
  "partners",
])

function findProject(q: string) {
  return projects.find((p) => {
    const words = p.title
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 4 && !TITLE_STOPWORDS.has(w))
    return words.some((w) => q.includes(w))
  })
}

/** Shown when the AI fallback is unavailable — no key, quota spent, or an error. */
const STATIC_FALLBACK = `I'm not sure I caught that one. 🤔\n\nI know ${siteConfig.shortName}'s work well, so try me on any of these:\n\n• "What is this website?"\n• "Where has he worked?"\n• "Does he know React?"\n• "Is he available for hire?"\n• "Tell me about the HR Topas project"\n\nIf your question is for ${siteConfig.shortName} directly, email or WhatsApp him — he usually replies the same day:\n\nmailto:${siteConfig.contacts.email}`

const QUOTA_MESSAGE = `I've hit my question limit for now. ⏳\n\nThe limit resets shortly, so do try again in a little while. In the meantime the buttons below still work — they answer instantly.\n\nAnd if it's urgent, ${siteConfig.shortName} reads his email himself:\n\nmailto:${siteConfig.contacts.email}`

/** Returns null when no rule matches, so the caller can try the AI fallback. */
function getBotReply(input: string): string | null {
  const q = input.toLowerCase().trim()

  // A named project beats a generic rule — "tell me about HR Topas" should not
  // return the whole project list.
  const project = findProject(q)
  if (project && /\b(what|how|tell|explain|about|detail|apa|jelaskan|ceritakan)\b/.test(q)) {
    const bits = [`📁 ${project.title}\n\n${project.detailDescription}`]
    if (project.role) bits.push(`\n👤 Role: ${project.role}`)
    if (project.stack?.length) bits.push(`🛠️ Stack: ${project.stack.join(", ")}`)
    if (project.impact) bits.push(`🎯 What changed: ${project.impact}`)
    return bits.join("\n")
  }

  for (const rule of KNOWLEDGE) {
    if (rule.test.test(q)) return rule.answer()
  }

  // Nothing matched — hand off to the AI fallback.
  return null
}

/**
 * Asks the server route, which holds the API key and grounds the model in
 * Jason's data. Any failure degrades to the static fallback, so the chat
 * behaves exactly as before when no key is configured.
 */
async function askFallback(question: string): Promise<string> {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    })

    if (!res.ok) return STATIC_FALLBACK

    const data = (await res.json()) as { status?: string; answer?: string }

    if (data.status === "ok" && data.answer) return data.answer
    if (data.status === "quota" || data.status === "busy") return QUOTA_MESSAGE
    return STATIC_FALLBACK
  } catch {
    return STATIC_FALLBACK
  }
}
/* ─────────────────────────────────────────────
   BotIcon — IT + Batik + Friendly + Cool
   Rounded robot head, happy eyes, kawung accent,
   code brackets, headset, visor stripe
───────────────────────────────────────────── */
function BotIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <Image
      src="/assets/chatbot-logo.webp"
      alt="AI Assistant Logo"
      width={64}
      height={64}
      className={className}
      priority
    />
  )
}

/* ─────────────────────────────────────────────
   Contact brands — official colours and marks, so a reply
   is recognisable before the label is even read.
───────────────────────────────────────────── */
const CONTACT_BRANDS: {
  test: (url: string) => boolean
  label: string
  bg: string
  icon: LucideIcon
}[] = [
  {
    test: (u) => u.startsWith("mailto:"),
    label: "Email me",
    bg: "#EA4335",
    icon: Mail,
  },
  {
    test: (u) => u.includes("wa.me"),
    label: "Chat on WhatsApp",
    bg: "#25D366",
    icon: MessageCircle,
  },
  {
    test: (u) => u.includes("linkedin.com"),
    label: "LinkedIn",
    bg: "#0A66C2",
    icon: Linkedin,
  },
  {
    test: (u) => u.includes("instagram.com"),
    label: "Instagram",
    bg: "linear-gradient(135deg, #833AB4 0%, #E1306C 55%, #F77737 100%)",
    icon: Instagram,
  },
  {
    test: (u) => u.includes("drive.google.com"),
    label: "Download Resume",
    bg: "#1A73E8",
    icon: Download,
  },
]

/* ─────────────────────────────────────────────
   Suggestion chips — the bot already knows what it can answer,
   so visitors should not have to guess the wording.
───────────────────────────────────────────── */
const SUGGESTIONS = [
  { emoji: "📁", label: "Projects", query: "Show me your projects" },
  { emoji: "💼", label: "Experience", query: "Tell me about your work experience" },
  { emoji: "🛠️", label: "Skills", query: "What are your skills and tools?" },
  { emoji: "🏆", label: "Certificates", query: "What certificates do you have?" },
  { emoji: "📄", label: "Resume", query: "Can I download your resume?" },
  { emoji: "📱", label: "Contact", query: "How can I contact you?" },
]

/* ─────────────────────────────────────────────
   AI Chatbot Component
───────────────────────────────────────────── */
export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Hi! 👋 I'm ${siteConfig.shortName}'s AI assistant. Ask me about projects, skills, experience, or social media & contact details!`,
      sender: "bot",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping, scrollToBottom])

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  const sendMessage = useCallback((text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return

    const userMsg: Message = { id: Date.now(), text: trimmed, sender: "user" }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    const reply = getBotReply(trimmed)

    // A matched rule answers instantly; only an unmatched question goes to the server.
    if (reply !== null) {
      setTimeout(() => {
        setMessages((prev) => [...prev, { id: Date.now() + 1, text: reply, sender: "bot" }])
        setIsTyping(false)
      }, 600 + Math.random() * 400)
      return
    }

    askFallback(trimmed).then((answer) => {
      setMessages((prev) => [...prev, { id: Date.now() + 1, text: answer, sender: "bot" }])
      setIsTyping(false)
    })
  }, [])

  const handleSend = () => sendMessage(input)

  /** Closes the chat and scrolls the page to the requested section. */
  const jumpTo = useCallback((section: string) => {
    setIsOpen(false)
    // let the panel finish closing before the scroll starts
    setTimeout(() => {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 220)
  }, [])

  const renderMessageText = (text: string) => {
    // Split on section-jump markers first, then on links, so both become buttons.
    const gotoParts = text.split(GOTO_PATTERN)

    if (gotoParts.length > 1) {
      const nodes: React.ReactNode[] = []
      for (let i = 0; i < gotoParts.length; i += 3) {
        if (gotoParts[i]) nodes.push(...renderMessageText(gotoParts[i]))
        const section = gotoParts[i + 1]
        const label = gotoParts[i + 2]
        if (section && label) {
          nodes.push(
            <button
              key={`goto-${section}-${i}`}
              type="button"
              onClick={() => jumpTo(section)}
              className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-xl bg-gold-500 px-3 py-2 text-[13px] font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-600 hover:shadow-md"
            >
              {label}
              <span aria-hidden="true">→</span>
            </button>
          )
        }
      }
      return nodes
    }

    // mailto is included so the email turns into a branded button too
    const urlRegex = /((?:https?:\/\/|mailto:)[^\s]+)/g
    const parts = text.split(urlRegex)

    return parts.map((part, index) => {
      if (/^(?:https?:\/\/|mailto:)/.test(part)) {
        const brand = CONTACT_BRANDS.find((b) => b.test(part))

        if (brand) {
          const Icon = brand.icon
          return (
            <a
              key={index}
              href={part}
              target={part.startsWith("mailto:") ? undefined : "_blank"}
              rel={part.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="mt-1.5 inline-flex w-fit items-center gap-2 rounded-xl px-3 py-2 text-[13px] font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              style={{ background: brand.bg }}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {brand.label}
            </a>
          )
        }

        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block w-fit break-all rounded-xl border border-gold-200 bg-gold-50 px-3 py-1.5 text-xs font-bold text-gold-600 transition-all duration-300 hover:bg-gold-100"
          >
            {part}
          </a>
        )
      }

      return (
        <span key={index} className="break-words [word-break:break-word] overflow-wrap-anywhere">
          {part}
        </span>
      )
    })
  }
  return (
    <>
      {/* ── Chat Panel ── */}
      <div
        className={`fixed bottom-28 right-5 z-50 w-[360px] max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-[28px] border border-gold-200/30 bg-white/95 shadow-[0_32px_80px_rgba(180,148,90,0.18),0_0_0_1px_rgba(180,148,90,0.06)] backdrop-blur-2xl transition-all duration-400 sm:right-7 ${
          isOpen
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-95 opacity-0"
        }`}
        role="dialog"
        aria-label="AI Assistant Chat"
      >
        {/* Header */}
        <div className="relative flex items-center justify-between border-b border-slate-200/60 bg-gradient-to-r from-[#060d1c] via-[#152038] to-[#1a2744] px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-400/30 bg-gradient-to-br from-[#1a2744] to-[#060d1c] shadow-[0_6px_16px_rgba(15,26,46,0.40),0_0_12px_rgba(196,164,90,0.12)]">
              <BotIcon className="h-6 w-6" />
            </span>
            <div>
              <p className="text-sm font-bold text-amber-50">AI Assistant</p>
              <p className="text-[11px] text-gold-300 font-medium">Online</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto px-4 py-4 sm:h-96 overflow-x-hidden">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-3 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-3 text-[13px] leading-relaxed shadow-sm break-words [word-break:break-word] overflow-wrap-anywhere ${
                  msg.sender === "user"
                    ? "rounded-br-md bg-gradient-to-r from-gold-500 via-gold-500 to-gold-500 text-white"
                    : "rounded-bl-md border border-slate-100 bg-slate-50 text-slate-700"
                }`}
              >
                {renderMessageText(msg.text)}
              </div>
            </div>
          ))}

          {isTyping ? (
            <div className="mb-3 flex justify-start">
              <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-slate-100 bg-slate-50 px-4 py-3 shadow-sm">
                <span className="h-2 w-2 animate-bounce rounded-full bg-gold-500 [animation-delay:0ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-gold-500 [animation-delay:150ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-gold-500 [animation-delay:300ms]" />
              </div>
            </div>
          ) : null}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion chips — one tap instead of guessing what to type */}
        <div className="border-t border-gold-100/60 bg-white/80 px-3 pb-2 pt-2.5">
          <p className="mb-1.5 px-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
            Try asking
          </p>

          <div className="flex flex-wrap gap-1.5">
            {SUGGESTIONS.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => sendMessage(item.query)}
                disabled={isTyping}
                className="flex items-center gap-1.5 rounded-full border border-gold-200 bg-gold-50 px-2.5 py-1.5 text-[13px] font-semibold leading-none text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold-400 hover:bg-gold-100 hover:text-slate-900 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0"
              >
                <span aria-hidden="true">{item.emoji}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-gold-100/50 bg-gradient-to-r from-gold-50/50 via-white to-gold-50/50 px-4 py-3">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="h-10 flex-1 rounded-full border border-gold-200/50 bg-white px-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-gold-400 focus:ring-2 focus:ring-gold-200/50"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-gold-500 to-gold-500 text-white shadow-[0_6px_16px_rgba(180,148,90,0.30)] transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_24px_rgba(180,148,90,0.35)] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:hover:scale-100"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      {/* ── Floating Button ── */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
        className="group fixed bottom-7 right-5 z-50 flex h-16 w-16 items-center justify-center rounded-full transition-all duration-300 hover:scale-110 active:scale-95 sm:right-7"
      >
        {/* Ping glow — warm gold ring pulse */}
        <span className="absolute inset-0 rounded-full bg-amber-400/20 blur-xl animate-ping" />

        {/* Floating animation */}
        <span className="absolute inset-0 rounded-full animate-[contactFloat_3s_ease-in-out_infinite]" />

        {/* Outer gold ring accent */}
        <span className="absolute inset-[-3px] rounded-full bg-gradient-to-br from-amber-400/60 via-yellow-500/40 to-amber-600/50 opacity-80 blur-[1px] transition-opacity duration-300 group-hover:opacity-100" />

        {/* Main circle — dark navy matching the bot icon's face */}
        <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-amber-300/30 bg-gradient-to-br from-[#060d1c] via-[#152038] to-[#1a2744] text-white shadow-[0_18px_42px_rgba(15,26,46,0.50),0_0_20px_rgba(196,164,90,0.15)] transition-shadow duration-300 group-hover:shadow-[0_22px_50px_rgba(15,26,46,0.60),0_0_30px_rgba(196,164,90,0.25)]">
          {isOpen ? <X className="h-6 w-6" /> : <BotIcon className="h-9 w-9" />}
        </span>

        {/* Hover tooltip */}
        {!isOpen && (
          <span
            className="absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 translate-x-2 scale-95 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100"
            style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
          >
            <span className="relative block whitespace-nowrap rounded-2xl border border-amber-200/25 bg-[#060d1c]/95 px-4 py-2.5 text-[13px] font-semibold text-amber-50 shadow-[0_12px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl">
              <span className="mr-1.5">👋</span>
              Ask me anything
              <span className="absolute -right-[6px] top-1/2 -translate-y-1/2 rotate-45 h-3 w-3 border-r border-t border-amber-200/25 bg-[#060d1c]/95" />
            </span>
          </span>
        )}
      </button>
    </>
  )
}

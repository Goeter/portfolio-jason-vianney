"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import { X, Send } from "lucide-react"
import {
  siteConfig,
  expertise,
  professionalRoles,
  projects,
  certificates,
  experiences,
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
   Knowledge Base — matches user questions
───────────────────────────────────────────── */
function getBotReply(input: string): string {
  const q = input.toLowerCase().trim()

  if (/^(hi|hello|hey|halo|hai|p|yo|hola|siang|pagi|sore|malam)\b/.test(q)) {
    return `Hi there! 👋 I'm ${siteConfig.shortName}'s AI assistant.\n\nI can help you with:\n• 📁 Projects / Portfolio\n• 🏆 Certificates / Achievements\n• 💼 Work Experience\n• 🛠️ Skills & Technologies\n• 📱 Social Media & Contact info\n• 📄 Resume / CV\n\nWhat would you like to explore?`
  }

  if (/social|media|medsos|sosmed|follow|instagram|ig|linkedin|github|git\b|hubung|contact|kontak/.test(q)) {
    return `🔗 Here are my official social media profiles and contact info:\n\n• LinkedIn: ${siteConfig.contacts.linkedin}\n• Instagram: ${siteConfig.contacts.instagram}\n• GitHub: ${siteConfig.contacts.github}\n• WhatsApp: ${siteConfig.contacts.whatsapp}\n• Email: ${siteConfig.contacts.email}`
  }

  if (/whatsapp|wa|phone|telp|hp|nomor|number/.test(q)) {
    return `📱 Feel free to chat with me on WhatsApp:\n\n• WhatsApp: ${siteConfig.contacts.whatsapp}`
  }

  if (/email|mail|e-mail/.test(q)) {
    return `📧 Email: ${siteConfig.contacts.email}`
  }

  if (/project|proyek|portfolio|portofolio|karya|work/.test(q)) {
    const list = projects
      .slice(0, 6)
      .map((p, i) => `${i + 1}. ${p.title}`)
      .join("\n")
    return `📁 Featured Projects:\n\n${list}\n\n…and ${projects.length > 6 ? `${projects.length - 6} more` : "more"}! Check the Projects section on this page to see all detail descriptions.`
  }

  if (/certif|sertif|certificate|training|course|kursus/.test(q)) {
    const list = certificates
      .slice(0, 5)
      .map((c, i) => `${i + 1}. ${c.title} (${c.issuer})`)
      .join("\n")
    return `🏆 Certificates & Credentials:\n\n${list}\n\n…and ${certificates.length > 5 ? `${certificates.length - 5} more` : "more"}! Check the Certificates section on this page to see all details.`
  }

  if (/experience|pengalaman|kerja|company|perusahaan|magang|intern/.test(q)) {
    const list = experiences
      .map((e, i) => `${i + 1}. ${e.division} at ${e.company} (${e.period})`)
      .join("\n")
    return `💼 Work Experience:\n\n${list}`
  }

  if (/skill|keahlian|expertise|bisa|kemampuan|ability|capable/.test(q)) {
    const roles = professionalRoles.map((r) => `• ${r.title}: ${r.skills.join(", ")}`).join("\n")
    return `🛠️ Technical & Professional Skills:\n\n${roles}`
  }

  if (/tool|tech|stack|teknologi|software|framework/.test(q)) {
    const tools = professionalRoles.map((r) => `• ${r.title}: ${r.tools.join(", ")}`).join("\n")
    return `⚙️ Tools & Stack used:\n\n${tools}`
  }

  if (/who|siapa|about|tentang|yourself|diri/.test(q)) {
    const roles = expertise.map((e) => e.label).join(", ")
    return `👤 About ${siteConfig.owner}:\n\n${siteConfig.description}\n\nSpecializing in: ${roles}`
  }

  if (/resume|cv|download|unduh/.test(q)) {
    return `📄 Click below to download my latest resume:\n\n• Resume: ${siteConfig.contacts.resumeDownloadUrl}`
  }

  if (/thanks|thank|makasih|terima kasih|thx|suwun/.test(q)) {
    return `You're welcome! 😊 Feel free to ask anything else about ${siteConfig.shortName}'s portfolio.`
  }

  if (/help|bantuan|menu|apa saja|what can/.test(q)) {
    return `I can help you with:\n\n• 📁 Projects — "Show projects"\n• 🏆 Certificates — "What certificates?"\n• 💼 Experience — "Work experience"\n• 🛠️ Skills — "Skills & tools"\n• 📱 Contact — "Social media profiles"\n• 📄 Resume — "Download CV"\n• 👤 About — "Who are you?"`
  }

  return `I'm here to assist! 😊 You can ask about my projects, certificates, experience, skills, resume, social media profiles, or how to contact me directly.`
}

/* ─────────────────────────────────────────────
   BotIcon — IT + Batik + Friendly + Cool
   Rounded robot head, happy eyes, kawung accent,
   code brackets, headset, visor stripe
───────────────────────────────────────────── */
function BotIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <Image
      src="/assets/chatbot-logo-transparent.png?v=3"
      alt="AI Assistant Logo"
      width={64}
      height={64}
      className={className}
      priority
    />
  )
}

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

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed) return

    const userMsg: Message = { id: Date.now(), text: trimmed, sender: "user" }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      const reply = getBotReply(trimmed)
      setMessages((prev) => [...prev, { id: Date.now() + 1, text: reply, sender: "bot" }])
      setIsTyping(false)
    }, 600 + Math.random() * 400)
  }

  const renderMessageText = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const parts = text.split(urlRegex)

    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        let label = part
        if (part.includes("wa.me")) label = "WhatsApp Chat 📱"
        else if (part.includes("linkedin.com")) label = "LinkedIn Profile 🔗"
        else if (part.includes("github.com")) label = "GitHub Profile 🐙"
        else if (part.includes("instagram.com")) label = "Instagram Profile 📸"
        else if (part.includes("drive.google.com")) label = "Download Resume PDF 📄"

        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block w-fit border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-600 rounded-xl hover:bg-teal-100 transition-all duration-300 break-all"
          >
            {label}
          </a>
        )
      }
      return <span key={index} className="break-words [word-break:break-word] overflow-wrap-anywhere">{part}</span>
    })
  }

  return (
    <>
      {/* ── Chat Panel ── */}
      <div
        className={`fixed bottom-28 right-5 z-50 w-[360px] max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-[28px] border border-teal-200/30 bg-white/95 shadow-[0_32px_80px_rgba(20,184,166,0.18),0_0_0_1px_rgba(20,184,166,0.06)] backdrop-blur-2xl transition-all duration-400 sm:right-7 ${
          isOpen
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-95 opacity-0"
        }`}
        role="dialog"
        aria-label="AI Assistant Chat"
      >
        {/* Header */}
        <div className="relative flex items-center justify-between border-b border-teal-100/50 bg-gradient-to-r from-teal-50 via-white to-cyan-50 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-[0_6px_16px_rgba(20,184,166,0.30)]">
              <BotIcon className="h-6 w-6" />
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900">AI Assistant</p>
              <p className="text-[11px] text-teal-600 font-medium">Online</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
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
                    ? "rounded-br-md bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500 text-white"
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
                <span className="h-2 w-2 animate-bounce rounded-full bg-teal-500 [animation-delay:0ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-teal-500 [animation-delay:150ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-teal-500 [animation-delay:300ms]" />
              </div>
            </div>
          ) : null}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-teal-100/50 bg-gradient-to-r from-teal-50/50 via-white to-cyan-50/50 px-4 py-3">
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
              className="h-10 flex-1 rounded-full border border-teal-200/50 bg-white px-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-200/50"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-[0_6px_16px_rgba(20,184,166,0.30)] transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_24px_rgba(20,184,166,0.35)] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:hover:scale-100"
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
        {/* Ping glow */}
        <span className="absolute inset-0 rounded-full bg-teal-500/25 blur-xl animate-ping" />

        {/* Floating animation */}
        <span className="absolute inset-0 rounded-full animate-[contactFloat_3s_ease-in-out_infinite]" />

        {/* Main circle */}
        <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-gradient-to-br from-teal-500 via-cyan-500 to-sky-500 text-white shadow-[0_18px_42px_rgba(20,184,166,0.35)] transition-shadow duration-300 group-hover:shadow-[0_22px_50px_rgba(20,184,166,0.50)]">
          {isOpen ? <X className="h-6 w-6" /> : <BotIcon className="h-9 w-9 text-white" />}
        </span>

        {/* Hover tooltip */}
        {!isOpen && (
          <span
            className="absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 translate-x-2 scale-95 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100"
            style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
          >
            <span className="relative block whitespace-nowrap rounded-2xl border border-teal-200/30 bg-white/95 px-4 py-2.5 text-[13px] font-semibold text-slate-700 shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-xl">
              <span className="mr-1.5">👋</span>
              Saya bisa membantu Anda
              <span className="absolute -right-[6px] top-1/2 -translate-y-1/2 rotate-45 h-3 w-3 border-r border-t border-teal-200/30 bg-white/95" />
            </span>
          </span>
        )}
      </button>
    </>
  )
}

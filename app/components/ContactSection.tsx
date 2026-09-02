"use client"

import { Instagram, Linkedin, Mail, MessageCircle, type LucideIcon } from "lucide-react"

import { siteConfig } from "@/lib/site-content"
import { useScrollReveal } from "@/hooks/useScrollReveal"

type Channel = {
  label: string
  value: string
  href: string
  icon: LucideIcon
  primary?: boolean
}

const channels: Channel[] = [
  {
    label: "Email",
    value: siteConfig.contacts.email,
    href: `mailto:${siteConfig.contacts.email}`,
    icon: Mail,
    primary: true,
  },
  {
    label: "WhatsApp",
    value: "+62 838 5668 1999",
    href: siteConfig.contacts.whatsapp,
    icon: MessageCircle,
    primary: true,
  },
  {
    label: "LinkedIn",
    value: "jasonvianneysugiarto",
    href: siteConfig.contacts.linkedin,
    icon: Linkedin,
  },
  {
    label: "Instagram",
    value: "@pixelnav.id",
    href: siteConfig.contacts.instagram,
    icon: Instagram,
  },
]

function ChannelCard({ channel, delay }: { channel: Channel; delay: number }) {
  const { ref, isVisible } = useScrollReveal<HTMLAnchorElement>()
  const Icon = channel.icon
  const isExternal = !channel.href.startsWith("mailto:")

  return (
    <a
      ref={ref}
      href={channel.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      style={{ transitionDelay: `${delay}ms` }}
      className={`group flex items-center gap-4 rounded-2xl border px-5 py-4 transition-all duration-300 hover:-translate-y-1 ${
        channel.primary
          ? "border-gold-400/35 bg-gold-400/[0.07] hover:border-gold-400/60 hover:bg-gold-400/[0.12]"
          : "border-white/10 bg-white/[0.03] hover:border-gold-400/35 hover:bg-white/[0.06]"
      } ${isVisible ? "reveal-visible" : "reveal-hidden"}`}
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
          channel.primary
            ? "bg-gold-400/15 text-gold-200 group-hover:bg-gold-400/25"
            : "bg-white/5 text-slate-300 group-hover:text-gold-200"
        }`}
      >
        <Icon className="h-5 w-5" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
          {channel.label}
        </span>
        <span className="mt-0.5 block truncate text-sm font-medium text-slate-100 transition-colors duration-300 group-hover:text-gold-100">
          {channel.value}
        </span>
      </span>

      <span
        aria-hidden="true"
        className="shrink-0 text-gold-400/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold-300"
      >
        →
      </span>
    </a>
  )
}

export default function ContactSection() {
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal<HTMLDivElement>()

  return (
    <section
      id="contact"
      className="relative scroll-mt-16 overflow-hidden bg-[#060D1C] py-20 md:py-24"
    >
      {/* soft gold wash, same treatment as the rest of the site */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(200,169,110,0.10),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-5 sm:px-8">
        <div
          ref={headingRef}
          className={`text-center ${headingVisible ? "reveal-visible" : "reveal-hidden"}`}
        >
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[5px] text-gold-400/70">
            Get In Touch
          </p>

          <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-gold-100 md:text-5xl">
            Let&apos;s build something{" "}
            <span className="text-gold-400">worth using</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-slate-300">
            Open to system analyst, UI/UX, and fullstack roles — and to freelance projects.
            The quickest way to reach me is email or WhatsApp; I usually reply the same day.
          </p>

          <div className="mx-auto mt-6 h-0.5 w-[58px] rounded-full bg-gradient-to-r from-gold-500 via-gold-200 to-gold-500" />
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {channels.map((channel, index) => (
            <ChannelCard key={channel.label} channel={channel} delay={index * 80} />
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-slate-500">
          Based in Surabaya, Indonesia · Available for on-site and remote work
        </p>
      </div>
    </section>
  )
}

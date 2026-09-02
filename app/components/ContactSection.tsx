"use client"

import { Instagram, Linkedin, Mail, MessageCircle, type LucideIcon } from "lucide-react"

import { siteConfig } from "@/lib/site-content"
import { useScrollReveal } from "@/hooks/useScrollReveal"

type Channel = {
  label: string
  value: string
  href: string
  icon: LucideIcon
  /** Official brand colour, so each card is recognisable at a glance. */
  tint: string
  /** Background behind the icon — a gradient for Instagram, a flat wash otherwise. */
  iconBg: string
}

const channels: Channel[] = [
  {
    label: "Email",
    value: siteConfig.contacts.email,
    href: `mailto:${siteConfig.contacts.email}`,
    icon: Mail,
    tint: "#EA4335", // Gmail red
    iconBg: "linear-gradient(135deg, rgba(234,67,53,0.22), rgba(234,67,53,0.10))",
  },
  {
    label: "WhatsApp",
    value: "+62 838 5668 1999",
    href: siteConfig.contacts.whatsapp,
    icon: MessageCircle,
    tint: "#25D366", // WhatsApp green
    iconBg: "linear-gradient(135deg, rgba(37,211,102,0.22), rgba(37,211,102,0.10))",
  },
  {
    label: "LinkedIn",
    value: "jasonvianneysugiarto",
    href: siteConfig.contacts.linkedin,
    icon: Linkedin,
    tint: "#0A66C2", // LinkedIn blue
    iconBg: "linear-gradient(135deg, rgba(10,102,194,0.30), rgba(10,102,194,0.12))",
  },
  {
    label: "Instagram",
    value: "@jasonvianney",
    href: siteConfig.contacts.instagram,
    icon: Instagram,
    tint: "#E1306C", // Instagram magenta
    iconBg: "linear-gradient(135deg, rgba(131,58,180,0.30), rgba(225,48,108,0.26), rgba(247,119,55,0.24))",
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
      style={
        {
          transitionDelay: `${delay}ms`,
          "--tint": channel.tint,
        } as React.CSSProperties
      }
      className={`group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--tint)] hover:shadow-[0_14px_34px_-14px_var(--tint)] ${
        isVisible ? "reveal-visible" : "reveal-hidden"
      }`}
    >
      {/* brand wash that warms up on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: channel.iconBg }}
      />

      <span
        className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
        style={{ background: channel.iconBg, color: channel.tint }}
      >
        <Icon className="h-5 w-5" />
      </span>

      <span className="relative min-w-0 flex-1">
        <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
          {channel.label}
        </span>
        <span className="mt-0.5 block truncate text-sm font-medium text-slate-100">
          {channel.value}
        </span>
      </span>

      <span
        aria-hidden="true"
        className="relative shrink-0 opacity-60 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
        style={{ color: channel.tint }}
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
      className="relative scroll-mt-16 overflow-hidden bg-[#060D1C] py-16 md:py-20"
    >
      {/* soft gold wash, same treatment as the rest of the site */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(200,169,110,0.10),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-5 sm:px-8">
        <div
          ref={headingRef}
          className={`text-center ${headingVisible ? "reveal-visible" : "reveal-hidden"}`}
        >
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-gold-400/70">
            Get In Touch
          </p>

          <h2 className="font-serif text-[clamp(2rem,5vw,3rem)] font-semibold leading-tight tracking-tight text-gold-100">
            Let&apos;s build something{" "}
            <span className="text-gold-400">worth using</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-slate-300 md:text-base">
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

        <p className="mt-8 text-center text-[13px] text-slate-500">
          Based in Surabaya, Indonesia · Available for on-site and remote work
        </p>
      </div>
    </section>
  )
}

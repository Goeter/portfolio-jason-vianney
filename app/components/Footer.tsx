"use client"

import Image from "next/image"
import Link from "next/link"
import { Instagram, Linkedin, ArrowUp } from "lucide-react"
import { siteConfig } from "@/lib/site-content"
import { useScrollReveal } from "@/hooks/useScrollReveal"

const BRAND_LOGO_SRC = "/assets/company-logos/icon_freelance_it.webp"

const footerNavigation = [
  { label: "Home", href: "/#home" },
  { label: "Project", href: "/#projects" },
  { label: "Certificate", href: "/#certificates" },
]

const socialLinks = [
  {
    label: "Instagram",
    href: siteConfig.contacts.instagram,
    icon: Instagram,
    gradient: "from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
    hoverShadow: "hover:shadow-[0_18px_42px_rgba(228,64,95,0.30)]",
  },
  {
    label: "LinkedIn",
    href: siteConfig.contacts.linkedin,
    icon: Linkedin,
    gradient: "from-[#0077B5] to-[#00A0DC]",
    hoverShadow: "hover:shadow-[0_18px_42px_rgba(10,102,194,0.32)]",
  },
]

export default function Footer() {
  const { ref: footerRef, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer
      ref={footerRef}
      className="relative z-10 overflow-hidden border-t border-[#C8A96E]/20 bg-[linear-gradient(135deg,#020617_0%,#07111f_42%,#0b1220_68%,#030712_100%)] text-slate-100 shadow-[0_-28px_90px_rgba(0,0,0,0.52)] backdrop-blur-2xl"
    >
      {/* ── Decorative top border glow ── */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C8A96E]/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#C8A96E]/[0.06] to-transparent" />

      {/* ── Background pattern ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_0%,rgba(200,169,110,0.18),transparent_30%),radial-gradient(circle_at_86%_12%,rgba(56,189,248,0.12),transparent_28%)]" />
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.035]"
          viewBox="0 0 800 400"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern id="footerKawung" width="48" height="48" patternUnits="userSpaceOnUse">
              <ellipse cx="24" cy="10" rx="9" ry="6" fill="none" stroke="#C8A96E" strokeWidth="0.6" />
              <ellipse cx="24" cy="38" rx="9" ry="6" fill="none" stroke="#C8A96E" strokeWidth="0.6" />
              <ellipse cx="10" cy="24" rx="6" ry="9" fill="none" stroke="#C8A96E" strokeWidth="0.6" />
              <ellipse cx="38" cy="24" rx="6" ry="9" fill="none" stroke="#C8A96E" strokeWidth="0.6" />
              <circle cx="24" cy="24" r="2.5" fill="none" stroke="#C8A96E" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="800" height="400" fill="url(#footerKawung)" />
        </svg>
      </div>

      {/* ── Main content ── */}
      <div className={`relative mx-auto grid w-full max-w-7xl gap-9 px-5 py-12 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.35fr_0.75fr_0.9fr] lg:px-12 lg:py-14 reveal-hidden ${isVisible ? "reveal-visible" : ""}`}>
        {/* Brand */}
        <div className="max-w-xl md:col-span-2 lg:col-span-1">
          <Link href="/#home" className="group inline-flex items-center gap-3 no-underline sm:gap-4">
            <span className="relative flex h-12 w-12 shrink-0 items-center justify-center sm:h-14 sm:w-14">
              <span className="absolute inset-0 rounded-full bg-[#C8A96E]/20 blur-xl transition-all duration-500 group-hover:bg-[#C8A96E]/30 group-hover:blur-2xl" />
              <Image
                src={BRAND_LOGO_SRC}
                alt="Fiat lux logo"
                width={56}
                height={56}
                className="relative h-full w-full object-contain drop-shadow-[0_0_22px_rgba(200,169,110,0.30)] transition-transform duration-300 group-hover:scale-105"
              />
            </span>

            <span className="flex min-w-0 flex-col leading-none">
              <span
                className="bg-gradient-to-r from-[#F4EDD8] via-[#FFF7E2] to-[#C8A96E] bg-clip-text text-[24px] font-semibold tracking-[0.10em] text-transparent sm:text-[28px]"
                style={{ fontFamily: "var(--font-display), Georgia, serif" }}
              >
                Fiat lux
              </span>
              <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.26em] text-[#D6B86A]/80">
                {siteConfig.role}
              </span>
            </span>
          </Link>

          <p className="mt-4 max-w-lg text-sm leading-7 text-slate-300/90 sm:pr-4">
            Professional portfolio focused on system analysis, UI/UX design, data analytics, and fullstack digital solutions for practical business needs.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#D6B86A]">
            Navigation
          </h3>
          <nav className="mt-5 flex flex-col gap-3" aria-label="Footer Navigation">
            {footerNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex w-fit text-sm font-medium text-white/90 transition-all duration-300 hover:translate-x-1 hover:text-[#D6B86A]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#D6B86A]">
            Follow Me
          </h3>
          <div className="mt-5 flex flex-wrap gap-3">
            {socialLinks.map((item) => {
              const Icon = item.icon

              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-label={item.label}
                  className={`group/social relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.07] shadow-[0_12px_30px_rgba(0,0,0,0.28)] backdrop-blur-md transition-all duration-400 hover:-translate-y-1.5 hover:border-white/25 hover:bg-white/15 ${item.hoverShadow}`}
                >
                  <span className={`absolute inset-0 rounded-full bg-gradient-to-br ${item.gradient} opacity-0 transition-opacity duration-400 group-hover/social:opacity-100`} />
                  <Icon className="relative h-5 w-5 text-white transition-transform duration-300 group-hover/social:scale-110" />
                </a>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative border-t border-[#C8A96E]/15 bg-black/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <p className="text-[12px] leading-relaxed text-slate-400">
            {siteConfig.footer}
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C8A96E]/20 bg-white/[0.05] text-[#D6B86A]/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C8A96E]/40 hover:bg-white/10 hover:text-[#D6B86A]"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}

import Image from "next/image"
import Link from "next/link"
import { Instagram, Linkedin } from "lucide-react"

const BRAND_LOGO_SRC = "/assets/company-logos/icon_freelance_it.webp"

const footerNavigation = [
  { label: "Home", href: "/#home" },
  { label: "Project", href: "/#projects" },
  { label: "Certificate", href: "/#certificates" },
]

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/pixelnav.id/",
    icon: Instagram,
    className:
      "text-[#E4405F] hover:border-[#E4405F]/60 hover:bg-[#E4405F]/10 hover:shadow-[0_18px_36px_rgba(228,64,95,0.22)]",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jasonvianneysugiarto/",
    icon: Linkedin,
    className:
      "text-[#0A66C2] hover:border-[#0A66C2]/60 hover:bg-[#0A66C2]/10 hover:shadow-[0_18px_36px_rgba(10,102,194,0.24)]",
  },
]

export default function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-[#C8A96E]/20 bg-[linear-gradient(135deg,#020617_0%,#07111f_42%,#0b1220_68%,#030712_100%)] text-slate-100 shadow-[0_-28px_90px_rgba(0,0,0,0.52)] backdrop-blur-2xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_0%,rgba(200,169,110,0.18),transparent_30%),radial-gradient(circle_at_86%_12%,rgba(56,189,248,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.035),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C8A96E]/70 to-transparent" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-9 px-5 py-10 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.35fr_0.75fr_0.9fr] lg:px-12 lg:py-12">
        <div className="max-w-xl md:col-span-2 lg:col-span-1">
          <Link href="/#home" className="group inline-flex items-center gap-4 no-underline">
            <span className="relative flex h-14 w-14 shrink-0 items-center justify-center">
              <Image
                src={BRAND_LOGO_SRC}
                alt="Fiat lux logo"
                width={56}
                height={56}
                className="h-full w-full object-contain drop-shadow-[0_0_22px_rgba(200,169,110,0.30)] transition-transform duration-300 group-hover:scale-105"
              />
            </span>

            <span className="flex min-w-0 flex-col leading-none">
              <span
                className="bg-gradient-to-r from-[#F4EDD8] via-[#FFF7E2] to-[#C8A96E] bg-clip-text text-[28px] font-semibold tracking-[0.10em] text-transparent"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Fiat lux
              </span>
              <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.26em] text-[#D6B86A]/80">
                IT Professional
              </span>
            </span>
          </Link>

          <p className="mt-3 max-w-lg text-sm leading-7 text-slate-300/90 sm:pr-4">
            Professional portfolio focused on system analysis, UI/UX design, data analytics, and fullstack digital solutions for practical business needs.
          </p>
        </div>

        <div>
          <h3 className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#D6B86A]">
            Navigation
          </h3>
          <nav className="mt-5 flex flex-col gap-3" aria-label="Footer Navigation">
            {footerNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex w-fit text-sm font-medium text-white/90 transition-colors duration-300 hover:text-[#D6B86A]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

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
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.07] shadow-[0_12px_30px_rgba(0,0,0,0.28)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${item.className}`}
                >
                  <Icon className="h-5 w-5" />
                </a>
              )
            })}
          </div>
        </div>
      </div>

      <div className="relative border-t border-[#C8A96E]/15 bg-black/10 px-5 py-4 text-center text-[12px] leading-relaxed text-slate-400 sm:px-8">
        Copyright © 2025 Jason Vianney S Portfolio Web Design. All rights reserved.
      </div>
    </footer>
  )
}

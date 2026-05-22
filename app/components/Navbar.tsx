"use client"

import { useCallback, useState } from "react"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { navItems } from "@/lib/site-content"

interface NavbarProps {
  activeSection: string
}

const NAVBAR_HEIGHT = 64

export default function Navbar({ activeSection }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev)
  }, [])

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const element = document.getElementById(sectionId)

      if (!element) return

      const targetPosition =
        element.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })

      closeMobileMenu()
    },
    [closeMobileMenu]
  )

  return (
    <>
      {/* Navbar */}
      <nav
        aria-label="Main Navigation"
        className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/70 shadow-[0_18px_60px_rgba(2,6,23,0.28)] backdrop-blur-2xl"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />

        <div className="mx-auto flex h-[64px] max-w-[1440px] items-center justify-between px-5 sm:px-6 lg:px-10">
          {/* Brand */}
          <button
            onClick={() => scrollToSection("home")}
            aria-label="Go to Home"
            className="group relative flex items-center rounded-2xl px-1 py-2 outline-none transition-transform duration-300 hover:scale-[1.015] focus-visible:ring-2 focus-visible:ring-cyan-300/50"
          >
            <div className="pointer-events-none absolute -inset-3 rounded-full bg-gradient-to-r from-[#C8A96E]/10 via-cyan-300/10 to-blue-400/10 opacity-70 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

            <span
              className="relative block text-[25px] leading-none tracking-[0.10em] text-[#F4EDD8] transition-all duration-500 group-hover:text-white"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                textShadow: `
                  0 0 10px rgba(255,255,255,0.10),
                  0 0 22px rgba(200,169,110,0.18),
                  0 0 42px rgba(125,165,200,0.12)
                `,
              }}
            >
              <span className="bg-gradient-to-r from-[#F4EDD8] via-[#FFF7E2] to-[#C8A96E] bg-clip-text text-transparent">
                Fiat lux
              </span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden items-center rounded-2xl border border-white/10 bg-white/[0.045] p-1 shadow-inner shadow-white/5 lg:flex">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative flex items-center gap-2 overflow-hidden rounded-xl px-4 py-2 text-sm font-medium outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-cyan-300/50 ${
                    isActive
                      ? "bg-white/[0.11] text-white shadow-[0_10px_32px_rgba(34,211,238,0.12)]"
                      : "text-slate-300 hover:bg-white/[0.075] hover:text-white"
                  }`}
                >
                  <span
                    className={`absolute inset-x-3 bottom-1 h-px rounded-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent transition-all duration-300 ${
                      isActive
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-70"
                    }`}
                  />

                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-300/0 via-cyan-300/[0.08] to-blue-400/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <Icon
                    className={`relative z-10 h-4 w-4 shrink-0 transition-all duration-300 ${
                      isActive
                        ? "text-cyan-200"
                        : "text-slate-400 group-hover:text-cyan-200"
                    }`}
                  />

                  <span className="relative z-10 whitespace-nowrap">
                    {item.label}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle Menu"
            onClick={toggleMobileMenu}
            className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.045] text-cyan-200 shadow-inner shadow-white/5 transition-all duration-300 hover:scale-105 hover:bg-white/[0.075] hover:text-white lg:hidden"
          >
            <div className="relative flex h-5 w-6 items-center justify-center">
              <span
                className={`absolute h-[2px] w-6 rounded-full bg-current transition-all duration-300 ease-out ${
                  isMobileMenuOpen ? "rotate-45" : "-translate-y-2"
                }`}
              />

              <span
                className={`absolute h-[2px] w-6 rounded-full bg-current transition-all duration-200 ${
                  isMobileMenuOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
                }`}
              />

              <span
                className={`absolute h-[2px] w-6 rounded-full bg-current transition-all duration-300 ease-out ${
                  isMobileMenuOpen ? "-rotate-45" : "translate-y-2"
                }`}
              />
            </div>
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          onClick={closeMobileMenu}
          className={`absolute inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Sidebar */}
        <aside
          aria-label="Mobile Navigation"
          className={`absolute right-0 top-0 h-full w-[min(300px,82vw)] border-l border-white/10 bg-slate-950/92 p-5 shadow-2xl shadow-black/40 backdrop-blur-2xl transition-transform duration-500 ease-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />

          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <button
              onClick={() => scrollToSection("home")}
              aria-label="Go to Home"
              className="group rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/50"
            >
              <span
                className="bg-gradient-to-r from-[#F4EDD8] via-[#FFF7E2] to-[#C8A96E] bg-clip-text text-[22px] font-semibold tracking-[0.10em] text-transparent transition-opacity duration-300 group-hover:opacity-90"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                Fiat lux
              </span>
            </button>

            <Button
              variant="ghost"
              size="icon"
              aria-label="Close Menu"
              onClick={closeMobileMenu}
              className="rounded-2xl border border-white/10 bg-white/[0.045] text-cyan-200 transition-all duration-300 hover:bg-white/[0.075] hover:text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Menu Items */}
          <div className="space-y-3">
            {navItems.map((item, index) => {
              const Icon = item.icon
              const isActive = activeSection === item.id

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl border px-4 py-3 text-left outline-none transition-all duration-500 focus-visible:ring-2 focus-visible:ring-cyan-300/50 ${
                    isMobileMenuOpen
                      ? "translate-x-0 opacity-100"
                      : "translate-x-8 opacity-0"
                  } ${
                    isActive
                      ? "border-cyan-300/20 bg-white/[0.11] text-white shadow-[0_12px_36px_rgba(34,211,238,0.12)]"
                      : "border-white/10 bg-white/[0.035] text-slate-300 hover:border-cyan-300/20 hover:bg-white/[0.075] hover:text-white"
                  }`}
                  style={{
                    transitionDelay: `${index * 70}ms`,
                  }}
                >
                  <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-300/0 via-cyan-300/[0.08] to-blue-400/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <span
                    className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-cyan-300/10 text-cyan-100"
                        : "bg-white/[0.045] text-slate-400 group-hover:text-cyan-200"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>

                  <span className="relative z-10 text-sm font-medium">
                    {item.label}
                  </span>

                  <span
                    className={`absolute bottom-2 left-[68px] right-4 h-px rounded-full bg-gradient-to-r from-cyan-300/70 to-transparent transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                    }`}
                  />
                </button>
              )
            })}
          </div>
        </aside>
      </div>
    </>
  )
}

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
      <nav
        aria-label="Main Navigation"
        className="fixed inset-x-0 top-0 z-50 border-b border-zinc-800 bg-black shadow-[0_18px_70px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/16 to-transparent" />

        <div className="mx-auto flex h-[64px] max-w-[1440px] items-center justify-between px-5 sm:px-6 lg:px-10">
          <button
            onClick={() => scrollToSection("home")}
            aria-label="Go to Home"
            className="group relative flex items-center rounded-2xl px-1 py-2 outline-none transition-transform duration-300 hover:scale-[1.015] focus-visible:ring-2 focus-visible:ring-amber-200/50"
          >
            <div className="pointer-events-none absolute -inset-3 rounded-full bg-gradient-to-r from-amber-200/10 via-white/10 to-sky-300/10 opacity-70 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

            <span
              className="relative block text-[25px] leading-none tracking-[0.10em] transition-all duration-500"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                textShadow: "0 0 18px rgba(251,191,36,0.24), 0 0 36px rgba(255,255,255,0.10)",
              }}
            >
              <span className="bg-gradient-to-r from-[#F4EDD8] via-[#FFF7E2] to-[#C8A96E] bg-clip-text text-transparent">
                Fiat lux
              </span>
            </span>
          </button>

          <div className="hidden items-center gap-5 lg:flex">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative flex items-center gap-2 px-1 py-2 text-sm font-medium outline-none transition-all duration-300 focus-visible:rounded-lg focus-visible:ring-2 focus-visible:ring-amber-200/50 ${
                    isActive ? "text-amber-100" : "text-zinc-300 hover:text-white"
                  }`}
                >
                  <span
                    className={`pointer-events-none absolute -inset-x-3 -inset-y-2 rounded-full bg-amber-300/0 blur-xl transition-all duration-500 ${
                      isActive ? "bg-amber-300/20 opacity-100" : "opacity-0 group-hover:bg-white/10 group-hover:opacity-100"
                    }`}
                  />

                  <span className="pointer-events-none absolute inset-y-0 -left-6 w-5 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/18 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:left-full group-hover:opacity-100" />

                  <Icon
                    className={`relative z-10 h-4 w-4 shrink-0 transition-all duration-300 ${
                      isActive
                        ? "text-amber-200 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]"
                        : "text-zinc-400 group-hover:scale-105 group-hover:text-amber-100"
                    }`}
                  />

                  <span
                    className={`relative z-10 whitespace-nowrap transition-all duration-300 ${
                      isActive ? "drop-shadow-[0_0_10px_rgba(251,191,36,0.95)]" : ""
                    }`}
                  >
                    {item.label}
                  </span>

                  <span
                    className={`absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-transparent via-amber-300 to-transparent transition-all duration-300 ${
                      isActive
                        ? "scale-x-100 opacity-100 shadow-[0_0_14px_rgba(251,191,36,0.85)]"
                        : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-80"
                    }`}
                  />
                </button>
              )
            })}
          </div>

          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle Menu"
            onClick={toggleMobileMenu}
            className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-inner shadow-white/5 transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black lg:hidden"
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

      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          onClick={closeMobileMenu}
          className={`absolute inset-0 bg-black/78 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <aside
          aria-label="Mobile Navigation"
          className={`absolute right-0 top-0 h-full w-[min(300px,82vw)] border-l border-white/10 bg-black p-5 shadow-2xl shadow-black/50 backdrop-blur-2xl transition-transform duration-500 ease-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />

          <div className="mb-8 flex items-center justify-between">
            <button
              onClick={() => scrollToSection("home")}
              aria-label="Go to Home"
              className="group rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-amber-200/50"
            >
              <span
                className="bg-gradient-to-r from-[#F4EDD8] via-[#FFF7E2] to-[#C8A96E] bg-clip-text text-[22px] font-semibold tracking-[0.10em] text-transparent transition-opacity duration-300 group-hover:opacity-90"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Fiat lux
              </span>
            </button>

            <Button
              variant="ghost"
              size="icon"
              aria-label="Close Menu"
              onClick={closeMobileMenu}
              className="rounded-2xl bg-zinc-900 text-white transition-all duration-300 hover:bg-white hover:text-black"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-1">
            {navItems.map((item, index) => {
              const Icon = item.icon
              const isActive = activeSection === item.id

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-xl border-b border-white/10 px-1 py-4 text-left outline-none transition-all duration-500 focus-visible:ring-2 focus-visible:ring-amber-200/50 ${
                    isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                  } ${isActive ? "text-amber-100" : "text-zinc-300 hover:text-white"}`}
                  style={{ transitionDelay: `${index * 70}ms` }}
                >
                  <span
                    className={`pointer-events-none absolute -inset-y-1 left-0 w-24 rounded-full blur-xl transition-all duration-500 ${
                      isActive ? "bg-amber-300/20 opacity-100" : "opacity-0 group-hover:bg-white/10 group-hover:opacity-100"
                    }`}
                  />

                  <Icon
                    className={`relative z-10 h-5 w-5 shrink-0 transition-all duration-300 ${
                      isActive
                        ? "text-amber-200 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]"
                        : "text-zinc-400 group-hover:text-amber-100"
                    }`}
                  />

                  <span
                    className={`relative z-10 text-sm font-medium ${
                      isActive ? "drop-shadow-[0_0_10px_rgba(251,191,36,0.85)]" : ""
                    }`}
                  >
                    {item.label}
                  </span>

                  <span
                    className={`absolute bottom-0 left-0 h-px rounded-full bg-gradient-to-r from-amber-300 to-transparent transition-all duration-300 ${
                      isActive ? "w-32 opacity-100" : "w-0 opacity-0 group-hover:w-24 group-hover:opacity-70"
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

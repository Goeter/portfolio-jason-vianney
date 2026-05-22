"use client"

import { useCallback, useState } from "react"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { navItems } from "@/lib/site-content"

interface NavbarProps {
  activeSection: string
}

const NAVBAR_HEIGHT = 64


export default function Navbar({
  activeSection,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false)

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev)
  }, [])

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const element =
        document.getElementById(sectionId)

      if (!element) return

      const targetPosition =
        element.getBoundingClientRect().top +
        window.scrollY -
        NAVBAR_HEIGHT

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
        className="fixed inset-x-0 top-0 z-50 border-b border-cyan-500/15 bg-slate-950/72 shadow-lg shadow-cyan-500/5 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-[64px] items-center justify-between px-5 sm:px-6 lg:px-10">

          {/* Brand */}
          <button
            onClick={() => scrollToSection("home")}
            aria-label="Go to Home"
            className="group relative flex items-center pl-1"
          >
            <div className="relative">

              {/* Ambient Glow */}
              <div className="absolute inset-0 -z-10 scale-150 opacity-70 blur-2xl">
                <div className="h-full w-full rounded-full bg-gradient-to-r from-[#C8A96E]/25 via-cyan-300/20 to-blue-400/20" />
              </div>

              {/* Light Sweep */}
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <div className="absolute -left-[120%] top-0 h-full w-[90%] skew-x-[-25deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-[2200ms] ease-out group-hover:translate-x-[260%]" />
              </div>

              {/* Text */}
              <span
                className="relative block text-[25px] leading-none tracking-[0.10em] text-[#F4EDD8] transition-all duration-500 group-hover:scale-[1.03] group-hover:text-white"
                style={{
                  fontFamily:
                    "'Cormorant Garamond', serif",
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
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive =
                activeSection === item.id

              return (
                <button
                  key={item.id}
                  onClick={() =>
                    scrollToSection(item.id)
                  }
                  aria-label={item.label}
                  className={`group relative flex items-center gap-2 overflow-hidden rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 will-change-transform ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20"
                      : "text-slate-300 hover:bg-white/10 hover:text-cyan-300"
                  }`}
                >

                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-xl bg-cyan-400/10 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />

                  <Icon className="relative z-10 h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-110" />

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
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-cyan-300 transition-all duration-300 hover:scale-105 hover:bg-cyan-500/10 hover:text-white lg:hidden"
          >
            <div className="relative flex h-5 w-6 items-center justify-center">

              {/* Top */}
              <span
                className={`absolute h-[2px] w-6 rounded-full bg-current transition-all duration-300 ease-out ${
                  isMobileMenuOpen
                    ? "rotate-45"
                    : "-translate-y-2"
                }`}
              />

              {/* Middle */}
              <span
                className={`absolute h-[2px] w-6 rounded-full bg-current transition-all duration-200 ${
                  isMobileMenuOpen
                    ? "scale-0 opacity-0"
                    : "scale-100 opacity-100"
                }`}
              />

              {/* Bottom */}
              <span
                className={`absolute h-[2px] w-6 rounded-full bg-current transition-all duration-300 ease-out ${
                  isMobileMenuOpen
                    ? "-rotate-45"
                    : "translate-y-2"
                }`}
              />
            </div>
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          isMobileMenuOpen
            ? "pointer-events-auto"
            : "pointer-events-none"
        }`}
      >

        {/* Overlay */}
        <div
          onClick={closeMobileMenu}
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen
              ? "opacity-100"
              : "opacity-0"
          }`}
        />

        {/* Sidebar */}
        <aside
          aria-label="Mobile Navigation"
          className={`absolute right-0 top-0 h-full w-[280px] border-l border-cyan-500/15 bg-slate-950/95 p-5 shadow-2xl backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "translate-x-full"
          }`}
        >

          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-wide text-white">
              Navigation
            </h2>

            <Button
              variant="ghost"
              size="icon"
              aria-label="Close Menu"
              onClick={closeMobileMenu}
              className="rounded-xl text-cyan-300 transition-all duration-300 hover:bg-cyan-500/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Menu Items */}
          <div className="space-y-3">
            {navItems.map((item, index) => {
              const Icon = item.icon
              const isActive =
                activeSection === item.id

              return (
                <button
                  key={item.id}
                  onClick={() =>
                    scrollToSection(item.id)
                  }
                  aria-label={item.label}
                  className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-xl px-4 py-3 text-left transition-all duration-500 will-change-transform ${
                    isMobileMenuOpen
                      ? "translate-x-0 opacity-100"
                      : "translate-x-8 opacity-0"
                  } ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20"
                      : "text-slate-300 hover:bg-white/10 hover:text-cyan-300"
                  }`}
                  style={{
                    transitionDelay: `${index * 70}ms`,
                  }}
                >

                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-xl bg-cyan-400/10 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />

                  <Icon className="relative z-10 h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110" />

                  <span className="relative z-10 text-sm font-medium">
                    {item.label}
                  </span>
                </button>
              )
            })}
          </div>
        </aside>
      </div>
    </>
  )
}

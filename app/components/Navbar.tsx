"use client"

import { useState } from "react"
import {
  Home,
  FolderOpen,
  X,
  Wrench,
  Briefcase,
  Award,
  Menu,
} from "lucide-react"

import { Button } from "@/components/ui/button"

interface NavbarProps {
  activeSection: string
}

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "roles", label: "Professional Expertise", icon: Wrench },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "experience", label: "Experience", icon: Briefcase },
]

export default function Navbar({ activeSection }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)

    if (!element) return

    const navbarHeight = 90

    const targetPosition =
      element.getBoundingClientRect().top +
      window.scrollY -
      navbarHeight

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    })

    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-4 left-1/2 z-50 w-[92%] sm:w-[90%] md:w-[88%] lg:w-[84%] xl:w-[80%] max-w-5xl -translate-x-1/2 rounded-2xl border border-cyan-400/20 bg-slate-950/70 shadow-[0_8px_30px_rgba(0,255,255,0.08)] backdrop-blur-xl transition-all duration-500">
        
        <div className="flex h-[64px] md:h-[70px] items-center justify-between px-5 sm:px-6 lg:px-8">
          
          {/* Logo */}
          <div className="flex items-center pl-1 sm:pl-2">
            <div className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 via-cyan-500 to-purple-500 shadow-lg shadow-cyan-500/30 transition-all duration-500 hover:scale-110 hover:rotate-6">
              
              {/* Glow */}
              <div className="absolute inset-0 rounded-full bg-cyan-400/30 blur-md opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <span className="relative z-10 text-sm font-bold tracking-wider text-white">
                JV
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-md shadow-[0_0_25px_rgba(34,211,238,0.08)]">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`group relative flex items-center gap-2 overflow-hidden rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20"
                      : "text-slate-300 hover:bg-white/10 hover:text-cyan-300"
                  }`}
                >
                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-cyan-400/10 blur-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <Icon className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />

                  <span className="relative z-10 whitespace-nowrap">
                    {item.label}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Mobile Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden rounded-xl text-cyan-300 transition-all duration-300 hover:bg-cyan-500/10 hover:text-white hover:scale-105"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Sidebar */}
          <div className="absolute right-0 top-0 h-full w-[280px] border-l border-cyan-500/20 bg-slate-950/95 p-5 shadow-2xl backdrop-blur-xl transition-all duration-500">
            
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-lg font-semibold tracking-wide text-white">
                Navigation
              </h2>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-xl text-cyan-300 transition-all duration-300 hover:bg-cyan-500/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Menu Items */}
            <div className="space-y-3">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.id

                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl px-4 py-3 text-left transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20"
                        : "text-slate-300 hover:bg-white/10 hover:text-cyan-300"
                    }`}
                  >
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-cyan-400/10 blur-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <Icon className="relative z-10 h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110" />

                    <span className="relative z-10 text-sm font-medium">
                      {item.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

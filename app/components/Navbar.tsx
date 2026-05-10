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

    const navbarHeight = 80
    const targetPosition =
      element.getBoundingClientRect().top + window.scrollY - navbarHeight

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    })

    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-cyan-500/20 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 shadow-lg shadow-cyan-500/20">
              <span className="text-sm font-bold tracking-wide text-white">
                JV
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-2 backdrop-blur-md">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                      : "text-slate-300 hover:bg-white/10 hover:text-cyan-300"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="whitespace-nowrap">{item.label}</span>
                </button>
              )
            })}
          </div>

          {/* Mobile Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-cyan-300 hover:bg-cyan-500/10 hover:text-white"
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
          <div className="absolute right-0 top-0 h-full w-[280px] border-l border-cyan-500/20 bg-slate-950/95 p-5 shadow-2xl backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Navigation</h2>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-cyan-300 hover:bg-cyan-500/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-3">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.id

                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-300 ${
                      isActive
                        ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                        : "text-slate-300 hover:bg-white/10 hover:text-cyan-300"
                    }`}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span className="text-sm font-medium">
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

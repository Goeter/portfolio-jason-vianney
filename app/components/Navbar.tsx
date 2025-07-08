"use client"

import { useState } from "react"
import { Home, User, FolderOpen, X, Wrench, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  activeSection: string
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const toggleMobileMenu = () => {
    setIsAnimating(true)
    setIsMobileMenuOpen(!isMobileMenuOpen)
    setTimeout(() => setIsAnimating(false), 300)
  }

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "skills", label: "Skills & Tools", icon: Wrench },
    { id: "about", label: "About", icon: User },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "experience", label: "Experience", icon: Briefcase },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navbarHeight = 80
      const windowHeight = window.innerHeight
      const elementHeight = element.offsetHeight
      const elementTop = element.offsetTop

      // Calculate position to center the section
      let scrollPosition
      if (elementHeight < windowHeight) {
        // If section is smaller than viewport, center it
        scrollPosition = elementTop - (windowHeight - elementHeight) / 2 - navbarHeight / 2
      } else {
        // If section is larger than viewport, position it just below navbar
        scrollPosition = elementTop - navbarHeight
      }

      window.scrollTo({
        top: Math.max(0, scrollPosition),
        behavior: "smooth",
      })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">JV</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 text-sm ${
                      isActive
                        ? "text-green-600 font-bold shadow-lg bg-white/20"
                        : "text-gray-700 hover:text-green-600 hover:font-bold hover:shadow-md"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Mobile Menu Button with Animation */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden transition-transform duration-300"
              onClick={toggleMobileMenu}
            >
              <div className={`transition-all duration-300 ${isMobileMenuOpen ? "rotate-90 scale-110" : ""}`}>
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 transition-transform duration-300" />
                ) : (
                  <div className="flex flex-col space-y-1 transition-all duration-300">
                    <div
                      className={`w-5 h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
                    ></div>
                    <div
                      className={`w-5 h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
                    ></div>
                    <div
                      className={`w-5 h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
                    ></div>
                  </div>
                )}
              </div>
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay with Enhanced Animation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div
            className={`fixed right-0 top-0 h-full w-80 bg-white/95 backdrop-blur-md shadow-xl border-l border-gray-200/50 transform transition-all duration-500 ease-out ${
              isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            }`}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2
                className={`text-lg font-semibold transition-all duration-300 delay-100 ${isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"}`}
              >
                Menu
              </h2>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-6 h-6" />
              </Button>
            </div>
            <div className="p-4 space-y-4">
              {navItems.map((item, index) => {
                const Icon = item.icon
                const isActive = activeSection === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all duration-500 ease-out transform ${
                      isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                    } ${
                      isActive
                        ? "text-green-600 font-bold bg-white/20 scale-105"
                        : "text-gray-700 hover:text-green-600 hover:bg-white/10 hover:scale-105"
                    }`}
                    style={{
                      transitionDelay: isMobileMenuOpen ? `${(index + 1) * 100}ms` : "0ms",
                    }}
                  >
                    <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? "scale-110" : ""}`} />
                    <span className="transition-all duration-300">{item.label}</span>
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

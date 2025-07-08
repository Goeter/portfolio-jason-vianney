"use client"

import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import HomeSection from "./components/HomeSection"
import SkillsToolsSection from "./components/SkillsToolsSection"
import AboutSection from "./components/AboutSection"
import ProjectsSection from "./components/ProjectsSection"
import ExperienceSection from "./components/ExperienceSection"
import FloatingContact from "./components/FloatingContact"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const handleScroll = () => {
      const sections = ["home", "skills", "about", "projects", "experience"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isClient])

  useEffect(() => {
    if (!isClient) return

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up")
        }
      })
    }, observerOptions)

    // Observe all elements with scroll-animate class
    const animateElements = document.querySelectorAll(".scroll-animate")
    animateElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [isClient])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-x-hidden">
      {/* Modern Professional Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fillRule=%22evenodd%22%3E%3Cg fill=%22%23334155%22 fillOpacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        </div>

        {/* Subtle Gradient Overlays */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-blue-500/5 to-transparent" />
        <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-indigo-500/5 to-transparent" />

        {/* Modern Geometric Shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-xl" />
        <div className="absolute bottom-40 left-20 w-48 h-48 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/5 to-blue-400/5 rounded-full blur-2xl" />
      </div>

      <Navbar activeSection={activeSection} />

      <main className="relative z-10">
        <HomeSection />
        <SkillsToolsSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
      </main>

      <FloatingContact />

      {/* Full-width copyright footer at the bottom of the page */}
      <footer className="w-full bg-black py-4 relative z-10">
        <div className="container mx-auto px-4">
          <p className="text-white text-sm text-left">
            Copyright © 2025 Jason Vianney S Portfolio Web Design. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

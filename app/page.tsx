"use client"

import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import HomeSection from "./components/HomeSection"
import RolesShowcase from "./components/RolesShowcase"
import ProjectsSection from "./components/ProjectsSection"
import ExperienceSection from "./components/ExperienceSection"
import FloatingContact from "./components/FloatingContact"
import CertificatesSection from "./components/CertificatesSection"
import SplashLoader from "./components/SplashLoader"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || isLoading) return

    const handleScroll = () => {
      const sections = ["home", "roles", "projects", "certificates", "experience"]
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
  }, [isClient, isLoading])

  useEffect(() => {
    if (!isClient || isLoading) return

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
  }, [isClient, isLoading])

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  if (isLoading) {
    return <SplashLoader onLoadingComplete={handleLoadingComplete} />
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Modern Futuristic IT Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2280%22 height=%2280%22 viewBox=%220 0 80 80%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fillRule=%22evenodd%22%3E%3Cg stroke=%22%2300ffff%22 strokeWidth=%221%22%3E%3Cpath d=%22M0 0h80v80H0z%22/%3E%3Cpath d=%22M20 0v80M40 0v80M60 0v80M0 20h80M0 40h80M0 60h80%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse" />
        </div>

        {/* Bright Neon Geometric Shapes */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-40 right-32 w-48 h-48 bg-gradient-to-r from-purple-400/30 to-pink-500/30 rounded-full blur-2xl animate-bounce"
          style={{ animationDuration: "3s" }}
        />
        <div
          className="absolute bottom-32 left-40 w-56 h-56 bg-gradient-to-r from-green-400/30 to-emerald-500/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 rounded-full blur-2xl animate-bounce"
          style={{ animationDuration: "4s", animationDelay: "2s" }}
        />

        {/* Circuit Board Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Horizontal Lines */}
            <path d="M0 100 L300 100 L350 150 L600 150 L650 100 L1200 100" stroke="#00ffff" strokeWidth="2" />
            <path
              d="M0 300 L200 300 L250 250 L500 250 L550 300 L800 300 L850 350 L1200 350"
              stroke="#ff00ff"
              strokeWidth="2"
            />
            <path d="M0 500 L400 500 L450 450 L700 450 L750 500 L1200 500" stroke="#00ff00" strokeWidth="2" />
            <path
              d="M0 700 L150 700 L200 650 L450 650 L500 700 L750 700 L800 650 L1200 650"
              stroke="#ffff00"
              strokeWidth="2"
            />

            {/* Vertical Lines */}
            <path d="M200 0 L200 200 L250 250 L250 400 L200 450 L200 800" stroke="#00ffff" strokeWidth="2" />
            <path d="M500 0 L500 150 L550 200 L550 350 L500 400 L500 800" stroke="#ff00ff" strokeWidth="2" />
            <path d="M800 0 L800 100 L850 150 L850 300 L800 350 L800 800" stroke="#00ff00" strokeWidth="2" />

            {/* Circuit Nodes */}
            <circle cx="200" cy="100" r="8" fill="#00ffff" className="animate-pulse" />
            <circle
              cx="500"
              cy="250"
              r="8"
              fill="#ff00ff"
              className="animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
            <circle cx="800" cy="350" r="8" fill="#00ff00" className="animate-pulse" style={{ animationDelay: "1s" }} />
            <circle
              cx="350"
              cy="500"
              r="8"
              fill="#ffff00"
              className="animate-pulse"
              style={{ animationDelay: "1.5s" }}
            />
          </svg>
        </div>

        {/* Floating Data Particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-ping"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-green-400 rounded-full animate-ping"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping"
            style={{ animationDelay: "3s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-1 h-1 bg-pink-400 rounded-full animate-ping"
            style={{ animationDelay: "4s" }}
          />
        </div>

        {/* Holographic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-cyan-500/5 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent" />

        {/* Matrix-style Binary Rain Effect */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-10 text-green-400 text-xs font-mono animate-pulse">
            01001000 01100101 01101100 01101100 01101111
          </div>
          <div
            className="absolute top-20 left-32 text-cyan-400 text-xs font-mono animate-pulse"
            style={{ animationDelay: "1s" }}
          >
            01010111 01101111 01110010 01101100 01100100
          </div>
          <div
            className="absolute top-40 left-16 text-purple-400 text-xs font-mono animate-pulse"
            style={{ animationDelay: "2s" }}
          >
            01000100 01100001 01110100 01100001
          </div>
        </div>
      </div>

      <Navbar activeSection={activeSection} />

      <main className="relative z-10">
        <HomeSection />
        <RolesShowcase />
        <ProjectsSection />
        <CertificatesSection />
        <ExperienceSection />
      </main>

      <FloatingContact />

      {/* Futuristic Footer */}
      <footer className="w-full bg-gradient-to-r from-slate-900/90 via-blue-900/90 to-purple-900/90 backdrop-blur-sm py-6 relative z-10 border-t border-cyan-500/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <p className="text-cyan-300 text-sm font-mono">
              Copyright © 2025 Jason Vianney S Portfolio Web Design. All rights reserved.
            </p>
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

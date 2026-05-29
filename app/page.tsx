"use client"

import { useEffect, useMemo, useState } from "react"

import CertificatesSection from "./components/CertificatesSection"
import ExperienceSection from "./components/ExperienceSection"
import FloatingContact from "./components/FloatingContact"
import Footer from "./components/Footer"
import HomeSection from "./components/HomeSection"
import Navbar from "./components/Navbar"
import ProjectsSection from "./components/ProjectsSection"
import RolesShowcase from "./components/RolesShowcase"
import SplashLoader from "./components/SplashLoader"
import { navItems } from "@/lib/site-content"

const SPLASH_STORAGE_KEY = "hasShownSplash"
const NAVBAR_SCROLL_OFFSET = 100

function SiteBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 bg-[#020617]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(56,189,248,0.18),transparent_28%),radial-gradient(circle_at_84%_18%,rgba(168,85,247,0.14),transparent_30%),radial-gradient(circle_at_50%_92%,rgba(250,204,21,0.08),transparent_35%)]" />
      <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,rgba(148,163,184,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.5)_1px,transparent_1px)] bg-[size:96px_96px]" />
    </div>
  )
}

export default function Home() {
  const [activeSection, setActiveSection] = useState(navItems[0]?.id ?? "home")
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window === "undefined") return true
    return !sessionStorage.getItem(SPLASH_STORAGE_KEY)
  })

  const sectionIds = useMemo(() => navItems.map((item) => item.id), [])

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || isLoading) return

    let scrollFrame = 0

    const updateActiveSection = () => {
      cancelAnimationFrame(scrollFrame)

      scrollFrame = requestAnimationFrame(() => {
        const scrollPosition = window.scrollY + NAVBAR_SCROLL_OFFSET

        for (const sectionId of sectionIds) {
          const section = document.getElementById(sectionId)
          if (!section) continue

          const isCurrentSection =
            scrollPosition >= section.offsetTop &&
            scrollPosition < section.offsetTop + section.offsetHeight

          if (isCurrentSection) {
            setActiveSection((current) =>
              current === sectionId ? current : sectionId
            )
            break
          }
        }
      })
    }

    updateActiveSection()
    window.addEventListener("scroll", updateActiveSection, { passive: true })

    return () => {
      cancelAnimationFrame(scrollFrame)
      window.removeEventListener("scroll", updateActiveSection)
    }
  }, [isClient, isLoading, sectionIds])

  const handleLoadingComplete = () => {
    setIsLoading(false)
    sessionStorage.setItem(SPLASH_STORAGE_KEY, "true")
  }

  if (isLoading) {
    return <SplashLoader onLoadingComplete={handleLoadingComplete} />
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#020617]">
      <SiteBackdrop />
      <Navbar activeSection={activeSection} />

      <main className="relative z-10">
        <HomeSection />
        <RolesShowcase />
        <ProjectsSection />
        <CertificatesSection />
        <ExperienceSection />
      </main>

      <FloatingContact />
      <Footer />
    </div>
  )
}

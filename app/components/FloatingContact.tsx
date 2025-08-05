"use client"

import { useState } from "react"
import { Github, Linkedin, Instagram, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FloatingContact() {
  const [isExpanded, setIsExpanded] = useState(false)

  const contactLinks = [
    {
      icon: Github,
      href: "https://github.com/Goeter",
      color: "bg-gray-800 hover:bg-gray-700",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/jasonvianneysugiarto",
      color: "bg-blue-600 hover:bg-blue-500",
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/jasonvianney/",
      color:
        "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:from-pink-600 hover:via-red-600 hover:to-yellow-600",
      label: "Instagram",
    },
    {
      icon: Mail,
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=jasonvianneys@gmail.com&su=Collaboration%20Opportunity&body=Hello%20Jason,%0D%0A%0D%0AI%20would%20like%20to%20discuss%20a%20collaboration%20opportunity%20with%20you.%20Please%20contact%20me%20for%20collaborations,%20freelance%20work,%20or%20other%20opportunities.%20I%20am%20always%20open%20to%20creative%20conversations.%0D%0A%0D%0ABest%20regards,",
      color: "bg-red-500 hover:bg-red-600",
      label: "Gmail",
    },
  ]

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="flex flex-col items-end space-y-3">
        {/* Contact Icons */}
        <div
          className={`flex flex-col space-y-3 transition-all duration-300 ${
            isExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          {contactLinks.map((link, index) => {
            const Icon = link.icon
            return (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 rounded-full ${link.color} flex items-center justify-center text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300`}
                aria-label={link.label}
                title={
                  link.label === "Gmail"
                    ? "Please contact me for collaborations, freelance work, or other opportunities. I am always open to creative conversations."
                    : link.label
                }
              >
                <Icon className="w-6 h-6" />
              </a>
            )
          })}
        </div>

        {/* Main Contact Button */}
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-16 h-16 rounded-full bg-green-400 hover:bg-green-300 text-black font-bold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
        >
          <div className={`transition-transform duration-300 ${isExpanded ? "rotate-45" : ""}`}>
            {isExpanded ? (
              <div className="relative w-6 h-6">
                <div className="absolute top-1/2 left-0 w-6 h-0.5 bg-black transform -translate-y-1/2"></div>
                <div className="absolute top-0 left-1/2 w-0.5 h-6 bg-black transform -translate-x-1/2"></div>
              </div>
            ) : (
              <span>Contact</span>
            )}
          </div>
        </Button>
      </div>
    </div>
  )
}

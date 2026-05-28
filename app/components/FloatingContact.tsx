"use client"

import { useState } from "react"
import { Github, Linkedin, Mail } from "lucide-react"
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
      icon: Mail,
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=jasonvianneys@gmail.com",
      color: "bg-red-500 hover:bg-red-600",
      label: "Gmail",
    },
  ]

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="flex flex-col items-end space-y-4">
        
        {/* Contact Icons */}
        <div
          className={`flex flex-col space-y-3 transition-all duration-500 ${
            isExpanded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6 pointer-events-none"
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
                className={`
                  w-12 h-12 rounded-full ${link.color}
                  flex items-center justify-center text-white
                  shadow-lg backdrop-blur-md
                  transform transition-all duration-500
                  hover:scale-125 hover:-translate-y-1
                  hover:shadow-2xl
                `}
                style={{
                  transitionDelay: `${index * 80}ms`,
                }}
                aria-label={link.label}
              >
                <Icon className="w-5 h-5" />
              </a>
            )
          })}
        </div>

        {/* Main Button */}
        <div className="relative">
          
          {/* Glow Pulse */}
          <div className="absolute inset-0 rounded-full bg-green-400 opacity-40 blur-xl animate-ping"></div>

          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            className="
              relative
              w-16 h-16 rounded-full
              bg-green-400 hover:bg-green-300
              text-black font-semibold text-sm
              shadow-xl
              flex items-center justify-center
              transition-all duration-300
              hover:scale-110
              active:scale-95
            "
          >
            {/* Floating effect */}
            <div className="absolute inset-0 rounded-full animate-[contactFloat_3s_ease-in-out_infinite]"></div>

            {/* Content */}
            <div
              className={`transition-all duration-300 ${
                isExpanded ? "rotate-45 scale-110" : "scale-100"
              }`}
            >
              {isExpanded ? (
                <div className="relative w-6 h-6">
                  <div className="absolute top-1/2 left-0 w-6 h-0.5 bg-black transform -translate-y-1/2"></div>
                  <div className="absolute top-0 left-1/2 w-0.5 h-6 bg-black transform -translate-x-1/2"></div>
                </div>
              ) : (
                <span className="tracking-wide">Contact</span>
              )}
            </div>
          </Button>
        </div>
      </div>

      {/* Custom animation */}
    </div>
  )
}

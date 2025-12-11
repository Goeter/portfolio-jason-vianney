"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { 
  Code, 
  BarChart3, 
  Palette, 
  Cpu
} from 'lucide-react'

function Button({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <motion.button
      {...props}
      className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 
      text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 
      shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 transform hover:scale-105
      backdrop-blur-sm border border-cyan-500/30"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}

export default function HomeSection() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleDownloadPDF = () => {
    const fileId = "10Nllp8ydFAMENKFA0089aGdT5hCijCNd95oKo_DI3NU"
    const pdfUrl = `https://docs.google.com/document/d/${fileId}/export?format=pdf`

    const link = document.createElement("a")
    link.href = pdfUrl
    link.download = "Jason_Vianney_Sugiarto_Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center pt-16 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Particle Effects */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]"></div>
        </div>

        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[80px] animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] bg-blue-500/10 rounded-full blur-[70px] animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-500/30 backdrop-blur-sm text-cyan-300 text-sm font-medium">
                IT Professional
              </span>
            </motion.div>
            
            <div className="space-y-4">
              <motion.h1 
                className="text-white text-3xl lg:text-4xl font-bold leading-snug"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Hello, I'm{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Jason Vianney Sugiarto
                </span>
              </motion.h1>

              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <div className="flex flex-wrap items-center gap-2 text-base lg:text-lg">
                  <span className="text-cyan-300 font-medium">Front-end Development</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-blue-300 font-medium">System Analysis</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-green-300 font-medium">UI/UX Design</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-orange-300 font-medium">Data Analytics</span>
                </div>
              </motion.div>

              <motion.p 
                className="text-white text-base leading-relaxed font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                IT Professional focused on creating innovative digital solutions through front-end development, 
                system analysis, user-centered design, and data-driven insights. I transform complex challenges 
                into elegant, efficient, and user-friendly experiences.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <Button onClick={handleDownloadPDF} className="group relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  <span>Download Resume</span>
                  <motion.span
                    animate={{ y: [0, 2, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="inline-block"
                  >
                    ↓
                  </motion.span>
                </span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex justify-center lg:justify-end relative"
          >
            {/* Main Profile Image - Full Transparency */}
            <div className="relative">
              {/* Animated Ring */}
              <motion.div 
                className="absolute -inset-6 rounded-full border border-cyan-400/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Profile Image Container */}
              <div className="relative w-72 h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-cyan-400/10 shadow-xl shadow-cyan-500/5 group">
                <Image
                  src="/assets/profile/home.png"
                  alt="Jason Vianney Sugiarto"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>
              
              {/* Floating Tech Bubbles */}
              <motion.div 
                className="absolute top-4 -left-4 w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/40 cursor-pointer group/bubble"
                animate={{ 
                  y: [0, -15, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3.5,
                  ease: "easeInOut"
                }}
                whileHover={{ scale: 1.15 }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover/bubble:opacity-100 transition-opacity duration-300" />
                <Code className="w-6 h-6 text-white" />
              </motion.div>
              
              <motion.div 
                className="absolute -top-3 right-12 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/40 cursor-pointer group/bubble"
                animate={{ 
                  y: [0, -20, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 4,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                whileHover={{ scale: 1.15 }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover/bubble:opacity-100 transition-opacity duration-300" />
                <Cpu className="w-5 h-5 text-white" />
              </motion.div>
              
              <motion.div 
                className="absolute bottom-6 -right-3 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/40 cursor-pointer group/bubble"
                animate={{ 
                  y: [0, 10, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3.2,
                  ease: "easeInOut",
                  delay: 1
                }}
                whileHover={{ scale: 1.15 }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover/bubble:opacity-100 transition-opacity duration-300" />
                <Palette className="w-5 h-5 text-white" />
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-2 left-16 w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/40 cursor-pointer group/bubble"
                animate={{ 
                  y: [0, 15, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 4.2,
                  ease: "easeInOut",
                  delay: 1.5
                }}
                whileHover={{ scale: 1.15 }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover/bubble:opacity-100 transition-opacity duration-300" />
                <BarChart3 className="w-4 h-4 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-5 h-8 border border-cyan-500/20 rounded-full flex justify-center backdrop-blur-sm">
          <motion.div 
            className="w-0.5 h-2 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-full mt-2"
            animate={{ height: ["8px", "16px", "8px"] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>
      </motion.div>
    </section>
  )
}

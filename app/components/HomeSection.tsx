"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
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
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/15 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.1, 0.4, 0.1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:70px_70px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]"></div>
        </div>

        {/* Subtle Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-[60px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[50px]"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-7"
          >
            {/* <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            > */}
              {/* <span className="px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full border border-cyan-500/20 backdrop-blur-sm text-cyan-300 text-sm font-medium">
                IT Professional
              </span>
            </motion.div> */}

            <motion.div 
              className="flex justify-start w-full mb-4" // Memastikan container selalu mulai dari kiri
            >
              <span className="
                inline-block 
                w-max 
                max-w-[calc(100vw-2rem)] 
                whitespace-nowrap 
                px-4 py-2 
                bg-gradient-to-r from-cyan-500/10 to-blue-500/10 
                rounded-full border border-cyan-500/20 
                backdrop-blur-sm 
                text-cyan-300 text-xs md:text-sm font-medium
              ">
                IT Professional
              </span>
            </motion.div>
            
            <div className="space-y-5">
              <motion.h1 
                className="text-white text-4xl lg:text-5xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Hello, I'm{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent block mt-1 leading-[1.15] pb-[0.1em]">
                  Jason Vianney Sugiarto
                </span>
              </motion.h1>

              <motion.div 
                className="pt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-lg lg:text-xl">
                  <span className="text-cyan-300 font-medium">Fullstack Developer</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-blue-300 font-medium">System Analysis</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-green-300 font-medium">UI/UX Design</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-orange-300 font-medium">Data Analyst</span>
                </div>
              </motion.div>

              <motion.p 
                className="text-white text-lg leading-relaxed font-light pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                IT Professional focused on creating innovative digital solutions through fullstack development, 
                system analysis, user-centered design, and data driven insights. I transform complex challenges 
                into elegant, efficient, and user friendly experiences.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="pt-2"
            >
              <Button onClick={handleDownloadPDF}>
                <span className="flex items-center gap-2">
                  <span>Download Resume</span>
                  <motion.span
                    animate={{ y: [0, 2, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    ↓
                  </motion.span>
                </span>
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
              {/* Profile Image Container */}
              <div className="relative w-80 h-80 lg:w-88 lg:h-88 rounded-full overflow-hidden border border-cyan-400/5 shadow-xl shadow-cyan-500/3 group">
                <Image
                  src="/assets/profile/home.png"
                  alt="Jason Vianney Sugiarto"
                  width={352}
                  height={352}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                
                {/* Subtle Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-blue-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              </div>
              
              {/* Floating Tech Bubbles - More Subtle */}
              <motion.div 
                className="absolute top-6 -left-5 w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30 cursor-pointer"
                animate={{ 
                  y: [0, -12, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3.8,
                  ease: "easeInOut"
                }}
                whileHover={{ scale: 1.12 }}
              >
                <Code className="w-7 h-7 text-white" />
              </motion.div>
              
              <motion.div 
                className="absolute -top-2 right-14 w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30 cursor-pointer"
                animate={{ 
                  y: [0, -16, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 4.2,
                  ease: "easeInOut",
                  delay: 0.6
                }}
                whileHover={{ scale: 1.12 }}
              >
                <Cpu className="w-6 h-6 text-white" />
              </motion.div>
              
              <motion.div 
                className="absolute bottom-8 -right-4 w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 cursor-pointer"
                animate={{ 
                  y: [0, 8, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3.5,
                  ease: "easeInOut",
                  delay: 1.2
                }}
                whileHover={{ scale: 1.12 }}
              >
                <Palette className="w-6 h-6 text-white" />
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-3 left-20 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30 cursor-pointer"
                animate={{ 
                  y: [0, 12, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 4.5,
                  ease: "easeInOut",
                  delay: 1.8
                }}
                whileHover={{ scale: 1.12 }}
              >
                <BarChart3 className="w-5 h-5 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-5 h-8 flex justify-center">
          <motion.div 
            className="w-0.5 h-3 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-full"
            animate={{ height: ["12px", "20px", "12px"] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>
      </motion.div>
    </section>
  )
}

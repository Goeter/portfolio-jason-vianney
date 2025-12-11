"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"

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
  const [isSkillsVisible, setIsSkillsVisible] = useState(false)
  const skillsRef = useRef(null)
  const isSkillsInView = useInView(skillsRef, { once: true, amount: 0.3 })

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isSkillsInView) {
      setIsSkillsVisible(true)
    }
  }, [isSkillsInView])

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

  // Skill data with icons
  const skills = [
    { name: "Front-end Development", icon: "💻", color: "from-cyan-400 to-blue-400" },
    { name: "System Analysis", icon: "📊", color: "from-purple-400 to-pink-400" },
    { name: "UI/UX Design", icon: "🎨", color: "from-green-400 to-emerald-400" },
    { name: "Data Analytics", icon: "📈", color: "from-orange-400 to-red-400" },
    { name: "Project Management", icon: "🗂️", color: "from-yellow-400 to-orange-400" },
    { name: "Problem Solving", icon: "🔍", color: "from-indigo-400 to-purple-400" },
    { name: "Team Collaboration", icon: "👥", color: "from-pink-400 to-rose-400" },
    { name: "Data Visualization", icon: "📊", color: "from-blue-400 to-cyan-400" },
  ]

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center pt-16 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 to-transparent">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-500/30 backdrop-blur-sm">
                  <span className="text-cyan-300 text-sm font-medium">IT Professional</span>
                </div>
                
                <h1 className="text-white text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  Hello, I'm{" "}
                  <span className="relative">
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient">
                      Jason Vianney Sugiarto
                    </span>
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></span>
                  </span>
                </h1>

                <motion.div 
                  className="space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  <h2 className="text-gray-300 text-lg lg:text-xl font-medium">
                    Specializing in
                  </h2>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-cyan-300 text-lg lg:text-xl font-semibold">Front-end Development</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-blue-300 text-lg lg:text-xl font-semibold">System Analysis</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-green-300 text-lg lg:text-xl font-semibold">UI/UX Design</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-orange-300 text-lg lg:text-xl font-semibold">Data Analytics</span>
                  </div>
                </motion.div>

                <motion.p 
                  className="text-gray-300 text-lg leading-relaxed font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  IT Professional focused on creating innovative digital solutions through front-end development, 
                  system analysis, user-centered design, and data-driven insights. I transform complex challenges 
                  into elegant, efficient, and user-friendly experiences.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Button onClick={handleDownloadPDF} className="group relative overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    <span>Download Resume</span>
                    <span className="group-hover:translate-x-1 transition-transform">↓</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
                
                <motion.a 
                  href="#contact"
                  className="px-8 py-3 text-white font-semibold rounded-lg border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 hover:bg-cyan-500/10 backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Content - Profile Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex justify-center lg:justify-end relative"
          >
            {/* Main Profile Image - Full Transparency */}
            <div className="relative">
              {/* Outer Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse"></div>
              
              {/* Profile Image Container */}
              <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-cyan-400/30 shadow-2xl shadow-cyan-500/20 group">
                <Image
                  src="/assets/profile/home.png"
                  alt="Jason Vianney Sugiarto"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  priority
                />
              </div>
              
              {/* Floating Tech Elements Outside Circle */}
              <motion.div 
                className="absolute top-6 -left-4 w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-2xl shadow-cyan-500/40 cursor-pointer"
                animate={{ 
                  y: [0, -15, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3,
                  ease: "easeInOut"
                }}
                whileHover={{ scale: 1.2 }}
              >
                <span className="text-white text-2xl">{"</>"}</span>
              </motion.div>
              
              <motion.div 
                className="absolute -top-4 right-12 w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/40 cursor-pointer"
                animate={{ 
                  y: [0, -20, 0],
                  scale: [1, 1.15, 1]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 4,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                whileHover={{ scale: 1.2 }}
              >
                <span className="text-white text-2xl">📊</span>
              </motion.div>
              
              <motion.div 
                className="absolute bottom-8 -right-2 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-2xl shadow-green-500/40 cursor-pointer"
                animate={{ 
                  y: [0, 15, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3.5,
                  ease: "easeInOut",
                  delay: 1
                }}
                whileHover={{ scale: 1.2 }}
              >
                <span className="text-white text-xl">🎨</span>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-2 left-16 w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/40 cursor-pointer"
                animate={{ 
                  y: [0, 20, 0],
                  scale: [1, 1.15, 1]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 4.5,
                  ease: "easeInOut",
                  delay: 1.5
                }}
                whileHover={{ scale: 1.2 }}
              >
                <span className="text-white text-lg">📈</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Skills Grid Section - Simplified */}
        <motion.div 
          ref={skillsRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isSkillsVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-24"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Technical <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Expertise</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Comprehensive skillset for end-to-end digital solution development
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isSkillsVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="relative group"
              >
                <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/20 backdrop-blur-sm border border-cyan-500/10 rounded-xl p-5 h-full hover:border-cyan-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${skill.color} flex items-center justify-center text-2xl shadow-lg`}>
                      {skill.icon}
                    </div>
                    
                    <h3 className="text-white font-semibold text-base lg:text-lg leading-snug">
                      {skill.name}
                    </h3>
                  </div>
                  
                  {/* Hover effect glow */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-500 -z-10"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-cyan-500/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  )
}

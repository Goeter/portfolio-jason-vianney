"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { 
  Code, 
  BarChart3, 
  Palette, 
  Database,
  Cpu,
  Users,
  Lightbulb,
  Globe
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

  // Skill data dengan icon Lucide yang lebih detail
  const skills = [
    { name: "Front-end Dev", icon: Code, color: "from-cyan-400 to-blue-400" },
    { name: "System Analyst", icon: Cpu, color: "from-purple-400 to-pink-400" },
    { name: "UI/UX Design", icon: Palette, color: "from-green-400 to-emerald-400" },
    { name: "Data Analytics", icon: BarChart3, color: "from-orange-400 to-red-400" },
    { name: "Database", icon: Database, color: "from-yellow-400 to-orange-400" },
    { name: "Team Collaboration", icon: Users, color: "from-indigo-400 to-purple-400" },
    { name: "Problem Solving", icon: Lightbulb, color: "from-pink-400 to-rose-400" },
    { name: "Web Solutions", icon: Globe, color: "from-blue-400 to-cyan-400" },
  ]

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center pt-16 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Particle Effects */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.8, 0.2],
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
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]"></div>
        </div>

        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[80px] animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-block"
              >
                <span className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-500/30 backdrop-blur-sm text-cyan-300 text-sm font-medium">
                  IT Professional
                </span>
              </motion.div>
              
              <motion.h1 
                className="text-white text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Hello, I'm{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient">
                    Jason Vianney Sugiarto
                  </span>
                  <motion.span 
                    className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 1 }}
                  />
                </span>
              </motion.h1>

              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
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
                className="text-white text-lg leading-relaxed font-light"
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
                    animate={{ y: [0, 3, 0] }}
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
                className="absolute -inset-8 rounded-full border-2 border-cyan-400/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Profile Image Container */}
              <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-cyan-400/20 shadow-2xl shadow-cyan-500/10 group">
                <Image
                  src="/assets/profile/home.png"
                  alt="Jason Vianney Sugiarto"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  priority
                />
                
                {/* Hover Overlay Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/0 via-transparent to-blue-500/0 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              </div>
              
              {/* Floating Tech Bubbles */}
              <motion.div 
                className="absolute top-6 -left-6 w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/50 cursor-pointer group/bubble"
                animate={{ 
                  y: [0, -20, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3,
                  ease: "easeInOut"
                }}
                whileHover={{ scale: 1.2 }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover/bubble:opacity-100 transition-opacity duration-300" />
                <Code className="w-8 h-8 text-white" />
              </motion.div>
              
              <motion.div 
                className="absolute -top-6 right-16 w-18 h-18 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/50 cursor-pointer group/bubble"
                animate={{ 
                  y: [0, -25, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3.5,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                whileHover={{ scale: 1.2 }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover/bubble:opacity-100 transition-opacity duration-300" />
                <Cpu className="w-8 h-8 text-white" />
              </motion.div>
              
              <motion.div 
                className="absolute bottom-8 -right-6 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/50 cursor-pointer group/bubble"
                animate={{ 
                  y: [0, 15, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3.2,
                  ease: "easeInOut",
                  delay: 1
                }}
                whileHover={{ scale: 1.2 }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover/bubble:opacity-100 transition-opacity duration-300" />
                <Palette className="w-7 h-7 text-white" />
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-4 left-20 w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/50 cursor-pointer group/bubble"
                animate={{ 
                  y: [0, 20, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 4,
                  ease: "easeInOut",
                  delay: 1.5
                }}
                whileHover={{ scale: 1.2 }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover/bubble:opacity-100 transition-opacity duration-300" />
                <BarChart3 className="w-6 h-6 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Skills Grid Section - Simplified Circles Only */}
        <motion.div 
          ref={skillsRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isSkillsVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl lg:text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isSkillsVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              Core <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Skills</span>
            </motion.h2>
            <motion.p 
              className="text-gray-300 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={isSkillsVisible ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              Specialized expertise for comprehensive digital solutions
            </motion.p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {skills.map((skill, index) => {
              const Icon = skill.icon
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isSkillsVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ 
                    delay: index * 0.1, 
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    y: -10,
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                  className="relative group"
                >
                  <div className="flex flex-col items-center">
                    <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${skill.color} flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                      
                      {/* Hover Effect */}
                      <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Animated Ring on Hover */}
                      <div className="absolute -inset-3 rounded-full border-2 border-transparent group-hover:border-white/30 transition-all duration-500" />
                    </div>
                    
                    <motion.span 
                      className="text-white text-sm font-medium mt-4 text-center"
                      initial={{ opacity: 0 }}
                      animate={isSkillsVisible ? { opacity: 1 } : {}}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {skill.name}
                    </motion.span>
                  </div>
                  
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${skill.color} blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10`} />
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-cyan-500/30 rounded-full flex justify-center backdrop-blur-sm">
          <motion.div 
            className="w-1 h-3 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-full mt-2"
            animate={{ height: ["12px", "24px", "12px"] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>
      </motion.div>
    </section>
  )
}

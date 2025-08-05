"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface SplashLoaderProps {
  onLoadingComplete: () => void
}

export default function SplashLoader({ onLoadingComplete }: SplashLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [currentText, setCurrentText] = useState("Initializing...")
  const [isVisible, setIsVisible] = useState(true)

  const loadingTexts = [
    "Initializing Systems...",
    "Loading Neural Networks...",
    "Connecting Data Streams...",
    "Optimizing Performance...",
    "Synchronizing Components...",
    "Finalizing Interface...",
    "Welcome to the Future!",
  ]

  useEffect(() => {
    const duration = 10000
    const interval = 50
    const increment = 100 / (duration / interval)

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment
        const textIndex = Math.floor((newProgress / 100) * (loadingTexts.length - 1))
        setCurrentText(loadingTexts[Math.min(textIndex, loadingTexts.length - 1)])

        if (newProgress >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            setIsVisible(false)
            setTimeout(onLoadingComplete, 800)
          }, 1200)
          return 100
        }
        return newProgress
      })
    }, interval)

    return () => clearInterval(timer)
  }, [onLoadingComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
        >
          {/* Background Video */}
          <div className="absolute inset-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.4) contrast(1.2) saturate(1.5)" }}
            >
              <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imaginary%20Neon%20Cube_free%20no%20watermark-ZI5plpjMJRLGQyi2eQWWjwCU5xPKTs.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-transparent to-purple-900/60" />
          </div>

          {/* Circuit Pattern */}
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
              <motion.path
                d="M0 100 L300 100 L350 150 L600 150 L650 100 L1200 100"
                stroke="#00ffff"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              />
              <motion.circle
                cx="200"
                cy="100"
                r="8"
                fill="#00ffff"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </svg>
          </div>

          {/* Main Content */}
          <div className="relative z-10 text-center">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="mb-8"
            >
              <div className="relative w-32 h-32 mx-auto">
                <div className="w-full h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/50">
                  <span className="text-white font-bold text-4xl">JV</span>
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute inset-0 border-2 border-cyan-400 rounded-full border-dashed"
                />
              </div>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-5xl md:text-6xl font-bold text-white mb-3"
            >
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Jason Vianney
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-xl text-cyan-300 mb-16 font-light tracking-wide"
            >
              System Analyst • UI/UX Designer • Data Analyst
            </motion.p>

            {/* Loading */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="space-y-8"
            >
              <div className="w-96 mx-auto">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-cyan-300 text-sm font-medium">{currentText}</span>
                  <span className="text-cyan-300 text-sm font-mono">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-slate-800/50 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

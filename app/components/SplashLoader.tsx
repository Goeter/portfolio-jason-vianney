"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Code2,
  Cpu,
  Palette,
  BarChart3,
} from "lucide-react"

import ArcReactorCanvas from "./ArcReactorCanvas"

type Props = {
  onLoadingComplete: () => void
}

export default function SplashLoader({
  onLoadingComplete,
}: Props) {
  const [loading, setLoading] = useState(0)
  const [finished, setFinished] = useState(false)

  const startRef = useRef<number>(0)

  const duration = 4200

  const skills = [
    {
      title: "Front-end Dev",
      icon: Code2,
      color: "from-cyan-400 to-blue-500",
    },
    {
      title: "System Analyst",
      icon: Cpu,
      color: "from-purple-400 to-fuchsia-500",
    },
    {
      title: "UI/UX Designer",
      icon: Palette,
      color: "from-orange-400 to-pink-500",
    },
    {
      title: "Data Analyst",
      icon: BarChart3,
      color: "from-emerald-400 to-green-500",
    },
  ]

  useEffect(() => {
    let raf = 0

    const animate = (time: number) => {
      if (!startRef.current) {
        startRef.current = time
      }

      const progress = Math.min(
        (time - startRef.current) / duration,
        1,
      )

      const eased = 1 - Math.pow(1 - progress, 3)

      setLoading(Math.floor(eased * 100))

      if (progress < 1) {
        raf = requestAnimationFrame(animate)
      } else {
        setFinished(true)

        setTimeout(() => {
          onLoadingComplete()
        }, 800)
      }
    }

    raf = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(raf)
  }, [onLoadingComplete])

}

"use client"

import { useScroll, useTransform, type MotionValue } from "framer-motion"
import { useRef } from "react"

export function useParallax(distance: number = 60): {
  ref: React.RefObject<HTMLDivElement>
  y: MotionValue<number>
  negativeY: MotionValue<number>
} {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance])
  const negativeY = useTransform(scrollYProgress, [0, 1], [distance, -distance])

  return { ref, y, negativeY }
}

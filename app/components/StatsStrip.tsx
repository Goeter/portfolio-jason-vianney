"use client"

import { useEffect, useRef, useState } from "react"

import { siteStats } from "@/lib/site-content"

const COUNT_DURATION = 1100

/** Counts up once, the first time the strip scrolls into view. */
function useCountUp(target: number, start: boolean) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return

    // Respect a reduced-motion preference by jumping straight to the number.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target)
      return
    }

    let frame = 0
    let t0: number | null = null

    const step = (ts: number) => {
      if (t0 === null) t0 = ts
      const progress = Math.min((ts - t0) / COUNT_DURATION, 1)
      // easeOutCubic — fast at first, settling gently on the final number
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [target, start])

  return value
}

function Stat({
  value,
  suffix,
  label,
  start,
}: {
  value: number
  suffix: string
  label: string
  start: boolean
}) {
  const shown = useCountUp(value, start)

  return (
    <div className="flex flex-col items-center gap-1 px-2 text-center sm:px-4">
      <span
        className="font-serif text-3xl font-semibold leading-none text-gold-200 sm:text-4xl md:text-[2.6rem]"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {shown}
        {suffix}
      </span>
      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
        {label}
      </span>
    </div>
  )
}

export default function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (!("IntersectionObserver" in window)) {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="mt-9 grid max-w-[620px] grid-cols-2 gap-y-6 border-y border-gold-400/15 py-6 sm:grid-cols-4 sm:gap-y-0"
    >
      {siteStats.map((stat, index) => (
        <div
          key={stat.label}
          className={
            index > 0
              ? "sm:border-l sm:border-gold-400/15"
              : undefined
          }
        >
          <Stat value={stat.value} suffix={stat.suffix} label={stat.label} start={inView} />
        </div>
      ))}
    </div>
  )
}

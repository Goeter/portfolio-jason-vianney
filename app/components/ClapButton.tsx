"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ThumbsUp, Sparkles, Flame } from "lucide-react"

interface Particle {
  id: number
  x: number
  label: string
}

interface ClapButtonProps {
  itemId: string
  itemType?: "project" | "skill"
  title?: string
  initialCount?: number
  variant?: "card" | "detail" | "badge"
  className?: string
  showLabel?: boolean
}

const MAX_USER_CLAPS = 50

export default function ClapButton({
  itemId,
  itemType = "project",
  title = "",
  initialCount = 0,
  variant = "card",
  className = "",
  showLabel = true,
}: ClapButtonProps) {
  const [likesCount, setLikesCount] = useState<number>(initialCount)
  const [userClaps, setUserClaps] = useState<number>(0)
  const [particles, setParticles] = useState<Particle[]>([])
  const [isClapping, setIsClapping] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const pendingClapsRef = useRef<number>(0)
  const syncTimerRef = useRef<NodeJS.Timeout | null>(null)
  const particleIdRef = useRef<number>(0)

  // Load user claps from localStorage & fetch latest total count from server
  useEffect(() => {
    try {
      const storedUserClaps = localStorage.getItem(`jason_claps_${itemId}`)
      if (storedUserClaps) {
        setUserClaps(parseInt(storedUserClaps, 10) || 0)
      }
    } catch {
      // Ignore localStorage errors
    }

    // Fetch initial count from API
    let isMounted = true
    fetch(`/api/upvotes?id=${encodeURIComponent(itemId)}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && data.upvotes && typeof data.upvotes[itemId] === "number") {
          setLikesCount(data.upvotes[itemId])
        }
      })
      .catch(() => {
        // Silently retain fallback count
      })

    return () => {
      isMounted = false
    }
  }, [itemId])

  // Function to sync pending claps to backend
  const syncClaps = useCallback(
    (countToSync: number) => {
      if (countToSync <= 0) return

      fetch("/api/upvotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: itemId,
          itemType,
          title,
          count: countToSync,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && typeof data.likesCount === "number") {
            setLikesCount(data.likesCount)
          }
        })
        .catch(() => {
          // Silently handle offline/error
        })
    },
    [itemId, itemType, title]
  )

  // Handle user click / clap
  const handleClap = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (userClaps >= MAX_USER_CLAPS) return

    // Increments
    const newLikesCount = likesCount + 1
    const newUserClaps = userClaps + 1

    setLikesCount(newLikesCount)
    setUserClaps(newUserClaps)
    setIsClapping(true)

    // Save user claps to localStorage
    try {
      localStorage.setItem(`jason_claps_${itemId}`, newUserClaps.toString())
    } catch {
      // Ignore
    }

    // Spawn floating particle
    particleIdRef.current += 1
    const pId = particleIdRef.current
    const randomX = (Math.random() - 0.5) * 30
    const particleLabels = ["+1", "👏", "⚡", "+1"]
    const label = particleLabels[newUserClaps % particleLabels.length]

    setParticles((prev) => [...prev.slice(-6), { id: pId, x: randomX, label }])

    // Cleanup particle after animation
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== pId))
    }, 900)

    // Reset clapping scale pulse state
    setTimeout(() => setIsClapping(false), 250)

    // Debounce sync to server
    pendingClapsRef.current += 1
    if (syncTimerRef.current) clearTimeout(syncTimerRef.current)

    syncTimerRef.current = setTimeout(() => {
      const toSync = pendingClapsRef.current
      pendingClapsRef.current = 0
      syncClaps(toSync)
    }, 800)
  }

  const hasClapped = userClaps > 0
  const isMaxReached = userClaps >= MAX_USER_CLAPS

  // Variant styling presets
  if (variant === "badge") {
    return (
      <div className="relative inline-flex items-center" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <motion.button
          type="button"
          onClick={handleClap}
          disabled={isMaxReached}
          animate={{ scale: isClapping ? 1.15 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className={`group relative flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-all duration-300 ${
            hasClapped
              ? "border-amber-400/50 bg-amber-400/15 text-amber-200 shadow-[0_0_12px_rgba(251,191,36,0.2)]"
              : "border-cyan-400/30 bg-slate-900/80 text-cyan-200 hover:border-cyan-300 hover:bg-cyan-500/15 hover:shadow-[0_0_12px_rgba(56,189,248,0.25)]"
          } ${isMaxReached ? "opacity-75 cursor-not-allowed" : "cursor-pointer"} ${className}`}
          title={isMaxReached ? "Maximum claps reached!" : "Click to upvote/clap"}
        >
          <Sparkles className={`h-3 w-3 transition-transform duration-300 ${isHovered ? "rotate-12 scale-110" : ""}`} />
          <span>{likesCount}</span>
        </motion.button>

        {/* Floating Particles */}
        <AnimatePresence>
          {particles.map((p) => (
            <motion.span
              key={p.id}
              initial={{ opacity: 1, y: 0, x: p.x, scale: 0.8 }}
              animate={{ opacity: 0, y: -36, x: p.x, scale: 1.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 select-none text-[12px] font-bold text-amber-300 drop-shadow-[0_2px_8px_rgba(245,158,11,0.8)]"
            >
              {p.label}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    )
  }

  if (variant === "detail") {
    return (
      <div className="relative inline-flex items-center" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <motion.button
          type="button"
          onClick={handleClap}
          disabled={isMaxReached}
          animate={{ scale: isClapping ? 1.08 : 1 }}
          transition={{ type: "spring", stiffness: 450, damping: 18 }}
          className={`group relative flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-xs font-bold uppercase tracking-[0.08em] shadow-lg backdrop-blur-md transition-all duration-300 ${
            hasClapped
              ? "border-amber-400/60 bg-gradient-to-r from-amber-500/20 to-yellow-500/15 text-amber-100 shadow-[0_10px_30px_rgba(245,158,11,0.25)] hover:border-amber-300"
              : "border-cyan-400/50 bg-slate-900/90 text-cyan-100 shadow-[0_10px_28px_rgba(14,165,233,0.18)] hover:border-cyan-300 hover:bg-cyan-500/20 hover:shadow-[0_14px_36px_rgba(56,189,248,0.3)]"
          } ${isMaxReached ? "opacity-80 cursor-not-allowed" : "cursor-pointer"} ${className}`}
        >
          <motion.div
            animate={{ rotate: isClapping ? [0, -15, 15, 0] : 0 }}
            transition={{ duration: 0.3 }}
          >
            {hasClapped ? (
              <Flame className="h-4 w-4 text-amber-400 fill-amber-400/30" />
            ) : (
              <ThumbsUp className="h-4 w-4 text-cyan-400 transition-transform group-hover:scale-110" />
            )}
          </motion.div>

          {showLabel && (
            <span>{hasClapped ? "Appreciated!" : "Clap / Upvote"}</span>
          )}

          <span className="flex items-center justify-center rounded-full bg-cyan-400/20 px-2 py-0.5 text-[11px] font-extrabold text-cyan-200 group-hover:bg-cyan-400/30">
            {likesCount}
          </span>
        </motion.button>

        {/* Floating Particles */}
        <AnimatePresence>
          {particles.map((p) => (
            <motion.span
              key={p.id}
              initial={{ opacity: 1, y: 0, x: p.x, scale: 0.7 }}
              animate={{ opacity: 0, y: -48, x: p.x, scale: 1.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.85, ease: "easeOut" }}
              className="pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 select-none text-sm font-extrabold text-amber-300 drop-shadow-[0_4px_12px_rgba(245,158,11,0.9)]"
            >
              {p.label}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    )
  }

  // Default 'card' variant for Project Cards
  return (
    <div className="relative inline-flex items-center" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <motion.button
        type="button"
        onClick={handleClap}
        disabled={isMaxReached}
        animate={{ scale: isClapping ? 1.12 : 1 }}
        transition={{ type: "spring", stiffness: 450, damping: 16 }}
        className={`group relative flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold backdrop-blur-md transition-all duration-300 ${
          hasClapped
            ? "border-amber-400/50 bg-amber-400/15 text-amber-200 shadow-[0_0_14px_rgba(251,191,36,0.22)]"
            : "border-cyan-400/30 bg-slate-900/80 text-cyan-200 hover:border-cyan-300 hover:bg-cyan-400/15 hover:shadow-[0_0_16px_rgba(56,189,248,0.25)]"
        } ${isMaxReached ? "opacity-80 cursor-not-allowed" : "cursor-pointer"} ${className}`}
        title={isMaxReached ? "Maximum 50 claps reached!" : "Give claps / upvote"}
      >
        <motion.div animate={{ rotate: isClapping ? -12 : 0 }}>
          <ThumbsUp className={`h-3.5 w-3.5 transition-transform duration-300 ${hasClapped ? "text-amber-300 fill-amber-300/30" : "text-cyan-300 group-hover:scale-110"}`} />
        </motion.div>
        <span className="font-bold text-slate-100">{likesCount}</span>
      </motion.button>

      {/* Floating Particles */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ opacity: 1, y: 0, x: p.x, scale: 0.8 }}
            animate={{ opacity: 0, y: -40, x: p.x, scale: 1.25 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 select-none text-[13px] font-extrabold text-amber-300 drop-shadow-[0_2px_10px_rgba(245,158,11,0.9)]"
          >
            {p.label}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}

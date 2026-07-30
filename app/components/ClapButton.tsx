"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ThumbsUp, Sparkles, Flame } from "lucide-react"

interface Particle {
  id: number
  x: number
  label: string
  color: string
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
  const [hasUpvoted, setHasUpvoted] = useState<boolean>(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const particleIdRef = useRef<number>(0)

  // Load user upvoted state from localStorage & fetch latest total count from server
  useEffect(() => {
    try {
      const storedUpvoted = localStorage.getItem(`jason_upvoted_${itemId}`)
      if (storedUpvoted === "true") {
        setHasUpvoted(true)
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

  // Sync upvote / unvote action to backend API
  const syncToggle = useCallback(
    (isUpvoting: boolean) => {
      fetch("/api/upvotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: itemId,
          itemType,
          title,
          delta: isUpvoting ? 1 : -1,
          action: isUpvoting ? "upvote" : "unvote",
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

  // Handle user click / toggle upvote
  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const nextUpvotedState = !hasUpvoted
    const delta = nextUpvotedState ? 1 : -1
    const newLikesCount = Math.max(0, likesCount + delta)

    setHasUpvoted(nextUpvotedState)
    setLikesCount(newLikesCount)
    setIsAnimating(true)

    // Save to localStorage
    try {
      localStorage.setItem(`jason_upvoted_${itemId}`, nextUpvotedState ? "true" : "false")
    } catch {
      // Ignore
    }

    // Spawn floating particle
    particleIdRef.current += 1
    const pId = particleIdRef.current
    const randomX = (Math.random() - 0.5) * 20
    const label = nextUpvotedState ? "+1" : "-1"
    const color = nextUpvotedState ? "text-amber-300" : "text-slate-400"

    setParticles((prev) => [...prev.slice(-3), { id: pId, x: randomX, label, color }])

    // Cleanup particle after animation
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== pId))
    }, 850)

    // Reset animation state
    setTimeout(() => setIsAnimating(false), 300)

    // Sync to backend
    syncToggle(nextUpvotedState)
  }

  // Variant styling presets
  if (variant === "badge") {
    return (
      <div className="relative inline-flex items-center" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <motion.button
          type="button"
          onClick={handleToggle}
          animate={{ scale: isAnimating ? 1.15 : 1 }}
          transition={{ type: "spring", stiffness: 450, damping: 15 }}
          className={`group relative flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-all duration-300 cursor-pointer ${
            hasUpvoted
              ? "border-amber-400/60 bg-amber-400/20 text-amber-200 shadow-[0_0_14px_rgba(251,191,36,0.25)]"
              : "border-cyan-400/30 bg-slate-900/80 text-cyan-200 hover:border-cyan-300 hover:bg-cyan-500/15 hover:shadow-[0_0_12px_rgba(56,189,248,0.25)]"
          } ${className}`}
          title={hasUpvoted ? "Batalkan Upvote (-1)" : "Berikan Upvote (+1)"}
        >
          <Sparkles className={`h-3 w-3 transition-transform duration-300 ${hasUpvoted ? "text-amber-300 fill-amber-300/40" : isHovered ? "rotate-12 scale-110" : ""}`} />
          <span>{likesCount}</span>
        </motion.button>

        {/* Floating Particles */}
        <AnimatePresence>
          {particles.map((p) => (
            <motion.span
              key={p.id}
              initial={{ opacity: 1, y: 0, x: p.x, scale: 0.8 }}
              animate={{ opacity: 0, y: hasUpvoted ? -32 : 16, x: p.x, scale: 1.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`pointer-events-none absolute ${hasUpvoted ? "-top-2" : "top-4"} left-1/2 -translate-x-1/2 select-none text-[12px] font-bold ${p.color} drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]`}
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
          onClick={handleToggle}
          animate={{ scale: isAnimating ? 1.08 : 1 }}
          transition={{ type: "spring", stiffness: 450, damping: 18 }}
          className={`group relative flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-xs font-bold uppercase tracking-[0.08em] shadow-lg backdrop-blur-md transition-all duration-300 cursor-pointer ${
            hasUpvoted
              ? "border-amber-400/70 bg-gradient-to-r from-amber-500/25 to-yellow-500/20 text-amber-100 shadow-[0_10px_30px_rgba(245,158,11,0.3)] hover:border-amber-300"
              : "border-cyan-400/50 bg-slate-900/90 text-cyan-100 shadow-[0_10px_28px_rgba(14,165,233,0.18)] hover:border-cyan-300 hover:bg-cyan-500/20 hover:shadow-[0_14px_36px_rgba(56,189,248,0.3)]"
          } ${className}`}
        >
          <motion.div
            animate={{ rotate: isAnimating ? (hasUpvoted ? [0, -15, 15, 0] : [0, 15, -15, 0]) : 0 }}
            transition={{ duration: 0.3 }}
          >
            {hasUpvoted ? (
              <Flame className="h-4 w-4 text-amber-400 fill-amber-400/40" />
            ) : (
              <ThumbsUp className="h-4 w-4 text-cyan-400 transition-transform group-hover:scale-110" />
            )}
          </motion.div>

          {showLabel && (
            <span>{hasUpvoted ? "Upvoted!" : "Upvote"}</span>
          )}

          <span className={`flex items-center justify-center rounded-full px-2 py-0.5 text-[11px] font-extrabold transition-colors ${
            hasUpvoted ? "bg-amber-400/30 text-amber-200" : "bg-cyan-400/20 text-cyan-200 group-hover:bg-cyan-400/30"
          }`}>
            {likesCount}
          </span>
        </motion.button>

        {/* Floating Particles */}
        <AnimatePresence>
          {particles.map((p) => (
            <motion.span
              key={p.id}
              initial={{ opacity: 1, y: 0, x: p.x, scale: 0.8 }}
              animate={{ opacity: 0, y: hasUpvoted ? -44 : 20, x: p.x, scale: 1.25 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`pointer-events-none absolute ${hasUpvoted ? "-top-4" : "top-6"} left-1/2 -translate-x-1/2 select-none text-sm font-extrabold ${p.color} drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]`}
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
        onClick={handleToggle}
        animate={{ scale: isAnimating ? 1.12 : 1 }}
        transition={{ type: "spring", stiffness: 450, damping: 16 }}
        className={`group relative flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold backdrop-blur-md transition-all duration-300 cursor-pointer ${
          hasUpvoted
            ? "border-amber-400/60 bg-amber-400/20 text-amber-200 shadow-[0_0_16px_rgba(251,191,36,0.3)]"
            : "border-cyan-400/30 bg-slate-900/80 text-cyan-200 hover:border-cyan-300 hover:bg-cyan-400/15 hover:shadow-[0_0_16px_rgba(56,189,248,0.25)]"
        } ${className}`}
        title={hasUpvoted ? "Klik untuk membatalkan Upvote (-1)" : "Klik untuk memberikan Upvote (+1)"}
      >
        <motion.div animate={{ rotate: isAnimating ? -12 : 0 }}>
          <ThumbsUp className={`h-3.5 w-3.5 transition-transform duration-300 ${hasUpvoted ? "text-amber-300 fill-amber-300/40" : "text-cyan-300 group-hover:scale-110"}`} />
        </motion.div>
        <span className={`font-bold ${hasUpvoted ? "text-amber-200" : "text-slate-100"}`}>{likesCount}</span>
      </motion.button>

      {/* Floating Particles */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ opacity: 1, y: 0, x: p.x, scale: 0.8 }}
            animate={{ opacity: 0, y: hasUpvoted ? -36 : 16, x: p.x, scale: 1.25 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`pointer-events-none absolute ${hasUpvoted ? "-top-3" : "top-5"} left-1/2 -translate-x-1/2 select-none text-[13px] font-extrabold ${p.color} drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]`}
          >
            {p.label}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}

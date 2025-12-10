"use client"

import { useMemo } from "react"
import { cn } from "@/lib/utils"

type Props = {
  title: string
  roles?: string[]
  className?: string
}

const COLORS = {
  // Palette: deep navy bg (in page), cyan primary, blue accent, amber accent, white
  cyan: "#00E5FF",
  blue: "#19A0FF",
  amber: "#FFC24B",
  white: "#EAF7FF",
}

export default function NeonText({ title, roles = [], className }: Props) {
  const rolesText = useMemo(() => roles.join(" • "), [roles])

  return (
    <div className={cn("select-none", className)}>
      <h1
        className="text-balance font-sans text-4xl font-semibold tracking-tight md:text-6xl lg:text-7xl"
        style={{
          color: COLORS.white,
          textShadow: `
            0 0 10px ${COLORS.cyan},
            0 0 20px ${COLORS.cyan},
            0 0 40px ${COLORS.blue},
            0 0 2px rgba(255,255,255,0.6)
          `,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h1>

      {roles.length > 0 ? (
        <p
          className="mt-3 text-pretty font-sans text-base md:mt-4 md:text-lg"
          style={{
            color: COLORS.white,
            opacity: 0.95,
            textShadow: `
              0 0 6px ${COLORS.cyan},
              0 0 12px ${COLORS.blue}
            `,
          }}
        >
          {rolesText}
        </p>
      ) : null}

      <style jsx>{`
        /* Subtle neon shimmer for modern, professional feel */
        div :global(h1),
        div :global(p) {
          animation: neonPulse 3.2s ease-in-out infinite;
        }
        @keyframes neonPulse {
          0% {
            filter: drop-shadow(0 0 0px rgba(0, 229, 255, 0.3));
          }
          50% {
            filter: drop-shadow(0 0 10px rgba(0, 229, 255, 0.35))
              drop-shadow(0 0 18px rgba(25, 160, 255, 0.25));
          }
          100% {
            filter: drop-shadow(0 0 0px rgba(0, 229, 255, 0.3));
          }
        }
      `}</style>
    </div>
  )
}

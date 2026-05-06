"use client"
    }

    const angle = particle.angle + t * particle.speed * 100

    const x = cx + Math.cos(angle) * radius
    const y = cy + Math.sin(angle) * radius * 0.6

    radial(
      ctx,
      x,
      y,
      particle.size * 4,
      COLORS.cyan,
      0.9,
    )
  }

  ctx.restore()
}

function drawPulse(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  t: number,
) {
  ctx.save()

  const radius = 160 + Math.sin(t * 5) * 8

  ctx.strokeStyle = "rgba(34,211,238,0.14)"
  ctx.lineWidth = 3

  ctx.beginPath()
  ctx.arc(cx, cy, radius, 0, Math.PI * 2)
  ctx.stroke()

  ctx.restore()
}

function radial(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string,
  alpha = 1,
) {
  const gradient = ctx.createRadialGradient(
    x,
    y,
    0,
    x,
    y,
    radius,
  )

  gradient.addColorStop(0, color)
  gradient.addColorStop(0.3, color)
  gradient.addColorStop(1, "rgba(255,255,255,0)")

  ctx.save()

  ctx.globalAlpha = alpha
  ctx.fillStyle = gradient

  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}

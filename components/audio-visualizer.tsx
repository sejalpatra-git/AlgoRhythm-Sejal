"use client"

import { useEffect, useRef } from "react"

interface AudioVisualizerProps {
  isPlaying: boolean
}

export function AudioVisualizer({ isPlaying }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const barsRef = useRef<number[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const barCount = 64
    if (barsRef.current.length === 0) {
      barsRef.current = Array(barCount)
        .fill(0)
        .map(() => Math.random() * 0.5)
    }

    const animate = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const maxRadius = Math.min(rect.width, rect.height) * 0.4

      // Draw outer glow ring
      const gradient = ctx.createRadialGradient(centerX, centerY, maxRadius * 0.5, centerX, centerY, maxRadius * 1.2)
      gradient.addColorStop(0, "rgba(0, 255, 178, 0)")
      gradient.addColorStop(0.5, "rgba(0, 255, 178, 0.05)")
      gradient.addColorStop(1, "rgba(0, 255, 178, 0)")
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, maxRadius * 1.2, 0, Math.PI * 2)
      ctx.fill()

      // Draw center glow
      const centerGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius * 0.3)
      centerGlow.addColorStop(0, "rgba(0, 255, 178, 0.15)")
      centerGlow.addColorStop(1, "rgba(0, 255, 178, 0)")
      ctx.fillStyle = centerGlow
      ctx.beginPath()
      ctx.arc(centerX, centerY, maxRadius * 0.3, 0, Math.PI * 2)
      ctx.fill()

      // Draw bars
      for (let i = 0; i < barCount; i++) {
        const angle = (i / barCount) * Math.PI * 2 - Math.PI / 2

        if (isPlaying) {
          const target = 0.3 + Math.sin(Date.now() * 0.003 + i * 0.2) * 0.3 + Math.random() * 0.4
          barsRef.current[i] += (target - barsRef.current[i]) * 0.15
        } else {
          barsRef.current[i] += (0.1 - barsRef.current[i]) * 0.05
        }

        const barHeight = barsRef.current[i] * maxRadius * 0.6
        const innerRadius = maxRadius * 0.35
        const outerRadius = innerRadius + barHeight

        const x1 = centerX + Math.cos(angle) * innerRadius
        const y1 = centerY + Math.sin(angle) * innerRadius
        const x2 = centerX + Math.cos(angle) * outerRadius
        const y2 = centerY + Math.sin(angle) * outerRadius

        const barGradient = ctx.createLinearGradient(x1, y1, x2, y2)
        barGradient.addColorStop(0, "rgba(0, 255, 178, 0.4)")
        barGradient.addColorStop(1, "rgba(0, 255, 178, 1)")

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.strokeStyle = barGradient
        ctx.lineWidth = 3
        ctx.lineCap = "round"
        ctx.stroke()

        // Add glow effect to bar tips
        if (isPlaying && barsRef.current[i] > 0.4) {
          ctx.beginPath()
          ctx.arc(x2, y2, 4, 0, Math.PI * 2)
          ctx.fillStyle = "rgba(0, 255, 178, 0.8)"
          ctx.fill()
        }
      }

      // Draw inner circle
      ctx.beginPath()
      ctx.arc(centerX, centerY, maxRadius * 0.32, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(0, 255, 178, 0.3)"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw outer ring
      ctx.beginPath()
      ctx.arc(centerX, centerY, maxRadius * 0.95, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
      ctx.lineWidth = 1
      ctx.stroke()

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationRef.current)
    }
  }, [isPlaying])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  )
}

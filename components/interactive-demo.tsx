"use client"

import { useState, useEffect, useRef } from "react"
import { useInView } from "react-intersection-observer"
import { Maximize2 } from "lucide-react"
import GlassContainer from "./glass-container"
import GlassButton from "./glass-button"

export default function InteractiveDemo() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const hotspots = [
    {
      id: 1,
      x: 35,
      y: 30,
      title: "Projection Unit",
      description: "Advanced laser projection system with 4K resolution and 1000 nits brightness.",
    },
    {
      id: 2,
      x: 65,
      y: 40,
      title: "Motion Sensors",
      description: "Infrared sensors detect customer presence and track movement for interactive displays.",
    },
    {
      id: 3,
      x: 50,
      y: 70,
      title: "Control Module",
      description: "Central processing unit with wireless connectivity and cloud integration.",
    },
  ]

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const updateCanvasSize = () => {
      const container = canvas.parentElement
      if (!container) return

      canvas.width = container.offsetWidth
      canvas.height = container.offsetHeight
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    // Draw the holographic display
    const drawDisplay = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const size = Math.min(canvas.width, canvas.height) * 0.4 * zoom

      // Save context state
      ctx.save()

      // Apply transformations
      ctx.translate(centerX, centerY)
      ctx.rotate((rotation * Math.PI) / 180)

      // Draw base
      ctx.beginPath()
      ctx.ellipse(0, size * 0.6, size * 0.5, size * 0.2, 0, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 255, 255, 0.2)"
      ctx.fill()
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
      ctx.stroke()

      // Draw stand
      ctx.beginPath()
      ctx.moveTo(0, size * 0.6)
      ctx.lineTo(0, 0)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.7)"
      ctx.lineWidth = 3
      ctx.stroke()

      // Draw display cube
      drawCube(ctx, 0, 0, size)

      // Draw holographic projection
      const time = Date.now() * 0.001
      drawHologram(ctx, 0, 0, size * 0.8, time)

      // Restore context state
      ctx.restore()

      // Draw hotspots
      drawHotspots(ctx, centerX, centerY, size)
    }

    const drawCube = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      const halfSize = size / 2

      // Draw cube frame
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)"
      ctx.lineWidth = 2

      // Front face
      ctx.beginPath()
      ctx.rect(-halfSize, -halfSize, size, size)
      ctx.stroke()

      // Top edge
      ctx.beginPath()
      ctx.moveTo(-halfSize, -halfSize)
      ctx.lineTo(-halfSize * 0.7, -halfSize * 1.3)
      ctx.lineTo(halfSize * 1.3, -halfSize * 1.3)
      ctx.lineTo(halfSize, -halfSize)
      ctx.stroke()

      // Right edge
      ctx.beginPath()
      ctx.moveTo(halfSize, -halfSize)
      ctx.lineTo(halfSize * 1.3, -halfSize * 1.3)
      ctx.lineTo(halfSize * 1.3, halfSize * 0.7)
      ctx.lineTo(halfSize, halfSize)
      ctx.stroke()

      // Glass effect
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
      ctx.beginPath()
      ctx.rect(-halfSize, -halfSize, size, size)
      ctx.fill()
    }

    const drawHologram = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, time: number) => {
      const halfSize = size / 2

      // Holographic glow
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size)
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.4)")
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

      ctx.beginPath()
      ctx.arc(0, 0, size, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // Holographic content - simple product shape
      ctx.save()
      ctx.rotate(time * 0.5)

      // Product base
      ctx.beginPath()
      ctx.ellipse(0, halfSize * 0.3, halfSize * 0.4, halfSize * 0.2, 0, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
      ctx.fill()
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)"
      ctx.stroke()

      // Product body
      ctx.beginPath()
      ctx.moveTo(-halfSize * 0.2, halfSize * 0.3)
      ctx.lineTo(-halfSize * 0.3, -halfSize * 0.4)
      ctx.lineTo(halfSize * 0.3, -halfSize * 0.4)
      ctx.lineTo(halfSize * 0.2, halfSize * 0.3)
      ctx.closePath()
      ctx.fillStyle = "rgba(255, 255, 255, 0.2)"
      ctx.fill()
      ctx.strokeStyle = "rgba(255, 255, 255, 0.6)"
      ctx.stroke()

      // Product top
      ctx.beginPath()
      ctx.ellipse(0, -halfSize * 0.4, halfSize * 0.3, halfSize * 0.15, 0, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
      ctx.fill()
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)"
      ctx.stroke()

      // Scan lines
      for (let i = -halfSize; i < halfSize; i += 10) {
        const scanY = i + Math.sin(time * 2) * 10
        ctx.beginPath()
        ctx.moveTo(-halfSize * 0.5, scanY)
        ctx.lineTo(halfSize * 0.5, scanY)
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 + Math.sin(time * 2 + i * 0.1) * 0.1})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      ctx.restore()
    }

    const drawHotspots = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, size: number) => {
      hotspots.forEach((hotspot) => {
        const x = centerX + (hotspot.x - 50) * size * 0.02
        const y = centerY + (hotspot.y - 50) * size * 0.02
        const isActive = hotspot.id === activeHotspot

        // Draw hotspot circle
        ctx.beginPath()
        ctx.arc(x, y, isActive ? 12 : 8, 0, Math.PI * 2)
        ctx.fillStyle = isActive ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.5)"
        ctx.fill()

        // Draw pulse effect for active hotspot
        if (isActive) {
          const time = Date.now() * 0.001
          const pulseSize = 8 + Math.sin(time * 3) * 4

          ctx.beginPath()
          ctx.arc(x, y, pulseSize, 0, Math.PI * 2)
          ctx.strokeStyle = "rgba(255, 255, 255, 0.6)"
          ctx.lineWidth = 2
          ctx.stroke()
        }

        // Draw hotspot number
        ctx.fillStyle = "#000"
        ctx.font = "10px Arial"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(hotspot.id.toString(), x, y)
      })
    }

    // Animation loop
    const animate = () => {
      if (isPlaying) {
        setRotation((prev) => (prev + 0.5) % 360)
      }

      drawDisplay()
      animationRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    animationRef.current = requestAnimationFrame(animate)

    // Handle clicks on hotspots
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const size = Math.min(canvas.width, canvas.height) * 0.4 * zoom

      // Check if any hotspot was clicked
      for (const hotspot of hotspots) {
        const hx = centerX + (hotspot.x - 50) * size * 0.02
        const hy = centerY + (hotspot.y - 50) * size * 0.02

        const dx = x - hx
        const dy = y - hy
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance <= 12) {
          setActiveHotspot(hotspot.id === activeHotspot ? null : hotspot.id)
          return
        }
      }

      // If no hotspot was clicked, clear active hotspot
      setActiveHotspot(null)
    }

    canvas.addEventListener("click", handleCanvasClick)

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      canvas.removeEventListener("click", handleCanvasClick)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, rotation, zoom, activeHotspot])

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev)
  }

  const resetDemo = () => {
    setIsPlaying(false)
    setRotation(0)
    setZoom(1)
    setActiveHotspot(null)
  }

  const zoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 1.5))
  }

  const zoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5))
  }

  return (
    <section ref={ref} id="demo" className="min-h-screen relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <GlassContainer className="text-center mb-16 p-6">
          <div className="inline-block p-2 mb-4">
            <div className="flex items-center">
              <Maximize2 className="w-5 h-5 mr-2 text-white" />
              <span className="text-xs text-white/80">INTERACTIVE EXPERIENCE</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">EXPLORE GLASSCAPE</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Interact with our virtual holographic display to learn more about the Glasscape technology. Click on the
            hotspots to discover key features.
          </p>
        </GlassContainer>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <GlassContainer className="p-6">
            <div className="relative aspect-square w-full">
              <canvas ref={canvasRef} className="w-full h-full"></canvas>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                <GlassButton onClick={togglePlayPause}>{isPlaying ? "Pause" : "Rotate"}</GlassButton>
                <GlassButton onClick={zoomIn}>Zoom +</GlassButton>
                <GlassButton onClick={zoomOut}>Zoom -</GlassButton>
                <GlassButton onClick={resetDemo}>Reset</GlassButton>
              </div>
            </div>
          </GlassContainer>

          <GlassContainer className="p-6">
            <h3 className="text-2xl font-bold mb-6 text-white">Product Details</h3>

            {activeHotspot ? (
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-white">{hotspots.find((h) => h.id === activeHotspot)?.title}</h4>
                <p className="text-white/80">{hotspots.find((h) => h.id === activeHotspot)?.description}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-white/80">
                  Click on the numbered hotspots on the 3D model to learn more about each component of the Glasscape
                  system.
                </p>
                <ul className="space-y-2 text-white/80">
                  {hotspots.map((hotspot) => (
                    <li key={hotspot.id} className="flex items-center">
                      <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white mr-3">
                        {hotspot.id}
                      </span>
                      {hotspot.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </GlassContainer>
        </div>
      </div>
    </section>
  )
}

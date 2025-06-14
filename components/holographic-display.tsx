"use client"

import { useEffect, useRef } from "react"

export default function HolographicDisplay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const updateCanvasSize = () => {
      const container = containerRef.current
      if (!container) return

      canvas.width = container.offsetWidth
      canvas.height = container.offsetHeight
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    // Holographic display parameters
    const particles: Particle[] = []
    const particleCount = 80
    const maxDistance = 150
    let mouseX = canvas.width / 2
    let mouseY = canvas.height / 2

    // Particle class
    class Particle {
      x: number
      y: number
      z: number
      size: number
      color: string
      originalX: number
      originalY: number
      vx: number
      vy: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.z = Math.random() * 2
        this.size = Math.random() * 2 + 0.5
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`
        this.originalX = this.x
        this.originalY = this.y
        this.vx = 0
        this.vy = 0
      }

      update() {
        // Calculate distance from mouse
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Interactive effect based on mouse position
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          this.vx -= dx * force * 0.02
          this.vy -= dy * force * 0.02
        }

        // Return to original position
        const dox = this.originalX - this.x
        const doy = this.originalY - this.y
        this.vx += dox * 0.01
        this.vy += doy * 0.01

        // Apply friction
        this.vx *= 0.9
        this.vy *= 0.9

        // Update position
        this.x += this.vx
        this.y += this.vy
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * this.z, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    // Touch move handler for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect()
        mouseX = e.touches[0].clientX - rect.left
        mouseY = e.touches[0].clientY - rect.top
        e.preventDefault()
      }
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false })

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections between particles
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
      ctx.lineWidth = 0.5

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Draw holographic product representation
      drawHolographicProduct()

      requestAnimationFrame(animate)
    }

    // Draw holographic product
    const drawHolographicProduct = () => {
      if (!ctx) return

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const time = Date.now() * 0.001

      // Base platform
      ctx.beginPath()
      ctx.ellipse(centerX, centerY + 80, 100, 30, 0, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 255, 255, 0.2)"
      ctx.fill()

      // Holographic glow
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 150)
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.3)")
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

      ctx.beginPath()
      ctx.arc(centerX, centerY, 150, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // Display cube
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(time * 0.5)

      // Draw cube faces with perspective
      const size = 60
      const perspective = 0.3

      // Front face
      ctx.beginPath()
      ctx.rect(-size / 2, -size / 2, size, size)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)"
      ctx.stroke()
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
      ctx.fill()

      // Top face with perspective
      ctx.beginPath()
      ctx.moveTo(-size / 2, -size / 2)
      ctx.lineTo(-size / 2 + size * perspective, -size / 2 - size * perspective)
      ctx.lineTo(size / 2 + size * perspective, -size / 2 - size * perspective)
      ctx.lineTo(size / 2, -size / 2)
      ctx.closePath()
      ctx.strokeStyle = "rgba(255, 255, 255, 0.6)"
      ctx.stroke()
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
      ctx.fill()

      // Right face with perspective
      ctx.beginPath()
      ctx.moveTo(size / 2, -size / 2)
      ctx.lineTo(size / 2 + size * perspective, -size / 2 - size * perspective)
      ctx.lineTo(size / 2 + size * perspective, size / 2 - size * perspective)
      ctx.lineTo(size / 2, size / 2)
      ctx.closePath()
      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)"
      ctx.stroke()
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)"
      ctx.fill()

      // Holographic scan lines
      for (let i = -size / 2; i < size / 2; i += 5) {
        const scanY = i + Math.sin(time * 3) * 20
        if (scanY > -size / 2 && scanY < size / 2) {
          ctx.beginPath()
          ctx.moveTo(-size / 2, scanY)
          ctx.lineTo(size / 2, scanY)
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 + Math.sin(time * 3 + i * 0.1) * 0.1})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }

      ctx.restore()
    }

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("touchmove", handleTouchMove)
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  )
}

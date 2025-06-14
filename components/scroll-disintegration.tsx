"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "react-intersection-observer"
import { Maximize2, Zap } from "lucide-react"
import HudElement from "./hud-element"

export default function ScrollDisintegration() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 600
    canvas.height = 600

    // Load product image
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = "/placeholder.svg?height=600&width=600"

    img.onload = () => {
      setImageLoaded(true)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      // Get image data for manipulation
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const originalData = new Uint8ClampedArray(imageData.data)

      // Create particles from image
      const particles: ImageParticle[] = []
      const particleGap = 6 // Sample every 6 pixels

      for (let y = 0; y < canvas.height; y += particleGap) {
        for (let x = 0; x < canvas.width; x += particleGap) {
          const i = (y * canvas.width + x) * 4

          // Skip transparent pixels
          if (originalData[i + 3] < 128) continue

          particles.push(new ImageParticle(x, y, originalData[i], originalData[i + 1], originalData[i + 2]))
        }
      }

      // Handle scroll
      const handleScroll = () => {
        const element = sectionRef as unknown as HTMLElement
        if (!element) return

        const rect = element.getBoundingClientRect()
        const windowHeight = window.innerHeight

        // Calculate how far through the section we've scrolled (0 to 1)
        let progress = 0

        if (rect.top <= windowHeight && rect.bottom >= 0) {
          const sectionHeight = rect.height
          const visibleHeight = Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top)
          progress = visibleHeight / sectionHeight
        }

        setScrollProgress(progress)
      }

      window.addEventListener("scroll", handleScroll)

      // Animation loop
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw particles based on scroll progress
        particles.forEach((particle) => {
          particle.update(scrollProgress)
          particle.draw(ctx)
        })

        requestAnimationFrame(animate)
      }

      animate()

      // Cleanup
      return () => {
        window.removeEventListener("scroll", handleScroll)
      }
    }
  }, [sectionRef])

  // Particle class for image disintegration
  class ImageParticle {
    originalX: number
    originalY: number
    x: number
    y: number
    color: string
    size: number
    maxDistance: number
    angle: number
    speed: number

    constructor(x: number, y: number, r: number, g: number, b: number) {
      this.originalX = x
      this.originalY = y
      this.x = x
      this.y = y
      this.color = `rgb(${r}, ${g}, ${b})`
      this.size = Math.random() * 2 + 1
      this.maxDistance = Math.random() * 100 + 50
      this.angle = Math.random() * Math.PI * 2
      this.speed = Math.random() * 2 + 0.5
    }

    update(progress: number) {
      // At progress 0, particles are in original position
      // As progress increases, particles move away
      if (progress > 0.2) {
        const moveProgress = (progress - 0.2) / 0.8 // Normalize to 0-1 range
        const distance = this.maxDistance * moveProgress

        this.x = this.originalX + Math.cos(this.angle) * distance
        this.y = this.originalY + Math.sin(this.angle) * distance

        // Fade out as they move away
        this.size = Math.max(0, 3 * (1 - moveProgress))
      } else {
        this.x = this.originalX
        this.y = this.originalY
      }
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = this.color
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  return (
    <section
      ref={sectionRef as any}
      id="technology"
      className="min-h-screen relative flex flex-col items-center justify-center px-4 py-20"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      <div className="max-w-6xl mx-auto w-full z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <HudElement animationDelay={200}>
              <div className="data-panel p-2 mb-6">
                <div className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-cyan-400" />
                  <span className="text-xs text-cyan-500">REVOLUTIONARY TECHNOLOGY</span>
                </div>
              </div>
            </HudElement>

            <HudElement animationDelay={400}>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 glitch-text"
                data-text="HOLOGRAPHIC REALITY"
              >
                HOLOGRAPHIC REALITY
              </h2>
            </HudElement>

            <HudElement animationDelay={600}>
              <p className="text-cyan-300 mb-6 leading-relaxed">
                Glasscape transforms ordinary retail displays into extraordinary interactive experiences. Our
                holographic display system integrates seamlessly with existing cabinets and shelves, creating
                captivating visual presentations that engage customers on a whole new level.
              </p>
            </HudElement>

            <HudElement animationDelay={800}>
              <p className="text-cyan-300 mb-8 leading-relaxed">
                With advanced projection technology and intelligent sensors, Glasscape responds to customer presence and
                interaction, delivering product information, immersive storytelling, and dynamic visuals that elevate
                the retail experience beyond the physical realm.
              </p>
            </HudElement>

            <HudElement animationDelay={1000}>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="tech-spec">
                  <div className="text-xs text-cyan-500">RESOLUTION</div>
                  <div className="text-lg font-mono">4K UHD</div>
                </div>
                <div className="tech-spec">
                  <div className="text-xs text-cyan-500">RESPONSE TIME</div>
                  <div className="text-lg font-mono">5ms</div>
                </div>
                <div className="tech-spec">
                  <div className="text-xs text-cyan-500">VIEWING ANGLE</div>
                  <div className="text-lg font-mono">178°</div>
                </div>
              </div>
            </HudElement>
          </div>

          <div className="order-1 md:order-2 relative">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-cyan-500/10 rounded-lg"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <canvas ref={canvasRef} className="w-full h-full object-contain"></canvas>
              </div>
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-cyan-400"></div>
                <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-cyan-400"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-cyan-400"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-cyan-400"></div>
                <div className="absolute top-2 right-2 flex items-center">
                  <Maximize2 className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

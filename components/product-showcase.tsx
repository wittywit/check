"use client"

import { useState, useEffect, useRef } from "react"
import { useInView } from "react-intersection-observer"
import { ChevronLeft, ChevronRight, Store } from "lucide-react"
import GlassButton from "./glass-button"
import GlassContainer from "./glass-container"

export default function ProductShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const products = [
    {
      id: 1,
      name: "Glasscape Pro",
      description: "Our flagship holographic display system for premium retail environments.",
      image: "/placeholder.svg?height=500&width=500",
      features: ["4K Resolution", "Multi-touch Interface", "Cloud Integration"],
    },
    {
      id: 2,
      name: "Glasscape Mini",
      description: "Compact holographic solution for smaller retail displays and shelving units.",
      image: "/placeholder.svg?height=500&width=500",
      features: ["HD Resolution", "Gesture Control", "Battery Powered"],
    },
    {
      id: 3,
      name: "Glasscape Wall",
      description: "Large-scale holographic wall for immersive retail experiences.",
      image: "/placeholder.svg?height=500&width=500",
      features: ["8K Resolution", "Multi-user Interaction", "Custom Dimensions"],
    },
    {
      id: 4,
      name: "Glasscape Connect",
      description: "Network-enabled holographic displays with real-time content updates.",
      image: "/placeholder.svg?height=500&width=500",
      features: ["5G Connectivity", "Remote Management", "Analytics Dashboard"],
    },
  ]

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  const goToSlide = (index: number) => {
    if (isAnimating || index === activeIndex) return
    setIsAnimating(true)
    setActiveIndex(index)
    setTimeout(() => setIsAnimating(false), 500)
  }

  useEffect(() => {
    if (inView && carouselRef.current) {
      const carousel = carouselRef.current
      carousel.style.opacity = "1"
      carousel.style.transform = "translateY(0)"
    }
  }, [inView])

  // Calculate positions for 3D carousel effect
  const getItemStyle = (index: number) => {
    const diff = (index - activeIndex + products.length) % products.length
    let translateX = 0
    let translateZ = 0
    let opacity = 0
    let scale = 0.6
    let zIndex = 0

    if (diff === 0) {
      // Active slide
      translateX = 0
      translateZ = 0
      opacity = 1
      scale = 1
      zIndex = 10
    } else if (diff === 1 || diff === products.length - 1) {
      // Adjacent slides
      translateX = diff === 1 ? 75 : -75
      translateZ = -100
      opacity = 0.7
      scale = 0.8
      zIndex = 5
    } else {
      // Other slides
      translateX = diff < products.length / 2 ? 150 : -150
      translateZ = -200
      opacity = 0.4
      scale = 0.6
      zIndex = 1
    }

    return {
      transform: `translateX(${translateX}%) translateZ(${translateZ}px) scale(${scale})`,
      opacity,
      zIndex,
    }
  }

  return (
    <section ref={ref} id="showcase" className="min-h-screen relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <GlassContainer className="text-center mb-16 p-6">
          <div className="inline-block p-2 mb-4">
            <div className="flex items-center">
              <Store className="w-5 h-5 mr-2 text-white" />
              <span className="text-xs text-white/80">PRODUCT LINEUP</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">PRODUCT SHOWCASE</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Explore our range of holographic display solutions designed for different retail environments and needs.
          </p>
        </GlassContainer>

        <div
          ref={carouselRef}
          className="relative mt-20 mb-10 h-[500px] transition-all duration-1000 opacity-0 translate-y-10"
        >
          {/* 3D Carousel */}
          <div className="relative w-full h-full perspective-1000">
            <div className="absolute w-full h-full transform-style-3d">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="absolute top-0 left-0 w-full h-full transition-all duration-500 flex flex-col items-center"
                  style={getItemStyle(index)}
                >
                  <GlassContainer className="w-full max-w-md mx-auto overflow-hidden">
                    <div className="relative aspect-square bg-white/5">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-white/20 text-white text-xs font-bold px-2 py-1 rounded">
                        {product.name}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
                      <p className="text-white/80 mb-4">{product.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.features.map((feature, i) => (
                          <span key={i} className="bg-white/10 text-white text-xs px-2 py-1 rounded-full">
                            {feature}
                          </span>
                        ))}
                      </div>
                      <GlassButton className="w-full">Learn More</GlassButton>
                    </div>
                  </GlassContainer>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 z-20"
            aria-label="Previous product"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 z-20"
            aria-label="Next product"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 z-20">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeIndex ? "bg-white w-6" : "bg-white/50"
                }`}
                aria-label={`Go to product ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

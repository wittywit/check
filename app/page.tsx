"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, ChevronDown, Hexagon, Layers } from "lucide-react"
import HolographicDisplay from "@/components/holographic-display"
import NavigationMenu from "@/components/navigation-menu"
import GlassContainer from "@/components/glass-container"
import GlassButton from "@/components/glass-button"
import ScrollAnimationSection from "@/components/scroll-animation-section"
import ProductFeatures from "@/components/product-features"
import ProductShowcase from "@/components/product-showcase"
import InteractiveDemo from "@/components/interactive-demo"
import ContactSection from "@/components/contact-section"
import { useInView } from "react-intersection-observer"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  const { ref: parallaxRef, inView: parallaxInView } = useInView({
    threshold: 0,
    triggerOnce: false,
  })

  useEffect(() => {
    // Handle scroll events
    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Parallax effect for hero section
      if (heroRef.current) {
        const heroElements = heroRef.current.querySelectorAll(".parallax")
        heroElements.forEach((el) => {
          const element = el as HTMLElement
          const speed = Number.parseFloat(element.dataset.speed || "0.1")
          const yPos = -scrollY * speed
          element.style.transform = `translateY(${yPos}px)`
        })
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Simple CSS-based animations for initial load
    setTimeout(() => {
      const heroTitle = document.querySelector(".hero-title")
      const heroSubtitle = document.querySelector(".hero-subtitle")
      const heroCta = document.querySelector(".hero-cta")

      if (heroTitle) {
        heroTitle.classList.add("animate-fade-in")
      }

      if (heroSubtitle) {
        setTimeout(() => {
          heroSubtitle.classList.add("animate-fade-in")
        }, 400)
      }

      if (heroCta) {
        setTimeout(() => {
          heroCta.classList.add("animate-fade-in")
        }, 800)
      }

      setIsLoaded(true)
    }, 1000)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0 moving-background"></div>

      {/* Navigation */}
      <NavigationMenu />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6">
        <GlassContainer className="absolute top-10 left-10 w-32 h-32 md:block hidden" animationDelay={1000}>
          <div className="hexagon-container p-4">
            <Hexagon className="w-full h-full text-white opacity-70" />
          </div>
        </GlassContainer>

        <div className="z-10 text-center max-w-4xl mx-auto px-4">
          <h1
            className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white opacity-0 parallax"
            data-speed="0.05"
          >
            GLASSCAPE
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl mb-8 text-white opacity-0 parallax" data-speed="0.08">
            The future of retail display technology by Studio Poetics
          </p>
          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center opacity-0 parallax" data-speed="0.12">
            <GlassButton>
              Explore Technology <ArrowRight className="ml-2 h-5 w-5" />
            </GlassButton>
            <GlassButton variant="outline">
              View Demo <Layers className="ml-2 h-5 w-5" />
            </GlassButton>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-white" />
        </div>

        <HolographicDisplay />
      </section>

      {/* Scroll Animation Section */}
      <ScrollAnimationSection />

      {/* Product Features */}
      <ProductFeatures />

      {/* Product Showcase Carousel */}
      <ProductShowcase />

      {/* Interactive Demo */}
      <InteractiveDemo />

      {/* Contact Section */}
      <ContactSection />
    </main>
  )
}

"use client"

import { useEffect, useRef } from "react"
import { useInView } from "react-intersection-observer"
import { Zap } from "lucide-react"
import GlassContainer from "./glass-container"

export default function ScrollAnimationSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  const { ref: textRef, inView: textInView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })

  useEffect(() => {
    if (!containerRef.current) return

    const handleScroll = () => {
      if (!containerRef.current) return

      const scrollPosition = window.scrollY
      const containerTop = containerRef.current.offsetTop
      const containerHeight = containerRef.current.offsetHeight
      const windowHeight = window.innerHeight

      // Calculate how far through the section we've scrolled (0 to 1)
      let progress = 0

      if (scrollPosition > containerTop - windowHeight && scrollPosition < containerTop + containerHeight) {
        progress = (scrollPosition - (containerTop - windowHeight)) / (containerHeight + windowHeight)
        progress = Math.min(Math.max(progress, 0), 1)

        // Apply scroll effects
        const elements = containerRef.current.querySelectorAll(".scroll-animate")
        elements.forEach((el) => {
          const element = el as HTMLElement
          const direction = element.dataset.direction || "up"
          const intensity = Number.parseFloat(element.dataset.intensity || "100")
          const delay = Number.parseFloat(element.dataset.delay || "0")
          const adjustedProgress = Math.max(0, Math.min(1, (progress - delay) * 1.5))

          if (direction === "up") {
            const translateY = (1 - adjustedProgress) * intensity
            element.style.transform = `translateY(${translateY}px)`
            element.style.opacity = `${adjustedProgress}`
          } else if (direction === "down") {
            const translateY = (adjustedProgress - 1) * intensity
            element.style.transform = `translateY(${translateY}px)`
            element.style.opacity = `${adjustedProgress}`
          } else if (direction === "left") {
            const translateX = (1 - adjustedProgress) * intensity
            element.style.transform = `translateX(${translateX}px)`
            element.style.opacity = `${adjustedProgress}`
          } else if (direction === "right") {
            const translateX = (adjustedProgress - 1) * intensity
            element.style.transform = `translateX(${translateX}px)`
            element.style.opacity = `${adjustedProgress}`
          }
        })
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section
      ref={(el) => {
        // @ts-ignore - combine refs
        sectionRef(el)
        containerRef.current = el
      }}
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
            <GlassContainer animationDelay={200}>
              <div className="p-2 mb-6">
                <div className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-white" />
                  <span className="text-xs text-white/80">REVOLUTIONARY TECHNOLOGY</span>
                </div>
              </div>
            </GlassContainer>

            <div ref={textRef}>
              <h2
                className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white transition-all duration-1000 ${textInView ? "opacity-100" : "opacity-0 translate-y-10"}`}
              >
                HOLOGRAPHIC REALITY
              </h2>

              <p
                className={`text-white/80 mb-6 leading-relaxed transition-all duration-1000 delay-300 ${textInView ? "opacity-100" : "opacity-0 translate-y-10"}`}
              >
                Glasscape transforms ordinary retail displays into extraordinary interactive experiences. Our
                holographic display system integrates seamlessly with existing cabinets and shelves, creating
                captivating visual presentations that engage customers on a whole new level.
              </p>

              <p
                className={`text-white/80 mb-8 leading-relaxed transition-all duration-1000 delay-500 ${textInView ? "opacity-100" : "opacity-0 translate-y-10"}`}
              >
                With advanced projection technology and intelligent sensors, Glasscape responds to customer presence and
                interaction, delivering product information, immersive storytelling, and dynamic visuals that elevate
                the retail experience beyond the physical realm.
              </p>

              <div
                className={`flex flex-wrap gap-4 mb-6 transition-all duration-1000 delay-700 ${textInView ? "opacity-100" : "opacity-0 translate-y-10"}`}
              >
                <GlassContainer className="p-4">
                  <div className="text-xs text-white/70">RESOLUTION</div>
                  <div className="text-lg font-mono text-white">4K UHD</div>
                </GlassContainer>
                <GlassContainer className="p-4">
                  <div className="text-xs text-white/70">RESPONSE TIME</div>
                  <div className="text-lg font-mono text-white">5ms</div>
                </GlassContainer>
                <GlassContainer className="p-4">
                  <div className="text-xs text-white/70">VIEWING ANGLE</div>
                  <div className="text-lg font-mono text-white">178°</div>
                </GlassContainer>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 relative">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <GlassContainer className="w-full h-full">
                {/* Scroll animated elements */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <div
                    className="scroll-animate"
                    data-direction="up"
                    data-intensity="100"
                    data-delay="0.1"
                    style={{ transition: "all 0.8s ease" }}
                  >
                    <div className="w-40 h-40 bg-gradient-to-br from-white/10 to-white/20 rounded-lg shadow-lg"></div>
                  </div>

                  <div
                    className="scroll-animate absolute"
                    data-direction="down"
                    data-intensity="80"
                    data-delay="0.2"
                    style={{ transition: "all 0.8s ease" }}
                  >
                    <div className="w-32 h-32 bg-gradient-to-tr from-white/5 to-white/15 rounded-lg shadow-lg transform rotate-15"></div>
                  </div>

                  <div
                    className="scroll-animate absolute"
                    data-direction="left"
                    data-intensity="120"
                    data-delay="0.3"
                    style={{ transition: "all 0.8s ease" }}
                  >
                    <div className="w-24 h-24 bg-gradient-to-bl from-white/10 to-white/20 rounded-lg shadow-lg transform -rotate-10"></div>
                  </div>

                  <div
                    className="scroll-animate absolute"
                    data-direction="right"
                    data-intensity="90"
                    data-delay="0.4"
                    style={{ transition: "all 0.8s ease" }}
                  >
                    <div className="w-20 h-20 bg-gradient-to-tl from-white/5 to-white/15 rounded-lg shadow-lg transform rotate-30"></div>
                  </div>
                </div>
              </GlassContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

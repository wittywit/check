"use client"

import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { Cpu, Layers, Maximize2, Zap, Lightbulb, Eye } from "lucide-react"
import GlassContainer from "./glass-container"

export default function ProductFeatures() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      // Use CSS transitions for animations
      const featureCards = document.querySelectorAll(".feature-card")
      featureCards.forEach((card, index) => {
        const el = card as HTMLElement
        el.style.opacity = "0"
        el.style.transform = "translateY(50px)"

        setTimeout(() => {
          el.style.transition = "opacity 0.8s ease, transform 0.8s ease"
          el.style.opacity = "1"
          el.style.transform = "translateY(0)"
        }, 150 * index)
      })
    }
  }, [inView])

  const features = [
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Multi-Layer Projection",
      description: "Create depth with multiple holographic layers that respond to viewer perspective.",
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Motion Tracking",
      description: "Intelligent sensors detect customer movement and adjust displays accordingly.",
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Smart Integration",
      description: "Seamlessly connects with existing inventory and POS systems for real-time updates.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Energy Efficient",
      description: "Low power consumption with smart standby mode when no customers are present.",
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Ambient Adaptation",
      description: "Automatically adjusts brightness and contrast based on store lighting conditions.",
    },
    {
      icon: <Maximize2 className="w-8 h-8" />,
      title: "Modular Design",
      description: "Easily scale from small displays to entire walls with modular components.",
    },
  ]

  return (
    <section ref={ref} id="features" className="min-h-screen relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <GlassContainer>
          <div className="text-center mb-16 p-6">
            <div className="inline-block p-2 mb-4">
              <div className="flex items-center">
                <Cpu className="w-5 h-5 mr-2 text-white" />
                <span className="text-xs text-white/80">SYSTEM CAPABILITIES</span>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">ADVANCED FEATURES</h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Glasscape combines cutting-edge holographic technology with intelligent systems to create displays that
              captivate, inform, and convert.
            </p>
          </div>
        </GlassContainer>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {features.map((feature, index) => (
            <GlassContainer key={index} className="feature-card p-6">
              <div className="w-12 h-12 mb-4 flex items-center justify-center text-white bg-white/10 rounded-md">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-white/80">{feature.description}</p>
            </GlassContainer>
          ))}
        </div>
      </div>
    </section>
  )
}

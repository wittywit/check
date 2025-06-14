"use client"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { ArrowRight, Store, ShoppingBag, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import HudElement from "./hud-element"

export default function RetailShowcase() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [activeCase, setActiveCase] = useState(0)

  const cases = [
    {
      title: "Luxury Jewelry",
      description:
        "Enhanced the presentation of high-end watches and jewelry with floating 3D models that customers can rotate and explore in detail.",
      image: "/placeholder.svg?height=400&width=600",
      stats: [
        { label: "Sales Increase", value: "32%" },
        { label: "Customer Engagement", value: "4.5x" },
      ],
    },
    {
      title: "Electronics Retail",
      description:
        "Created interactive product demonstrations that highlight features and specifications when customers approach the display.",
      image: "/placeholder.svg?height=400&width=600",
      stats: [
        { label: "Time Spent", value: "+127%" },
        { label: "Conversion Rate", value: "28%" },
      ],
    },
    {
      title: "Fashion Boutique",
      description:
        "Implemented virtual try-on experiences that show how clothing items look in different scenarios and lighting conditions.",
      image: "/placeholder.svg?height=400&width=600",
      stats: [
        { label: "Return Rate", value: "-18%" },
        { label: "Cross-selling", value: "+45%" },
      ],
    },
  ]

  useEffect(() => {
    if (inView) {
      // Use CSS transitions for animations
      const showcaseHeader = document.querySelector(".showcase-header")
      if (showcaseHeader) {
        const el = showcaseHeader as HTMLElement
        el.style.opacity = "0"
        el.style.transform = "translateY(30px)"

        setTimeout(() => {
          el.style.transition = "opacity 1s ease, transform 1s ease"
          el.style.opacity = "1"
          el.style.transform = "translateY(0)"
        }, 300)
      }
    }
  }, [inView])

  useEffect(() => {
    // Handle case content transitions
    const caseContent = document.querySelector(".case-content")
    if (caseContent) {
      const el = caseContent as HTMLElement

      // Fade out
      el.style.transition = "opacity 0.3s ease, transform 0.3s ease"
      el.style.opacity = "0"
      el.style.transform = "translateX(-30px)"

      // Fade in with new content
      setTimeout(() => {
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
        el.style.opacity = "1"
        el.style.transform = "translateX(0)"
      }, 300)
    }
  }, [activeCase])

  return (
    <section ref={ref} id="showcase" className="min-h-screen relative py-20 px-4">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      <div className="max-w-6xl mx-auto z-10 relative">
        <div className="showcase-header text-center mb-16">
          <div className="inline-block data-panel p-2 mb-4">
            <div className="flex items-center">
              <Store className="w-5 h-5 mr-2 text-cyan-400" />
              <span className="text-xs text-cyan-500">REAL WORLD APPLICATIONS</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 glitch-text" data-text="RETAIL SHOWCASE">
            RETAIL SHOWCASE
          </h2>
          <p className="text-cyan-300 max-w-2xl mx-auto">
            See how leading retailers are using Glasscape to transform their customer experience and drive unprecedented
            engagement and sales.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <HudElement>
                <div className="case-content">
                  <div className="data-panel p-2 mb-4 inline-block">
                    <div className="flex items-center">
                      <ShoppingBag className="w-4 h-4 mr-2 text-cyan-400" />
                      <span className="text-xs text-cyan-500">CASE STUDY {activeCase + 1}/3</span>
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-cyan-300">{cases[activeCase].title}</h3>

                  <p className="text-cyan-400/80 mb-6 leading-relaxed">{cases[activeCase].description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {cases[activeCase].stats.map((stat, index) => (
                      <div key={index} className="bg-cyan-900/20 border border-cyan-900/50 rounded-md p-4">
                        <div className="text-xs text-cyan-500 mb-1">{stat.label}</div>
                        <div className="text-2xl font-bold text-cyan-300 flex items-center">
                          {stat.value}
                          <Sparkles className="w-4 h-4 ml-2 text-cyan-400" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold">
                    View Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </HudElement>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="space-y-8">
              {cases.map((caseItem, index) => (
                <div
                  key={index}
                  className={`relative rounded-lg overflow-hidden transition-all duration-300 ${
                    activeCase === index
                      ? "ring-2 ring-cyan-500 shadow-[0_0_15px_rgba(0,255,255,0.3)]"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  onClick={() => setActiveCase(index)}
                >
                  <div className="relative aspect-[3/2] cursor-pointer">
                    <img
                      src={caseItem.image || "/placeholder.svg"}
                      alt={caseItem.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                      <div className="p-4">
                        <h4 className="text-xl font-bold text-white">{caseItem.title}</h4>
                      </div>
                    </div>

                    {/* HUD overlay elements */}
                    <div className="absolute top-4 right-4 data-panel p-1 text-xs">CASE #{index + 1}</div>

                    <div className="absolute top-0 left-0 w-12 h-12">
                      <div className="absolute top-0 left-0 w-full h-full border-t-2 border-l-2 border-cyan-400"></div>
                    </div>

                    <div className="absolute bottom-0 right-0 w-12 h-12">
                      <div className="absolute bottom-0 right-0 w-full h-full border-b-2 border-r-2 border-cyan-400"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

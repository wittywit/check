"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface GlassContainerProps {
  children: React.ReactNode
  className?: string
  animationDelay?: number
}

export default function GlassContainer({ children, className, animationDelay = 0 }: GlassContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Set initial state
    const element = containerRef.current
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"

    // Trigger animation after delay
    const timer = setTimeout(() => {
      element.style.transition = "opacity 1s ease, transform 1s ease"
      element.style.opacity = "1"
      element.style.transform = "translateY(0)"
    }, animationDelay)

    return () => clearTimeout(timer)
  }, [animationDelay])

  return (
    <div ref={containerRef} className={cn("glassContainer", className)}>
      {children}
    </div>
  )
}

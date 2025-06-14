"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface HudElementProps {
  children: React.ReactNode
  className?: string
  animationDelay?: number
}

export default function HudElement({ children, className, animationDelay = 0 }: HudElementProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    // Use CSS transitions instead of anime.js
    const element = elementRef.current

    // Set initial state
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
    <div ref={elementRef} className={cn("hud-element", className)}>
      {children}
    </div>
  )
}

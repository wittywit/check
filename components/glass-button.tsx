"use client"

import type React from "react"

import { cn } from "@/lib/utils"

interface GlassButtonProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "outline"
  onClick?: () => void
}

export default function GlassButton({ children, className, variant = "default", onClick }: GlassButtonProps) {
  return (
    <button onClick={onClick} className={cn("glassBtn", variant === "outline" && "glassBtn-outline", className)}>
      {children}
    </button>
  )
}

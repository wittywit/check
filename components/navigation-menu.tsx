"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Menu, X, Settings, Info, Phone, ChevronRight } from "lucide-react"
import GlassButton from "./glass-button"

export default function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      // Use CSS transitions for animations
      const navItems = document.querySelectorAll(".nav-item")
      navItems.forEach((item, index) => {
        const el = item as HTMLElement
        el.style.opacity = "0"
        el.style.transform = "translateX(50px)"

        setTimeout(() => {
          el.style.transition = "opacity 0.5s ease, transform 0.5s ease"
          el.style.opacity = "1"
          el.style.transform = "translateX(0)"
        }, 100 * index)
      })
    }
  }, [isOpen])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 px-4 py-4 md:px-6 md:py-6 transition-all duration-300 ${scrolled ? "bg-black/20 backdrop-blur-md" : ""}`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center">
          <span className="text-xl font-bold tracking-wider text-white">GLASSCAPE</span>
          <span className="text-xs text-white/70 ml-2 mt-1 hidden sm:inline-block">BY STUDIO POETICS</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <NavLink href="#technology">TECHNOLOGY</NavLink>
          <NavLink href="#features">FEATURES</NavLink>
          <NavLink href="#showcase">SHOWCASE</NavLink>
          <NavLink href="#demo">DEMO</NavLink>
          <NavLink href="#contact">CONTACT</NavLink>
          <GlassButton>REQUEST DEMO</GlassButton>
        </div>

        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-md border border-white/50 text-white"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-md z-40 transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"} md:hidden`}
      >
        <div className="flex flex-col h-full pt-20 px-6">
          <nav className="flex flex-col space-y-6">
            <MobileNavLink href="#technology" icon={<Info />} onClick={() => setIsOpen(false)}>
              TECHNOLOGY
            </MobileNavLink>
            <MobileNavLink href="#features" icon={<Settings />} onClick={() => setIsOpen(false)}>
              FEATURES
            </MobileNavLink>
            <MobileNavLink href="#showcase" icon={<Settings />} onClick={() => setIsOpen(false)}>
              SHOWCASE
            </MobileNavLink>
            <MobileNavLink href="#demo" icon={<Settings />} onClick={() => setIsOpen(false)}>
              DEMO
            </MobileNavLink>
            <MobileNavLink href="#contact" icon={<Phone />} onClick={() => setIsOpen(false)}>
              CONTACT
            </MobileNavLink>
          </nav>

          <div className="mt-auto mb-10">
            <GlassButton className="w-full">REQUEST DEMO</GlassButton>
          </div>
        </div>
      </div>
    </header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="text-white hover:text-white/80 text-sm tracking-wider relative group">
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
    </a>
  )
}

function MobileNavLink({
  href,
  icon,
  children,
  onClick,
}: {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <a
      href={href}
      className="nav-item flex items-center justify-between text-white py-3 border-b border-white/10"
      onClick={onClick}
    >
      <div className="flex items-center">
        <span className="mr-3 text-white/70">{icon}</span>
        <span className="text-lg">{children}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-white/70" />
    </a>
  )
}

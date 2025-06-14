"use client"

import type React from "react"

import { useState } from "react"
import { useInView } from "react-intersection-observer"
import { Phone, Mail, MapPin, Send } from "lucide-react"
import GlassButton from "./glass-button"
import GlassContainer from "./glass-container"

export default function ContactSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true)
    }, 1000)
  }

  return (
    <section ref={ref} id="contact" className="min-h-screen relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <GlassContainer className="inline-block p-4 mb-4">
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-2 text-white" />
              <span className="text-xs text-white/80">GET IN TOUCH</span>
            </div>
          </GlassContainer>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">CONTACT US</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Ready to transform your retail displays? Our team of holographic specialists is ready to bring your vision
            to life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <GlassContainer className="p-6" animationDelay={300}>
            <h3 className="text-xl font-bold mb-6 text-white">Connect With Studio Poetics</h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-md mr-4">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-white/70 mb-1">Call Us</div>
                  <div className="text-white">+1 (800) 555-HOLO</div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-md mr-4">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-white/70 mb-1">Email</div>
                  <div className="text-white">info@studiopoetics.com</div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-md mr-4">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-white/70 mb-1">Headquarters</div>
                  <div className="text-white">
                    1234 Innovation Way
                    <br />
                    Tech District
                    <br />
                    San Francisco, CA 94107
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <h4 className="text-lg font-bold mb-4 text-white">Experience Glasscape</h4>
              <p className="text-white/80 mb-4">
                Visit our showroom to see Glasscape in action and experience the future of retail displays.
              </p>
              <GlassButton>Schedule a Demo</GlassButton>
            </div>
          </GlassContainer>

          <GlassContainer className="p-6" animationDelay={500}>
            {!isSubmitted ? (
              <>
                <h3 className="text-xl font-bold mb-6 text-white">Send Us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm text-white/70">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full bg-white/10 border border-white/20 rounded-md p-2 text-white focus:outline-none focus:border-white/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm text-white/70">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full bg-white/10 border border-white/20 rounded-md p-2 text-white focus:outline-none focus:border-white/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm text-white/70">
                      Company
                    </label>
                    <input
                      id="company"
                      name="company"
                      value={formState.company}
                      onChange={handleChange}
                      className="w-full bg-white/10 border border-white/20 rounded-md p-2 text-white focus:outline-none focus:border-white/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm text-white/70">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      className="w-full bg-white/10 border border-white/20 rounded-md p-2 text-white focus:outline-none focus:border-white/50 min-h-[120px]"
                      required
                    />
                  </div>

                  <GlassButton className="w-full">
                    Send Message <Send className="ml-2 h-4 w-4" />
                  </GlassButton>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 flex items-center justify-center bg-white/10 rounded-full mb-6">
                  <Send className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Message Sent!</h3>
                <p className="text-white/80 text-center mb-6">
                  Thank you for reaching out. A member of our team will contact you shortly.
                </p>
                <GlassButton onClick={() => setIsSubmitted(false)}>Send Another Message</GlassButton>
              </div>
            )}
          </GlassContainer>
        </div>
      </div>
    </section>
  )
}

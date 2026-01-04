"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"

interface TestimonialData {
  quote: string
  author: string
  role: string
  company: string
  avatar: string
}

const testimonials: TestimonialData[] = [
  {
    quote: "Qualitativ hochwertige Produkte, genau auf unsere Wünsche abgestimmt. Die Handwerker vor Ort waren extrem zuverlässig und haben ausgezeichnet auf unsere Anpassungswünsche reagiert. Eine absolute Empfehlung!",
    author: "Sonia Schrödel",
    role: "Google Rezension",
    company: "Local Guide",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  },
  {
    quote: "Ich bin äußerst zufrieden mit dem Service! Die Schreinerei Krickl konnte uns noch kurzfristig am 23. Dezember helfen, um eine wichtige Tür in unseren Geschäftsräumen zu reparieren. Absolut empfehlenswert!",
    author: "Manuel Kraus",
    role: "Google Rezension",
    company: "Local Guide",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    quote: "Für unsere erste Wohnung hat sich die Schreinerei Krickl um unseren Esszimmertisch aus einer Wildeicheplatte und um einen Kücheneinbauschrank auf Maß gekümmert. Sauber gearbeitet und auf jeden Wunsch eingegangen.",
    author: "Natalia Tsitou",
    role: "Google Rezension",
    company: "Esszimmertisch & Einbauschrank",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    quote: "Hervorragende handwerkliche Arbeit! Herr Tomay hat unser Projekt mit großer Sorgfalt und Präzision umgesetzt. Die Qualität der Arbeit ist beeindruckend, und die termingerechte Lieferung war ein weiterer Pluspunkt.",
    author: "Chrubi Hailom",
    role: "Google Rezension",
    company: "5 Sterne",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    quote: "Die Schreinerei Krickl hat uns bei der Neugestaltung unseres Eingangsbereichs unterstützt. Kurze Antwortzeiten, freundlicher Vorort-Termin, ein nach individuellen Wünschen gestalteter Entwurf und perfekter Einbau.",
    author: "Anne Dröge",
    role: "Google Rezension",
    company: "Eingangsbereich",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
  },
  {
    quote: "Für unsere neue Küche benötigten wir eine Arbeitsplatte. Herr Tomay kam prompt mit Farbmustern vorbei. Nur zwei Wochen später war die neue Arbeitsplatte installiert. Das Preis-Leistungs-Verhältnis ist ausgezeichnet.",
    author: "Andreas Wagner",
    role: "Google Rezension",
    company: "Local Guide",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
  {
    quote: "Traumhafte Arbeit! Yannik Tomay hat mir einen in jeder Hinsicht perfekten Tisch gezaubert. Die Verarbeitung und Präzision zeugen von absolutem handwerklichen Können. Absolut zu empfehlen!",
    author: "Andreas Rösch",
    role: "Google Rezension",
    company: "Maßanfertigung Tisch",
    avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face",
  },
  {
    quote: "Tolle Handwerkskunst, super schnell und auf dem Punkt. Wir sind sehr zufrieden und können Yannik Tomay und sein Team nur weiterempfehlen. Vielen Dank.",
    author: "Alexandra",
    role: "Google Rezension",
    company: "5 Sterne",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
  },
]

function usePreloadImages(images: string[]) {
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [images])
}

function SplitText({ text }: { text: string }) {
  const words = text.split(" ")

  return (
    <span className="inline">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.4,
            delay: i * 0.03,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

export function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  usePreloadImages(testimonials.map((t) => t.avatar))

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    },
    [mouseX, mouseY],
  )

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const currentTestimonial = testimonials[activeIndex]

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-xl mx-auto py-12 md:py-20 px-6 md:px-8"
      style={{ cursor: "none" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleNext}
      data-testid="testimonial-container"
    >
      <motion.div
        className="pointer-events-none absolute z-50 mix-blend-difference hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full bg-foreground flex items-center justify-center"
          animate={{
            width: isHovered ? 80 : 0,
            height: isHovered ? 80 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
        >
          <motion.span
            className="text-background text-xs font-medium tracking-wider uppercase"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ delay: 0.1 }}
          >
            Weiter
          </motion.span>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute top-6 md:top-8 right-6 md:right-8 flex items-baseline gap-1 font-mono text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.span
          className="text-2xl font-light text-foreground"
          key={activeIndex}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {String(activeIndex + 1).padStart(2, "0")}
        </motion.span>
        <span className="text-muted-foreground">/</span>
        <span className="text-muted-foreground">{String(testimonials.length).padStart(2, "0")}</span>
      </motion.div>

      <motion.div
        className="absolute top-6 md:top-8 left-6 md:left-8 flex -space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.6 }}
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            className={`w-6 h-6 rounded-full border-2 border-background overflow-hidden transition-all duration-300 ${
              i === activeIndex ? "ring-1 ring-primary ring-offset-1 ring-offset-background" : "grayscale opacity-50"
            }`}
            whileHover={{ scale: 1.1, opacity: 1 }}
          >
            <img src={t.avatar} alt={t.author} className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </motion.div>

      <div className="relative pt-8">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="text-xl md:text-2xl font-light leading-relaxed tracking-tight text-foreground"
          >
            <span className="text-primary text-3xl mr-1">"</span>
            <SplitText text={currentTestimonial.quote} />
            <span className="text-primary text-3xl ml-1">"</span>
          </motion.blockquote>
        </AnimatePresence>

        <motion.div className="mt-10 md:mt-12 relative" layout>
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12">
              <motion.div
                className="absolute -inset-1.5 rounded-full border border-primary/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              {testimonials.map((t, i) => (
                <motion.img
                  key={t.avatar}
                  src={t.avatar}
                  alt={t.author}
                  className="absolute inset-0 w-12 h-12 rounded-full object-cover grayscale hover:grayscale-0 transition-[filter] duration-500"
                  animate={{
                    opacity: i === activeIndex ? 1 : 0,
                    zIndex: i === activeIndex ? 1 : 0,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className="relative pl-4"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-px bg-primary"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  style={{ originY: 0 }}
                />
                <span className="block text-sm font-medium text-foreground tracking-wide">
                  {currentTestimonial.author}
                </span>
                <span className="block text-xs text-muted-foreground mt-0.5 font-mono uppercase tracking-widest">
                  {currentTestimonial.role} — {currentTestimonial.company}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="mt-12 md:mt-16 h-px bg-border relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: `${((activeIndex + 1) / testimonials.length) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <motion.div
        className="absolute bottom-4 md:bottom-8 left-6 md:left-8 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.4 : 0.2 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">Klicken zum Wechseln</span>
      </motion.div>
    </div>
  )
}

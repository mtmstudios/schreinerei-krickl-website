"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

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

export function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0)

  usePreloadImages(testimonials.map((t) => t.avatar))

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const goToSlide = (index: number) => {
    setActiveIndex(index)
  }

  const currentTestimonial = testimonials[activeIndex]

  return (
    <div className="relative w-full max-w-4xl mx-auto" data-testid="testimonial-container">
      <div className="relative bg-background rounded-xl border border-border p-8 md:p-12">
        <div className="flex gap-1 mb-6 justify-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          ))}
        </div>

        <div className="min-h-[180px] md:min-h-[150px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-lg md:text-xl leading-relaxed text-foreground text-center max-w-3xl"
            >
              "{currentTestimonial.quote}"
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mt-8 flex flex-col items-center"
          >
            <div className="relative w-14 h-14 mb-3">
              <div className="absolute -inset-1 rounded-full border-2 border-primary/30" />
              <img
                src={currentTestimonial.avatar}
                alt={currentTestimonial.author}
                className="w-14 h-14 rounded-full object-cover"
              />
            </div>
            <p className="font-semibold text-foreground">{currentTestimonial.author}</p>
            <p className="text-sm text-muted-foreground">{currentTestimonial.role}</p>
          </motion.div>
        </AnimatePresence>

        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Button
            size="icon"
            variant="ghost"
            onClick={handlePrev}
            data-testid="button-testimonial-prev"
            className="rounded-full"
            aria-label="Vorherige Bewertung"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <Button
            size="icon"
            variant="ghost"
            onClick={handleNext}
            data-testid="button-testimonial-next"
            className="rounded-full"
            aria-label="Nächste Bewertung"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            data-testid={`button-testimonial-dot-${index}`}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "bg-primary w-8"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Gehe zu Bewertung ${index + 1}`}
          />
        ))}
      </div>

      <p className="text-center text-sm text-muted-foreground mt-4">
        {activeIndex + 1} von {testimonials.length} Bewertungen
      </p>
    </div>
  )
}

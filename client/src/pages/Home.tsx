import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Armchair, ChefHat, TreeDeciduous, DoorOpen, Wrench, Sparkles } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import InquiryFunnel from "@/components/InquiryFunnel";
import InstagramFeed from "@/components/InstagramFeed";

import heroImage from "@assets/generated_images/carpentry_workshop_hero_image.png";
import furnitureImage from "@assets/generated_images/custom_furniture_piece.png";
import kitchenImage from "@assets/generated_images/custom_kitchen_cabinets.png";
import flooringImage from "@assets/generated_images/hardwood_flooring_detail.png";
import doorImage from "@assets/generated_images/custom_wooden_door.png";
import terraceImage from "@assets/generated_images/wooden_terrace_deck.png";
import wardrobeImage from "@assets/generated_images/custom_wardrobe_system.png";
import craftsmanImage from "@assets/generated_images/craftsman_hands_detail.png";

const services = [
  {
    title: "Möbelbau",
    description: "Individuelle Möbel nach Maß – perfekt auf Ihre Räume und Wünsche abgestimmt.",
    image: furnitureImage,
    href: "/leistungen/moebelbau",
    icon: <Armchair className="w-5 h-5" />,
  },
  {
    title: "Schreinerküchen",
    description: "Maßgefertigte Küchen statt Standardlösungen – für höchste Ansprüche.",
    image: kitchenImage,
    href: "/leistungen/schreinerkuechen",
    icon: <ChefHat className="w-5 h-5" />,
  },
  {
    title: "Terrassen & Böden",
    description: "Hochwertige Holzböden und Terrassen für drinnen und draußen.",
    image: terraceImage,
    href: "/leistungen/terrassen-bodenbelaege",
    icon: <TreeDeciduous className="w-5 h-5" />,
  },
  {
    title: "Türen",
    description: "Individuelle Innentüren und Haustüren – handwerklich gefertigt.",
    image: doorImage,
    href: "/leistungen/tueren",
    icon: <DoorOpen className="w-5 h-5" />,
  },
  {
    title: "Reparaturen",
    description: "Professionelle Reparaturen und Instandsetzungen für alle Holzarbeiten.",
    image: flooringImage,
    href: "/leistungen/reparaturen-instandsetzungen",
    icon: <Wrench className="w-5 h-5" />,
  },
  {
    title: "Sonderanfertigungen",
    description: "Außergewöhnliche Projekte und individuelle Sonderlösungen.",
    image: wardrobeImage,
    href: "/leistungen/sonderanfertigungen",
    icon: <Sparkles className="w-5 h-5" />,
  },
];

// todo: remove mock functionality
const testimonials = [
  {
    name: "Familie Müller",
    text: "Unser neues Wohnzimmerregal ist ein Traum! Perfekte Handwerksarbeit und super freundliche Beratung. Absolute Empfehlung!",
    rating: 5,
    project: "Maßgefertigtes Regal",
  },
  {
    name: "Dr. Schmidt",
    text: "Die neue Küche übertrifft alle Erwartungen. Qualität, die man sieht und spürt. Das Team war dabei stets zuverlässig und pünktlich.",
    rating: 5,
    project: "Schreinerküche",
  },
  {
    name: "Herr Weber",
    text: "Schnelle und saubere Arbeit bei der Reparatur unserer antiken Kommode. Wirklich Handwerk mit Herz!",
    rating: 5,
    project: "Möbelreparatur",
  },
];

export default function Home() {
  const [funnelOpen, setFunnelOpen] = useState(false);

  return (
    <Layout>
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Schreinerei Werkstatt" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Individuelle Schreinerarbeiten aus Esslingen
            </h1>
            <p className="text-xl text-white/90 mb-4">
              Meisterbetrieb seit über 60 Jahren
            </p>
            <p className="text-lg text-white/80 mb-8">
              Möbelbau, Küchen, Innenausbau und Reparaturen – persönlich, zuverlässig, maßgefertigt.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => setFunnelOpen(true)}
                className="text-base"
                data-testid="button-hero-cta"
              >
                In 60 Sekunden zur Anfrage
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-base bg-white/10 border-white/30 text-white backdrop-blur-sm"
                data-testid="button-hero-secondary"
              >
                <Link href="/leistungen">Unsere Leistungen</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Unsere Leistungen</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Von der ersten Idee bis zur fertigen Montage – wir begleiten Sie durch Ihr gesamtes Projekt.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                Über 60 Jahre Handwerkstradition
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Seit mehr als sechs Jahrzehnten steht die Schreinerei Krickl für Qualität, Zuverlässigkeit und echtes Handwerk. Als Meisterbetrieb in Esslingen verbinden wir traditionelles Know-how mit modernen Techniken.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Jedes Projekt ist für uns eine Herzensangelegenheit – von der ersten Beratung bis zur finalen Montage.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild data-testid="button-about-link">
                  <Link href="/ueber-uns">
                    Mehr über uns
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" asChild data-testid="button-timeline-link">
                  <Link href="/ueber-uns#zeitstrahl">Unsere Geschichte</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-xl overflow-hidden"
            >
              <img
                src={craftsmanImage}
                alt="Handwerksarbeit"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Was unsere Kunden sagen</h2>
            <p className="text-lg text-muted-foreground">
              Zufriedene Kunden sind unser größter Antrieb
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <TestimonialCard {...testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <InstagramFeed />

      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Bereit für Ihr Projekt?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Lassen Sie uns gemeinsam Ihre Ideen verwirklichen. Kontaktieren Sie uns für eine unverbindliche Beratung.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => setFunnelOpen(true)}
                data-testid="button-cta-funnel"
              >
                Jetzt unverbindlich anfragen
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-primary-foreground/30 text-primary-foreground bg-transparent"
                data-testid="button-cta-contact"
              >
                <Link href="/kontakt">Kontakt aufnehmen</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <InquiryFunnel isOpen={funnelOpen} onClose={() => setFunnelOpen(false)} />
    </Layout>
  );
}

import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Armchair, ChefHat, TreeDeciduous, DoorOpen, Wrench, Sparkles } from "lucide-react";
import Layout from "@/components/layout/Layout";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ServiceCard from "@/components/ServiceCard";

import furnitureImage from "@assets/generated_images/custom_furniture_piece.png";
import kitchenImage from "@assets/generated_images/custom_kitchen_cabinets.png";
import terraceImage from "@assets/generated_images/wooden_terrace_deck.png";
import doorImage from "@assets/generated_images/custom_wooden_door.png";
import flooringImage from "@assets/generated_images/hardwood_flooring_detail.png";
import wardrobeImage from "@assets/generated_images/custom_wardrobe_system.png";
import workshopImage from "@assets/generated_images/carpentry_workshop_hero_image.png";

const services = [
  {
    title: "Möbelbau",
    description: "Individuelle Möbel nach Maß – von Regalen über Schränke bis hin zu kompletten Einrichtungen. Perfekt auf Ihre Räume und Wünsche abgestimmt.",
    image: furnitureImage,
    href: "/leistungen/moebelbau",
    icon: <Armchair className="w-5 h-5" />,
  },
  {
    title: "Schreinerküchen",
    description: "Maßgefertigte Küchen statt Standardlösungen. Höchste Qualität, perfekte Passform und individuelle Gestaltung für Ihr Kochparadies.",
    image: kitchenImage,
    href: "/leistungen/schreinerkuechen",
    icon: <ChefHat className="w-5 h-5" />,
  },
  {
    title: "Terrassen & Bodenbeläge",
    description: "Hochwertige Holzböden und Terrassen für drinnen und draußen. Parkett, Dielen, Terrassendecks – fachgerecht verlegt.",
    image: terraceImage,
    href: "/leistungen/terrassen-bodenbelaege",
    icon: <TreeDeciduous className="w-5 h-5" />,
  },
  {
    title: "Türen",
    description: "Individuelle Innentüren und Haustüren, handwerklich gefertigt. Vom klassischen Design bis zum modernen Stil.",
    image: doorImage,
    href: "/leistungen/tueren",
    icon: <DoorOpen className="w-5 h-5" />,
  },
  {
    title: "Reparaturen & Instandsetzungen",
    description: "Professionelle Reparaturen für alle Holzarbeiten. Wir reparieren, restaurieren und setzen instand – schnell und zuverlässig.",
    image: flooringImage,
    href: "/leistungen/reparaturen-instandsetzungen",
    icon: <Wrench className="w-5 h-5" />,
  },
  {
    title: "Sonderanfertigungen",
    description: "Außergewöhnliche Projekte und individuelle Sonderlösungen. Wir setzen Ihre kreativen Ideen in die Tat um.",
    image: wardrobeImage,
    href: "/leistungen/sonderanfertigungen",
    icon: <Sparkles className="w-5 h-5" />,
  },
];

export default function Services() {
  return (
    <Layout>
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0">
          <img src={workshopImage} alt="Werkstatt" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Unsere Leistungen</h1>
            <p className="text-xl text-white/90">
              Von der ersten Idee bis zur fertigen Montage – Qualitätshandwerk für jeden Anspruch
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Leistungen" }]} />
      </div>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Handwerk, das begeistert
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Entdecken Sie unser vielfältiges Leistungsspektrum. Jedes Projekt wird mit Sorgfalt, Erfahrung und Leidenschaft umgesetzt.
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
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Sie haben ein besonderes Projekt?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Sprechen Sie uns an! Wir beraten Sie gerne und finden gemeinsam die perfekte Lösung für Ihre Anforderungen.
            </p>
            <Button size="lg" asChild data-testid="button-services-contact">
              <Link href="/kontakt">
                Jetzt Kontakt aufnehmen
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

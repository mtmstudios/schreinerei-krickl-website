import { useState, useMemo } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Armchair, ChefHat, TreeDeciduous, DoorOpen, Sparkles } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { VerticalImageStack } from "@/components/ui/vertical-image-stack";
import InquiryFunnel from "@/components/InquiryFunnel";

import furnitureImage from "@assets/generated_images/custom_furniture_piece.png";
import kitchenImage from "@assets/generated_images/custom_kitchen_cabinets.png";
import terraceImage from "@assets/generated_images/wooden_terrace_deck.png";
import doorImage from "@assets/generated_images/custom_wooden_door.png";
import flooringImage from "@assets/generated_images/hardwood_flooring_detail.png";
import wardrobeImage from "@assets/generated_images/custom_wardrobe_system.png";
import workshopImage from "@assets/generated_images/carpentry_workshop_hero_image.png";

// todo: remove mock functionality
const projects = [
  { id: "1", title: "Maßgefertigtes Bücherregal", category: "moebel", location: "Esslingen", image: furnitureImage },
  { id: "2", title: "Schreinerküche mit Eichenfronten", category: "kueche", location: "Stuttgart", image: kitchenImage },
  { id: "3", title: "Holzterrasse mit Bangkirai", category: "boden", location: "Esslingen", image: terraceImage },
  { id: "4", title: "Haustür in Nussbaum", category: "tueren", location: "Plochingen", image: doorImage },
  { id: "5", title: "Begehbarer Kleiderschrank", category: "sonder", location: "Esslingen", image: wardrobeImage },
  { id: "6", title: "Parkettboden Eiche geölt", category: "boden", location: "Stuttgart", image: flooringImage },
  { id: "7", title: "Einbauschrank unter Dachschräge", category: "moebel", location: "Nürtingen", image: wardrobeImage },
  { id: "8", title: "Moderne Landhausküche", category: "kueche", location: "Kirchheim", image: kitchenImage },
  { id: "9", title: "Glasinnentüren mit Eichenrahmen", category: "tueren", location: "Esslingen", image: doorImage },
];

const categories = [
  { id: "alle", label: "Alle", icon: null },
  { id: "moebel", label: "Möbel", icon: Armchair },
  { id: "kueche", label: "Küchen", icon: ChefHat },
  { id: "boden", label: "Böden", icon: TreeDeciduous },
  { id: "tueren", label: "Türen", icon: DoorOpen },
  { id: "sonder", label: "Sonderanfertigungen", icon: Sparkles },
];

export default function Projects() {
  const [funnelOpen, setFunnelOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("alle");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "alle") return projects;
    return projects.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const stackImages = useMemo(() => {
    return filteredProjects.map(p => ({
      id: p.id,
      src: p.image,
      alt: p.title,
      title: p.title,
      location: p.location,
    }));
  }, [filteredProjects]);

  return (
    <Layout>
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0">
          <img src={workshopImage} alt="Werkstatt" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Referenzen</h1>
            <p className="text-xl text-white/90">
              Entdecken Sie eine Auswahl unserer realisierten Projekte
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Unsere Projekte
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Jedes Projekt ist einzigartig – genau wie unsere Kunden. Wählen Sie eine Kategorie.
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <Button
                    key={cat.id}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`transition-all ${isActive ? "" : "bg-background"}`}
                    data-testid={`filter-${cat.id}`}
                  >
                    {Icon && <Icon className="w-4 h-4 mr-1.5" />}
                    {cat.label}
                  </Button>
                );
              })}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <VerticalImageStack images={stackImages} />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Ähnliches Projekt geplant?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8">
              Lassen Sie uns gemeinsam Ihr Traumprojekt verwirklichen.
            </p>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => setFunnelOpen(true)}
              data-testid="button-projects-cta"
            >
              Jetzt Projekt anfragen
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      <InquiryFunnel isOpen={funnelOpen} onClose={() => setFunnelOpen(false)} />
    </Layout>
  );
}

import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ProjectGallery from "@/components/ProjectGallery";
import { ThreeDPhotoCarousel } from "@/components/ui/3d-carousel";
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

export default function Projects() {
  const [funnelOpen, setFunnelOpen] = useState(false);

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

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Alle Projekte
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Filtern Sie nach Kategorie oder durchstöbern Sie alle Projekte
            </p>
          </motion.div>

          <ProjectGallery projects={projects} />
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

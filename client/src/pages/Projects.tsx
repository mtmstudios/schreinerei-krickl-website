import { useState, useMemo } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Armchair, ChefHat, TreeDeciduous, DoorOpen, Sparkles } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { VerticalImageStack } from "@/components/ui/vertical-image-stack";
import InquiryFunnel from "@/components/InquiryFunnel";

import workshopImage from "@assets/generated_images/carpentry_workshop_hero_image.png";

import werkstattImage from "@assets/7_Tomay_1767712905635.jpg";
import epoxytischImage from "@assets/PHOTO-2023-09-01-14-_1767712905635.jpg";
import dachschraegeSchrank from "@assets/PHOTO-2023-09-01-14_1767712905635.jpg";
import schulmoebel from "@assets/PHOTO-2023-09-01-15_1767712905635.jpg";
import treppenverkleidung from "@assets/PHOTO-2023-09-01-16_1767712905635.jpg";
import einbauSchrankSchreibtisch from "@assets/PHOTO-2023-09-01-17_1767712905635.jpg";
import sideboardDachschraege from "@assets/PHOTO-2023-10-17-6_1767712905635.jpg";
import garderobenbank from "@assets/PHOTO-2023-10-17-9_1767712905635.jpg";
import couchtischEpoxy from "@assets/PHOTO-2023-10-17-21-_1767712905635.jpg";
import innentuerWeiss from "@assets/PHOTO-2023-10-17-23_1767712905635.jpg";
import einbauSchrankWeiss from "@assets/PHOTO-2023-10-17-24_1767712905635.jpg";
import medientisch from "@assets/PHOTO-2023-10-17-25_1767712905635.jpg";
import waschtischanlage from "@assets/PHOTO-2023-10-17-29_1767712905635.jpg";

const projects = [
  { id: "1", title: "Epoxidharz-Esstisch Eiche", category: "moebel", location: "Esslingen", image: epoxytischImage },
  { id: "2", title: "Einbauschrank unter Dachschräge", category: "moebel", location: "Stuttgart", image: dachschraegeSchrank },
  { id: "3", title: "Einbauschrank mit Schminktisch", category: "moebel", location: "Esslingen", image: einbauSchrankSchreibtisch },
  { id: "4", title: "Sideboard Dachschräge anthrazit", category: "moebel", location: "Plochingen", image: sideboardDachschraege },
  { id: "5", title: "Garderobenbank Eiche massiv", category: "moebel", location: "Esslingen", image: garderobenbank },
  { id: "6", title: "Couchtisch mit Epoxidharz", category: "moebel", location: "Stuttgart", image: couchtischEpoxy },
  { id: "7", title: "Weiße Innentür modern", category: "tueren", location: "Nürtingen", image: innentuerWeiss },
  { id: "8", title: "Einbauschrank raumhoch weiß", category: "moebel", location: "Kirchheim", image: einbauSchrankWeiss },
  { id: "9", title: "Medientisch Konferenzraum", category: "sonder", location: "Esslingen", image: medientisch },
  { id: "10", title: "Waschtischanlage Sanitär", category: "sonder", location: "Stuttgart", image: waschtischanlage },
  { id: "11", title: "Schuleinrichtung mit Tafel", category: "sonder", location: "Esslingen", image: schulmoebel },
  { id: "12", title: "Treppenverkleidung Neubau", category: "sonder", location: "Esslingen", image: treppenverkleidung },
  { id: "13", title: "Holzbearbeitung in der Werkstatt", category: "sonder", location: "Esslingen", image: werkstattImage },
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
      <SEO
        title="Referenzen - Schreinerei Esslingen | Projekte Möbelbau & Küchen"
        description="Referenzen der Schreinerei Krickl in Esslingen. Entdecken Sie unsere Projekte: Maßmöbel, Schreinerküchen, Türen & Innenausbau für Esslingen, Stuttgart und Umgebung."
        keywords="Schreiner Esslingen Referenzen, Möbelbau Esslingen Projekte, Schreinerei Esslingen Arbeiten, Schreinerküche Referenzen"
        canonical="https://schreinerei-krickl.de/referenzen"
      />
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0">
          <img src={workshopImage} alt="Schreinerei Krickl Referenzen - Projekte in Esslingen" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-white max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Schreiner-Projekte aus Esslingen</h1>
            <p className="text-xl text-white/90">
              Entdecken Sie Möbelbau, Küchen und Innenausbau von Ihrem Schreiner in Esslingen
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

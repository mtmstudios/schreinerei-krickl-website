import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Award, Users, Hammer } from "lucide-react";
import Layout from "@/components/layout/Layout";
import Timeline from "@/components/Timeline";
import BenefitCard from "@/components/BenefitCard";

import craftsmanImage from "@assets/generated_images/craftsman_hands_detail.png";
import workshopImage from "@assets/generated_images/carpentry_workshop_hero_image.png";

// todo: remove mock functionality
const timelineItems = [
  {
    year: "1962",
    title: "Gründung der Schreinerei",
    description: "Die Schreinerei wird in Esslingen als kleiner Familienbetrieb gegründet. Von Anfang an steht Qualität und Kundennähe im Mittelpunkt.",
  },
  {
    year: "1978",
    title: "Erste Erweiterung",
    description: "Die steigende Nachfrage ermöglicht den Umzug in größere Räumlichkeiten und die Anschaffung moderner Maschinen.",
  },
  {
    year: "1985",
    title: "Meistertitel",
    description: "Mit dem Erhalt des Meistertitels wird die Grundlage für die nächste Generation gelegt.",
  },
  {
    year: "1998",
    title: "Generationswechsel",
    description: "Der Betrieb wird an die nächste Generation übergeben und modern weiterentwickelt.",
  },
  {
    year: "2010",
    title: "Moderne Werkstatt",
    description: "Investition in CNC-Technik und moderne Fertigungsmethoden bei gleichzeitiger Bewahrung traditioneller Handwerkskunst.",
  },
  {
    year: "Heute",
    title: "Meisterbetrieb Krickl",
    description: "Über 60 Jahre Erfahrung, ein eingespieltes Team und der Anspruch, jeden Kunden individuell zu betreuen.",
  },
];

const values = [
  {
    icon: <Award className="w-7 h-7" />,
    title: "Qualität",
    description: "Nur die besten Materialien und höchste Verarbeitungsstandards",
  },
  {
    icon: <Hammer className="w-7 h-7" />,
    title: "Maßarbeit",
    description: "Jedes Stück wird individuell für Sie gefertigt",
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: "Kundennähe",
    description: "Persönliche Beratung und Betreuung von A bis Z",
  },
  {
    icon: <Heart className="w-7 h-7" />,
    title: "Leidenschaft",
    description: "Wir lieben unser Handwerk und das sieht man",
  },
];

export default function About() {
  return (
    <Layout>
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0">
          <img src={workshopImage} alt="Werkstatt" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Über uns</h1>
            <p className="text-xl text-white/90">
              Ein Familienbetrieb mit Tradition, Leidenschaft und Blick in die Zukunft
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                Ihr Meisterbetrieb in Esslingen
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                Seit über 60 Jahren steht die Schreinerei Krickl für erstklassiges Handwerk und individuelle Lösungen. Als Meisterbetrieb verbinden wir traditionelles Know-how mit modernsten Techniken.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Unser eingespieltes Team aus erfahrenen Schreinern und motivierten Nachwuchstalenten arbeitet mit Leidenschaft an jedem Projekt – egal ob kleiner Reparaturauftrag oder umfangreicher Innenausbau.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Wir legen großen Wert auf persönliche Beratung und individuelle Lösungen. Bei uns sind Sie keine Nummer, sondern ein geschätzter Partner.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-xl overflow-hidden"
            >
              <img src={craftsmanImage} alt="Handwerksarbeit" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Unsere Werte</h2>
            <p className="text-lg text-muted-foreground">
              Das macht uns aus und treibt uns an
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <BenefitCard {...value} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="zeitstrahl" className="py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Unsere Geschichte
            </h2>
            <p className="text-lg text-muted-foreground">
              Über 60 Jahre Handwerkstradition in Esslingen
            </p>
          </motion.div>

          <Timeline items={timelineItems} />
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                Werden Sie Teil unseres Teams
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-6">
                Wir sind immer auf der Suche nach engagierten Handwerkern und Nachwuchstalenten, die unsere Leidenschaft für echtes Handwerk teilen.
              </p>
              <Button size="lg" variant="secondary" asChild data-testid="button-about-career">
                <Link href="/karriere">
                  Karriere bei Krickl
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="text-center md:text-right">
              <div className="inline-block bg-primary-foreground/10 rounded-xl p-6">
                <p className="text-4xl font-bold mb-2">60+</p>
                <p className="text-primary-foreground/80">Jahre Erfahrung</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

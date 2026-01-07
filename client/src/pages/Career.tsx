import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Users,
  Wrench,
  TrendingUp,
  BookOpen,
  Briefcase,
  Shield,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import BenefitCard from "@/components/BenefitCard";
import JobCard from "@/components/JobCard";
import ApplicationFunnel from "@/components/ApplicationFunnel";
import InstagramFeed from "@/components/InstagramFeed";

import workshopImage from "@assets/generated_images/carpentry_workshop_hero_image.png";

const benefits = [
  {
    icon: <Users className="w-7 h-7" />,
    title: "Familiärer Betrieb",
    description: "Kollegiales Miteinander in einem eingespielten Team",
  },
  {
    icon: <Wrench className="w-7 h-7" />,
    title: "Moderne Ausstattung",
    description: "Zeitgemäße Werkstatt mit neuesten Maschinen",
  },
  {
    icon: <TrendingUp className="w-7 h-7" />,
    title: "Faire Vergütung",
    description: "Überdurchschnittliche Bezahlung und Zusatzleistungen",
  },
  {
    icon: <BookOpen className="w-7 h-7" />,
    title: "Weiterbildung",
    description: "Förderung Ihrer persönlichen Entwicklung",
  },
  {
    icon: <Briefcase className="w-7 h-7" />,
    title: "Abwechslung",
    description: "Spannende und vielfältige Projekte",
  },
  {
    icon: <Shield className="w-7 h-7" />,
    title: "Sicherheit",
    description: "Unbefristete Verträge und langfristige Perspektive",
  },
];

// todo: remove mock functionality
const jobs = [
  {
    title: "Schreiner / Tischler (m/w/d)",
    type: "Vollzeit",
    location: "Esslingen",
    description:
      "Wir suchen einen erfahrenen Schreiner für die Fertigung und Montage hochwertiger Möbel und Einbauten.",
    requirements: [
      "Abgeschlossene Ausbildung als Schreiner/Tischler",
      "Mehrjährige Berufserfahrung wünschenswert",
      "Führerschein Klasse B",
      "Teamfähigkeit und Zuverlässigkeit",
    ],
  },
  {
    title: "Schreinergeselle (m/w/d)",
    type: "Vollzeit",
    location: "Esslingen",
    description:
      "Als Schreinergeselle unterstützen Sie unser Team bei der Umsetzung vielfältiger Projekte.",
    requirements: [
      "Abgeschlossene Ausbildung als Schreiner/Tischler",
      "Berufseinsteiger willkommen",
      "Handwerkliches Geschick",
      "Motivation und Lernbereitschaft",
    ],
  },
  {
    title: "Auszubildender Schreiner (m/w/d)",
    type: "Ausbildung",
    location: "Esslingen",
    description:
      "Starte deine Karriere im Handwerk! Wir bilden dich zum Schreiner aus und begleiten dich auf deinem Weg.",
    requirements: [
      "Guter Haupt- oder Realschulabschluss",
      "Interesse am Handwerk und an Holz",
      "Räumliches Vorstellungsvermögen",
      "Teamgeist und Zuverlässigkeit",
    ],
  },
];

export default function Career() {
  const [applicationOpen, setApplicationOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<string | undefined>();

  const handleApply = (positionTitle: string) => {
    const positionMap: Record<string, string> = {
      "Schreiner / Tischler (m/w/d)": "schreiner",
      "Schreinergeselle (m/w/d)": "geselle",
      "Auszubildender Schreiner (m/w/d)": "azubi",
    };
    setSelectedPosition(positionMap[positionTitle]);
    setApplicationOpen(true);
  };

  return (
    <Layout>
      <SEO
        title="Karriere - Schreiner Jobs Esslingen | Schreinerei Krickl"
        description="Schreiner Jobs in Esslingen: Arbeiten Sie bei der Schreinerei Krickl. Offene Stellen für Schreiner, Gesellen & Azubis. Familiärer Meisterbetrieb mit Zukunft."
        keywords="Schreiner Jobs Esslingen, Tischler Stellenangebote Esslingen, Ausbildung Schreiner Esslingen, Schreinerei Jobs Stuttgart"
        canonical="https://schreinerei-krickl.de/karriere"
      />
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0">
          <img src={workshopImage} alt="Karriere bei Schreinerei Krickl in Esslingen - Jobs im Schreinerhandwerk" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-white max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Deine Karriere bei Krickl</h1>
            <p className="text-xl text-white/90 mb-8">
              Werden Sie Teil unseres Teams – echtes Handwerk, familiäre Atmosphäre, langfristige Perspektive
            </p>
            <Button
              size="lg"
              onClick={() => {
                setSelectedPosition(undefined);
                setApplicationOpen(true);
              }}
              data-testid="button-career-hero-cta"
            >
              In 60 Sekunden bewerben
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
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
              Warum Schreinerei Krickl?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Bei uns erwartet Sie mehr als nur ein Job – werden Sie Teil einer Handwerksfamilie.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <BenefitCard {...benefit} />
              </motion.div>
            ))}
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
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Offene Stellen
            </h2>
            <p className="text-lg text-muted-foreground">
              Finden Sie Ihren Platz in unserem Team
            </p>
          </motion.div>

          <div className="space-y-6">
            {jobs.map((job, index) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <JobCard {...job} onApply={() => handleApply(job.title)} />
              </motion.div>
            ))}
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
              <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center">
                Lernen Sie uns kennen
              </h2>
              <p className="text-lg text-muted-foreground mb-6 text-center">
                Über 60 Jahre Handwerkstradition, ein familiäres Team und spannende Projekte – das ist die Schreinerei Krickl. Erfahren Sie mehr über unsere Geschichte und Werte.
              </p>
              <Button asChild data-testid="button-career-about">
                <Link href="/ueber-uns">
                  Mehr über uns erfahren
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-primary/10 rounded-xl p-8 text-center"
            >
              <p className="text-6xl font-bold text-primary mb-4">60+</p>
              <p className="text-xl font-semibold mb-2">Jahre Erfahrung</p>
              <p className="text-muted-foreground">
                Tradition und Innovation vereint
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <InstagramFeed 
        variant="compact"
        title="Blicken Sie hinter die Kulissen"
        subtitle="Auf Instagram zeigen wir Ihnen unseren Arbeitsalltag, das Team und aktuelle Projekte"
      />

      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Bereit für den nächsten Schritt?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Bewerben Sie sich jetzt – schnell, einfach und ohne Lebenslauf. Wir melden uns bei Ihnen!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => {
                  setSelectedPosition(undefined);
                  setApplicationOpen(true);
                }}
                data-testid="button-career-bottom-cta"
              >
                In 60 Sekunden bewerben
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              </div>
          </motion.div>
        </div>
      </section>

      <ApplicationFunnel
        isOpen={applicationOpen}
        onClose={() => setApplicationOpen(false)}
        preselectedPosition={selectedPosition}
      />
    </Layout>
  );
}

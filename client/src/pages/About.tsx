import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Award, Users, Hammer } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import Timeline from "@/components/Timeline";
import BenefitCard from "@/components/BenefitCard";

import craftsmanImage from "@assets/generated_images/craftsman_hands_detail.png";
import workshopImage from "@assets/generated_images/carpentry_workshop_hero_image.png";
import yannikImage from "@assets/115_Tomay_1767713116539.jpg";

// todo: remove mock functionality
const timelineItems = [
  {
    year: "2010",
    title: "Ausbildungsbeginn",
    description: "Yannik Tomay beginnt seine Ausbildung bei der Schreinerei Krickl und beendet diese erfolgreich im Jahr 2013.",
  },
  {
    year: "2018",
    title: "Meisterprüfung",
    description: "Nach Jahren als Schreinergeselle entschließt sich Yannik Tomay, den Meister in Teilzeit zu absolvieren.",
  },
  {
    year: "2020",
    title: "Meister & Betriebsleiter",
    description: "Mit erfolgreich abgelegter Meisterprüfung übernimmt Yannik Tomay die Rolle als Meister und Betriebsleiter.",
  },
  {
    year: "2022",
    title: "Neue Ära beginnt",
    description: "Yannik Tomay übernimmt die Schreinerei Krickl. Ein Lebenstraum geht in Erfüllung – eine eigene Schreinerei zu führen.",
  },
  {
    year: "2026",
    title: "Umzug in größere Schreinerei",
    description: "Umzug in eine größere Schreinerei innerhalb Esslingens – mehr Platz für noch größere Projekte und weiteres Wachstum.",
  },
  {
    year: "Heute",
    title: "Meisterbetrieb seit über 60 Jahren",
    description: "Ein eingespieltes Team aus 9 Mitarbeitern und der Anspruch, jeden Kunden individuell zu betreuen. Spezialisiert auf Innenausbau, Möbelbau und Baubereich.",
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
      <SEO
        title="Über uns - Schreinerei Krickl | Schreiner Esslingen seit 60 Jahren"
        description="Lernen Sie die Schreinerei Krickl in Esslingen kennen. Meisterbetrieb seit über 60 Jahren. Team aus 9 Fachleuten für Möbelbau, Küchen & Innenausbau. Yannik Tomay - Schreinermeister & Inhaber."
        keywords="Schreiner Esslingen, Schreinerei Esslingen, Meisterbetrieb Esslingen, Tischlerei Esslingen, Yannik Tomay"
        canonical="https://schreinerei-krickl.de/ueber-uns"
      />
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0">
          <img src={workshopImage} alt="Schreinerei Krickl Werkstatt in Esslingen" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-white max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Über uns</h1>
            <p className="text-xl text-white/90">
              Meisterbetrieb mit Tradition, Leidenschaft und Blick in die Zukunft seit über 60 Jahren
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
              <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center">
                Meisterbetrieb seit über 60 Jahren
              </h2>
              <p className="text-lg text-muted-foreground mb-4 text-center">
                Wir sind eine kleine Schreinerei in Esslingen, welche auf den Innenausbau spezialisiert ist. Wir decken sowohl den Möbelbaubereich, wie auch den Baubereich komplett ab.
              </p>
              <p className="text-lg text-muted-foreground mb-4 text-center">
                Durch unsere top-ausgebildeten Mitarbeiter haben wir für jeden Bereich den richtigen Spezialisten für Sie. Um noch besser für unsere Projekte agieren zu können, sind wir stetig auf der Suche nach neuen Mitarbeitern.
              </p>
              <p className="text-lg text-muted-foreground mb-8 text-center">
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

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-3xl md:text-4xl font-semibold mb-2 text-center">
                Yannik Tomay
              </h2>
              <p className="text-lg text-primary font-medium mb-6 text-center">
                Schreinermeister & Inhaber
              </p>
              <blockquote className="text-lg italic text-muted-foreground border-l-4 border-primary pl-4 mb-6">
                „Wähle einen Beruf den du liebst, und du brauchst keinen Tag in deinem Leben mehr zu arbeiten"
                <footer className="text-sm mt-2 not-italic">– Konfuzius</footer>
              </blockquote>
              <p className="text-muted-foreground mb-4 text-center">
                Ein Zitat welches die Einstellung meines Tuns nicht besser beschreiben könnte. 2022 begann ein neues Kapitel, als ich die Schreinerei übernommen habe. Damit geht für mich ein kleiner Lebenstraum in Erfüllung.
              </p>
              <p className="text-muted-foreground mb-4 text-center">
                Neben der Selbständigkeit bin ich noch ehrenamtlich im Vorstand der Schreiner Innung, dem Gesellenprüfungsausschuss sowie im Vorstand der Handwerksjunioren Esslingen-Nürtingen tätig.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 flex justify-center"
            >
              <div className="relative">
                <img 
                  src={yannikImage} 
                  alt="Yannik Tomay - Schreinermeister und Inhaber der Schreinerei Krickl" 
                  className="rounded-lg shadow-lg max-w-sm w-full object-cover"
                />
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold mb-2">Unser Team</h3>
              <p className="text-4xl md:text-5xl font-bold text-primary">9 Fachleute</p>
              <p className="text-muted-foreground mt-2">für Ihr Projekt</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <motion.div 
                className="bg-card rounded-xl p-6 hover-elevate col-span-2 md:col-span-1"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col items-center text-center">
                  <span className="text-4xl font-bold text-primary mb-2">1</span>
                  <span className="font-medium">Schreinermeister</span>
                  <span className="text-sm text-muted-foreground">(Inhaber)</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-card rounded-xl p-6 hover-elevate"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col items-center text-center">
                  <span className="text-4xl font-bold text-primary mb-2">1</span>
                  <span className="font-medium">Vorarbeiter</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-card rounded-xl p-6 hover-elevate"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col items-center text-center">
                  <span className="text-4xl font-bold text-primary mb-2">3</span>
                  <span className="font-medium">Schreinergesellen</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-card rounded-xl p-6 hover-elevate"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col items-center text-center">
                  <span className="text-4xl font-bold text-primary mb-2">2</span>
                  <span className="font-medium">Auszubildende</span>
                  <span className="text-sm text-muted-foreground">3. Lehrjahr</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-card rounded-xl p-6 hover-elevate"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col items-center text-center">
                  <span className="text-4xl font-bold text-primary mb-2">1</span>
                  <span className="font-medium">Auszubildender</span>
                  <span className="text-sm text-muted-foreground">1. Lehrjahr</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-card rounded-xl p-6 hover-elevate"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col items-center text-center">
                  <span className="text-4xl font-bold text-primary mb-2">1</span>
                  <span className="font-medium">Bürokraft</span>
                </div>
              </motion.div>
            </div>
            
            <p className="mt-8 text-primary font-medium text-center text-lg">
              Wir stellen weiter motivierte Kolleginnen und Kollegen (m/w/d) ein!
            </p>
          </motion.div>
        </div>
      </section>

      <section id="zeitstrahl" className="py-16 md:py-24 lg:py-32 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Meine Laufbahn
            </h2>
            <p className="text-lg text-muted-foreground">
              Der Weg zum eigenen Meisterbetrieb
            </p>
          </motion.div>

          <Timeline items={timelineItems} />
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
          <div className="relative">
            <img 
              src={workshopImage} 
              alt="Arbeiten in der Schreinerei Krickl" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 lg:bg-gradient-to-l lg:from-transparent lg:to-black/40" />
            
            <div className="relative h-full flex flex-col justify-center p-8 md:p-12 lg:hidden">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Werden Sie Teil unseres Teams
                </h2>
                <p className="text-lg text-white/90 mb-6">
                  Wir sind immer auf der Suche nach engagierten Handwerkern und Nachwuchstalenten.
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <motion.div 
                    className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-2xl font-bold text-white">60+</p>
                    <p className="text-sm text-white/80">Jahre Erfahrung</p>
                  </motion.div>
                  <motion.div 
                    className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-2xl font-bold text-white">9</p>
                    <p className="text-sm text-white/80">Fachleute</p>
                  </motion.div>
                </div>
                <Button size="lg" variant="secondary" asChild data-testid="button-about-career-mobile">
                  <Link href="/karriere">
                    Karriere bei Krickl
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
          
          <div className="hidden lg:flex bg-primary text-primary-foreground">
            <div className="flex flex-col justify-center p-12 xl:p-16">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl xl:text-4xl font-bold mb-4">
                  Werden Sie Teil unseres Teams
                </h2>
                <p className="text-lg text-primary-foreground/90 mb-8">
                  Wir sind immer auf der Suche nach engagierten Handwerkern und Nachwuchstalenten, die unsere Leidenschaft für echtes Handwerk teilen.
                </p>
                
                <div className="flex gap-6 mb-8">
                  <motion.div 
                    className="bg-primary-foreground/10 rounded-xl p-5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-4xl font-bold mb-1">60+</p>
                    <p className="text-sm text-primary-foreground/80">Jahre Erfahrung</p>
                  </motion.div>
                  <motion.div 
                    className="bg-primary-foreground/10 rounded-xl p-5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-4xl font-bold mb-1">9</p>
                    <p className="text-sm text-primary-foreground/80">Fachleute</p>
                  </motion.div>
                  <motion.div 
                    className="bg-primary-foreground/10 rounded-xl p-5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <p className="text-4xl font-bold mb-1">3</p>
                    <p className="text-sm text-primary-foreground/80">Azubis</p>
                  </motion.div>
                </div>
                
                <Button size="lg" variant="secondary" asChild data-testid="button-about-career">
                  <Link href="/karriere">
                    Karriere bei Krickl
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

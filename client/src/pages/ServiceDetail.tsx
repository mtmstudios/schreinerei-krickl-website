import { useState } from "react";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ProcessStep from "@/components/ProcessStep";
import FAQItem from "@/components/FAQItem";
import InquiryFunnel from "@/components/InquiryFunnel";

import furnitureImage from "@assets/generated_images/custom_furniture_piece.png";
import kitchenImage from "@assets/generated_images/custom_kitchen_cabinets.png";
import terraceImage from "@assets/generated_images/wooden_terrace_deck.png";
import doorImage from "@assets/generated_images/custom_wooden_door.png";
import flooringImage from "@assets/generated_images/hardwood_flooring_detail.png";
import wardrobeImage from "@assets/generated_images/custom_wardrobe_system.png";

// todo: remove mock functionality
const serviceData: Record<string, {
  title: string;
  headline: string;
  description: string;
  image: string;
  benefits: string[];
  details: string[];
  process: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
}> = {
  moebelbau: {
    title: "Möbelbau",
    headline: "Möbelbau nach Maß in Esslingen",
    description: "Individuelle Möbel, perfekt auf Ihre Räume und Wünsche abgestimmt. Von Regalen über Schränke bis hin zu kompletten Einrichtungen – wir fertigen alles aus einer Hand.",
    image: furnitureImage,
    benefits: [
      "Perfekte Raumnutzung durch maßgenaue Fertigung",
      "Individuelle Gestaltung nach Ihren Wünschen",
      "Hochwertige Materialien und Verarbeitung",
      "Persönliche Beratung und Planung",
      "Montage vor Ort durch unsere Fachleute",
    ],
    details: [
      "Wohnzimmermöbel und Regalsysteme",
      "Begehbare Kleiderschränke",
      "Büroeinrichtungen und Arbeitszimmer",
      "Einbauschränke nach Maß",
      "TV-Möbel und Medienwände",
    ],
    process: [
      { title: "Beratung", description: "Persönliches Gespräch über Ihre Wünsche und Anforderungen" },
      { title: "Aufmaß", description: "Präzise Vermessung bei Ihnen vor Ort" },
      { title: "Planung", description: "Detaillierte Entwürfe und Materialauswahl" },
      { title: "Fertigung", description: "Handwerkliche Herstellung in unserer Werkstatt" },
      { title: "Montage", description: "Fachgerechte Installation in Ihren Räumen" },
    ],
    faqs: [
      { question: "Wie lange dauert die Fertigung eines Möbelstücks?", answer: "Die Fertigungszeit hängt vom Umfang ab. Kleine Projekte können in 2-3 Wochen realisiert werden, größere Einrichtungen benötigen 4-8 Wochen." },
      { question: "Kann ich das Holz selbst auswählen?", answer: "Selbstverständlich! Wir beraten Sie gerne bei der Materialauswahl und zeigen Ihnen verschiedene Holzarten und Oberflächen." },
      { question: "Bieten Sie auch Reparaturen an?", answer: "Ja, wir reparieren und restaurieren auch bestehende Möbelstücke. Sprechen Sie uns einfach an." },
    ],
  },
  schreinerkuechen: {
    title: "Schreinerküchen",
    headline: "Individuelle Schreinerküchen statt Standardlösungen",
    description: "Maßgefertigte Küchen für höchste Ansprüche. Perfekte Passform, einzigartige Gestaltung und Qualität, die Sie täglich begeistert.",
    image: kitchenImage,
    benefits: [
      "Optimale Nutzung jedes Zentimeters",
      "Hochwertige Massivholzfronten",
      "Individuelle Funktionslösungen",
      "Ergonomische Arbeitsabläufe",
      "Langlebigkeit durch beste Qualität",
    ],
    details: [
      "Komplette Küchenplanung und -umsetzung",
      "Massivholz- und Furnierküchen",
      "Integrierte Elektrogeräte",
      "Arbeitsplatten aus Naturstein oder Holz",
      "Beleuchtungskonzepte",
    ],
    process: [
      { title: "Beratung", description: "Analyse Ihrer Koch- und Lebensgewohnheiten" },
      { title: "Aufmaß", description: "Exakte Vermessung inkl. aller Anschlüsse" },
      { title: "Planung", description: "3D-Visualisierung Ihrer Traumküche" },
      { title: "Fertigung", description: "Präzise Herstellung in Handarbeit" },
      { title: "Montage", description: "Komplettinstallation mit allen Anschlüssen" },
    ],
    faqs: [
      { question: "Was kostet eine Schreinerküche?", answer: "Die Kosten variieren je nach Größe und Ausstattung. Wir erstellen Ihnen gerne ein unverbindliches Angebot." },
      { question: "Wie lange dauert die Planung bis zur Montage?", answer: "Von der ersten Beratung bis zur fertigen Küche vergehen typischerweise 8-12 Wochen." },
      { question: "Arbeiten Sie mit bestimmten Geräteherstellern zusammen?", answer: "Wir können Geräte aller namhaften Hersteller integrieren und beraten Sie gerne." },
    ],
  },
  "terrassen-bodenbelaege": {
    title: "Terrassen & Bodenbeläge",
    headline: "Hochwertige Holzböden und Terrassen",
    description: "Von Parkett über Dielen bis hin zu Terrassendecks – wir verlegen Holzböden fachgerecht und sorgen für langlebige Schönheit.",
    image: terraceImage,
    benefits: [
      "Natürliche Wohnatmosphäre",
      "Langlebige Materialien",
      "Fachgerechte Verlegung",
      "Wärme und Behaglichkeit",
      "Wertsteigerung Ihrer Immobilie",
    ],
    details: [
      "Parkettböden in allen Varianten",
      "Massivholzdielen",
      "Holzterrassen und -decks",
      "Terrassenunterkonstruktionen",
      "Pflegeberatung und Wartung",
    ],
    process: [
      { title: "Beratung", description: "Analyse der Raumsituation und Nutzung" },
      { title: "Aufmaß", description: "Genaue Flächenberechnung" },
      { title: "Materialauswahl", description: "Holzart und Verlegemuster wählen" },
      { title: "Vorbereitung", description: "Untergrund prüfen und vorbereiten" },
      { title: "Verlegung", description: "Fachgerechte Installation" },
    ],
    faqs: [
      { question: "Welches Holz eignet sich für Terrassen?", answer: "Für Terrassen empfehlen wir harte, witterungsbeständige Hölzer wie Bangkirai, Thermoesche oder Lärche." },
      { question: "Wie pflege ich meinen Holzboden richtig?", answer: "Wir beraten Sie ausführlich zur richtigen Pflege und empfehlen passende Pflegeprodukte." },
      { question: "Können Sie auch Fußbodenheizung verlegen?", answer: "Wir verlegen gerne Parkett auf Fußbodenheizung und beachten dabei alle technischen Anforderungen." },
    ],
  },
  tueren: {
    title: "Türen",
    headline: "Individuelle Türen für Ihr Zuhause",
    description: "Handgefertigte Innentüren und Haustüren, die perfekt zu Ihrem Stil passen. Vom klassischen Design bis zum modernen Minimalismus.",
    image: doorImage,
    benefits: [
      "Perfekte Passform auch bei ungewöhnlichen Maßen",
      "Individuelle Gestaltung",
      "Hochwertige Beschläge",
      "Optimale Schalldämmung",
      "Langlebige Qualität",
    ],
    details: [
      "Innentüren in allen Varianten",
      "Haustüren und Eingangsbereiche",
      "Schiebetüren und Falttüren",
      "Glastüren mit Holzrahmen",
      "Altbausanierung und Austausch",
    ],
    process: [
      { title: "Beratung", description: "Stilberatung und Funktionsanforderungen" },
      { title: "Aufmaß", description: "Präzise Vermessung der Türöffnungen" },
      { title: "Design", description: "Gestaltung nach Ihren Wünschen" },
      { title: "Fertigung", description: "Handwerkliche Herstellung" },
      { title: "Einbau", description: "Fachgerechte Montage" },
    ],
    faqs: [
      { question: "Können alte Türrahmen wiederverwendet werden?", answer: "In vielen Fällen ja. Wir prüfen den Zustand und beraten Sie individuell." },
      { question: "Welche Holzarten gibt es für Türen?", answer: "Wir arbeiten mit Eiche, Buche, Nussbaum und vielen weiteren Hölzern." },
      { question: "Wie lange dauert ein Türenaustausch?", answer: "Der Austausch einer Tür dauert typischerweise einen halben Tag." },
    ],
  },
  "reparaturen-instandsetzungen": {
    title: "Reparaturen & Instandsetzungen",
    headline: "Professionelle Reparaturen und Restaurierung",
    description: "Wir reparieren, restaurieren und setzen instand – schnell, zuverlässig und mit handwerklicher Präzision.",
    image: flooringImage,
    benefits: [
      "Schnelle Hilfe bei Schäden",
      "Fachgerechte Reparatur",
      "Werterhaltung Ihrer Möbel",
      "Umweltschonend durch Reparatur statt Neukauf",
      "Faire Preise",
    ],
    details: [
      "Möbelreparaturen aller Art",
      "Oberflächenaufarbeitung",
      "Scharniere und Beschläge",
      "Strukturelle Reparaturen",
      "Antike Möbelrestaurierung",
    ],
    process: [
      { title: "Anfrage", description: "Schildern Sie uns den Schaden" },
      { title: "Begutachtung", description: "Kostenloser Kostenvoranschlag" },
      { title: "Reparatur", description: "Fachgerechte Ausführung" },
      { title: "Qualitätskontrolle", description: "Prüfung der Arbeit" },
      { title: "Übergabe", description: "Zufriedenheitsgarantie" },
    ],
    faqs: [
      { question: "Kommen Sie auch zu mir nach Hause?", answer: "Ja, für größere Möbel oder Einbauten kommen wir gerne zu Ihnen." },
      { question: "Lohnt sich eine Reparatur noch?", answer: "Das prüfen wir ehrlich für Sie und beraten Sie transparent." },
      { question: "Wie schnell können Sie helfen?", answer: "Bei dringenden Fällen sind wir oft innerhalb weniger Tage zur Stelle." },
    ],
  },
  sonderanfertigungen: {
    title: "Sonderanfertigungen",
    headline: "Außergewöhnliche Projekte und Sonderlösungen",
    description: "Kreative Ideen verdienen kreative Umsetzung. Wir realisieren auch ungewöhnliche Projekte mit handwerklicher Perfektion.",
    image: wardrobeImage,
    benefits: [
      "Umsetzung individueller Visionen",
      "Kreative Lösungsansätze",
      "Erfahrung mit komplexen Projekten",
      "Enge Zusammenarbeit mit Ihnen",
      "Einzigartige Ergebnisse",
    ],
    details: [
      "Architektonische Elemente",
      "Kunstobjekte und Installationen",
      "Spezielle Einbauten",
      "Prototypen und Einzelstücke",
      "Event- und Messeausstattung",
    ],
    process: [
      { title: "Ideenfindung", description: "Gemeinsame Entwicklung Ihres Projekts" },
      { title: "Konzeption", description: "Technische Ausarbeitung" },
      { title: "Prototyp", description: "Bei Bedarf Musterfertigung" },
      { title: "Fertigung", description: "Präzise Umsetzung" },
      { title: "Installation", description: "Montage und Feinschliff" },
    ],
    faqs: [
      { question: "Wie außergewöhnlich darf ein Projekt sein?", answer: "Wir lieben Herausforderungen! Sprechen Sie uns mit jeder Idee an." },
      { question: "Können Sie nach Architektenzeichnungen arbeiten?", answer: "Selbstverständlich. Wir arbeiten eng mit Architekten und Planern zusammen." },
      { question: "Was kosten Sonderanfertigungen?", answer: "Jedes Projekt ist einzigartig. Wir erstellen Ihnen ein individuelles Angebot." },
    ],
  },
};

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [funnelOpen, setFunnelOpen] = useState(false);

  const service = serviceData[slug || ""];

  if (!service) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-semibold mb-4">Leistung nicht gefunden</h1>
          <Button asChild>
            <Link href="/leistungen">Zurück zur Übersicht</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0">
          <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.headline}</h1>
            <p className="text-xl text-white/90 mb-8">{service.description}</p>
            <Button
              size="lg"
              onClick={() => setFunnelOpen(true)}
              data-testid="button-service-cta"
            >
              Unverbindlich anfragen
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-semibold mb-6">Ihre Vorteile</h2>
              <ul className="space-y-3">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-semibold mb-6">Was wir bieten</h2>
              <ul className="space-y-3">
                {service.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-accent-foreground" />
                    </div>
                    <span className="text-muted-foreground">{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-semibold mb-12 text-center"
          >
            So arbeiten wir
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {service.process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProcessStep number={index + 1} {...step} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-semibold mb-8 text-center"
          >
            Häufige Fragen
          </motion.h2>
          <div className="space-y-4">
            {service.faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <FAQItem {...faq} />
              </motion.div>
            ))}
          </div>
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
              Bereit für Ihr Projekt?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8">
              Kontaktieren Sie uns für eine unverbindliche Beratung.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => setFunnelOpen(true)}
                data-testid="button-service-bottom-cta"
              >
                Projekt starten
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-primary-foreground/30 text-primary-foreground bg-transparent"
              >
                <Link href="/referenzen">Referenzen ansehen</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <InquiryFunnel isOpen={funnelOpen} onClose={() => setFunnelOpen(false)} />
    </Layout>
  );
}

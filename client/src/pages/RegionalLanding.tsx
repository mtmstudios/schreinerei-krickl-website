import { useState } from "react";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Check, MapPin, Clock, Phone, Hammer, Wrench, ChefHat, DoorOpen, TreeDeciduous, Sparkles } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import FAQItem from "@/components/FAQItem";
import InquiryFunnel from "@/components/InquiryFunnel";

import workshopImage from "@assets/generated_images/carpentry_workshop_hero_image.png";
import furnitureImage from "@assets/generated_images/custom_furniture_piece.png";
import kitchenImage from "@assets/generated_images/custom_kitchen_cabinets.png";

interface CityData {
  name: string;
  region: string;
  distance: string;
  description: string;
  localContent: string;
  stadtteile: string[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  faqs: { question: string; answer: string }[];
}

const cityData: Record<string, CityData> = {
  stuttgart: {
    name: "Stuttgart",
    region: "Großraum Stuttgart",
    distance: "15 km",
    description: "Ihr Schreiner für Stuttgart — Meisterbetrieb aus Esslingen mit über 60 Jahren Erfahrung. Möbelbau nach Maß, Küchen, Türen, Reparaturen und mehr. Persönliche Beratung, faire Preise, Termin innerhalb weniger Tage.",
    localContent: "Als Schreinerei aus Esslingen sind wir in nur 15 Minuten in Stuttgart. Wir betreuen seit Jahrzehnten Kunden in ganz Stuttgart — vom Möbelbau in Stuttgart-West bis zur Küchenrenovierung in Bad Cannstatt. Unser Vorteil: Meisterbetrieb-Qualität ohne Großstadt-Preise.",
    stadtteile: ["Stuttgart-Mitte", "Stuttgart-West", "Stuttgart-Süd", "Bad Cannstatt", "Degerloch", "Vaihingen", "Möhringen", "Feuerbach", "Zuffenhausen", "Botnang"],
    seoTitle: "Schreiner Stuttgart | Schreinerei Krickl — Möbelbau & Reparaturen",
    seoDescription: "Schreiner in Stuttgart gesucht? Schreinerei Krickl — Meisterbetrieb seit 1960. Möbelbau nach Maß, Küchen, Türen, Reparaturen. Faire Preise, schnelle Termine. Jetzt anfragen!",
    seoKeywords: "Schreiner Stuttgart, Schreinerei Stuttgart, Tischler Stuttgart, Möbelbau Stuttgart, Möbel nach Maß Stuttgart, Schreinerküche Stuttgart, Tür Reparatur Stuttgart",
    faqs: [
      { question: "Arbeiten Sie auch in Stuttgart?", answer: "Ja! Unser Betrieb in Esslingen ist nur 15 km von Stuttgart entfernt. Wir sind regelmäßig in allen Stuttgarter Stadtteilen im Einsatz — von der Innenstadt bis nach Vaihingen." },
      { question: "Entstehen Anfahrtskosten nach Stuttgart?", answer: "Nein, für den Großraum Stuttgart berechnen wir keine separaten Anfahrtskosten. Die Anfahrt ist in unseren Leistungspreisen enthalten." },
      { question: "Wie schnell können Sie in Stuttgart einen Termin machen?", answer: "Für Beratungstermine in Stuttgart können wir in der Regel innerhalb von 3–5 Werktagen einen Termin anbieten. Bei Reparaturen oft sogar innerhalb von 48 Stunden." },
      { question: "Was kostet ein Schreiner in Stuttgart?", answer: "Unsere Preise sind fair und transparent: Reparaturen ab 150 €, Einbauschränke ab 800 €, Küchenfronten erneuern ab 1.500 €. Für jedes Projekt erhalten Sie vorab einen kostenlosen Kostenvoranschlag." },
    ],
  },
  esslingen: {
    name: "Esslingen am Neckar",
    region: "Esslingen und Umgebung",
    distance: "Standort",
    description: "Schreinerei Krickl — Ihr Schreiner direkt in Esslingen am Neckar. Meisterbetrieb seit 1960. Möbelbau, Küchen, Türen, Böden und Reparaturen. Werkstatt in der Röntgenstraße — persönlich, zuverlässig, fair.",
    localContent: "Unsere Werkstatt in der Röntgenstraße 5-7 ist das Herzstück unserer Arbeit. Als Esslinger Traditionsschreiner kennen wir die Altstadt-Häuser mit ihren besonderen Maßen genauso wie die Neubauten im Neckarpark. Kurze Wege, persönlicher Kontakt, Handwerk aus der Nachbarschaft.",
    stadtteile: ["Esslingen Innenstadt", "Mettingen", "Berkheim", "Zell", "Oberesslingen", "Sulzgries", "Hegensberg", "Kennenburg", "Weil", "Sirnau"],
    seoTitle: "Schreiner Esslingen | Schreinerei Krickl — seit 1960 in Esslingen",
    seoDescription: "Ihre Schreinerei in Esslingen am Neckar. Meisterbetrieb Krickl seit 1960. Möbelbau nach Maß, Küchen, Türen, Reparaturen. Werkstatt in der Röntgenstraße. Jetzt anfragen!",
    seoKeywords: "Schreiner Esslingen, Schreinerei Esslingen, Tischler Esslingen, Möbel nach Maß Esslingen, Möbelbau Esslingen, Küche Schreiner Esslingen, Tür Reparatur Esslingen",
    faqs: [
      { question: "Wo genau ist Ihre Werkstatt in Esslingen?", answer: "Unsere Werkstatt befindet sich in der Röntgenstraße 5-7, 73730 Esslingen am Neckar. Sie können uns Mo–Fr von 7–17 Uhr besuchen. Samstags nach Vereinbarung." },
      { question: "Kann ich mir die Werkstatt ansehen?", answer: "Selbstverständlich! Wir freuen uns über Ihren Besuch. Vereinbaren Sie einfach einen Termin, dann zeigen wir Ihnen unsere Werkstatt und aktuelle Projekte." },
      { question: "Seit wann gibt es die Schreinerei Krickl?", answer: "Seit 1960 — das sind über 60 Jahre Schreiner-Handwerk in Esslingen. Wir sind ein echter Familienbetrieb mit Meisterqualität." },
      { question: "Arbeiten Sie auch in den Esslinger Stadtteilen?", answer: "Ja, wir sind in ganz Esslingen im Einsatz — von der Altstadt bis Berkheim, von Mettingen bis Oberesslingen. Die kurzen Wege sind unser Vorteil." },
    ],
  },
  ostfildern: {
    name: "Ostfildern",
    region: "Ostfildern und Filder",
    distance: "8 km",
    description: "Schreiner für Ostfildern — Meisterbetrieb Krickl aus dem nahen Esslingen. Möbelbau nach Maß, Küchen, Einbauschränke, Reparaturen. Nur 8 km entfernt, schnelle Termine, faire Preise.",
    localContent: "Ostfildern ist praktisch unsere Nachbarschaft. Ob Scharnhausen, Ruit, Kemnat oder Nellingen — wir sind in wenigen Minuten bei Ihnen. Viele unserer Stammkunden kommen aus Ostfildern und schätzen die Kombination aus Nähe und Meisterqualität.",
    stadtteile: ["Nellingen", "Ruit", "Scharnhausen", "Kemnat", "Parksiedlung"],
    seoTitle: "Schreiner Ostfildern | Schreinerei Krickl — 8 km entfernt",
    seoDescription: "Schreiner für Ostfildern. Schreinerei Krickl aus Esslingen — nur 8 km entfernt. Möbelbau, Küchen, Einbauschränke, Reparaturen. Meisterbetrieb seit 1960. Jetzt anfragen!",
    seoKeywords: "Schreiner Ostfildern, Schreinerei Ostfildern, Tischler Ostfildern, Möbel nach Maß Ostfildern, Einbauschrank Ostfildern",
    faqs: [
      { question: "Wie weit ist es von Esslingen nach Ostfildern?", answer: "Nur 8 km — wir sind in 10–15 Minuten bei Ihnen in Ostfildern. Ob Nellingen, Ruit oder Scharnhausen, die Anfahrt ist unkompliziert." },
      { question: "Berechnen Sie Anfahrtskosten nach Ostfildern?", answer: "Nein, Ostfildern liegt in unserem Kerngebiet. Es fallen keine separaten Anfahrtskosten an." },
      { question: "Welche Leistungen bieten Sie in Ostfildern an?", answer: "Das volle Programm: Möbelbau nach Maß, Einbauschränke, Küchen, Türen, Böden, Reparaturen und Sonderanfertigungen." },
    ],
  },
  plochingen: {
    name: "Plochingen",
    region: "Plochingen und Neckartal",
    distance: "10 km",
    description: "Schreiner für Plochingen — Schreinerei Krickl aus Esslingen. Nur 10 km entfernt. Möbelbau, Küchen, Reparaturen, Einbauschränke. Meisterqualität seit 1960.",
    localContent: "Plochingen am Zusammenfluss von Neckar und Fils ist fester Bestandteil unseres Einzugsgebiets. Wir kennen die Altstadt-Fachwerkhäuser genauso wie die Neubaugebiete und liefern für jedes Zuhause passende Lösungen.",
    stadtteile: ["Plochingen Altstadt", "Stumpenhof", "Am Bruckenbach"],
    seoTitle: "Schreiner Plochingen | Schreinerei Krickl — Meisterbetrieb",
    seoDescription: "Schreiner für Plochingen gesucht? Schreinerei Krickl aus Esslingen — 10 km entfernt. Möbelbau, Küchen, Einbauschränke, Reparaturen. Seit 1960. Jetzt anfragen!",
    seoKeywords: "Schreiner Plochingen, Schreinerei Plochingen, Tischler Plochingen, Möbel nach Maß Plochingen",
    faqs: [
      { question: "Arbeiten Sie auch in Plochingen?", answer: "Ja, Plochingen gehört zu unserem Kerngebiet. Wir sind in nur 10 Minuten bei Ihnen — ohne Anfahrtskosten." },
      { question: "Können Sie auch in Altbau-Fachwerkhäusern arbeiten?", answer: "Absolut. Als Meisterbetrieb mit über 60 Jahren Erfahrung kennen wir die Besonderheiten von Altbauten — schiefe Wände, ungewöhnliche Maße, empfindliche Substanz." },
      { question: "Bieten Sie kostenlose Beratung in Plochingen an?", answer: "Ja, die Erstberatung und das Aufmaß vor Ort sind bei uns immer kostenlos — auch in Plochingen." },
    ],
  },
  filderstadt: {
    name: "Filderstadt",
    region: "Filderstadt und Filder",
    distance: "12 km",
    description: "Schreiner für Filderstadt — Schreinerei Krickl, Meisterbetrieb aus Esslingen. Möbelbau, Küchen, Einbauschränke, Türen und Reparaturen. 12 km entfernt, schnelle Termine.",
    localContent: "Filderstadt mit seinen Stadtteilen Bernhausen, Bonlanden, Plattenhardt, Sielmingen und Harthausen ist gut an Esslingen angebunden. Wir betreuen regelmäßig Kunden auf den Fildern und kennen die Wohnsituation vor Ort — von Reihenhäusern bis zu freistehenden Einfamilienhäusern.",
    stadtteile: ["Bernhausen", "Bonlanden", "Plattenhardt", "Sielmingen", "Harthausen"],
    seoTitle: "Schreiner Filderstadt | Schreinerei Krickl — Meisterbetrieb",
    seoDescription: "Schreiner für Filderstadt. Schreinerei Krickl aus Esslingen — 12 km entfernt. Möbelbau nach Maß, Küchen, Einbauschränke & Reparaturen. Meisterbetrieb seit 1960.",
    seoKeywords: "Schreiner Filderstadt, Schreinerei Filderstadt, Tischler Filderstadt, Möbel nach Maß Filderstadt, Einbauschrank Filderstadt",
    faqs: [
      { question: "Wie weit ist es von Esslingen nach Filderstadt?", answer: "Etwa 12 km — wir sind in 15–20 Minuten bei Ihnen in Filderstadt. Ob Bernhausen, Bonlanden oder Plattenhardt." },
      { question: "Fallen Anfahrtskosten für Filderstadt an?", answer: "Nein, Filderstadt liegt in unserem regulären Einzugsgebiet. Die Anfahrt ist in unseren Preisen enthalten." },
      { question: "Welche Projekte machen Sie am häufigsten in Filderstadt?", answer: "Einbauschränke, Küchenerneuerungen und Möbel nach Maß — typisch für die Einfamilienhäuser und Reihenhäuser auf den Fildern." },
    ],
  },
  nuertingen: {
    name: "Nürtingen",
    region: "Nürtingen und Neckartal",
    distance: "18 km",
    description: "Schreiner für Nürtingen — Meisterbetrieb Krickl aus Esslingen. Möbelbau, Küchen, Reparaturen, Einbauschränke. Faire Preise, persönliche Beratung, Handwerk seit 1960.",
    localContent: "Nürtingen ist über die B313 schnell erreichbar. Wir betreuen Kunden in Nürtingen und den umliegenden Gemeinden wie Wendlingen, Oberboihingen und Neckartailfingen. Ob Altstadt-Wohnung oder Neubau — wir liefern maßgenaue Schreinerarbeit.",
    stadtteile: ["Nürtingen Innenstadt", "Oberensingen", "Hardt", "Raidwangen", "Zizishausen", "Reudern"],
    seoTitle: "Schreiner Nürtingen | Schreinerei Krickl — Meisterbetrieb",
    seoDescription: "Schreiner für Nürtingen. Schreinerei Krickl aus Esslingen — Meisterbetrieb seit 1960. Möbelbau, Küchen, Einbauschränke & Reparaturen. Jetzt kostenlos anfragen!",
    seoKeywords: "Schreiner Nürtingen, Schreinerei Nürtingen, Tischler Nürtingen, Möbel nach Maß Nürtingen, Einbauschrank Nürtingen",
    faqs: [
      { question: "Kommen Sie auch nach Nürtingen?", answer: "Ja, Nürtingen gehört zu unserem Einzugsgebiet. Wir sind in etwa 20 Minuten bei Ihnen — über die B313 gut erreichbar." },
      { question: "Fallen extra Anfahrtskosten nach Nürtingen an?", answer: "Für Nürtingen berechnen wir eine kleine Anfahrtspauschale bei Reparatur-Aufträgen. Für größere Projekte (Küchen, Einbauschränke, Möbelbau) ist die Anfahrt kostenlos." },
      { question: "Welche Orte um Nürtingen bedienen Sie noch?", answer: "Wendlingen, Oberboihingen, Neckartailfingen, Wolfschlugen und Unterensingen — das gesamte mittlere Neckartal." },
    ],
  },
};

const services = [
  { name: "Möbelbau nach Maß", href: "/leistungen/moebelbau", icon: Hammer, price: "ab 500 €" },
  { name: "Schreinerküchen", href: "/leistungen/schreinerkuechen", icon: ChefHat, price: "individuell" },
  { name: "Türen & Reparatur", href: "/leistungen/tuer-reparatur", icon: DoorOpen, price: "ab 150 €" },
  { name: "Einbauschrank nach Maß", href: "/leistungen/einbauschrank-nach-mass", icon: Sparkles, price: "ab 800 €" },
  { name: "Holzboden aufarbeiten", href: "/leistungen/holzboden-aufarbeiten", icon: TreeDeciduous, price: "ab 30 €/m²" },
  { name: "Möbelreparatur", href: "/leistungen/moebel-reparatur", icon: Wrench, price: "ab 200 €" },
  { name: "Küche erneuern", href: "/leistungen/kueche-erneuern", icon: ChefHat, price: "ab 1.500 €" },
];

export default function RegionalLanding() {
  const { stadt } = useParams<{ stadt: string }>();
  const [funnelOpen, setFunnelOpen] = useState(false);

  const city = cityData[stadt || ""];

  if (!city) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-semibold mb-4">Stadt nicht gefunden</h1>
          <Button asChild>
            <Link href="/">Zurück zur Startseite</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title={city.seoTitle}
        description={city.seoDescription}
        keywords={city.seoKeywords}
        canonical={`https://schreinerei-krickl.de/schreiner-${stadt}`}
        faqs={city.faqs}
        breadcrumbs={[
          { name: "Startseite", url: "https://schreinerei-krickl.de/" },
          { name: `Schreiner ${city.name}`, url: `https://schreinerei-krickl.de/schreiner-${stadt}` },
        ]}
      />

      {/* Hero */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0">
          <img src={workshopImage} alt={`Schreiner ${city.name} — Schreinerei Krickl`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-white max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">{city.distance === "Standort" ? "Unser Standort" : `Nur ${city.distance} entfernt`}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Ihr Schreiner in {city.name}
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              {city.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => setFunnelOpen(true)}>
                Kostenlos anfragen
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white bg-transparent" asChild>
                <a href="tel:+497113222360">
                  <Phone className="w-5 h-5 mr-2" />
                  07 11 / 32 23 60
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: "Jahre Erfahrung", value: "60+" },
              { label: "Meisterbetrieb", value: "✓" },
              { label: "Kostenlose Beratung", value: "✓" },
              { label: "Faire Festpreise", value: "✓" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-2xl font-bold text-primary">{item.value}</span>
                <span className="text-sm text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lokaler Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                Schreinerei Krickl — Ihr Schreiner für {city.name}
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {city.localContent}
              </p>
              <div className="flex flex-wrap gap-2">
                {city.stadtteile.map((stadtteil) => (
                  <span
                    key={stadtteil}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                  >
                    <MapPin className="w-3 h-3" />
                    {stadtteil}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src={furnitureImage}
                alt={`Möbelbau nach Maß für ${city.name}`}
                className="rounded-2xl shadow-lg w-full"
              />
              <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground rounded-xl px-6 py-4 shadow-lg">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">Termin in 48h</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leistungen mit Preisen */}
      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Unsere Leistungen in {city.name}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Vom schnellen Reparaturauftrag bis zum maßgefertigten Möbelstück — alles aus einer Hand
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link href={service.href}>
                    <Card className="h-full border-border/50 hover-elevate transition-all duration-300 cursor-pointer group">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                              <Icon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground mb-1">{service.name}</h3>
                              <p className="text-sm text-primary font-medium">{service.price}</p>
                            </div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-2" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Warum Schreinerei Krickl */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Warum Kunden aus {city.name} uns vertrauen
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Meisterbetrieb seit 1960", desc: "Über 60 Jahre Handwerkserfahrung. Drei Generationen Schreiner-Kompetenz für Ihr Projekt." },
              { title: "Faire, transparente Preise", desc: "Kostenloser Kostenvoranschlag vorab. Keine versteckten Kosten, keine bösen Überraschungen." },
              { title: "Schnelle Termine", desc: "Reparaturen innerhalb von 48 Stunden. Beratungstermine innerhalb weniger Tage." },
              { title: "Persönliche Betreuung", desc: "Vom ersten Gespräch bis zur Montage — ein Ansprechpartner, der Ihr Projekt kennt." },
              { title: "Alles aus einer Hand", desc: "Beratung, Planung, Fertigung und Montage. Keine Subunternehmer, keine Schnittstellen-Probleme." },
              { title: `Kurze Wege nach ${city.name}`, desc: `${city.distance === "Standort" ? "Direkt vor Ort in Esslingen" : `Nur ${city.distance} von ${city.name} entfernt`} — schnell da, wenn Sie uns brauchen.` },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-semibold mb-8 text-center"
          >
            Häufige Fragen — Schreiner {city.name}
          </motion.h2>
          <div className="space-y-4">
            {city.faqs.map((faq, index) => (
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

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
          <div className="relative">
            <img
              src={kitchenImage}
              alt={`Schreinerarbeit für ${city.name}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 lg:bg-gradient-to-l lg:from-transparent lg:to-black/40" />
          </div>

          <div className="bg-primary text-primary-foreground flex">
            <div className="flex flex-col justify-center p-8 md:p-12 xl:p-16">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl xl:text-4xl font-bold mb-4">
                  Projekt in {city.name}?
                </h2>
                <p className="text-lg text-primary-foreground/90 mb-8">
                  Kostenlose Beratung, fairer Kostenvoranschlag, Termin innerhalb weniger Tage. Wir freuen uns auf Ihr Projekt.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    variant="secondary"
                    onClick={() => setFunnelOpen(true)}
                  >
                    Jetzt anfragen
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary-foreground/30 text-primary-foreground bg-transparent"
                    asChild
                  >
                    <a href="tel:+497113222360">
                      <Phone className="w-5 h-5 mr-2" />
                      Anrufen
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <InquiryFunnel isOpen={funnelOpen} onClose={() => setFunnelOpen(false)} />
    </Layout>
  );
}

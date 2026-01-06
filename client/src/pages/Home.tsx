import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Armchair, ChefHat, TreeDeciduous, DoorOpen, Wrench, Sparkles } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { FocusCards } from "@/components/ui/focus-cards";
import { Testimonial } from "@/components/ui/clean-testimonial";
import InquiryFunnel from "@/components/InquiryFunnel";
import ServiceInquiryFunnel from "@/components/ServiceInquiryFunnel";
import InstagramFeed from "@/components/InstagramFeed";
import { RadialIntro } from "@/components/ui/radial-intro";

import heroImage from "@assets/130_Tomay_1767714126363.jpg";

import logoZellerFrey from "@assets/3_1767713572646.png";
import logoHolzMetzger from "@assets/6_1767713572646.png";
import logoGlasBach from "@assets/7_1767713572646.png";
import logoZEG from "@assets/8_1767713572646.png";
import logoWuerth from "@assets/9_1767713572646.png";
import logoDoktorSpanndecke from "@assets/DoktorSpanndecke_Log_1767713572646.jpg";
import logoScharpf from "@assets/1_1767713592806.png";

import epoxytischImage from "@assets/PHOTO-2023-09-01-14-_1767712905635.jpg";
import kuecheImage from "@assets/Braun_Wei_Minimalist_1767714551820.png";
import terrasseImage from "@assets/PHOTO-2023-09-01-14-_1767714551820.jpg";
import tuereImage from "@assets/16_1767714551820.png";
import werkstattImage from "@assets/7_Tomay_1767712905635.jpg";
import waschtischanlage from "@assets/PHOTO-2023-10-17-29_1767712905635.jpg";

const services = [
  {
    id: "moebel",
    title: "Möbelbau",
    description: "Individuelle Möbel nach Maß – perfekt auf Ihre Räume und Wünsche abgestimmt.",
    image: epoxytischImage,
    icon: <Armchair className="w-5 h-5" />,
  },
  {
    id: "kueche",
    title: "Schreinerküchen",
    description: "Maßgefertigte Küchen statt Standardlösungen – für höchste Ansprüche.",
    image: kuecheImage,
    icon: <ChefHat className="w-5 h-5" />,
  },
  {
    id: "terrasse",
    title: "Terrassen & Böden",
    description: "Hochwertige Holzböden und Terrassen für drinnen und draußen.",
    image: terrasseImage,
    icon: <TreeDeciduous className="w-5 h-5" />,
  },
  {
    id: "tueren",
    title: "Türen",
    description: "Individuelle Innentüren und Haustüren – handwerklich gefertigt.",
    image: tuereImage,
    icon: <DoorOpen className="w-5 h-5" />,
  },
  {
    id: "reparatur",
    title: "Reparaturen",
    description: "Professionelle Reparaturen und Instandsetzungen für alle Holzarbeiten.",
    image: werkstattImage,
    icon: <Wrench className="w-5 h-5" />,
  },
  {
    id: "sonder",
    title: "Sonderanfertigungen",
    description: "Außergewöhnliche Projekte und individuelle Sonderlösungen.",
    image: waschtischanlage,
    icon: <Sparkles className="w-5 h-5" />,
  },
];

const partnerLogos = [
  { id: 1, name: "Zeller & Frey", src: logoZellerFrey, url: "https://zeller-frey.de" },
  { id: 2, name: "Holz Metzger", src: logoHolzMetzger, url: "https://www.holz-metzger.de" },
  { id: 3, name: "Glas-Bach", src: logoGlasBach, url: "https://www.glas-bach.de" },
  { id: 4, name: "ZEG", src: logoZEG, url: "https://www.zeg-holz.de" },
  { id: 5, name: "Würth", src: logoWuerth, url: "https://eshop.wuerth.de/de/DE/EUR/" },
  { id: 6, name: "Doktor Spanndecke", src: logoDoktorSpanndecke, url: "https://www.doktorspanndecke.de" },
  { id: 7, name: "E. Scharpf", src: logoScharpf, url: "https://www.holzbau-scharpf.de" },
];

// todo: remove mock functionality
const oldTestimonials = [
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

type ServiceType = "moebel" | "kueche" | "terrasse" | "tueren" | "reparatur" | "sonder";

export default function Home() {
  const [funnelOpen, setFunnelOpen] = useState(false);
  const [serviceFunnelOpen, setServiceFunnelOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleServiceClick = (serviceId: string) => {
    setSelectedService(serviceId as ServiceType);
    setServiceFunnelOpen(true);
  };

  return (
    <Layout>
      <SEO
        title="Schreinerei Esslingen | Schreiner Krickl - Möbelbau nach Maß"
        description="Schreinerei Krickl in Esslingen - Ihr Meisterbetrieb für Möbelbau, Schreinerküchen, Türen & Innenausbau. Individuelle Maßanfertigungen seit über 60 Jahren. Jetzt anfragen!"
        keywords="Schreiner Esslingen, Schreinerei Esslingen, Möbelbau Esslingen, Schreinerküche Esslingen, Türen Schreiner Esslingen, Möbel nach Maß Esslingen"
        canonical="https://schreinerei-krickl.de/"
      />
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Schreinerei Krickl Esslingen - Werkstatt für Möbelbau nach Maß" className="w-full h-full object-cover" />
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
              Ihre Schreinerei in Esslingen – Möbelbau nach Maß
            </h1>
            <p className="text-xl text-white/90 mb-4">
              Schreiner Krickl – Meisterbetrieb seit über 60 Jahren
            </p>
            <p className="text-lg text-white/80 mb-8">
              Möbelbau, Schreinerküchen, Türen & Innenausbau in Esslingen und Umgebung. Persönliche Beratung, höchste Qualität.
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
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Schreiner-Leistungen in Esslingen</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Möbelbau nach Maß, Schreinerküchen, Türen & mehr – von der ersten Idee bis zur fertigen Montage in Esslingen und Umgebung.
            </p>
          </motion.div>

          <FocusCards 
            cards={services.map(s => ({ 
              title: s.title, 
              src: s.image, 
              id: s.id,
              description: s.description 
            }))} 
            onCardClick={handleServiceClick}
          />
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
                Ihre Schreinerei in Esslingen am Neckar
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Als Meisterbetrieb in Esslingen sind wir auf Innenausbau und Möbelbau nach Maß spezialisiert. Von der Schreinerküche bis zur Holzterrasse – wir decken alle Bereiche ab.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Mit 9 erfahrenen Fachleuten haben wir für jedes Projekt den richtigen Spezialisten. Als Schreiner in Esslingen ist jedes Projekt für uns eine Herzensangelegenheit.
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
                src={werkstattImage}
                alt="Handwerksarbeit in der Schreinerei Krickl"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 lg:py-32 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Was unsere Kunden sagen</h2>
            <p className="text-lg text-muted-foreground">
              Zufriedene Kunden sind unser größter Antrieb
            </p>
          </motion.div>

          <Testimonial />
        </div>
      </section>

      <InstagramFeed />

      <section className="py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Unsere Partner</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Gemeinsam mit starken Partnern setzen wir Ihre Projekte um
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <RadialIntro orbitItems={partnerLogos} stageSize={isMobile ? 280 : 500} imageSize={isMobile ? 60 : 100} />
          </motion.div>
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
      <ServiceInquiryFunnel 
        isOpen={serviceFunnelOpen} 
        onClose={() => setServiceFunnelOpen(false)} 
        serviceType={selectedService}
      />
    </Layout>
  );
}

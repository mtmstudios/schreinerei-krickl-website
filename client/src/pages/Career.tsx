import { useState, useEffect, useRef } from "react";
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
  MapPin,
  Clock,
  CheckCircle,
  MessageSquare,
  Handshake,
  ChevronDown,
  ChevronUp,
  DoorOpen,
  Hammer,
  Phone,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import BenefitCard from "@/components/BenefitCard";
import ApplicationFunnel from "@/components/ApplicationFunnel";
import InstagramFeed from "@/components/InstagramFeed";

import workshopImage from "@assets/generated_images/carpentry_workshop_hero_image.png";

const benefits = [
  {
    icon: <Wrench className="w-7 h-7" />,
    title: "Moderne Werkstatt",
    description: "Gutes Werkzeug & zeitgemäße Ausstattung",
  },
  {
    icon: <BookOpen className="w-7 h-7" />,
    title: "Klare Abläufe",
    description: "Saubere Planung & strukturierte Projekte",
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: "Familiär & direkt",
    description: "Kurze Wege, offene Kommunikation",
  },
  {
    icon: <Briefcase className="w-7 h-7" />,
    title: "Abwechslung",
    description: "Vielfältige und spannende Projekte",
  },
  {
    icon: <TrendingUp className="w-7 h-7" />,
    title: "Wertschätzung",
    description: "Zusammenhalt & echte Anerkennung",
  },
  {
    icon: <Shield className="w-7 h-7" />,
    title: "Weiterentwicklung",
    description: "Förderung & langfristige Perspektive",
  },
];

const jobs = [
  {
    id: "moebelschreiner",
    title: "Möbelschreiner (m/w/d)",
    type: "Vollzeit",
    location: "Esslingen",
    icon: Hammer,
    description:
      "Du fertigst hochwertige Möbel und Einbauten in unserer Werkstatt und beim Kunden vor Ort. Präzision und Qualität stehen bei uns an erster Stelle.",
    tasks: [
      "Fertigung individueller Möbel nach Kundenwunsch",
      "Montage von Einbauschränken und Küchen",
      "Oberflächenbehandlung und Endmontage",
      "Aufmaß beim Kunden vor Ort",
    ],
    requirements: [
      "Abgeschlossene Ausbildung als Schreiner/Tischler",
      "Erfahrung in der Möbelfertigung wünschenswert",
      "Sauberes und präzises Arbeiten",
      "Führerschein Klasse B von Vorteil",
    ],
    focus: ["Werkstatt", "Montage", "beides"],
  },
  {
    id: "tuerenprofi",
    title: "Türenprofi / Monteur (m/w/d)",
    type: "Vollzeit",
    location: "Esslingen",
    icon: DoorOpen,
    description:
      "Du bist Spezialist für Türen aller Art – vom Einbau über Zargenarbeiten bis zur Reparatur. Beim Kunden vor Ort sorgst du für perfekte Ergebnisse.",
    tasks: [
      "Montage von Innentüren und Zargen",
      "Einbau von Haustüren und Sicherheitstüren",
      "Reparatur und Nachjustierung",
      "Beratung beim Kunden vor Ort",
    ],
    requirements: [
      "Erfahrung im Türeneinbau oder als Schreiner/Tischler",
      "Sorgfältige und kundenorientierte Arbeitsweise",
      "Eigenständiges Arbeiten",
      "Führerschein Klasse B",
    ],
    focus: ["Innentüren", "Zargen", "Reparatur", "alles"],
  },
];

const processSteps = [
  {
    number: "1",
    title: "60-Sekunden Bewerbung",
    description: "Schnell und einfach – ohne Lebenslauf möglich",
    icon: MessageSquare,
  },
  {
    number: "2",
    title: "Rückmeldung in 48h",
    description: "Wir melden uns zeitnah bei dir",
    icon: Phone,
  },
  {
    number: "3",
    title: "Kennenlernen",
    description: "Kurzes Gespräch + optional Probearbeiten",
    icon: Handshake,
  },
];

const faqs = [
  {
    question: "Brauche ich einen Lebenslauf?",
    answer: "Nein, der Lebenslauf ist optional. Deine Kurzbewerbung reicht uns völlig aus, um dich kennenzulernen.",
  },
  {
    question: "Wie schnell meldet ihr euch?",
    answer: "Innerhalb von 48 Stunden bekommst du eine Rückmeldung von uns – versprochen!",
  },
  {
    question: "Wo ist die Werkstatt?",
    answer: "Unsere Werkstatt befindet sich in der Röntgenstraße 5–7, 73730 Esslingen am Neckar.",
  },
  {
    question: "Ist die Stelle Vollzeit?",
    answer: "Ja, wir suchen Verstärkung in Vollzeit. Start ist ab sofort möglich.",
  },
  {
    question: "Kann ich auch als Quereinsteiger anfangen?",
    answer: "Ja, wenn du handwerkliches Geschick und Motivation mitbringst, freuen wir uns auf deine Bewerbung!",
  },
];

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;
  
  return (
    <div className="border-b border-border last:border-0">
      <button
        id={buttonId}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left hover-elevate rounded-lg px-2 -mx-2"
        aria-expanded={isOpen}
        aria-controls={panelId}
        data-testid={`button-faq-${question.slice(0, 20).replace(/\s/g, "-").toLowerCase()}`}
      >
        <span className="font-medium pr-4">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" aria-hidden="true" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" aria-hidden="true" />
        )}
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
      >
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="pb-4 text-muted-foreground"
          >
            {answer}
          </motion.div>
        )}
      </div>
    </div>
  );
}

function JobCard({
  job,
  onApply,
}: {
  job: typeof jobs[0];
  onApply: () => void;
}) {
  const Icon = job.icon;
  
  return (
    <div className="bg-card border border-card-border rounded-xl p-6 md:p-8 h-full flex flex-col">
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">{job.title}</h3>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-1">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {job.type}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {job.location}
            </span>
          </div>
        </div>
      </div>

      <p className="text-muted-foreground mb-5">{job.description}</p>

      <div className="mb-4">
        <p className="text-sm font-semibold mb-2">Deine Aufgaben:</p>
        <ul className="text-sm text-muted-foreground space-y-1">
          {job.tasks.map((task, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {task}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <p className="text-sm font-semibold mb-2">Das bringst du mit:</p>
        <ul className="text-sm text-muted-foreground space-y-1">
          {job.requirements.map((req, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              {req}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto">
        <Button onClick={onApply} className="w-full" data-testid={`button-apply-${job.id}`}>
          Für diese Rolle bewerben
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

export default function Career() {
  const [applicationOpen, setApplicationOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<string | undefined>();
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const funnelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleApply = (positionId?: string) => {
    setSelectedPosition(positionId);
    setApplicationOpen(true);
  };

  const scrollToFunnel = () => {
    setSelectedPosition(undefined);
    setApplicationOpen(true);
  };

  const scrollToJobs = () => {
    const jobsSection = document.getElementById("jobs-section");
    if (jobsSection) {
      jobsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Layout>
      <SEO
        title="Karriere - Möbelschreiner & Türenprofi (m/w/d) gesucht | Schreinerei Krickl Esslingen"
        description="Jobs in Esslingen: Möbelschreiner & Türenprofi gesucht. Familiäres Team, moderne Werkstatt, Rückmeldung in 48h. Jetzt in 60 Sekunden bewerben!"
        keywords="Schreiner Jobs Esslingen, Möbelschreiner Stellenangebote, Türenmonteur Jobs Stuttgart, Schreinerei Jobs"
        canonical="https://schreinerei-krickl.de/karriere"
      />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0">
          <img 
            src={workshopImage} 
            alt="Karriere bei Schreinerei Krickl - Möbelschreiner und Türenprofi Jobs in Esslingen" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-white max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Möbelschreiner & Türenprofi (m/w/d) gesucht – Vollzeit in Esslingen
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6">
              Familiäres Team, spannende Projekte, sicherer Job – und Rückmeldung in 48 Stunden.
            </p>
            
            {/* Trust Row */}
            <div className="flex flex-wrap gap-3 md:gap-6 mb-8">
              <div className="flex items-center gap-2 text-sm md:text-base text-white/90">
                <Users className="w-5 h-5 text-primary" />
                <span>Familiäres Team (&lt;10)</span>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base text-white/90">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Werkstatt in Esslingen</span>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base text-white/90">
                <Clock className="w-5 h-5 text-primary" />
                <span>Ab sofort · Vollzeit</span>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base text-white/90">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Rückmeldung in 48h</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={scrollToFunnel}
                data-testid="button-career-hero-cta"
              >
                Jetzt in 60 Sekunden bewerben
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToJobs}
                className="bg-white/10 border-white/30 text-white"
                data-testid="button-career-view-jobs"
              >
                Jobs ansehen
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Warum Krickl */}
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
              Bei uns bekommst du mehr als nur einen Job – du wirst Teil einer echten Handwerksfamilie.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
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

      {/* Inline CTA */}
      <section className="py-8 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <Button size="lg" onClick={scrollToFunnel} data-testid="button-career-inline-cta-1">
            Jetzt bewerben – in nur 60 Sekunden
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Job Cards */}
      <section id="jobs-section" className="py-16 md:py-24 bg-card">
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
              Finde deinen Platz in unserem Team
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <JobCard job={job} onApply={() => handleApply(job.id)} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* So läufts ab */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              So läuft's ab
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Einfacher geht's nicht – in drei Schritten zum neuen Job
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="text-center"
                >
                  <div className="relative inline-flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Inline CTA 2 */}
      <section className="py-8 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <Button size="lg" onClick={scrollToFunnel} data-testid="button-career-inline-cta-2">
            Jetzt bewerben
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Instagram / Blick in die Werkstatt */}
      <InstagramFeed 
        variant="compact"
        title="Ein Blick in die Werkstatt"
        subtitle="Auf Instagram zeigen wir dir unseren Arbeitsalltag, das Team und aktuelle Projekte"
      />

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Häufige Fragen
            </h2>
            <p className="text-lg text-muted-foreground">
              Antworten auf die wichtigsten Fragen zur Bewerbung
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-background rounded-xl p-6 md:p-8 border border-border"
          >
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section ref={funnelRef} className="relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
          <div className="relative">
            <img 
              src={workshopImage} 
              alt="Arbeiten in der Schreinerei Krickl" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 lg:bg-gradient-to-l lg:from-transparent lg:to-black/40" />
            
            <div className="relative h-full flex flex-col justify-center p-8 md:p-12 lg:hidden min-h-[400px]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Bereit für den nächsten Schritt?
                </h2>
                <p className="text-lg text-white/90 mb-6">
                  Bewirb dich jetzt – schnell und einfach!
                </p>
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={scrollToFunnel}
                  data-testid="button-career-bottom-cta-mobile"
                >
                  In 60 Sekunden bewerben
                  <ArrowRight className="w-5 h-5 ml-2" />
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
                  Bereit für den nächsten Schritt?
                </h2>
                <p className="text-lg text-primary-foreground/90 mb-8">
                  Bewirb dich jetzt – schnell, einfach und ohne Lebenslauf. Wir melden uns bei dir!
                </p>
                
                <div className="flex gap-6 mb-8">
                  <motion.div 
                    className="bg-primary-foreground/10 rounded-xl p-5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-4xl font-bold mb-1">60s</p>
                    <p className="text-sm text-primary-foreground/80">Bewerbung</p>
                  </motion.div>
                  <motion.div 
                    className="bg-primary-foreground/10 rounded-xl p-5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-4xl font-bold mb-1">0</p>
                    <p className="text-sm text-primary-foreground/80">Lebenslauf</p>
                  </motion.div>
                  <motion.div 
                    className="bg-primary-foreground/10 rounded-xl p-5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <p className="text-4xl font-bold mb-1">48h</p>
                    <p className="text-sm text-primary-foreground/80">Rückmeldung</p>
                  </motion.div>
                </div>
                
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={scrollToFunnel}
                  data-testid="button-career-bottom-cta"
                >
                  In 60 Sekunden bewerben
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      {showStickyCTA && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-background/95 backdrop-blur-sm border-t border-border lg:hidden"
        >
          <Button 
            size="lg" 
            className="w-full" 
            onClick={scrollToFunnel}
            data-testid="button-career-sticky-cta"
          >
            Jetzt bewerben
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      )}

      <ApplicationFunnel
        isOpen={applicationOpen}
        onClose={() => setApplicationOpen(false)}
        preselectedPosition={selectedPosition}
      />
    </Layout>
  );
}

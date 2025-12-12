import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ApplicationFunnel from "@/components/ApplicationFunnel";

import workshopImage from "@assets/generated_images/carpentry_workshop_hero_image.png";

export default function ApplicationPage() {
  const [applicationOpen, setApplicationOpen] = useState(true);

  useEffect(() => {
    setApplicationOpen(true);
  }, []);

  return (
    <Layout>
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0">
          <img src={workshopImage} alt="Werkstatt" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">In 60 Sekunden bewerben</h1>
            <p className="text-xl text-white/90">
              Schnell, einfach und ohne Lebenslauf – starten Sie jetzt Ihre Karriere bei uns
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-2xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-semibold mb-6">
              Bereit für den nächsten Schritt?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Klicken Sie auf den Button unten, um den Bewerbungsprozess zu starten. Es dauert nur 60 Sekunden!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                onClick={() => setApplicationOpen(true)}
                data-testid="button-start-application"
              >
                Bewerbung starten
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/karriere">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Zurück zu Karriere
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <ApplicationFunnel
        isOpen={applicationOpen}
        onClose={() => setApplicationOpen(false)}
      />
    </Layout>
  );
}

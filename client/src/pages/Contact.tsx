import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import ContactForm from "@/components/ContactForm";

import workshopImage from "@assets/generated_images/carpentry_workshop_hero_image.png";

export default function Contact() {
  return (
    <Layout>
      <SEO
        title="Kontakt - Schreinerei Krickl | Schreiner Esslingen anfragen"
        description="Kontaktieren Sie die Schreinerei Krickl in Esslingen. Kostenlose Beratung für Möbelbau, Küchen & Innenausbau. Tel: 0711/322360. Röntgenstraße 5-7, 73730 Esslingen am Neckar."
        keywords="Schreiner Esslingen Kontakt, Schreinerei Esslingen Anfrage, Tischler Esslingen, Möbelbau Esslingen anfragen"
        canonical="https://schreinerei-krickl.de/kontakt"
      />
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0">
          <img src={workshopImage} alt="Schreinerei Krickl in Esslingen kontaktieren" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-white max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Kontakt</h1>
            <p className="text-xl text-white/90">
              Ihr persönlicher Ansprechpartner für Möbelbau & Innenausbau in Esslingen und Umgebung
            </p>
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
              <h2 className="text-3xl font-semibold mb-6 text-center">Schreiben Sie uns</h2>
              <p className="text-lg text-muted-foreground mb-8 text-center">
                Haben Sie ein Projekt im Kopf oder Fragen zu unseren Leistungen? Füllen Sie einfach das Formular aus – wir melden uns schnellstmöglich bei Ihnen.
              </p>
              <ContactForm />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-semibold mb-6 text-center">Kontaktdaten</h2>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Telefon</h3>
                    <a
                      href="tel:+497113222360"
                      className="text-muted-foreground hover-elevate rounded-md p-1 -ml-1 inline-block"
                      data-testid="link-contact-phone"
                    >
                      07 11 / 32 23 60
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">E-Mail</h3>
                    <a
                      href="mailto:info@schreinerei-krickl.de"
                      className="text-muted-foreground hover-elevate rounded-md p-1 -ml-1 inline-block"
                      data-testid="link-contact-email"
                    >
                      info@schreinerei-krickl.de
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Adresse</h3>
                    <p className="text-muted-foreground">
                      Röntgenstraße 5-7<br />
                      73730 Esslingen am Neckar
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Öffnungszeiten</h3>
                    <p className="text-muted-foreground">
                      Mo – Fr: 7:00 – 17:00 Uhr<br />
                      Sa: nach Vereinbarung
                    </p>
                  </div>
                </div>
              </div>

              
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

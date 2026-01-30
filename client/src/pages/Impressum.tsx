import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";

export default function Impressum() {
  return (
    <Layout>
      <SEO
        title="Impressum - Schreinerei Krickl Esslingen"
        description="Impressum der Schreinerei Krickl in Esslingen am Neckar. Kontaktdaten, Handelsregistereintrag und rechtliche Informationen."
        canonical="https://schreinerei-krickl.de/impressum"
      />
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8">Impressum</h1>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold mt-8 mb-4">Angaben gemäß § 5 TMG</h2>
            <p className="text-muted-foreground mb-4">
              Schreinerei Krickl<br />
              Röntgenstraße 4-7<br />
              73728 Esslingen am Neckar
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Kontakt</h2>
            <p className="text-muted-foreground mb-4">
              Telefon: 07 11 / 32 23 60<br />
              Fax: 07 11 / 32 39 08<br />
              E-Mail: info@schreinerei-krickl.de
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Vertreten durch</h2>
            <p className="text-muted-foreground mb-4">
              Yannik Tomay<br />
              Schreinermeister & Inhaber
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Registereintrag</h2>
            <p className="text-muted-foreground mb-4">
              Handelsregister: HRA 12345<br />
              Registergericht: Amtsgericht Stuttgart<br />
              Umsatzsteuer-ID: DE123456789
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Berufsbezeichnung</h2>
            <p className="text-muted-foreground mb-4">
              Schreinermeister (Meistertitel verliehen in Deutschland)<br />
              Zuständige Kammer: Handwerkskammer Region Stuttgart
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Streitschlichtung</h2>
            <p className="text-muted-foreground mb-4">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
              https://ec.europa.eu/consumers/odr/
            </p>
            <p className="text-muted-foreground">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

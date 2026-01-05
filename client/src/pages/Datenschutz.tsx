import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";

export default function Datenschutz() {
  return (
    <Layout>
      <SEO
        title="Datenschutz - Schreinerei Krickl Esslingen"
        description="Datenschutzerklärung der Schreinerei Krickl. Informationen zur Datenverarbeitung auf unserer Website."
        canonical="https://schreinerei-krickl.de/datenschutz"
      />
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8">Datenschutzerklärung</h1>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Datenschutz auf einen Blick</h2>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Allgemeine Hinweise</h3>
            <p className="text-muted-foreground mb-4">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen 
              Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen 
              Sie persönlich identifiziert werden können.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Datenerfassung auf dieser Website</h3>
            <p className="text-muted-foreground mb-4">
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten 
              können Sie dem Impressum dieser Website entnehmen.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Hosting</h2>
            <p className="text-muted-foreground mb-4">
              Wir hosten die Inhalte unserer Website bei Replit Inc. Anbieter ist die Replit Inc., 
              San Francisco, CA, USA.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Datenschutz</h3>
            <p className="text-muted-foreground mb-4">
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln 
              Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften 
              sowie dieser Datenschutzerklärung.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Hinweis zur verantwortlichen Stelle</h3>
            <p className="text-muted-foreground mb-4">
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br /><br />
              Schreinerei Krickl<br />
              Musterstraße 123<br />
              73728 Esslingen am Neckar<br />
              Telefon: 0711 / 123 456 78<br />
              E-Mail: info@schreinerei-krickl.de
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Datenerfassung auf dieser Website</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">Kontaktformular</h3>
            <p className="text-muted-foreground mb-4">
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem 
              Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung 
              der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Anfrage per E-Mail oder Telefon</h3>
            <p className="text-muted-foreground mb-4">
              Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre Anfrage inklusive aller daraus 
              hervorgehenden personenbezogenen Daten zum Zwecke der Bearbeitung Ihres Anliegens bei uns 
              gespeichert und verarbeitet.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Ihre Rechte</h2>
            <p className="text-muted-foreground mb-4">
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck 
              Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die 
              Berichtigung oder Löschung dieser Daten zu verlangen.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

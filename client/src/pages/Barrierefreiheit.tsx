import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";

export default function Barrierefreiheit() {
  return (
    <Layout>
      <SEO
        title="Barrierefreiheitserklärung - Schreinerei Krickl Esslingen"
        description="Erklärung zur Barrierefreiheit der Website der Schreinerei Krickl in Esslingen nach BFSG und WCAG 2.1."
        canonical="https://schreinerei-krickl.de/barrierefreiheit"
      />
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Erklärung zur Barrierefreiheit
          </h1>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-muted-foreground mb-6">
              Die Schreinerei Krickl ist bemüht, ihre Website im Einklang mit dem 
              Barrierefreiheitsstärkungsgesetz (BFSG) und den Web Content Accessibility 
              Guidelines (WCAG) 2.1 Level AA barrierefrei zugänglich zu machen.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Stand der Vereinbarkeit</h2>
            <p className="text-muted-foreground mb-6">
              Diese Website ist weitgehend mit den WCAG 2.1 Level AA vereinbar. 
              Wir arbeiten kontinuierlich daran, die Barrierefreiheit zu verbessern.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Barrierefreie Funktionen</h2>
            <p className="text-muted-foreground mb-4">
              Unsere Website bietet folgende Funktionen zur Verbesserung der Zugänglichkeit:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
              <li>Anpassbare Schriftgröße (80% bis 150%)</li>
              <li>Hoher Kontrast-Modus für bessere Lesbarkeit</li>
              <li>Option zur Reduzierung von Animationen</li>
              <li>Verstärkte Fokus-Hervorhebung für Tastaturnavigation</li>
              <li>Skip-to-Content-Link für schnelle Navigation</li>
              <li>Semantische HTML-Struktur mit ARIA-Attributen</li>
              <li>Alternative Texte für alle informativen Bilder</li>
              <li>Vollständige Tastaturzugänglichkeit</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Barrierefreiheit-Einstellungen</h2>
            <p className="text-muted-foreground mb-6">
              Über den Button mit dem Barrierefreiheit-Symbol (unten links auf jeder Seite) 
              können Sie persönliche Einstellungen vornehmen, um die Darstellung an Ihre 
              Bedürfnisse anzupassen. Ihre Einstellungen werden lokal gespeichert.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Bekannte Einschränkungen</h2>
            <p className="text-muted-foreground mb-4">
              Trotz unserer Bemühungen können folgende Bereiche Einschränkungen aufweisen:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
              <li>Ältere PDF-Dokumente sind möglicherweise nicht vollständig barrierefrei</li>
              <li>Eingebettete Inhalte von Drittanbietern (z.B. Google Maps) unterliegen deren Barrierefreiheitsstandards</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Feedback und Kontakt</h2>
            <p className="text-muted-foreground mb-4">
              Sollten Sie auf Barrieren stoßen oder Verbesserungsvorschläge haben, 
              kontaktieren Sie uns bitte:
            </p>
            <address className="not-italic text-muted-foreground mb-6">
              <strong>Schreinerei Krickl</strong><br />
              Röntgenstraße 5-7<br />
              73730 Esslingen am Neckar<br />
              Telefon: <a href="tel:+4971132236­0" className="text-primary hover:underline">07 11 / 32 23 60</a><br />
              Fax: 07 11 / 32 39 08<br />
              E-Mail: <a href="mailto:info@schreinerei-krickl.de" className="text-primary hover:underline">info@schreinerei-krickl.de</a>
            </address>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Durchsetzungsverfahren</h2>
            <p className="text-muted-foreground mb-6">
              Sollten Sie nach Kontaktaufnahme mit uns keine zufriedenstellende Lösung 
              erhalten, können Sie sich an die zuständige Durchsetzungsstelle wenden:
            </p>
            <address className="not-italic text-muted-foreground mb-6">
              <strong>Landesbeauftragter für Menschen mit Behinderungen Baden-Württemberg</strong><br />
              Else-Josenhans-Straße 6<br />
              70173 Stuttgart<br />
              E-Mail: <a href="mailto:Poststelle@bfbmb.bwl.de" className="text-primary hover:underline">Poststelle@bfbmb.bwl.de</a>
            </address>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Methodik und Erstellungsdatum</h2>
            <p className="text-muted-foreground mb-6">
              Diese Erklärung wurde am 08. Januar 2026 erstellt. Die Bewertung basiert auf einer 
              Selbstbewertung gemäß den WCAG 2.1 Level AA Richtlinien. Die Website wird regelmäßig 
              auf Barrierefreiheit überprüft und kontinuierlich verbessert.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Verantwortlich für die Barrierefreiheit:</strong><br />
              Schreinerei Krickl, Röntgenstraße 5-7, 73730 Esslingen am Neckar
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

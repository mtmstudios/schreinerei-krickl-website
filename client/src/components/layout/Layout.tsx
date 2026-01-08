import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import AccessibilityPanel from "@/components/AccessibilityPanel";

interface LayoutProps {
  children: React.ReactNode;
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://schreinerei-krickl.de/#organization",
  name: "Schreinerei Krickl",
  alternateName: "Schreiner Krickl Esslingen",
  description: "Traditionelle Schreinerei und Meisterbetrieb in Esslingen am Neckar. Spezialisiert auf Möbelbau nach Maß, Küchen, Einbauschränke und Innenausbau seit über 60 Jahren.",
  url: "https://schreinerei-krickl.de",
  logo: "https://schreinerei-krickl.de/logo.png",
  image: "https://schreinerei-krickl.de/werkstatt.jpg",
  telephone: "+49-711-12345678",
  email: "info@schreinerei-krickl.de",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Musterstraße 123",
    addressLocality: "Esslingen am Neckar",
    addressRegion: "Baden-Württemberg",
    postalCode: "73728",
    addressCountry: "DE"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 48.7433,
    longitude: 9.3050
  },
  areaServed: [
    {
      "@type": "City",
      name: "Esslingen am Neckar"
    },
    {
      "@type": "City", 
      name: "Stuttgart"
    },
    {
      "@type": "City",
      name: "Fellbach"
    },
    {
      "@type": "City",
      name: "Ostfildern"
    }
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "17:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "12:00"
    }
  ],
  priceRange: "€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Cash, Bank Transfer",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Schreinerleistungen",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Möbelbau nach Maß",
          description: "Individuelle Möbel nach Maß für Ihr Zuhause in Esslingen und Umgebung"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Küchenbau",
          description: "Maßgeschneiderte Küchen vom Schreiner aus Esslingen"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Innenausbau",
          description: "Hochwertiger Innenausbau und Raumgestaltung"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Einbauschränke",
          description: "Maßgefertigte Einbauschränke für optimale Raumnutzung"
        }
      }
    ]
  },
  sameAs: [
    "https://www.instagram.com/schreinereikrickl"
  ]
};

export default function Layout({ children }: LayoutProps) {
  useEffect(() => {
    const existingScript = document.getElementById("local-business-schema");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "local-business-schema";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(localBusinessSchema);
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md"
        data-testid="link-skip-to-content"
      >
        Zum Hauptinhalt springen
      </a>
      <Header />
      <main id="main-content" className="flex-1 pt-20 md:pt-24" role="main" aria-label="Hauptinhalt">
        {children}
      </main>
      <Footer />
      <AccessibilityPanel />
    </div>
  );
}

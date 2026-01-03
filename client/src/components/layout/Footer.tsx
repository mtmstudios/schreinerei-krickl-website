import { Link } from "wouter";
import { Phone, Mail, MapPin, Heart } from "lucide-react";
import logoImage from "@assets/Logo_krickl_2022_neg.png_1765534047766.webp";
import mlmLogo from "@assets/LOGO-2-TARANSPERNT_1767459374539.png";

const services = [
  { name: "Möbelbau", href: "/leistungen/moebelbau" },
  { name: "Schreinerküchen", href: "/leistungen/schreinerkuechen" },
  { name: "Terrassen & Bodenbeläge", href: "/leistungen/terrassen-bodenbelaege" },
  { name: "Türen", href: "/leistungen/tueren" },
  { name: "Reparaturen", href: "/leistungen/reparaturen-instandsetzungen" },
  { name: "Sonderanfertigungen", href: "/leistungen/sonderanfertigungen" },
];

const links = [
  { name: "Über uns", href: "/ueber-uns" },
  { name: "Referenzen", href: "/referenzen" },
  { name: "Karriere", href: "/karriere" },
  { name: "Kontakt", href: "/kontakt" },
];

const legal = [
  { name: "Impressum", href: "/impressum" },
  { name: "Datenschutz", href: "/datenschutz" },
];

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <Link href="/" data-testid="link-footer-logo">
              <img src={logoImage} alt="Schreinerei Krickl" className="h-10 w-auto mb-4" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Meisterbetrieb seit über 60 Jahren. Individuelle Schreinerarbeiten aus Esslingen.
            </p>
            <div className="space-y-2">
              <a
                href="tel:+4971119999999"
                className="flex items-center gap-2 text-sm text-muted-foreground hover-elevate rounded-md p-1 -ml-1"
                data-testid="link-footer-phone"
              >
                <Phone className="w-4 h-4" />
                <span>0711 / 123 456 78</span>
              </a>
              <a
                href="mailto:info@schreinerei-krickl.de"
                className="flex items-center gap-2 text-sm text-muted-foreground hover-elevate rounded-md p-1 -ml-1"
                data-testid="link-footer-email"
              >
                <Mail className="w-4 h-4" />
                <span>info@schreinerei-krickl.de</span>
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground p-1 -ml-1">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Musterstraße 123, 73728 Esslingen</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Leistungen</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-sm text-muted-foreground hover-elevate rounded-md p-1 -ml-1 block"
                    data-testid={`link-footer-${service.href.split("/").pop()}`}
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Unternehmen</h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover-elevate rounded-md p-1 -ml-1 block"
                    data-testid={`link-footer-${link.href.replace("/", "")}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Rechtliches</h3>
            <ul className="space-y-2">
              {legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover-elevate rounded-md p-1 -ml-1 block"
                    data-testid={`link-footer-${link.href.replace("/", "")}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8">
          <p className="text-sm text-muted-foreground text-center flex items-center justify-center gap-1 flex-wrap">
            <span>© {new Date().getFullYear()} Schreinerei Krickl. Alle Rechte vorbehalten.</span>
            <span className="flex items-center gap-1">
              Mit <Heart className="w-4 h-4 text-red-500 fill-red-500" /> erstellt von <img src={mlmLogo} alt="MLM Studios" className="h-5 w-auto inline-block" />
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

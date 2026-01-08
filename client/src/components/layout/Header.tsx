import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "@assets/Logo_krickl_2022_positiv_1767883446646.png";

const services = [
  { name: "Möbelbau", href: "/leistungen/moebelbau" },
  { name: "Schreinerküchen", href: "/leistungen/schreinerkuechen" },
  { name: "Terrassen & Bodenbeläge", href: "/leistungen/terrassen-bodenbelaege" },
  { name: "Türen", href: "/leistungen/tueren" },
  { name: "Reparaturen & Instandsetzungen", href: "/leistungen/reparaturen-instandsetzungen" },
  { name: "Sonderanfertigungen", href: "/leistungen/sonderanfertigungen" },
];

const navigation = [
  { name: "Über uns", href: "/ueber-uns" },
  { name: "Leistungen", href: "/leistungen", hasDropdown: true },
  { name: "Referenzen", href: "/referenzen" },
  { name: "Karriere", href: "/karriere" },
  { name: "Kontakt", href: "/kontakt" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          <Link href="/" className="flex-shrink-0" data-testid="link-logo">
            <img src={logoImage} alt="Schreinerei Krickl" className="h-12 md:h-14 w-auto" />
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button
                      className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md transition-colors hover-elevate ${
                        location.startsWith("/leistungen")
                          ? "text-foreground bg-accent"
                          : "text-muted-foreground"
                      }`}
                      data-testid="button-services-dropdown"
                    >
                      {item.name}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {dropdownOpen && (
                      <div className="absolute top-full left-0 pt-2 w-64">
                        <div className="bg-popover border border-popover-border rounded-lg shadow-lg py-2">
                          {services.map((service) => (
                            <Link
                              key={service.href}
                              href={service.href}
                              className="block px-4 py-2 text-sm hover-elevate text-muted-foreground"
                              data-testid={`link-service-${service.href.split("/").pop()}`}
                            >
                              {service.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors hover-elevate ${
                      location === item.href
                        ? "text-foreground bg-accent"
                        : "text-muted-foreground"
                    }`}
                    data-testid={`link-nav-${item.href.replace("/", "") || "home"}`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:block">
            <Button asChild data-testid="button-header-cta">
              <Link href="/kontakt">Jetzt anfragen</Link>
            </Button>
          </div>

          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className={`block px-4 py-3 text-base font-medium rounded-md ${
                    location === item.href || (item.hasDropdown && location.startsWith("/leistungen"))
                      ? "text-foreground bg-accent"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`link-mobile-${item.href.replace("/", "") || "home"}`}
                >
                  {item.name}
                </Link>
                {item.hasDropdown && (
                  <div className="pl-4">
                    {services.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="block px-4 py-2 text-sm text-muted-foreground"
                        onClick={() => setMobileMenuOpen(false)}
                        data-testid={`link-mobile-service-${service.href.split("/").pop()}`}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4 px-4">
              <Button className="w-full" asChild data-testid="button-mobile-cta">
                <Link href="/kontakt">Jetzt anfragen</Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

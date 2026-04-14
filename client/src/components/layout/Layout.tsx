import Header from "./Header";
import Footer from "./Footer";
import AccessibilityPanel from "@/components/AccessibilityPanel";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {

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
      <main id="main-content" className="flex-1 pt-20 md:pt-24" role="main" aria-label="Hauptinhalt" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <AccessibilityPanel />
    </div>
  );
}

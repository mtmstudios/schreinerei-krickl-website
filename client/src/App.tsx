import { Switch, Route, useLocation } from "wouter";
import { useEffect, lazy, Suspense, ComponentType } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ChatWidget from "@/components/ChatWidget";

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Laden...</div>
    </div>
  );
}

const LazyHome = lazy(() => import("@/pages/Home"));
const LazyAbout = lazy(() => import("@/pages/About"));
const LazyServices = lazy(() => import("@/pages/Services"));
const LazyServiceDetail = lazy(() => import("@/pages/ServiceDetail"));
const LazyProjects = lazy(() => import("@/pages/Projects"));
const LazyCareer = lazy(() => import("@/pages/Career"));
const LazyContact = lazy(() => import("@/pages/Contact"));
const LazyImpressum = lazy(() => import("@/pages/Impressum"));
const LazyDatenschutz = lazy(() => import("@/pages/Datenschutz"));
const LazyBarrierefreiheit = lazy(() => import("@/pages/Barrierefreiheit"));
const LazyApplicationPage = lazy(() => import("@/pages/ApplicationPage"));
const LazyRegionalLanding = lazy(() => import("@/pages/RegionalLanding"));
const LazyNotFound = lazy(() => import("@/pages/not-found"));
const LazyPortalLogin = lazy(() => import("@/pages/PortalLogin"));
const LazyPortal = lazy(() => import("@/pages/Portal"));

function withSuspense<P extends object>(Component: ComponentType<P>) {
  return function SuspenseWrapper(props: P) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Component {...props} />
      </Suspense>
    );
  };
}

const Home = withSuspense(LazyHome);
const About = withSuspense(LazyAbout);
const Services = withSuspense(LazyServices);
const ServiceDetail = withSuspense(LazyServiceDetail);
const Projects = withSuspense(LazyProjects);
const Career = withSuspense(LazyCareer);
const Contact = withSuspense(LazyContact);
const Impressum = withSuspense(LazyImpressum);
const Datenschutz = withSuspense(LazyDatenschutz);
const Barrierefreiheit = withSuspense(LazyBarrierefreiheit);
const ApplicationPage = withSuspense(LazyApplicationPage);
const RegionalLanding = withSuspense(LazyRegionalLanding);
const NotFound = withSuspense(LazyNotFound);
const PortalLogin = withSuspense(LazyPortalLogin);
const Portal = withSuspense(LazyPortal);

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
}

function Router() {
  const [location] = useLocation();
  const isPortal = location.startsWith("/portal");

  return (
    <>
      <Switch>
        <Route path="/portal/login" component={PortalLogin} />
        <Route path="/portal" component={Portal} />
        <Route path="/" component={Home} />
        <Route path="/ueber-uns" component={About} />
        <Route path="/leistungen" component={Services} />
        <Route path="/leistungen/:slug" component={ServiceDetail} />
        <Route path="/referenzen" component={Projects} />
        <Route path="/karriere" component={Career} />
        <Route path="/karriere/bewerbung" component={ApplicationPage} />
        <Route path="/kontakt" component={Contact} />
        <Route path="/impressum" component={Impressum} />
        <Route path="/datenschutz" component={Datenschutz} />
        <Route path="/barrierefreiheit" component={Barrierefreiheit} />
        <Route path="/schreiner-:stadt" component={RegionalLanding} />
        <Route component={NotFound} />
      </Switch>
      {!isPortal && <ChatWidget />}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ScrollToTop />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

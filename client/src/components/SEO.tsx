import { useEffect } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  faqs?: FAQItem[];
  breadcrumbs?: BreadcrumbItem[];
}

const DEFAULT_OG_IMAGE = "https://schreinerei-krickl.de/logo.webp";
const SITE_NAME = "Schreinerei Krickl";
const TWITTER_HANDLE = "@schreinereikrickl";

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  faqs,
  breadcrumbs,
}: SEOProps) {
  useEffect(() => {
    document.title = title;

    const updateOrCreateMeta = (selector: string, content: string, isProperty = false) => {
      let meta = document.querySelector(selector);
      if (meta) {
        meta.setAttribute("content", content);
      } else {
        meta = document.createElement("meta");
        if (isProperty) {
          const match = selector.match(/property="([^"]+)"/);
          if (match) meta.setAttribute("property", match[1]);
        } else {
          const match = selector.match(/name="([^"]+)"/);
          if (match) meta.setAttribute("name", match[1]);
        }
        meta.setAttribute("content", content);
        document.head.appendChild(meta);
      }
    };

    updateOrCreateMeta('meta[name="description"]', description);

    updateOrCreateMeta('meta[property="og:title"]', title, true);
    updateOrCreateMeta('meta[property="og:description"]', description, true);
    updateOrCreateMeta('meta[property="og:type"]', ogType, true);
    updateOrCreateMeta('meta[property="og:site_name"]', SITE_NAME, true);
    updateOrCreateMeta('meta[property="og:image"]', ogImage, true);
    updateOrCreateMeta('meta[property="og:locale"]', "de_DE", true);

    if (canonical) {
      updateOrCreateMeta('meta[property="og:url"]', canonical, true);
    }

    updateOrCreateMeta('meta[name="twitter:card"]', "summary_large_image");
    updateOrCreateMeta('meta[name="twitter:title"]', title);
    updateOrCreateMeta('meta[name="twitter:description"]', description);
    updateOrCreateMeta('meta[name="twitter:image"]', ogImage);
    updateOrCreateMeta('meta[name="twitter:site"]', TWITTER_HANDLE);

    if (keywords) {
      updateOrCreateMeta('meta[name="keywords"]', keywords);
    }

    updateOrCreateMeta('meta[name="geo.region"]', "DE-BW");
    updateOrCreateMeta('meta[name="geo.placename"]', "Esslingen am Neckar");
    updateOrCreateMeta('meta[name="geo.position"]', "48.7433;9.3050");
    updateOrCreateMeta('meta[name="ICBM"]', "48.7433, 9.3050");

    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (link) {
        link.setAttribute("href", canonical);
      } else {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        link.setAttribute("href", canonical);
        document.head.appendChild(link);
      }
    }

    // FAQ-Schema (FAQPage) für Rich Snippets
    const existingFaqSchema = document.getElementById("faq-schema");
    if (existingFaqSchema) existingFaqSchema.remove();
    if (faqs && faqs.length > 0) {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      };
      const script = document.createElement("script");
      script.id = "faq-schema";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(faqSchema);
      document.head.appendChild(script);
    }

    // Breadcrumb-Schema für bessere SERP-Darstellung
    const existingBreadcrumbSchema = document.getElementById("breadcrumb-schema");
    if (existingBreadcrumbSchema) existingBreadcrumbSchema.remove();
    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      };
      const script = document.createElement("script");
      script.id = "breadcrumb-schema";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(breadcrumbSchema);
      document.head.appendChild(script);
    }

    return () => {
      document.title = "Schreinerei Esslingen | Schreiner Krickl - Möbelbau nach Maß";
      const faqScript = document.getElementById("faq-schema");
      if (faqScript) faqScript.remove();
      const breadcrumbScript = document.getElementById("breadcrumb-schema");
      if (breadcrumbScript) breadcrumbScript.remove();
    };
  }, [title, description, keywords, canonical, ogImage, ogType, faqs, breadcrumbs]);

  return null;
}

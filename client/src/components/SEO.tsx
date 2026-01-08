import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
}

const DEFAULT_OG_IMAGE = "https://schreinerei-krickl.de/og-image.jpg";
const SITE_NAME = "Schreinerei Krickl";
const TWITTER_HANDLE = "@schreinereikrickl";

export default function SEO({ 
  title, 
  description, 
  keywords, 
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website"
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

    return () => {
      document.title = "Schreinerei Esslingen | Schreiner Krickl - Möbelbau nach Maß";
    };
  }, [title, description, keywords, canonical, ogImage, ogType]);

  return null;
}

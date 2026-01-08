import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Kontaktformular
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, message } = req.body;
      
      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          errors: ["Name, E-Mail und Nachricht sind erforderlich"],
        });
      }
      
      // In Entwicklung: Loggen der Daten (in Produktion auf Mittwald werden die PHP-Dateien genutzt)
      console.log("=== KONTAKTANFRAGE ERHALTEN ===");
      console.log("Name:", name);
      console.log("E-Mail:", email);
      console.log("Telefon:", phone || "Nicht angegeben");
      console.log("Nachricht:", message);
      console.log("Zeitstempel:", new Date().toISOString());
      console.log("================================");
      
      res.json({
        success: true,
        message: "Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns schnellstmöglich bei Ihnen.",
      });
    } catch (error) {
      console.error("Kontaktformular Fehler:", error);
      res.status(500).json({
        success: false,
        message: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
      });
    }
  });

  // Projektanfrage-Funnel
  app.post("/api/inquiry", async (req, res) => {
    try {
      const { 
        name, email, phone, 
        projectType, rooms, services, budget, timeline, 
        style, materials, specialRequirements, message 
      } = req.body;
      
      if (!name || !email) {
        return res.status(400).json({
          success: false,
          errors: ["Name und E-Mail sind erforderlich"],
        });
      }
      
      console.log("=== PROJEKTANFRAGE ERHALTEN ===");
      console.log("Name:", name);
      console.log("E-Mail:", email);
      console.log("Telefon:", phone || "Nicht angegeben");
      console.log("Projekttyp:", projectType || "Nicht angegeben");
      console.log("Räume:", Array.isArray(rooms) ? rooms.join(", ") : rooms || "Nicht angegeben");
      console.log("Services:", Array.isArray(services) ? services.join(", ") : services || "Nicht angegeben");
      console.log("Budget:", budget || "Nicht angegeben");
      console.log("Zeitrahmen:", timeline || "Nicht angegeben");
      console.log("Stil:", style || "Nicht angegeben");
      console.log("Materialien:", Array.isArray(materials) ? materials.join(", ") : materials || "Nicht angegeben");
      console.log("Besonderheiten:", specialRequirements || "Keine");
      console.log("Nachricht:", message || "Keine");
      console.log("Zeitstempel:", new Date().toISOString());
      console.log("================================");
      
      res.json({
        success: true,
        message: "Ihre Projektanfrage wurde erfolgreich gesendet. Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
      });
    } catch (error) {
      console.error("Projektanfrage Fehler:", error);
      res.status(500).json({
        success: false,
        message: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
      });
    }
  });

  // Service-spezifische Anfrage
  app.post("/api/service-inquiry", async (req, res) => {
    try {
      const { 
        name, email, phone, 
        serviceName, serviceType, projectType, rooms, dimensions,
        style, materials, colors, features, budget, timeline,
        specialRequirements, message 
      } = req.body;
      
      if (!name || !email) {
        return res.status(400).json({
          success: false,
          errors: ["Name und E-Mail sind erforderlich"],
        });
      }
      
      console.log(`=== ${(serviceName || "SERVICE").toUpperCase()} ANFRAGE ERHALTEN ===`);
      console.log("Name:", name);
      console.log("E-Mail:", email);
      console.log("Telefon:", phone || "Nicht angegeben");
      console.log("Service:", serviceName || "Nicht angegeben");
      console.log("Typ:", serviceType || "Nicht angegeben");
      console.log("Projektart:", projectType || "Nicht angegeben");
      console.log("Räume:", Array.isArray(rooms) ? rooms.join(", ") : rooms || "Nicht angegeben");
      console.log("Maße:", dimensions || "Nicht angegeben");
      console.log("Stil:", style || "Nicht angegeben");
      console.log("Materialien:", Array.isArray(materials) ? materials.join(", ") : materials || "Nicht angegeben");
      console.log("Farben:", Array.isArray(colors) ? colors.join(", ") : colors || "Nicht angegeben");
      console.log("Funktionen:", Array.isArray(features) ? features.join(", ") : features || "Nicht angegeben");
      console.log("Budget:", budget || "Nicht angegeben");
      console.log("Zeitrahmen:", timeline || "Nicht angegeben");
      console.log("Besonderheiten:", specialRequirements || "Keine");
      console.log("Nachricht:", message || "Keine");
      console.log("Zeitstempel:", new Date().toISOString());
      console.log("================================");
      
      res.json({
        success: true,
        message: "Ihre Anfrage wurde erfolgreich gesendet. Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
      });
    } catch (error) {
      console.error("Service-Anfrage Fehler:", error);
      res.status(500).json({
        success: false,
        message: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
      });
    }
  });

  // Bewerbung
  app.post("/api/application", async (req, res) => {
    try {
      const { 
        name, email, phone, 
        position, experience, qualifications, availability,
        salary, motivation, startDate 
      } = req.body;
      
      if (!name || !email || !phone) {
        return res.status(400).json({
          success: false,
          errors: ["Name, E-Mail und Telefon sind erforderlich"],
        });
      }
      
      console.log("=== BEWERBUNG ERHALTEN ===");
      console.log("Name:", name);
      console.log("E-Mail:", email);
      console.log("Telefon:", phone);
      console.log("Position:", position || "Nicht angegeben");
      console.log("Erfahrung:", experience || "Nicht angegeben");
      console.log("Qualifikationen:", Array.isArray(qualifications) ? qualifications.join(", ") : qualifications || "Nicht angegeben");
      console.log("Verfügbarkeit:", availability || "Nicht angegeben");
      console.log("Gehaltsvorstellung:", salary || "Nicht angegeben");
      console.log("Motivation:", motivation || "Keine Angabe");
      console.log("Startdatum:", startDate || "Nicht angegeben");
      console.log("Zeitstempel:", new Date().toISOString());
      console.log("================================");
      
      res.json({
        success: true,
        message: "Ihre Bewerbung wurde erfolgreich gesendet. Wir melden uns zeitnah bei Ihnen.",
      });
    } catch (error) {
      console.error("Bewerbung Fehler:", error);
      res.status(500).json({
        success: false,
        message: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
      });
    }
  });

  return httpServer;
}

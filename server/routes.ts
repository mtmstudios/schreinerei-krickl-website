import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

// ── Session type augmentation ─────────────────────────────────────────────
declare module "express-session" {
  interface SessionData {
    portalAuthenticated?: boolean;
  }
}

// ── Auth middleware ────────────────────────────────────────────────────────
function requirePortalAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session?.portalAuthenticated) return next();
  res.status(401).json({ success: false, message: "Nicht angemeldet" });
}

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

  // ── PORTAL: Auth ──────────────────────────────────────────────────────────

  app.post("/api/portal/login", async (req, res) => {
    const { username, password } = req.body;
    const expectedUser = process.env.PORTAL_USERNAME || "krickl";
    const expectedPass = process.env.PORTAL_PASSWORD || "Krickl2024!";

    if (username === expectedUser && password === expectedPass) {
      req.session.portalAuthenticated = true;
      return res.json({ success: true });
    }
    res.status(401).json({ success: false, message: "Ungültige Anmeldedaten" });
  });

  app.post("/api/portal/logout", (req, res) => {
    req.session.destroy(() => {});
    res.json({ success: true });
  });

  app.get("/api/portal/me", (req, res) => {
    res.json({ authenticated: !!req.session?.portalAuthenticated });
  });

  // ── PORTAL: Webhook (n8n → Portal) ────────────────────────────────────────

  app.post("/api/portal/inbound", async (req, res) => {
    const secret = process.env.PORTAL_WEBHOOK_SECRET || "krickl-webhook-2024";
    const provided = req.headers["x-portal-secret"];
    if (provided !== secret) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    try {
      const {
        caller_phone,
        subject,
        summary,
        intent,
        sentiment,
        email_body,
      } = req.body;

      await storage.createInquiry({
        source: "phone",
        callerPhone: caller_phone || null,
        callerName: null,
        callerEmail: null,
        subject: subject || "Anruf",
        summary: summary || null,
        intent: intent || null,
        sentiment: sentiment || null,
        emailBody: email_body || null,
        status: "new",
        internalNotes: null,
      });

      res.json({ success: true });
    } catch (error) {
      console.error("Portal inbound webhook error:", error);
      res.status(500).json({ success: false });
    }
  });

  // ── PORTAL: Chat-AI (ausschließlich n8n) ─────────────────────────────────

  app.post("/api/portal/chat-ai", async (req, res) => {
    const { question, category, detail, budget } = req.body;

    const n8nUrl = process.env.N8N_CHAT_AI_URL || "https://mtmstudios.app.n8n.cloud/webhook/5ee4ef75-c909-4111-b837-ccedbd182a58";

    try {
      const response = await fetch(n8nUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, category, detail, budget }),
        signal: AbortSignal.timeout(15000),
      });
      const data = await response.json() as Record<string, unknown>;
      return res.json({
        reply: (data.reply as string) || "Wir beraten Sie gerne persönlich.",
        extractedName: (data.extractedName as string) || null,
        extractedContact: (data.extractedContact as string) || null,
      });
    } catch {
      // Statischer Fallback nur wenn n8n nicht erreichbar
      res.json({ reply: "Das klingt interessant! Für eine präzise Beratung meldet sich Herr Tomay persönlich bei Ihnen.", extractedName: null, extractedContact: null });
    }
  });

  // ── PORTAL: Chat-Widget Submission ────────────────────────────────────────

  app.post("/api/portal/chat", async (req, res) => {
    try {
      const { name, email, phone, message, subject, intent } = req.body;
      if (!name || !message) {
        return res.status(400).json({ success: false, message: "Name und Nachricht sind erforderlich" });
      }

      const inquiry = await storage.createInquiry({
        source: "chat",
        callerPhone: phone || null,
        callerName: name,
        callerEmail: email || null,
        subject: subject || `Chat: ${message.slice(0, 60)}${message.length > 60 ? "…" : ""}`,
        summary: message,
        intent: intent || null,
        sentiment: null,
        emailBody: null,
        status: "new",
        internalNotes: null,
      });

      // n8n async notification (fire & forget)
      const n8nNotifyUrl = process.env.N8N_CHAT_NOTIFY_URL;
      if (n8nNotifyUrl) {
        fetch(n8nNotifyUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            inquiryId: inquiry.id,
            name,
            phone: phone || null,
            email: email || null,
            subject: inquiry.subject,
            intent,
            message,
            source: "chat",
          }),
        }).catch(() => {});
      }

      res.json({ success: true, message: "Nachricht gesendet. Wir melden uns bald." });
    } catch (error) {
      console.error("Chat webhook error:", error);
      res.status(500).json({ success: false });
    }
  });

  // ── PORTAL: Inquiries CRUD ────────────────────────────────────────────────

  app.get("/api/portal/inquiries", requirePortalAuth, async (req, res) => {
    const { status, source } = req.query as { status?: string; source?: string };
    const inquiries = await storage.getInquiries({
      status: status || undefined,
      source: source || undefined,
    });
    res.json({ success: true, data: inquiries });
  });

  app.patch("/api/portal/inquiries/:id", requirePortalAuth, async (req, res) => {
    const { id } = req.params;
    const { status, internalNotes } = req.body;

    const validStatuses = ["new", "in_progress", "done"];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Ungültiger Status" });
    }

    const updated = await storage.updateInquiry(id, {
      ...(status ? { status } : {}),
      ...(internalNotes !== undefined ? { internalNotes } : {}),
    });

    if (!updated) return res.status(404).json({ success: false, message: "Nicht gefunden" });
    res.json({ success: true, data: updated });
  });

  app.get("/api/portal/stats", requirePortalAuth, async (req, res) => {
    const all = await storage.getInquiries();
    const stats = {
      total: all.length,
      new: all.filter((i) => i.status === "new").length,
      in_progress: all.filter((i) => i.status === "in_progress").length,
      done: all.filter((i) => i.status === "done").length,
      phone: all.filter((i) => i.source === "phone").length,
      chat: all.filter((i) => i.source === "chat").length,
    };

    // Top intents for analytics
    const intentCounts: Record<string, number> = {};
    for (const inquiry of all) {
      if (inquiry.intent) {
        const key = inquiry.intent.slice(0, 40);
        intentCounts[key] = (intentCounts[key] || 0) + 1;
      } else if (inquiry.subject) {
        const key = inquiry.subject.replace(/^(Anfrage:|Chat:|Anruf:?\s*)/i, "").trim().slice(0, 40);
        if (key) intentCounts[key] = (intentCounts[key] || 0) + 1;
      }
    }

    const topIntents = Object.entries(intentCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, count]) => ({ name, count }));

    res.json({ success: true, data: { ...stats, topIntents } });
  });

  return httpServer;
}

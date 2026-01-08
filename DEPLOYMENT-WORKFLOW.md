# Kompletter Deployment-Workflow: Replit → GitHub → Mittwald

## Übersicht

Dieser Aktionsplan beschreibt den vollständigen Workflow, um eine in Replit entwickelte Website über GitHub automatisch auf Mittwald zu deployen - inklusive funktionierender PHP-Kontaktformulare mit professionellen HTML-E-Mail-Templates.

---

## Inhaltsverzeichnis

1. [Voraussetzungen](#1-voraussetzungen)
2. [Phase 1: Projekt-Setup in Replit](#2-phase-1-projekt-setup-in-replit)
3. [Phase 2: GitHub-Repository einrichten](#3-phase-2-github-repository-einrichten)
4. [Phase 3: Mittwald vorbereiten](#4-phase-3-mittwald-vorbereiten)
5. [Phase 4: GitHub Actions Workflow erstellen](#5-phase-4-github-actions-workflow-erstellen)
6. [Phase 5: PHP-Kontaktformulare einrichten](#6-phase-5-php-kontaktformulare-einrichten)
7. [Phase 6: E-Mail-Konfiguration auf Mittwald](#7-phase-6-e-mail-konfiguration-auf-mittwald)
8. [Phase 7: Deployment testen](#8-phase-7-deployment-testen)
9. [Troubleshooting](#9-troubleshooting)
10. [Checkliste für neue Projekte](#10-checkliste-für-neue-projekte)

---

## 1. Voraussetzungen

### Benötigte Accounts & Zugänge
- [ ] Replit-Account mit aktivem Projekt
- [ ] GitHub-Account
- [ ] Mittwald-Kundencenter-Zugang
- [ ] FTP/SFTP-Zugangsdaten von Mittwald

### Technische Anforderungen
- Node.js-Projekt mit Build-Prozess (Vite, Webpack, etc.)
- Build-Output in einem `dist`-Ordner
- PHP-Unterstützung auf Mittwald (Standard)

---

## 2. Phase 1: Projekt-Setup in Replit

### 2.1 Projektstruktur sicherstellen

```
projekt/
├── client/
│   ├── src/           # React/Vue/etc. Quellcode
│   ├── public/
│   │   └── api/       # PHP-Dateien für Formulare
│   │       ├── contact.php
│   │       ├── inquiry.php
│   │       ├── service-inquiry.php
│   │       └── application.php
│   └── index.html
├── dist/              # Build-Output (wird generiert)
├── package.json
└── vite.config.ts
```

### 2.2 Build-Befehl prüfen

In `package.json` sicherstellen:
```json
{
  "scripts": {
    "build": "vite build",
    "dev": "vite"
  }
}
```

### 2.3 Build testen

```bash
npm run build
```

Der `dist`-Ordner sollte folgende Struktur haben:
```
dist/
├── index.cjs              # Server-Bundle (nicht deployed)
└── public/                # Dieser Ordner wird deployed!
    ├── api/
    │   ├── contact.php
    │   ├── inquiry.php
    │   ├── service-inquiry.php
    │   └── application.php
    ├── assets/
    │   ├── index-xxxx.js
    │   └── index-xxxx.css
    └── index.html
```

**Hinweis:** Nur der `dist/public/`-Ordner wird zu Mittwald deployed!

---

## 3. Phase 2: GitHub-Repository einrichten

### 3.1 Neues Repository erstellen

1. GitHub öffnen → "New Repository"
2. Name eingeben (z.B. `kundenname-website`)
3. **Private** auswählen (für Kundenprojekte)
4. Ohne README erstellen

### 3.2 Replit mit GitHub verbinden

In Replit:
1. "Git"-Tab öffnen (linke Seitenleiste)
2. "Connect to GitHub" klicken
3. Repository auswählen oder URL eingeben
4. Initial Commit erstellen und pushen

Alternativ per Terminal:
```bash
git init
git remote add origin https://github.com/USERNAME/REPO-NAME.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

---

## 4. Phase 3: Mittwald vorbereiten

### 4.1 Hosting-Paket prüfen

Im Mittwald Kundencenter:
1. Webspace/Server auswählen
2. Domain prüfen (oder neue anlegen)
3. Zielverzeichnis notieren (z.B. `/html/projektname/`)

### 4.2 SFTP-Zugangsdaten sammeln

Benötigt für GitHub Actions:
- **Host**: z.B. `sshXXX.mittwaldserver.info`
- **Benutzername**: z.B. `p123456`
- **Passwort**: Das FTP/SSH-Passwort
- **Port**: `22` (SFTP)
- **Zielverzeichnis**: z.B. `/html/projektname/`

### 4.3 E-Mail-Postfach einrichten

Im Mittwald Kundencenter:
1. E-Mail → Postfächer → Neues Postfach
2. Absender-Adresse erstellen: `no-reply@domain.de`
3. Empfänger-Adresse erstellen: `info@domain.de` oder `kontakt@domain.de`

**WICHTIG:** Die Absender-Adresse MUSS auf Mittwald als Postfach existieren!

---

## 5. Phase 4: GitHub Actions Workflow erstellen

### 5.1 Secrets in GitHub hinterlegen

Repository → Settings → Secrets and variables → Actions → New repository secret

Folgende Secrets anlegen:
| Secret Name | Wert | Beispiel |
|-------------|------|----------|
| `MITTWALD_HOST` | SFTP-Server | `sshXXX.mittwaldserver.info` |
| `MITTWALD_USER` | FTP-Benutzername | `p123456` |
| `MITTWALD_PASSWORD` | FTP-Passwort | (Das Passwort) |
| `MITTWALD_PATH` | Zielverzeichnis | `/html/projektname/` |

### 5.2 Workflow-Datei erstellen

Datei: `.github/workflows/deploy.yml`

```yaml
name: Deploy to Mittwald

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build project
        run: npm run build
      
      - name: Deploy via SFTP
        uses: wlixcc/SFTP-Deploy-Action@v1.2.4
        with:
          server: ${{ secrets.MITTWALD_HOST }}
          username: ${{ secrets.MITTWALD_USER }}
          password: ${{ secrets.MITTWALD_PASSWORD }}
          port: 22
          local_path: './dist/public/*'
          remote_path: ${{ secrets.MITTWALD_PATH }}
          sftp_only: true
```

**WICHTIG:** 
- Der Build-Output landet in `dist/public/` - dieser Ordner wird deployed
- `MITTWALD_PATH` muss das korrekte Zielverzeichnis auf Mittwald enthalten (z.B. `/html/krickl-schreinerei/`)

### 5.3 Workflow testen

```bash
git add .
git commit -m "Add deployment workflow"
git push
```

In GitHub unter "Actions" den Workflow-Status prüfen.

---

## 6. Phase 5: PHP-Kontaktformulare einrichten

### 6.1 Ordnerstruktur

```
client/public/api/
├── contact.php          # Einfaches Kontaktformular
├── inquiry.php          # Projekt-Anfrage-Funnel
├── service-inquiry.php  # Service-spezifische Anfragen
└── application.php      # Bewerbungsformular
```

### 6.2 PHP-Template für Kontaktformular

```php
<?php
/**
 * Kontaktformular - [Kundenname]
 * Für Mittwald Hosting optimiert
 */

// Error Logging aktivieren
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/error.log');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Methode nicht erlaubt']);
    exit;
}

// ============================================
// KONFIGURATION - HIER ANPASSEN!
// ============================================
$empfaenger_email = 'info@kundendomain.de';      // Wohin die E-Mail gesendet wird
$absender_email = 'no-reply@kundendomain.de';    // Muss auf Mittwald existieren!
$firmenname = 'Firmenname';
$betreff_prefix = '[Kontaktanfrage] ';
$accent_color = '#8B4513';                        // Markenfarbe für E-Mail-Design
// ============================================

// JSON-Daten einlesen
$raw_input = file_get_contents('php://input');
error_log("Contact Form - Raw Input: " . $raw_input);

$input = json_decode($raw_input, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    error_log("Contact Form - JSON Error: " . json_last_error_msg());
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Ungültige JSON-Daten']);
    exit;
}

// Daten extrahieren und bereinigen
$name = trim(strip_tags($input['name'] ?? ''));
$email = trim(strip_tags($input['email'] ?? ''));
$telefon = trim(strip_tags($input['phone'] ?? ''));
$nachricht = trim(strip_tags($input['message'] ?? ''));

// Validierung
$fehler = [];
if (empty($name)) $fehler[] = 'Name ist erforderlich';
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $fehler[] = 'Gültige E-Mail-Adresse ist erforderlich';
}
if (empty($nachricht)) $fehler[] = 'Nachricht ist erforderlich';

if (!empty($fehler)) {
    error_log("Contact Form - Validation Errors: " . implode(', ', $fehler));
    http_response_code(400);
    echo json_encode(['success' => false, 'errors' => $fehler]);
    exit;
}

// E-Mail-Betreff
$betreff = $betreff_prefix . 'Neue Anfrage von ' . $name;

// HTML-E-Mail-Template (siehe Abschnitt 6.3)
$email_inhalt = '<!-- HTML-Template hier einfügen -->';

// E-Mail-Header
$headers = "From: " . $absender_email . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=utf-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

error_log("Contact Form - Sending to: " . $empfaenger_email);

$mail_result = mail($empfaenger_email, $betreff, $email_inhalt, $headers);

if ($mail_result) {
    error_log("Contact Form - Email sent successfully");
    echo json_encode([
        'success' => true, 
        'message' => 'Ihre Nachricht wurde erfolgreich gesendet.'
    ]);
} else {
    $last_error = error_get_last();
    error_log("Contact Form - Email failed: " . print_r($last_error, true));
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'error' => 'E-Mail konnte nicht gesendet werden.'
    ]);
}
?>
```

### 6.3 HTML-E-Mail-Template (Professionelles Design)

```html
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background-color: #f5f5f0;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f0;">
        <tr>
            <td style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Header mit Firmenfarbe -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%); padding: 30px 40px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">[FIRMENNAME]</h1>
                            <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">[SLOGAN]</p>
                        </td>
                    </tr>
                    
                    <!-- Titel -->
                    <tr>
                        <td style="padding: 30px 40px 20px 40px; border-bottom: 1px solid #eee;">
                            <h2 style="margin: 0; color: #333; font-size: 20px; font-weight: 600;">Neue Kontaktanfrage</h2>
                            <p style="margin: 8px 0 0 0; color: #666; font-size: 14px;">Eingegangen am [DATUM] um [UHRZEIT] Uhr</p>
                        </td>
                    </tr>
                    
                    <!-- Kontaktdaten -->
                    <tr>
                        <td style="padding: 25px 40px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="margin: 0 0 5px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Name</p>
                                        <p style="margin: 0; color: #333; font-size: 16px; font-weight: 500;">[NAME]</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="margin: 0 0 5px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">E-Mail</p>
                                        <p style="margin: 0;"><a href="mailto:[EMAIL]" style="color: #8B4513; font-size: 16px; text-decoration: none;">[EMAIL]</a></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="margin: 0 0 5px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Telefon</p>
                                        <p style="margin: 0;"><a href="tel:[TELEFON]" style="color: #8B4513; font-size: 16px; text-decoration: none;">[TELEFON]</a></p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Nachricht -->
                    <tr>
                        <td style="padding: 0 40px 30px 40px;">
                            <div style="background-color: #faf9f7; border-radius: 6px; padding: 20px; border-left: 4px solid #8B4513;">
                                <p style="margin: 0 0 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Nachricht</p>
                                <p style="margin: 0; color: #333; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">[NACHRICHT]</p>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Antwort-Button -->
                    <tr>
                        <td style="padding: 0 40px 30px 40px; text-align: center;">
                            <a href="mailto:[EMAIL]?subject=Re: Ihre Anfrage" style="display: inline-block; background-color: #8B4513; color: #ffffff; padding: 14px 30px; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 6px;">Jetzt antworten</a>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8f7f5; padding: 25px 40px; border-top: 1px solid #eee;">
                            <p style="margin: 0; color: #888; font-size: 12px; text-align: center;">
                                Diese E-Mail wurde automatisch generiert.<br>
                                [FIRMENNAME] | [ORT]
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
```

### 6.4 Service-spezifische Farbcodierung

Für verschiedene Formulartypen unterschiedliche Farben verwenden:

| Service | Hex-Farbe | Verwendung |
|---------|-----------|------------|
| Allgemein | `#8B4513` | Kontakt, Standard |
| Küchen | `#2563eb` | Küchen-Anfragen |
| Innenausbau | `#059669` | Innenausbau |
| Türen & Fenster | `#7c3aed` | Türen/Fenster |
| Treppen | `#dc2626` | Treppen |
| Restaurierung | `#ca8a04` | Restaurierung |
| Bewerbungen | `#059669` | Karriere/Jobs |

---

## 7. Phase 6: E-Mail-Konfiguration auf Mittwald

### 7.1 Postfächer einrichten

Im Mittwald Kundencenter:

1. **Absender-Postfach** (PFLICHT!)
   - Adresse: `no-reply@kundendomain.de`
   - Dieses Postfach muss existieren, sonst werden E-Mails abgelehnt

2. **Empfänger-Postfach**
   - Adresse: `info@kundendomain.de` oder `kontakt@kundendomain.de`
   - Hier kommen die Anfragen an

### 7.2 SPF-Record prüfen (optional, empfohlen)

DNS-Einstellungen → SPF-Record sollte Mittwald-Server erlauben:
```
v=spf1 include:_spf.mittwald.de ~all
```

### 7.3 E-Mail-Weiterleitung (optional)

Falls Kunde eine externe E-Mail nutzt:
- Weiterleitung von `info@kundendomain.de` an `kunde@gmail.com` einrichten

---

## 8. Phase 7: Deployment testen

### 8.1 Vor dem ersten Deployment

Checkliste:
- [ ] GitHub Actions Secrets korrekt hinterlegt
- [ ] Workflow-Datei vorhanden (`.github/workflows/deploy.yml`)
- [ ] `server-dir` im Workflow korrekt
- [ ] PHP-Dateien im richtigen Ordner (`client/public/api/`)
- [ ] E-Mail-Adressen in PHP-Dateien angepasst

### 8.2 Deployment auslösen

```bash
git add .
git commit -m "Ready for deployment"
git push
```

### 8.3 Deployment prüfen

1. GitHub → Actions → Workflow-Run öffnen
2. Auf grünes Häkchen warten
3. Website im Browser aufrufen

### 8.4 Formular testen

1. Kontaktformular auf der Website ausfüllen
2. Absenden
3. Erfolgsmeldung prüfen
4. E-Mail-Posteingang prüfen (auch Spam-Ordner!)

### 8.5 Error-Log prüfen (bei Problemen)

Per FTP/SFTP die Datei `/api/error.log` herunterladen und prüfen.

---

## 9. Troubleshooting

### Problem: "Method not allowed" beim direkten Aufruf der PHP-Datei

**Ursache:** Normal! Die PHP-Dateien sind so konfiguriert, dass sie nur POST-Anfragen akzeptieren.

**Lösung:** Kein Handlungsbedarf. Das Formular funktioniert trotzdem.

---

### Problem: Formular zeigt Erfolg, aber keine E-Mail kommt an

**Mögliche Ursachen:**

1. **Spam-Ordner prüfen**
   - E-Mail landet oft im Spam

2. **Absender-Adresse existiert nicht**
   - Die `$absender_email` muss als Postfach auf Mittwald existieren
   - Lösung: Postfach anlegen oder andere Absender-Adresse verwenden

3. **Domain stimmt nicht überein**
   - Absender-Domain muss zur Hosting-Domain passen
   - Lösung: Absender-Adresse an Hosting-Domain anpassen

4. **Error-Log prüfen**
   - Per FTP: `/api/error.log` herunterladen
   - Zeigt genaue Fehlermeldung

---

### Problem: Formular zeigt Fehler beim Absenden

**Mögliche Ursachen:**

1. **404 Not Found**
   - PHP-Datei wurde nicht deployed
   - Lösung: Build-Prozess prüfen, `client/public/api/` muss kopiert werden

2. **CORS-Fehler**
   - Lösung: CORS-Header in PHP-Datei prüfen

3. **500 Internal Server Error**
   - PHP-Fehler auf dem Server
   - Lösung: Error-Log prüfen

---

### Problem: GitHub Actions Workflow schlägt fehl

**Mögliche Ursachen:**

1. **Secrets nicht korrekt**
   - Host, Username oder Passwort falsch
   - Lösung: Secrets in GitHub prüfen

2. **Verzeichnis existiert nicht**
   - `server-dir` im Workflow zeigt auf nicht existierendes Verzeichnis
   - Lösung: Verzeichnis auf Mittwald prüfen/erstellen

3. **Build-Fehler**
   - `npm run build` schlägt fehl
   - Lösung: Lokal in Replit testen

---

## 10. Checkliste für neue Projekte

### Vor Projektstart
- [ ] Mittwald-Hosting-Paket vorhanden
- [ ] Domain konfiguriert
- [ ] FTP/SFTP-Zugangsdaten vorhanden
- [ ] E-Mail-Postfächer angelegt

### Projekt-Setup
- [ ] Replit-Projekt erstellt
- [ ] GitHub-Repository erstellt und verbunden
- [ ] GitHub Secrets hinterlegt
- [ ] Workflow-Datei erstellt

### PHP-Formulare
- [ ] PHP-Dateien in `client/public/api/` erstellt
- [ ] E-Mail-Adressen angepasst:
  - [ ] `$empfaenger_email` = Kunden-E-Mail
  - [ ] `$absender_email` = no-reply@kundendomain.de
- [ ] Firmenname und Farben angepasst
- [ ] Error-Logging aktiviert

### Vor Go-Live
- [ ] Build lokal getestet (`npm run build`)
- [ ] Deployment via `git push` ausgelöst
- [ ] GitHub Actions erfolgreich durchgelaufen
- [ ] Website im Browser geprüft
- [ ] Kontaktformular getestet
- [ ] E-Mail empfangen (inkl. Spam-Check)
- [ ] Error-Log geprüft (keine Fehler)

### Nach Go-Live
- [ ] Kunde über Funktionsweise informiert
- [ ] Zugangsdaten dokumentiert
- [ ] Backup-Strategie besprochen

---

## Anhang: Schnellreferenz

### Git-Befehle für Deployment

```bash
# Änderungen committen und deployen
git add .
git commit -m "Beschreibung der Änderungen"
git push

# Status prüfen
git status

# Letzte Commits anzeigen
git log --oneline -5
```

### Wichtige Dateipfade

| Datei | Pfad (Entwicklung) | Pfad (Mittwald) |
|-------|-------------------|-----------------|
| Workflow | `.github/workflows/deploy.yml` | - |
| PHP-Formulare | `client/public/api/*.php` | `/api/*.php` |
| Build-Output | `dist/public/` | (root) |
| Error-Log | - | `/api/error.log` |

### GitHub Secrets (müssen angelegt werden)

| Secret | Beschreibung |
|--------|--------------|
| `MITTWALD_HOST` | SFTP-Server (z.B. `sshXXX.mittwaldserver.info`) |
| `MITTWALD_USER` | FTP-Benutzername |
| `MITTWALD_PASSWORD` | FTP-Passwort |
| `MITTWALD_PATH` | Zielverzeichnis (z.B. `/html/projektname/`) |

### E-Mail-Konfiguration Schnellübersicht

```php
$empfaenger_email = 'info@kundendomain.de';    // Wohin gesendet wird
$absender_email = 'no-reply@kundendomain.de';  // Muss auf Mittwald existieren!
```

---

*Erstellt: Januar 2026*
*Version: 1.0*

# GitHub Deployment für Mittwald

## Schritt 1: GitHub Repository erstellen

1. Gehen Sie zu [github.com](https://github.com) und melden Sie sich an
2. Klicken Sie auf **"New repository"** (grüner Button)
3. Repository-Name: z.B. `schreinerei-krickl-website`
4. Wählen Sie **"Private"** (empfohlen für Geschäftswebsites)
5. Klicken Sie auf **"Create repository"**

## Schritt 2: Replit mit GitHub verbinden

### Option A: Über Replit Git-Panel (empfohlen)

1. Klicken Sie in Replit links auf **"Git"** (Versionskontrolle-Symbol)
2. Klicken Sie auf **"Connect to GitHub"**
3. Autorisieren Sie Replit für Ihr GitHub-Konto
4. Wählen Sie das erstellte Repository aus
5. Pushen Sie das Projekt

### Option B: Manuell über Terminal

```bash
# In der Replit Shell:
cd /home/runner/workspace

# Git Remote hinzufügen (ersetzen Sie USERNAME und REPO-NAME)
git remote add origin https://github.com/USERNAME/REPO-NAME.git

# Pushen
git push -u origin main
```

## Schritt 3: Mittwald mit GitHub verbinden

### In Mittwald:

1. Melden Sie sich im [Mittwald Kundencenter](https://www.mittwald.de/kunden) an
2. Gehen Sie zu Ihrer Domain/Projekt
3. Navigieren Sie zu **"Deployment"** oder **"Git"**
4. Klicken Sie auf **"Git-Repository verbinden"**
5. Wählen Sie **GitHub** als Provider
6. Autorisieren Sie Mittwald für Ihr GitHub-Konto
7. Wählen Sie das Repository `schreinerei-krickl-website`

### Deployment-Pfad konfigurieren:

- **Source-Pfad im Repository:** `dist/public`
- **Ziel-Pfad auf Mittwald:** `/` (Webroot)
- **Branch:** `main`

## Schritt 4: Automatisches Deployment einrichten

In Mittwald können Sie "Auto-Deploy" aktivieren:
- Bei jedem Push zu `main` wird die Website automatisch aktualisiert

## Schritt 5: Nach dem ersten Deployment

### E-Mail-Adresse in PHP-Dateien anpassen:

Verbinden Sie sich per SFTP/SSH mit Mittwald und bearbeiten Sie die Dateien in `/api/`:

```php
// In allen 4 PHP-Dateien ändern:
$to = "ihre-echte@email.de";
```

Oder ändern Sie es direkt in Replit vor dem Push:
- `client/public/api/contact.php`
- `client/public/api/inquiry.php`
- `client/public/api/service-inquiry.php`
- `client/public/api/application.php`

## Workflow für zukünftige Änderungen

1. **Änderungen in Replit machen**
2. **Build erstellen:** `npm run build`
3. **Zu GitHub pushen:** Im Git-Panel auf "Push" klicken
4. **Mittwald aktualisiert automatisch** (wenn Auto-Deploy aktiv)

## Ordnerstruktur im Repository

```
schreinerei-krickl-website/
├── client/                 ← Quellcode (React)
├── server/                 ← Backend (Express)
├── shared/                 ← Gemeinsame Typen
├── dist/
│   └── public/            ← BUILD-OUTPUT (auf Mittwald deployen)
│       ├── index.html
│       ├── favicon.png
│       ├── robots.txt
│       ├── .htaccess      ← Apache-Konfiguration
│       ├── api/
│       │   ├── contact.php
│       │   ├── inquiry.php
│       │   ├── service-inquiry.php
│       │   └── application.php
│       └── assets/
└── package.json
```

## Wichtig für Mittwald

- **Nur `dist/public/` deployen** - nicht den gesamten Repository-Inhalt
- **PHP muss aktiviert sein** - Standard bei Mittwald
- **SSL/HTTPS aktivieren** - In Mittwald-Einstellungen

## Troubleshooting

### Formulare funktionieren nicht?
- Prüfen Sie, ob PHP auf Mittwald aktiviert ist
- Prüfen Sie die E-Mail-Konfiguration in den PHP-Dateien
- Testen Sie mit einem einfachen PHP-Test: `<?php echo "PHP works!"; ?>`
- Die `.user.ini` Datei enthält PHP-Einstellungen für Uploads (max 10MB)

### 404-Fehler bei Unterseiten?
- Prüfen Sie, ob die `.htaccess` Datei hochgeladen wurde
- Prüfen Sie, ob `mod_rewrite` auf Mittwald aktiviert ist

### Bilder werden nicht angezeigt?
- Prüfen Sie die Dateiberechtigungen (644 für Dateien, 755 für Ordner)

# GitHub Deployment für Mittwald

## Automatisches Deployment eingerichtet!

Bei jedem Push zu GitHub wird die Website automatisch auf Mittwald aktualisiert.

---

## Schritt 1: GitHub Repository erstellen (bereits erledigt)

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

## Schritt 3: GitHub Secrets einrichten (WICHTIG!)

Das automatische Deployment braucht Ihre Mittwald-Zugangsdaten. Diese werden sicher in GitHub gespeichert.

### So richten Sie die Secrets ein:

1. **Öffnen Sie Ihr GitHub Repository**
   - https://github.com/mtmstudios/schreinerei-krickl-website

2. **Gehen Sie zu Settings → Secrets and variables → Actions**
   - Klicken Sie oben auf "Settings"
   - Links im Menü: "Secrets and variables" → "Actions"
   - Klicken Sie auf **"New repository secret"**

3. **Fügen Sie diese 4 Secrets hinzu** (einzeln, nacheinander):

   | Name | Wert (von Mittwald) |
   |------|---------------------|
   | `MITTWALD_HOST` | SFTP-Host (z.B. `ssh123.mwcluster.io`) |
   | `MITTWALD_USER` | SFTP-Benutzername (z.B. `p-xxxxx`) |
   | `MITTWALD_PASSWORD` | SFTP-Passwort |
   | `MITTWALD_PATH` | Pfad zur App (z.B. `/html/apps/php-xxxxx/`) |

   **Wichtig:** Der MITTWALD_PATH muss mit `/` enden!

### Wo finden Sie die Mittwald-Zugangsdaten?

1. Im **mStudio** einloggen
2. Zu Ihrer **PHP App** navigieren
3. Unter **"Zugänge"** oder **"SFTP"** finden Sie:
   - Host
   - Benutzername
   - Passwort
4. Der **Pfad** steht in den App-Details (z.B. `/html/apps/php-abc123/`)

## Schritt 4: Erstes Deployment auslösen

Nach dem Einrichten der Secrets:
1. Pushen Sie nochmal zu GitHub (oder klicken Sie in GitHub unter "Actions" auf "Run workflow")
2. Das Deployment startet automatisch
3. Nach 1-2 Minuten ist die Website live!

---

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

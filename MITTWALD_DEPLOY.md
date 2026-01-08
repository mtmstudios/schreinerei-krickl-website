# Deployment auf Mittwald - Anleitung

## Ordnerstruktur zum Hochladen

Laden Sie den kompletten Inhalt des `dist/public/` Ordners in Ihr Mittwald-Webverzeichnis hoch.

```
mittwald-webroot/
├── index.html              ← Hauptseite
├── favicon.png             ← Website-Icon
├── robots.txt              ← SEO-Datei für Suchmaschinen
├── api/                    ← PHP-Formulare (WICHTIG!)
│   ├── contact.php         ← Kontaktformular
│   ├── inquiry.php         ← Projektanfragen
│   ├── service-inquiry.php ← Service-spezifische Anfragen
│   └── application.php     ← Bewerbungen
└── assets/                 ← Alle Bilder, CSS, JavaScript
    ├── index-*.css         ← Stylesheet
    ├── index-*.js          ← JavaScript
    └── *.jpg, *.png        ← Bilder
```

## Schritt-für-Schritt Anleitung

### 1. Build erstellen (bereits erledigt)
Der Build befindet sich im Ordner `dist/public/`

### 2. Dateien herunterladen
Laden Sie den gesamten `dist/public/` Ordner herunter.

### 3. Auf Mittwald hochladen
Laden Sie alle Dateien in das Webroot-Verzeichnis Ihrer Domain auf Mittwald hoch:
- Meist ist das `/html/` oder `/public_html/`

### 4. PHP-Konfiguration anpassen
Öffnen Sie die PHP-Dateien im `api/` Ordner und passen Sie die E-Mail-Adresse an:

```php
// In allen 4 PHP-Dateien ändern:
$to = "info@schreinerei-krickl.de";  // ← Ihre echte E-Mail-Adresse
```

### 5. Berechtigungen prüfen
Stellen Sie sicher, dass die PHP-Dateien ausführbar sind:
- Dateiberechtigungen: 644 für PHP-Dateien
- Ordnerberechtigungen: 755 für alle Ordner

## Wichtige Hinweise

- **E-Mail-Versand**: Die PHP-Dateien verwenden die `mail()` Funktion. Mittwald sollte dies standardmäßig unterstützen.
- **SSL/HTTPS**: Aktivieren Sie HTTPS für Ihre Domain in Mittwald.
- **Sitemap**: Die `robots.txt` verweist auf eine Sitemap. Sie können optional eine `sitemap.xml` erstellen.

## Ordner auf diesem Replit

```
/home/runner/workspace/
└── dist/
    └── public/          ← DIESEN ORDNER KOMPLETT HOCHLADEN
        ├── index.html
        ├── favicon.png
        ├── robots.txt
        ├── api/
        │   ├── contact.php
        │   ├── inquiry.php
        │   ├── service-inquiry.php
        │   └── application.php
        └── assets/
            └── (alle Asset-Dateien)
```

## Download

Sie können den `dist/public/` Ordner als ZIP herunterladen:
1. Klicken Sie im Replit-Dateibaum auf `dist/public/`
2. Rechtsklick → "Download as Zip"

Oder laden Sie die Dateien einzeln per FTP/SFTP auf Mittwald hoch.

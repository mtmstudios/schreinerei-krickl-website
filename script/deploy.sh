#!/bin/bash
set -e

echo "=== Schreinerei Krickl - Deploy Build ==="
echo ""

echo "1. Baue die Website..."
npm run build

echo ""
echo "2. Kopiere Build-Dateien nach public_html/..."
rm -rf public_html
mkdir -p public_html

cp -r dist/public/* public_html/
cp dist/public/.htaccess public_html/ 2>/dev/null || true
cp dist/public/.user.ini public_html/ 2>/dev/null || true

if [ -d "client/public/api" ]; then
  echo "   PHP-API Dateien kopiert"
  cp -r client/public/api public_html/
fi

echo ""
echo "3. Pruefe Ergebnis..."

ERRORS=0

if [ ! -f "public_html/index.html" ]; then
  echo "   FEHLER: index.html fehlt!"
  ERRORS=1
fi

if [ ! -f "public_html/.htaccess" ]; then
  echo "   FEHLER: .htaccess fehlt!"
  ERRORS=1
fi

if [ ! -d "public_html/assets" ]; then
  echo "   FEHLER: assets/ Ordner fehlt!"
  ERRORS=1
fi

if [ "$ERRORS" -eq 1 ]; then
  echo ""
  echo "=== BUILD FEHLGESCHLAGEN - Dateien fehlen! ==="
  exit 1
fi

echo "   index.html .... OK"
echo "   .htaccess ..... OK"
echo "   assets/ ....... OK"
echo ""
echo "   Alle Dateien in public_html/:"
ls -la public_html/

echo ""
echo "=== Build erfolgreich! ==="
echo ""
echo "Naechste Schritte:"
echo "  git add public_html/"
echo "  git commit -m 'Deploy: Website aktualisiert'"
echo "  git push mittwald main"
echo ""
echo "WICHTIG: Bei Mittwald muss das Document Root auf den"
echo "Ordner 'public_html' zeigen!"

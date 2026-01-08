<?php
/**
 * Kontaktformular - Schreinerei Krickl
 * Für Mittwald Hosting optimiert
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Methode nicht erlaubt']);
    exit;
}

// Konfiguration - HIER ANPASSEN
$empfaenger_email = 'anfragen@mtmstudios.de';
$absender_email = 'no-reply@mtmstudios.de';
$betreff_prefix = '[Kontaktanfrage] ';

// JSON-Daten einlesen
$input = json_decode(file_get_contents('php://input'), true);

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
    http_response_code(400);
    echo json_encode(['success' => false, 'errors' => $fehler]);
    exit;
}

// E-Mail zusammenstellen
$betreff = $betreff_prefix . 'Neue Anfrage von ' . $name;

$email_inhalt = "==============================================\n";
$email_inhalt .= "NEUE KONTAKTANFRAGE - SCHREINEREI KRICKL\n";
$email_inhalt .= "==============================================\n\n";
$email_inhalt .= "KONTAKTDATEN\n";
$email_inhalt .= "----------------------------------------------\n";
$email_inhalt .= "Name: " . $name . "\n";
$email_inhalt .= "E-Mail: " . $email . "\n";
if (!empty($telefon)) {
    $email_inhalt .= "Telefon: " . $telefon . "\n";
}
$email_inhalt .= "\n";
$email_inhalt .= "NACHRICHT\n";
$email_inhalt .= "----------------------------------------------\n";
$email_inhalt .= $nachricht . "\n\n";
$email_inhalt .= "----------------------------------------------\n";
$email_inhalt .= "Gesendet am: " . date('d.m.Y H:i:s') . "\n";
$email_inhalt .= "IP-Adresse: " . $_SERVER['REMOTE_ADDR'] . "\n";

// E-Mail-Header
$headers = "From: " . $absender_email . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// E-Mail senden
if (mail($empfaenger_email, $betreff, $email_inhalt, $headers)) {
    echo json_encode([
        'success' => true, 
        'message' => 'Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns schnellstmöglich bei Ihnen.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'error' => 'E-Mail konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.'
    ]);
}
?>

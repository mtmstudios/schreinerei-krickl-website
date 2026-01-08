<?php
/**
 * Service-spezifischer Anfrage-Funnel - Schreinerei Krickl
 * Für Mittwald Hosting optimiert
 * Verarbeitet alle Service-spezifischen Funnel-Daten
 */

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

// Konfiguration
$empfaenger_email = 'info@schreinerei-krickl.de';
$absender_email = 'noreply@schreinerei-krickl.de';

// JSON-Daten einlesen
$input = json_decode(file_get_contents('php://input'), true);

// Kontaktdaten
$name = trim(strip_tags($input['name'] ?? ''));
$email = trim(strip_tags($input['email'] ?? ''));
$telefon = trim(strip_tags($input['phone'] ?? ''));
$nachricht = trim(strip_tags($input['message'] ?? ''));

// Service-spezifische Daten
$service_name = trim(strip_tags($input['serviceName'] ?? 'Allgemeine Anfrage'));
$service_typ = trim(strip_tags($input['serviceType'] ?? ''));
$projektart = $input['projectType'] ?? '';
$raeume = $input['rooms'] ?? [];
$masse = $input['dimensions'] ?? '';
$stil = $input['style'] ?? '';
$materialien = $input['materials'] ?? [];
$farben = $input['colors'] ?? [];
$funktionen = $input['features'] ?? [];
$budget = $input['budget'] ?? '';
$zeitrahmen = $input['timeline'] ?? '';
$besonderheiten = trim(strip_tags($input['specialRequirements'] ?? ''));

// Validierung
$fehler = [];
if (empty($name)) $fehler[] = 'Name ist erforderlich';
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $fehler[] = 'Gültige E-Mail-Adresse ist erforderlich';
}

if (!empty($fehler)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'errors' => $fehler]);
    exit;
}

// Arrays zu Strings konvertieren
$raeume_str = is_array($raeume) ? implode(', ', $raeume) : $raeume;
$materialien_str = is_array($materialien) ? implode(', ', $materialien) : $materialien;
$farben_str = is_array($farben) ? implode(', ', $farben) : $farben;
$funktionen_str = is_array($funktionen) ? implode(', ', $funktionen) : $funktionen;

// E-Mail zusammenstellen
$betreff = '[' . $service_name . '] Anfrage von ' . $name;

$email_inhalt = "==============================================\n";
$email_inhalt .= strtoupper($service_name) . " - ANFRAGE\n";
$email_inhalt .= "==============================================\n\n";

$email_inhalt .= "KONTAKTDATEN\n";
$email_inhalt .= "----------------------------------------------\n";
$email_inhalt .= "Name: " . $name . "\n";
$email_inhalt .= "E-Mail: " . $email . "\n";
if (!empty($telefon)) {
    $email_inhalt .= "Telefon: " . $telefon . "\n";
}
$email_inhalt .= "\n";

$email_inhalt .= "PROJEKTDETAILS\n";
$email_inhalt .= "----------------------------------------------\n";
$email_inhalt .= "Service: " . $service_name . "\n";
if (!empty($service_typ)) {
    $email_inhalt .= "Typ: " . $service_typ . "\n";
}
if (!empty($projektart)) {
    $email_inhalt .= "Projektart: " . $projektart . "\n";
}
if (!empty($raeume_str)) {
    $email_inhalt .= "Räume: " . $raeume_str . "\n";
}
if (!empty($masse)) {
    $email_inhalt .= "Maße: " . $masse . "\n";
}
if (!empty($stil)) {
    $email_inhalt .= "Stil: " . $stil . "\n";
}
if (!empty($materialien_str)) {
    $email_inhalt .= "Materialien: " . $materialien_str . "\n";
}
if (!empty($farben_str)) {
    $email_inhalt .= "Farben: " . $farben_str . "\n";
}
if (!empty($funktionen_str)) {
    $email_inhalt .= "Gewünschte Funktionen: " . $funktionen_str . "\n";
}
if (!empty($budget)) {
    $email_inhalt .= "Budgetrahmen: " . $budget . "\n";
}
if (!empty($zeitrahmen)) {
    $email_inhalt .= "Zeitrahmen: " . $zeitrahmen . "\n";
}
$email_inhalt .= "\n";

if (!empty($besonderheiten)) {
    $email_inhalt .= "BESONDERE ANFORDERUNGEN\n";
    $email_inhalt .= "----------------------------------------------\n";
    $email_inhalt .= $besonderheiten . "\n\n";
}

if (!empty($nachricht)) {
    $email_inhalt .= "ZUSÄTZLICHE NACHRICHT\n";
    $email_inhalt .= "----------------------------------------------\n";
    $email_inhalt .= $nachricht . "\n\n";
}

$email_inhalt .= "----------------------------------------------\n";
$email_inhalt .= "Gesendet am: " . date('d.m.Y H:i:s') . "\n";
$email_inhalt .= "IP-Adresse: " . $_SERVER['REMOTE_ADDR'] . "\n";

// E-Mail-Header
$headers = "From: " . $absender_email . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

if (mail($empfaenger_email, $betreff, $email_inhalt, $headers)) {
    echo json_encode([
        'success' => true, 
        'message' => 'Ihre Anfrage wurde erfolgreich gesendet. Wir melden uns innerhalb von 24 Stunden bei Ihnen.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'error' => 'E-Mail konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.'
    ]);
}
?>

<?php
/**
 * Bewerbungs-Funnel - Schreinerei Krickl
 * Für Mittwald Hosting optimiert
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
$empfaenger_email = 'bewerbung@schreinerei-krickl.de';
$absender_email = 'noreply@schreinerei-krickl.de';
$betreff_prefix = '[Bewerbung] ';

// JSON-Daten einlesen
$input = json_decode(file_get_contents('php://input'), true);

// Kontaktdaten
$name = trim(strip_tags($input['name'] ?? ''));
$email = trim(strip_tags($input['email'] ?? ''));
$telefon = trim(strip_tags($input['phone'] ?? ''));

// Bewerbungsdaten
$position = $input['position'] ?? '';
$erfahrung = $input['experience'] ?? '';
$qualifikationen = $input['qualifications'] ?? [];
$verfuegbarkeit = $input['availability'] ?? '';
$gehaltsvorstellung = $input['salary'] ?? '';
$motivation = trim(strip_tags($input['motivation'] ?? ''));
$startdatum = $input['startDate'] ?? '';

// Validierung
$fehler = [];
if (empty($name)) $fehler[] = 'Name ist erforderlich';
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $fehler[] = 'Gültige E-Mail-Adresse ist erforderlich';
}
if (empty($telefon)) $fehler[] = 'Telefonnummer ist erforderlich';

if (!empty($fehler)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'errors' => $fehler]);
    exit;
}

// Arrays zu Strings konvertieren
$qualifikationen_str = is_array($qualifikationen) ? implode(', ', $qualifikationen) : $qualifikationen;

// E-Mail zusammenstellen
$betreff = $betreff_prefix . $position . ' - ' . $name;

$email_inhalt = "==============================================\n";
$email_inhalt .= "NEUE BEWERBUNG - SCHREINEREI KRICKL\n";
$email_inhalt .= "==============================================\n\n";

$email_inhalt .= "KONTAKTDATEN\n";
$email_inhalt .= "----------------------------------------------\n";
$email_inhalt .= "Name: " . $name . "\n";
$email_inhalt .= "E-Mail: " . $email . "\n";
$email_inhalt .= "Telefon: " . $telefon . "\n\n";

$email_inhalt .= "BEWERBUNGSDETAILS\n";
$email_inhalt .= "----------------------------------------------\n";
if (!empty($position)) {
    $email_inhalt .= "Position: " . $position . "\n";
}
if (!empty($erfahrung)) {
    $email_inhalt .= "Berufserfahrung: " . $erfahrung . "\n";
}
if (!empty($qualifikationen_str)) {
    $email_inhalt .= "Qualifikationen: " . $qualifikationen_str . "\n";
}
if (!empty($verfuegbarkeit)) {
    $email_inhalt .= "Verfügbarkeit: " . $verfuegbarkeit . "\n";
}
if (!empty($startdatum)) {
    $email_inhalt .= "Möglicher Starttermin: " . $startdatum . "\n";
}
if (!empty($gehaltsvorstellung)) {
    $email_inhalt .= "Gehaltsvorstellung: " . $gehaltsvorstellung . "\n";
}
$email_inhalt .= "\n";

if (!empty($motivation)) {
    $email_inhalt .= "MOTIVATION\n";
    $email_inhalt .= "----------------------------------------------\n";
    $email_inhalt .= $motivation . "\n\n";
}

$email_inhalt .= "----------------------------------------------\n";
$email_inhalt .= "Gesendet am: " . date('d.m.Y H:i:s') . "\n";
$email_inhalt .= "IP-Adresse: " . $_SERVER['REMOTE_ADDR'] . "\n";
$email_inhalt .= "\n";
$email_inhalt .= "HINWEIS: Eventuelle Dateianhänge (Lebenslauf etc.) \n";
$email_inhalt .= "müssen über einen separaten Upload-Dienst bereitgestellt werden.\n";

// E-Mail-Header
$headers = "From: " . $absender_email . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

if (mail($empfaenger_email, $betreff, $email_inhalt, $headers)) {
    echo json_encode([
        'success' => true, 
        'message' => 'Ihre Bewerbung wurde erfolgreich gesendet. Wir melden uns zeitnah bei Ihnen.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'error' => 'E-Mail konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.'
    ]);
}
?>

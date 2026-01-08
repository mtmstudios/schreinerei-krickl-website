<?php
/**
 * Bewerbungs-Funnel - Schreinerei Krickl
 * Für Mittwald Hosting optimiert
 * Mit professionellem HTML-E-Mail-Template
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

// Konfiguration
$empfaenger_email = 'no-reply@www.mtmstudios.de';
$absender_email = 'no-reply@www.mtmstudios.de';
$betreff_prefix = '[Bewerbung] ';

// JSON-Daten einlesen
$raw_input = file_get_contents('php://input');
error_log("Application Form - Raw Input: " . $raw_input);

$input = json_decode($raw_input, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    error_log("Application Form - JSON Error: " . json_last_error_msg());
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Ungültige JSON-Daten']);
    exit;
}

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
    error_log("Application Form - Validation Errors: " . implode(', ', $fehler));
    http_response_code(400);
    echo json_encode(['success' => false, 'errors' => $fehler]);
    exit;
}

// Arrays zu Strings konvertieren
$qualifikationen_str = is_array($qualifikationen) ? implode(', ', $qualifikationen) : $qualifikationen;

// E-Mail-Betreff
$betreff = $betreff_prefix . $position . ' - ' . $name;

// Helper-Funktion für Detail-Zeile
function renderDetailRow($label, $value) {
    if (empty($value)) return '';
    return '<tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
            <span style="color: #888; font-size: 13px; display: block; margin-bottom: 4px;">' . $label . '</span>
            <span style="color: #333; font-size: 15px; font-weight: 500;">' . htmlspecialchars($value) . '</span>
        </td>
    </tr>';
}

// HTML-E-Mail-Template
$email_inhalt = '<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, \'Helvetica Neue\', Arial, sans-serif; background-color: #f5f5f0;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f0;">
        <tr>
            <td style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); padding: 30px 40px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">Schreinerei Krickl</h1>
                            <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">Meisterbetrieb seit 1962</p>
                        </td>
                    </tr>
                    
                    <!-- Badge -->
                    <tr>
                        <td style="padding: 25px 40px 0 40px; text-align: center;">
                            <span style="display: inline-block; background-color: #059669; color: white; padding: 8px 20px; border-radius: 20px; font-size: 14px; font-weight: 600;">Neue Bewerbung</span>
                        </td>
                    </tr>
                    
                    <!-- Position -->
                    <tr>
                        <td style="padding: 15px 40px 0 40px; text-align: center;">
                            <h2 style="margin: 0; color: #333; font-size: 20px;">' . htmlspecialchars($position) . '</h2>
                        </td>
                    </tr>
                    
                    <!-- Title -->
                    <tr>
                        <td style="padding: 15px 40px 25px 40px; text-align: center; border-bottom: 1px solid #eee;">
                            <p style="margin: 0; color: #666; font-size: 14px;">Eingegangen am ' . date('d.m.Y') . ' um ' . date('H:i') . ' Uhr</p>
                        </td>
                    </tr>
                    
                    <!-- Applicant Details -->
                    <tr>
                        <td style="padding: 25px 40px;">
                            <h3 style="margin: 0 0 15px 0; color: #059669; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Bewerber</h3>
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f0fdf4; border-radius: 6px; border-left: 4px solid #059669;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <p style="margin: 0 0 10px 0; font-size: 18px;"><strong style="color: #333;">' . htmlspecialchars($name) . '</strong></p>
                                        <p style="margin: 0 0 5px 0;"><a href="mailto:' . htmlspecialchars($email) . '" style="color: #059669; text-decoration: none;">' . htmlspecialchars($email) . '</a></p>
                                        <p style="margin: 0;"><a href="tel:' . htmlspecialchars($telefon) . '" style="color: #059669; text-decoration: none;">' . htmlspecialchars($telefon) . '</a></p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Application Details -->
                    <tr>
                        <td style="padding: 0 40px 25px 40px;">
                            <h3 style="margin: 0 0 15px 0; color: #059669; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Bewerbungsdetails</h3>
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">';

$email_inhalt .= renderDetailRow('Position', $position);
$email_inhalt .= renderDetailRow('Berufserfahrung', $erfahrung);
$email_inhalt .= renderDetailRow('Qualifikationen', $qualifikationen_str);
$email_inhalt .= renderDetailRow('Verfügbarkeit', $verfuegbarkeit);
$email_inhalt .= renderDetailRow('Möglicher Starttermin', $startdatum);
$email_inhalt .= renderDetailRow('Gehaltsvorstellung', $gehaltsvorstellung);

$email_inhalt .= '
                            </table>
                        </td>
                    </tr>';

if (!empty($motivation)) {
    $email_inhalt .= '
                    <!-- Motivation -->
                    <tr>
                        <td style="padding: 0 40px 25px 40px;">
                            <h3 style="margin: 0 0 15px 0; color: #059669; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Motivation</h3>
                            <div style="background-color: #faf9f7; border-radius: 6px; padding: 20px; border-left: 4px solid #059669;">
                                <p style="margin: 0; color: #333; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">' . htmlspecialchars($motivation) . '</p>
                            </div>
                        </td>
                    </tr>';
}

$email_inhalt .= '
                    <!-- Action Buttons -->
                    <tr>
                        <td style="padding: 10px 40px 30px 40px; text-align: center;">
                            <a href="mailto:' . htmlspecialchars($email) . '?subject=Ihre Bewerbung bei Schreinerei Krickl - ' . htmlspecialchars($position) . '" style="display: inline-block; background-color: #059669; color: #ffffff; padding: 14px 30px; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 6px; margin: 5px;">Bewerber kontaktieren</a>
                            <a href="tel:' . htmlspecialchars($telefon) . '" style="display: inline-block; background-color: #ffffff; color: #059669; padding: 14px 30px; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 6px; border: 2px solid #059669; margin: 5px;">Anrufen</a>
                        </td>
                    </tr>
                    
                    <!-- Note -->
                    <tr>
                        <td style="padding: 0 40px 25px 40px;">
                            <div style="background-color: #fef3c7; border-radius: 6px; padding: 15px; text-align: center;">
                                <p style="margin: 0; color: #92400e; font-size: 13px;">
                                    Eventuelle Dateianhänge (Lebenslauf, Zeugnisse) können per E-Mail angefordert werden.
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8f7f5; padding: 25px 40px; border-top: 1px solid #eee;">
                            <p style="margin: 0; color: #888; font-size: 12px; text-align: center;">
                                Diese E-Mail wurde automatisch generiert.<br>
                                Schreinerei Krickl | Esslingen am Neckar
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>';

// E-Mail-Header für HTML
$headers = "From: " . $absender_email . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=utf-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

error_log("Application Form - Attempting to send email to: " . $empfaenger_email);
error_log("Application Form - From: " . $absender_email);
error_log("Application Form - Subject: " . $betreff);

$mail_result = mail($empfaenger_email, $betreff, $email_inhalt, $headers);

if ($mail_result) {
    error_log("Application Form - Email sent successfully");
    echo json_encode([
        'success' => true, 
        'message' => 'Ihre Bewerbung wurde erfolgreich gesendet. Wir melden uns zeitnah bei Ihnen.'
    ]);
} else {
    $last_error = error_get_last();
    error_log("Application Form - Email failed. Last error: " . print_r($last_error, true));
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'error' => 'E-Mail konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.'
    ]);
}
?>

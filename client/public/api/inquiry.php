<?php
/**
 * Anfrage-Funnel - Schreinerei Krickl
 * Für Mittwald Hosting optimiert
 * Mit professionellem HTML-E-Mail-Template
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
$empfaenger_email = 'anfragen@mtmstudios.de';
$absender_email = 'no-reply@mtmstudios.de';
$betreff_prefix = '[Projektanfrage] ';

// JSON-Daten einlesen
$input = json_decode(file_get_contents('php://input'), true);

// Kontaktdaten
$name = trim(strip_tags($input['name'] ?? ''));
$email = trim(strip_tags($input['email'] ?? ''));
$telefon = trim(strip_tags($input['phone'] ?? ''));
$nachricht = trim(strip_tags($input['message'] ?? ''));

// Funnel-Daten
$projekttyp = $input['projectType'] ?? '';
$raeume = $input['rooms'] ?? [];
$services = $input['services'] ?? [];
$budget = $input['budget'] ?? '';
$zeitrahmen = $input['timeline'] ?? '';
$stil = $input['style'] ?? '';
$materialien = $input['materials'] ?? [];
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
$services_str = is_array($services) ? implode(', ', $services) : $services;
$materialien_str = is_array($materialien) ? implode(', ', $materialien) : $materialien;

// E-Mail-Betreff
$betreff = $betreff_prefix . 'Neue Projektanfrage von ' . $name;

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
                        <td style="background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%); padding: 30px 40px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">Schreinerei Krickl</h1>
                            <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">Meisterbetrieb seit 1962</p>
                        </td>
                    </tr>
                    
                    <!-- Badge -->
                    <tr>
                        <td style="padding: 25px 40px 0 40px; text-align: center;">
                            <span style="display: inline-block; background-color: #22c55e; color: white; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Neue Projektanfrage</span>
                        </td>
                    </tr>
                    
                    <!-- Title -->
                    <tr>
                        <td style="padding: 20px 40px; text-align: center; border-bottom: 1px solid #eee;">
                            <p style="margin: 0; color: #666; font-size: 14px;">Eingegangen am ' . date('d.m.Y') . ' um ' . date('H:i') . ' Uhr</p>
                        </td>
                    </tr>
                    
                    <!-- Contact Details -->
                    <tr>
                        <td style="padding: 25px 40px;">
                            <h3 style="margin: 0 0 15px 0; color: #8B4513; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Kontaktdaten</h3>
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #faf9f7; border-radius: 6px; padding: 15px;">
                                <tr>
                                    <td style="padding: 15px;">
                                        <p style="margin: 0 0 10px 0;"><strong style="color: #333;">' . htmlspecialchars($name) . '</strong></p>
                                        <p style="margin: 0 0 5px 0;"><a href="mailto:' . htmlspecialchars($email) . '" style="color: #8B4513; text-decoration: none;">' . htmlspecialchars($email) . '</a></p>';
if (!empty($telefon)) {
    $email_inhalt .= '<p style="margin: 0;"><a href="tel:' . htmlspecialchars($telefon) . '" style="color: #8B4513; text-decoration: none;">' . htmlspecialchars($telefon) . '</a></p>';
}
$email_inhalt .= '
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Project Details -->
                    <tr>
                        <td style="padding: 0 40px 25px 40px;">
                            <h3 style="margin: 0 0 15px 0; color: #8B4513; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Projektdetails</h3>
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">';

$email_inhalt .= renderDetailRow('Projekttyp', $projekttyp);
$email_inhalt .= renderDetailRow('Gewünschte Leistungen', $services_str);
$email_inhalt .= renderDetailRow('Räume', $raeume_str);
$email_inhalt .= renderDetailRow('Stil', $stil);
$email_inhalt .= renderDetailRow('Materialien', $materialien_str);
$email_inhalt .= renderDetailRow('Budgetrahmen', $budget);
$email_inhalt .= renderDetailRow('Zeitrahmen', $zeitrahmen);

$email_inhalt .= '
                            </table>
                        </td>
                    </tr>';

if (!empty($besonderheiten)) {
    $email_inhalt .= '
                    <!-- Special Requirements -->
                    <tr>
                        <td style="padding: 0 40px 25px 40px;">
                            <h3 style="margin: 0 0 15px 0; color: #8B4513; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Besondere Anforderungen</h3>
                            <div style="background-color: #fff8e1; border-radius: 6px; padding: 15px; border-left: 4px solid #f59e0b;">
                                <p style="margin: 0; color: #333; font-size: 14px; line-height: 1.6;">' . htmlspecialchars($besonderheiten) . '</p>
                            </div>
                        </td>
                    </tr>';
}

if (!empty($nachricht)) {
    $email_inhalt .= '
                    <!-- Additional Message -->
                    <tr>
                        <td style="padding: 0 40px 25px 40px;">
                            <h3 style="margin: 0 0 15px 0; color: #8B4513; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Zusätzliche Nachricht</h3>
                            <div style="background-color: #faf9f7; border-radius: 6px; padding: 15px; border-left: 4px solid #8B4513;">
                                <p style="margin: 0; color: #333; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">' . htmlspecialchars($nachricht) . '</p>
                            </div>
                        </td>
                    </tr>';
}

$email_inhalt .= '
                    <!-- Action Button -->
                    <tr>
                        <td style="padding: 10px 40px 30px 40px; text-align: center;">
                            <a href="mailto:' . htmlspecialchars($email) . '?subject=Re: Ihre Projektanfrage bei Schreinerei Krickl" style="display: inline-block; background-color: #8B4513; color: #ffffff; padding: 14px 30px; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 6px;">Jetzt antworten</a>
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

if (mail($empfaenger_email, $betreff, $email_inhalt, $headers)) {
    echo json_encode([
        'success' => true, 
        'message' => 'Ihre Projektanfrage wurde erfolgreich gesendet. Wir melden uns innerhalb von 24 Stunden bei Ihnen.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'error' => 'E-Mail konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.'
    ]);
}
?>

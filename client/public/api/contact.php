<?php
/**
 * Kontaktformular - Schreinerei Krickl
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

// E-Mail-Betreff
$betreff = $betreff_prefix . 'Neue Anfrage von ' . $name;

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
                    
                    <!-- Title -->
                    <tr>
                        <td style="padding: 30px 40px 20px 40px; border-bottom: 1px solid #eee;">
                            <h2 style="margin: 0; color: #333; font-size: 20px; font-weight: 600;">Neue Kontaktanfrage</h2>
                            <p style="margin: 8px 0 0 0; color: #666; font-size: 14px;">Eingegangen am ' . date('d.m.Y') . ' um ' . date('H:i') . ' Uhr</p>
                        </td>
                    </tr>
                    
                    <!-- Contact Details -->
                    <tr>
                        <td style="padding: 25px 40px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="margin: 0 0 5px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Name</p>
                                        <p style="margin: 0; color: #333; font-size: 16px; font-weight: 500;">' . htmlspecialchars($name) . '</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="margin: 0 0 5px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">E-Mail</p>
                                        <p style="margin: 0;"><a href="mailto:' . htmlspecialchars($email) . '" style="color: #8B4513; font-size: 16px; text-decoration: none;">' . htmlspecialchars($email) . '</a></p>
                                    </td>
                                </tr>';

if (!empty($telefon)) {
    $email_inhalt .= '
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="margin: 0 0 5px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Telefon</p>
                                        <p style="margin: 0;"><a href="tel:' . htmlspecialchars($telefon) . '" style="color: #8B4513; font-size: 16px; text-decoration: none;">' . htmlspecialchars($telefon) . '</a></p>
                                    </td>
                                </tr>';
}

$email_inhalt .= '
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Message -->
                    <tr>
                        <td style="padding: 0 40px 30px 40px;">
                            <div style="background-color: #faf9f7; border-radius: 6px; padding: 20px; border-left: 4px solid #8B4513;">
                                <p style="margin: 0 0 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Nachricht</p>
                                <p style="margin: 0; color: #333; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">' . htmlspecialchars($nachricht) . '</p>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Action Button -->
                    <tr>
                        <td style="padding: 0 40px 30px 40px; text-align: center;">
                            <a href="mailto:' . htmlspecialchars($email) . '?subject=Re: Ihre Anfrage bei Schreinerei Krickl" style="display: inline-block; background-color: #8B4513; color: #ffffff; padding: 14px 30px; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 6px;">Jetzt antworten</a>
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

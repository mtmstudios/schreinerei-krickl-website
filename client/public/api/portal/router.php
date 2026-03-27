<?php
/**
 * Krickl Portal API Router
 * Handles all /api/portal/* requests on Mittwald (PHP hosting)
 * Data stored in api/portal/data/inquiries.json
 */

session_start();

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: GET, POST, PATCH, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Portal-Secret');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ── Config ────────────────────────────────────────────────────────────────
$PORTAL_USER    = getenv('PORTAL_USERNAME') ?: 'krickl';
$PORTAL_PASS    = getenv('PORTAL_PASSWORD') ?: 'Krickl8417!';
$WEBHOOK_SECRET = getenv('PORTAL_WEBHOOK_SECRET') ?: 'krickl-portal-34824aa5e0a92534';
$DATA_FILE      = __DIR__ . '/data/inquiries.json';

// ── Route parsing ─────────────────────────────────────────────────────────
$path   = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$route  = trim(preg_replace('#^/api/portal/?#', '', $path), '/');
$method = $_SERVER['REQUEST_METHOD'];

// ── Helpers ───────────────────────────────────────────────────────────────
function loadInquiries(string $file): array {
    if (!file_exists($file)) return [];
    return json_decode(file_get_contents($file), true) ?: [];
}

function saveInquiries(string $file, array $inquiries): void {
    $dir = dirname($file);
    if (!is_dir($dir)) mkdir($dir, 0755, true);
    file_put_contents($file, json_encode(array_values($inquiries), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);
}

function requireAuth(): void {
    if (empty($_SESSION['portal_authenticated'])) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Nicht angemeldet']);
        exit;
    }
}

function getBody(): array {
    return json_decode(file_get_contents('php://input'), true) ?? [];
}

function newId(): string {
    return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        mt_rand(0, 0xffff), mt_rand(0, 0xffff),
        mt_rand(0, 0xffff),
        mt_rand(0, 0x0fff) | 0x4000,
        mt_rand(0, 0x3fff) | 0x8000,
        mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
    );
}

// ── Router ────────────────────────────────────────────────────────────────

// POST /api/portal/login
if ($route === 'login' && $method === 'POST') {
    $body = getBody();
    if (($body['username'] ?? '') === $PORTAL_USER && ($body['password'] ?? '') === $PORTAL_PASS) {
        $_SESSION['portal_authenticated'] = true;
        echo json_encode(['success' => true]);
    } else {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Ungültige Anmeldedaten']);
    }
    exit;
}

// POST /api/portal/logout
if ($route === 'logout') {
    session_destroy();
    echo json_encode(['success' => true]);
    exit;
}

// GET /api/portal/me
if ($route === 'me') {
    echo json_encode(['authenticated' => !empty($_SESSION['portal_authenticated'])]);
    exit;
}

// POST /api/portal/inbound  (n8n webhook)
if ($route === 'inbound' && $method === 'POST') {
    $provided = $_SERVER['HTTP_X_PORTAL_SECRET'] ?? '';
    if ($provided !== $WEBHOOK_SECRET) {
        http_response_code(403);
        echo json_encode(['success' => false, 'message' => 'Unauthorized']);
        exit;
    }
    $body      = getBody();
    $inquiries = loadInquiries($DATA_FILE);
    $inquiries[] = [
        'id'            => newId(),
        'createdAt'     => date('c'),
        'source'        => 'phone',
        'callerPhone'   => $body['caller_phone'] ?? null,
        'callerName'    => null,
        'callerEmail'   => null,
        'subject'       => $body['subject'] ?? 'Anruf',
        'summary'       => $body['summary'] ?? null,
        'intent'        => $body['intent'] ?? null,
        'sentiment'     => $body['sentiment'] ?? null,
        'emailBody'     => $body['email_body'] ?? null,
        'status'        => 'new',
        'internalNotes' => null,
    ];
    saveInquiries($DATA_FILE, $inquiries);
    echo json_encode(['success' => true]);
    exit;
}

// POST /api/portal/chat  (chat widget)
if ($route === 'chat' && $method === 'POST') {
    $body = getBody();
    if (empty($body['name']) || empty($body['message'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Name und Nachricht sind erforderlich']);
        exit;
    }
    $msg       = $body['message'];
    $inquiries = loadInquiries($DATA_FILE);
    $inquiries[] = [
        'id'            => newId(),
        'createdAt'     => date('c'),
        'source'        => 'chat',
        'callerPhone'   => $body['phone'] ?? null,
        'callerName'    => $body['name'],
        'callerEmail'   => $body['email'] ?? null,
        'subject'       => 'Chat: ' . (mb_strlen($msg) > 60 ? mb_substr($msg, 0, 60) . '…' : $msg),
        'summary'       => $msg,
        'intent'        => null,
        'sentiment'     => null,
        'emailBody'     => null,
        'status'        => 'new',
        'internalNotes' => null,
    ];
    saveInquiries($DATA_FILE, $inquiries);
    echo json_encode(['success' => true, 'message' => 'Nachricht gesendet. Wir melden uns bald.']);
    exit;
}

// GET /api/portal/inquiries
if ($route === 'inquiries' && $method === 'GET') {
    requireAuth();
    $inquiries = loadInquiries($DATA_FILE);
    if (!empty($_GET['status'])) {
        $s = $_GET['status'];
        $inquiries = array_filter($inquiries, fn($i) => $i['status'] === $s);
    }
    if (!empty($_GET['source'])) {
        $s = $_GET['source'];
        $inquiries = array_filter($inquiries, fn($i) => $i['source'] === $s);
    }
    usort($inquiries, fn($a, $b) => strcmp($b['createdAt'], $a['createdAt']));
    echo json_encode(['success' => true, 'data' => array_values($inquiries)]);
    exit;
}

// PATCH /api/portal/inquiries/{id}
if (preg_match('#^inquiries/([a-f0-9\-]+)$#', $route, $m) && $method === 'PATCH') {
    requireAuth();
    $id        = $m[1];
    $body      = getBody();
    $inquiries = loadInquiries($DATA_FILE);
    $updated   = null;
    foreach ($inquiries as &$inquiry) {
        if ($inquiry['id'] === $id) {
            if (isset($body['status']))       $inquiry['status']        = $body['status'];
            if (array_key_exists('internalNotes', $body)) $inquiry['internalNotes'] = $body['internalNotes'];
            $updated = $inquiry;
            break;
        }
    }
    unset($inquiry);
    if (!$updated) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Nicht gefunden']);
        exit;
    }
    saveInquiries($DATA_FILE, $inquiries);
    echo json_encode(['success' => true, 'data' => $updated]);
    exit;
}

// GET /api/portal/stats
if ($route === 'stats' && $method === 'GET') {
    requireAuth();
    $inquiries    = loadInquiries($DATA_FILE);
    $intentCounts = [];
    foreach ($inquiries as $i) {
        $key = null;
        if (!empty($i['intent'])) {
            $key = mb_substr($i['intent'], 0, 40);
        } elseif (!empty($i['subject'])) {
            $key = trim(preg_replace('/^(Anfrage:|Chat:|Anruf:?\s*)/iu', '', $i['subject']));
            $key = mb_substr($key, 0, 40);
        }
        if ($key) $intentCounts[$key] = ($intentCounts[$key] ?? 0) + 1;
    }
    arsort($intentCounts);
    $topIntents = [];
    foreach (array_slice($intentCounts, 0, 10, true) as $name => $count) {
        $topIntents[] = ['name' => $name, 'count' => $count];
    }
    echo json_encode(['success' => true, 'data' => [
        'total'       => count($inquiries),
        'new'         => count(array_filter($inquiries, fn($i) => $i['status'] === 'new')),
        'in_progress' => count(array_filter($inquiries, fn($i) => $i['status'] === 'in_progress')),
        'done'        => count(array_filter($inquiries, fn($i) => $i['status'] === 'done')),
        'phone'       => count(array_filter($inquiries, fn($i) => $i['source'] === 'phone')),
        'chat'        => count(array_filter($inquiries, fn($i) => $i['source'] === 'chat')),
        'topIntents'  => $topIntents,
    ]]);
    exit;
}

http_response_code(404);
echo json_encode(['success' => false, 'message' => 'Route nicht gefunden']);

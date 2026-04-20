<?php
/**
 * SEO Meta-Tag Helper für Schreinerei Krickl SPA
 *
 * Liest die index.html und ersetzt Title, Description, Canonical und OG-Tags
 * serverseitig, damit Google die richtigen Meta-Tags sieht.
 */
function renderWithMeta($title, $description, $canonical, $keywords = '') {
    $html = file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/index.html');

    // Title
    $html = preg_replace(
        '/<title>[^<]*<\/title>/',
        '<title>' . htmlspecialchars($title) . '</title>',
        $html
    );

    // Meta Description
    $html = preg_replace(
        '/<meta name="description" content="[^"]*"/',
        '<meta name="description" content="' . htmlspecialchars($description) . '"',
        $html
    );

    // Meta Keywords
    if ($keywords) {
        $html = preg_replace(
            '/<meta name="keywords" content="[^"]*"/',
            '<meta name="keywords" content="' . htmlspecialchars($keywords) . '"',
            $html
        );
    }

    // Canonical
    $html = preg_replace(
        '/<link rel="canonical" href="[^"]*"/',
        '<link rel="canonical" href="' . htmlspecialchars($canonical) . '"',
        $html
    );

    // OG Title
    $html = preg_replace(
        '/<meta property="og:title" content="[^"]*"/',
        '<meta property="og:title" content="' . htmlspecialchars($title) . '"',
        $html
    );

    // OG Description
    $html = preg_replace(
        '/<meta property="og:description" content="[^"]*"/',
        '<meta property="og:description" content="' . htmlspecialchars($description) . '"',
        $html
    );

    // OG URL
    $html = preg_replace(
        '/<meta property="og:url" content="[^"]*"/',
        '<meta property="og:url" content="' . htmlspecialchars($canonical) . '"',
        $html
    );

    // Twitter Title
    $html = preg_replace(
        '/<meta name="twitter:title" content="[^"]*"/',
        '<meta name="twitter:title" content="' . htmlspecialchars($title) . '"',
        $html
    );

    // Twitter Description
    $html = preg_replace(
        '/<meta name="twitter:description" content="[^"]*"/',
        '<meta name="twitter:description" content="' . htmlspecialchars($description) . '"',
        $html
    );

    echo $html;
}

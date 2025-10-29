<?php

// 🔥 LIMPEZA DE BUFFERS ANTES DE QUALQUER COISA
while (ob_get_level()) {
    ob_end_clean();
}

// 🔥 SESSAO DEVE VIR ANTES DE QUALQUER OUTPUT
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

header("Access-Control-Allow-Origin: http://localhost:5173"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json; charset=utf-8'); // 🔥 FORCE JSON

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

ini_set('display_errors', 0);
ini_set('log_errors', 1);

use App\Core\Router;
use Throwable;

require_once __DIR__ . '/../vendor/autoload.php';

try {
    require_once __DIR__ . '/../routes/api.php';
    Router::dispatch();

} catch (Throwable $e) {
    // 🔥 LIMPE BUFFER ANTES DO ERRO
    while (ob_get_level()) {
        ob_end_clean();
    }
    
    $errorCode = ($e->getCode() == 404) ? 404 : 500;
    http_response_code($errorCode); 
    
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
        'file' => $e->getFile(),
        'line' => $e->getLine(),
    ]);
}
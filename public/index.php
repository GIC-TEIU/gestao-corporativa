<?php

header("Access-Control-Allow-Origin: http://localhost:5173"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

ini_set('display_errors', 0);
ini_set('log_errors', 1);

use App\Core\Router;
use Throwable;

session_start();

require_once __DIR__ . '/../vendor/autoload.php';

header('Content-Type: application/json');

try {

    require_once __DIR__ . '/../routes/api.php';

    Router::dispatch();

} catch (Throwable $e) {

    $errorCode = ($e->getCode() == 404) ? 404 : 500;
    http_response_code($errorCode); 
    
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
        'file' => $e->getFile(),
        'line' => $e->getLine(),
    ]);
}


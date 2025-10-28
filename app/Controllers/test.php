<?php
// public/test-auth.php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Incluir manualmente todas as dependências
require_once __DIR__ . '/../app/Models/User.php';
require_once __DIR__ . '/../app/Controllers/AuthController.php';

// Criar instância e chamar login
$auth = new App\Controllers\AuthController();
$auth->login();
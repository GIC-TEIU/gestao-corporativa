<?php
// Mapeia as URLs /register, /login e /logout para os métodos de um novo controller de autenticação.
// aqui ficarão as rotas de todas as apis

use App\Controllers\AuthController;

// rotas de autenticação
Router::post('/api/register', [AuthController::class, 'register']);
Router::post('/api/login', [AuthController::class, 'login']);
Router::post('/api/logout', [AuthController::class, 'logout']);

Router::get('/api/lookups/rap-form', [LookupController::class, 'getRapFormData']);




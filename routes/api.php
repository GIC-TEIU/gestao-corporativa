<?php
use App\Core\Router;
use App\Controllers\AuthController;
use App\Controllers\LookupController;

// rotas de autenticação
Router::post('/api/register', [AuthController::class, 'register']);
Router::post('/api/login', [AuthController::class, 'login']);
Router::post('/api/logout', [AuthController::class, 'logout']);
Router::get('/api/user', [AuthController::class, 'getCurrentUser']);

Router::get('/api/lookups/rap-form', [LookupController::class, 'getRapFormData']);
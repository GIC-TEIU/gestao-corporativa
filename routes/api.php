<?php

use App\Core\Router;
use App\Controllers\AuthController;
use App\Controllers\LookupController;
use App\Controllers\UserManagementController;

/**
 * =========================================================
 * ROTAS DE AUTENTICAÇÃO
 * =========================================================
 */
Router::post('/api/login', [AuthController::class, 'login']);
Router::post('/api/logout', [AuthController::class, 'logout']);
Router::post('/api/register', [AuthController::class, 'register']);

// Rota para verificar sessão
Router::get('/api/check-session', [AuthController::class, 'checkSession']);

// Usuário logado (compatibilidade com versões antigas)
Router::get('/api/current-user', [AuthController::class, 'getCurrentUser']);
Router::get('/api/user', [AuthController::class, 'getCurrentUser']);


/**
 * =========================================================
 * ROTAS DE LOOKUP (dados auxiliares)
 * =========================================================
 */
Router::get('/api/lookups/rap-form', [LookupController::class, 'getRapFormData']);


/**
 * =========================================================
 * ROTAS DE GERENCIAMENTO DE USUÁRIOS
 * =========================================================
 */

// Rotas simplificadas herdadas do bloco anterior
Router::get('/api/users', [UserManagementController::class, 'getUsers']);
Router::get('/api/users/{id}/permissions', [UserManagementController::class, 'getUserPermissions']);

// Novas rotas completas de gestão de usuários
Router::get('/api/user-management', [UserManagementController::class, 'index']);
Router::get('/api/user-management/search', [UserManagementController::class, 'search']); // ✅ Rota de busca
Router::get('/api/user-management/history', [UserManagementController::class, 'history']); // ✅ Rota de histórico
Router::get('/api/user-management/permissions', [UserManagementController::class, 'getPermissions']);
Router::get('/api/user-management/{id}', [UserManagementController::class, 'show']);
Router::post('/api/user-management', [UserManagementController::class, 'store']);
Router::put('/api/user-management/{id}', [UserManagementController::class, 'update']);
Router::delete('/api/user-management/{id}', [UserManagementController::class, 'destroy']);
Router::get('/api/user-management/{id}/history', [UserManagementController::class, 'getPermissionHistory']);

// Rota específica para permissões
Router::put('/api/user-management/{id}/permissions', [UserManagementController::class, 'updatePermissions']);
<?php

use App\Core\Router;
use App\Controllers\AuthController;
use App\Controllers\EmployeeController;
use App\Controllers\LookupController;
use App\Controllers\RapController;
use App\Controllers\UserManagementController;

/**
 * =========================================================
 * ROTAS DE AUTENTICAÇÃO
 * =========================================================
 */
Router::post('/api/register', [AuthController::class, 'register']);
Router::post('/api/login', [AuthController::class, 'login']);
Router::post('/api/logout', [AuthController::class, 'logout']);

// Rotas adicionais de sessão/usuário logado
Router::get('/api/check-session', [AuthController::class, 'checkSession']);
Router::get('/api/current-user', [AuthController::class, 'getCurrentUser']);
Router::get('/api/user', [AuthController::class, 'getCurrentUser']);

// Rota Protheus (dados internos de funcionário)
Router::post('/api/protheus/employee', [AuthController::class, 'getInternalEmployeeData']);


/**
 * =========================================================
 * ROTAS DE LOOKUP (dados auxiliares)
 * =========================================================
 */
Router::get('/api/lookups/rap-form', [LookupController::class, 'getRapFormData']);
Router::get('/api/lookups/search-cc', [LookupController::class, 'searchCostCenters']);
Router::get('/api/lookups/search-jobtitles', [LookupController::class, 'searchJobTitles']);
Router::get('/api/lookups/cargo/{code}', [LookupController::class, 'getCargoDescriptionByCode']);
Router::get('/api/lookups/cc/{code}', [LookupController::class, 'getCostCenterDescriptionByCode']);


/**
 * =========================================================
 * ROTAS DE FUNCIONÁRIOS
 * =========================================================
 */
Router::get('/api/employees', [EmployeeController::class, 'getAllEmployees']);
Router::get('/api/employee/data/{matricula}', [EmployeeController::class, 'getEmployeeDataByMatricula']);


/**
 * =========================================================
 * ROTAS DE RAP
 * =========================================================
 */
Router::post('/api/requisicao/rap', [RapController::class, 'store']);


/**
 * =========================================================
 * ROTAS DE GERENCIAMENTO DE USUÁRIOS
 * =========================================================
 */
Router::get('/api/users', [UserManagementController::class, 'getUsers']);
Router::get('/api/users/{id}/permissions', [UserManagementController::class, 'getUserPermissions']);

// Rotas completas de User Management
Router::get('/api/user-management', [UserManagementController::class, 'index']);
Router::get('/api/user-management/search', [UserManagementController::class, 'search']);
Router::get('/api/user-management/history', [UserManagementController::class, 'history']);
Router::get('/api/user-management/permissions', [UserManagementController::class, 'getPermissions']);
Router::get('/api/user-management/{id}', [UserManagementController::class, 'show']);
Router::post('/api/user-management', [UserManagementController::class, 'store']);
Router::put('/api/user-management/{id}', [UserManagementController::class, 'update']);
Router::delete('/api/user-management/{id}', [UserManagementController::class, 'destroy']);
Router::get('/api/user-management/{id}/history', [UserManagementController::class, 'getPermissionHistory']);
Router::put('/api/user-management/{id}/permissions', [UserManagementController::class, 'updatePermissions']);

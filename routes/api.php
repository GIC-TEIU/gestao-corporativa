<?php
use App\Core\Router;
use App\Controllers\AuthController;
use App\Controllers\EmployeeController;
use App\Controllers\LookupController;
use App\Controllers\RapController;

Router::post('/api/register', [AuthController::class, 'register']);
Router::post('/api/login', [AuthController::class, 'login']);
Router::post('/api/logout', [AuthController::class, 'logout']);
Router::get('/api/lookups/rap-form', [LookupController::class, 'getRapFormData']);
Router::post('/api/requisicao/rap', [RapController::class, 'store']);
Router::get('/api/employees', [EmployeeController::class, 'getAllEmployees']);
Router::get('/api/employee/data/{matricula}', [EmployeeController::class, 'getEmployeeDataByMatricula']);


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
Router::get('/api/lookups/search-cc', [LookupController::class, 'searchCostCenters']);
Router::get('/api/lookups/cargo/{code}', [LookupController::class, 'getCargoDescriptionByCode']);
Router::get('/api/lookups/cc/{code}', [LookupController::class, 'getCostCenterDescriptionByCode']);
Router::get('/api/lookups/cargo/{code}', [LookupController::class, 'getCargoDescriptionByCode']);
Router::get('/api/lookups/cc/{code}', [LookupController::class, 'getCostCenterDescriptionByCode']);
Router::get('/api/lookups/search-cc', [LookupController::class, 'searchCostCenters']);
Router::get('/api/lookups/search-jobtitles', [LookupController::class, 'searchJobTitles']);
Router::post('/api/requisicao/rmp', [RmpController::class, 'store']);



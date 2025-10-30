<?php

namespace App\Controllers;

use App\Core\Response;
use App\Models\ProtheusEmployee;
use Throwable;

class EmployeeController
{

    
    public function getEmployeeDataByMatricula($matricula)
    {
        if (empty($matricula)) {
            return Response::json(['success' => false, 'message' => 'Matrícula não fornecida.'], 400);
        }

        try {
            $employeeModel = new ProtheusEmployee();
            $data = $employeeModel->findDataByMatricula($matricula);

            if ($data === null) {
                return Response::json([
                    'success' => false,
                    'message' => 'Dados não encontrados para a matrícula informada.'
                ], 404);
            }

            return Response::json([
                'success' => true,
                'data' => $data
            ], 200);

        } catch (Throwable $e) {
            return Response::json([
                'success' => false,
                'message' => 'Erro interno ao buscar dados do funcionário: ' . $e->getMessage()
            ], 500);
        }
    }

public function getEmployeeSalaryHistory($matricula)
    {
        try {
            // Instanciar diretamente no método
            $salaryHistoryModel = new \App\Models\ProtheusSalaryHistory();
            
            $salaryHistory = $salaryHistoryModel->getSalaryHistoryByMatricula($matricula);

            return Response::json([
                'success' => true,
                'data' => $salaryHistory
            ]);

        } catch (Exception $e) {
            return Response::json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Busca a lista básica de TODOS os funcionários.
     * Usado para popular o EmployeeContext no frontend.
     */
    public function getAllEmployees()
    {
        try {
            $employeeModel = new ProtheusEmployee();
            $employees = $employeeModel->findAllBasicData();

            return Response::json([
                'success' => true,
                'data' => $employees
            ], 200);

        } catch (Throwable $e) {
            return Response::json([
                'success' => false,
                'message' => 'Erro interno ao buscar lista de funcionários: ' . $e->getMessage()
            ], 500);
        }
    }

    
}


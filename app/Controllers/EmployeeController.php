<?php

namespace App\Controllers;

use App\Core\Response;
use App\Models\ProtheusEmployee;
use Throwable;

class EmployeeController
{
    public function getEmployeeDataByMatriculaOrCpf(string $matricula, string $cpf)
    {
        if (empty($matricula) && empty($cpf)) {
            return Response::json(['success' => false, 'message' => 'Matrícula ou CPF não fornecido.'], 400);
        }

        try {
            $employeeModel = new ProtheusEmployee();
            $data = $employeeModel->findDataByMatriculaOrCpf($matricula, $cpf);

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
<?php

namespace App\Controllers;

use App\Models\ProtheusEmployee;
use App\Core\Response;
use App\Models\User;
use PDO;
use Exception;

class AuthController {

    protected ProtheusEmployee $protheusEmployee;
    protected User $userModel;
 
    public function __construct()
    {
        error_log("DEBUG: Carregando ProtheusEmployee Model.");
        try {
            $this->protheusEmployee = new ProtheusEmployee();
        } catch (\PDOException $e) {
            error_log("ERRO FATAL: Falha na Conexão SQL Server. Mensagem: " . $e->getMessage());
            // $this->sqlsrvConnectionFailed = true;
        }

        try {
            $this-> userModel = new User();
            } catch (\PDOException $e) {
             error_log("ERRO FATAL: Falha na Conexão MySQL (User Model). Mensagem: " . $e->getMessage());
        }
    }

    public function getInternalEmployeeData() {
        header("Content-Type: application/json; charset=UTF-8");
    
        $requestBody = file_get_contents("php://input");
        error_log("DEBUG: Corpo da requisição recebido: " . $requestBody);
        
        $data = json_decode($requestBody, true);
        error_log("DEBUG: Conteúdo do array \$data após JSON decode: " . print_r($data, true));

        if (json_last_error() !== JSON_ERROR_NONE) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Requisição inválida (JSON malformado).']);
            error_log("ERRO: JSON malformado na requisição. Erro JSON: " . json_last_error_msg());
            return;
        }

        $cpf = $data ['cpf'] ?? '';
        $matricula = $data ['matricula'] ?? '';

        $cpf = preg_replace('/\D/', '', $cpf);
        $matricula = trim($matricula);
        
        error_log("DEBUG: Parâmetros recebidos. CPF: " . $cpf . " | Matrícula: " . $matricula);

        if (empty($cpf) && empty($matricula)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'CPF ou matrícula são obrigatórios.']);
            return;
        }

        try{
           error_log("DEBUG: Chamando Model para buscar dados do colaborador.");
            
            $employee = $this->protheusEmployee->findDataByMatriculaOrCpf($matricula, $cpf);
            
            if (!$employee) {
                http_response_code(404);
                error_log("ALERTA: Colaborador não encontrado com os parâmetros fornecidos.");
                echo json_encode(['success' => false, 'message' => 'Colaborador não encontrado no Protheus.']);
                return;
            }
            
            error_log("DEBUG: Dados do colaborador encontrados: " . print_r($employee, true));

            echo json_encode(['success' => true, 'employee' => $employee]);
            return;

        } catch (\PDOException $e) {
            error_log("ERRO PDO: Falha na query SQL Server. Mensagem: " . $e->getMessage() . " | SQLState: " . $e->getCode());
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Erro no banco de dados durante a consulta.']);
        } catch (Exception $e) {
            // Captura outras exceções gerais
            error_log("ERRO GERAL: Exceção capturada: " . $e->getMessage());
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    }
}
// Contém a lógica de cadastro, login e logout.
// Quais classes/métodos:
// class AuthController
// public function register():
    // Faz as verificações da task (se é colabordador do TOTVS ou não, etc)
    // Pega os dados da requisição (full_name, email, password_hash, etc.).
    // Valida os dados (ex: email é válido? Senha é forte?).
    // Verifica se o e-mail já existe (usando o UserModel).
    // Faz o hash da senha (usando password_hash()). NUNCA salve a senha em texto puro.
    // Chama o UserModel para criar o usuário no banco.
    // Retorna uma resposta de sucesso (JSON).
// public function login():
    // Pega email e password da requisição.
    // Chama UserModel para buscar o usuário pelo e-mail.
    // Se o usuário não existe, retorna erro 404.
    // Verifica o hash da senha (usando password_verify()).
    // Se a senha estiver incorreta, retorna erro 401 (Não autorizado).
    // Se a senha estiver correta: Armazena os dados na sessão.
    // Verifica se o usuário está ativo nos dois bancos de dados
    // Retorna uma resposta de sucesso com os dados do usuário (JSON).
// public function logout():
    // Limpa os dados da sessão (session_unset()).
    // Destrói a sessão (session_destroy()).
    // Retorna uma resposta de sucesso (JSON).
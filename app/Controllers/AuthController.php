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
        }

        try {
            $this->userModel = new User();
        } catch (\PDOException $e) {
            error_log("ERRO FATAL: Falha na Conexão MySQL (User Model). Mensagem: " . $e->getMessage());
        }
    }

    public function register() {
    header("Content-Type: application/json; charset=UTF-8");

    $requestBody = file_get_contents("php://input");
    error_log("DEBUG: Register - Corpo da requisição recebido: " . $requestBody);
    
    $data = json_decode($requestBody, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Requisição inválida (JSON malformado).']);
        return;
    }

    // Validação dos campos obrigatórios
    $requiredFields = ['cpf', 'matricula', 'nome', 'cargo', 'email', 'password'];
    foreach ($requiredFields as $field) {
        if (empty($data[$field])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => "Campo {$field} é obrigatório."]);
            return;
        }
    }

    $cpf = preg_replace('/\D/', '', $data['cpf']);
    $matricula = trim($data['matricula']);
    $nome = trim($data['nome']);
    $cargo = trim($data['cargo']);
    $email = trim($data['email']);
    $password = $data['password'];

    // Validações básicas
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'E-mail inválido.']);
        return;
    }

    if (strlen($password) < 8) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Senha deve ter no mínimo 8 caracteres.']);
        return;
    }

    try {
        // Verificar se e-mail já existe
        if ($this->userModel->emailExists($email)) {
            http_response_code(409);
            echo json_encode(['success' => false, 'message' => 'E-mail já cadastrado.']);
            return;
        }

        // Verificar se CPF já existe
        if ($this->userModel->cpfExists($cpf)) {
            http_response_code(409);
            echo json_encode(['success' => false, 'message' => 'CPF já cadastrado.']);
            return;
        }

        // Verificar se matrícula já existe
        if ($this->userModel->matriculaExists($matricula)) {
            http_response_code(409);
            echo json_encode(['success' => false, 'message' => 'Matrícula já cadastrada.']);
            return;
        }

        // Criar hash da senha
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);

        // Preparar dados para inserção - APENAS os campos que temos no frontend
        $userData = [
            'full_name' => $nome,
            'email' => $email,
            'cpf' => $cpf,
            'password_hash' => $passwordHash,
            'job_title' => $cargo,
            'employee_id' => $matricula,
            // Os outros campos ficam NULL ou default
            'cost_center' => null,
            'cost_center_description' => null,
            'whatsapp_phone' => null,
            'profile_photo_path' => null,
            'is_active' => 1
        ];

        // Inserir usuário no banco
        $userId = $this->userModel->create($userData);

        if ($userId) {
            http_response_code(201);
            echo json_encode([
                'success' => true, 
                'message' => 'Usuário cadastrado com sucesso!',
                'user_id' => $userId
            ]);
        } else {
            throw new Exception('Falha ao criar usuário no banco de dados.');
        }

    } catch (\PDOException $e) {
        error_log("ERRO PDO no registro: " . $e->getMessage());
        error_log("Detalhes do erro: " . $e->getFile() . ":" . $e->getLine());
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Erro no banco de dados durante o cadastro.']);
    } catch (Exception $e) {
        error_log("ERRO GERAL no registro: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
}

    public function getInternalEmployeeData() {
        // ... (seu método existente permanece igual)
        header("Content-Type: application/json; charset=UTF-8");
    
        $requestBody = file_get_contents("php://input");
        error_log("DEBUG: Corpo da requisição recebido: " . $requestBody);
        
        $data = json_decode($requestBody, true);
        error_log("DEBUG: Conteúdo do array \$data após JSON decode: " . print_r($data, true));

        if (json_last_error() !== JSON_ERROR_NONE) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Requisição inválida (JSON malformado).']);
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
            error_log("ERRO GERAL: Exceção capturada: " . $e->getMessage());
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    }

    // Adicione também os métodos login e logout quando necessário
    public function login() {
        // Implementar lógica de login
        http_response_code(501);
        echo json_encode(['success' => false, 'message' => 'Método login não implementado.']);
    }

    public function logout() {
        // Implementar lógica de logout
        http_response_code(501);
        echo json_encode(['success' => false, 'message' => 'Método logout não implementado.']);
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
<?php

namespace App\Controllers;
use PDO;
use Exception;
use App\Core\Response;

class AuthController {
    protected $dbSqlsrv;
    protected $sqlsrvConnectionFailed = false;

    public function __construct()
    {
        error_log("DEBUG: Carregando User Model.");

        $config = include __DIR__ . '/../../config/database.php';
        $sqlsrv = $config['connections']['sqlsrv'];

        try {
            error_log("DEBUG: Tentando conectar ao SQL Server.");
            $this->dbSqlsrv = new \PDO(
                "sqlsrv:Server={$sqlsrv['host']},{$sqlsrv['port']};Database={$sqlsrv['database']}",
                $sqlsrv['username'],
                $sqlsrv['password']
            );

            $this->dbSqlsrv->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
            $this->dbSqlsrv->setAttribute(\PDO::SQLSRV_ATTR_ENCODING, \PDO::SQLSRV_ENCODING_UTF8);
            error_log("DEBUG: Conexão SQL Server bem-sucedida.");
        } catch (\PDOException $e) {
            error_log("ERRO FATAL: Falha na Conexão SQL Server. Mensagem: " . $e->getMessage());
            $this->sqlsrvConnectionFailed = true;
        }
    }

    public function getExternalEmployeeData() {
        header("Content-Type: application/json; charset=UTF-8");
        
        if ($this->sqlsrvConnectionFailed || is_null($this->dbSqlsrv)) {
            http_response_code(503); 
            echo json_encode(['success' => false, 'message' => 'Erro interno: Falha na conexão com a fonte de dados externa (SQL Server).']);
            error_log("ALERTA: Tentativa de acesso ao getExternalEmployeeData() falhou devido à falha de conexão no construtor.");
            return;
        }

        $requestBody = file_get_contents("php://input");
        error_log("DEBUG: Corpo da requisição recebido: " . $requestBody);
        
        $data = json_decode($requestBody, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Requisição inválida (JSON malformado).']);
            error_log("ERRO: JSON malformado na requisição. Erro JSON: " . json_last_error_msg());
            return;
        }

        $cpf = $data ['cpf'] ?? '';
        $matricula = $data ['matricula'] ?? '';
        
        error_log("DEBUG: Parâmetros recebidos. CPF: " . $cpf . " | Matrícula: " . $matricula);

        if (empty($cpf) && empty($matricula)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'CPF ou matrícula são obrigatórios.']);
            return;
        }

        try{
            $sql =

            "SELECT 
                    TRIM(RA.RA_NOME) AS nome,
                    TRIM(RA.RA_MAT) AS matricula,
                    TRIM(RA.RA_CIC) AS cpf,
                    TRIM(RJ.RJ_DESC) AS cargo_descricao,   
                    TRIM(RA.RA_CARGO) AS cargo_codigo 
                FROM SRA010 RA
                LEFT JOIN SRJ010 RJ 
                    ON RA.RA_CARGO = RJ.RJ_COD 
                    AND RJ.D_E_L_E_T_ = ''
                WHERE
                    (RA.RA_MAT = :matricula OR RA.RA_CIC = :cpf)
                    AND RA.D_E_L_E_T_ = ''
                    AND (RA.RA_SITFOLH IS NULL OR RA.RA_SITFOLH NOT IN ('D'))";
            
            error_log("DEBUG: SQL a ser executado: " . preg_replace('/\s+/', ' ', $sql));

            $stmt = $this->dbSqlsrv->prepare($sql);
            
            $params = [
                'matricula' => $matricula,
                'cpf' => $cpf
            ];
            
            error_log("DEBUG: Parâmetros de execução: " . print_r($params, true));
            error_log("DEBUG: Parâmetros para SQL: " . json_encode($params));
            error_log("DEBUG: SQL: " . $sql);
            
            $stmt->execute($params);

            $employee = $stmt->fetch(PDO::FETCH_ASSOC);

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
            // Captura erros de banco (query, execute)
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
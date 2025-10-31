<?php

namespace App\Controllers;

use App\Models\User;
use PDO;

class AuthController
{
    protected $user;
    protected $dbSqlsrv;

    public function __construct()
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        require_once __DIR__ . '/../Models/User.php';
        $this->user = new User();

        $config = include __DIR__ . '/../../config/database.php';
        $sqlsrv = $config['connections']['sqlsrv'];

        try {
            $this->dbSqlsrv = new PDO(
                "sqlsrv:Server={$sqlsrv['host']},{$sqlsrv['port']};Database={$sqlsrv['database']}",
                $sqlsrv['username'],
                $sqlsrv['password']
            );
            $this->dbSqlsrv->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->dbSqlsrv->setAttribute(PDO::SQLSRV_ATTR_ENCODING, PDO::SQLSRV_ENCODING_UTF8);
        } catch (\PDOException $e) {
            error_log("Erro na conexão SQL Server: " . $e->getMessage());
        }
    }

    // Login do usuário
    public function login()
    {
        while (ob_get_level()) ob_end_clean();
        header('Content-Type: application/json; charset=utf-8');

        try {
            $input = json_decode(file_get_contents('php://input'), true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new \Exception('JSON inválido no corpo da requisição', 400);
            }

            $email = $input['email'] ?? null;
            $password = $input['password'] ?? null;

            if (!$email || !$password) {
                throw new \Exception('Email e senha são obrigatórios.', 400);
            }

            $user = $this->user->where('email', $email)->first();
            if (!$user) {
                throw new \Exception('Usuário não encontrado.', 404);
            }

            if (!password_verify($password, $user['password_hash'])) {
                throw new \Exception('Senha incorreta.', 401);
            }

            if (!$user['is_active']) {
                throw new \Exception('Usuário inativo. Contate o administrador.', 401);
            }

            if (!empty($user['employee_id'])) {
                if (!$this->verifyProtheusUser($user['employee_id'])) {
                    throw new \Exception('Usuário inativo no sistema Protheus.', 401);
                }
            }

            $permissions = $this->getUserPermissions($user['id']);

            $_SESSION = [
                'user_id' => $user['id'],
                'user_email' => $user['email'],
                'user_full_name' => $user['full_name'],
                'user_job_title' => $user['job_title'],
                'user_employee_id' => $user['employee_id'] ?? null,
                'user_permissions' => $permissions,
                'logged_in' => true,
                'last_activity' => time()
            ];

            session_regenerate_id(true);

            echo json_encode([
                'status' => 200,
                'message' => 'Login realizado com sucesso.',
                'data' => [
                    'user_id' => $user['id'],
                    'full_name' => $user['full_name'],
                    'email' => $user['email'],
                    'job_title' => $user['job_title'],
                    'employee_id' => $user['employee_id'] ?? null,
                    'permissions' => $permissions
                ]
            ]);
        } catch (\Exception $e) {
            while (ob_get_level()) ob_end_clean();
            header('Content-Type: application/json; charset=utf-8');
            http_response_code($e->getCode() ?: 500);

            echo json_encode([
                'status' => $e->getCode() ?: 500,
                'message' => $e->getMessage()
            ]);
        }
    }

    // Logout do usuário
    public function logout()
    {
        $_SESSION = [];

        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000, $params["path"], $params["domain"], $params["secure"], $params["httponly"]);
        }

        session_destroy();

        echo json_encode(['status' => 200, 'message' => 'Logout realizado com sucesso.']);
    }

    // Retorna dados do usuário logado
    public function getCurrentUser()
    {
        if (!$this->isSessionValid()) {
            http_response_code(401);
            echo json_encode(['status' => 401, 'message' => 'Não autenticado ou sessão expirada.']);
            return;
        }

        echo json_encode([
            'status' => 200,
            'data' => [
                'user_id' => $_SESSION['user_id'],
                'full_name' => $_SESSION['user_full_name'],
                'email' => $_SESSION['user_email'],
                'job_title' => $_SESSION['user_job_title'] ?? '',
                'employee_id' => $_SESSION['user_employee_id'] ?? '',
                'permissions' => $_SESSION['user_permissions'] ?? []
            ]
        ]);
    }

    // Verifica e retorna status da sessão
    public function checkSession()
    {
        while (ob_get_level()) ob_end_clean();
        header('Content-Type: application/json; charset=utf-8');

        if (!$this->isSessionValid()) {
            http_response_code(401);
            echo json_encode(['status' => 401, 'message' => 'Sessão inválida ou expirada.']);
            return;
        }

        echo json_encode([
            'status' => 200,
            'message' => 'Sessão válida',
            'data' => [
                'user_id' => $_SESSION['user_id'],
                'full_name' => $_SESSION['user_full_name'],
                'email' => $_SESSION['user_email'],
                'job_title' => $_SESSION['user_job_title'] ?? '',
                'employee_id' => $_SESSION['user_employee_id'] ?? '',
                'permissions' => $_SESSION['user_permissions'] ?? []
            ]
        ]);
    }

    // Verifica se a sessão está ativa e não expirada
    private function isSessionValid()
    {
        if (empty($_SESSION['logged_in'])) {
            return false;
        }

        $maxIdleTime = 30 * 60; // 30 minutos
        if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity'] > $maxIdleTime)) {
            $this->logout();
            return false;
        }

        $_SESSION['last_activity'] = time();
        return true;
    }

    // Middleware para autenticação em outras rotas
    public static function checkAuth()
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        $auth = new self();
        return $auth->isSessionValid();
    }

    // Valida se usuário existe e está ativo no Protheus
    private function verifyProtheusUser($employeeId)
    {
        try {
            $query = "
                SELECT COUNT(*) AS active
                FROM SRA010
                WHERE RA_MAT = ?
                  AND D_E_L_E_T_ = ''
                  AND (RA_SITFOLH IS NULL OR RA_SITFOLH NOT IN ('D'))
            ";

            $stmt = $this->dbSqlsrv->prepare($query);
            $stmt->execute([$employeeId]);
            $result = $stmt->fetch(PDO::FETCH_OBJ);

            return $result && $result->active > 0;
        } catch (\Exception $e) {
            error_log('Erro ao verificar usuário no Protheus: ' . $e->getMessage());
            return false;
        }
    }

    // Retorna permissões do usuário logado
    private function getUserPermissions($userId)
    {
        try {
            $db = $this->user->getDb();

            // Garante existência das tabelas
            foreach (['permission', 'user_permission'] as $table) {
                $stmt = $db->prepare("SHOW TABLES LIKE ?");
                $stmt->execute([$table]);
                if (!$stmt->fetch()) {
                    error_log("Tabela {$table} não encontrada");
                    return [];
                }
            }

            $query = "
                SELECT p.title AS permission_code
                FROM user_permission up
                JOIN permission p ON up.permission_id = p.id
                WHERE up.user_id = ?
            ";
            $stmt = $db->prepare($query);
            $stmt->execute([$userId]);
            return $stmt->fetchAll(PDO::FETCH_COLUMN) ?: [];
        } catch (\Exception $e) {
            error_log("Erro ao buscar permissões do usuário: " . $e->getMessage());
            return [];
        }
    }

    // Endpoint placeholder para registro (não implementado)
    public function register()
    {
        http_response_code(501);
        echo json_encode(['status' => 501, 'message' => 'Cadastro não implementado ainda.']);
    }
}

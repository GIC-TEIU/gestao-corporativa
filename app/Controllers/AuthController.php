<?php 
namespace App\Controllers;

use App\Models\User;

class AuthController
{
    protected $user;
    protected $dbSqlsrv;

    public function __construct()
    {
        // Iniciar sessão no construtor
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        require_once __DIR__ . '/../Models/User.php';
        $this->user = new \App\Models\User();
        
        $config = include __DIR__ . '/../../config/database.php';
        $sqlsrv = $config['connections']['sqlsrv'];

        try {
            $this->dbSqlsrv = new \PDO(
                "sqlsrv:Server={$sqlsrv['host']},{$sqlsrv['port']};Database={$sqlsrv['database']}",
                $sqlsrv['username'],
                $sqlsrv['password']
            );
            $this->dbSqlsrv->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
            $this->dbSqlsrv->setAttribute(\PDO::SQLSRV_ATTR_ENCODING, \PDO::SQLSRV_ENCODING_UTF8);
        } catch (\PDOException $e) {
            error_log("Erro na conexão SQL Server: " . $e->getMessage());
        }
    }

    public function login()
    {
        // 🔥 LIMPEZA RADICAL DE BUFFERS
        while (ob_get_level()) {
            ob_end_clean();
        }
        
        // 🔥 FORCE HEADERS JSON
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

            // Se tiver matrícula, valida no Protheus
            if (!empty($user['employee_id'])) {
                $totvsUser = $this->verifyProtheusUser($user['employee_id']);

                if (!$totvsUser) {
                    throw new \Exception('Usuário não encontrado ou inativo no sistema Protheus.', 401);
                }
            }

            // Buscar permissões do usuário
            $permissions = $this->getUserPermissions($user['id']);

            // Configurar dados da sessão
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_email'] = $user['email'];
            $_SESSION['user_full_name'] = $user['full_name'];
            $_SESSION['user_job_title'] = $user['job_title'];
            $_SESSION['user_employee_id'] = $user['employee_id'] ?? null;
            $_SESSION['user_permissions'] = $permissions;
            $_SESSION['logged_in'] = true;
            $_SESSION['last_activity'] = time();

            // Configurar cookie de sessão para maior segurança
            session_regenerate_id(true);

            $response = [
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
            ];

            echo json_encode($response);
            exit;

        } catch (\Exception $e) {
            // 🔥 GARANTIR QUE SÓ JSON É RETORNADO EM ERROS TAMBÉM
            while (ob_get_level()) {
                ob_end_clean();
            }
            header('Content-Type: application/json; charset=utf-8');
            
            http_response_code($e->getCode() ?: 500);
            echo json_encode([
                'status' => $e->getCode() ?: 500,
                'message' => $e->getMessage()
            ]);
            exit;
        }
    }

    public function logout()
    {
        // Limpar todos os dados da sessão
        $_SESSION = array();

        // Se desejar destruir o cookie de sessão também
        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000,
                $params["path"], $params["domain"],
                $params["secure"], $params["httponly"]
            );
        }

        session_destroy();

        echo json_encode([
            'status' => 200,
            'message' => 'Logout realizado com sucesso.'
        ]);
    }

    public function getCurrentUser()
    {
        // Verificar se a sessão está ativa e válida
        if (!$this->isSessionValid()) {
            http_response_code(401);
            echo json_encode([
                'status' => 401,
                'message' => 'Não autenticado ou sessão expirada.'
            ]);
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

    public function checkSession()
    {
        // 🔥 LIMPEZA DE BUFFERS
        while (ob_get_level()) {
            ob_end_clean();
        }
        
        // 🔥 FORCE HEADERS JSON
        header('Content-Type: application/json; charset=utf-8');

        // Verificar se a sessão está ativa e válida
        if (!$this->isSessionValid()) {
            http_response_code(401);
            echo json_encode([
                'status' => 401,
                'message' => 'Sessão inválida ou expirada.'
            ]);
            return;
        }

        // Se for válida, retornar os dados do usuário
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

    /**
     * Verifica se a sessão é válida
     */
    private function isSessionValid()
    {
        if (!isset($_SESSION['logged_in']) || !$_SESSION['logged_in']) {
            return false;
        }

        // Verificar tempo de inatividade (30 minutos)
        $max_idle_time = 30 * 60; // 30 minutos em segundos
        if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity'] > $max_idle_time)) {
            $this->logout();
            return false;
        }

        // Atualizar tempo da última atividade
        $_SESSION['last_activity'] = time();

        return true;
    }

    /**
     * Middleware para verificar autenticação em outras rotas
     */
    public static function checkAuth()
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        $auth = new self();
        return $auth->isSessionValid();
    }

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
            $result = $stmt->fetch(\PDO::FETCH_OBJ);

            return $result && $result->active > 0;

        } catch (\Exception $e) {
            error_log('Erro ao verificar usuário no Protheus: ' . $e->getMessage());
            return false;
        }
    }

    private function getUserPermissions($userId)
    {
        try {
            $db = $this->user->getDb();
            
            // Verifica se a tabela permission existe
            $checkPermissionTable = $db->prepare("SHOW TABLES LIKE 'permission'");
            $checkPermissionTable->execute();
            $permissionTableExists = $checkPermissionTable->fetch();
            
            if (!$permissionTableExists) {
                error_log("Tabela permission não encontrada");
                return [];
            }

            // Verifica se a tabela user_permission existe
            $checkUserPermissionTable = $db->prepare("SHOW TABLES LIKE 'user_permission'");
            $checkUserPermissionTable->execute();
            $userPermissionTableExists = $checkUserPermissionTable->fetch();
            
            if (!$userPermissionTableExists) {
                error_log("Tabela user_permission não encontrada");
                return [];
            }

            $query = "
                SELECT p.title as permission_code 
                FROM user_permission up 
                JOIN permission p ON up.permission_id = p.id 
                WHERE up.user_id = ?
            ";
            
            $stmt = $db->prepare($query);
            $stmt->execute([$userId]);
            $permissions = $stmt->fetchAll(\PDO::FETCH_COLUMN);
            
            return $permissions ?: [];
            
        } catch (\Exception $e) {
            error_log("Erro ao buscar permissões do usuário: " . $e->getMessage());
            return [];
        }
    }

    public function register()
    {
        http_response_code(501);
        echo json_encode([
            'status' => 501,
            'message' => 'Cadastro não implementado ainda.'
        ]);
    }
}
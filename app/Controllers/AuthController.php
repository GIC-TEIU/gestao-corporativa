<?php 
namespace App\Controllers;

use App\Models\User;

class AuthController
{
    protected $user;
    protected $dbSqlsrv;

    public function __construct()
    {
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
        $input = json_decode(file_get_contents('php://input'), true);

        $email = $input['email'] ?? null;
        $password = $input['password'] ?? null;

        if (!$email || !$password) {
            http_response_code(400);
            echo json_encode([
                'status' => 400,
                'message' => 'Email e senha são obrigatórios.'
            ]);
            return;
        }

        $user = $this->user->where('email', $email)->first();

        if (!$user) {
            http_response_code(404);
            echo json_encode([
                'status' => 404,
                'message' => 'Usuário não encontrado.'
            ]);
            return;
        }

        if (!password_verify($password, $user['password_hash'])) {
            http_response_code(401);
            echo json_encode([
                'status' => 401,
                'message' => 'Senha incorreta.'
            ]);
            return;
        }

        if (!$user['is_active']) {
            http_response_code(401);
            echo json_encode([
                'status' => 401,
                'message' => 'Usuário inativo. Contate o administrador.'
            ]);
            return;
        }

        // Se tiver matrícula, valida no Protheus
        if (!empty($user['employee_id'])) {
            $totvsUser = $this->verifyProtheusUser($user['employee_id']);

            if (!$totvsUser) {
                http_response_code(401);
                echo json_encode([
                    'status' => 401,
                    'message' => 'Usuário não encontrado ou inativo no sistema Protheus.'
                ]);
                return;
            }
        }

        // Buscar permissões do usuário - CORRIGIDO para estrutura real do BD
        $permissions = $this->getUserPermissions($user['id']);

        // Sessão
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_email'] = $user['email'];
        $_SESSION['user_full_name'] = $user['full_name'];
        $_SESSION['user_job_title'] = $user['job_title'];
        $_SESSION['user_employee_id'] = $user['employee_id'] ?? null;
        $_SESSION['user_permissions'] = $permissions;
        $_SESSION['logged_in'] = true;

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
    }

    public function logout()
    {
        session_unset();
        session_destroy();

        echo json_encode([
            'status' => 200,
            'message' => 'Logout realizado com sucesso.'
        ]);
    }

    public function getCurrentUser()
    {
        if (!isset($_SESSION['logged_in']) || !$_SESSION['logged_in']) {
            http_response_code(401);
            echo json_encode([
                'status' => 401,
                'message' => 'Não autenticado.'
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

    /**
     * Busca permissões do usuário baseado na estrutura real do BD
     */
    private function getUserPermissions($userId)
    {
        try {
            // Verifica se as tabelas de permissão existem
            $db = $this->user->getDb();
            
            // Primeiro verifica se a tabela permission existe
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

            // Busca permissões baseado na estrutura real do seu BD
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
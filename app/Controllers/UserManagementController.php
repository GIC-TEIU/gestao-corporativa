<?php

namespace App\Controllers;

use App\Models\User;
use App\Models\Permission;
use App\Models\PermissionHistory;
use PDO;

class UserManagementController
{
    protected $user;
    protected $permission;
    protected $permissionHistory;

    public function __construct()
    {
        // Iniciar sessão se não estiver iniciada
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        // Verificar autenticação
        if (!isset($_SESSION['logged_in']) || !$_SESSION['logged_in']) {
            http_response_code(401);
            echo json_encode([
                'status' => 401,
                'message' => 'Não autenticado. Faça login novamente.'
            ]);
            exit;
        }

        // Verificar permissão específica
        if (!isset($_SESSION['user_permissions']) || 
            !in_array('user_management', $_SESSION['user_permissions'])) {
            http_response_code(403);
            echo json_encode([
                'status' => 403,
                'message' => 'Acesso negado. Permissão insuficiente para gerenciar usuários.'
            ]);
            exit;
        }

        // Inicializar modelos
        $this->user = new User();
        $this->permission = new Permission();
        $this->permissionHistory = new PermissionHistory();
    }



     // =====================================================
// BUSCAR USUÁRIOS POR NOME OU MATRÍCULA (PARA AUTOCOMPLETE)
// =====================================================
public function search()
{
    try {
        // Limpeza de buffers
        while (ob_get_level()) {
            ob_end_clean();
        }
        
        header('Content-Type: application/json; charset=utf-8');

        $term = $_GET['term'] ?? '';

        if (empty($term)) {
            echo json_encode([
                'status' => 200,
                'data' => []
            ]);
            return;
        }

        // Buscar usuários por nome ou matrícula
        $sql = "
            SELECT 
                id,
                full_name,
                employee_id,
                email,
                job_title
            FROM user 
            WHERE 
                (full_name LIKE :term OR employee_id LIKE :term)
                AND is_active = 1
            ORDER BY full_name
            LIMIT 10
        ";

        $stmt = $this->user->getDb()->prepare($sql);
        $stmt->execute(['term' => '%' . $term . '%']);
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'status' => 200,
            'data' => $users
        ]);

    } catch (\Exception $e) {
        error_log("Erro ao buscar usuários: " . $e->getMessage());
        http_response_code(500);
        echo json_encode([
            'status' => 500,
            'message' => 'Erro interno ao buscar usuários.'
        ]);
    }
}

    

    // =====================================================
    // LISTAR TODOS OS USUÁRIOS
    // =====================================================
    public function index()
    {
        try {
            // Limpeza de buffers
            while (ob_get_level()) {
                ob_end_clean();
            }
            
            header('Content-Type: application/json; charset=utf-8');

            $users = $this->user->getAllWithPermissions();
            echo json_encode([
                'status' => 200,
                'data' => $users
            ]);
        } catch (\Exception $e) {
            error_log("Erro ao listar usuários: " . $e->getMessage());
            http_response_code(500);
            echo json_encode([
                'status' => 500,
                'message' => 'Erro interno ao listar usuários.'
            ]);
        }
    }

    // =====================================================
    // DETALHAR UM USUÁRIO
    // =====================================================
    public function show($id)
    {
        try {
            // Limpeza de buffers
            while (ob_get_level()) {
                ob_end_clean();
            }
            
            header('Content-Type: application/json; charset=utf-8');

            $user = $this->user->findWithPermissions($id);

            if (!$user) {
                http_response_code(404);
                echo json_encode([
                    'status' => 404,
                    'message' => 'Usuário não encontrado.'
                ]);
                return;
            }

            echo json_encode([
                'status' => 200,
                'data' => $user
            ]);
        } catch (\Exception $e) {
            error_log("Erro ao buscar usuário: " . $e->getMessage());
            http_response_code(500);
            echo json_encode([
                'status' => 500,
                'message' => 'Erro interno ao buscar usuário.'
            ]);
        }
    }

    // =====================================================
    // CRIAR NOVO USUÁRIO
    // =====================================================
    public function store()
    {
        try {
            // Limpeza de buffers
            while (ob_get_level()) {
                ob_end_clean();
            }
            
            header('Content-Type: application/json; charset=utf-8');

            $input = json_decode(file_get_contents('php://input'), true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new \Exception('JSON inválido no corpo da requisição', 400);
            }

            $requiredFields = ['full_name', 'email', 'password'];
            foreach ($requiredFields as $field) {
                if (empty($input[$field])) {
                    http_response_code(400);
                    echo json_encode([
                        'status' => 400,
                        'message' => "Campo obrigatório: {$field}"
                    ]);
                    return;
                }
            }

            $existingUser = $this->user->where('email', $input['email'])->first();
            if ($existingUser) {
                http_response_code(409);
                echo json_encode([
                    'status' => 409,
                    'message' => 'Já existe um usuário com este email.'
                ]);
                return;
            }

            $userData = [
                'full_name' => $input['full_name'],
                'email' => $input['email'],
                'password_hash' => password_hash($input['password'], PASSWORD_DEFAULT),
                'job_title' => $input['job_title'] ?? null,
                'employee_id' => $input['employee_id'] ?? null,
                'cost_center' => $input['cost_center'] ?? null,
                'cost_center_description' => $input['cost_center_description'] ?? null,
                'whatsapp_phone' => $input['whatsapp_phone'] ?? null,
                'is_active' => $input['is_active'] ?? true
            ];

            $userId = $this->user->create($userData);

            // Atribuir permissões se fornecidas
            if (isset($input['permissions']) && is_array($input['permissions'])) {
                $this->user->syncPermissions($userId, $input['permissions']);
                $this->logPermissionChanges($userId, $input['permissions'], []);
            }

            echo json_encode([
                'status' => 201,
                'message' => 'Usuário criado com sucesso.',
                'data' => ['user_id' => $userId]
            ]);

        } catch (\Exception $e) {
            error_log("Erro ao criar usuário: " . $e->getMessage());
            http_response_code(500);
            echo json_encode([
                'status' => 500,
                'message' => 'Erro interno ao criar usuário.'
            ]);
        }
    }

    // =====================================================
    // ATUALIZAR USUÁRIO
    // =====================================================
    public function update($id)
    {
        try {
            // Limpeza de buffers
            while (ob_get_level()) {
                ob_end_clean();
            }
            
            header('Content-Type: application/json; charset=utf-8');

            $input = json_decode(file_get_contents('php://input'), true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new \Exception('JSON inválido no corpo da requisição', 400);
            }

            $existingUser = $this->user->find($id);
            if (!$existingUser) {
                http_response_code(404);
                echo json_encode([
                    'status' => 404,
                    'message' => 'Usuário não encontrado.'
                ]);
                return;
            }

            $updateData = [];
            $allowedFields = [
                'full_name', 'job_title', 'employee_id',
                'cost_center', 'cost_center_description',
                'whatsapp_phone', 'is_active'
            ];

            foreach ($allowedFields as $field) {
                if (isset($input[$field])) {
                    $updateData[$field] = $input[$field];
                }
            }

            if (!empty($input['password'])) {
                $updateData['password_hash'] = password_hash($input['password'], PASSWORD_DEFAULT);
            }

            $this->user->update($id, $updateData);

            if (isset($input['permissions']) && is_array($input['permissions'])) {
                $oldPermissions = $this->user->getUserPermissions($id);
                $oldPermissionIds = array_column($oldPermissions, 'id');
                $this->user->syncPermissions($id, $input['permissions']);
                $this->logPermissionChanges($id, $input['permissions'], $oldPermissionIds);
            }

            echo json_encode([
                'status' => 200,
                'message' => 'Usuário atualizado com sucesso.'
            ]);

        } catch (\Exception $e) {
            error_log("Erro ao atualizar usuário: " . $e->getMessage());
            http_response_code(500);
            echo json_encode([
                'status' => 500,
                'message' => 'Erro interno ao atualizar usuário.'
            ]);
        }
    }

    // =====================================================
    // DESATIVAR (DELETAR LOGICAMENTE) USUÁRIO
    // =====================================================
    public function destroy($id)
    {
        try {
            // Limpeza de buffers
            while (ob_get_level()) {
                ob_end_clean();
            }
            
            header('Content-Type: application/json; charset=utf-8');

            $existingUser = $this->user->find($id);
            if (!$existingUser) {
                http_response_code(404);
                echo json_encode([
                    'status' => 404,
                    'message' => 'Usuário não encontrado.'
                ]);
                return;
            }

            if ($id == $_SESSION['user_id']) {
                http_response_code(400);
                echo json_encode([
                    'status' => 400,
                    'message' => 'Não é possível excluir seu próprio usuário.'
                ]);
                return;
            }

            $this->user->update($id, ['is_active' => false]);

            echo json_encode([
                'status' => 200,
                'message' => 'Usuário desativado com sucesso.'
            ]);

        } catch (\Exception $e) {
            error_log("Erro ao excluir usuário: " . $e->getMessage());
            http_response_code(500);
            echo json_encode([
                'status' => 500,
                'message' => 'Erro interno ao excluir usuário.'
            ]);
        }
    }

    // =====================================================
    // LISTAR PERMISSÕES DISPONÍVEIS
    // =====================================================
    public function getPermissions()
    {
        try {
            // Limpeza de buffers
            while (ob_get_level()) {
                ob_end_clean();
            }
            
            header('Content-Type: application/json; charset=utf-8');

            $permissions = $this->permission->all();
            echo json_encode([
                'status' => 200,
                'data' => $permissions
            ]);
        } catch (\Exception $e) {
            error_log("Erro ao listar permissões: " . $e->getMessage());
            http_response_code(500);
            echo json_encode([
                'status' => 500,
                'message' => 'Erro interno ao listar permissões.'
            ]);
        }
    }

    // =====================================================
    // HISTÓRICO DE PERMISSÕES DE UM USUÁRIO
    // =====================================================
    public function getPermissionHistory($id)
    {
        try {
            // Limpeza de buffers
            while (ob_get_level()) {
                ob_end_clean();
            }
            
            header('Content-Type: application/json; charset=utf-8');

            $history = $this->permissionHistory->getByUserId($id);
            echo json_encode([
                'status' => 200,
                'data' => $history
            ]);
        } catch (\Exception $e) {
            error_log("Erro ao buscar histórico de permissões: " . $e->getMessage());
            http_response_code(500);
            echo json_encode([
                'status' => 500,
                'message' => 'Erro interno ao buscar histórico de permissões.'
            ]);
        }
    }

    // =====================================================
    // REGISTRAR ALTERAÇÕES DE PERMISSÕES
    // =====================================================
    private function logPermissionChanges($userId, $newPermissions, $oldPermissions)
    {
        try {
            $oldPermissionIds = is_array($oldPermissions) ? $oldPermissions : [];
            $newPermissionIds = is_array($newPermissions) ? $newPermissions : [];

            // Permissões concedidas
            $granted = array_diff($newPermissionIds, $oldPermissionIds);
            foreach ($granted as $permissionId) {
                $this->permissionHistory->create([
                    'user_id' => $userId,
                    'permission_id' => $permissionId,
                    'responsible_user_id' => $_SESSION['user_id'],
                    'action' => 'CONCEDER'
                ]);
            }

            // Permissões revogadas
            $revoked = array_diff($oldPermissionIds, $newPermissionIds);
            foreach ($revoked as $permissionId) {
                $this->permissionHistory->create([
                    'user_id' => $userId,
                    'permission_id' => $permissionId,
                    'responsible_user_id' => $_SESSION['user_id'],
                    'action' => 'REVOGAR'
                ]);
            }
        } catch (\Exception $e) {
            error_log("Erro ao registrar histórico de permissões: " . $e->getMessage());
        }
    }

    // =====================================================
    // ROTA COMPATÍVEL COM O FRONTEND ANTIGO
    // =====================================================
    public function getUsers()
    {
        $this->index();
    }

    public function getUserPermissions($id)
    {
        try {
            // Limpeza de buffers
            while (ob_get_level()) {
                ob_end_clean();
            }
            
            header('Content-Type: application/json; charset=utf-8');

            $user = $this->user->findWithPermissions($id);
            
            if (!$user) {
                http_response_code(404);
                echo json_encode([
                    'status' => 404,
                    'message' => 'Usuário não encontrado.'
                ]);
                return;
            }

            echo json_encode([
                'status' => 200,
                'data' => [
                    'user_id' => $user['id'],
                    'permissions' => $user['permissions']
                ]
            ]);
        } catch (\Exception $e) {
            error_log("Erro ao buscar permissões do usuário: " . $e->getMessage());
            http_response_code(500);
            echo json_encode([
                'status' => 500,
                'message' => 'Erro interno ao buscar permissões do usuário.'
            ]);
        }
    }

    // =====================================================
// ATUALIZAR APENAS PERMISSÕES (ROTA ESPECÍFICA)
// =====================================================
public function updatePermissions($id)
{
    try {
        // Limpeza de buffers
        while (ob_get_level()) {
            ob_end_clean();
        }
        
        header('Content-Type: application/json; charset=utf-8');

        $input = json_decode(file_get_contents('php://input'), true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new \Exception('JSON inválido no corpo da requisição', 400);
        }

        $existingUser = $this->user->find($id);
        if (!$existingUser) {
            http_response_code(404);
            echo json_encode([
                'status' => 404,
                'message' => 'Usuário não encontrado.'
            ]);
            return;
        }

        if (!isset($input['permissions']) || !is_array($input['permissions'])) {
            http_response_code(400);
            echo json_encode([
                'status' => 400,
                'message' => 'Campo permissions é obrigatório e deve ser um array.'
            ]);
            return;
        }

        $oldPermissions = $this->user->getUserPermissions($id);
        $oldPermissionIds = array_column($oldPermissions, 'id');
        
        $this->user->syncPermissions($id, $input['permissions']);
        $this->logPermissionChanges($id, $input['permissions'], $oldPermissionIds);

        echo json_encode([
            'status' => 200,
            'message' => 'Permissões atualizadas com sucesso.'
        ]);

    } catch (\Exception $e) {
        error_log("Erro ao atualizar permissões: " . $e->getMessage());
        http_response_code(500);
        echo json_encode([
            'status' => 500,
            'message' => 'Erro interno ao atualizar permissões: ' . $e->getMessage()
        ]);
    }
}
}
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
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        if (!isset($_SESSION['logged_in']) || !$_SESSION['logged_in']) {
            http_response_code(401);
            echo json_encode(['status' => 401, 'message' => 'Não autenticado.']);
            exit;
        }

        if (!isset($_SESSION['user_permissions']) || 
            !in_array('user_management', $_SESSION['user_permissions'])) {
            http_response_code(403);
            echo json_encode(['status' => 403, 'message' => 'Permissão insuficiente.']);
            exit;
        }

        $this->user = new User();
        $this->permission = new Permission();
        $this->permissionHistory = new PermissionHistory();
    }

    // Buscar usuários para autocomplete
    public function search()
    {
        try {
            while (ob_get_level()) ob_end_clean();
            header('Content-Type: application/json; charset=utf-8');

            $term = $_GET['term'] ?? '';
            if (empty($term)) {
                echo json_encode(['status' => 200, 'data' => []]);
                return;
            }

            $sql = "
                SELECT id, full_name, employee_id, email, job_title
                FROM user 
                WHERE (full_name LIKE :term OR employee_id LIKE :term) AND is_active = 1
                ORDER BY full_name
                LIMIT 10
            ";
            $stmt = $this->user->getDb()->prepare($sql);
            $stmt->execute(['term' => "%$term%"]);
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode(['status' => 200, 'data' => $users]);
        } catch (\Exception $e) {
            error_log("Erro ao buscar usuários: " . $e->getMessage());
            http_response_code(500);
            echo json_encode(['status' => 500, 'message' => 'Erro interno ao buscar usuários.']);
        }
    }

    // Listar todos os usuários
    public function index()
    {
        try {
            while (ob_get_level()) ob_end_clean();
            header('Content-Type: application/json; charset=utf-8');

            $users = $this->user->getAllWithPermissions();
            echo json_encode(['status' => 200, 'data' => $users]);
        } catch (\Exception $e) {
            error_log("Erro ao listar usuários: " . $e->getMessage());
            http_response_code(500);
            echo json_encode(['status' => 500, 'message' => 'Erro interno ao listar usuários.']);
        }
    }

    // Detalhar um usuário
    public function show($id)
    {
        try {
            while (ob_get_level()) ob_end_clean();
            header('Content-Type: application/json; charset=utf-8');

            $user = $this->user->findWithPermissions($id);
            if (!$user) {
                http_response_code(404);
                echo json_encode(['status' => 404, 'message' => 'Usuário não encontrado.']);
                return;
            }

            echo json_encode(['status' => 200, 'data' => $user]);
        } catch (\Exception $e) {
            error_log("Erro ao buscar usuário: " . $e->getMessage());
            http_response_code(500);
            echo json_encode(['status' => 500, 'message' => 'Erro interno ao buscar usuário.']);
        }
    }

    // Criar novo usuário
    public function store()
    {
        try {
            while (ob_get_level()) ob_end_clean();
            header('Content-Type: application/json; charset=utf-8');

            $input = json_decode(file_get_contents('php://input'), true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new \Exception('JSON inválido', 400);
            }

            $required = ['full_name', 'email', 'password'];
            foreach ($required as $field) {
                if (empty($input[$field])) {
                    http_response_code(400);
                    echo json_encode(['status' => 400, 'message' => "Campo obrigatório: {$field}"]);
                    return;
                }
            }

            if ($this->user->where('email', $input['email'])->first()) {
                http_response_code(409);
                echo json_encode(['status' => 409, 'message' => 'E-mail já cadastrado.']);
                return;
            }

            $userId = $this->user->create([
                'full_name' => $input['full_name'],
                'email' => $input['email'],
                'password_hash' => password_hash($input['password'], PASSWORD_DEFAULT),
                'job_title' => $input['job_title'] ?? null,
                'employee_id' => $input['employee_id'] ?? null,
                'cost_center' => $input['cost_center'] ?? null,
                'cost_center_description' => $input['cost_center_description'] ?? null,
                'whatsapp_phone' => $input['whatsapp_phone'] ?? null,
                'is_active' => $input['is_active'] ?? true
            ]);

            if (isset($input['permissions'])) {
                $this->user->syncPermissions($userId, $input['permissions']);
                $this->logPermissionChanges($userId, $input['permissions'], []);
            }

            echo json_encode(['status' => 201, 'message' => 'Usuário criado com sucesso.', 'data' => ['user_id' => $userId]]);
        } catch (\Exception $e) {
            error_log("Erro ao criar usuário: " . $e->getMessage());
            http_response_code(500);
            echo json_encode(['status' => 500, 'message' => 'Erro interno ao criar usuário.']);
        }
    }

    // Atualizar usuário
    public function update($id)
    {
        try {
            while (ob_get_level()) ob_end_clean();
            header('Content-Type: application/json; charset=utf-8');

            $input = json_decode(file_get_contents('php://input'), true);
            if (json_last_error() !== JSON_ERROR_NONE) throw new \Exception('JSON inválido', 400);

            $existingUser = $this->user->find($id);
            if (!$existingUser) {
                http_response_code(404);
                echo json_encode(['status' => 404, 'message' => 'Usuário não encontrado.']);
                return;
            }

            $fields = ['full_name', 'job_title', 'employee_id', 'cost_center', 'cost_center_description', 'whatsapp_phone', 'is_active'];
            $updateData = array_intersect_key($input, array_flip($fields));
            if (!empty($input['password'])) {
                $updateData['password_hash'] = password_hash($input['password'], PASSWORD_DEFAULT);
            }

            $this->user->update($id, $updateData);

            if (isset($input['permissions'])) {
                $old = array_column($this->user->getUserPermissions($id), 'id');
                $this->user->syncPermissions($id, $input['permissions']);
                $this->logPermissionChanges($id, $input['permissions'], $old);
            }

            echo json_encode(['status' => 200, 'message' => 'Usuário atualizado com sucesso.']);
        } catch (\Exception $e) {
            error_log("Erro ao atualizar usuário: " . $e->getMessage());
            http_response_code(500);
            echo json_encode(['status' => 500, 'message' => 'Erro interno ao atualizar usuário.']);
        }
    }

    // Desativar usuário
    public function destroy($id)
    {
        try {
            while (ob_get_level()) ob_end_clean();
            header('Content-Type: application/json; charset=utf-8');

            $user = $this->user->find($id);
            if (!$user) {
                http_response_code(404);
                echo json_encode(['status' => 404, 'message' => 'Usuário não encontrado.']);
                return;
            }

            if ($id == $_SESSION['user_id']) {
                http_response_code(400);
                echo json_encode(['status' => 400, 'message' => 'Não é possível excluir seu próprio usuário.']);
                return;
            }

            $this->user->update($id, ['is_active' => false]);
            echo json_encode(['status' => 200, 'message' => 'Usuário desativado com sucesso.']);
        } catch (\Exception $e) {
            error_log("Erro ao excluir usuário: " . $e->getMessage());
            http_response_code(500);
            echo json_encode(['status' => 500, 'message' => 'Erro interno ao excluir usuário.']);
        }
    }

    // Listar permissões
    public function getPermissions()
    {
        try {
            while (ob_get_level()) ob_end_clean();
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(['status' => 200, 'data' => $this->permission->all()]);
        } catch (\Exception $e) {
            error_log("Erro ao listar permissões: " . $e->getMessage());
            http_response_code(500);
            echo json_encode(['status' => 500, 'message' => 'Erro interno ao listar permissões.']);
        }
    }

    // Histórico de permissões
    public function getPermissionHistory($id)
    {
        try {
            while (ob_get_level()) ob_end_clean();
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(['status' => 200, 'data' => $this->permissionHistory->getByUserId($id)]);
        } catch (\Exception $e) {
            error_log("Erro ao buscar histórico: " . $e->getMessage());
            http_response_code(500);
            echo json_encode(['status' => 500, 'message' => 'Erro interno ao buscar histórico.']);
        }
    }

    // Registrar alterações de permissões
    private function logPermissionChanges($userId, $new, $old)
    {
        try {
            $granted = array_diff($new, $old);
            foreach ($granted as $pid) {
                $this->permissionHistory->create([
                    'user_id' => $userId,
                    'permission_id' => $pid,
                    'responsible_user_id' => $_SESSION['user_id'],
                    'action' => 'CONCEDER'
                ]);
            }

            $revoked = array_diff($old, $new);
            foreach ($revoked as $pid) {
                $this->permissionHistory->create([
                    'user_id' => $userId,
                    'permission_id' => $pid,
                    'responsible_user_id' => $_SESSION['user_id'],
                    'action' => 'REVOGAR'
                ]);
            }
        } catch (\Exception $e) {
            error_log("Erro ao registrar histórico: " . $e->getMessage());
        }
    }

    // Compatibilidade com rota antiga
    public function getUsers() { $this->index(); }

    // Buscar permissões do usuário
    public function getUserPermissions($id)
    {
        try {
            while (ob_get_level()) ob_end_clean();
            header('Content-Type: application/json; charset=utf-8');

            $user = $this->user->findWithPermissions($id);
            if (!$user) {
                http_response_code(404);
                echo json_encode(['status' => 404, 'message' => 'Usuário não encontrado.']);
                return;
            }

            echo json_encode(['status' => 200, 'data' => [
                'user_id' => $user['id'],
                'permissions' => $user['permissions']
            ]]);
        } catch (\Exception $e) {
            error_log("Erro ao buscar permissões: " . $e->getMessage());
            http_response_code(500);
            echo json_encode(['status' => 500, 'message' => 'Erro interno ao buscar permissões.']);
        }
    }

    // Atualizar apenas permissões
    public function updatePermissions($id)
    {
        try {
            while (ob_get_level()) ob_end_clean();
            header('Content-Type: application/json; charset=utf-8');

            $input = json_decode(file_get_contents('php://input'), true);
            if (json_last_error() !== JSON_ERROR_NONE) throw new \Exception('JSON inválido', 400);

            $user = $this->user->find($id);
            if (!$user) {
                http_response_code(404);
                echo json_encode(['status' => 404, 'message' => 'Usuário não encontrado.']);
                return;
            }

            if (!isset($input['permissions']) || !is_array($input['permissions'])) {
                http_response_code(400);
                echo json_encode(['status' => 400, 'message' => 'Campo permissions é obrigatório e deve ser um array.']);
                return;
            }

            $old = array_column($this->user->getUserPermissions($id), 'id');
            $this->user->syncPermissions($id, $input['permissions']);
            $this->logPermissionChanges($id, $input['permissions'], $old);

            echo json_encode(['status' => 200, 'message' => 'Permissões atualizadas com sucesso.']);
        } catch (\Exception $e) {
            error_log("Erro ao atualizar permissões: " . $e->getMessage());
            http_response_code(500);
            echo json_encode(['status' => 500, 'message' => 'Erro interno ao atualizar permissões.']);
        }
    }
}

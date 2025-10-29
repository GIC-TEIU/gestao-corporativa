<?php

namespace App\Controllers;

class UserManagementController
{
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
        if (!isset($_SESSION['user_permissions']) || !in_array('user_management', $_SESSION['user_permissions'])) {
            http_response_code(403);
            echo json_encode([
                'status' => 403,
                'message' => 'Acesso negado. Permissão insuficiente para gerenciar usuários.'
            ]);
            exit;
        }
    }

    public function getUsers()
    {
        try {
            // Sua lógica para buscar usuários
            $users = []; // Buscar do banco de dados
            
            echo json_encode([
                'status' => 200,
                'data' => $users
            ]);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode([
                'status' => 500,
                'message' => 'Erro ao buscar usuários: ' . $e->getMessage()
            ]);
        }
    }

    public function getUserPermissions($userId)
    {
        try {
            // Lógica para buscar permissões do usuário
            $permissions = []; // Buscar do banco
            
            echo json_encode([
                'status' => 200,
                'data' => $permissions
            ]);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode([
                'status' => 500,
                'message' => 'Erro ao buscar permissões: ' . $e->getMessage()
            ]);
        }
    }

    public function index()
    {
        $this->getUsers();
    }

    public function show($id)
    {
        try {
            // Lógica para buscar usuário específico
            $user = []; // Buscar do banco
            
            echo json_encode([
                'status' => 200,
                'data' => $user
            ]);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode([
                'status' => 500,
                'message' => 'Erro ao buscar usuário: ' . $e->getMessage()
            ]);
        }
    }

    public function store()
    {
        try {
            $input = json_decode(file_get_contents('php://input'), true);
            
            // Lógica para criar usuário
            // $user = criar usuário no banco
            
            echo json_encode([
                'status' => 201,
                'message' => 'Usuário criado com sucesso',
                'data' => $input
            ]);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode([
                'status' => 500,
                'message' => 'Erro ao criar usuário: ' . $e->getMessage()
            ]);
        }
    }

    public function update($id)
    {
        try {
            $input = json_decode(file_get_contents('php://input'), true);
            
            // Lógica para atualizar usuário
            
            echo json_encode([
                'status' => 200,
                'message' => 'Usuário atualizado com sucesso',
                'data' => $input
            ]);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode([
                'status' => 500,
                'message' => 'Erro ao atualizar usuário: ' . $e->getMessage()
            ]);
        }
    }

    public function destroy($id)
    {
        try {
            // Lógica para deletar usuário
            
            echo json_encode([
                'status' => 200,
                'message' => 'Usuário deletado com sucesso'
            ]);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode([
                'status' => 500,
                'message' => 'Erro ao deletar usuário: ' . $e->getMessage()
            ]);
        }
    }

    public function getPermissions()
    {
        try {
            // Lógica para buscar todas as permissões disponíveis
            $permissions = []; // Buscar do banco
            
            echo json_encode([
                'status' => 200,
                'data' => $permissions
            ]);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode([
                'status' => 500,
                'message' => 'Erro ao buscar permissões: ' . $e->getMessage()
            ]);
        }
    }

    public function getPermissionHistory($userId)
    {
        try {
            // Lógica para buscar histórico de permissões
            $history = []; // Buscar do banco
            
            echo json_encode([
                'status' => 200,
                'data' => $history
            ]);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode([
                'status' => 500,
                'message' => 'Erro ao buscar histórico: ' . $e->getMessage()
            ]);
        }
    }
}

/*
namespace App\Controllers;

use App\Models\User;
use App\Models\Permission;
use App\Models\PermissionHistory;

class UserManagementController
{
    protected $user;
    protected $permission;
    protected $permissionHistory;

    public function __construct()
    {
        // Verificar autenticação e permissões
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
            http_response_code(401);
            echo json_encode([
                'status' => 401,
                'message' => 'Não autenticado.'
            ]);
            exit;
        }

        // Verificar se usuário tem permissão para gerenciar usuários
        if (!in_array('manage_users', $_SESSION['user_permissions'] ?? [])) {
            http_response_code(403);
            echo json_encode([
                'status' => 403,
                'message' => 'Acesso negado. Permissão necessária: manage_users.'
            ]);
            exit;
        }

        // Inicializar modelos
        $this->user = new User();
        $this->permission = new Permission();
        $this->permissionHistory = new PermissionHistory();
    }

    
    public function index()
    {
        try {
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

    
    public function show($id)
    {
        try {
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

    
    public function store()
    {
        try {
            $input = json_decode(file_get_contents('php://input'), true);

            // Validações básicas
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

            // Verificar se email já existe
            $existingUser = $this->user->where('email', $input['email'])->first();
            if ($existingUser) {
                http_response_code(409);
                echo json_encode([
                    'status' => 409,
                    'message' => 'Já existe um usuário com este email.'
                ]);
                return;
            }

            // Preparar dados do usuário
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

            // Criar usuário
            $userId = $this->user->create($userData);

            // Atribuir permissões se fornecidas
            if (isset($input['permissions']) && is_array($input['permissions'])) {
                $this->user->syncPermissions($userId, $input['permissions']);
                
                // Registrar no histórico
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

    public function update($id)
    {
        try {
            $input = json_decode(file_get_contents('php://input'), true);

            // Verificar se usuário existe
            $existingUser = $this->user->find($id);
            if (!$existingUser) {
                http_response_code(404);
                echo json_encode([
                    'status' => 404,
                    'message' => 'Usuário não encontrado.'
                ]);
                return;
            }

            // Preparar dados para atualização
            $updateData = [];
            $allowedFields = ['full_name', 'job_title', 'employee_id', 'cost_center', 
                            'cost_center_description', 'whatsapp_phone', 'is_active'];

            foreach ($allowedFields as $field) {
                if (isset($input[$field])) {
                    $updateData[$field] = $input[$field];
                }
            }

            // Atualizar senha se fornecida
            if (!empty($input['password'])) {
                $updateData['password_hash'] = password_hash($input['password'], PASSWORD_DEFAULT);
            }

            // Atualizar usuário
            $this->user->update($id, $updateData);

            // Sincronizar permissões se fornecidas
            if (isset($input['permissions']) && is_array($input['permissions'])) {
                $oldPermissions = $this->user->getUserPermissions($id);
                $this->user->syncPermissions($id, $input['permissions']);
                
                // Registrar mudanças no histórico
                $this->logPermissionChanges($id, $input['permissions'], $oldPermissions);
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

    public function destroy($id)
    {
        try {
            // Verificar se usuário existe
            $existingUser = $this->user->find($id);
            if (!$existingUser) {
                http_response_code(404);
                echo json_encode([
                    'status' => 404,
                    'message' => 'Usuário não encontrado.'
                ]);
                return;
            }

            // Não permitir excluir a si mesmo
            if ($id == $_SESSION['user_id']) {
                http_response_code(400);
                echo json_encode([
                    'status' => 400,
                    'message' => 'Não é possível excluir seu próprio usuário.'
                ]);
                return;
            }

            // Soft delete - marcar como inativo
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

    
    public function getPermissions()
    {
        try {
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

    
    public function getPermissionHistory($id)
    {
        try {
            $history = $this->permissionHistory->getByUserId($id);
            
            echo json_encode([
                'status' => 200,
                'data' => $history
            ]);
        } catch (\Exception $e) {
            error_log("Erro ao buscar histórico: " . $e->getMessage());
            http_response_code(500);
            echo json_encode([
                'status' => 500,
                'message' => 'Erro interno ao buscar histórico de permissões.'
            ]);
        }
    }

   
    private function logPermissionChanges($userId, $newPermissions, $oldPermissions)
    {
        try {
            $oldPermissionIds = array_column($oldPermissions, 'id');
            $newPermissionIds = $newPermissions;

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
    
}

*/
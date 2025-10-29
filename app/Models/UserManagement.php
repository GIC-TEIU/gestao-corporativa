<?php
namespace App\Models;

use PDO;

class UserManagement
{
    protected $table = 'user';
    protected $db;

    public function __construct()
    {
        $config = include __DIR__ . '/../../config/database.php';
        $mysql = $config['connections']['mysql'];

        $this->db = new PDO(
            "mysql:host={$mysql['host']};dbname={$mysql['database']};charset={$mysql['charset']}",
            $mysql['username'],
            $mysql['password']
        );
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    // Buscar todos os usuários com suas permissões
    public function getUsersWithPermissions($filters = [])
    {
        $whereConditions = [];
        $params = [];

        // Filtros opcionais
        if (isset($filters['search']) && $filters['search'] !== '') {
            $whereConditions[] = '(u.full_name LIKE :search OR u.email LIKE :search)';
            $params['search'] = '%' . $filters['search'] . '%';
        }

        if (isset($filters['status']) && $filters['status'] !== '') {
            $whereConditions[] = 'u.is_active = :status';
            $params['status'] = $filters['status'];
        }

        $whereClause = '';
        if (!empty($whereConditions)) {
            $whereClause = 'WHERE ' . implode(' AND ', $whereConditions);
        }

        $sql = "
            SELECT 
                u.id,
                u.full_name,
                u.email,
                u.job_title,
                u.employee_id,
                u.cost_center,
                u.cost_center_description,
                u.whatsapp_phone,
                u.profile_photo_path,
                u.is_active,
                u.created_at,
                GROUP_CONCAT(DISTINCT p.title) as permissions
            FROM 
                user u
            LEFT JOIN 
                user_permission up ON u.id = up.user_id
            LEFT JOIN 
                permission p ON up.permission_id = p.id
            {$whereClause}
            GROUP BY 
                u.id
            ORDER BY 
                u.full_name
        ";

        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Buscar um usuário por ID com permissões
    public function getUserWithPermissions($id)
    {
        $sql = "
            SELECT 
                u.id,
                u.full_name,
                u.email,
                u.job_title,
                u.employee_id,
                u.cost_center,
                u.cost_center_description,
                u.whatsapp_phone,
                u.profile_photo_path,
                u.is_active,
                u.created_at,
                GROUP_CONCAT(DISTINCT p.title) as permissions
            FROM 
                user u
            LEFT JOIN 
                user_permission up ON u.id = up.user_id
            LEFT JOIN 
                permission p ON up.permission_id = p.id
            WHERE 
                u.id = ?
            GROUP BY 
                u.id
        ";

        $stmt = $this->db->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Buscar todas as permissões disponíveis
    public function getAllPermissions()
    {
        $sql = "SELECT * FROM permission ORDER BY title";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Criar usuário
    public function createUser($userData)
    {
        $sql = "
            INSERT INTO user 
                (full_name, email, password_hash, job_title, employee_id, cost_center, cost_center_description, whatsapp_phone, profile_photo_path, is_active, created_at) 
            VALUES 
                (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
        ";

        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            $userData['full_name'],
            $userData['email'],
            password_hash($userData['password'], PASSWORD_DEFAULT),
            $userData['job_title'] ?? null,
            $userData['employee_id'] ?? null,
            $userData['cost_center'] ?? null,
            $userData['cost_center_description'] ?? null,
            $userData['whatsapp_phone'] ?? null,
            $userData['profile_photo_path'] ?? null,
            $userData['is_active'] ?? 1
        ]);

        return $this->db->lastInsertId();
    }

    // Atualizar usuário
    public function updateUser($id, $userData)
    {
        $allowedFields = ['full_name', 'email', 'job_title', 'employee_id', 'cost_center', 'cost_center_description', 'whatsapp_phone', 'profile_photo_path', 'is_active'];
        $updates = [];
        $params = [];

        foreach ($allowedFields as $field) {
            if (isset($userData[$field])) {
                $updates[] = "{$field} = ?";
                $params[] = $userData[$field];
            }
        }

        if (empty($updates)) {
            return false;
        }

        $params[] = $id;
        $sql = "UPDATE user SET " . implode(', ', $updates) . " WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute($params);
    }

    // Excluir usuário (soft delete)
    public function deleteUser($id)
    {
        $sql = "UPDATE user SET is_active = 0 WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$id]);
    }

    // Atribuir permissões a um usuário
    public function assignPermissions($userId, $permissionIds)
    {
        // Primeiro remove as permissões atuais
        $this->removeAllPermissions($userId);

        // Insere as novas permissões
        $sql = "INSERT INTO user_permission (user_id, permission_id) VALUES (?, ?)";
        $stmt = $this->db->prepare($sql);

        foreach ($permissionIds as $permissionId) {
            $stmt->execute([$userId, $permissionId]);
        }
    }

    // Remover todas as permissões de um usuário
    public function removeAllPermissions($userId)
    {
        $sql = "DELETE FROM user_permission WHERE user_id = ?";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$userId]);
    }

    // Buscar ID da permissão pelo título
    public function getPermissionIdByTitle($title)
    {
        $sql = "SELECT id FROM permission WHERE title = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$title]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result ? $result['id'] : null;
    }

    // Buscar usuário por email
    public function getUserByEmail($email)
    {
        $sql = "SELECT * FROM user WHERE email = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$email]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Registrar no histórico de permissões
    public function logPermissionChange($userId, $permissionId, $responsibleUserId, $action)
    {
        $sql = "
            INSERT INTO permission_history 
                (user_id, permission_id, responsible_user_id, action, action_at) 
            VALUES 
                (?, ?, ?, ?, NOW())
        ";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$userId, $permissionId, $responsibleUserId, $action]);
    }

    // Buscar histórico de permissões de um usuário
    public function getPermissionHistory($userId)
    {
        $sql = "
            SELECT 
                ph.*,
                p.title as permission_title,
                u.full_name as responsible_user_name
            FROM 
                permission_history ph
            JOIN 
                permission p ON ph.permission_id = p.id
            JOIN 
                user u ON ph.responsible_user_id = u.id
            WHERE 
                ph.user_id = ?
            ORDER BY 
                ph.action_at DESC
        ";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$userId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
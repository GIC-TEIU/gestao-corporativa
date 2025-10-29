<?php
namespace App\Models;

use PDO;

class PermissionHistory
{
    protected $table = 'permission_history';
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

    public function getByUserId($userId)
    {
        $sql = "
            SELECT 
                ph.*,
                p.title as permission_title,
                u.full_name as responsible_user_name
            FROM 
                {$this->table} ph
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

    public function create($data)
    {
        $sql = "
            INSERT INTO {$this->table} 
                (user_id, permission_id, responsible_user_id, action, action_at) 
            VALUES 
                (?, ?, ?, ?, NOW())
        ";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            $data['user_id'],
            $data['permission_id'],
            $data['responsible_user_id'],
            $data['action']
        ]);
    }
}
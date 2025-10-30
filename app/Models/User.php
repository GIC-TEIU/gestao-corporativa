<?php
namespace App\Models;

use PDO;

class User
{
    protected $table = 'user'; 
    protected $db;
    protected $whereCondition = '';
    protected $whereParams = [];

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

    // Método para fornecer acesso à conexão do banco
    public function getDb()
    {
        return $this->db;
    }

    public function where($field, $value)
    {
        $this->whereCondition = "WHERE $field = :$field";
        $this->whereParams = [$field => $value];
        return $this;
    }

    public function first()
    {
        if (empty($this->whereCondition)) {
            return null;
        }

        $sql = "SELECT * FROM {$this->table} {$this->whereCondition} LIMIT 1";
        $stmt = $this->db->prepare($sql);
        $stmt->execute($this->whereParams);
        
        // Reset conditions
        $this->whereCondition = '';
        $this->whereParams = [];
        
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Método adicional para buscar usuário por ID
    public function find($id)
    {
        $sql = "SELECT * FROM {$this->table} WHERE id = ? LIMIT 1";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$id]);
        
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // ... no seu User.php existente

public function getAllWithPermissions()
{
    $sql = "
        SELECT 
            u.*,
            GROUP_CONCAT(p.title) as permission_titles,
            GROUP_CONCAT(p.id) as permission_ids
        FROM {$this->table} u
        LEFT JOIN user_permission up ON u.id = up.user_id
        LEFT JOIN permission p ON up.permission_id = p.id
        GROUP BY u.id
        ORDER BY u.full_name
    ";
    
    $stmt = $this->db->prepare($sql);
    $stmt->execute();
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Processar para formatar as permissões como array
    foreach ($users as &$user) {
        $user['permissions'] = [];
        if (!empty($user['permission_ids'])) {
            $permissionIds = explode(',', $user['permission_ids']);
            $permissionTitles = explode(',', $user['permission_titles']);
            
            $user['permissions'] = array_combine($permissionIds, $permissionTitles);
        }
        unset($user['permission_ids'], $user['permission_titles']);
    }
    
    return $users;
}

public function findWithPermissions($id)
{
    $sql = "
        SELECT 
            u.*,
            GROUP_CONCAT(p.title) as permission_titles,
            GROUP_CONCAT(p.id) as permission_ids
        FROM {$this->table} u
        LEFT JOIN user_permission up ON u.id = up.user_id
        LEFT JOIN permission p ON up.permission_id = p.id
        WHERE u.id = ?
        GROUP BY u.id
    ";
    
    $stmt = $this->db->prepare($sql);
    $stmt->execute([$id]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($user) {
        $user['permissions'] = [];
        if (!empty($user['permission_ids'])) {
            $permissionIds = explode(',', $user['permission_ids']);
            $permissionTitles = explode(',', $user['permission_titles']);
            
            $user['permissions'] = array_combine($permissionIds, $permissionTitles);
        }
        unset($user['permission_ids'], $user['permission_titles']);
    }
    
    return $user;
}

public function create($data)
{
    $fields = implode(', ', array_keys($data));
    $placeholders = ':' . implode(', :', array_keys($data));
    
    $sql = "INSERT INTO {$this->table} ($fields) VALUES ($placeholders)";
    $stmt = $this->db->prepare($sql);
    $stmt->execute($data);
    
    return $this->db->lastInsertId();
}

public function update($id, $data)
{
    $setClause = [];
    foreach ($data as $key => $value) {
        $setClause[] = "$key = :$key";
    }
    $setClause = implode(', ', $setClause);
    
    $sql = "UPDATE {$this->table} SET $setClause WHERE id = :id";
    $stmt = $this->db->prepare($sql);
    
    $data['id'] = $id;
    return $stmt->execute($data);
}

public function getUserPermissions($userId)
{
    $sql = "
        SELECT p.id, p.title 
        FROM user_permission up 
        JOIN permission p ON up.permission_id = p.id 
        WHERE up.user_id = ?
    ";
    
    $stmt = $this->db->prepare($sql);
    $stmt->execute([$userId]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

public function syncPermissions($userId, $permissionIds)
{
    // Remover permissões atuais
    $sql = "DELETE FROM user_permission WHERE user_id = ?";
    $stmt = $this->db->prepare($sql);
    $stmt->execute([$userId]);
    
    // Adicionar novas permissões
    if (!empty($permissionIds)) {
        $sql = "INSERT INTO user_permission (user_id, permission_id) VALUES (?, ?)";
        $stmt = $this->db->prepare($sql);
        
        foreach ($permissionIds as $permissionId) {
            $stmt->execute([$userId, $permissionId]);
        }
    }
    
    return true;
}
}
// Busca e insere usuários no banco de dados.
// Quais classes/métodos:
// class User
// public function findByEmail(string $email):
    // Pega a conexão com o banco (Database::getConnection('mysql')).
    // Prepara e executa um SELECT * FROM user WHERE email = ?.
    // Retorna os dados do usuário (ou false se não encontrar).
// public function create(array $data):
    // Pega a conexão com o banco.
    // Prepara e executa um INSERT INTO user (full_name, email, password_hash, ...) com os dados recebidos.
    // Retorna o ID do novo usuário (ou true se deu certo).
    
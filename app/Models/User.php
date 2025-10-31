<?php

namespace App\Models;

use PDO;

class User
{
    protected string $table = 'user';
    protected PDO $db;
    protected string $whereCondition = '';
    protected array $whereParams = [];

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

    // Busca de usuários para autocomplete
    public function searchUsers(string $term): array
    {
        $sql = "
            SELECT id, full_name, employee_id, email, job_title
            FROM user 
            WHERE (full_name LIKE :term OR employee_id LIKE :term)
              AND is_active = 1
            ORDER BY full_name
            LIMIT 10
        ";

        $stmt = $this->db->prepare($sql);
        $stmt->execute(['term' => "%{$term}%"]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getDb(): PDO
    {
        return $this->db;
    }

    public function where(string $field, mixed $value): self
    {
        $this->whereCondition = "WHERE {$field} = :{$field}";
        $this->whereParams = [$field => $value];
        return $this;
    }

    public function first(): ?array
    {
        if (empty($this->whereCondition)) {
            return null;
        }

        $sql = "SELECT * FROM {$this->table} {$this->whereCondition} LIMIT 1";
        $stmt = $this->db->prepare($sql);
        $stmt->execute($this->whereParams);

        $this->whereCondition = '';
        $this->whereParams = [];

        return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
    }

    public function find(int $id): ?array
    {
        $sql = "SELECT * FROM {$this->table} WHERE id = ? LIMIT 1";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$id]);

        return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
    }

    // Retorna todos os usuários com permissões (com filtros)
    public function getAllWithPermissions(array $filters = []): array
    {
        $whereConditions = [];
        $params = [];

        // Filtro: status
        if (!empty($filters['status'])) {
            if ($filters['status'] === 'ativo') {
                $whereConditions[] = 'u.is_active = 1';
            } elseif ($filters['status'] === 'inativo') {
                $whereConditions[] = 'u.is_active = 0';
            }
        }

        // Filtro: setor
        if (!empty($filters['setor'])) {
            $whereConditions[] = 'u.cost_center_description = :setor';
            $params['setor'] = $filters['setor'];
        }

        // Filtro: data de cadastro
        if (!empty($filters['dataCadastro'])) {
            $dateCondition = $this->getDateCondition($filters['dataCadastro']);
            if ($dateCondition) {
                $whereConditions[] = $dateCondition;
            }
        }

        $whereClause = !empty($whereConditions)
            ? 'WHERE ' . implode(' AND ', $whereConditions)
            : '';

        $sql = "
            SELECT 
                u.*,
                GROUP_CONCAT(p.title) AS permission_titles,
                GROUP_CONCAT(p.id) AS permission_ids
            FROM {$this->table} u
            LEFT JOIN user_permission up ON u.id = up.user_id
            LEFT JOIN permission p ON up.permission_id = p.id
            {$whereClause}
            GROUP BY u.id
            ORDER BY u.full_name
        ";

        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($users as &$user) {
            $user['permissions'] = [];
            if (!empty($user['permission_ids'])) {
                $ids = explode(',', $user['permission_ids']);
                $titles = explode(',', $user['permission_titles']);
                $user['permissions'] = array_combine($ids, $titles);
            }
            unset($user['permission_ids'], $user['permission_titles']);
        }

        return $users;
    }

    private function getDateCondition(string $period): ?string
    {
        $conditions = [
            'hoje'   => "DATE(u.created_at) = CURDATE()",
            '7dias'  => "u.created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)",
            '30dias' => "u.created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)",
            '3meses' => "u.created_at >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)",
            'ano'    => "YEAR(u.created_at) = YEAR(CURDATE())"
        ];

        return $conditions[$period] ?? null;
    }

    public function findWithPermissions(int $id): ?array
    {
        $sql = "
            SELECT 
                u.*,
                GROUP_CONCAT(p.title) AS permission_titles,
                GROUP_CONCAT(p.id) AS permission_ids
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
                $ids = explode(',', $user['permission_ids']);
                $titles = explode(',', $user['permission_titles']);
                $user['permissions'] = array_combine($ids, $titles);
            }
            unset($user['permission_ids'], $user['permission_titles']);
        }

        return $user ?: null;
    }

    public function create(array $data): int
    {
        $fields = implode(', ', array_keys($data));
        $placeholders = ':' . implode(', :', array_keys($data));

        $sql = "INSERT INTO {$this->table} ({$fields}) VALUES ({$placeholders})";
        $stmt = $this->db->prepare($sql);
        $stmt->execute($data);

        return (int)$this->db->lastInsertId();
    }

    public function update(int $id, array $data): bool
    {
        $setClause = implode(', ', array_map(fn($k) => "{$k} = :{$k}", array_keys($data)));
        $sql = "UPDATE {$this->table} SET {$setClause} WHERE id = :id";

        $stmt = $this->db->prepare($sql);
        $data['id'] = $id;

        return $stmt->execute($data);
    }

    public function getUserPermissions(int $userId): array
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

    public function syncPermissions(int $userId, array $permissionIds): bool
    {
        $this->db->prepare("DELETE FROM user_permission WHERE user_id = ?")
                 ->execute([$userId]);

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
    
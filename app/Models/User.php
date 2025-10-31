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

    /**
     * Busca o primeiro resultado para a condição WHERE atual.
     * @return array|false Retorna os dados do usuário ou false se não encontrar.
     */
    public function first()
    {
        if (empty($this->whereCondition)) {
            return null;
        }

        $sql = "SELECT * FROM {$this->table} {$this->whereCondition} LIMIT 1";
        $stmt = $this->db->prepare($sql);
        $stmt->execute($this->whereParams);
        
        $this->whereCondition = '';
        $this->whereParams = [];
        
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function find($id)
    {
        $sql = "SELECT * FROM {$this->table} WHERE id = ? LIMIT 1";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$id]);
        
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * Pega a conexão com o banco e executa um SELECT * FROM user WHERE email = ?.
     * Retorna os dados do usuário (ou false se não encontrar).
     * @param string $email
     * @return array|false
     */
    public function findByEmail(string $email): array|false
    {
        return $this->where('email', $email)->first();
    }

    /**
 * Verifica se uma matrícula já existe no banco de dados
 * @param string $matricula
 * @return bool
 */
public function matriculaExists(string $matricula): bool
{
    $sql = "SELECT COUNT(*) FROM {$this->table} WHERE employee_id = ?";
    $stmt = $this->db->prepare($sql);
    $stmt->execute([$matricula]);
    
    return $stmt->fetchColumn() > 0;
}

    /**
     * Verifica se um e-mail já existe no banco de dados
     * @param string $email
     * @return bool
     */
    public function emailExists(string $email): bool
    {
        $sql = "SELECT COUNT(*) FROM {$this->table} WHERE email = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$email]);
        
        return $stmt->fetchColumn() > 0;
    }

    /**
     * Verifica se um CPF já existe no banco de dados
     * @param string $cpf
     * @return bool
     */
    public function cpfExists(string $cpf): bool
    {
        $sql = "SELECT COUNT(*) FROM {$this->table} WHERE cpf = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$cpf]);
        
        return $stmt->fetchColumn() > 0;
    }

    /**
     * Cria um novo usuário no banco de dados
     * @param array $data
     * @return int|false
     */
    public function create(array $data): int|false
    {
        if (empty($data)) {
            return false;
        }

        $fields = implode(', ', array_keys($data));
        $placeholders = ':' . implode(', :', array_keys($data));

        $sql = "INSERT INTO {$this->table} ({$fields}) VALUES ({$placeholders})";
        $stmt = $this->db->prepare($sql);
        
        $success = $stmt->execute($data);

        if ($success) {
            return (int) $this->db->lastInsertId();
        }
        
        return false;
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
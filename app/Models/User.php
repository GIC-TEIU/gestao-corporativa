<?php
namespace App\Models;

use PDO;

class User
{
    protected $table = 'user'; // Nome correto da tabela no seu BD
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
    
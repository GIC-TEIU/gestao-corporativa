<?php

namespace App\Models;

use App\Core\Database;
use PDO;
use Exception; 

class CabecalhoRequisicao
{
    private $pdo;
    const TABLE_NAME = 'request'; 

    public function __construct()
    {
        $this->pdo = Database::getConnection('mysql');
    }

    //Cria um novo registro de cabeçalho (Passo A da transação).

    public function create(array $data, int $userId): string
    {
        
        $sql = "INSERT INTO " . self::TABLE_NAME . "
                    (requester_user_id, manager_id, director_id, title, observations, operational_unit, category, status, detail_type, detail_id)
                VALUES
                    (:requester_user_id, :manager_id, :director_id, :title, :observations, :operational_unit, :category, :status, NULL, NULL)";

        $stmt = $this->pdo->prepare($sql);

        
        $title = "Requisição RAP - " . ($data['requisitante'] ?? 'Usuário') . " - " . date('Y-m-d H:i');

        $result = $stmt->execute([
            ':requester_user_id' => $userId,
            ':manager_id' => $data['gerente'] ?? null, 
            ':director_id' => $data['diretor'] ?? null, 
            ':title' => $title,
            ':observations' => $data['observacoes'] ?? null,
            ':operational_unit' => $data['unidade'] ?? null, 
            ':category' => 'ADMISSAO', 
            ':status' => 'PENDENTE'    
        ]);

        if (!$result) {
            throw new Exception("Falha ao executar o INSERT na tabela request.");
        }

        $lastId = $this->pdo->lastInsertId();
        if (!$lastId) {
             throw new Exception("Não foi possível obter o lastInsertId após INSERT na tabela request.");
        }

        return $lastId;
    }

    //Atualiza o cabeçalho com os IDs polimórficos (Passo E da transação).
    public function updatePolymorphicLink(int $requestId, int $detailId, string $detailType): bool
    {
        
        $sql = "UPDATE " . self::TABLE_NAME . "
                SET detail_id = :detailId, detail_type = :detailType
                WHERE id = :requestId";

        $stmt = $this->pdo->prepare($sql);

        return $stmt->execute([
            ':detailId' => $detailId,
            ':detailType' => $detailType,
            ':requestId' => $requestId
        ]);
    }
}
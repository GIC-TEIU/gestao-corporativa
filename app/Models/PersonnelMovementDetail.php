<?php

namespace App\Models;

use App\Core\Database;
use PDO;
use Exception;

class PersonnelMovementDetail
{
    private $pdo;
    const TABLE_NAME = 'personnel_movement_detail';

    public function __construct()
    {
        $this->pdo = Database::getConnection('mysql');
    }

public function create(int $requestId, array $data, string $movementType): string
{
    $sql = "INSERT INTO " . self::TABLE_NAME . "
            (request_id, protocol, employee_name, employee_job_title, employee_id, cost_center, request_date, movement_type, movement_id)
            VALUES
            (:request_id, :protocol, :employee_name, :employee_job_title, :employee_id, :cost_center, :request_date, :movement_type, NULL)";

    $stmt = $this->pdo->prepare($sql);

    $result = $stmt->execute([
        ':request_id' => $requestId,
        ':protocol' => $data['protocolo'] ?? null,
        ':employee_name' => $data['nome_colaborador'] ?? null,
        ':employee_job_title' => $data['cargo_atual'] ?? null,
        ':employee_id' => $data['matricula'] ?? null,
        ':cost_center' => $data['centro_custo'] ?? null,
        ':request_date' => $data['request_date'] ?? date('Y-m-d H:i:s'),
        ':movement_type' => $movementType
    ]);

    if (!$result) {
        throw new Exception("Falha ao executar INSERT na tabela personnel_movement_detail.");
    }

    return $this->pdo->lastInsertId();
}
    public function updatePolymorphicLink(int $movementDetailId, int $detailId, string $detailType): bool
    {
        $sql = "UPDATE " . self::TABLE_NAME . "
                SET movement_id = :movement_id, movement_type = :movement_type
                WHERE id = :id";

        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([
            ':movement_id' => $detailId,
            ':movement_type' => $detailType,
            ':id' => $movementDetailId
        ]);
    }
}
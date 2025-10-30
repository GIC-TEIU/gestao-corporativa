<?php

namespace App\Models;

use App\Core\Database;
use PDO;
use Exception;

class RelocationDetail
{
    private $pdo;
    const TABLE_NAME = 'relocation_detail';

    public function __construct()
    {
        $this->pdo = Database::getConnection('mysql');
    }

public function create(int $personnelMovementDetailId, array $data): string
{

        error_log("=== RELOCATION DETAIL ===");
    error_log("PersonnelMovementDetailId: " . $personnelMovementDetailId);
    error_log("Dados recebidos: " . print_r($data, true));
    error_log("new_operational_unit: " . ($data['new_operational_unit'] ?? 'NÃO ENCONTRADO'));
    error_log("novo_centro_custo: " . ($data['novo_centro_custo'] ?? 'NÃO ENCONTRADO'));
    error_log("novo_cargo: " . ($data['novo_cargo'] ?? 'NÃO ENCONTRADO'));
    error_log("justificativa: " . ($data['justificativa'] ?? 'NÃO ENCONTRADO'));


    $sql = "INSERT INTO " . self::TABLE_NAME . "
            (personnel_movement_detail_id, new_cost_center, new_operational_unit, new_job_title, reason)
            VALUES
            (:personnel_movement_detail_id, :new_cost_center, :new_operational_unit, :new_job_title, :reason)";

    $stmt = $this->pdo->prepare($sql);

    $result = $stmt->execute([
        ':personnel_movement_detail_id' => $personnelMovementDetailId,
        ':new_cost_center' => $data['novo_centro_custo'] ?? null,
        ':new_operational_unit' => $data['new_operational_unit'] ?? null,
        ':new_job_title' => $data['novo_cargo'] ?? null,
        ':reason' => $data['justificativa'] ?? null
    ]);

    if (!$result) {
        throw new Exception("Falha ao executar INSERT na tabela relocation_detail.");
    }

    return $this->pdo->lastInsertId();
}
}
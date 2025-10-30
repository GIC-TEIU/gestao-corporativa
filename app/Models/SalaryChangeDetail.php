<?php

namespace App\Models;

use App\Core\Database;
use PDO;
use Exception;

class SalaryChangeDetail
{
    private $pdo;
    const TABLE_NAME = 'salary_change_detail';

    public function __construct()
    {
        $this->pdo = Database::getConnection('mysql');
    }

    public function create(int $personnelMovementDetailId, array $data): string
    {
        $movementType = $this->mapearTipoMovimentacao($data['tipo_movimentacao'] ?? null);

        $sql = "INSERT INTO " . self::TABLE_NAME . "
                (personnel_movement_detail_id, previous_value, new_value, movement_type, new_job_title)
                VALUES
                (:personnel_movement_detail_id, :previous_value, :new_value, :movement_type, :new_job_title)";

        $stmt = $this->pdo->prepare($sql);

        $result = $stmt->execute([
            ':personnel_movement_detail_id' => $personnelMovementDetailId,
            ':previous_value' => $data['salario_atual'] ?? null,
            ':new_value' => $data['novo_salario'] ?? null,
            ':movement_type' => $movementType,
            ':new_job_title' => $movementType === 'PROMOCAO' ? ($data['novo_cargo'] ?? null) : null
        ]);

        if (!$result) {
            throw new Exception("Falha ao executar INSERT na tabela salary_change_detail.");
        }

        return $this->pdo->lastInsertId();
    }

    private function mapearTipoMovimentacao(?string $tipo): string
    {
        $map = [
            'salario' => 'AJUSTE_SALARIAL',
            'insalubridade' => 'INSALUBRIDADE',
            'periculosidade' => 'PERICULOSIDADE',
            'promocao_cargo' => 'PROMOCAO'
        ];
        return $map[$tipo] ?? 'AJUSTE_SALARIAL';
    }
}
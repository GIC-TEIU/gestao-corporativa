<?php

namespace App\Models;

use App\Core\Database;
use PDO;
use Exception;

class TerminationDetail
{
    private $pdo;
    const TABLE_NAME = 'termination_detail';

    public function __construct()
    {
        $this->pdo = Database::getConnection('mysql');
    }

    public function create(int $personnelMovementDetailId, array $data): string
    {
        $movementType = $this->mapearTipoMovimentacao($data['tipo_movimentacao'] ?? null);
        $terminationReason = $this->mapearMotivoDesligamento($data['motivo_desligamento'] ?? null);
        $noticeType = $this->mapearTipoAviso($data['tipo_aviso'] ?? null);

        $sql = "INSERT INTO " . self::TABLE_NAME . "
                (personnel_movement_detail_id, termination_reason, notice_type, movement_type)
                VALUES
                (:personnel_movement_detail_id, :termination_reason, :notice_type, :movement_type)";

        $stmt = $this->pdo->prepare($sql);

        $result = $stmt->execute([
            ':personnel_movement_detail_id' => $personnelMovementDetailId,
            ':termination_reason' => $terminationReason,
            ':notice_type' => $noticeType,
            ':movement_type' => $movementType
        ]);

        if (!$result) {
            throw new Exception("Falha ao executar INSERT na tabela termination_detail.");
        }

        return $this->pdo->lastInsertId();
    }

    private function mapearTipoMovimentacao(?string $tipo): string
    {
        $map = [
            'desligamento' => 'DESLIGAMENTO',
            'experiencia' => 'TERMINO_EXPERIENCIA'
        ];
        return $map[$tipo] ?? 'DESLIGAMENTO';
    }

    private function mapearMotivoDesligamento(?string $motivo): string
    {
        $map = [
            'justa_causa' => 'COM_JUSTA_CAUSA',
            'sem_justa_causa' => 'SEM_JUSTA_CAUSA',
            'acordo' => 'ACORDO'
        ];
        return $map[$motivo] ?? 'SEM_JUSTA_CAUSA';
    }

    private function mapearTipoAviso(?string $aviso): string
    {
        $map = [
            'indenizado' => 'INDENIZADO',
            'trabalhado' => 'TRABALHADO',
            'ausente' => 'AUSENTE'
        ];
        return $map[$aviso] ?? 'TRABALHADO';
    }
}
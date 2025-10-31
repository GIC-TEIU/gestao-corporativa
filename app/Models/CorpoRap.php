<?php

namespace App\Models;
use App\Core\Database;
use PDO;
use Exception; 

class CorpoRap
{
    private $pdo;
    const TABLE_NAME = 'admission_detail'; 

    public function __construct()
    {
        $this->pdo = Database::getConnection('mysql');
    }

    //Cria um novo registro de corpo da RAP (Passo C da transação).
    public function create(int $requestId, array $data): string
    {
        
        $sql = "INSERT INTO " . self::TABLE_NAME . "
                    (request_id, job_title, contract_type, work_schedule, department, reason, gender, initial_salary, selection_type, operational_unit, justification, activities_description, observations)
                VALUES
                    (:request_id, :job_title, :contract_type, :work_schedule, :department, :reason, :gender, :initial_salary, :selection_type, :operational_unit, :justification, :activities_description, :observations)";

        $stmt = $this->pdo->prepare($sql);

        
        $contractType = $this->mapContractType($data['categoria'] ?? null);
        $workSchedule = $this->mapWorkSchedule($data['horario_trabalho'] ?? null);
        $reason = $this->mapReason($data['motivo'] ?? null);
        $gender = $this->mapGender($data['sexo'] ?? null);
        $selectionType = $this->mapSelectionType($data['tipo_selecao'] ?? null);
        $operationalUnit = $data['unidade'] ?? null; 

        $result = $stmt->execute([
            ':request_id' => $requestId,
            ':job_title' => $data['cargo'] ?? null,
            ':contract_type' => $contractType,
            ':work_schedule' => $workSchedule,
            ':department' => $data['setor'] ?? null, 
            ':reason' => $reason,
            ':gender' => $gender,
            ':initial_salary' => $data['salario'] ?? null,
            ':selection_type' => $selectionType,
            ':operational_unit' => $operationalUnit,
            ':justification' => $data['justificativa'] ?? null,
            ':activities_description' => $data['descricao_atividades'] ?? null,
            ':observations' => $data['observacoes'] ?? null 
        ]);

         if (!$result) {
            throw new Exception("Falha ao executar o INSERT na tabela admission_detail.");
        }

        $lastId = $this->pdo->lastInsertId();
        if (!$lastId) {
             throw new Exception("Não foi possível obter o lastInsertId após INSERT na tabela admission_detail.");
        }
        return $lastId;
    }

    

    private function mapContractType(?string $value): ?string
    {
        $map = [
            'Celetista' => 'CLT',
            'Estagiário' => 'ESTAGIARIO',
            'Jovem Aprendiz' => 'APRENDIZ',
            'Temporário' => 'TEMPORARIO'
        ];
        return $map[$value] ?? null; 
    }

    private function mapWorkSchedule(?string $value): ?string
    {
        $map = [
            '08h às 18h' => '08h_as_18h',
            '08h às 14h' => '08h_as_14h',
            '12h às 18h' => '12h_as_18h',
            'Escala 12x36' => 'ESCALA_12x36'
        ];
        return $map[$value] ?? null;
    }

     private function mapReason(?string $value): ?string
    {
        $map = [
            'Reposição' => 'SUBSTITUICAO', 
            'Nova posição' => 'AUMENTO_QUADRO', 
            'Ampliação de equipe' => 'AUMENTO_QUADRO' 
        ];
        return $map[$value] ?? null;
    }

    private function mapGender(?string $value): ?string
    {
        $map = [
            'Feminino' => 'FEMININO',
            'Masculino' => 'MASCULINO',
            'Ambos' => null 
        ];
        return $map[$value] ?? null;
    }

    private function mapSelectionType(?string $value): ?string
    {
        $map = [
            'Processo Interno' => 'INTERNA',
            'Processo Externo' => 'EXTERNA',
            'Indicação' => 'INDICACAO'
        ];
        return $map[$value] ?? null;
    }
}
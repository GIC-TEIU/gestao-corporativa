<?php

namespace App\Services;

use App\Core\Database;
use App\Models\CabecalhoRequisicao;
use App\Models\PersonnelMovementDetail;
use App\Models\TerminationDetail;
use App\Models\RelocationDetail;
use App\Models\SalaryChangeDetail;
use PDO;
use Exception;
use Throwable;

class RmpService
{
    private $pdo;
    private $requestModel;
    private $personnelMovementModel;
    private $terminationModel;
    private $relocationModel;
    private $salaryChangeModel;

    public function __construct()
    {
        $this->pdo = Database::getConnection('mysql');
        $this->requestModel = new CabecalhoRequisicao();
        $this->personnelMovementModel = new PersonnelMovementDetail();
        $this->terminationModel = new TerminationDetail();
        $this->relocationModel = new RelocationDetail();
        $this->salaryChangeModel = new SalaryChangeDetail();
    }

public function criarRequisicaoRmp(array $headerData, array $bodyData): int
{

        error_log("=== RMP SERVICE ===");
    error_log("HeaderData: " . print_r($headerData, true));
    error_log("BodyData: " . print_r($bodyData, true));
    error_log("Tipo movimentação: " . ($bodyData['tipo_movimentacao'] ?? 'N/A'));
    
    $userId = 1;
    
    try {
        $this->pdo->beginTransaction();

    
        $requestId = $this->requestModel->create($headerData, $userId, 'MOVIMENTACAO_PESSOAL');
        if (!$requestId) {
            throw new Exception("Falha ao criar o registro na tabela 'request'.");
        }

    
        $movementType = $this->mapearTipoDetalhe($bodyData['tipo_movimentacao'] ?? '');
        $movementDetailId = $this->personnelMovementModel->create($requestId, $bodyData, $movementType);
        
        if (!$movementDetailId) {
            throw new Exception("Falha ao criar o registro na tabela 'personnel_movement_detail'.");
        }

    
        $specificDetailId = $this->criarDetalheEspecifico($bodyData['tipo_movimentacao'], $movementDetailId, $bodyData);
        
        if (!$specificDetailId) {
            throw new Exception("Falha ao criar o detalhe específico para o tipo: " . $bodyData['tipo_movimentacao']);
        }

    
        $detailType = $this->mapearTipoDetalhe($bodyData['tipo_movimentacao']);
        $updated = $this->personnelMovementModel->updatePolymorphicLink($movementDetailId, $specificDetailId, $detailType);
        
        if (!$updated) {
            throw new Exception("Falha ao atualizar o link polimórfico na tabela 'personnel_movement_detail'.");
        }

    
        $updated = $this->requestModel->updatePolymorphicLink($requestId, $movementDetailId, 'personnel_movement_detail');
        if (!$updated) {
            throw new Exception("Falha ao atualizar o link polimórfico na tabela 'request'.");
        }

        $this->pdo->commit();
        return (int) $requestId;

    } catch (Throwable $e) {
        $this->pdo->rollBack();
        throw new Exception("Erro na transação ao criar RMP: " . $e->getMessage());
    }
}

    private function criarDetalheEspecifico(string $movementType, int $movementDetailId, array $bodyData): ?int
    {
        switch ($movementType) {
            case 'desligamento':
            case 'experiencia':
                return $this->terminationModel->create($movementDetailId, $bodyData);
            
            case 'movimentacao':
                return $this->relocationModel->create($movementDetailId, $bodyData);
            
            case 'salario':
            case 'insalubridade':
            case 'periculosidade':
            case 'promocao_cargo':
                return $this->salaryChangeModel->create($movementDetailId, $bodyData);
            
            default:
                throw new Exception("Tipo de movimentação não suportado: " . $movementType);
        }
    }

private function mapearTipoDetalhe(string $movementType): string
{
    $map = [
        'desligamento' => 'termination_detail',
        'experiencia' => 'termination_detail',
        'movimentacao' => 'relocation_detail',
        'salario' => 'salary_change_detail',
        'insalubridade' => 'salary_change_detail',
        'periculosidade' => 'salary_change_detail',
        'promocao_cargo' => 'salary_change_detail'
    ];
    
    if (!isset($map[$movementType])) {
        throw new Exception("Tipo de movimentação não mapeado: " . $movementType);
    }
    
    return $map[$movementType];
}
}
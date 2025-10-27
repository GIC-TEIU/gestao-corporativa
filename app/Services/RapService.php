<?php

namespace App\Services;

use App\Core\Database;
use App\Models\CabecalhoRequisicao;use App\Models\CorpoRap;use PDO;
use Exception;
use Throwable;

class RapService
{
    private $pdo;
    private $requestModel;    private $admissionDetailModel;
    public function __construct()
    {
        $this->pdo = Database::getConnection('mysql');
        $this->requestModel = new CabecalhoRequisicao();        $this->admissionDetailModel = new CorpoRap();    }

// Orquestra a criação da requisição de RAP dentro de uma transação.

    public function criarRequisicaoRap(array $headerData, array $bodyData): int
    {
                $userId = 1;
        try {
            $this->pdo->beginTransaction();

                $requestId = $this->requestModel->create($headerData, $userId);
            if (!$requestId) {
                throw new Exception("Falha ao criar o registro na tabela 'request'.");
            }

                $admissionDetailId = $this->admissionDetailModel->create($requestId, $bodyData);
            if (!$admissionDetailId) {
                throw new Exception("Falha ao criar o registro na tabela 'admission_detail'.");
            }

                $updated = $this->requestModel->updatePolymorphicLink($requestId, $admissionDetailId, 'admission_detail');             if (!$updated) {
                throw new Exception("Falha ao atualizar o link polimórfico na tabela 'request'.");
            }

            $this->pdo->commit();

            return (int) $requestId;

        } catch (Throwable $e) {
            $this->pdo->rollBack();
                    throw new Exception("Erro na transação ao criar RAP: " . $e->getMessage());
        }
    }
}
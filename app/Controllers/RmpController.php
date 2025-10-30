<?php

namespace App\Controllers;

use App\Core\Response;
use App\Services\RmpService;
use Throwable;

class RmpController
{
    public function store()
    {
        $input = (array) json_decode(file_get_contents('php://input'), true);
    
        $headerData = $input['step1'] ?? null;
        $bodyData = $input['step3'] ?? null;
    
        if (!$headerData || !$bodyData) {
            return Response::json([
                'success' => false,
                'message' => 'Dados do cabeçalho ou do corpo da requisição ausentes.'
            ], 400);
        }

        try {
            $rmpService = new RmpService();
            $requisicaoId = $rmpService->criarRequisicaoRmp($headerData, $bodyData);
        
            return Response::json([
                'success' => true,
                'message' => 'Requisição de Movimentação de Pessoal criada com sucesso!',
                'requisicao_id' => $requisicaoId
            ], 201);

        } catch (Throwable $e) {
            return Response::json([
                'success' => false,
                'message' => 'Erro interno ao salvar a requisição: ' . $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ], 500);
        }
    }
}
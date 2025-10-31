<?php

namespace App\Controllers;

use App\Core\Response;
use App\Services\RapService;
use Throwable;

class RapController
{
    //Armazena uma nova Requisição de Admissão de Pessoal.
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
        
            $rapService = new RapService();
            $requisicaoId = $rapService->criarRequisicaoRap($headerData, $bodyData);
        
            return Response::json([
                'success' => true,
                'message' => 'Requisição de Admissão criada com sucesso!',
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
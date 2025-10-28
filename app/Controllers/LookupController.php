<?php

namespace App\Controllers;

use App\Core\Response;
use App\Models\Manager;
use App\Models\Director;
use App\Models\ProtheusJobTitle;
use App\Models\ProtheusCostCenter; 
use Throwable; 

class LookupController
{
    
    
    private static $categorias = [
        "Celetista", "Estagiário", "Jovem Aprendiz", "Temporário"
    ];
    private static $horarios_trabalho = [
        "08h às 18h", "08h às 14h", "12h às 18h", "Escala 12x36"
    ];
    private static $setores = [ 
        "Recursos Humanos", "Financeiro", "Comercial", "Produção",
        "Logística", "Marketing", "TI"
    ];
    private static $motivos = [
        "Reposição", "Nova posição", "Ampliação de equipe"
    ];
    private static $sexo = [
        "Feminino", "Masculino", "Ambos"
    ];
    private static $tipos_selecao = [
        "Processo Interno", "Processo Externo", "Indicação"
    ];
    private static $unidades = [
        "Teiú - Matriz", "Teiú Filial - Feira de Santana", "Teiú - Cosméticos",
        "Holding", "Votre", "Kaioka"
    ];
    private static $motivos_rmp = [
        "Promoção", "Transferência", "Reajuste Salarial", "Mérito"
    ];


    
    public function getRapFormData()
    {
        $managers = Manager::getAll();
        $directors = Director::getAll();
        $jobTitles = ProtheusJobTitle::getAll(); 

        $data = [
            'managers' => $managers,
            'directors' => $directors,
            'jobTitles' => $jobTitles,         
            'categorias' => self::$categorias,
            'horarios_trabalho' => self::$horarios_trabalho,
            'setores' => self::$setores, 
            'motivos' => self::$motivos,
            'sexo' => self::$sexo,
            'tipos_selecao' => self::$tipos_selecao,
            'unidades' => self::$unidades,       
        ];

        Response::json([
            'success' => true,
            'data' => $data
        ]);
    }

    
     public function getRmpFormData()
    {
        $managers = Manager::getAll();
        $directors = Director::getAll();
        $jobTitles = ProtheusJobTitle::getAll(); 

        $data = [
            'managers' => $managers,
            'directors' => $directors,
            'jobTitles' => $jobTitles,         
            'categorias' => self::$categorias,
            'horarios_trabalho' => self::$horarios_trabalho,
            'setores' => self::$setores, 
            'motivos' => self::$motivos,
            'sexo' => self::$sexo,
            'tipos_selecao' => self::$tipos_selecao,
            'unidades' => self::$unidades,       
            'motivos_rmp' => self::$motivos_rmp, 
        ];

        Response::json([
            'success' => true,
            'data' => $data
        ]);
    }

    
    public function getCombinedFormData()
    {
        try {
            $managers = Manager::getAll();
            $directors = Director::getAll();
            $jobTitles = ProtheusJobTitle::getAll(); 

            $data = [
                
                'managers' => $managers,
                'directors' => $directors,
                'jobTitles' => $jobTitles,         
                
                
                'categorias' => self::$categorias,
                'horarios_trabalho' => self::$horarios_trabalho,
                'setores' => self::$setores, 
                'motivos' => self::$motivos,
                'sexo' => self::$sexo,
                'tipos_selecao' => self::$tipos_selecao,
                'unidades' => self::$unidades,       
                'motivos_rmp' => self::$motivos_rmp,
            ];

            Response::json([
                'success' => true,
                'data' => $data
            ]);
        } catch (Throwable $e) {
            Response::json([
                'success' => false,
                'message' => 'Erro interno ao buscar dados combinados: ' . $e->getMessage()
            ], 500);
        }
    }

    public function searchCostCenters()
    {
        
        $term = $_GET['term'] ?? '';

        
        if (strlen($term) < 2) {
            return Response::json(['success' => true, 'data' => []]);
        }

        try {
            $costCenterModel = new ProtheusCostCenter();
            $data = $costCenterModel->searchByTerm($term);

            return Response::json(['success' => true, 'data' => $data]);

        } catch (Throwable $e) {
            return Response::json([
                'success' => false,
                'message' => 'Erro ao buscar Centros de Custo: ' . $e->getMessage()
            ], 500);
        }
    }
    public function getCargoDescriptionByCode($code)
    {
        try {
            $model = new ProtheusJobTitle();
            $description = $model->findDescriptionByCode($code);

            if ($description === null) {
                return Response::json(['success' => false, 'message' => 'Cargo não encontrado'], 404);
            }
            return Response::json(['success' => true, 'data' => ['description' => $description]]);

        } catch (Throwable $e) {
             return Response::json(['success' => false, 'message' => 'Erro ao buscar cargo: ' . $e->getMessage()], 500);
        }
    }
    public function getCostCenterDescriptionByCode($code)
    {
         try {
            $model = new ProtheusCostCenter();
            $description = $model->findDescriptionByCode($code);

            if ($description === null) {
                return Response::json(['success' => false, 'message' => 'Centro de Custo não encontrado'], 404);
            }
            return Response::json(['success' => true, 'data' => ['description' => $description]]);

        } catch (Throwable $e) {
             return Response::json(['success' => false, 'message' => 'Erro ao buscar CC: ' . $e->getMessage()], 500);
        }
    }
}


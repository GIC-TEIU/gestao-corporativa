<?php

namespace App\Controllers;

use App\Core\Response;
use App\Models\Manager;
use App\Models\Director;
use App\Models\ProtheusJobTitle;

class LookupController
{
    
    private static $categorias = [
        "Celetista",
        "Estagiário",
        "Jovem Aprendiz",
        "Temporário"
    ];

    private static $horarios_trabalho = [
        "08h às 18h",
        "08h às 14h",
        "12h às 18h",
        "Escala 12x36"
    ];

    private static $setores = [
        "Recursos Humanos",
        "Financeiro",
        "Comercial",
        "Produção",
        "Logística",
        "Marketing",
        "TI"
    ];

    private static $motivos = [
        "Reposição",
        "Nova posição",
        "Ampliação de equipe"
    ];

    private static $sexo = [
        "Feminino",
        "Masculino",
        "Ambos"
    ];

    private static $tipos_selecao = [
        "Processo Interno",
        "Processo Externo",
        "Indicação"
    ];
    
    private static $unidades = [
        "Teiú - Matriz",
        "Teiú Filial - Feira de Santana",
        "Teiú - Cosméticos",
        "Holding",
        "Votre",
        "Kaioka"
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
}


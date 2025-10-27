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

    // Renomeado de $motivos para $motivos_rap
    private static $motivos_rap = [
        "Reposição",
        "Nova posição",
        "Ampliação de equipe"
    ];

    // Nova lista de motivos para RMP
    private static $motivos_rmp = [
        "Promoção",
        "Transferência (Setor/Unidade)",
        "Alteração Salarial",
        "Alteração de Cargo",
        "Alteração de Horário",
        "Reenquadramento"
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

    /**
     * Retorna dados para o formulário de Requisição de Admissão (RAP)
     */
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
            'motivos' => self::$motivos_rap, // Atualizado para usar a lista de RAP
            'sexo' => self::$sexo,
            'tipos_selecao' => self::$tipos_selecao,
            'unidades' => self::$unidades,
        ];

        Response::json([
            'success' => true,
            'data' => $data
        ]);
    }

    /**
     * (NOVO) Retorna dados para o formulário de Requisição de Movimentação (RMP)
     */
    public function getRmpFormData()
    {
        // RMP geralmente precisa dos mesmos lookups que RAP (novos gestores, novos cargos)
        $managers = Manager::getAll();
        $directors = Director::getAll();
        $jobTitles = ProtheusJobTitle::getAll(); 

        $data = [
            // Dados dinâmicos (para onde o funcionário vai)
            'managers' => $managers,
            'directors' => $directors,
            'jobTitles' => $jobTitles, 
            
            // Listas estáticas relevantes para movimentação
            'horarios_trabalho' => self::$horarios_trabalho,
            'setores' => self::$setores,
            'unidades' => self::$unidades,
            'motivos' => self::$motivos_rmp, // Usando a nova lista de motivos RMP
        ];

        Response::json([
            'success' => true,
            'data' => $data
        ]);
    }
}

<?php

namespace App\Models;

use App\Core\Database;
use PDO;

class ProtheusEmployee
{
    private $pdo;
    const TABLE_NAME = 'SRA010'; 

    public function __construct()
    {
        
        $this->pdo = Database::getConnection('sqlsrv');
    }
    public function findDataByMatricula(string $matricula): ?array
    {
        
        $sql = "SELECT 
                    RA_NOME,
                    RA_SALARIO,
                    RA_CODFUNC, 
                    RA_CC 
                FROM " . self::TABLE_NAME . " 
                WHERE 
                    RA_MAT = :matricula 
                    AND D_E_L_E_T_ = ''"; 
        
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':matricula' => $matricula]);
        
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$result) {
            return null;
        }

        $rawSalario = $result['RA_SALARIO'];
        $rawType = gettype($rawSalario);
        $salarioString = (string) $rawSalario;
        $salarioCorrigido = str_replace(',', '.', $salarioString); 
        $salarioFinalFloat = (float) $salarioCorrigido;
        $nomeLimpo = trim($result['RA_NOME'], " \t\n\r\0\x0B");
        $cargoLimpo = trim($result['RA_CODFUNC'], " \t\n\r\0\x0B");
        $ccLimpo = trim($result['RA_CC'], " \t\n\r\0\x0B");

        return [
            'nome' => $nomeLimpo,
            'salario_atual' => $salarioFinalFloat,
            'cargo_atual' => $cargoLimpo,
            'setor_atual' => $ccLimpo,
            'debug_raw_salario' => $rawSalario,
            'debug_raw_type' => $rawType,
            'debug_salario_string' => $salarioString,
            'debug_salario_corrigido' => $salarioCorrigido,
            'debug_salario_final_float' => $salarioFinalFloat
        ];
    }

public function findAllBasicData(): array
    {
        
$sql = "SELECT DISTINCT 
                    RA_MAT,
                    RA_NOME,
                    RA_CODFUNC, 
                    RA_CC 
                FROM " . self::TABLE_NAME . " 
                WHERE 
                    D_E_L_E_T_ = ''
                    AND RA_DEMISSA = ''";
        
        $stmt = $this->pdo->query($sql); 
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return array_map(function($row) {
            $matriculaLimpa = trim($row['RA_MAT'], " \t\n\r\0\x0B");
            $nomeLimpo = trim($row['RA_NOME'], " \t\n\r\0\x0B");
            $cargoLimpo = trim($row['RA_CODFUNC'], " \t\n\r\0\x0B"); 
            $ccLimpo = trim($row['RA_CC'], " \t\n\r\0\x0B");      

            return [
                'id' => $matriculaLimpa, 
                'matricula' => $matriculaLimpa,
                'name' => $nomeLimpo,
                'cargo' => $cargoLimpo,
                'centroCusto' => $ccLimpo
            ];
        }, $results);
    }
}


<?php

namespace App\Models;

use App\Core\Database;
use PDO;

class ProtheusEmployee
{
    private $pdo;
    const TABLE_NAME = 'SRA010'; 
    const TABLE_CARGO = 'SRJ010';

    public function __construct()
    {
        
        $this->pdo = Database::getConnection('sqlsrv');
    }
    public function findDataByMatriculaOrCpf(string $matricula, string $cpf): ?array
    {
        
        $sql = "SELECT 
                    A.RA_NOME,
                    A.RA_SALARIO,
                    A.RA_CODFUNC,
                    B.RJ_DESC,
                    A.RA_CC,
                    A.RA_CIC,
                    A.RA_MAT
                FROM " . self::TABLE_NAME . " A 
                INNER JOIN " . self::TABLE_CARGO . " B ON A.RA_CODFUNC = B.RJ_COD
                WHERE 
                    (TRIM(A.RA_MAT) = :matricula OR TRIM(A.RA_CIC) = :cpf)
                    AND A.D_E_L_E_T_ = ''
                    AND B.D_E_L_E_T_ = ''   
                    AND (A.RA_SITFOLH IS NULL OR A.RA_SITFOLH NOT IN ('D'))"; 
                     
        
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            ':matricula' => $matricula, 
            ':cpf' => $cpf
        ]);
        
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
        $cpfLimpo = trim($result['RA_CIC'], " \t\n\r\0\x0B");
        $matriculaLimpa = trim($result['RA_MAT'], " \t\n\r\0\x0B");
        $descCargoLimpa = trim($result['RJ_DESC']);

        return [
            'nome' => $nomeLimpo,
            'salario_atual' => $salarioFinalFloat,
            'matricula' => $matriculaLimpa,
            'cpf' => $cpfLimpo,
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


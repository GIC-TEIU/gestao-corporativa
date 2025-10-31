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
    try {
        error_log("DEBUG ProtheusEmployee: Buscando matrícula: '{$matricula}', CPF: '{$cpf}'");
        
        $sql = "SELECT 
                    A.RA_NOME,
                    A.RA_SALARIO,
                    A.RA_CODFUNC,
                    B.RJ_DESC,
                    A.RA_CC,
                    A.RA_CIC,
                    A.RA_MAT
                FROM " . self::TABLE_NAME . " A 
                INNER JOIN " . self::TABLE_CARGO . " B ON A.RA_CODFUNC = B.RJ_FUNCAO
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
            error_log("DEBUG ProtheusEmployee: Nenhum resultado encontrado");
            return null;
        }

        error_log("DEBUG ProtheusEmployee: Dados brutos encontrados: " . print_r($result, true));

        $rawSalario = $result['RA_SALARIO'];
        $salarioString = (string) $rawSalario;
        $salarioCorrigido = str_replace(',', '.', $salarioString); 
        $salarioFinalFloat = (float) $salarioCorrigido;
        
        $nomeLimpo = trim($result['RA_NOME'], " \t\n\r\0\x0B");
        $cargoLimpo = trim($result['RA_CODFUNC'], " \t\n\r\0\x0B");
        $ccLimpo = trim($result['RA_CC'], " \t\n\r\0\x0B");
        $cpfLimpo = trim($result['RA_CIC'], " \t\n\r\0\x0B");
        $matriculaLimpa = trim($result['RA_MAT'], " \t\n\r\0\x0B");
        $descCargoLimpa = trim($result['RJ_DESC']);

        $dadosRetorno = [
            'nome' => $nomeLimpo,
            'salario_atual' => $salarioFinalFloat,
            'matricula' => $matriculaLimpa,
            'cpf' => $cpfLimpo,
            'cargo' => $cargoLimpo,
            'descricao_cargo' => $descCargoLimpa,
            'setor_atual' => $ccLimpo,
            'centro_custo' => $ccLimpo, // Mesmo valor do RA_CC
            'descricao_centro_custo' => $ccLimpo, // Por enquanto, usar o mesmo valor
        ];

        error_log("DEBUG ProtheusEmployee: Dados processados: " . print_r($dadosRetorno, true));

        return $dadosRetorno;

    } catch (\PDOException $e) {
        error_log("ERRO ProtheusEmployee - PDOException: " . $e->getMessage());
        error_log("ERRO ProtheusEmployee - Código: " . $e->getCode());
        error_log("ERRO ProtheusEmployee - Arquivo: " . $e->getFile() . ":" . $e->getLine());
        return null;
    } catch (\Exception $e) {
        error_log("ERRO ProtheusEmployee - Exception: " . $e->getMessage());
        return null;
    }
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
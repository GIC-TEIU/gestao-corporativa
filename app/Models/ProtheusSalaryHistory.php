<?php

namespace App\Models;

use App\Core\Database;
use PDO;
use Exception;

class ProtheusSalaryHistory
{
    private $pdo;

    public function __construct()
    {
        $this->pdo = Database::getConnection('sqlsrv');
    }

    public function getSalaryHistoryByMatricula($matricula, $limit = 10)
    {
        try {
            $sql = "WITH HistoricoLimpo AS (
            SELECT
                sra.RA_FILIAL,
                sra.RA_MAT,
                sr3.R3_DATA,
                sr3.R3_VALOR,
                sr3.R3_TIPO,
                ROW_NUMBER() OVER (
                    PARTITION BY sra.RA_FILIAL, sra.RA_MAT, sr3.R3_DATA
                    ORDER BY sr3.R3_VALOR DESC
                ) AS rn
            FROM
                SRA010 sra
                INNER JOIN SR3010 sr3
                    ON sra.RA_FILIAL = sr3.R3_FILIAL
                   AND sra.RA_MAT    = sr3.R3_MAT
            WHERE
                sra.RA_MAT = ?
                AND sr3.R3_VALOR > 10
                AND sra.D_E_L_E_T_ = ''
                AND sra.RA_DEMISSA = ''
        ),
        HistoricoComDiferenca AS (
            SELECT
                RA_FILIAL,
                RA_MAT,
                R3_DATA AS DataAlteracao,
                R3_VALOR AS ValorSalario,
                R3_TIPO AS CodTipoAlteracao,
                LAG(R3_VALOR) OVER (PARTITION BY RA_FILIAL, RA_MAT ORDER BY R3_DATA) AS SalarioAnterior
            FROM HistoricoLimpo
            WHERE rn = 1
        ),
        HistoricoFinal AS (
            SELECT *,
                   ROW_NUMBER() OVER (PARTITION BY RA_FILIAL, RA_MAT ORDER BY DataAlteracao DESC) AS rn_desc
            FROM HistoricoComDiferenca
            WHERE SalarioAnterior IS NULL OR ValorSalario <> SalarioAnterior
        )
        SELECT
            RA_FILIAL,
            RA_MAT,
            DataAlteracao,
            ValorSalario,
            CodTipoAlteracao,
            CASE CodTipoAlteracao
                WHEN '001' THEN 'Admissão'
                WHEN '002' THEN 'Dissídio coletivo'
                WHEN '003' THEN 'Mérito / Promoção'
                WHEN '004' THEN 'Reclassificação / Reenquadramento'
                WHEN '005' THEN 'Alteração Manual / Administrativa'
                WHEN '006' THEN 'Transferência de Filial / Empresa'
                WHEN '007' THEN 'Reajuste de Piso / Política Interna'
                WHEN '008' THEN 'Reintegração / Retorno'
                ELSE 'Outro'
            END AS TipoAlteracao
        FROM HistoricoFinal
        WHERE rn_desc <= 3
        ORDER BY DataAlteracao DESC";


            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([$matricula]);
            
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            
            return $this->formatResults($results, $limit);

        } catch (Exception $e) {
            throw new Exception("Erro ao buscar histórico salarial: " . $e->getMessage());
        }
    }

    private function formatResults($results, $limit)
    {
        $formatted = [];
        
        foreach ($results as $index => $row) {
            if ($index >= $limit) break; 
            
            
            $rawDate = $row['DataAlteracao'];
            if (strlen($rawDate) === 8 && is_numeric($rawDate)) {
                $row['DataAlteracao'] = substr($rawDate, 0, 4) . '-' . 
                                       substr($rawDate, 4, 2) . '-' . 
                                       substr($rawDate, 6, 2);
            }
            
            
            $row['ValorSalario'] = floatval($row['ValorSalario']);
            
            $formatted[] = $row;
        }
        
        return $formatted;
    }
}
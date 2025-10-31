<?php

namespace App\Models;

use App\Core\Database;
use PDO;
use Throwable;

class ProtheusCostCenter
{
    private $pdo;
    const TABLE_NAME = 'CTT010'; 

    public function __construct()
    {
        $this->pdo = Database::getConnection('sqlsrv');
    }

    public function searchByTerm(string $term): array
    {
        
        $likeTerm = '%' . strtoupper($term) . '%';
        $sql = "SELECT DISTINCT TOP 20 
                    CTT_CUSTO, 
                    CTT_DESC01 
                FROM " . self::TABLE_NAME . " 
                WHERE 
                    (CTT_CUSTO LIKE :term_custo OR CTT_DESC01 LIKE :term_desc)
                    AND D_E_L_E_T_ = ''
                ORDER BY 
                    CTT_CUSTO";
        
        try {
            $stmt = $this->pdo->prepare($sql);
            
            
            $stmt->execute([
                ':term_custo' => $likeTerm,
                ':term_desc'  => $likeTerm
            ]);
            
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $costCenters = [];

            if ($results) {
                foreach ($results as $row) {
                    
                    $costCenters[] = [
                        'code' => trim($row['CTT_CUSTO'], " \t\n\r\0\x0B"),
                        'desc' => trim($row['CTT_DESC01'], " \t\n\r\0\x0B")
                    ];
                }
            }
            
            return $costCenters;

        } catch (Throwable $e) {
            
            
             error_log("Erro em ProtheusCostCenter->searchByTerm: " . $e->getMessage()); 
            return []; 
        }
    }

    public function findDescriptionByCode(string $code): ?string
    {
        $cleanCode = trim($code, " \t\n\r\0\x0B");
        if (empty($cleanCode)) {
            return null;
        }
        
        $sql = "SELECT DISTINCT TOP 1 CTT_DESC01 
                FROM " . self::TABLE_NAME . " 
                WHERE CTT_CUSTO = :code AND D_E_L_E_T_ = ''";
        
        try {
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([':code' => $cleanCode]);
            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            return $result ? trim($result['CTT_DESC01'], " \t\n\r\0\x0B") : null;

        } catch (Throwable $e) {
            
             error_log("Erro em ProtheusCostCenter->findDescriptionByCode: " . $e->getMessage()); 
            return null;
        }
    }
}
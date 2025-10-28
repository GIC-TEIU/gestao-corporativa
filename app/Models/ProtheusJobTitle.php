<?php

namespace App\Models;

use App\Core\Database;
use PDO;
use Throwable;

class ProtheusJobTitle
{
    private $pdo;
    const TABLE_NAME = 'SRJ010';
    public function __construct()
    {
            $this->pdo = Database::getConnection('sqlsrv');
    }

    public static function getAll(): array
    {
            $db = Database::getConnection('sqlsrv');

            $sql = "SELECT DISTINCT 
                    RJ_FUNCAO, 
                    RJ_DESC   
                FROM " . self::TABLE_NAME . " 
                WHERE 
                    D_E_L_E_T_ = ''
                ORDER BY 
                    RJ_DESC";        
        try {
            $stmt = $db->prepare($sql);
            $stmt->execute();
            
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $jobTitles = [];

            if ($results) {
                foreach ($results as $row) {
                    $jobTitles[] = [
                        'code' => trim($row['RJ_FUNCAO'], " \t\n\r\0\x0B"),
                        'description' => trim($row['RJ_DESC'], " \t\n\r\0\x0B")
                    ];
                }
            }
            
            return $jobTitles;

        } catch (Throwable $e) {
                    return [];        }
    }

    public function findDescriptionByCode(string $code): ?string
    {
            $cleanCode = trim($code, " \t\n\r\0\x0B");
        if (empty($cleanCode)) {
            return null;
        }

        $sql = "SELECT TOP 1 RJ_DESC 
                FROM " . self::TABLE_NAME . " 
                WHERE RJ_FUNCAO = :code AND D_E_L_E_T_ = ''";
        
        try {
                    $stmt = $this->pdo->prepare($sql);
            $stmt->execute([':code' => $cleanCode]);
            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            return $result ? trim($result['RJ_DESC'], " \t\n\r\0\x0B") : null;

        } catch (Throwable $e) {
                    return null;
        }
    }
    public function searchByTerm(string $term): array
    {
        
        $likeTerm = '%' . strtoupper($term) . '%';

        
        $sql = "SELECT DISTINCT TOP 20 
                    RJ_FUNCAO,  
                    RJ_DESC    
                FROM " . self::TABLE_NAME . " 
                WHERE 
                    (RJ_FUNCAO LIKE :term_code OR RJ_DESC LIKE :term_desc)
                    AND D_E_L_E_T_ = ''
                ORDER BY 
                    RJ_DESC"; 
        
        try {
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([
                ':term_code' => $likeTerm,
                ':term_desc' => $likeTerm
            ]);
            
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $jobTitles = [];

            if ($results) {
                foreach ($results as $row) {
                    $jobTitles[] = [
                        'code' => trim($row['RJ_FUNCAO'], " \t\n\r\0\x0B"),
                        'description' => trim($row['RJ_DESC'], " \t\n\r\0\x0B")
                    ];
                }
            }
            return $jobTitles;

        } catch (Throwable $e) {
            
            return []; 
        }
    }
}

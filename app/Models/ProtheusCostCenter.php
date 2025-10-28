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
    public function findDescriptionByCode(string $code): ?string
    {
        $cleanCode = trim($code, " \t\n\r\0\x0B");
        if (empty($cleanCode)) {
            return null;
        }
        $sql = "SELECT DISTINCT TOP 1 CTT_DESC01 
                FROM CTT010 
                WHERE CTT_CUSTO = :code AND D_E_L_E_T_ = ''";
        try {
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([':code' => $cleanCode]);
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            return $result ? trim($result['CTT_DESC01'], " \t\n\r\0\x0B") : null;
        } catch (Throwable $e) {
            return null;
        }
    }
}
<?php

namespace App\Models;

use App\Core\Database;
use PDO;

class ProtheusJobTitle
{
    public static function getAll(): array
    {
        $pdo = Database::getConnection('sqlsrv'); 
        
        $sql = "
            SELECT DISTINCT
                RJ_DESC AS description 
            FROM 
                SRJ010 
            WHERE 
                D_E_L_E_T_ = '' 
                AND RJ_DESC <> '' 
            ORDER BY 
                RJ_DESC ASC
        ";
        
        $stmt = $pdo->query($sql);
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}


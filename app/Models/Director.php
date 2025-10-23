<?php

namespace App\Models;

use App\Core\Database;
use PDO;

class Director
{
    public static function getAll(): array
    {
        $pdo = Database::getConnection(); 
        
        $stmt = $pdo->query("
            SELECT id, full_name, job_title 
            FROM director 
            ORDER BY full_name ASC
        ");
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

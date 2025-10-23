<?php

namespace App\Controllers;

use App\Models\Director;
use App\Models\Manager;
use App\Models\ProtheusJobTitle;
use Exception;

class LookupController
{
    public function getRapFormData()
    {
        try {
            $managers = Manager::getAll();
            $directors = Director::getAll();
            
            $jobTitles = ProtheusJobTitle::getAll();
            
            $data = [
                'managers' => $managers,
                'directors' => $directors,
                'jobTitles' => $jobTitles,
            ];
            
            header('Content-Type: application/json');
            echo json_encode(['success' => true, 'data' => $data]);

        } catch (Exception $e) {
            
            header('Content-Type: application/json', true, 500); 
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    }
}

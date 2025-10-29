<?php

namespace App\Middleware;

class AuthMiddleware
{
    public static function checkAuth()
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        if (!isset($_SESSION['logged_in']) || !$_SESSION['logged_in']) {
            http_response_code(401);
            echo json_encode([
                'status' => 401,
                'message' => 'Não autenticado. Faça login novamente.'
            ]);
            exit;
        }

        // Verificar tempo de inatividade (30 minutos)
        $maxIdleTime = 30 * 60;
        if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity'] > $maxIdleTime)) {
            session_unset();
            session_destroy();
            http_response_code(401);
            echo json_encode([
                'status' => 401,
                'message' => 'Sessão expirada. Faça login novamente.'
            ]);
            exit;
        }

        // Atualizar tempo da última atividade
        $_SESSION['last_activity'] = time();

        return true;
    }

    public static function checkPermission($requiredPermission)
    {
        self::checkAuth();

        if (!isset($_SESSION['user_permissions']) || !in_array($requiredPermission, $_SESSION['user_permissions'])) {
            http_response_code(403);
            echo json_encode([
                'status' => 403,
                'message' => 'Acesso negado. Permissão insuficiente.'
            ]);
            exit;
        }

        return true;
    }

    public static function getUserData()
    {
        self::checkAuth();

        return [
            'user_id' => $_SESSION['user_id'] ?? null,
            'email' => $_SESSION['user_email'] ?? null,
            'full_name' => $_SESSION['user_full_name'] ?? null,
            'job_title' => $_SESSION['user_job_title'] ?? null,
            'employee_id' => $_SESSION['user_employee_id'] ?? null,
            'permissions' => $_SESSION['user_permissions'] ?? []
        ];
    }
}
<?php
namespace App\Middleware;

class PermissionMiddleware
{
    protected $requiredPermission;

    public function __construct($permission)
    {
        $this->requiredPermission = $permission;
    }

    public function handle()
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        // Verificar se está autenticado
        if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
            http_response_code(401);
            header('Content-Type: application/json');
            echo json_encode([
                'success' => false,
                'message' => 'Não autenticado.'
            ]);
            exit;
        }

        // Verificar permissão
        $userPermissions = $_SESSION['user_permissions'] ?? [];
        if (!in_array($this->requiredPermission, $userPermissions)) {
            http_response_code(403);
            header('Content-Type: application/json');
            echo json_encode([
                'success' => false,
                'message' => 'Acesso negado. Permissão necessária: ' . $this->requiredPermission
            ]);
            exit;
        }

        // Atualizar tempo da última atividade
        $_SESSION['last_activity'] = time();
    }
}
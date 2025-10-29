<?php

namespace App\Core;

use Exception;

class Router
{
    private static $routes = [];

    // Métodos existentes
    public static function get(string $uri, array $handler)
    {
        self::addRoute('GET', $uri, $handler);
    }

    public static function post(string $uri, array $handler)
    {
        self::addRoute('POST', $uri, $handler);
    }

    // ✅ NOVOS MÉTODOS — adicionam suporte a PUT e DELETE
    public static function put(string $uri, array $handler)
    {
        self::addRoute('PUT', $uri, $handler);
    }

    public static function delete(string $uri, array $handler)
    {
        self::addRoute('DELETE', $uri, $handler);
    }

    // Método central de registro
    private static function addRoute(string $method, string $uri, array $handler)
    {
        $pattern = preg_replace('/\{([a-zA-Z0-9_-]+)\}/', '([a-zA-Z0-9_-]+)', $uri);
        $pattern = '#^' . $pattern . '$#';

        self::$routes[] = [
            'method' => $method,
            'pattern' => $pattern,
            'handler' => $handler
        ];
    }

    // Despacha as rotas
    public static function dispatch()
    {
        $requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $requestMethod = $_SERVER['REQUEST_METHOD'];

        // Se o método for POST mas vier com _method, sobrescreve (para compatibilidade)
        if ($requestMethod === 'POST' && isset($_POST['_method'])) {
            $override = strtoupper($_POST['_method']);
            if (in_array($override, ['PUT', 'DELETE'])) {
                $requestMethod = $override;
            }
        }

        // Ajusta o base path, se existir
        $basePath = '/gestao-corporativa/public';
        if (strpos($requestUri, $basePath) === 0) {
            $requestUri = substr($requestUri, strlen($basePath));
        }

        if (empty($requestUri)) {
            $requestUri = '/';
        }

        foreach (self::$routes as $route) {
            if ($route['method'] === $requestMethod && preg_match($route['pattern'], $requestUri, $matches)) {
                array_shift($matches);
                
                $handler = $route['handler'];
                $controllerClass = $handler[0];
                $controllerMethod = $handler[1];
    
                if (!class_exists($controllerClass)) {
                    $controllerClass = 'App\\Controllers\\' . $controllerClass;
                }
    
                if (!class_exists($controllerClass)) {
                    throw new Exception("Controller '{$controllerClass}' não encontrado.");
                }

                $controller = new $controllerClass();

                if (!method_exists($controller, $controllerMethod)) {
                    throw new Exception("Método '{$controllerMethod}' não encontrado em '{$controllerClass}'.");
                }

                call_user_func_array([$controller, $controllerMethod], $matches);
                return;
            }
        }

        throw new Exception("Erro 404: Rota não encontrada para '{$requestUri}'");
    }
}

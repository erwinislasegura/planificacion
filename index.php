<?php

declare(strict_types=1);

if (PHP_SAPI === 'cli-server') {
    $path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
    $file = __DIR__ . $path;
    if ($path !== '/' && is_file($file)) {
        return false;
    }
}

spl_autoload_register(static function (string $class): void {
    $prefix = 'App\\';
    if (!str_starts_with($class, $prefix)) {
        return;
    }

    $relative = str_replace('\\', '/', substr($class, strlen($prefix)));
    $file = __DIR__ . '/app/' . $relative . '.php';
    if (is_file($file)) {
        require $file;
    }
});

use App\Controllers\HomeController;
use App\Controllers\PlanController;
use App\Core\Router;

$router = new Router();
$router->get('/', [HomeController::class, 'index']);
$router->get('/api/plan', [PlanController::class, 'show']);
$router->put('/api/plan', [PlanController::class, 'update']);
$router->delete('/api/plan', [PlanController::class, 'destroy']);
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if ($method === 'HEAD') {
    $method = 'GET';
}
$router->dispatch($method, $_SERVER['REQUEST_URI'] ?? '/');

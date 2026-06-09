<?php

namespace App\Controllers;

use App\Core\View;

final class HomeController
{
    public function index(): void
    {
        $config = require dirname(__DIR__, 2) . '/config/app.php';

        View::render('home/index', [
            'appName' => $config['name'],
            'apiUrl' => '/api/plan',
            'enableRemote' => true,
        ]);
    }
}

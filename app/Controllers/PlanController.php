<?php

namespace App\Controllers;

use App\Core\Response;
use App\Models\Plan;
use Throwable;

final class PlanController
{
    private Plan $plans;

    public function __construct()
    {
        $this->plans = new Plan();
    }

    public function show(): void
    {
        try {
            $plan = $this->plans->findOrCreateByToken($this->token());
            Response::json([
                'ok' => true,
                'data' => json_decode($plan['data'] ?: '{}', true, 512, JSON_THROW_ON_ERROR),
                'updated_at' => $plan['updated_at'] ?? null,
            ]);
        } catch (Throwable $exception) {
            Response::json(['ok' => false, 'message' => $exception->getMessage()], 503);
        }
    }

    public function update(): void
    {
        try {
            $payload = json_decode(file_get_contents('php://input') ?: '{}', true, 512, JSON_THROW_ON_ERROR);
            $data = is_array($payload['data'] ?? null) ? $payload['data'] : [];
            $this->plans->updateData($this->token(), $data);
            Response::json(['ok' => true, 'message' => 'Plan guardado']);
        } catch (Throwable $exception) {
            Response::json(['ok' => false, 'message' => $exception->getMessage()], 422);
        }
    }

    public function destroy(): void
    {
        try {
            $this->plans->clearData($this->token());
            Response::json(['ok' => true, 'message' => 'Plan limpio']);
        } catch (Throwable $exception) {
            Response::json(['ok' => false, 'message' => $exception->getMessage()], 503);
        }
    }

    private function token(): string
    {
        if (session_status() !== PHP_SESSION_ACTIVE) {
            session_start();
        }

        if (empty($_SESSION['plan_token'])) {
            $_SESSION['plan_token'] = bin2hex(random_bytes(24));
        }

        return $_SESSION['plan_token'];
    }
}

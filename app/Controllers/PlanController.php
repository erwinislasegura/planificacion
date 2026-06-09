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

    public function users(): void
    {
        try {
            $search = trim((string) ($_GET['search'] ?? ''));
            Response::json([
                'ok' => true,
                'users' => $this->plans->searchUsers($search),
            ]);
        } catch (Throwable $exception) {
            Response::json(['ok' => false, 'message' => $exception->getMessage()], 503);
        }
    }

    public function storeUser(): void
    {
        try {
            $payload = json_decode(file_get_contents('php://input') ?: '{}', true, 512, JSON_THROW_ON_ERROR);
            $user = $this->plans->createUser((string) ($payload['name'] ?? ''));
            Response::json(['ok' => true, 'user' => $user, 'message' => 'Usuario creado'], 201);
        } catch (Throwable $exception) {
            Response::json(['ok' => false, 'message' => $exception->getMessage()], 422);
        }
    }

    public function show(): void
    {
        try {
            $plan = $this->selectedUserId() > 0
                ? $this->plans->findById($this->selectedUserId())
                : $this->plans->findOrCreateByToken($this->token());

            if ($plan === null) {
                Response::json(['ok' => false, 'message' => 'Usuario no encontrado'], 404);
                return;
            }

            Response::json([
                'ok' => true,
                'user' => [
                    'id' => (int) $plan['id'],
                    'name' => (string) ($plan['user_name'] ?? 'Usuario principal'),
                    'title' => (string) $plan['title'],
                ],
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
            $userId = (int) ($payload['user_id'] ?? $this->selectedUserId());

            if ($userId > 0) {
                $this->plans->updateDataForUser($userId, $data);
            } else {
                $this->plans->updateData($this->token(), $data);
            }

            Response::json(['ok' => true, 'message' => 'Plan guardado']);
        } catch (Throwable $exception) {
            Response::json(['ok' => false, 'message' => $exception->getMessage()], 422);
        }
    }

    public function destroy(): void
    {
        try {
            $userId = $this->selectedUserId();
            if ($userId > 0) {
                $this->plans->clearDataForUser($userId);
            } else {
                $this->plans->clearData($this->token());
            }

            Response::json(['ok' => true, 'message' => 'Plan limpio']);
        } catch (Throwable $exception) {
            Response::json(['ok' => false, 'message' => $exception->getMessage()], 503);
        }
    }

    private function selectedUserId(): int
    {
        return max(0, (int) ($_GET['user_id'] ?? 0));
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

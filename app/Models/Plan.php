<?php

namespace App\Models;

use App\Core\Database;

final class Plan
{
    public function findOrCreateByToken(string $token): array
    {
        $pdo = Database::connection();
        $statement = $pdo->prepare('SELECT * FROM plans WHERE token = :token LIMIT 1');
        $statement->execute(['token' => $token]);
        $plan = $statement->fetch();

        if ($plan) {
            return $plan;
        }

        $statement = $pdo->prepare('INSERT INTO plans (token, title, data) VALUES (:token, :title, JSON_OBJECT())');
        $statement->execute([
            'token' => $token,
            'title' => 'Programa Alto Rendimiento 8 Semanas',
        ]);

        return [
            'id' => (int) $pdo->lastInsertId(),
            'token' => $token,
            'title' => 'Programa Alto Rendimiento 8 Semanas',
            'data' => '{}',
        ];
    }

    public function updateData(string $token, array $data): void
    {
        $this->findOrCreateByToken($token);
        $statement = Database::connection()->prepare(
            'UPDATE plans SET data = :data, updated_at = CURRENT_TIMESTAMP WHERE token = :token'
        );
        $statement->execute([
            'token' => $token,
            'data' => json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
        ]);
    }

    public function clearData(string $token): void
    {
        $this->updateData($token, []);
    }
}

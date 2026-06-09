<?php

namespace App\Models;

use App\Core\Database;
use PDO;

final class Plan
{
    public function searchUsers(string $search = ''): array
    {
        $this->ensureUserSchema();
        $pdo = Database::connection();
        $sql = 'SELECT id, user_name, title, updated_at FROM plans WHERE user_name IS NOT NULL';
        $params = [];

        if ($search !== '') {
            $sql .= ' AND user_name LIKE :search';
            $params['search'] = '%' . $search . '%';
        }

        $sql .= ' ORDER BY updated_at DESC, user_name ASC LIMIT 40';
        $statement = $pdo->prepare($sql);
        $statement->execute($params);

        return array_map(static fn (array $row): array => [
            'id' => (int) $row['id'],
            'name' => (string) $row['user_name'],
            'title' => (string) $row['title'],
            'updated_at' => $row['updated_at'] ?? null,
        ], $statement->fetchAll());
    }

    public function createUser(string $name): array
    {
        $this->ensureUserSchema();
        $name = $this->normalizeName($name);
        $token = bin2hex(random_bytes(24));
        $title = 'Programa Alto Rendimiento 8 Semanas';
        $pdo = Database::connection();
        $statement = $pdo->prepare(
            'INSERT INTO plans (token, user_name, title, data) VALUES (:token, :user_name, :title, JSON_OBJECT())'
        );
        $statement->execute([
            'token' => $token,
            'user_name' => $name,
            'title' => $title,
        ]);

        return [
            'id' => (int) $pdo->lastInsertId(),
            'name' => $name,
            'title' => $title,
            'updated_at' => null,
        ];
    }

    public function findOrCreateByToken(string $token): array
    {
        $this->ensureUserSchema();
        $pdo = Database::connection();
        $statement = $pdo->prepare('SELECT * FROM plans WHERE token = :token LIMIT 1');
        $statement->execute(['token' => $token]);
        $plan = $statement->fetch();

        if ($plan) {
            return $plan;
        }

        $statement = $pdo->prepare('INSERT INTO plans (token, user_name, title, data) VALUES (:token, :user_name, :title, JSON_OBJECT())');
        $statement->execute([
            'token' => $token,
            'user_name' => 'Usuario principal',
            'title' => 'Programa Alto Rendimiento 8 Semanas',
        ]);

        return [
            'id' => (int) $pdo->lastInsertId(),
            'token' => $token,
            'user_name' => 'Usuario principal',
            'title' => 'Programa Alto Rendimiento 8 Semanas',
            'data' => '{}',
        ];
    }

    public function findById(int $id): ?array
    {
        $this->ensureUserSchema();
        $statement = Database::connection()->prepare('SELECT * FROM plans WHERE id = :id LIMIT 1');
        $statement->execute(['id' => $id]);
        $plan = $statement->fetch();

        return $plan ?: null;
    }

    public function updateDataForUser(int $id, array $data): void
    {
        $this->assertUserExists($id);
        $statement = Database::connection()->prepare(
            'UPDATE plans SET data = :data, updated_at = CURRENT_TIMESTAMP WHERE id = :id'
        );
        $statement->execute([
            'id' => $id,
            'data' => json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
        ]);
    }

    public function clearDataForUser(int $id): void
    {
        $this->updateDataForUser($id, []);
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

    private function assertUserExists(int $id): void
    {
        if ($id <= 0 || $this->findById($id) === null) {
            throw new \InvalidArgumentException('Usuario no encontrado');
        }
    }

    private function normalizeName(string $name): string
    {
        $name = trim(preg_replace('/\s+/', ' ', $name) ?: '');
        if ($name === '') {
            throw new \InvalidArgumentException('Ingresa un nombre de usuario');
        }
        if (strlen($name) > 120) {
            throw new \InvalidArgumentException('El nombre no puede superar 120 caracteres');
        }

        return $name;
    }

    private function ensureUserSchema(): void
    {
        static $checked = false;
        if ($checked) {
            return;
        }

        $pdo = Database::connection();
        $database = (string) $pdo->query('SELECT DATABASE()')->fetchColumn();
        $statement = $pdo->prepare(
            'SELECT COUNT(*) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = :database AND TABLE_NAME = :table AND COLUMN_NAME = :column'
        );
        $statement->execute([
            'database' => $database,
            'table' => 'plans',
            'column' => 'user_name',
        ]);

        if ((int) $statement->fetchColumn() === 0) {
            $pdo->exec('ALTER TABLE plans ADD COLUMN user_name VARCHAR(120) NULL AFTER token');
            $pdo->exec("UPDATE plans SET user_name = COALESCE(JSON_UNQUOTE(JSON_EXTRACT(data, '$.nombre')), 'Usuario principal') WHERE user_name IS NULL");
        }

        $this->ensureIndex($pdo, $database, 'plans_user_name_index', 'CREATE INDEX plans_user_name_index ON plans (user_name)');
        $checked = true;
    }

    private function ensureIndex(PDO $pdo, string $database, string $index, string $sql): void
    {
        $statement = $pdo->prepare(
            'SELECT COUNT(*) FROM information_schema.STATISTICS WHERE TABLE_SCHEMA = :database AND TABLE_NAME = :table AND INDEX_NAME = :index'
        );
        $statement->execute([
            'database' => $database,
            'table' => 'plans',
            'index' => $index,
        ]);

        if ((int) $statement->fetchColumn() === 0) {
            $pdo->exec($sql);
        }
    }
}

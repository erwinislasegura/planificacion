# Planificación Alto Rendimiento

Aplicación PHP MVC + MySQL para registrar automáticamente el programa nutricional y físico de 8 semanas. Incluye experiencia PWA para instalarse en el celular, funcionamiento offline básico y sincronización automática cuando MySQL está disponible.

## Requisitos

- PHP 8.1 o superior con extensión PDO MySQL.
- MySQL 8 o MariaDB compatible con columnas JSON.
- Servidor web con reescritura hacia `index.php` o el servidor integrado de PHP.

## Instalación

1. Crea la base de datos y la tabla:

   ```bash
   mysql -u root -p < database/schema.sql
   ```

2. Configura las variables de entorno si tus credenciales no son las predeterminadas:

   ```bash
   export DB_HOST=127.0.0.1
   export DB_PORT=3306
   export DB_DATABASE=planificacion
   export DB_USERNAME=root
   export DB_PASSWORD=secret
   ```

3. Ejecuta en desarrollo:

   ```bash
   php -S 127.0.0.1:8000 index.php
   ```

4. Abre `http://127.0.0.1:8000` en el navegador. En móvil, usa la opción del navegador para instalar la aplicación o el botón **Instalar app** cuando esté disponible.

## Estructura

- `index.php`: front controller y definición de rutas.
- `app/Controllers`: controladores MVC.
- `app/Models`: acceso a datos.
- `app/Views`: vistas y layout principal.
- `app/Core`: router, vista, respuesta JSON y conexión PDO.
- `config`: configuración de aplicación y base de datos.
- `database/schema.sql`: esquema inicial MySQL.
- `public`: assets, manifest PWA, service worker e iconos.

## Guardado automático

Cada cambio en campos, checks o métricas recalcula los indicadores y se guarda con debounce en `/api/plan`. Si no hay conexión o MySQL no está disponible, el progreso queda respaldado en `localStorage` y la interfaz muestra el estado de sincronización.

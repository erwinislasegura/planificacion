<?php

return [
    'name' => getenv('APP_NAME') ?: 'Plan Alto Rendimiento',
    'env' => getenv('APP_ENV') ?: 'production',
    'debug' => filter_var(getenv('APP_DEBUG') ?: false, FILTER_VALIDATE_BOOLEAN),
    'base_url' => rtrim(getenv('APP_URL') ?: '', '/'),
];

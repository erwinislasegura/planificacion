<?php
/** @var string $content */
/** @var string $appName */
/** @var string $apiUrl */
/** @var bool $enableRemote */
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <meta name="theme-color" content="#061B33">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="Plan AR">
  <title><?= htmlspecialchars($appName, ENT_QUOTES, 'UTF-8') ?></title>
  <link rel="manifest" href="/public/manifest.webmanifest">
  <link rel="icon" href="/public/icons/icon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/public/icons/icon.svg">
  <link rel="stylesheet" href="/public/assets/css/app.css?v=visual-2">
</head>
<body>
<?= $content ?>
<script>
window.PLAN_APP = {
  apiUrl: <?= json_encode($apiUrl, JSON_UNESCAPED_SLASHES) ?>,
  enableRemote: <?= $enableRemote ? 'true' : 'false' ?>
};
</script>
<script src="/public/assets/js/app.js?v=visual-2" defer></script>
</body>
</html>

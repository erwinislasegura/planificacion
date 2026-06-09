<?php
/** @var string $content */
/** @var string $appName */
/** @var bool $enableRemote */
$scriptDir = str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? ''));
$basePath = $scriptDir === '/' || $scriptDir === '.' ? '' : rtrim($scriptDir, '/');
$asset = static fn (string $path): string => $basePath . '/public/' . ltrim($path, '/');
$apiUrl = $basePath . '/api/plan';
$cssFile = dirname(__DIR__, 3) . '/public/assets/css/app.css';
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
  <link rel="manifest" href="<?= htmlspecialchars($asset('manifest.webmanifest'), ENT_QUOTES, 'UTF-8') ?>">
  <link rel="icon" href="<?= htmlspecialchars($asset('icons/icon.svg'), ENT_QUOTES, 'UTF-8') ?>" type="image/svg+xml">
  <link rel="apple-touch-icon" href="<?= htmlspecialchars($asset('icons/icon.svg'), ENT_QUOTES, 'UTF-8') ?>">
  <link rel="stylesheet" href="<?= htmlspecialchars($asset('assets/css/app.css?v=usuarios-1'), ENT_QUOTES, 'UTF-8') ?>">
  <style id="app-css-fallback">
<?php if (is_file($cssFile)) { readfile($cssFile); } ?>
  </style>
</head>
<body>
<?= $content ?>
<script>
window.PLAN_APP = {
  apiUrl: <?= json_encode($apiUrl, JSON_UNESCAPED_SLASHES) ?>,
  assetBase: <?= json_encode($basePath . '/public', JSON_UNESCAPED_SLASHES) ?>,
  enableRemote: <?= $enableRemote ? 'true' : 'false' ?>
};
</script>
<script src="<?= htmlspecialchars($asset('assets/js/app.js?v=usuarios-1'), ENT_QUOTES, 'UTF-8') ?>" defer></script>
</body>
</html>

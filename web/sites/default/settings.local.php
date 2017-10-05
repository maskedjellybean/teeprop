<?php

$databases['default']['default'] = array (
  'database' => 'tee_prop',
  'username' => 'tee_prop',
  'password' => 'tee_prop',
  'prefix' => '',
  'host' => '127.0.0.1',
  'port' => '',
  // 'namespace' => 'Drupal\\Core\\Database\\Driver\\mysql',
  'driver' => 'mysql',
);

$settings['trusted_host_patterns'] = array(
  '^tee-prop\.dev$',
);

$settings['cache']['bins']['render'] = 'cache.backend.null';
$settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';

$config['system.performance']['css']['preprocess'] = FALSE;
$config['system.performance']['js']['preprocess'] = FALSE;

$settings['container_yamls'][] = DRUPAL_ROOT . '/sites/development.services.yml';

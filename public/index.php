 <?php

//  Inicia o session_start() para que a superglobal $_SESSION esteja disponível em toda a aplicação.

session_start();
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../routes/api.php';

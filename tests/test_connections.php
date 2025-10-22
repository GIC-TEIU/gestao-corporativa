<?php
header('Content-Type: text/html; charset=utf-h');
echo "<style>body { font-family: sans-serif; background-color: #f4f4f4; padding: 20px; } .success { color: #28a745; font-weight: bold; } .error { color: #dc3545; font-weight: bold; } pre { background-color: #e9ecef; padding: 10px; border-radius: 5px; }</style>";

echo "<h1>Teste de Conexao com Bancos de Dados</h1>";
require_once __DIR__ . '/../vendor/autoload.php';
use App\Core\Database;
echo "<h3>1. Testando Conexao MySQL ('mysql')</h3>";
try {
    $pdo_mysql = Database::getConnection('mysql');
    
    echo "<p class='success'>SUCESSO: Conexao com o MySQL estabelecida!</p>";
    
    $stmt = $pdo_mysql->query("SELECT @@VERSION AS mysql_version");
    $result = $stmt->fetch();
    
    echo "<p>Versao do MySQL Server:</p>";
    echo "<pre>" . htmlspecialchars($result['mysql_version']) . "</pre>";

} catch (Exception $e) {
    echo "<p class='error'>FALHA: Nao foi possível conectar ao MySQL.</p>";
    echo "<p>Mensagem de Erro:</p>";
    echo "<pre>" . htmlspecialchars($e->getMessage()) . "</pre>";
}

echo "<hr>";
echo "<h3>2. Testando Conexao SQL Server ('sqlsrv')</h3>";
try {
    $pdo_sqlsrv = Database::getConnection('sqlsrv');

    echo "<p class='success'>SUCESSO: Conexao com o SQL Server estabelecida!</p>";

    $stmt = $pdo_sqlsrv->query("SELECT @@VERSION AS sqlserver_version");
    $result = $stmt->fetch();
    
    echo "<p>Versao do SQL Server:</p>";
    echo "<pre>" . htmlspecialchars($result['sqlserver_version']) . "</pre>";
    
} catch (Exception $e) {
    echo "<p class='error'>FALHA: Nao foi possível conectar ao SQL Server.</p>";
    echo "<p>Mensagem de Erro:</p>";
    echo "<pre>" . htmlspecialchars($e->getMessage()) . "</pre>";
}

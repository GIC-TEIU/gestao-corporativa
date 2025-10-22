 <?php

return [

    'default' => 'mysql',

    'connections' => [

        'mysql' => [
            'driver' => 'mysql',
            'host' => '127.0.0.1',
            'port' => '3306',
            'database' => 'corporate_management',
            'username' => 'root', 
            'password' => 'xuPNXroGu@/Nt@Cd',           
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
        ],

        'sqlsrv' => [
            'driver' => 'sqlsrv',
            'host' => '189.126.154.173',
            'port' => '2372',
            'database' => 'CRU3L2_163582_PR_PD',
            'username' => 'Intranet',
            'password' => 'atshi81639BUHIO@?',
            'charset' => 'utf8',
        ],

    ],
];

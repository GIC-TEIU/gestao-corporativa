<?php

// Contém a lógica de cadastro, login e logout.
// Quais classes/métodos:
// class AuthController
// public function register():
    // Faz as verificações da task (se é colabordador do TOTVS ou não, etc)
    // Pega os dados da requisição (full_name, email, password_hash, etc.).
    // Valida os dados (ex: email é válido? Senha é forte?).
    // Verifica se o e-mail já existe (usando o UserModel).
    // Faz o hash da senha (usando password_hash()). NUNCA salve a senha em texto puro.
    // Chama o UserModel para criar o usuário no banco.
    // Retorna uma resposta de sucesso (JSON).
// public function login():
    // Pega email e password da requisição.
    // Chama UserModel para buscar o usuário pelo e-mail.
    // Se o usuário não existe, retorna erro 404.
    // Verifica o hash da senha (usando password_verify()).
    // Se a senha estiver incorreta, retorna erro 401 (Não autorizado).
    // Se a senha estiver correta: Armazena os dados na sessão.
    // Verifica se o usuário está ativo nos dois bancos de dados
    // Retorna uma resposta de sucesso com os dados do usuário (JSON).
// public function logout():
    // Limpa os dados da sessão (session_unset()).
    // Destrói a sessão (session_destroy()).
    // Retorna uma resposta de sucesso (JSON).
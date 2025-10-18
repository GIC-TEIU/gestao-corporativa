CREATE DATABASE IF NOT EXISTS `corporate_management`;
USE `corporate_management`;

SET FOREIGN_KEY_CHECKS=1;

-- ====================================================================================
-- PARTE 1: CRIAÇÃO DAS TABELAS
-- ====================================================================================

-- Tabela de usuários do sistema.
CREATE TABLE `user` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `full_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL,
    `job_title` VARCHAR(255),
    `employee_id` VARCHAR(100) UNIQUE COMMENT 'matrícula do colaborador',
    `cost_center` VARCHAR(255),
    `cost_center_description` VARCHAR(255),
    `whatsapp_phone` VARCHAR(50),
    `profile_photo_path` VARCHAR(512),
    `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Tabela para cadastrar diretores, que podem ser referenciados nas requisições.
CREATE TABLE `director` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `full_name` VARCHAR(255) NOT NULL,
    `job_title` VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

-- Tabela para cadastrar gerentes, que podem ser referenciados nas requisições.
CREATE TABLE `manager` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `full_name` VARCHAR(255) NOT NULL,
    `job_title` VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

-- Catálogo de todas as permissões possíveis no sistema.
CREATE TABLE `permission` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL UNIQUE COMMENT 'Ex: "criar_documento", "aprovar_requisicao"',
    `description` TEXT
) ENGINE=InnoDB;

-- Registra um histórico (log de auditoria) de todas as alterações de permissões.
CREATE TABLE `permission_history` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `permission_id` BIGINT UNSIGNED NOT NULL,
    `responsible_user_id` BIGINT UNSIGNED NOT NULL,
    `action` ENUM('CONCEDER', 'REVOGAR') NOT NULL,
    `action_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Tabela associativa (Muitos-para-Muitos) entre usuários e permissões.
CREATE TABLE `user_permission` (
    `user_id` BIGINT UNSIGNED NOT NULL,
    `permission_id` BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (`user_id`, `permission_id`)
) ENGINE=InnoDB;

-- Armazena o conteúdo de uma notificação a ser enviada.
CREATE TABLE `notification` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `message` TEXT,
    `type` ENUM('ENVELOPE', 'USUARIO', 'SISTEMA') NOT NULL,
    `channel` ENUM('WHATSAPP', 'SITE', 'EMAIL') NOT NULL,
    `metadata` JSON,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- Colunas para a relação polimórfica. Sem FK.
    `reference_table` VARCHAR(100) COMMENT 'Ex: "envelope", "request"',
    `reference_id` BIGINT UNSIGNED COMMENT 'ID na tabela de referência'
) ENGINE=InnoDB;

-- Tabela associativa que liga uma notificação aos seus destinatários e rastreia o status.
CREATE TABLE `notification_recipient` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `notification_id` BIGINT UNSIGNED NOT NULL,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `is_read` BOOLEAN NOT NULL DEFAULT FALSE,
    `read_at` DATETIME,
    `is_resolved` BOOLEAN NOT NULL DEFAULT FALSE,
    `resolved_at` DATETIME,
    `remind_at` DATETIME
) ENGINE=InnoDB;

-- Armazena modelos de assinaturas de e-mail.
CREATE TABLE `email_signature` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `created_by_user_id` BIGINT UNSIGNED NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `employee_id` VARCHAR(100) COMMENT 'matrícula do colaborador',
    `html_content` TEXT,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Ações possíveis que podem compor uma etapa de um fluxo.
CREATE TABLE `workflow_action` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `action_type` ENUM('ASSINAR', 'VISUALIZAR', 'APROVAR', 'DAR_CIENCIA') NOT NULL
) ENGINE=InnoDB;

-- Etapas possíveis que podem compor uma rota de fluxo.
CREATE TABLE `workflow_step` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL, -- CORRIGIDO: Adicionei o título que estava faltando.
    `description` TEXT, -- CORRIGIDO: Adicionei a descrição que estava faltando.
    `step_order` INT NOT NULL DEFAULT 0
) ENGINE=InnoDB;

-- Armazena os modelos de rotas (fluxos de trabalho), que podem ser oficiais ou customizadas.
CREATE TABLE `workflow_route` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `created_by_user_id` BIGINT UNSIGNED NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `type` ENUM('OFICIAL', 'CUSTOMIZADA') NOT NULL,
    `max_duration` INT,
    `duration_unit` ENUM('MESES', 'DIAS', 'HORAS'),
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Representa o envelope, o contêiner principal que agrupa documentos e segue uma rota.
CREATE TABLE `envelope` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `requester_user_id` BIGINT UNSIGNED NOT NULL,
    `workflow_route_id` BIGINT UNSIGNED NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `status` ENUM('PENDENTE', 'CONCLUIDO', 'CANCELADO') NOT NULL DEFAULT 'PENDENTE',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Tabela associativa (Muitos-para-Muitos) entre rotas e etapas.
CREATE TABLE `workflow_route_step` (
    `workflow_route_id` BIGINT UNSIGNED NOT NULL,
    `workflow_step_id` BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (`workflow_route_id`, `workflow_step_id`)
) ENGINE=InnoDB;

-- Tabela associativa (Muitos-para-Muitos) entre etapas e ações.
CREATE TABLE `workflow_step_action` (
    `workflow_step_id` BIGINT UNSIGNED NOT NULL,
    `workflow_action_id` BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (`workflow_step_id`, `workflow_action_id`)
) ENGINE=InnoDB;

-- Registra um histórico de eventos (atualizações) para um envelope específico.
CREATE TABLE `envelope_update` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `envelope_id` BIGINT UNSIGNED NOT NULL,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `action` ENUM('CRIADO', 'ENVIADO', 'VISUALIZADO', 'ASSINADO', 'CONCLUIDO'),
    `qrcode` VARCHAR(255),
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Tabela central (supertipo) que representa uma requisição/processo dentro de um envelope.
CREATE TABLE `request` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `envelope_id` BIGINT UNSIGNED NULL,
    `requester_user_id` BIGINT UNSIGNED NOT NULL,
    `manager_id` BIGINT UNSIGNED,
    `director_id` BIGINT UNSIGNED,
    `title` VARCHAR(255) NOT NULL,
    `observations` TEXT,
    `operational_unit` ENUM('Teu Matriz', 'Kaioka', 'Votre', 'IT Faber', 'Holding', 'Teiu Filial', 'Revani'),
    `category` ENUM('ADMISSAO', 'MOVIMENTACAO_PESSOAL', 'DOCUMENTO_SIMPLES') NOT NULL,
    -- Colunas para a relação polimórfica. Sem FK.
    `detail_type` VARCHAR(100) NOT NULL COMMENT 'Ex: "admission_detail", "personnel_movement_detail"',
    `detail_id` BIGINT UNSIGNED NOT NULL
) ENGINE=InnoDB;

-- Armazena os PDFs associados diretamente a uma requisição.
CREATE TABLE `request_pdf` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `request_id` BIGINT UNSIGNED NOT NULL,
    `pdf_path` VARCHAR(512) NOT NULL
) ENGINE=InnoDB;

-- Detalhes específicos de uma requisição de Admissão de Pessoal (RAP).
CREATE TABLE `admission_detail` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `request_id` BIGINT UNSIGNED NOT NULL,
    `protocol` VARCHAR(100),
    `job_title` VARCHAR(255) NOT NULL,
    `contract_type` ENUM('CLT', 'APRENDIZ', 'ESTAGIARIO', 'TEMPORARIO') NOT NULL,
    `work_schedule` ENUM('08h_as_18h', '08h_as_14h', '12h_as_18h', 'ESCALA_12x36') NOT NULL,
    `department` VARCHAR(255),
    `reason` ENUM('AUMENTO_QUADRO', 'SUBSTITUICAO') NOT NULL,
    `gender` ENUM('FEMININO', 'MASCULINO'),
    `initial_salary` DECIMAL(10, 2),
    `selection_type` ENUM('INTERNA', 'EXTERNA', 'INDICACAO') NOT NULL,
    `operational_unit` ENUM('Teu Matriz', 'Kaioka', 'Votre', 'IT Faber', 'Holding', 'Teiu Filial', 'Revani'),
    `justification` TEXT,
    `activities_description` TEXT,
    `observations` TEXT
) ENGINE=InnoDB;

-- Detalhes específicos de uma requisição de Movimentação de Pessoal (RMP).
CREATE TABLE `personnel_movement_detail` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `request_id` BIGINT UNSIGNED NOT NULL,
    `protocol` VARCHAR(100),
    `employee_name` VARCHAR(255) NOT NULL,
    `employee_job_title` VARCHAR(255) NOT NULL,
    `employee_id` VARCHAR(100) NOT NULL COMMENT 'matrícula do colaborador',
    `cost_center` VARCHAR(255),
    `request_date` DATETIME NOT NULL,
    -- Colunas para a relação polimórfica (nível 2). Sem FK.
    `movement_type` VARCHAR(100) NOT NULL COMMENT 'Ex: "termination_detail", "salary_change_detail"',
    `movement_id` BIGINT UNSIGNED NOT NULL
) ENGINE=InnoDB;

-- Detalhes de um documento simples, que não é nem RAP nem RMP.
CREATE TABLE `simple_document_detail` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `request_id` BIGINT UNSIGNED NOT NULL,
    `envelope_title` VARCHAR(255),
    `description` TEXT
) ENGINE=InnoDB;

-- Armazena os PDFs associados a um documento simples.
CREATE TABLE `simple_document_pdf` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `simple_document_detail_id` BIGINT UNSIGNED NOT NULL,
    `file_path` VARCHAR(512) NOT NULL
) ENGINE=InnoDB;

-- Representa o processo de um candidato para uma vaga de admissão. Contém o status ATUAL.
CREATE TABLE `admission_process` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `admission_detail_id` BIGINT UNSIGNED NOT NULL UNIQUE,
    `candidate_name` VARCHAR(255) NOT NULL,
    `candidate_phone` VARCHAR(50),
    `current_status` ENUM('DOCUMENTACAO_PENDENTE', 'EXAME_PENDENTE', 'INTEGRACAO', 'CONTRATADO', 'REJEITADO') NOT NULL,
    `start_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `end_date` DATETIME
) ENGINE=InnoDB;

-- Registra cada mudança de status (evento) de um processo de admissão.
CREATE TABLE `admission_process_history` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `admission_process_id` BIGINT UNSIGNED NOT NULL,
    `responsible_user_id` BIGINT UNSIGNED,
    `status_registered` ENUM('DOCUMENTOS_ENVIADOS', 'EXAME_AGENDADO', 'EXAME_REALIZADO', 'INTEGRACAO_CONCLUIDA') NOT NULL,
    `observation` TEXT,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Armazena os arquivos (documentos) de um candidato em um processo de admissão.
CREATE TABLE `admission_file` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `admission_process_id` BIGINT UNSIGNED NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `file_path` VARCHAR(512) NOT NULL
) ENGINE=InnoDB;

-- Detalhes de uma movimentação de pessoal do tipo Desligamento.
CREATE TABLE `termination_detail` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `personnel_movement_detail_id` BIGINT UNSIGNED NOT NULL,
    `termination_reason` ENUM('COM_JUSTA_CAUSA', 'SEM_JUSTA_CAUSA', 'ACORDO') NOT NULL,
    `notice_type` ENUM('INDENIZADO', 'TRABALHADO', 'AUSENTE') NOT NULL,
    `movement_type` ENUM('TERMINO_EXPERIENCIA', 'DESLIGAMENTO') NOT NULL
) ENGINE=InnoDB;

-- Detalhes de uma movimentação de pessoal do tipo Realocação/Mudança de cargo/unidade.
CREATE TABLE `relocation_detail` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `personnel_movement_detail_id` BIGINT UNSIGNED NOT NULL,
    `new_cost_center` VARCHAR(255),
    `new_operational_unit` ENUM('Teu Matriz', 'Kaioka', 'Votre', 'IT Faber', 'Holding', 'Teiu Filial', 'Revani'),
    `new_job_title` VARCHAR(255),
    `reason` TEXT
) ENGINE=InnoDB;

-- Detalhes de uma movimentação de pessoal do tipo Alteração Salarial.
CREATE TABLE `salary_change_detail` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `personnel_movement_detail_id` BIGINT UNSIGNED NOT NULL,
    `previous_value` DECIMAL(10, 2) NOT NULL,
    `new_value` DECIMAL(10, 2) NOT NULL,
    `movement_type` ENUM('AJUSTE_SALARIAL', 'INSALUBRIDADE', 'PERICULOSIDADE', 'PROMOCAO') NOT NULL,
    `new_job_title` VARCHAR(255) COMMENT 'Preenchido apenas para promoção'
) ENGINE=InnoDB;

-- ====================================================================================
-- PARTE 2: ADIÇÃO DAS CHAVES ESTRANGEIRAS
-- ====================================================================================

-- Relações da tabela User e Permissões
ALTER TABLE `user_permission` ADD CONSTRAINT `fk_user_permission_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE;
ALTER TABLE `user_permission` ADD CONSTRAINT `fk_user_permission_permission` FOREIGN KEY (`permission_id`) REFERENCES `permission`(`id`) ON DELETE CASCADE;
ALTER TABLE `permission_history` ADD CONSTRAINT `fk_permission_history_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE;
ALTER TABLE `permission_history` ADD CONSTRAINT `fk_permission_history_responsible` FOREIGN KEY (`responsible_user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE;
ALTER TABLE `email_signature` ADD CONSTRAINT `fk_email_signature_user` FOREIGN KEY (`created_by_user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE;

-- Relações do fluxo de trabalho (Workflow)
ALTER TABLE `workflow_action` ADD CONSTRAINT `fk_workflow_action_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE;
ALTER TABLE `workflow_route` ADD CONSTRAINT `fk_workflow_route_creator` FOREIGN KEY (`created_by_user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT;
ALTER TABLE `workflow_route_step` ADD CONSTRAINT `fk_route_step_route` FOREIGN KEY (`workflow_route_id`) REFERENCES `workflow_route`(`id`) ON DELETE CASCADE;
ALTER TABLE `workflow_route_step` ADD CONSTRAINT `fk_route_step_step` FOREIGN KEY (`workflow_step_id`) REFERENCES `workflow_step`(`id`) ON DELETE CASCADE;
ALTER TABLE `workflow_step_action` ADD CONSTRAINT `fk_step_action_step` FOREIGN KEY (`workflow_step_id`) REFERENCES `workflow_step`(`id`) ON DELETE CASCADE;
ALTER TABLE `workflow_step_action` ADD CONSTRAINT `fk_step_action_action` FOREIGN KEY (`workflow_action_id`) REFERENCES `workflow_action`(`id`) ON DELETE CASCADE;

-- Relações do Envelope
ALTER TABLE `envelope` ADD CONSTRAINT `fk_envelope_requester` FOREIGN KEY (`requester_user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT;
ALTER TABLE `envelope` ADD CONSTRAINT `fk_envelope_route` FOREIGN KEY (`workflow_route_id`) REFERENCES `workflow_route`(`id`) ON DELETE RESTRICT;
ALTER TABLE `envelope_update` ADD CONSTRAINT `fk_envelope_update_envelope` FOREIGN KEY (`envelope_id`) REFERENCES `envelope`(`id`) ON DELETE CASCADE;
ALTER TABLE `envelope_update` ADD CONSTRAINT `fk_envelope_update_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT;

-- Relações do sistema de Notificação
ALTER TABLE `notification_recipient` ADD CONSTRAINT `fk_recipient_notification` FOREIGN KEY (`notification_id`) REFERENCES `notification`(`id`) ON DELETE CASCADE;
ALTER TABLE `notification_recipient` ADD CONSTRAINT `fk_recipient_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE;

-- Relações do núcleo da Requisição (Polimorfismo)
ALTER TABLE `request` ADD CONSTRAINT `fk_request_envelope` FOREIGN KEY (`envelope_id`) REFERENCES `envelope`(`id`) ON DELETE SET NULL;
ALTER TABLE `request` ADD CONSTRAINT `fk_request_requester` FOREIGN KEY (`requester_user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT;
ALTER TABLE `request` ADD CONSTRAINT `fk_request_manager` FOREIGN KEY (`manager_id`) REFERENCES `manager`(`id`) ON DELETE SET NULL;
ALTER TABLE `request` ADD CONSTRAINT `fk_request_director` FOREIGN KEY (`director_id`) REFERENCES `director`(`id`) ON DELETE SET NULL;
ALTER TABLE `request_pdf` ADD CONSTRAINT `fk_request_pdf_request` FOREIGN KEY (`request_id`) REFERENCES `request`(`id`) ON DELETE CASCADE;

-- Relações de "volta" dos detalhes para a Requisição
ALTER TABLE `admission_detail` ADD CONSTRAINT `fk_admission_detail_request` FOREIGN KEY (`request_id`) REFERENCES `request`(`id`) ON DELETE CASCADE;
ALTER TABLE `personnel_movement_detail` ADD CONSTRAINT `fk_movement_detail_request` FOREIGN KEY (`request_id`) REFERENCES `request`(`id`) ON DELETE CASCADE;
ALTER TABLE `simple_document_detail` ADD CONSTRAINT `fk_simple_document_detail_request` FOREIGN KEY (`request_id`) REFERENCES `request`(`id`) ON DELETE CASCADE;
ALTER TABLE `simple_document_pdf` ADD CONSTRAINT `fk_simple_document_pdf_detail` FOREIGN KEY (`simple_document_detail_id`) REFERENCES `simple_document_detail`(`id`) ON DELETE CASCADE;

-- Relações do processo de Admissão
ALTER TABLE `admission_process` ADD CONSTRAINT `fk_admission_process_detail` FOREIGN KEY (`admission_detail_id`) REFERENCES `admission_detail`(`id`) ON DELETE CASCADE;
ALTER TABLE `admission_process_history` ADD CONSTRAINT `fk_history_admission_process` FOREIGN KEY (`admission_process_id`) REFERENCES `admission_process`(`id`) ON DELETE CASCADE;
ALTER TABLE `admission_process_history` ADD CONSTRAINT `fk_history_responsible_user` FOREIGN KEY (`responsible_user_id`) REFERENCES `user`(`id`) ON DELETE SET NULL;
ALTER TABLE `admission_file` ADD CONSTRAINT `fk_file_admission_process` FOREIGN KEY (`admission_process_id`) REFERENCES `admission_process`(`id`) ON DELETE CASCADE;

-- Relações de "volta" dos detalhes de movimentação (Nível 2)
ALTER TABLE `termination_detail` ADD CONSTRAINT `fk_termination_movement_detail` FOREIGN KEY (`personnel_movement_detail_id`) REFERENCES `personnel_movement_detail`(`id`) ON DELETE CASCADE;
ALTER TABLE `relocation_detail` ADD CONSTRAINT `fk_relocation_movement_detail` FOREIGN KEY (`personnel_movement_detail_id`) REFERENCES `personnel_movement_detail`(`id`) ON DELETE CASCADE;
ALTER TABLE `salary_change_detail` ADD CONSTRAINT `fk_salary_change_movement_detail` FOREIGN KEY (`personnel_movement_detail_id`) REFERENCES `personnel_movement_detail`(`id`) ON DELETE CASCADE;
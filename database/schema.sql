CREATE DATABASE IF NOT EXISTS `planificacion`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `planificacion`;

CREATE TABLE IF NOT EXISTS `plans` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `token` CHAR(48) NOT NULL,
  `user_name` VARCHAR(120) NULL,
  `title` VARCHAR(180) NOT NULL,
  `data` JSON NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `plans_token_unique` (`token`),
  KEY `plans_user_name_index` (`user_name`),
  KEY `plans_updated_at_index` (`updated_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

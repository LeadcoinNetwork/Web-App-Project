-- When editing the databse, add schema migration to the bottom.
-- Nevery edit current lines after push
drop database if EXISTS `leadcoin`;
CREATE DATABASE IF NOT EXISTS `leadcoin`;
use `leadcoin`;
CREATE TABLE IF NOT EXISTS `users`
(
  `id`  INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `doc` JSON
) DEFAULT CHARACTER SET = utf8
  COLLATE = utf8_bin;

DROP TABLE IF EXISTS `leads_upload`;
CREATE TABLE `leads_upload`
(
  `id`           int(10) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `leads_upload` JSON
) DEFAULT CHARACTER SET = utf8
  COLLATE = utf8_bin;

DROP TABLE IF EXISTS `leads`;
CREATE TABLE `leads`
(
  `id`  int(10) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `doc` JSON
) DEFAULT CHARACTER SET = utf8
  COLLATE = utf8_bin;

DROP TABLE IF EXISTS `notifications`;
CREATE TABLE `notifications`
(
  `id`  int(10) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `doc` JSON
) DEFAULT CHARACTER SET = utf8
  COLLATE = utf8_bin;
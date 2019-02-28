-- When editing the databse, add schema migration to the bottom.
-- Nevery edit current lines after push
drop database if EXISTS leadcoin;
CREATE DATABASE IF NOT EXISTS leadcoin;
use leadcoin;
CREATE TABLE IF NOT EXISTS users (
	id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	doc longtext
) DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;

DROP TABLE IF EXISTS `leadcoin`.`leads_upload`;
CREATE TABLE  `leadcoin`.`leads_upload` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    leads_upload longtext
) DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;

DROP TABLE IF EXISTS `leadcoin`.`leads`;
CREATE TABLE  `leadcoin`.`leads` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  doc longtext
) DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;

DROP TABLE IF EXISTS `leadcoin`.`notifications`;
CREATE TABLE  `leadcoin`.`notifications` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  doc longtext
) DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;

-- Change fields type with JSON data to JSON
ALTER TABLE `users` CHANGE `doc` `doc` JSON NULL DEFAULT NULL;
ALTER TABLE `leads_upload` CHANGE `leads_upload` `leads_upload` JSON NULL DEFAULT NULL;
ALTER TABLE `leads` CHANGE `doc` `doc` JSON NULL DEFAULT NULL;
ALTER TABLE `notifications` CHANGE `doc` `doc` JSON NULL DEFAULT NULL;
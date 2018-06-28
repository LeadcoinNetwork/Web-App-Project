-- When editing the databse, add schema migration to the bottom.
-- Nevery edit current lines after push
drop database if EXISTS leadcoin;
CREATE DATABASE IF NOT EXISTS leadcoin;
use leadcoin;
CREATE TABLE IF NOT EXISTS users (
	id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	provider_id VARCHAR(40),
	provider VARCHAR(40),
	password VARCHAR(60),
	email VARCHAR(254) NOT NULL UNIQUE,	
	role VARCHAR(255) DEFAULT 'user',
	fname VARCHAR(40) NOT NULL,
	lname VARCHAR(40) NOT NULL,
	company VARCHAR(40),
	country VARCHAR(40),
	phone VARCHAR(40),
	created BIGINT,
	access BIGINT,
	login BIGINT,
	disabled VARCHAR(40)
);

CREATE TABLE IF NOT EXISTS tokens (
	user_id INT(10) UNSIGNED PRIMARY KEY,
	token VARCHAR(60),
	pending_email VARCHAR(254) UNIQUE,
	created BIGINT,
	FOREIGN KEY (user_id) REFERENCES users(id)
		ON DELETE CASCADE
);

-- Add schema migration to here
alter table users add column emailConfirmationKey longtext;

DROP TABLE IF EXISTS `leadcoin`.`leads_upload`;
CREATE TABLE  `leadcoin`.`leads_upload` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `batch_id` int(10) unsigned NOT NULL DEFAULT '0',
  `user_id` int(10) unsigned NOT NULL DEFAULT '0',
  `json` text,
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId_batchId` (`user_id`,`batch_id`)
);

DROP TABLE IF EXISTS `leadcoin`.`leads`;
CREATE TABLE  `leadcoin`.`leads` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  `name` varchar(45) NOT NULL DEFAULT '',
  `phone` varchar(45) NOT NULL DEFAULT '',
  `email` varchar(45) NOT NULL DEFAULT '',
  `type` varchar(45) NOT NULL DEFAULT '',
  `state` varchar(45) NOT NULL DEFAULT '',
  `city` varchar(45) NOT NULL DEFAULT '',
  `property_type` varchar(45) NOT NULL DEFAULT '',
  `size` varchar(45) NOT NULL DEFAULT '',
  `budget` varchar(45) NOT NULL DEFAULT '',
  `bedrooms` varchar(45) NOT NULL DEFAULT '',
  `floor` varchar(45) NOT NULL DEFAULT '',
  `specification` varchar(45) NOT NULL DEFAULT '',
  `ext_data` text,
  `bought_from` int(10) unsigned DEFAULT NULL,
  `owner_id` int(10) unsigned NOT NULL DEFAULT '0',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `ownerId_type` (`owner_id`,`type`)
);
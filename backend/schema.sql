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
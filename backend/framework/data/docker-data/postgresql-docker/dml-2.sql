INSERT INTO users (username, password, email, created_on, last_login)
VALUES('manolo', 'pass2', 'email-3', '2016-06-22 19:10:25-07','2016-06-22 19:10:25-07');

INSERT INTO users (username, password, email, created_on, last_login)
VALUES('perico', 'pass3', 'email-4', '2016-06-22 19:10:25-07','2016-06-22 19:10:25-07');



CREATE TABLE users(
	user_id serial PRIMARY KEY,
	username VARCHAR ( 50 ) UNIQUE NOT NULL,
	password VARCHAR ( 50 ) NOT NULL,
	email VARCHAR ( 255 ) UNIQUE NOT NULL,
	created_on TIMESTAMP NOT NULL,
    last_login TIMESTAMP 
);
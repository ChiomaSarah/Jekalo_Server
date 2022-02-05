CREATE DATABASE jekalo;

CREATE TABLE  credentials(
user_id SERIAL PRIMARY KEY,
first_name VARCHAR(50)NOT NULL,
last_name VARCHAR(50),
username VARCHAR(75) UNIQUE NOT NULL,
date_of_birth VARCHAR(200) NOT NULL
);

INSERT INTO credentials(first_name, last_name, username, date_of_birth) VALUES('Sarah', 'Osuji', 'Exquisite', '25-10-2022');
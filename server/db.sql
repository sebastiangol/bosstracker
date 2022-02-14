-- List databases: \l
-- Connect to database: \c database_name
-- List table(s) in database: \d table_name OR \d
-- Text: VARCHAR(length) or TEXT
-- Numbers: INT
-- CREATE TABLE fruits(
--    id SERIAL PRIMARY KEY,
--    name VARCHAR NOT NULL
-- );
-- INSERT INTO fruits(id,name) 
-- VALUES(DEFAULT,'Apple');
-- 

CREATE DATABASE bosstracker;

CREATE TABLE users(
user_id SERIAL PRIMARY KEY,
user_name VARCHAR(30) NOT NULL,
user_password TEXT NOT NULL,
);

CREATE TABLE profiles(
profile_id SERIAL PRIMARY KEY,
user_id INT NOT NULL REFERENCES users(user_id),
profile_name VARCHAR(50) NOT NULL,
profile_public BOOLEAN NOT NULL,
);

CREATE TABLE bosses(
boss_id SERIAL PRIMARY KEY,
profile_id INT NOT NULL REFERENCES profiles(profile_id),
boss_name VARCHAR(50) NOT NULL,
attempts INT NOT NULL,
notes TEXT NOT NULL,
);


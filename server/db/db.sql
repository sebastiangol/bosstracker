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
-- Yep

CREATE DATABASE bosstracker;

CREATE TABLE users(
user_id SERIAL PRIMARY KEY,
user_name VARCHAR(30) UNIQUE NOT NULL,
user_password TEXT NOT NULL
);

CREATE TABLE profiles(
profile_id SERIAL PRIMARY KEY,
user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
profile_name VARCHAR(50) NOT NULL,
profile_public BOOLEAN NOT NULL
);

CREATE TABLE bosses(
boss_id SERIAL PRIMARY KEY,
profile_id INT NOT NULL REFERENCES profiles(profile_id) ON DELETE CASCADE,
boss_name VARCHAR(50) NOT NULL,
attempts INT NOT NULL,
notes TEXT NOT NULL,
completed BOOLEAN NOT NULL
);

INSERT INTO users (user_id, user_name, user_password) VALUES (DEFAULT, 'Seb', 'sebseb');

INSERT INTO profiles (user_id, profile_name, profile_public) VALUES (1, 'first run', true);
INSERT INTO profiles (user_id, profile_name, profile_public) VALUES (1, 'LOL', false);
INSERT INTO profiles (user_id, profile_name, profile_public) VALUES (1, 'ng+7', true);
INSERT INTO profiles (user_id, profile_name, profile_public) VALUES (1, 'Best character ever!', true);
INSERT INTO profiles (user_id, profile_name, profile_public) VALUES (1, 'cool', false);
INSERT INTO profiles (user_id, profile_name, profile_public) VALUES (1, 'super duper fantastic run', true);

INSERT INTO bosses (profile_id, boss_name, attempts, notes, completed) VALUES (1, 'boss1', 3, 'do something', true);
INSERT INTO bosses (profile_id, boss_name, attempts, notes, completed) VALUES (1, 'boss2', 2, 'Don''t do this thing, do that', true);
INSERT INTO bosses (profile_id, boss_name, attempts, notes, completed) VALUES (1, 'boss3', 11, '', true);
INSERT INTO bosses (profile_id, boss_name, attempts, notes, completed) VALUES (1, 'boss4', 21, 'whatever', true);
INSERT INTO bosses (profile_id, boss_name, attempts, notes, completed) VALUES (1, 'boss5', 1, 'easy', true);
INSERT INTO bosses (profile_id, boss_name, attempts, notes, completed) VALUES (1, 'boss6', 15, 'Please help', false);

INSERT INTO bosses (profile_id, boss_name, attempts, notes, completed) VALUES (2, 'one boss', 2, 'easy', false);
INSERT INTO bosses (profile_id, boss_name, attempts, notes, completed) VALUES (2, 'two boss', 21, 'hard', false);

INSERT INTO bosses (profile_id, boss_name, attempts, notes, completed) VALUES (3, 'Holy Beast Ewan', 2, '', true);
INSERT INTO bosses (profile_id, boss_name, attempts, notes, completed) VALUES (3, 'Pitchfork Knight', 1, '', false);
INSERT INTO bosses (profile_id, boss_name, attempts, notes, completed) VALUES (3, 'Sludge', 2, '', true);
INSERT INTO bosses (profile_id, boss_name, attempts, notes, completed) VALUES (3, 'Reaper', 5, '', true);

INSERT INTO bosses (profile_id, boss_name, attempts, notes, completed) VALUES (4, 'big head', 11, '', true);
INSERT INTO bosses (profile_id, boss_name, attempts, notes, completed) VALUES (4, 'Weird enemy', 1, 'Hit legs', true);
INSERT INTO bosses (profile_id, boss_name, attempts, notes, completed) VALUES (4, 'Scary boss', 5, '', true);
INSERT INTO bosses (profile_id, boss_name, attempts, notes, completed) VALUES (4, 'Demon king', 4, 'Water', true);
INSERT INTO bosses (profile_id, boss_name, attempts, notes, completed) VALUES (4, 'A', 44, '', true);

INSERT INTO bosses (profile_id, boss_name, attempts, notes, completed) VALUES (5, '1st one', 32, 'How is this possible', true);
INSERT INTO bosses (profile_id, boss_name, attempts, notes, completed) VALUES (5, '2nd', 2, '', true);
INSERT INTO bosses (profile_id, boss_name, attempts, notes, completed) VALUES (5, '3rd', 11, '', true);

INSERT INTO bosses (profile_id, boss_name, attempts, notes, completed) VALUES (6, 'first boss', 21, '', true);
INSERT INTO bosses (profile_id, boss_name, attempts, notes, completed) VALUES (6, 'dwarf thing', 4, 'Jump over the thing', true);
INSERT INTO bosses (profile_id, boss_name, attempts, notes, completed) VALUES (6, 'Ornstein and Jack', 2, 'Separate', false);
INSERT INTO bosses (profile_id, boss_name, attempts, notes, completed) VALUES (6, 'lost knight ian', 9, 'He is at this location', true);
INSERT INTO bosses (profile_id, boss_name, attempts, notes, completed) VALUES (6, 'The Dark Lord of Something', 5, 'I can''t see', false);
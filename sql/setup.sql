-- Use this file to define your SQL tables.
-- The SQL in this file will be executed when you run `npm run setup-db`.

DROP TABLE IF EXISTS eigo_users;
DROP TABLE IF EXISTS three_letter_words;
DROP TABLE IF EXISTS eigo_words;

CREATE TABLE eigo_users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username TEXT,
  email TEXT NOT NULL,
  passwordhash TEXT NOT NULL
);

CREATE TABLE eigo_words (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  word TEXT,
  difficulty TEXT
);

INSERT INTO eigo_users
(email, passwordhash)
VALUES
('testUser@test.com', '$2b$10$/Rp47pfzWislwvQq1TJ5xud1sShAUVY5eRAWx1Bx4GOiy6qAFtQjO');

-- Use this file to define your SQL tables.
-- The SQL in this file will be executed when you run `npm run setup-db`.

DROP TABLE IF EXISTS eigo_users;

CREATE TABLE eigo_users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username TEXT,
  email TEXT NOT NULL,
  passwordhash TEXT NOT NULL
);

INSERT INTO eigo_users
(email, passwordhash)
VALUES
('fish@test.com', '$2b$10$/XLQ2NtgPH0ZWknA46v44uXryhWfvZR4qXWgx70eNhc4kvMpTKXJK')
-- Use this file to define your SQL tables.
-- The SQL in this file will be executed when you run `npm run setup-db`.

drop table if exists foos;
drop table if exists cats;
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
('testUser@test.com', '$2b$10$/Rp47pfzWislwvQq1TJ5xud1sShAUVY5eRAWx1Bx4GOiy6qAFtQjO');

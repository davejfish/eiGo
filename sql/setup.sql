-- Use this file to define your SQL tables.
-- The SQL in this file will be executed when you run `npm run setup-db`.

drop table if exists foos;
drop table if exists cats;

CREATE TABLE eigo_users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username TEXT,
  email TEXT NOT NULL,
  passwordhash TEXT NOT NULL
);

create table cats (
  id bigint generated always as identity primary key,
  name varchar
);

insert into
  foos (foo)
values
  (
    'bar'
  ),
  (
    'baz'
  ),
  (
    'qux'
  )
  ;

insert into
  cats (name)
values
  (
    'Atonic'
  ),
  (
    'Astrophe'
  ),
  (
    'Cher'
  )
  ;

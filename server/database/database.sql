CREATE DATABASE todocrud;

CREATE TABLE todo (
    id_todo SERIAL PRIMARY KEY,
    titulo VARCHAR(255),
    corpo VARCHAR(255),
    completed BOOLEAN
);
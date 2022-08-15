


CREATE TABLE user(
    id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100),
    nickname VARCHAR(100)
);


CREATE TABLE todos(
    id VARCHAR(20) PRIMARY KEY,
    title VARCHAR(100),
    isdone BOOLEAN,
    user_id VARCHAR(20),
    FOREIGN KEY (user_id) REFERENCES user (id)
)


CREATE TABLE users (id serial PRIMARY KEY, name VARCH(100), nickname VARCHAR(100));
CREATE TABLE todos (id serial PRIMARY KEY, title VARCH(100), isdone boolean, user_id INT, 
FOREIGN KEY (user_id) REFERENCES users(id));`;



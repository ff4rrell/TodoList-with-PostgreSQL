


CREATE TABLE user(
    id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100),
    nickname VARCHAR(100)
);


CREATE TABLE todolist(
    id VARCHAR(20) PRIMARY KEY,
    title VARCHAR(100),
    isdone BOOLEAN,
    user_id VARCHAR(20),
    FOREIGN KEY (user_id) REFERENCES user (id)
)
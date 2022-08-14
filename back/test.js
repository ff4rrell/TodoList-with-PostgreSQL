const pg = require('pg');
require("dotenv").config();
const config = {
    host: process.env.PSQL_URL,
    user: process.env.PSQL_NAME,     
    password: process.env.PSQL_PASSWORD,
    database: process.env.PSQL_DATABASE,
    port: 5432,
    ssl: false
};

const client = new pg.Client(config);

client.connect(err => {
    if (err) throw err;
    else {
        queryDatabase();
    }
});


// DROP TABLE IF EXISTS user;
function queryDatabase() {
    const query = `
        DROP TABLE IF EXISTS todos;
        DROP TABLE IF EXISTS users;
        CREATE TABLE users (id serial PRIMARY KEY, name VARCHAR(100), nickname VARCHAR(100));
        CREATE TABLE todos (id serial PRIMARY KEY, title VARCHAR(100), isdone boolean, user_id INT, 
        FOREIGN KEY (user_id) REFERENCES users(id));`;

    client
        .query(query)
        .then(() => {
            console.log('Table created successfully!');
            client.end(console.log('Closed client connection'));
        })
        .catch(err => console.log(err))
        .then(() => {
            console.log('Finished execution, exiting now');
            process.exit();
        });
}




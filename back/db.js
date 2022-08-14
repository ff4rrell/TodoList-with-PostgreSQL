const { Client } = require("pg");
require("dotenv").config();
const config = {
  host: process.env.PSQL_URL,
  user: process.env.PSQL_NAME,
  password: process.env.PSQL_PASSWORD,
  database: process.env.PSQL_DATABASE,
  port: 5432,
  ssl: false,
};
const client = new Client(config);

module.exports = client;



const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "1995",
    database: "proyecto-final",
  },
});

module.exports = knex;

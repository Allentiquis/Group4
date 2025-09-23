require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER, // Database username
    password: process.env.DB_PASS, // Database password
    database: process.env.DB_NAME, // Database name
    host: process.env.DB_HOST, // Database host (e.g., Localhost)
    port: process.env.DB_PORT, // Database port (default for Postgres = 5432)
    dialect: "postgres", // Database type
    logging: console.log, // Show SQL queries in console (useful for dev)
  },

  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME + "_test", // Separate DB for testing
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false, // No logs during tests
  },
 production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false, // Never log SQL in production
    dialectOptions: {
      ssl: {
        require: true, // Force SSL connection
        rejectUnauthorized: false, // Accept self-signed certs (common in cloud DBs)
      },
    },
  },
};
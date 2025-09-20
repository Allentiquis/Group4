/**
 * Sequelize Database Configuration
 * This file defines database settings for different environments
 * (development, test, and production). It pulls credentials from
 * environment variables defined in ".env".
 * Sequelize will use these settings when running migrations,
 * seeding data, or connecting at runtime.
 */

require("dotenv").config();

module.exports = {
  /**
   * Development Environment
   * - Uses credentials from .env file
   * - SQL queries are logged to the console (for debugging)
   */
  development: {
    username: process.env.DB_USER, // Database username
    password: process.env.DB_PASS, // Database password
    database: process.env.DB_NAME, // Database name
    host: process.env.DB_HOST, // Database host (e.g., Localhost)
    port: process.env.DB_PORT, // Database port (default for Postgres = 5432)
    dialect: "postgres", // Database type
    logging: console.log, // Show SQL queries in console (useful for dev)
  },

  /**
   * Test Environment
   * - Similar to dev, but:
   * - Database name uses _test suffix
   * - SQL Logging disabled (keeps test output clean)
   */
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME + "_test", // Separate DB for testing
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false, // No logs during tests
  },

  /**
   * Production Environment
   * - SQL Logging disabled (performance & security)
   * - SSL enforced for secure remote connections (e.g., cloud DBs like Heroku, AWS RDS)
   */
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

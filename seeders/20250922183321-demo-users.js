"use strict";

const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  /**
   * Run the seeder (insert records).
   * @param {import('sequelize').QueryInterface} queryInterface
   */
  async up(queryInterface) {
    const hashedPassword = await bcrypt.hash("password123", 10);

    await queryInterface.bulkInsert("Users", [
      {
        id: uuidv4(),
        username: "admin",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        username: "manager",
        email: "manager@example.com",
        password: hashedPassword,
        role: "manager",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        username: "staff",
        email: "staff@example.com",
        password: hashedPassword,
        role: "staff",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  /**
   * Revert the seeder (delete records).
   * @param {import('sequelize').QueryInterface} queryInterface
   */
  async down(queryInterface) {
    await queryInterface.bulkDelete("Users", {
      email: [
        "admin@example.com",
        "manager@example.com",
        "staff@example.com",
      ],
    });
  },
};

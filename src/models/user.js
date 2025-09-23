"use strict";

const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Associations can be defined here.
     * Example: User.belongsTo(models.Post);
     */
    static associate(models) {
      // Define any associations here if needed
    }

    /**
     * Validate user's password by comparing the entered plain text password
     * with the stored hashed password.
     *
     * @param {string} password - The plain text password to check
     * @returns {Promise<boolean>} - Resolves to true if passwords match, false otherwise
     */
    static async validatePassword(password) {
      return bcrypt.compare(password, this.password);
    }

    /**
     * Customize the JSON output when sending user data.
     * Removes sensitive fields like 'password' from the response.
     *
     * @returns {Object} User object without sensitive fields
     */
    toJSON() {
      const values = { ...this.get() };  // Get the instance data
      delete values.password;  // Never expose the password in API response
      return values;
    }
  }

  User.init(
    {
      // Unique username (required, 3-50 chars)
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Username already exists",
        },
        validate: {
          len: [3, 50], // Username must be between 3 and 50 characters
        },
      },

      // Unique email (required, must be valid format)
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email already exists",
        },
        validate: {
          isEmail: { msg: "Must be a valid email address" },
        },
      },

      // Password (required, minimum 6 chars, stored as hashed)
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [6, 100], // Password must be at least 6 characters long
        },
      },

      // User role (restricted to admin, manager, or staff)
      role: {
        type: DataTypes.ENUM("admin", "manager", "staff"),
        allowNull: false,
        defaultValue: "staff", // Default role for new users
        validate: {
          isIn: {
            args: [["admin", "manager", "staff"]],
            msg: "Role must be 'admin', 'manager', or 'staff'",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User", // Table name will be 'Users'
      hooks: {
        /**
         * Hash password before saving a new user.
         */
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10); // Generate salt
            user.password = await bcrypt.hash(user.password, salt); // Hash password
          }
        },

        /**
         * Hash password before updating the user (if password is changed).
         */
        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            const salt = await bcrypt.genSalt(10); // Generate salt
            user.password = await bcrypt.hash(user.password, salt); // Hash password
          }
        },
      },
    }
  );

  return User;
};

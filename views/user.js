const { v4 } = require("uuid");
const MyDatabase = require("../repository/database");
const Credential = require("./credential");
const bcrypt = require("bcrypt");

class User {
  constructor(firstName, lastName, username, password, role) {
    this.id = v4();
    this.firstName = firstName;
    this.lastName = lastName;
    this.credentials = new Credential(username, password);
    this.role = role;
  }

  static async createUser(firstName, lastName, username, password, role) {
    const user = new User(firstName, lastName, username, password, role);

    const db = new MyDatabase();
    const newUser = await db.createUser(user);
    return newUser;
  }

  async updateUser(userid, parameter, value) {
    const db = new MyDatabase();
    const updatedUser = await db.updateUser(userid, parameter, value);
    return updatedUser;
  }

  async deleteUser(username) {
    const db = new MyDatabase();
    const deletedUser = await db.deleteUser(username);
    return deletedUser;
  }

  static async getUser(username) {
    const db = new MyDatabase();
    const user = await db.getUser(username);
    return user;
  }

  static async getAllUsers() {
    const db = new MyDatabase();
    const users = await db.getAllUsers();
    return users;
  }

  async retreiveUser(username) {
    const db = new MyDatabase();
    const retreivedUser = await db.retreiveUser(username);
    return retreivedUser;
  }

  async getAllUsersIncludingdDeleted() {
    const db = new MyDatabase();
    const allUsers = await db.getAllUsersIncludingdDeleted();
    return allUsers;
  }
}

module.exports = User;

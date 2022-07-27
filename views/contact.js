const { v4 } = require("uuid");
const MyDatabase = require("../repository/database");
const User = require("./user");

class Contact {
  constructor(firstName, lastName) {
    this.id = v4();
    this.firstName = firstName;
    this.lastName = lastName;
  }

  static async createContact(username, firstName, lastName) {
    const user = await User.getUser(username);
    const contact = new Contact(firstName, lastName);
    const db = new MyDatabase();
    const newContact = await db.createContact(user, contact);
    return newContact;
  }

  async updateContact(contactId, parameter, value) {
    const db = new MyDatabase();
    const updatedContact = await db.updateContact(contactId, parameter, value);
    return updatedContact;
  }

  async deleteContact(contactId) {
    const db = new MyDatabase();
    const deletedContact = await db.deleteContact(contactId);
    return deletedContact;
  }

  async retreiveContact(contactId) {
    const db = new MyDatabase();
    const retreivedContact = await db.retreiveContact(contactId);
    return retreivedContact;
  }

  static async getContacts(username) {
    const db = new MyDatabase();
    const user = await db.getUser(username);
    const contacts = await db.getContacts(user);
    return contacts;
  }

  static async getAllContactsIncludingDeleted(username) {
    const db = new MyDatabase();
    const user = await db.getUser(username);
    const contacts = await db.getAllContactsIncludingdDeleted(user);
    return contacts;
  }
}

module.exports = Contact;

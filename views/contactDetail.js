const { v4 } = require("uuid");
const MyDatabase = require("../repository/database");

class ContactDetail {
  constructor(type, number) {
    this.id = v4();
    this.type = type;
    this.number = number;
  }

  static async createContactDetail(contactId, type, number) {
    const db = new MyDatabase();
    const contactDetail = new ContactDetail(type, number);
    const newContactDetail = await db.createContactDetail(
      contactId,
      contactDetail
    );
    return newContactDetail;
  }

  async updateContactDetail(contactDetailId, parameter, value) {
    const db = new MyDatabase();
    const updatedContactDetail = await db.updateContactDetail(
      contactDetailId,
      parameter,
      value
    );
    return updatedContactDetail;
  }

  async deleteContactDetail(contactDetailId) {
    const db = new MyDatabase();
    const deletedContactDetail = await db.deleteContactDetail(contactDetailId);
    return deletedContactDetail;
  }

  async retreiveContactDetail(contactDetailId) {
    const db = new MyDatabase();
    const retreivedContactDetail = await db.retreiveContactDetail(
      contactDetailId
    );
    return retreivedContactDetail;
  }

  static async getContactDetails(contactId) {
    const db = new MyDatabase();
    const contactDetails = await db.getContactDetails(contactId);
    return contactDetails;
  }

  static async getContactDetailsIncludingDeleted(username) {
    const db = new MyDatabase();
    const user = await db.getUser(username);
    const contactDetails = await db.getContactDetailsIncludingDeleted(user);
    return contactDetails;
  }
}

module.exports = ContactDetail;

const Contact = require("../views/contact");
const User = require("../views/user");

exports.createContact = async (req, res) => {
  const { username, firstName, lastName } = req.body;

  if (typeof username !== "string") {
    res.status(400).send("Invalid username");
    return;
  }

  if (typeof firstName !== "string") {
    res.status(400).send("Invalid first name");
    return;
  }

  if (typeof lastName !== "string") {
    res.status(400).send("Invalid last name");
    return;
  }

  const newContact = await Contact.createContact(username, firstName, lastName);
  res.status(200).send(newContact);
};

exports.updateContact = async (req, res) => {
  const { contactId, parameter, value } = req.body;

  if (typeof contactId !== "string") {
    res.status(400).send("Invalid contact id");
    return;
  }

  if (typeof parameter !== "string") {
    res.status(400).send("Invalid parameter");
    return;
  }

  if (typeof value !== "string") {
    res.status(400).send("Invalid parameter");
    return;
  }

  const contactObj = new Contact();
  const updatedContact = await contactObj.updateContact(
    contactId,
    parameter,
    value
  );

  res.status(200).send("Contact updated successfully");
};

exports.deleteContact = async (req, res) => {
  const { contactId } = req.query;

  if (typeof contactId !== "string") {
    res.status(400).send("Invalid contact id");
    return;
  }
  const contactObj = new Contact();
  const deletedContact = await contactObj.deleteContact(contactId);
  res.status(200).send("contact deleted successfully");
};

exports.retreiveContact = async (req, res) => {
  const { contactId } = req.body;

  if (typeof contactId !== "string") {
    res.status(400).send("Invalid contact id");
    return;
  }

  const contactObj = new Contact();
  const retreivedContact = await contactObj.retreiveContact(contactId);
  console.log(retreivedContact);
  res.status(200).send("Contact retreived successfully");
};

// we are getting all contacts that create by a particular user(staff)
exports.getContacts = async (req, res) => {
  const { username } = req.body;

  if (typeof username !== "string") {
    res.status(200).send("Invalid username");
    return;
  }

  let contacts = await Contact.getContacts(username);
  res.status(200).send(contacts);
};

exports.getAllContactsIncludingDeleted = async (req, res) => {
  const { username } = req.body;

  if (typeof username !== "string") {
    res.status(400).send("Invalid username");
    return;
  }
  let contacts = await Contact.getAllContactsIncludingDeleted(username);
  res.status(200).send(contacts);
};

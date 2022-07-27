const ContactDetail = require("../views/contactDetail");

exports.createContactDetail = async (req, res) => {
  const { contactId, type, number } = req.body;

  if (typeof contactId !== "string") {
    res.status(400).send("Invalid contact id");
    return;
  }

  if (typeof type !== "string") {
    res.status(400).send("Invalid type of contact");
    return;
  }

  if (typeof number !== "string") {
    res.status(400).send("Invalid contact number");
    return;
  }

  const contactDetail = await ContactDetail.createContactDetail(
    contactId,
    type,
    number
  );
  res.status(200).send(contactDetail);
};

exports.updateContactDetail = async (req, res) => {
  const { contactDetailId, parameter, value } = req.body;

  if (typeof contactDetailId !== "string") {
    res.status(400).send("Invalid contact detail id");
    return;
  }

  if (typeof parameter !== "string") {
    res.status(400).send("Invalid parameter");
    return;
  }

  if (typeof value !== "string") {
    res.status(400).send("Invalid value");
    return;
  }

  const contactDetailObj = new ContactDetail();
  const updatedContactDetail = await contactDetailObj.updateContactDetail(
    contactDetailId,
    parameter,
    value
  );
  res.status(200).send("Contact detail updated successfully");
};

exports.deleteContactDetail = async (req, res) => {
  const { contactDetailId } = req.query;

  if (typeof contactDetailId !== "string") {
    res.status(400).send("contact detail is invalid");
    return;
  }

  const contactDetailObj = new ContactDetail();
  const deletedContactDetail = await contactDetailObj.deleteContactDetail(
    contactDetailId
  );
  res.status(200).send("Contact detail deleted successfully");
};

exports.retreiveContactDetail = async (req, res) => {
  const { contactDetailId } = req.body;

  if (typeof contactDetailId !== "string") {
    res.status(400).send("Invalid Contact Detail");
    return;
  }

  const contactDetailObj = new ContactDetail();
  const retreivedContactDetail = await contactDetailObj.retreiveContactDetail(
    contactDetailId
  );
  res.status(200).send("Contact Detail retreived successfully");
};

exports.getContactDetails = async (req, res) => {
  const { contactId } = req.body;

  if (typeof contactId !== "string") {
    res.status(400).send("Contact id is invalid");
    return;
  }

  const contactDetails = await ContactDetail.getContactDetails(contactId);
  res.status(200).send(contactDetails);
};

exports.getContactDetailsIncludingDeleted = async (req, res) => {
  const { username } = req.body;

  if (typeof username !== "string") {
    res.status(400).send("Invalid username");
    return;
  }

  const contactDetails = await ContactDetail.getContactDetailsIncludingDeleted(
    username
  );
  console.log(contactDetails);
  res.status(200).send(contactDetails);
};

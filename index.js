const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  retreiveUser,
  getAllUsersIncludingdDeleted,
} = require("./controllers/userController");
const {
  createContact,
  updateContact,
  deleteContact,
  retreiveContact,
  getContacts,
  getAllContactsIncludingDeleted,
} = require("./controllers/contactController");
const {
  createContactDetail,
  updateContactDetail,
  deleteContactDetail,
  retreiveContactDetail,
  getContactDetails,
  getContactDetailsIncludingDeleted,
} = require("./controllers/contactDetailController");
const { loginUser, logoutUser } = require("./controllers/authController");
const { isAuthenticated, checkoutUser } = require("./middlewares/auth");

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// routes
app.post("/createuser", createUser);
app.put("/updateuser", updateUser);
app.delete("/deleteuser", deleteUser);
app.post("/getuser", getUser);
app.get("/getallusers", getAllUsers);
app.post("/retreiveuser", retreiveUser);
app.get("/getallusersincludingdeleted", getAllUsersIncludingdDeleted);

// contacts
app.post("/createcontact", createContact);
app.put("/updatecontact", updateContact);
app.delete("/deletecontact", deleteContact);
app.post("/retreivecontact", retreiveContact);
app.post("/getcontacts", getContacts);
app.post("/getallcontactsincludingdeleted", getAllContactsIncludingDeleted);

// contact details
app.post("/createcontactdetail", createContactDetail);
app.put("/updatecontactdetail", updateContactDetail);
app.delete("/deletecontactdetail", deleteContactDetail);
app.post("/retreivecontactdetail", retreiveContactDetail);
app.post("/getcontactdetails", getContactDetails);
app.post(
  "/getcontactdetailsincludingdeleted",
  getContactDetailsIncludingDeleted
);

// authentication
app.post("/login", loginUser);
app.get("/logout", logoutUser);
app.get("/checkoutuser", checkoutUser);

// running server
const port = 9000;
app.listen(port, () => {
  console.log(`Server is running on port 9000`);
});

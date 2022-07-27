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
const { isAuthenticated } = require("./middlewares/auth");

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// routes
app.post("/createuser", isAuthenticated, createUser);
app.put("/updateuser", isAuthenticated, updateUser);
app.delete("/deleteuser", isAuthenticated, deleteUser);
app.post("/getuser", isAuthenticated, getUser);
app.get("/getallusers", isAuthenticated, getAllUsers);
app.post("/retreiveuser", isAuthenticated, retreiveUser);
app.get(
  "/getallusersincludingdeleted",
  isAuthenticated,
  getAllUsersIncludingdDeleted
);

// contacts
app.post("/createcontact", isAuthenticated, createContact);
app.put("/updatecontact", isAuthenticated, updateContact);
app.delete("/deletecontact", isAuthenticated, deleteContact);
app.post("/retreivecontact", isAuthenticated, retreiveContact);
app.post("/getcontacts", isAuthenticated, getContacts);
app.post(
  "/getallcontactsincludingdeleted",
  isAuthenticated,
  getAllContactsIncludingDeleted
);

// contact details
app.post("/createcontactdetail", isAuthenticated, createContactDetail);
app.put("/updatecontactdetail", isAuthenticated, updateContactDetail);
app.delete("/deletecontactdetail", isAuthenticated, deleteContactDetail);
app.post("/retreivecontactdetail", isAuthenticated, retreiveContactDetail);
app.post("/getcontactdetails", isAuthenticated, getContactDetails);
app.post(
  "/getcontactdetailsincludingdeleted",
  isAuthenticated,
  getContactDetailsIncludingDeleted
);

// authentication
app.post("/login", loginUser);
app.get("/logout", isAuthenticated, logoutUser);

// running server
const port = 9000;
app.listen(port, () => {
  console.log(`Server is running on port 9000`);
});

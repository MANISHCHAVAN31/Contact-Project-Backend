const User = require("../views/user");

exports.createUser = async (req, res) => {
  const { firstName, lastName, username, password, role } = req.body;

  if (typeof firstName !== "string") {
    res.status(400).send("Invalid first name");
    return;
  }

  if (typeof lastName !== "string") {
    res.status(400).send("Invalid last name");
    return;
  }

  if (typeof username !== "string") {
    res.status(400).send("Invalid username");
    return;
  }

  if (typeof password !== "string") {
    res.status(400).send("Invalid password");
    return;
  }

  if (typeof role !== "string") {
    res.status(400).send("Invalid role");
    return;
  }

  // check if username already used or not

  let existingUser = await User.getUser(username);

  if (existingUser !== null) {
    res.status(400).send("username is already used");
    return;
  }

  const user = await User.createUser(
    firstName,
    lastName,
    username,
    password,
    role
  );
  res.status(200).send(user);
};

exports.updateUser = async (req, res) => {
  const { userid, parameter, value } = req.body;

  if (typeof userid !== "string") {
    res.status(400).send("User id not found");
    return;
  }

  if (typeof parameter !== "string") {
    res.status(400).send("Parameter not found");
    return;
  }

  if (typeof value !== "string") {
    res.status(400).send("Value to update not found");
    return;
  }

  const user = new User();
  const updatedUser = await user.updateUser(userid, parameter, value);

  res.status(200).send("User updated successfully");
};

exports.deleteUser = async (req, res) => {
  const { username } = req.query;

  if (typeof username !== "string") {
    res.status(400).send("Username not found");
    return;
  }

  const user = new User();
  const isUserDeleted = await user.deleteUser(username);

  if (isUserDeleted === 1) {
    res.status(200).send("user deleted successfully");
  } else {
    res.status(400).send("User deletion failed");
  }
};

exports.getUser = async (req, res) => {
  const { username } = req.body;

  if (typeof username !== "string") {
    res.status(400).send("Invalid username");
    return;
  }

  const user = await User.getUser(username);
  res.status(200).send(user);
};

exports.getAllUsers = async (req, res) => {
  const users = await User.getAllUsers();
  res.status(200).send(users);
};

exports.retreiveUser = async (req, res) => {
  const { username } = req.query;

  if (typeof username !== "string") {
    res.status(400).send("Invalid username");
    return;
  }
  const user = new User();
  const retreivedUser = await user.retreiveUser(username);
  console.log(retreivedUser);
  res.status(200).send("User restored successfully");
};

exports.getAllUsersIncludingdDeleted = async (req, res) => {
  const user = new User();
  const allUsers = await user.getAllUsersIncludingdDeleted();
  res.status(200).send(allUsers);
};

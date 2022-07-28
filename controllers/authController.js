const User = require("../views/user");
const bcrypt = require("bcrypt");
const JwtToken = require("../utils/Jwt");

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (typeof username !== "string") {
    res.status(200).send("Invalid username");
    return;
  }

  if (typeof password !== "string") {
    res.status(400).send("invalid password");
    return;
  }

  const user = await User.getUser(username);

  if (user === null) {
    res.status(404).send("No user found with this username");
    return;
  }

  const isValidPassword = await bcrypt.compare(
    password,
    user.credential.password
  );

  if (!isValidPassword) {
    res.status(400).send("Invalid Password");
    return;
  }

  const token = new JwtToken(user.id, user.credential.username, user.role);
  let loginToken = token.createToken();

  res.cookie("token", loginToken);
  res.status(200).send(user);
};

exports.logoutUser = async (req, res) => {
  res.clearCookie("token");
  res.status(200).send("User logged out successfully");
};

const JwtToken = require("../utils/Jwt");

exports.isAuthenticated = async (req, res, next) => {
  // const { currentUser } = req.body;
  const data = JwtToken.validateToken(req, "token");
  if (data.isValid) {
    next();
  } else {
    res.status(400).send("Login first to proceed");
    return;
  }
};

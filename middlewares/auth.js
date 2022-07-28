const MyDatabase = require("../repository/database");
const JwtToken = require("../utils/Jwt");

exports.checkoutUser = async (req, res, next) => {
  const { username } = req.query;

  if (typeof username !== "string") {
    res.status(400).send("Invlid username");
    return;
  }
  const db = new MyDatabase();
  const userData = await db.getUser(username);

  const cookieData = JwtToken.validateToken(req, "token");

  if (!cookieData) {
    res.status(400).send("Cookie not found");
    return;
  }

  if (cookieData) {
    if (cookieData.username !== username) {
      res.status(400).send("User is not valid");
      return;
    } else if (userData !== null && cookieData.role !== userData.role) {
      res.status(400).send("User is restricted to access this information");
      return;
    }
  }
};

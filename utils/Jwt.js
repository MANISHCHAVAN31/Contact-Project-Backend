const jwt = require("jsonwebtoken");
const secretKey = "ContactProjectSecretKey";

class JwtToken {
  constructor(userId, username) {
    this.userid = userId;
    this.username = username;
    this.isValid = true;
  }

  createToken() {
    return jwt.sign(JSON.stringify(this), secretKey);
  }

  static validateToken(req, cookieIdentifier) {
    let allCookies = req.cookies;
    if (!allCookies[cookieIdentifier]) {
      return false;
    }

    return jwt.verify(allCookies[cookieIdentifier], secretKey);
  }
}

module.exports = JwtToken;

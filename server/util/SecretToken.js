require("dotenv").config();
const jwt = require("jsonwebtoken");
const tokenkey=

module.exports.createSecretToken = (id) => {
    const token = jwt.sign({ id }, process.env.TOKEN_KEY, {
      expiresIn: 3 * 24 * 60 * 60,
    });
  return token;
};

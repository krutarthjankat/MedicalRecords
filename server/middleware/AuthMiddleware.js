const Profile = require("../models/profile.js");
require("dotenv").config();
const jwt = require("jsonwebtoken");


module.exports.userVerification = (req, res) => {
  const {token} = req.body;
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await Profile.findById(data.id);
      if (user) return res.json({ status: true, user: `${user.firstname} ${user.lastname}`});
      else return res.json({ status: false });
    }
  });
};

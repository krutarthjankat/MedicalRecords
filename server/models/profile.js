const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  username: String,
  mobno: String,
  emailid: String,
  password: String,
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;

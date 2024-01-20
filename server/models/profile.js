const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const profileSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  username: String,
  mobno: String,
  emailid: String,
  password: String,
});

profileSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});
const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;

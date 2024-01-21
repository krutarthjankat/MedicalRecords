const Profile = require("../models/profile.js");
const { createSecretToken } = require("../util/SecretToken.js");
const bcrypt = require("bcryptjs");

const fetchProfiles = async (req, res) => {
  // Find the profiles
  const profiles = await Profile.find();

  // Respond with them
  res.json({ profiles });
};

const createProfile = async (req, res, next) => {
  try {
    const { firstname, lastname, username, mobno, emailid, password } =
      req.body;
    const existingUser = await Profile.findOne({ emailid });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await Profile.create({
      firstname,
      lastname,
      username,
      mobno,
      emailid,
      password,
    });
    console.log(user._id);
    const token = createSecretToken(JSON.stringify(user._id));
    console.log(token);
    res.cookie("token", token, {
      domain: "krutarthjankat.github.io",
      path: "/MedicalRecords",
      secure: true,
      sameSite: "none",
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({
      message: "User signed up successfully",
      success: true,
      user: user,
    });
    next();
  } catch (error) {
    console.error(error);
  }
};

const updateProfile = async (req, res) => {
  // Get the id off the url
  const profileId = req.params.id;

  // Get the data off the req body
  const { firstname, lastname, username, mobno, emailid, password } = req.body;

  // Find and update the record
  await Profile.findByIdAndUpdate(profileId, {
    firstname,
    lastname,
    username,
    mobno,
    emailid,
    password,
  });

  // Find updated profile
  const profile = await Profile.findById(profileId);

  // Respond with it
  res.json({ profile });
};

const deleteProfile = async (req, res) => {
  // get id off url
  const profileId = req.params.id;

  // Delete the record
  await Profile.deleteOne({ id: profileId });

  // Respond
  res.json({ success: "Record deleted" });
};

const checkProfile = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await Profile.findOne({ username });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id);
    console.log(token);
    res.cookie("token", token, {
      domain: "krutarthjankat.github.io",
      path: "/MedicalRecords",
      secure: true,
      sameSite: "none",
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({
      message: "User logged in successfully",
      success: true,
      id: user._id,
    });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  fetchProfiles,
  createProfile,
  updateProfile,
  deleteProfile,
  checkProfile,
};

const Profile = require("../models/profile.js");

const fetchProfiles = async (req, res) => {
  // Find the profiles
  const profiles = await Profile.find();

  // Respond with them
  res.json({ profiles });
};

const fetchProfile = async (req, res) => {
  // Get id off the url
  const profileId = req.params.id;

  // Find the profile using that id
  const profile = await Profile.findById(profileId);

  // Respond with the profile
  res.json({ profile });
};

const createProfile = async (req, res) => {
  // Get the sent in data off request body
  const { firstname, lastname, username, mobno, emailid, password } = req.body;

  // Create a profile with it
  const profile = await Profile.create({
    firstname,
    lastname,
    username,
    mobno,
    emailid,
    password,
  });

  // respond with the new profile
  res.json({ profile });
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

module.exports = {
  fetchProfiles,
  fetchProfile,
  createProfile,
  updateProfile,
  deleteProfile,
};

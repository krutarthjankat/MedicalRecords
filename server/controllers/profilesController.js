const Patient = require("../models/patient.js");
const Profile = require("../models/profile.js");
const Vital = require("../models/vital.js");
const { createSecretToken } = require("../util/SecretToken.js");
const bcrypt = require("bcryptjs");

const fetchData = async (req, res) => {
  const vital = await Vital.find();
  return res.json({ vital });
};

const fetchProfile = async (req, res, next) => {
  try {
    const {patientid}=req.body;
    const vital = await Vital.findOne({ patientid });
    const user = await Patient.findOne({ patientid });
    res.json({
      user,
      vital,
    });
    next();
  } catch (error) {
    console.error(error);
  }
};

const createProfile = async (req, res, next) => {
  try {
    const {
      firstname,
      lastname,
      username,
      mobno,
      emailid,
      password,
      category,
      passkey,
    } = req.body;
    const existingUser = await Profile.findOne({ emailid });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    if (
      (category === "doctor" && passkey === "abcd") ||
      (category === "nurse" && passkey === "efgh")
    ) {
      const user = await Profile.create({
        firstname,
        lastname,
        username,
        mobno,
        emailid,
        password,
        category,
      });

      const token = createSecretToken(JSON.stringify(user._id));
      // console.log(token);
      // res.cookie("token", token, {
      //   domain: "krutarthjankat.github.io",
      //   path: "/MedicalRecords",
      //   secure: true,
      //   sameSite: "none",
      //   withCredentials: true,
      //   httpOnly: false,
      // });
      res.status(201).json({
        message: "User signed up successfully",
        success: true,
        user: user,
        token: token,
      });
    } else {
      res.status(201).json({
        message: "Invalid Passkey",
        success: false,
      });
    }
    next();
  } catch (error) {
    console.error(error);
  }
};

const createPatientProfile = async (req, res, next) => {
  try {
    const {
      patientid,
      patientname,
      dateofadm,
      age,
      relmobno,
      sex,
      address,
      room,
      occupation,
      isolation,
      precautions,
      allergies,
      admdiagnosis,
      docuavail,
      history,
    } = req.body;
    const existingUser = await Patient.findOne({ patientid });
    if (existingUser) {
      return res.json({ message: "Patient already exists" });
    }
    await Patient.create({
      patientid,
      patientname,
      dateofadm,
      age,
      relmobno,
      sex,
      address,
      room,
      occupation,
      isolation,
      precautions,
      allergies,
      admdiagnosis,
      docuavail,
      history,
    });

    res.status(201).json({
      message: "Patient created successfully",
      success: true,
    });
    next();
  } catch (error) {
    console.error(error);
  }
};

const addPatientVital = async (req, res, next) => {
  try {
    const {
      patientid,
      patientname,
      drincharge,
      nurseupdate,
      update,
      temp,
      heartrate,
      resprate,
      oxysat,
      sysbp,
      dibp,
    } = req.body;
    const existingUser = await Vital.findOne({ patientid });
    if (existingUser) {
      existingUser.update.push(update);
      existingUser.nurseupdate.push(nurseupdate);
      existingUser.temp.push(temp);
      existingUser.heartrate.push(heartrate);
      existingUser.resprate.push(resprate);
      existingUser.oxysat.push(oxysat);
      existingUser.sysbp.push(sysbp);
      existingUser.dibp.push(dibp);
      await existingUser.save();
      return res.json({ message: "Added vitals to existing user" });
    }
    await Vital.create({
      patientid,
      patientname,
      drincharge,
      nurseupdate,
      update,
      temp,
      heartrate,
      resprate,
      oxysat,
      sysbp,
      dibp,
    });

    res.status(201).json({
      message: "Vitals added successfully",
      success: true,
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
    res.status(201).json({
      message: "User logged in successfully",
      success: true,
      id: user._id,
      token: token,
    });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  addPatientVital,
  createPatientProfile,
  fetchData,
  fetchProfile,
  createProfile,
  updateProfile,
  deleteProfile,
  checkProfile,
};

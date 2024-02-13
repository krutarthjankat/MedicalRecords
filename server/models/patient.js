const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const patientSchema = new mongoose.Schema({
  patientid: Number,
  dateofadm: Date,
  patientname: String,
  age: Number,
  sex: String,
  address: String,
  relmobno: Number,
  room: String,
  occupation: String,
  drincharge: String,
  isolation: String,
  precautions: String,
  allergies: String,
  admdiagnosis: String,
  history: [String],
  docuavail: String,
});

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const vitalSchema = new mongoose.Schema({
  patientid: Number,
  patientname: String,
  drincharge: String,
  nurseupdate: [String],
  update: [Date],
  temp: [Number],
  heartrate: [Number],
  resprate: [Number],
  oxysat: [Number],
  sysbp: [Number],
  dibp: [Number],
});

const Vital = mongoose.model("Vital", vitalSchema);

module.exports = Vital;

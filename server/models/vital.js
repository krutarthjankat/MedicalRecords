const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const vitalSchema = new mongoose.Schema({
  patientid: Number,
  patientname: String,
  drincharge: String,
  nurseincharge: String,
  update: [Date],
  temp: [Number],
  heartrate: [Number],
  resprate: [Number],
  oxysat: [Number],
  sysbp: [Number],
  dibp: [Number],
});

// vitalSchema.pre("save", async function () {
//   this.password = await bcrypt.hash(this.password, 12);
// });

const Vital = mongoose.model("Vital", vitalSchema);

module.exports = Vital;

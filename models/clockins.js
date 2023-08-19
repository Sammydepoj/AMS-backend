const mongoose = require("mongoose");

const clock = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 3,
    required: "First name is required",
  },
  lastName: {
    type: String,
    minlength: 3,
    required: "Last name is required",
  },
  email: {
    type: String,
    unique: true,
    required: "Email is required",
  },
  date: {
    type: String,
    default: new Date().toJSON(),
  },
  clockInStatus: {
    type: Boolean,
    default: false,
  },
  clockOutStatus: {
    type: String,
    default: new Date().toJSON(),
  },
});

const clockIns = mongoose.model("clockIns", clock);
module.exports = clockIns;

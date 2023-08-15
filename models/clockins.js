const { boolean } = require("joi");
const mongoose = require("mongoose");

const clockInSchema = new mongoose.Schema({
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
  clockInDate: {
    type: String,
    default: new Date().toJSON(),
  },
  clockInStatus: {
    type: boolean,
    default: false,
  },
});

const clockIns = mongoose.model("clockIns", clockInSchema);
module.exports = clockIns;

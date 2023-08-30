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
    // unique: true,
    // required: "Email is required",
  },
  clockInDate: {
    type: String,
    default: new Date().toJSON(),
  },
  clockOutDate: {
    type: String,
  },
  clockInStatus: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: String,
    required: "UserId is required",
  },
});

const ClockInHistory = mongoose.model("clockInHistory", clockInSchema);

module.exports = ClockInHistory;

const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
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
  password: {
    type: String,
  },
  programme: {
    type: String,
    required: "Please fill this in",
  },
  programmeId: {
    type: Number,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: String,
    default: new Date().toJSON(),
  },
  dateUpdated: {
    type: String,
  },
});

const Signup = mongoose.model("signup", signupSchema);

module.exports = Signup
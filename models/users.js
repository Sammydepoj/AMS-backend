const mongoose = require("mongoose");
const { RoleType, ApprovalStatus } = require("../utils/constant");
const usersSchema = new mongoose.Schema({
  profileImage: {
    type: String,
  },
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
  phoneNumber: {
    type: String,
    required: "Phone number is required",
  },
  sex: {
    type: String,
    required: "Sex is required",
  },
  dob: {
    type: String,
    required: "Date of birth is required",
  },
  lga: {
    type: String,
    required: "lga is required",
  },
  homeAddress: {
    type: String,
    minlength: 3,
    required: "Home Address is required",
  },
  programme: {
    type: String,
    required: "Please fill this in",
  },
  programmeId: {
    type: Number,
  },
  occupation: {
    type: String,
    required: "Please fill this in",
  },
  education: {
    type: String,
    required: "Please fill this in",
  },
  classOfDegree: {
    type: String,
    required: "Please fill this in",
  },
  instituitionAttended: {
    type: String,
    required: "Please fill this in",
  },
  yearOfGraduation: {
    type: String,
    required: "Please fill this in",
  },
  computerSkill: {
    type: String,
    required: "Please fill this in",
  },
  softwareUsed: {
    type: String,
    required: "Please fill this in",
  },
  softwareTraining: {
    type: Boolean,
    required: "Please fill this in",
  },
  applicationYouWillBuild: {
    type: String,
    required: "Please fill this in",
  },
  techStack: {
    type: String,
    required: "Please fill this in",
  },
  preferredJob: {
    type: String,
    required: "Please fill this in",
  },
  workSector: {
    type: String,
    required: "Please fill this in",
  },
  reasonForScholarship: {
    type: String,
    required: "Please fill this in",
  },
  commitment: {
    type: Boolean,
    required: "Please fill this in",
  },
  role: {
    type: String,
    required: "Role name is required",
    enum: [RoleType.USER, RoleType.ADMIN],
    default: RoleType.USER,
  },
  otp: {
    type: Number,
    minlength: 4,
  },
  startDate: {
    type: String,
    minlength: 3,
  },
  endDate: {
    type: String,
    minlength: 3,
  },
  approvalStatus: {
    type: String,
    enum: [
      ApprovalStatus.PENDING,
      ApprovalStatus.APPROVED,
      ApprovalStatus.DISAPPROVED,
    ],
    default: ApprovalStatus.PENDING,
  },
  approvedBy: {
    type: String,
  },
  approvedDate: {
    type: String,
  },
  isDeactivated: {
    type: Boolean,
    default: false,
  },
  isReactivated: {
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
});
const Users = mongoose.model("users", usersSchema);
module.exports = Users;

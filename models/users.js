const mongoose = require("mongoose")


const usersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: 3,
        required: "First name is required"
    },
    lastName: {
        type: String,
        minlength: 3,
        required: "Last name is required"
    },
    email: {
        type: String,
        unique: true,
        required : "Email is required"
    },
    password: {
        type: String,
    },
    phoneNumber: {
        type: String,
        required: "Phone number is required"
    },
    sex:{
        type: String,
        required: "Phone number is required"
    },
    dob:{
        type: String,
        required: "Date of birth is required"
    },
    lga: {  
        type: String,
        required: "lga is required"
    },
    homeAddress: {
        type: String,
        minlength: 3,
        required: "Home Address is required"
    },
    programme: {
        type: String,
        required: "Please fill this in"
    },
    occupation:{
        type: String,
        required: "Please fill this in"
    },
    education:{
        type: String,
        required: "Please fill this in"
    },
    classOfDegree:{
        type: String,
        required: "Please fill this in"
    },
    institutionAttended:{
        type: String,
        required: "Please fill this in"
    },
    yearOfGraduation:{
        type: String,
        required: "Please fill this in"
    },
    computerSkill:{
        type: String,
        required: "Please fill this in"
    },
    softwareUsed:{
        type: String,
        required: "Please fill this in"
    },
    softwareTraining:{
        type: Boolean,
        required: "Please fill this in"
    },
    applicationYouWillBuild:{
        type: String,
        required: "Please fill this in"
    },
    techStack:{
        type: String,
        required: "Please fill this in"
    },
   preferredJob:{
        type: String,
        required: "Please fill this in"
    },
   workSector:{
        type: String,
        required: "Please fill this in"
    },
   reasonForScholarship:{
        type: String,
        required: "Please fill this in"
    },
  commitment:{
        type: Boolean,
        required: "Please fill this in"
    },
    role: {
        type: String,
        required: "Role name is required",
        enum: ['USER', 'ADMIN'],
        default: "USER"
    },
    startDate: {
        type: String,
        minlength: 3,
    },
    endDate: {
        type: String,
        minlength: 3,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isDeactivated: {
        type: Boolean,
        default: false
    },
    isReactivated: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: String,
        default: new Date().toJSON()
    },
    dateUpdated: {
        type: String,
    },
});


const Users = mongoose.model("users", usersSchema )


module.exports = Users
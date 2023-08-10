const express = require("express");
const getAllParticipants = require("../controllers/user.controller");
const auth = require("../middleware/auth");

const userRouter = express.Router();

//return auth middleware

userRouter.get("/getAllParticipants", getAllParticipants);

module.exports = userRouter

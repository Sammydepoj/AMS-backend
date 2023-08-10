const express = require("express");
const getAllParticipants =  require("../cotrollers/getAllParticipants.controller")

const userRouter = express.Router();

userRouter.post("/getAllParticipants", getAllParticipants);

module.exports = userRouter

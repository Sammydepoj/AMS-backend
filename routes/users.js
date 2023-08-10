const express = require("express");
const getAllParticipants = require("../controllers/user.controller");
const auth = require("../middleware/auth");

const userRouter = express.Router();

userRouter.post("/getAllParticipants", auth, getAllParticipants);

module.exports = userRouter

const express = require("express");
const { signin } = require("../controllers/signin.controllers");
const signUp = require("../controllers/signupController");
const auth = require("../middleware/auth");
const ClockController = require("../controllers/clocks.controller");
const { UsersController } = require("../controllers/user.controller");

const Router = express.Router();

Router.post("/signin", signin);
Router.post("/signup", signUp);
Router.post("/clockin", auth, ClockController.clockIn);
Router.post("/clockout", auth, ClockController.clockOut);
Router.get("/getAllClockIn", auth, ClockController.clockInHistory);
Router.get("/getAllParticipants", auth, UsersController.getAllParticipants);
Router.get("/getUserInfo", auth, UsersController.getUserInfo);

module.exports = Router;

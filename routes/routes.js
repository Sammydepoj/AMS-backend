const express = require("express");
const { signin } = require("../controllers/signin.controllers");
const signUp = require("../controllers/signupController");
const auth = require("../middleware/auth");
const ClockController = require("../controllers/clocks.controller");

const Router = express.Router();

Router.post("/signin", signin);
Router.post("/signup", signUp);
Router.post("/clockin", auth, ClockController.clockIn);
Router.post("/clockout", auth, ClockController.clockOut);
Router.get("/getAllClockIn", auth, ClockController.clockInHistory);

module.exports = Router;

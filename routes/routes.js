const express = require("express");
const { signin } = require("../controllers/signin.controllers");
const signUp = require("../controllers/signupController");
const clockIn = require("../controllers/clockinController");
const auth = require("../middleware/auth");
const clockOutHandler = require("../controllers/clockOut.controller");

const Router = express.Router();

Router.post("/signin", signin);
Router.post("/signup", signUp);
Router.post("/clockin", auth, clockIn);
Router.post("/clockout", auth, clockOutHandler);

module.exports = Router;

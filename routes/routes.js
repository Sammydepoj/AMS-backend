const express = require("express");
const { signin } = require("../controllers/signin.controllers");
const signUp = require("../controllers/signupController");
const clockIn = require("../controllers/clockinController");

const Router = express.Router();

Router.post("/signin", signin);
Router.post("/signup", signUp);
Router.post("/clockin", clockIn);

module.exports = Router;
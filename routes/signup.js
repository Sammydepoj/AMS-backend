const express = require("express");
const signUp = require("../controllers/signupController");


const signupRouter = express.Router();

signupRouter.post("/signup", signUp);

module.exports = signupRouter

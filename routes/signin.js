const express = require("express");
const { signin } = require("../controllers/signin.controllers");

const signinRouter = express.Router();

signinRouter.post("/signin", signin);

module.exports = signinRouter;

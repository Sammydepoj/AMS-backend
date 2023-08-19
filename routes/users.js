const express = require("express");
const auth = require("../middleware/auth");
const { UsersController } = require("../controllers/user.controller");

const userRouter = express.Router();

//return auth middleware

userRouter.get("/getAllParticipants", auth, UsersController.getAllParticipants);
userRouter.get("/getUserInfo", auth, UsersController.getUserInfo);

module.exports = userRouter;

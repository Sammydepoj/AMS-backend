const Users = require("../models/users");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { createToken } = require("../utils/createToken");

const signin = async (req, response) => {
  const schema = Joi.object({
    email: Joi.string().min(1).required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);

  if (error)
    return response.status(400).send({
      responseCode: "95",
      responseMessage: error.details[0]?.message,
      data: null,
    });
  try {
    let user = await Users.findOne({ email: req.body?.email });
    // console.log(req?.body);
    if (!user)
      return response.status(400).send({
        responseCode: "94",
        responseMessage: "Invalid email or password",
        data: null,
      });
    const validatePassword = await bcrypt.compare(
      req.body?.password,
      user.password
    );
    if (!validatePassword)
      return response.status(400).send({
        responseCode: "93",
        responseMessage: "Invalid email or password",
        data: null,
      });
    if (!user.isVerified)
      return response.send({
        responseCode: "00",
        responseMessage: "Kindly verify your account to proceed",
        data: {
          _id: user._id,
          email: user.email,
          username: user.username,
          isVerified: user.isVerified,
          dateCreated: user.dateCreated,
        },
      });
    const token = createToken(user);
    response.status(200).send({
      responseCode: "00",
      responseMessage: "Login successful",
      data: {
        _id: user._id,
        email: user.email,
        username: user.username,
        isVerified: user.isVerified,
        dateCreated: user.dateCreated,
        token,
      },
    });
  } catch (error) {
    response.status(500).send({
      responseCode: "95",
      responseMessage: "Internal server error",
      data: null,
    });
  }
};

exports.signin = signin;
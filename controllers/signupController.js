const Joi = require("joi");
const Signup = require("../models/signupSchema");
const ResponseCode = require("../responseCode");
const bcrypt = require("bcrypt");

const signUp = async (request, response) => {
  const schema = Joi.object({
    firstName: Joi.string().min(1).required(),
    lastName: Joi.string().min(1).required(),
    email: Joi.string().min(1).required(),
    password: Joi.string().required(),
    programme: Joi.string().required(),
  });
  const { error } = schema.validate(request.body);

  if (error) {
    return response.status(400).send({
      responseCode: "95",
      responseMessage: error.details[0]?.message,
      data: null,
    });
  }
  try {
    // checking to see if user with email exists in the DB
    let user = await Signup.findOne({
      email: request.body?.email,
    });

    // if user exist with the same email, send an error back to the client

    if (user)
      return response.status(400).send({
        responseCode: ResponseCode.DATA_DUPLICATION,
        responseMessage: request.body.email + " already exist",
        data: null,
      });
    const salt = await bcrypt.genSalt(10);
    const { firstName, lastName, email, password, programme } = request.body;
    user = new Signup({
      firstName,
      lastName,
      email,
      password: await bcrypt.hash(password, salt),
      programme,
    });
    // password hashing using bcrypt
    //
    // user.password = await bcrypt.hash(user.password, salt);

    // saving user to the DB if no errors and all conditions are met
    await user.save();
    response.status(201).send({
      responseCode: ResponseCode.SUCCESSFUL,
      responseMessage: "Registration successful",
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        programme: user.programme,
        isVerified: user.isVerified,
        dateCreated: user.dateCreated,
      },
    });
  } catch (error) {
    response.status(500).send({
      responseCode: ResponseCode.INTERNAL_SERVER_ERROR,
      responseMessage: "Internal server error",
      data: null,
    });
    console.log(error.message);
  }
};

module.exports = signUp;

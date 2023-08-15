const Joi = require("joi");
const User = require("../models/users");
const clockIn = async (request, response) => {
  const lattitude = process.env.SAIL_LATTITUDE2;
  const longitude = process.env.SAIL_LONGITUDE2;
  const location = `${lattitude}, ${longitude}`;
  const schema = Joi.object({
    location: Joi.string().required(),
  });
  const date = new Date().getHours();
  console.log(lattitude, longitude);
  const { error } = schema.validate(request.body);
  console.log("request", request.body.location);

  if (error)
    return response.status(400).send({
      responseCode: "95",
      responseMessage: error.details[0]?.message,
      data: null,
    });
  try {
    const user = await User.findOne({ _id: request.user._id });
    if (!user) {
      return response.status(400).send({
        responseCode: "93",
        responseMessage: "User Not Found",
        data: null,
      });
    } else {
      if (request.body.location !== location)
        return response.status(400).send({
          responseCode: "93",
          responseMessage: "Unable to clock in: Invalid location",
          data: null,
        });
      else {
        if (user.clockInStatus) {
          return response.status(403).send({
            responseCode: "95",
            responseMessage: "User Already Clocked In",
            data: null,
          });
        } else {
          user.clockInStatus = true;
          user.clockInDate = new Date().toString();
          await user.save();
          return response.status(200).send({
            responseCode: "00",
            responseMessage: "Succesfully clocked in",
            data: null,
          });
        }
      }
    }
  } catch (error) {
    response.status(500).send({
      responseCode: "96",
      responseMessage: "Internal server error",
      data: null,
    });
    console.log(error.message);
  }
};

module.exports = clockIn;

const Joi = require("joi");

const clockIn = async (request, response) => {
  const lattitude = process.env.SAIL_LATTITUDE2;
  const longitude = process.env.SAIL_LONGITUDE2;
  const location = `${lattitude}, ${longitude}`;
  const schema = Joi.object({
    location: Joi.string().required(),
  });
  console.log(lattitude, longitude);
  const { error } = schema.validate(request.body);
  console.log("request", request.body.location);

  if (error)
    return response.status(400).send({
      responseCode: "95",
      responseMessage: error.details[0]?.message,
      data: null,
    });
  if (request.body.location === location)
    return response.status(200).send({
      responseCode: "00",
      responseMessage: "Succesfully clocked in",
      data: null,
    });
  if (request.body.location !== location)
    return response.status(400).send({
      responseCode: "93",
      responseMessage: "Unable to clock in: Invalid location",
      data: null,
    });
};

module.exports = clockIn;

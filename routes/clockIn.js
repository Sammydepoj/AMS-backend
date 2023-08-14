const express = require("express");
const Joi = require("joi");

const clockInRouter = express.Router();

clockInRouter.post("/clockin", (request, response) => {

    const lattitude = "12.1234";
    const longitude = "12.5678"
    const location = `${lattitude}, ${longitude}`;
  const schema = Joi.object({
    location: Joi.string().required(),
  });

  const { error } = schema.validate(request.body);

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
    if(request.body.location !== location)
    return response.status(400).send({
      responseCode: "93",
      responseMessage: "Unable to clock in: Invalid location",
      data: null,
    });
});

module.exports = clockInRouter;

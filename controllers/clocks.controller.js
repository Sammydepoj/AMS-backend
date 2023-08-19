const Joi = require("joi");
const User = require("../models/users");
const ClockInHistory = require("../models/clockInHistory");

module.exports = class ClockController {
  static async clockIn(request, response) {
    const lattitude = process.env.SAIL_LATTITUDE2;
    const longitude = process.env.SAIL_LONGITUDE2;
    const location = `${lattitude}, ${longitude}`;
    const date = new Date().getHours();
    // using joi to check if location was passed when clocking in
    const schema = Joi.object({
      location: Joi.string().required(),
    });

    //   destructure the error object to display specific message if location was not passed
    const { error } = schema.validate(request.body);

    if (error)
      return response.status(400).send({
        responseCode: "95",
        responseMessage: error.details[0]?.message?.replaceAll('"', ""),
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
      }

      if (request.body.location !== location)
        return response.status(400).send({
          responseCode: "93",
          responseMessage: "Unable to clock in: Invalid location",
          data: null,
        });
      if (date > 14) {
        return response.status(403).send({
          responseCode: "93",
          responseMessage: "You can clock in between 8am and 2pm",
          data: null,
        });
      }
      if (user.clockInStatus) {
        return response.status(403).send({
          responseCode: "95",
          responseMessage: "User Already Clocked In",
          data: {
            clockInStatus: user.clockInStatus,
          },
        });
      }

      user.clockInStatus = true;
      user.clockOutDate = null;
      user.clockInDate = new Date().toString();
      await user.save();

      response.status(200).send({
        responseCode: "00",
        responseMessage: "Succesfully clocked in",
        data: {
          clockInStatus: user.clockInStatus,
          clockInDate: user.clockInDate,
        },
      });
      //   const clockHistory = new ClockInHistory({
      //     user,
      //   });
      //   await clockHistory.save();
      //   console.log(clockHistory)
    } catch (error) {
      response.status(500).send({
        responseCode: "96",
        responseMessage: "Internal server error",
        data: null,
      });
      console.log(error.message);
    }
  }

  static async clockInHistory(_req, res) {
    try {
      const users = await User.find({ clockInStatus: true });
      res.status(200).send({
        responseCode: "00",
        responseMessage: "Successful",
        data: users,
      });
    } catch (error) {
      response.status(500).send({
        responseCode: "96",
        responseMessage: "Internal server error",
        data: null,
      });
      console.log(error.message);
    }
  }

  static async clockOut(request, response) {
    const date = new Date().getHours();
    try {
      const user = await User.findOne({ _id: request.user._id });
      if (!user) {
        return response.status(400).send({
          responseCode: "93",
          responseMessage: "User not found",
          data: null,
        });
      }
      if (!user.clockInStatus) {
        return response.status(403).send({
          responseCode: "93",
          responseMessage: "You are clocked out already",
          data: null,
        });
      }
      if (date < 14) {
        return response.status(403).send({
          responseCode: "93",
          responseMessage: "Clock out time is 2pm",
          data: {
            clockInStatus: user.clockInStatus,
            clockOut: user.clockInDate,
          },
        });
      }
      user.clockInStatus = false;
      user.clockOutDate = new Date().toString();
      await user.save();
      response.status(200).send({
        responseCode: "00",
        responseMessage: "Clock out Successful",
        data: {
          clockInStatus: user.clockInStatus,
          clockOut: user.clockOutDate,
        },
      });
    } catch (error) {
      response.status(500).send({
        responseCode: "96",
        responseMessage: "Internal server error",
        data: null,
      });
      console.log(error.message);
    }
  }
};

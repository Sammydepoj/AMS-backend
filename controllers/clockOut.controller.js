const User = require("../models/users");
const clockOutHandler = async (request, response) => {
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
    console.log(user.clockInStatus);
    if (!user.clockInStatus) {
      return response.status(403).send({
        responseCode: "93",
        responseMessage: "You need to be clocked in before clocking out",
        data: null,
      });
    }
    if (date < 14) {
      return response.status(403).send({
        responseCode: "93",
        responseMessage: "Clock time is 2pm",
        data: null,
      });
    }
    user.clockInStatus = false;
    user.clockOutDate = new Date().toString();
    await user.save();
    response.status(200).send({
      responseCode: "00",
      responseMessage: "Clock out Successful",
      data: null,
    });
  } catch (error) {
    response.status(500).send({
      responseCode: "96",
      responseMessage: "Internal server error",
      data: null,
    });
    console.log(error.message);
  }
};
module.exports = clockOutHandler;

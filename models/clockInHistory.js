const mongoose = require("mongoose");
const Users = require("./users");

const clockInSchema = new mongoose.Schema({
  ...Users.schema.obj,
});

const ClockInHistory = Users.discriminator("clockInHistory", clockInSchema);

module.exports = ClockInHistory
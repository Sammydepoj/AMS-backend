const jwt = require("jsonwebtoken");

const createToken = (user) => {
  return jwt.sign(
    { _id: user._id },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );
};

exports.createToken = createToken;

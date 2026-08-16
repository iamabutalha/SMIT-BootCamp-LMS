const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpiresIn } = require("../config/env");

function generateToken(admin) {
  return jwt.sign(
    {
      id: admin._id.toString(),
      role: "admin"
    },
    jwtSecret,
    { expiresIn: jwtExpiresIn }
  );
}

module.exports = generateToken;

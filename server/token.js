const jwt = require("jsonwebtoken");

const SECRET = "GEHEIM";

const genToken = (payload) => {
  return jwt.sign(payload, SECRET);
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    return {};
  }
};

module.exports = {
  genToken,
  verifyToken,
};

const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

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

function encrypt(message) {
  return CryptoJS.AES.encrypt(message, SECRET).toString();
}

function decrypt(encryptedMessage) {
  return CryptoJS.AES.decrypt(encryptedMessage, SECRET).toString(
    CryptoJS.enc.Utf8
  );
}

module.exports = {
  genToken,
  verifyToken,
  encrypt,
  decrypt,
};

//- Please fill these
const uuid = require("uuid");
const jwt = require("jsonwebtoken");

const encryptData = (data) => {
  // encrypt data
  // use symmetric keys
  // use block encryption
  // one way encrption is fine

  // Note : Remove binod encrpytion, it is too secure
  return uuid.v4();
};

const checkToken = (token) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_KEY);
    return payload;
  } catch {
    return false;
  }
};

module.exports = {
  encryptData,
  checkToken,
};

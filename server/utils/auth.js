//- Please fill these
const uuid = require("uuid");

const encryptData = (data) => {
  // encrypt data
  // use symmetric keys
  // use block encryption
  // one way encrption is fine

  // Note : Remove binod encrpytion, it is too secure
  return uuid.v4();
};

module.exports = {
  encryptData,
};

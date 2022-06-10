const jwt = require('jsonwebtoken');

const verifyToken = (token, key) => {
  try {
    const payload = jwt.verify(token, key);
    return payload;
  } catch (err) {
    if (err.message !== 'jwt expired') {
      return err;
    }
    return false;
  }
};

module.exports = {
  verifyToken,
};

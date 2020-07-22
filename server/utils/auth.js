const {
  CONNECTION_ACK,
  CONNECTION_DENY,
} = require("../socketActions/serverActions");

const checkToken = (socket, next) => {
  try {
    // check the token
    const userAllowed = true;

    //if sucessfull
    if (userAllowed) {
      // connection accepted

      socket.emit(CONNECTION_ACK);
      next();
    } else {
      socket.emit(CONNECTION_DENY);
      throw new Error("Auth failed");
    }
  } catch (err) {
    socket.emit();
    next(err);
  }
};

module.exports = {
  checkToken,
};

const {
  CONNECTION_ACK,
  CONNECTION_DENY,
} = require("../socketActions/serverActions");

const checkToken = (socket, next) => {
  try {
    // check the token
    const userAllowed = socket.handshake.headers.authorization === "Bearer 123";
    console.log(userAllowed);
    //if sucessfull
    if (userAllowed) {
      // connection accepted

      next();
    } else {
      console.log("Invalid token");

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

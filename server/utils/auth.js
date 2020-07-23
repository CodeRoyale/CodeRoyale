const {
  CONNECTION_ACK,
  CONNECTION_DENY,
} = require("../socketActions/serverActions");

const { userConnnected } = require("../controllers/userController");

const checkToken = (token) => {
  if (token[0] !== "z") {
    return {
      userName: token,
    };
  } else {
    false;
  }
};

const authUser = (socket, next) => {
  try {
    // check the token
    // token format "Bearer Token"
    const token = socket.handshake.headers.authorization.split(" ")[1];
    const payload = checkToken(token);
    //if sucessfull
    if (payload) {
      // connection accepted
      // now check if user is already connected or not
      if (!addUser(payload.userName)) {
        socket.emit(CONNECTION_ACK);
        next();
      } else {
        throw new Error("Auth failed");
      }
    } else {
      console.log("Invalid token");
      socket.emit(CONNECTION_DENY);
      throw new Error("Auth failed");
    }
  } catch (err) {
    socket.emit();
    next(err);
  }
};

module.exports = {
  authUser,
};

const jwt = require('jsonwebtoken');
const RESPONSE = require('../utils/constantResponse');
const { verifyToken } = require('../utils/auth');

// secret keys and secret times
/* eslint-disable */
const [ACCESS_SECRECT_KEY, LOBBY_SECRET] = [
  process.env.ACCESS_SECRECT_KEY || secrets.ACCESS_SECRECT_KEY,
  process.env.LOBBY_SECRET_KEY || secrets.LOBBY_SECRET_KEY,
];

// check if the user has logged in before using the services
module.exports = async (req, res, next) => {
  try {
    // bearer token
    let token = req.headers.authorization.split(' ')[1];
    let payload = false;
    if (req.headers.lobbyid === 'lobbyOP') {
      if (token === LOBBY_SECRET) {
        payload = true;
      }
    } else {
      // decode the token to get the data
      const decoded = jwt.decode(token, { complete: true });
      // data is stored is in playload
      const userName = decoded.payload.userName;

      // verify accessToken  with server
      try {
        payload = verifyToken(token, ACCESS_SECRECT_KEY + userName);
      } catch (err) {
        if (err.message !== 'jwt expired') {
          res.clearCookie('_coderoyale_rtk');
          res.clearCookie('_coderoyale_un');
          res.status(401).json({
            status: false,
            payload: {
              message: RESPONSE.AUTHERROR,
            },
          });
        }
      }
    }

    if (!payload) {
      res.status(403).json({
        status: false,
        payload: {
          message: RESPONSE.ERRORTOKEN,
        },
      });
    }

    // continue the control-flow of the code or call the next middleware
    next();
  } catch (error) {
    // token was expired or user had made changes in the token
    res.status(401).json({
      status: false,
      payload: {
        message: RESPONSE.AUTHERROR,
      },
    });
  }
};

/* eslint-enable */

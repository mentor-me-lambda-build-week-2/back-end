const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4');

// get the env secrets
require('dotenv').config();
const SECRET = process.env.JWTSECRET;

function jwtRoute(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ error: 'Not logged in.' });
      }

      req.jwtToken = decodedToken;
      next();
    });
  } else {
    return res.status(401).json({ error: 'Not logged in.' });
  }
}

function generateToken(user) {
  const payload = {
    username: user.username,
  };

  const options = {
    expiresIn: '1d',
    jwtid: uuid(),
  };

  return jwt.sign(payload, SECRET, options);
}

module.exports.jwtRoute = jwtRoute;
module.exports.generateToken = generateToken;

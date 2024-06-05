const jwt = require("jsonwebtoken");

const jwtAuthentication = (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorised- Token missing" });
  }

  jwt.verify(token, process.env.JWT_SECURITY_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden- Invalid token" });
    }
    req.user = user;
    // console.log(req.user);
    next();
  });
};

module.exports = jwtAuthentication;

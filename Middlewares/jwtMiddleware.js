const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const jwtResponse = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userDetails = jwtResponse.existingUser;
    next();
  } catch (error) {
    res.status(401).json("Authorization failed!!! please login");
  }
};
module.exports = jwtMiddleware;

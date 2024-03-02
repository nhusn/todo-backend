const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const jwtResponse = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userDetails = jwtResponse.existingUser;
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError"){
      return res.status(400).json("Your token was expired");
    }
    res.status(401).json("Invalid token");
  }
};
module.exports = jwtMiddleware;

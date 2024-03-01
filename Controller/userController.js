const user = require("../Model/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

exports.userRegisterController = async (req, res) => {
  const { email, password } = req.body;
  try {
    // throw "hi"
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      res.status(200).json("User already registered");
    }
    const newUser = new user({
      email,
      password,
    });
    await newUser.save();
    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      const isMatch = bcrypt.compareSync(password, existingUser.password);
      if (isMatch) {
        const token = jwt.sign({ existingUser }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        return res.status(200).json(token);
      }
    }
    return res.status(400).json("User not found,Please check your username and password");
  } catch (error) {
    return res.status(400).json(error);
  }
};

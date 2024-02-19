const user = require("../Model/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.userRegisterController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      res.status(200).json("User already registered");
    }
    const newUser = new user({
      email,
      password,
    });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await user.findOne({ email, password });
    if (!result) {
      res
        .status(200)
        .json("User not found.Please check your username and password");
    }
    const token = jwt.sign({ result }, process.env.JWT_SECRET_KEY);
    res.status(200).json(token);
  } catch (error) {
    res.status(401).json(error);
  }
};

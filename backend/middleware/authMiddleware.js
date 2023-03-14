const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const authProtection = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    const decodeToken = jwt.verify(token, process.env.JWT_TOKEN);
    const user = await User.findById(decodeToken.id);
    const { password,email, ...rest } = user.toObject();
    console.log(rest);
    req.user = user;
    next();
  }
  if (!token) {
    res.status(400);
    throw new Error("Not Authenticate");
  }
});

module.exports = {
  authProtection,
};

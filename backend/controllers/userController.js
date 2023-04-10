// import require library
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const path = require("path");

// user controllers

const getUser = asyncHandler(async (req, res) => {
  console.log(path.join(__dirname, "..", "public", "images"));
  const user = await User.find();
  //   console.log(req.user);
  res.status(200).json(user);
});
const registerUser = asyncHandler(async (req, res) => {
  console.log("Register User");
  const profilePic = req.file ? req.file.filename : null;
  const {
    name,
    email,
    password,
    password2,
    isAdmin,
    shopName,
    address,
    mobileNumber,
  } = req.body;
  console.log("IsAdmin is ", isAdmin);
  if (
    !name ||
    !email ||
    !password ||
    !password2 ||
    mobileNumber ||
    shopName ||
    address
  ) {
    res.status(401);
    throw new Error("Fill up all the fields");
  }
  if (password !== password2) {
    res.status(401);
    throw new Error("Confirm password does not matched");
  }
  const user = await User.findOne({ email });
  if (user) {
    res.status(401);
    throw new Error("User Already Exist");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const registerUser = await User.create({
    name,
    email,
    password: hash,
    isAdmin,
    profilePic,
    shopName,
    address,
    mobileNumber,
  });
  const token = jwt.sign(
    {
      id: registerUser.id,
      name: registerUser.name,
      email: registerUser.email,
      isAdmin: registerUser.isAdmin,
    },
    process.env.JWT_TOKEN,
    { expiresIn: "1h" }
  );
  res.status(200).json({
    user: registerUser,
    token: token,
    message: "Successfully Registered",
  });
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    res.status(400);
    throw new Error("Fill al the field");
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("This email is not registered");
  }
  const passwordConf = await bcrypt.compare(password, user.password);
  if (!passwordConf) {
    res.status(400);
    throw new Error("Wrong password");
  }
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      profilePic: user.profilePic,
    },
    process.env.JWT_TOKEN,
    { expiresIn: "1h" }
  );
  const expiryDate = new Date();
  expiryDate.setMinutes(expiryDate.getMinutes() + 2);

  res.cookie("auth", token, {
    path: "/",
    expires: new Date(Date.now() + 25892000000),
  });
  // res.set("Access-Control-Allow-Credentials", "true");
  res
    .status(200)
    .json({ user: user, token: token, message: "Successfully loged in" });
});
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("User is not available");
  }
  if (req.body.email) {
    const existUser = await User.findOne({ email: req.body.email });
    if (existUser && existUser.id !== user.id) {
      res.status(400);
      throw new Error("someone already using this email");
    }
  }
  const updateUserInfo = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updateUserInfo);
});
const deleteUser = asyncHandler(async (req, res) => {
  const user = User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("Delete user not possible");
  }
  user.remove();
  res.status(200).json(req.params.id);
});

const logout = asyncHandler(async (req, res) => {
  try {
    res.clearCookie("auth");
    console.log("Successfully logout");
    res.status(200).json({ Message: "Successfully Logout" });
  } catch (error) {
    res.status(400);
    throw new Error("Logout Problem");
  }
});

module.exports = {
  getUser,
  registerUser,
  loginUser,
  deleteUser,
  updateUser,
  logout,
};

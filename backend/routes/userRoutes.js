const express = require("express");
const { authProtection } = require("../middleware/authMiddleware");
const {
  getUser,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
  logout,
} = require("../controllers/userController");

const router = express.Router();

router.route("/").get(authProtection, getUser).post(registerUser);
router.route("/:id").put(updateUser).delete(deleteUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logout);

module.exports = router;

const express = require("express");
const multer = require("multer");
const path = require("path");
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
const dest = path.join(__dirname, "..", "public", "images");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)+ext;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

router.route("/").get(getUser).post(upload.single("profilePic"), registerUser);
router.route("/:id").put(updateUser).delete(deleteUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logout);

module.exports = router;

// authProtection,

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userInfo = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userInfo);

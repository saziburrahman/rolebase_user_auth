const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderInfo = new Schema(
  {
    productID: { type: String },
    productName: { type: String },
    productQuantity: { type: Number },
    perProductCost: { type: Number },
    totalCost: { type: Number },
    received: { type: Number },
    due: { type: Number },
    paymentOption: { type: String },
    account: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderInfo);

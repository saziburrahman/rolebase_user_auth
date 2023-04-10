const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productInfo = new Schema(
  {
    productID: { type: String },
    productName: { type: String },
    productQuantity: { type: Number },
    perProductCost: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productInfo);

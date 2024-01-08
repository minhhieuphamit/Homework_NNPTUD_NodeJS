const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  isdelete: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

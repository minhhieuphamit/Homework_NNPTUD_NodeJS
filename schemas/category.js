const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  order: { type: Number, default: 0 },
  isdelete: { type: Boolean, default: false },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;

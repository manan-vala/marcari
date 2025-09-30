const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user.js");

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image_url: {
    url: String,
  },
  owner_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: String,
  image: String, // URL or path to the image
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

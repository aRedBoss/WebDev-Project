const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: String,
  image: String, // URL or path to the image
});

// Check if the model already exists before defining it again
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

module.exports = Product;

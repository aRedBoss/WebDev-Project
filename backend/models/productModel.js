const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String, // URL or path to the image
});

// Add virtual field id
productSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    return ret;
  },
});

// Check if the model already exists before defining it again
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

module.exports = Product;

const Cart = require("../models/cartModel");
const Product = require("../models/ProductModel"); // Import Product model

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cartItem = new Cart({ productId, quantity });
    await cartItem.save();
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to add to cart" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    await Cart.findByIdAndDelete(id);
    res.json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove item" });
  }
};

const getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find().populate(
      "productId",
      "name description price",
    );

    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
};

module.exports = { addToCart, removeFromCart, getCartItems };

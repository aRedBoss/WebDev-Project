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

// Update cart item quantity
const updateCartQuantity = async (req, res) => {
  try {
    const { id } = req.params; // Cart item ID
    const { quantity } = req.body; // New quantity

    if (quantity < 1) {
      return res.status(400).json({ error: "Quantity must be at least 1" });
    }

    const cartItem = await Cart.findByIdAndUpdate(
      id,
      { quantity },
      { new: true },
    );

    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to update cart quantity" });
  }
};

const getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find().populate(
      "productId",
      "name description price",
    );

    // Check for missing products
    const filteredCartItems = cartItems.filter(
      (item) => item.productId !== null,
    );

    res.json(filteredCartItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  getCartItems,
};

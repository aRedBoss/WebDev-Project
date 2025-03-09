const Cart = require("../models/cartModel");
const Product = require("../models/ProductModel"); // Import Product model

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res
        .status(400)
        .json({ message: "Quantity must be a positive integer" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    console.log("req.user:", req.user);
    let cart = await Cart.findOne({ user: userId });
    console.log("Cart found:", cart);

    if (!cart) {
      console.log("Creating new cart for user:", userId);
      cart = new Cart({ user: userId, items: [] });
      console.log("New cart created:", cart);
    }
    console.log("Cart before items access:", cart);

    const existingItem = cart.items.find(
      (item) => item.productId && item.productId.equals(productId),
    );

    if (existingItem) {
      existingItem.quantity = quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    cart = await cart.populate(
      "items.productId",
      "name description price image",
    );

    cart.totalPrice = cart.items.reduce((total, item) => {
      return total + item.quantity * item.productId.price;
    }, 0);

    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error);
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
    const { id } = req.params.id; // Cart item ID
    const { quantity } = req.body; // New quantity

    if (quantity < 1) {
      return res.status(400).json({ error: "Quantity must be at least 1" });
    }

    const updatedItem = await Cart.findByIdAndUpdate(
      id,
      { quantity },
      { new: true },
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    res.json(updatedItem);
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
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

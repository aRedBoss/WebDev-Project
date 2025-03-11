const Cart = require("../models/cartModel");
const Product = require("../models/ProductModel"); // Import Product model

const addToCart = async (req, res) => {
  try {
    const { items } = req.body;
    const userId = req.user.id;

    if (!Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Items must be a non-empty array" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    for (const item of items) {
      const { productId, quantity } = item;

      if (!Number.isInteger(quantity) || quantity <= 0) {
        return res
          .status(400)
          .json({ message: "Quantity must be a positive integer" });
      }

      const product = await Product.findById(productId);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product not found: ${productId}` });
      }

      const existingItem = cart.items.find(
        (cartItem) =>
          cartItem.productId && cartItem.productId.equals(productId),
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    cart = await cart.populate(
      "items.productId",
      "name description price image",
    );

    cart.totalPrice = cart.items.reduce((total, cartItem) => {
      return total + cartItem.quantity * cartItem.productId.price;
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
    const userId = req.user.id; // Get the user ID from the request

    const cart = await Cart.findOne({ user: userId })
      .populate("items.productId", "name description price")
      .populate({
        path: "user",
        select: "username email", //  the fields you want to retrieve
      });

    if (!cart) {
      console.log("Cart not found for user:", userId);
      return res.status(404).json({ message: "Cart not found" });
    }

    // Check for missing products
    const filteredCartItems = cart.items.filter(
      (item) => item.productId !== null,
    );

    res.json({ user: cart.user, items: filteredCartItems }); // Include user info in the response
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  getCartItems,
};

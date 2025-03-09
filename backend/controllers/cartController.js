// cartController.js
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

const addToCart = async (req, res) => {
  try {
    const items = req.body.items;
    const userId = req.user._id;

    console.log("addToCart called");
    console.log("Received items:", items);
    console.log("Received userId:", userId);

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    for (const item of items) {
      const { productId, quantity } = item;

      const itemIndex = cart.items.findIndex(
        (cartItem) => cartItem.productId.toString() === productId,
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    console.log("Cart saved successfully:", cart);

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Failed to add to cart" });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId }).populate(
      "items.productId",
      "name price description",
    );

    if (!cart) {
      return res.json({ items: [] });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

const updateCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("userId")
      .populate("items.productId");
    if (!updatedCart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.json(updatedCart);
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ error: "Failed to update cart" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => !item.productId.equals(productId));

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
};

const checkout = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // You might want to create a new Order document here instead of just modifying the Cart.

    res.json({ message: "Checkout successful", cart: cart });
  } catch (error) {
    res.status(500).json({ error: "Failed to checkout" });
  }
};

const getCarts = async (req, res) => {
  try {
    const userId = req.user.id;
    const carts = await Cart.find({ userId }).populate(
      "items.productId",
      "name price description",
    );

    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch carts" });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  updateCart,
  checkout,
  getCarts,
};

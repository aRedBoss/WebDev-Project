const Cart = require("../models/cartModel");
const Product = require("../models/ProductModel"); // Import Product model

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res
        .status(400)
        .json({ message: "Quantity must be a positive integer" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.product && item.product.equals(productId),
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity }); // Store the product Id
    }

    cart = await Cart.findOne({ user: req.user.id }).populate("items.product");

    cart.totalPrice = cart.items.reduce((total, cartItem) => {
      if (!cartItem.product || !cartItem.product.price) {
        console.error("Invalid product data:", cartItem);
        return total;
      }
      return total + cartItem.quantity * cartItem.product.price;
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
    const { id } = req.params; // Cart item ID
    const { quantity } = req.body; // New quantity

    if (quantity < 1) {
      return res.status(400).json({ error: "Quantity must be at least 1" });
    }

    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const cartItem = cart.items.find(
      (item) => item.product._id.toString() === id,
    );

    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    cartItem.quantity = quantity;

    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0,
    );

    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    res.status(500).json({ error: "Failed to update cart quantity" });
  }
};

const getCartItems = async (req, res) => {
  try {
    const userId = req.user.id; // Get user id
    let cart = await Cart.findOne({ user: userId })
      .populate("user", "name email phoneNumber")
      .populate("items.product", "name description price image");

    if (!cart) {
      return res.json({ message: "Cart is empty", items: [] }); // Or res.json([])
    }

    res.json(cart);
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

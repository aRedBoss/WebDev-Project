const Cart = require("../models/cartModel");
const Product = require("../models/ProductModel"); // Import Product model

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Validate that quantity is a positive number
    if (!Number.isInteger(quantity) || quantity < 1) {
      return res
        .status(400)
        .json({ message: "Quantity must be a positive integer" });
    }

    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find the cart (assuming a single cart for simplicity)
    let cart = await Cart.findOne();
    if (!cart) {
      cart = new Cart();
    }

    // Check if the product is already in the cart
    const existingItem = cart.items.find((item) =>
      item.productId.equals(productId),
    );
    if (existingItem) {
      // Update the quantity of the existing item
      existingItem.quantity += quantity;
    } else {
      // Add the new item to the cart
      cart.items.push({ productId, quantity });
    }
    // Update the total price
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.quantity * product.price,
      0,
    );

    // Save the cart
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

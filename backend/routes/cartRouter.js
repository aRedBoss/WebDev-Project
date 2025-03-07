const express = require("express");
const {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  getCartItems,
} = require("../controllers/cartController");

const router = express.Router();

router.get("/", getCartItems);
router.post("/add", addToCart);
router.delete("/remove/:id", removeFromCart);
router.put("/cart/:id", updateCartQuantity);

module.exports = router;

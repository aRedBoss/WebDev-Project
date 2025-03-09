const express = require("express");
const {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  getCartItems,
} = require("../controllers/cartController");
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

router.get("/", getCartItems);
router.post("/add", requireAuth, addToCart);
router.delete("/remove/:id", removeFromCart);
router.put("/cart/:id", updateCartQuantity);

module.exports = router;

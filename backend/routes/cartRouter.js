const express = require("express");
const {
  addToCart,
  removeFromCart,
  getCartItems,
} = require("../controllers/cartController");

const router = express.Router();

router.get("/", getCartItems);
router.post("/add", addToCart);
router.delete("/remove/:id", removeFromCart);

module.exports = router;

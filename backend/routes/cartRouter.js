const express = require("express");
const { addToCart, removeFromCart } = require("../controllers/cartController");

const router = express.Router();

router.post("/add", addToCart);
router.delete("/remove/:id", removeFromCart);

module.exports = router;

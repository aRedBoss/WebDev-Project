// cartRoutes.js
const express = require("express");
const {
  addToCart,
  getCart,
  removeFromCart,
  updateCart,
  checkout,
  getCarts,
} = require("../controllers/cartController");
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

router.post("/add", requireAuth, addToCart);
router.get("/", getCart);
router.put("/:id", updateCart);
router.delete("/remove", removeFromCart);
router.post("/checkout", checkout);
router.get("/all", requireAuth, getCarts);

module.exports = router;

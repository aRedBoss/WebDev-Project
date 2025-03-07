const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: false, // Not required because the user might not be authenticated
    ref: "User",
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  quantity: { type: Number, default: 1 },
});

const cartSchema = new mongoose.Schema(
  {
    items: [cartItemSchema],
    totalPrice: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// Add virtual field id
cartItemSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    return ret;
  },
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

module.exports = Cart;

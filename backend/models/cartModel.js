const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  orderDate: {
    type: Date,
    default: Date.now,
  },
  // status: {
  //   type: String,
  //   enum: ["pending", "processing", "shipped", "completed", "cancelled"],
  //   default: "pending",
  // },
  // total: {
  //   type: Number,
  //   required: false,
  // },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

// Add virtual field id
cartSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    return ret;
  },
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

module.exports = Cart;

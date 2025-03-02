const express = require("express");
const app = express();
const BookingRouter = require("./routes/bookingRouter");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const cartRouter = require("./routes/cartRouter");
require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");

connectDB();

// تفعيل CORS للسماح للطلبات من متصفح React
app.use(cors()); // أضف هذا السطر هنا لتفعيل CORS

app.use(express.json());

// Serve images statically
app.use("/uploads", express.static("public/uploads"));

// Routes
app.use("/api/users", userRouter);
app.use("/api/booking", BookingRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(
    `http://localhost:${port}/api/booking , http://localhost:${port}/api/users`,
  );
});

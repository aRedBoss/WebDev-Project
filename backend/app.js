const express = require('express');
const app = express();
const BookingRouter = require('./routes/bookingRouter');
const userRouter = require('./routes/userRouter');
const getInTouchRouter = require('./routes/GetInTouchRouter');
require('dotenv').config();
const connectDB = require('./config/db');
const cors = require('cors');

connectDB();

app.use(cors());
app.use(express.json());

// Serve images statically
app.use("/uploads", express.static("public/uploads"));

// Routes
app.use("/api/users", userRouter);
app.use("/api/booking", BookingRouter);
app.use('/api/contact', getInTouchRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`http://localhost:${port}/api/booking , http://localhost:${port}/api/users , http://localhost:${port}/api/contact`);
});

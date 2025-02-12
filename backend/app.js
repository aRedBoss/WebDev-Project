const express = require('express');
const app = express();
const BookingRouter = require('./routes/bookingRouter');
const userRouter = require('./routes/userRouter');
require('dotenv').config();
const connectDB = require('./config/db');

connectDB();

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/booking', BookingRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`http://localhost:${port}/api/booking , http://localhost:${port}/api/users`);
});

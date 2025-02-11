const express = require('express');
const app = express();
const BookingRouter = require('./routes/bookingRouter');
const userRouter = require('./routes/userRouter');
const connectDB = require('./config/db');

connectDB();

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/booking', BookingRouter);

const port = 4000;
app.listen(port, () => {
    console.log(`http://localhost:${port}/api/booking , http://localhost:${port}/api/users`);
});

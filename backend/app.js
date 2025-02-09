const express = require('express');
const app = express();
const userRouter = require('./routes/userRouter');
const connectDB = require('./config/db');

connectDB();

app.use(express.json());


app.use('/users', userRouter);


const port = 4000;
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});




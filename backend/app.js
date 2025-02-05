const express = require('express');
const app = express();
const userRouter = require('./routes/userRouter');
const port = 4000;
require('./config/db');


app.use(express.json());


app.use('/users', userRouter);



app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});




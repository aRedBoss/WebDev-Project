const mongoose = require('mongoose');

const url = '';

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("is connected to the db");
    })
    .catch((err) => console.log("Some error", err));

process.on('SIGINT', () => {
    mongoose.disconnect()
        .then(() => console.log("db connection closed"))
        .finally(() => process.exit(0));
});
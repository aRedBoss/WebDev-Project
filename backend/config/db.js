const mongoose = require('mongoose');

const url = 'mongodb+srv://alprstigehussein:LPv1aqPWyOFnqWTM@cluster0.mbvwa.mongodb.net/WebDev-Musa-parpershop?retryWrites=true&w=majority&appName=Cluster0';

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

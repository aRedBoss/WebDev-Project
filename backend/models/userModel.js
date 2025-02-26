const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        role:{type:String , required:false , default: "user"}
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
// models/GetInTouchModel.js
const mongoose = require('mongoose');


const getInTouchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  
  },
  email: {
    type: String,
    required: true,  
  },
  phone: {
    type: String,
    required: false,  
  },
  message: {
    type: String,
    required: true,  
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});


const GetInTouch = mongoose.model('GetInTouch', getInTouchSchema);

module.exports = GetInTouch;

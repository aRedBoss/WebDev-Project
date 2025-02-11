const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  serviceType: { type: String, required: false },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  barberName: { type: String, required: false },
  bookingTime: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'canceled'], default: 'pending' },
  duration: { type: Number, default: 45 }
},
    {timestamps :true}
);

const Booking = mongoose.model('Booking', bookingSchema);


module.exports = Booking;

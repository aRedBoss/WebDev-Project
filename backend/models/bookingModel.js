import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  serviceType: { type: String, required: false },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  barberName: { type: String, required: true },
  bookingTime: { type: String, required: true }
  
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;

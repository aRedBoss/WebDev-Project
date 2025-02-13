/*
{
  "clientName": "Musa sadi1 Musa",  
  "serviceType": "Haircut",  
  "email": "ahmed.ali@example.com",   // This should be Unique 
  "phoneNumber": "9876543210",  // This should be Unique also 
  "barberName": "Mohamed",  // Can be left empty if no specific barber, 4ex "" , 
  "bookingTime": "2025-02-12T10:45:00.000+02:00",  // Make sure the time format is correct: "YYYY-MM-DDTHH:mm:ss.sssZ" // Time is local
  "status": "pending",  
  "duration": 45 
}

// Make sure to install the moment-timezone library if you haven't already , check package.json:
// npm install moment-timezone

//i will use this library to send Email to clients for confirm the booking
// npm install nodemailer

// The nodemailer library helps in sending emails to clients, but I will need time to learn how to use it.
// This Code n't done yet .. 
*/

const Booking = require('../models/bookingModel');
const moment = require('moment-timezone');
const mongoose = require('mongoose');


const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ bookingTime: 1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};

const createBooking = async (req, res) => {
  const { clientName, serviceType, email, phoneNumber, barberName, bookingTime } = req.body;

  if (!clientName || !email || !phoneNumber || !bookingTime) {
    return res.status(400).json({ message: 'Client name, email, phone number, and booking time are required. Thank you!' });
  }

///////////////////// Booking Time code 
  const bookingDate = moment.tz(bookingTime, "Europe/Helsinki").toDate();
  const startOfWorkDay = new Date(bookingDate);
  startOfWorkDay.setHours(9, 0, 0, 0);
  const endOfWorkDay = new Date(bookingDate);
  endOfWorkDay.setHours(18, 0, 0, 0);

  const currentDate = new Date();
  if (bookingDate < currentDate) {
    return res.status(400).json({ message: 'The booking time cannot be in the past.' });
  }


  if (bookingDate < startOfWorkDay || bookingDate > endOfWorkDay) {
    return res.status(400).json({ message: 'The booking time must be between 9 AM and 6 PM. Thank you!' });
  }

  const minBookingDuration = 45 * 60 * 1000;
  const existingBookings = await Booking.find({ barberName: barberName }).sort({ bookingTime: 1 });

  for (let i = 0; i < existingBookings.length; i++) {
    const existingBooking = existingBookings[i];
    const existingBookingStart = existingBooking.bookingTime.getTime();
    const existingBookingEnd = existingBookingStart + minBookingDuration;

    if (
      (bookingDate.getTime() < existingBookingEnd && bookingDate.getTime() + minBookingDuration > existingBookingStart)
    ) {
      return res.status(400).json({
        message: 'This time slot is already taken by another client. You can call us to check if there are any available spots at this time.'
      });
    }
  }

  try {
    const newBooking = new Booking({
      clientName,
      serviceType,
      email,
      phoneNumber,
      barberName,
      bookingTime: bookingDate
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
};
///////////////////////////////////////////////////////////////////////////////////////////////////////


const getBookingById = async (req, res) => {
  const { bookingId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    return res.status(400).json({ message: "Invalid booking ID" });
  }

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking', error: error.message });
  }
};

const updateBooking = async (req, res) => {
  const { bookingId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    return res.status(400).json({ message: "Invalid booking ID" });
  }

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { ...req.body },
      { new: true }
    );
    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking', error: error.message });
  }
};


const deleteBooking = async (req, res) => {
  const { bookingId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    return res.status(400).json({ message: "Invalid booking ID" });
  }

  try {
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting booking', error: error.message });
  }
};


module.exports = {
  getAllBookings,
  createBooking,
  getBookingById,
  updateBooking,
  deleteBooking
};

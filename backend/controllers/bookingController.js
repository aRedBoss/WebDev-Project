/* 
{
  "clientName": "Musa sadiq Musa",  
  "serviceType": "Haircut",  
  "email": "ahmed.ali@example.com",  
  "phoneNumber": "9876543210",  
  "barberName": "Mohamed",   
  "bookingTime": "2025-02-12T10:45:00.000+02:00",  // Make sure the time format is correct: "YYYY-MM-DDTHH:mm:ss.sssZ" // Time is local
  "status": "pending",  
  "duration": 30 
}

*/

const Booking = require("../models/bookingModel");
const mongoose = require("mongoose");
const moment = require("moment-timezone");
const nodemailer = require("nodemailer");
require("dotenv").config();

//----------------------------------------------------------------------------------------------
 const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,  
    pass: process.env.EMAIL_PASS,  
  },
});

//----------------------------------------------------------------------------------------------
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ bookingTime: 1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error: error.message });
  }
};

//----------------------------------------------------------------------------------------------
const createBooking = async (req, res) => {
  const { clientName, serviceType, email, phoneNumber, barberName, bookingTime } = req.body;

  if (!clientName || !email || !phoneNumber || !bookingTime) {
    return res.status(400).json({
      message: "Client name, email, phone number, and booking time are required. Thank you!",
    });
  }

  try {
    console.log("Received booking data:", req.body);

    const bookingDate = moment.tz(bookingTime, "Europe/Helsinki").toDate();
    const startOfWorkDay = new Date(bookingDate);
    startOfWorkDay.setHours(9, 0, 0, 0);
    const endOfWorkDay = new Date(bookingDate);
    endOfWorkDay.setHours(18, 0, 0, 0);

    const currentDate = new Date();
    if (bookingDate < currentDate) {
      return res.status(400).json({ message: "The booking time cannot be in the past." });
    }

    if (bookingDate < startOfWorkDay || bookingDate > endOfWorkDay) {
      return res.status(400).json({ message: "The booking time must be between 9 AM and 6 PM. Thank you!" });
    }

    const minBookingDuration = 45 * 60 * 1000;
    const existingBookings = await Booking.find({ barberName }).sort({ bookingTime: 1 });

    for (let i = 0; i < existingBookings.length; i++) {
      const existingBooking = existingBookings[i];
      const existingBookingStart = existingBooking.bookingTime.getTime();
      const existingBookingEnd = existingBookingStart + minBookingDuration;

      if (
        bookingDate.getTime() < existingBookingEnd &&
        bookingDate.getTime() + minBookingDuration > existingBookingStart
      ) {
        return res.status(400).json({
          message: "This time slot is already taken by another client. You can call us to check if there are any available spots at this time.",
        });
      }
    }

    //----------------------------------------------------------------------------------------------
    //Save New Booking
    const newBooking = new Booking({
      clientName,
      serviceType,
      email,
      phoneNumber,
      barberName,
      bookingTime: bookingDate,
    });

    await newBooking.save();
    console.log("Booking saved successfully:", newBooking);

     try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Booking Confirmation: Your ${serviceType} Appointment`,
        text: `Hello ${clientName},\n\nYour booking for ${serviceType} on ${bookingTime} has been successfully confirmed.\n\nThank you for booking with us!`,
        html: `<p>Hello ${clientName},</p><p>Your booking for <strong>${serviceType}</strong> on <strong>${bookingTime}</strong> has been successfully confirmed.</p><p>Thank you for booking with us!</p>`,
      };

      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully.");
    } catch (emailError) {
      console.error("🚨 Error sending email:", emailError.message);
    }

    res.status(201).json({ message: "Booking successful", booking: newBooking });

  } catch (error) {
    console.error("🚨 Error in createBooking:", error.message);
    res.status(500).json({ message: "Error creating booking or sending confirmation email", error: error.message });
  }
};

//------------------------------------------------------------------------
const getBookingById = async (req, res) => {
  const { bookingId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    return res.status(400).json({ message: "Invalid booking ID" });
  }

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error fetching booking", error: error.message });
  }
};

//----------------------------------------------------------------------------------------------
const updateBooking = async (req, res) => {
  const { bookingId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    return res.status(400).json({ message: "Invalid booking ID" });
  }

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(bookingId, { ...req.body }, { new: true });
    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: "Error updating booking", error: error.message });
  }
};

//----------------------------------------------------------------------------------------------
const deleteBooking = async (req, res) => {
  const { bookingId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    return res.status(400).json({ message: "Invalid booking ID" });
  }

  try {
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting booking", error: error.message });
  }
};

//----------------------------------------------------------------------------------------------
 
module.exports = {
  getAllBookings,
  createBooking,
  getBookingById,
  updateBooking,
  deleteBooking,
};

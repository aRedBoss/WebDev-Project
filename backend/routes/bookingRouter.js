const express = require('express');
const {
  getAllBookings,
  createBooking,
  getBookingById,
  updateBooking,
  deleteBooking  
} = require('../controllers/bookingController');

const router = express.Router();

router.get('/', getAllBookings);
router.post('/', createBooking);
router.get('/:bookingId', getBookingById);
router.put('/:bookingId', updateBooking);
router.delete('/:bookingId', deleteBooking);  

module.exports = router;

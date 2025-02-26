import { useState } from "react";
import axios from "axios";
import "./Booking.css";

const Booking = () => {
  const [formData, setFormData] = useState({
    clientName: "",
    serviceType: "haircut",
    email: "",
    phoneNumber: "",
    barberName: "",
    date: "",
    bookingTime: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const bookingData = {
      clientName: formData.clientName,
      serviceType: formData.serviceType,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      barberName: formData.barberName,
      bookingTime: `${formData.date}T${formData.bookingTime}:00`, // Format the booking time
    };

    try {
      const response = await axios.post("http://localhost:4000/api/booking", bookingData);
      console.log("Booking successful:", response.data);
    } catch (error) {
      setError("There was an error with your booking. Please try again.");
      console.error("Error creating booking:", error);
    }
  };

  return (
    <div className="booking-container">
      <div className="booking-form">
        <h2>Booking</h2>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Client Name:</label>
            <input
              type="text"
              id="name"
              name="clientName"
              placeholder="Client Name"
              value={formData.clientName}
              onChange={handleChange}
              required
            />

            <label htmlFor="service">Service:</label>
            <select
              id="service"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
            >
              <option value="haircut">Classic haircut</option>
              <option value="shave">Beard grooming</option>
              <option value="hairandshave">Hot towel shave</option>
            </select>

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phoneNumber"
              placeholder="Phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
            />

            <label htmlFor="barberName">Barber Name:</label>
            <input
              type="text"
              id="barberName"
              name="barberName"
              placeholder="Barber Name"
              value={formData.barberName}
              onChange={handleChange}
            />

            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />

            <label htmlFor="time">Time:</label>
            <select
              id="time"
              name="bookingTime"
              value={formData.bookingTime}
              onChange={handleChange}
            >
              {/* Available booking times from 9:00 AM to 6:00 PM with 30-minute intervals */}
              <option value="09:00">9:00</option>
              <option value="09:30">9:30</option>
              <option value="10:00">10:00</option>
              <option value="10:30">10:30</option>
              <option value="11:00">11:00</option>
              <option value="11:30">11:30</option>
              <option value="12:00">12:00</option>
              <option value="12:30">12:30</option>
              <option value="13:00">13:00</option>
              <option value="13:30">13:30</option>
              <option value="14:00">14:00</option>
              <option value="14:30">14:30</option>
              <option value="15:00">15:00</option>
              <option value="15:30">15:30</option>
              <option value="16:00">16:00</option>
              <option value="16:30">16:30</option>
              <option value="17:00">17:00</option>
              <option value="17:30">17:30</option>
            </select>

            <button className="btn-book" type="submit">
              Book Now
            </button>
          </form>
        ) : (
          <p>Thank you for your booking!</p>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default Booking;

import { useState } from "react";
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.clientName]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    console.log("Booking data submitted:", formData);
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
              name="name"
              placeholder="Client Name"
              value={formData.clientName}
              onChange={handleChange}
              required
            />

            <label htmlFor="service">Service:</label>
            <select
              id="service"
              name="service"
              value={formData.serviceType}
              onChange={handleChange}>
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
              name="phone"
              placeholder="Phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
            />

            <label htmlFor="phone">Barber Name:</label>
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
              name="time"
              value={formData.bookingTime}
              onChange={handleChange}>
              <option value="9:00">9:00</option>
              <option value="9:45">9:45</option>
              <option value="10:30">10:30</option>
              <option value="11:15">11:15</option>
              <option value="12:00">12:00</option>
              <option value="12:45">12:45</option>
              <option value="13:30">13:30</option>
              <option value="14:15">14:15</option>
              <option value="15:00">15:00</option>
              <option value="15:45">15:45</option>
              <option value="16:15">16:15</option>
              <option value="17:30">17:30</option>
            </select>

            <button className="btn-book" type="submit">
              Book Now
            </button>
          </form>
        ) : (
          <p>Thank you for your booking!</p>
        )}
      </div>
    </div>
  );
};

export default Booking;

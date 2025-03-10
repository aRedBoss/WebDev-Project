import { useEffect, useState } from "react";
import axios from "axios";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get("/api/booking") // Adjust URL if needed
      .then((response) => setBookings(response.data))
      .catch((error) => console.error("Error fetching bookings:", error));
  }, []);

  return (
    <div className="p-4">
      <h2 className="section-title">Bookings List</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Client</th>
            <th className="border p-2">Service</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Barber</th>
            <th className="border p-2">Time</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Duration (min)</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td className="border p-2">{booking.clientName}</td>
              <td className="border p-2">{booking.serviceType || "N/A"}</td>
              <td className="border p-2">{booking.email}</td>
              <td className="border p-2">{booking.phoneNumber}</td>
              <td className="border p-2">
                {booking.barberName || "Not Assigned"}
              </td>
              <td className="border p-2">
                {new Date(booking.bookingTime).toLocaleString()}
              </td>
              <td className="border p-2">{booking.status}</td>
              <td className="border p-2">{booking.duration} min</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBookings;

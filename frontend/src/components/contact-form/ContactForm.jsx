import { useState } from "react";
import Button from "../../components/button/Button";
import "./ContactForm.css";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send email, save to database)
    console.log("Form submitted:", { name, email, phone, message });
  };

  return (
    <div className="contact-form">
      <h2 className="">GET IN TOUCH</h2>
      <h3 className="">We're here to assist you!</h3>

      <form onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="name" className="">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=""
            placeholder="Name"
            required
          />
        </div>
        <div className="">
          <label htmlFor="email" className="">
            Email address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=""
            placeholder="Email address"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
            Phone number
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Phone number"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="message"
            className="block text-gray-700 font-bold mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className=""
            placeholder="Message"
            rows="4"
            required
          ></textarea>
        </div>
        {/* <button type="submit" className="">
          SUBMIT
        </button> */}
        <Button type="submit" className="btn-secondary" name="SUBMIT" />
      </form>
    </div>
  );
}

export default ContactForm;

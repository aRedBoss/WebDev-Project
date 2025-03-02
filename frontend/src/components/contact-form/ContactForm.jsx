/* eslint-disable no-unused-vars */
import { useState } from "react";
import Button from "../../components/button/Button";
import axios from "axios"; 
import "./ContactForm.css";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [responseMessage, setResponseMessage] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    setIsSubmitting(true);

    try {

      const response = await axios.post("http://localhost:4000/api/contact", {
        name,
        email,
        phone,
        message,
      });

      setResponseMessage(response.data.message); 
      setName(""); 
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {

      setResponseMessage("There was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <div className="contact-form">
      <h2 className="">GET IN TOUCH</h2>
      <h3 className="">We Are here to assist you!</h3>

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

        <Button 
          type="submit" 
          className="btn-secondary" 
          name={isSubmitting ? "Submitting..." : "SUBMIT"} 
          disabled={isSubmitting} 
        />

        {responseMessage && <div className="response-message">{responseMessage}</div>}
      </form>
    </div>
  );
}

export default ContactForm;

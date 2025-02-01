import ServiceCard from "./ServiceCard";
import "../App.css"; // Ensure styles are applied

import haircutImg from "../assets/haircut.jpg";
import beardImg from "../assets/beard.jpg";
import shaveImg from "../assets/shave.jpg";

const services = [
  { title: "Classic haircut", description: "Timeless haircut tailored to your style.", image: haircutImg },
  { title: "Beard grooming", description: "Elevate your beard game with expert grooming.", image: beardImg },
  { title: "Hot towel shave", description: "Indulge in a luxurious hot towel shave experience.", image: shaveImg },
];


const Services = () => {
  return (
    <section className="services">
      <h2>Our Services</h2>
      <p>Elevate your style with our expert services.</p>
      <div className="service-list">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </section>
  );
};

export default Services;
import { Link } from "react-router-dom";

import "./ServiceCard.css"; // Apply styles

const ServiceCard = ({ title, description, image }) => {
  return (
    <div className="service-card">
      <img src={image} alt={title} className="service-image" />
      <div className="service-content">
        <div className="service-title-container">
          <Link to="/booking" className="service-title">
            {title} &gt;
          </Link>
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;

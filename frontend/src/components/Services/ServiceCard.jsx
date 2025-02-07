import "./Services.css"; // Apply styles

const ServiceCard = ({ title, description, image }) => {
  return (
    <div className="service-card">
      <img src={image} alt={title} className="service-image" />
      <div className="service-content">
        <h3>{title} &gt;</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;

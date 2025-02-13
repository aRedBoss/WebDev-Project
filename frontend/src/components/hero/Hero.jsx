import bgImage from "../../assets/barber-logo.png"; // Make sure the path is correct
import "./Hero.css"; // Import the CSS file
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      className="hero-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>Musa Barber Shop</h1>
        <h2 className="sub-heading">Elevate your grooming with style</h2>
        <div className="hero-buttons">
          <Link to="/services">
            <button className="btn-hero">VIEW SERVICES</button>
          </Link>
          <Link to="/booking">
            <button className="btn-secondary">BOOK NOW</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;

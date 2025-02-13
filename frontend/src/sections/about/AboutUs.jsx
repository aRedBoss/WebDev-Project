import barbershop from "../../assets/barbershop.jpg";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <section className="about-container">
      <div className="about-image">
        <img src={barbershop} alt="Barber Shop" />
      </div>
      <div className="about-content">
        <h2>About Us</h2>
        <p className="bold-text">
          With over 15 years of dedicated service, we have become a trusted name
          in Finland.
        </p>
        <p>
          At <strong>Musa Barber Shop</strong>, we are passionate about style
          and grooming. Our experienced team combines classic techniques with
          modern trends to deliver sharp, personalized cuts and professional
          beard styling.
        </p>
        <p>
          Our mission is simple: to provide top-quality grooming in a welcoming
          and inclusive environment. We’ve built long-lasting relationships with
          clients who trust us for our precision and dedication.
        </p>
        <p>
          Whether it’s your first visit or you’re a regular, Musa Barber Shop is
          here to provide an unmatched barbering experience. Book your
          appointment today and step out with confidence!
        </p>
        <button className="read-more">READ MORE</button>
      </div>
    </section>
  );
};

export default AboutUs;

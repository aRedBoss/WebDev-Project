import React from "react";
import "./Footer.css"; // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <p className="copyright">
        &copy; {new Date().getFullYear()} Musa Barber Shop.
      </p>
      <div className="social-links">
        <a href="#" className="social-link">
          Facebook
        </a>
        <a href="#" className="social-link">
          Twitter
        </a>
        <a href="#" className="social-link">
          Instagram
        </a>
      </div>
    </footer>
  );
};

export default Footer;

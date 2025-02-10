import React from "react";
import "./Footer.css";
import SocialLinks from "./SocialLinks.jsx"; // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <p className="copyright">
        &copy; {new Date().getFullYear()} Musa Barber Shop.
      </p>
      <div className="social-links">
        <SocialLinks />
      </div>
    </footer>
  );
};

export default Footer;

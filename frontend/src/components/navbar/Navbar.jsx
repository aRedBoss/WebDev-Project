import { useState } from "react";
import Button from "../button/Button"; // Import Buttons
import logoImage from "../../assets/barber-logo.png"; // Make sure the path is correct
import "./Navbar.css"; // Import the CSS file

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logoImage} alt="Logo" />
      </div>
      <div className="menu">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
      </div>
      <div className="buttons">
        <Button className="btn-primary" name="Sign In" />
        <Button className="btn-secondary" name="Book" />
      </div>
      <div className="hamburger" onClick={toggleMobileMenu}>
        ☰
      </div>
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <a href="#home" onClick={toggleMobileMenu}>
            Home
          </a>
          <a href="#about" onClick={toggleMobileMenu}>
            About
          </a>
          <a href="#services" onClick={toggleMobileMenu}>
            Services
          </a>
          <a href="#contact" onClick={toggleMobileMenu}>
            Contact
          </a>
          {/* Reuse Buttons Component in Mobile Menu */}
          <Button className="btn-primary margin-bottom w-full" name="Sign In" />
          <Button className="btn-secondary w-full" name="Book" />
        </div>
      )}
    </nav>
  );
};

export default Navbar;

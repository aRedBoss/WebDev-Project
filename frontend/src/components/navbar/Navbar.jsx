import { useState } from "react";
import Button from "../button/Button"; // Import Button Component
import logoImage from "../../assets/barber-logo.png"; // Ensure this path is correct
import "./Navbar.css"; // Import CSS file

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
        <a href="#shop">Shop</a> {/* Added Shop Section */}
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
          <a href="#shop" onClick={toggleMobileMenu}>
            Shop
          </a> {/* Added Shop Section in Mobile Menu */}
          <a href="#contact" onClick={toggleMobileMenu}>
            Contact
          </a>
          {/* Reuse Button Component in Mobile Menu */}
          <Button className="btn-primary margin-bottom w-full" name="Sign In" />
          <Button className="btn-secondary w-full" name="Book" />
        </div>
      )}
    </nav>
  );
};

export default Navbar;

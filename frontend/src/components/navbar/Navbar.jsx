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
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="buttons">
        <Link to="/signin">
          <Button className="btn-primary" name="Sign In" />
        </Link>
        <Link to="/booking">
          <Button className="btn-secondary" name="Book" />
        </Link>
      </div>
      <div className="hamburger" onClick={toggleMobileMenu}>
        ☰
      </div>
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={toggleMobileMenu}>
            Home
          </Link>
          <Link to="/about" onClick={toggleMobileMenu}>
            About
          </Link>
          <Link to="/services" onClick={toggleMobileMenu}>
            Services
          </a>
          <a href="/shop" onClick={toggleMobileMenu}>
            Shop
          </a> {/* Added Shop Section in Mobile Menu */}
          <a href="/contact" onClick={toggleMobileMenu}>
          </Link>
          <Link to="/contact" onClick={toggleMobileMenu}>
            Contact
          </Link>
          {/* Reuse Buttons Component in Mobile Menu */}
          <Link to="/signin">
            <Button
              className="btn-primary margin-bottom w-full"
              name="Sign In"
            />
          </Link>
          <Link to="/booking">
            <Button className="btn-secondary w-full" name="Book" />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

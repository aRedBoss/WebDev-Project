/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link
import Button from "../button/Button"; // Import Buttons
import logoImage from "../../assets/barber-logo.png"; // Make sure the path is correct
import { jwtDecode } from 'jwt-decode';
import "./Navbar.css"; // Import the CSS file

import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from "../../hooks/useAuthContext";

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout } = useLogout();

  const { user } = useAuthContext()

  useEffect(() => {
    if (user && user.accessToken) { // Check if user and accessToken exist
      try {
        const token = user.accessToken;
        const decoded = jwtDecode(token);
        if (decoded.role === 'admin') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
  }, [user]);

  const handleClick = () => {

    logout();
    setIsAdmin(false);

  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <img src={logoImage} alt="Logo" />
      </Link>
      <div className="menu">
        <Link to="/">Home</Link>
        <Link to="/aboutus">About Us</Link>
        <Link to="/services">Services</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="buttons">
        {user && <div>
          <span>{user.email}</span>
          <button className="btn-primary" onClick={handleClick}>Log out</button>
        </div>}
        {!user && <Link to="/signin">
          <Button className="btn-primary" name="Sign In" />
        </Link>}
        {!isAdmin && <Link to="/booking">
          <Button className="btn-secondary" name="Book" />
        </Link>}
        {isAdmin && <Link className="nav-link" to="/admin">
          <Button className="btn-secondary" name="Admin Panel" />
        </Link>}
      </div>
      <div className="hamburger" onClick={toggleMobileMenu}>

        ☰
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={toggleMobileMenu}>
            Home
          </Link>
          <Link to="/aboutus" onClick={toggleMobileMenu}>
            About
          </Link>
          <Link to="/services" onClick={toggleMobileMenu}>
            Services
          </Link>
          <Link to="/shop" onClick={toggleMobileMenu}>
            Shop
          </Link>
          <Link to="/contact" onClick={toggleMobileMenu}>
            Contact
          </Link>
          {/* Reuse Buttons Component in Mobile Menu */}
          <Link to="/signin" className="btn-primary">
            Sign In
          </Link>
          <Link to="/booking" className="btn-secondary">
            Book
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

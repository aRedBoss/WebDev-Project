import { useState } from "react";
import logo from "../../assets/barber-logo.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-white shadow-md">
      <div className="relative flex flex-row justify-between">
        {/* Conditional margin */}
        <div className="p-4 text-2xl">
          {/* ... (logo) */}
          <img
            src={logo}
            alt="MUSA Barber Shop"
            className="h-12 w-12 object-cover"
          />
        </div>
        {/* ... (hamburger icon) */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="p-4 text-gray-800 hover:text-gray-600 focus:outline-none">
            {/* ... (hamburger svg) */}
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        {/* ... (desktop menu) */}
        <div className="hidden md:flex max-w-7xl">
          {/* ... (desktop menu links and buttons) */}
          <div className="flex items-center justify-center space-x-8 p-4">
            {/* ... (Your existing desktop menu links) */}
            <a href="#home" className="text-gray-800 hover:text-gray-600">
              Home
            </a>
            <a href="#about" className="text-gray-800 hover:text-gray-600">
              About
            </a>
            <a href="#services" className="text-gray-800 hover:text-gray-600">
              Services
            </a>
            <a href="#contact" className="text-gray-800 hover:text-gray-600">
              Contact
            </a>
          </div>
          <div className="flex space-x-4 p-4">
            {/* ... (Your existing desktop buttons) */}
            <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
              Sign In
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400">
              Book
            </button>
          </div>
        </div>
        {/* ... (mobile menu) */}
        <div
          className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden absolute top-full left-0 right-0 bg-white shadow-md z-10`}>
          {/* ... (mobile menu links and buttons) */}
          <div className="flex flex-col p-4 space-y-4">
            {/* Mobile Menu Links - Same as desktop, but vertical */}
            <a
              href="#home"
              className="text-gray-800 hover:text-gray-600 block py-2">
              Home
            </a>
            <a
              href="#about"
              className="text-gray-800 hover:text-gray-600 block py-2">
              About
            </a>
            <a
              href="#services"
              className="text-gray-800 hover:text-gray-600 block py-2">
              Services
            </a>
            <a
              href="#contact"
              className="text-gray-800 hover:text-gray-600 block py-2">
              Contact
            </a>
            <div className="flex flex-col space-y-2">
              {" "}
              {/* Mobile Buttons */}
              <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
                Sign In
              </button>
              <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400">
                Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

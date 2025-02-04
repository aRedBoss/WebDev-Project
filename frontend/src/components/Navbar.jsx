import React from 'react';
import logo from '../assets/barber-logo.png';

const Navbar = () => {
  return (
      <nav className="flex flex-row items-center bg-white shadow-md">
        <div className="p-4 text-2xl">
          <img src={logo} alt="MUSA Barber Shop" className="h-12 w-12 max-w-7xl" />
        </div>
        <div className="flex space-x-4 p-4">
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
          <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
            Sign In
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400">
            Book
          </button>
        </div>
      </nav>
  );
};

export default Navbar;

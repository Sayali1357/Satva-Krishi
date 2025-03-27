import React, { useState, useEffect, useRef } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaSearch,
  FaUser,
  FaShoppingBag,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Change navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle Side Menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    // Attach and remove event listeners
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <>
      {/* Navbar Start */}
      <div
        className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ease-in-out ${
          scrolling ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        {/* Top Bar */}
        <div className="hidden lg:flex justify-between items-center px-5 py-2 text-white bg-black">
          <div className="flex items-center space-x-4">
            <small>
              <i className="fa fa-map-marker-alt me-2"></i> Nashik, Maharashtra,
              India
            </small>
            <small>
              <i className="fa fa-envelope me-2"></i> support@satvakrishi.com
            </small>
          </div>
          <div className="flex items-center space-x-3">
            <small>Follow us:</small>
            <a href="#" className="text-white hover:text-gray-300">
              <FaFacebookF />
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <FaTwitter />
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <FaLinkedinIn />
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Main Navbar */}
        <nav
          className={`w-full transition-all duration-300 ${
            scrolling ? "bg-white shadow-md" : "bg-transparent"
          }`}
        >
          <div className="container mx-auto flex justify-between items-center px-5 py-3">
            {/* Logo */}
            <Link
              to="/"
              className={`text-2xl font-bold transition-all ${
                scrolling ? "text-green-1000" : "text-white"
              } hover:text-orange-1000`}
            >
              Satva<span className="text-orange-1000">Krishi</span>
            </Link>

            {/* Menu Items */}
            <div className="hidden lg:flex space-x-6">
              <Link
                to="/"
                className={`hover:text-orange-500 transition ${
                  scrolling ? "text-black" : "text-white"
                }`}
              >
                Home
              </Link>
              <Link
                to="/About"
                className={`hover:text-orange-500 transition ${
                  scrolling ? "text-black" : "text-white"
                }`}
              >
                About Us
              </Link>
              <Link
                to="/Product"
                className={`hover:text-orange-500 transition ${
                  scrolling ? "text-black" : "text-white"
                }`}
              >
                Products
              </Link>
              <Link
                to="/Contact"
                className={`hover:text-orange-500 transition ${
                  scrolling ? "text-black" : "text-white"
                }`}
              >
                Contact Us
              </Link>
            </div>

            {/* Icons */}
            <div className="hidden lg:flex items-center space-x-4">
              <a
                href="#"
                className={`hover:text-orange-500 transition ${
                  scrolling ? "text-black" : "text-white"
                }`}
              >
                <FaSearch />
              </a>
              <a
                href="#"
                className={`hover:text-orange-500 transition ${
                  scrolling ? "text-black" : "text-white"
                }`}
              >
                <FaUser />
              </a>
              <a
                href="/Cart"
                className={`hover:text-orange-500 transition ${
                  scrolling ? "text-black" : "text-white"
                }`}
              >
                <FaShoppingBag />
              </a>
            </div>

            {/* Hamburger Menu */}
            <button
              type="button"
              className={
                scrolling ? "text-black" : "text-white"
              }
              onClick={toggleMenu}
            >
              {menuOpen ? (
                <FaTimes className="text-2xl" />
              ) : (
                <FaBars className="text-2xl" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Side Menu / Off-Canvas (Slides from the Right) */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Side Menu Header */}
        <div className="flex justify-between items-center px-5 py-4 bg-green-600 text-white">
          <h3 className="text-xl font-bold">Menu</h3>
          <button onClick={toggleMenu} className="text-white text-2xl">
            <FaTimes />
          </button>
        </div>

        {/* Side Menu Links */}
        <ul className="flex flex-col space-y-4 px-5 py-6">
          <li>
            <Link
              to="/Organic"
              className="text-lg text-gray-700 hover:text-green-600"
              onClick={toggleMenu}
            >
              🌱 Organic
            </Link>
          </li>
          <li>
            <Link
              to="/Vedic"
              className="text-lg text-gray-700 hover:text-yellow-600"
              onClick={toggleMenu}
            >
              📚 Vedic
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay to Close Menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
};

export default Navbar;

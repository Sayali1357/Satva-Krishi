// src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Import Bootstrap JavaScript (optional, if you need dropdowns, modals, etc.)
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Features from "./components/Features";
import Product from "./components/Product";
import ProductDashboard from "./components/ProductDashboard"
import Firm from "./components/Firm";
import Contact from "./components/Contact";
import BuyNow from "./components/BuyNow";
import Cart from "./components/Cart";
import Vedic from "./components/Vedic";
import Organic from "./components/Organic";

const App = () => {
  // Initialize AOS animation
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/product" element={<Product />} />
        <Route path="/productDashboard" element={<ProductDashboard />} />
        <Route path="/firm" element={<Firm />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Side Menu Pages */}
        <Route path="/Organic" element={<Organic />} />
        <Route path="/Vedic" element={<Vedic />} />

        {/* Action Pages */}
        <Route path="/Buynow" element={<BuyNow />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

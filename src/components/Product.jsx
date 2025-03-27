// src/components/Product.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api/productApi";

const Product = () => {
  // State to Manage Products
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");

  // Navigation Hook
  const navigate = useNavigate();

  // Load Products Initially
  useEffect(() => {
    loadProducts();
  }, []);

  // Load Products from Firebase
  const loadProducts = async () => {
    const productList = await getProducts();
    setProducts(productList);
    setFilteredProducts(productList); // Initially show all products
  };

  // Filter Products Based on Category
  const filterProducts = (category) => {
    setActiveCategory(category);
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  // Show Product Details
  const showProductDetails = (product) => {
    localStorage.setItem("selectedProductId", product.id); // Save product ID
    navigate("/ProductDashboard");
  };

  return (
    <div className="bg-gray-100 min-h-screen pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">🛒 Products</h1>
          <p className="text-lg text-gray-500 mt-2">
            Explore fresh and organic farm products from{" "}
            <span className="text-green-600 font-bold">SatvaKrishi</span>.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-10 space-x-4">
          {["all", "grains", "pulses", "fruits", "vegetables"].map((category) => (
            <button
              key={category}
              className={`px-5 py-2 rounded-md text-white font-semibold transition duration-300 ${
                activeCategory === category
                  ? "bg-green-600 shadow-lg"
                  : "bg-green-500 hover:bg-green-700"
              }`}
              onClick={() => filterProducts(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:scale-105 transform transition duration-300"
            >
              {/* Product Image */}
              <img
                src={product.imgUrl}
                alt={product.name}
                className="w-full h-48 object-cover"
              />

              {/* Product Info */}
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-green-600 text-lg font-bold mb-3">
                  ₹{product.price.toFixed(2)}
                </p>

                {/* Action Buttons */}
                <div className="flex justify-center space-x-3">
                  <button
                    onClick={() => navigate("/Cart")}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition duration-200"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => showProductDetails(product)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-4 py-2 rounded-md transition duration-200"
                  >
                    Show Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Padding */}
        <div className="mt-12 text-center">
          <p className="text-gray-500">🚜 Bringing freshness from farms to your doorstep!</p>
        </div>
      </div>
    </div>
  );
};

export default Product;

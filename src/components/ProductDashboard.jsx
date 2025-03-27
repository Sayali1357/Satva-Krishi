// src/components/ProductDashboard.js
import React, { useEffect, useState } from "react";

// Farmer and Nutrition Data
const farmerData = {
  1: "Ramesh Patil",
  2: "Sunil Sharma",
  3: "Manoj Verma",
  4: "Aarti Singh",
  5: "Sanjay Deshmukh",
  6: "Preeti Yadav",
  7: "Kishore Kumar",
  8: "Pooja Pandey",
};

const nutritionData = {
  1: ["High Fiber", "Rich in Carbs", "Boosts Energy"],
  2: ["Rich in Iron", "High Protein", "Good for Digestion"],
  3: ["Low Fat", "Vitamin B", "Good for Heart"],
  4: ["Rich in Fiber", "Low Sugar", "Weight Loss"],
  5: ["Vitamin C", "Antioxidants", "Good for Skin"],
  6: ["Potassium Rich", "High Energy", "Prevents Fatigue"],
  7: ["Vitamin A", "Low Calories", "Good for Vision"],
  8: ["Vitamin C", "High Fiber", "Improves Digestion"],
};

const ProductDashboard = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);

  // Load Selected Product from localStorage
  useEffect(() => {
    const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
    if (selectedProduct) {
      setProduct(selectedProduct);
      setTotal(selectedProduct.price); // Initial total for 1 quantity
    } else {
      alert("❗ No product selected. Redirecting to Home...");
      window.location.href = "/product";
    }
  }, []);

  // Update Total Price when Quantity Changes
  useEffect(() => {
    if (product) {
      setTotal(product.price * quantity);
    }
  }, [quantity, product]);

  // Add to Cart
  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      alert(`${product.name} is already in the cart!`);
    } else {
      cart.push({ ...product, quantity });
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${product.name} added to cart with quantity: ${quantity}!`);
      window.location.href = "/cart";
    }
  };

  // Buy Now
  const buyNow = () => {
    if (product) {
      const productToBuy = { ...product, quantity };
      localStorage.setItem("cartToBuy", JSON.stringify([productToBuy]));
      window.location.href = "/BuyNow";
    } else {
      alert("No product selected!");
    }
  };

  // Increase Quantity
  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  // Decrease Quantity
  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  if (!product) {
    return <h2 className="text-center mt-12">Loading product data...</h2>;
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">🌾 Product Dashboard</h1>

      {/* Product Card */}
      <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden mb-8">
        <div className="w-full md:w-1/3">
          <img
            src={product.imgUrl}
            alt={product.name}
            className="w-full h-64 object-cover"
          />
        </div>
        <div className="w-full md:w-2/3 p-6">
          <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
          <p className="text-gray-600">
            <strong>👨‍🌾 Farmer Name:</strong> {farmerData[product.id]}
          </p>
          <p className="text-gray-600 mt-2">
            <strong>💸 Price:</strong> ₹{product.price.toFixed(2)}
          </p>
          <p className="text-gray-600 mt-2">
            <strong>🌱 Nutritious Information:</strong>
          </p>
          <ul className="list-disc ml-6 text-gray-500">
            {nutritionData[product.id].map((info, index) => (
              <li key={index}>{info}</li>
            ))}
          </ul>

          {/* Quantity Control */}
          <div className="flex items-center mt-4">
            <button
              onClick={decrementQuantity}
              className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg"
            >
              ➖
            </button>
            <span className="mx-4 text-lg font-bold">{quantity}</span>
            <button
              onClick={incrementQuantity}
              className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg"
            >
              ➕
            </button>
          </div>

          {/* Total Price */}
          <p className="mt-4 text-lg font-bold text-green-700">
            🧾 Total Price: ₹{total.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md"
          onClick={addToCart}
        >
          🛒 Add to Cart
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md"
          onClick={buyNow}
        >
          💸 Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductDashboard;

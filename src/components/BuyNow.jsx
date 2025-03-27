import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase"; // ✅ Correct import

const Buy = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    pincode: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const navigate = useNavigate();

  // Farmer Data with Location Coordinates and Phone Number
  const farmerData = {
    1: {
      name: "Ramesh Patil",
      location: "19.9975,73.7898",
      phone: "9876543210",
    },
    2: {
      name: "Sunil Sharma",
      location: "18.5204,73.8567",
      phone: "9123456789",
    },
    3: {
      name: "Manoj Verma",
      location: "28.6139,77.2090",
      phone: "9988776655",
    },
    4: {
      name: "Aarti Singh",
      location: "26.9124,75.7873",
      phone: "8901234567",
    },
  };

  // Load Product Details
  useEffect(() => {
    const product = JSON.parse(localStorage.getItem("selectedProduct"));
    if (product) {
      setSelectedProduct(product);
    } else {
      alert("❗ No product selected. Redirecting to Home...");
      navigate("/");
    }
  }, [navigate]);

  // Handle Form Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Select Payment Method
  const selectPayment = (method) => {
    setSelectedPayment(method);
  };

  // Send Order Data to Firestore
  const sendOrderToFirestore = async (trackingLink) => {
    const farmerInfo = farmerData[selectedProduct.id];

    const orderData = {
      productName: selectedProduct.name,
      farmerName: farmerInfo.name,
      farmerPhone: farmerInfo.phone,
      trackingLink: trackingLink,
      customerName: formData.name,
      address: formData.address,
      pincode: formData.pincode,
      paymentMethod: selectedPayment,
      timestamp: new Date(),
    };

    try {
      await addDoc(collection(db, "orders"), orderData);
      console.log("✅ Order stored in Firestore!");
    } catch (error) {
      console.error("❗ Error saving order:", error);
    }
  };

  // Proceed to Payment
  const proceedToPayment = async () => {
    const { name, address, pincode } = formData;

    if (!selectedPayment) {
      alert("💳 Please select a payment method!");
      return;
    }
    if (!name || !address || !pincode) {
      alert("📍 Please fill out all the delivery details.");
      return;
    }

    alert(`✅ Payment Successful via ${selectedPayment.toUpperCase()}!`);
    setOrderPlaced(true);

    // Track Order and Send Notification
    trackOrder(address, pincode);
  };

  // Track Order and Generate Google Maps Link
  const trackOrder = async (address, pincode) => {
    const farmerInfo = farmerData[selectedProduct.id];
    const farmerLocation = farmerInfo?.location;

    if (!farmerLocation) {
      alert("🚜 Farmer's location not found.");
      return;
    }

    // Generate Google Maps Tracking Link
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${farmerLocation}&destination=${encodeURIComponent(
      address + ", " + pincode
    )}`;

    // Save Order Details to Firestore
    await sendOrderToFirestore(googleMapsUrl);

    // Open Google Maps
    window.open(googleMapsUrl, "_blank");
  };

  if (!selectedProduct) return null;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">🛒 Confirm Your Order</h1>

      {/* Product Details */}
      <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden mb-8">
        <div className="w-full md:w-1/3">
          <img
            src={selectedProduct.imgUrl}
            alt={selectedProduct.name}
            className="w-full h-64 object-cover"
          />
        </div>
        <div className="w-full md:w-2/3 p-6">
          <h2 className="text-2xl font-semibold mb-2">{selectedProduct.name}</h2>
          <p className="text-gray-600">
            <strong>👨‍🌾 Farmer Name:</strong> {farmerData[selectedProduct.id]?.name}
          </p>
          <p className="text-gray-600 mt-2">
            <strong>💸 Price:</strong> ₹{selectedProduct.price.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Delivery Form */}
      <h3 className="text-xl font-semibold mb-4">📍 Enter Delivery Location</h3>
      <form className="grid grid-cols-1 gap-4 mb-8">
        <input
          type="text"
          name="name"
          placeholder="👤 Full Name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
        <textarea
          name="address"
          rows="3"
          placeholder="🏡 Address"
          value={formData.address}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="text"
          name="pincode"
          placeholder="📮 Pincode"
          value={formData.pincode}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
      </form>

      {/* Payment Options */}
      <h3 className="text-xl font-semibold mb-4">💳 Select Payment Method</h3>
      <div className="flex gap-4 mb-8">
        {["Card", "UPI", "COD"].map((method) => (
          <div
            key={method}
            className={`cursor-pointer px-6 py-3 rounded-lg border ${
              selectedPayment === method.toLowerCase()
                ? "bg-green-500 text-white border-green-500"
                : "bg-white border-gray-300"
            }`}
            onClick={() => selectPayment(method.toLowerCase())}
          >
            {method === "Card" ? "💳" : method === "UPI" ? "📱" : "💸"} {method}
          </div>
        ))}
      </div>

      {/* Pay Now Button */}
      <div className="flex justify-center">
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
          onClick={proceedToPayment}
        >
          ✅ Pay Now
        </button>
      </div>

      {/* Track Order Button - Only Show After Successful Payment */}
      {orderPlaced && (
        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
            onClick={() => trackOrder(formData.address, formData.pincode)}
          >
            📡 Track Your Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Buy;

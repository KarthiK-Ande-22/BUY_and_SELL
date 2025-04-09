import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Navbar from "../Components/Navbar"; // Ensure correct path
import axios from "axios";

// Function to get user data from JWT token
function getUserDataFromToken() {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Token not found");
    return null;
  }

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.user_details; // Ensure your token has user_details
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}

const Seller = () => {
  const navigate = useNavigate(); // Hook for navigation

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [sellerId, setSellerId] = useState(""); // Will store user ID
  const [error, setError] = useState("");

  // Fetch seller ID from token on component mount
  useEffect(() => {
    const userData = getUserDataFromToken();
    if (userData && userData._id) {
      setSellerId(userData._id);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sellerId) {
      setError("You must be logged in to sell an item.");
      return;
    }

    const itemData = {
      name,
      price,
      category,
      description,
      seller_id: sellerId, // Use extracted seller ID
    };

    console.log("Item Details:", itemData);
    try {
      const response = await axios.post("http://localhost:3000/sell_items", itemData);
      console.log("Item Added Successfully:", response);
      navigate("/home");

    } catch (error) {
      console.error("Error Adding Item:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen p-4 bg-gradient-to-b from-gray-100 to-gray-300">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Buy & Sell Platform</h1>
        <h2 className="mb-6 text-lg">Lowest Prices • Best Quality Shopping</h2>

        <button
          onClick={() => navigate("/home")}
          className="bg-yellow-500 text-white font-bold py-2 px-6 rounded shadow-md hover:bg-yellow-600 transition mb-6"
        >
          Become a Buyer
        </button>

        {/* Add Item Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border border-gray-300">
          <h3 className="text-xl font-semibold mb-4">Add Item to Sell</h3>
          
          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            {/* Item Name */}
            <input
              type="text"
              placeholder="Item Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border rounded"
              required
            />

            {/* Item Price */}
            <input
              type="number"
              placeholder="Item Price (₹)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="p-2 border rounded"
              required
            />

            {/* Item Category */}
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-2 border rounded"
              required
            />

            {/* Item Description */}
            <textarea
              placeholder="Item Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="p-2 border rounded"
              required
            ></textarea>

            {/* Seller ID (Read-Only Field) */}
            <input
              type="text"
              value={sellerId} // Use sellerId from state
              className="p-2 border rounded bg-gray-200 cursor-not-allowed"
              readOnly
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition"
            >
              Add Item
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Seller;

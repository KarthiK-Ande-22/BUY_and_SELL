import React, { useEffect, useState } from "react";
import axios from "axios";
import CartItem from "./cart_item.jsx";
import { jwtDecode } from "jwt-decode";
import Navbar from "../Components/Navbar.jsx";
// import { Link } from "react-router-dom";
// import { set } from "mongoose";

function getUserIdFromToken() {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Token not found");
    return null;
  }

  try {
    const decoded_token = jwtDecode(token);
    return decoded_token.user_details; 

  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [otp, setOTP] = useState(null);
  const [enteredOTP, setEnteredOTP] = useState("");
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [correctOTP, setCorrectOTP] = useState(false);

  console.log(" iam trying to get cart items");

  useEffect(() => {
    const userData = getUserIdFromToken();
    console.log("user " , userData);
    setUser(userData);

  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:3000/cart");
        console.log("cart items are", response.data); 
        console.log("user id is", user._id);
        if(user){
          console.log(" iam trying to get cart items for user", user._id);
          const userCartItems = response.data.filter(item => item.buyer_id === user._id && item.status === 0);
          setCartItems(userCartItems);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [user, correctOTP]);

  const totalCost = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const placeOrder = () => {
    const generatedOTP = Math.floor(100000 + Math.random() * 900000); 
    setOTP(generatedOTP);

    alert(`Your OTP for order confirmation is: ${generatedOTP}`); 
    setShowOTPInput(true); 
  };

  const verifyOTP = async () => {
    if (parseInt(enteredOTP) === otp) {
      
      alert("Order Placed Successfully!");

      try {
        const response=await axios.put(`http://localhost:3000/cart/pending/${user._id}`);  
        console.log("response is", response.data);
  
      } catch (error) {
        console.error("Error updating cart status:", error);
      }

      setShowOTPInput(false);
      setCorrectOTP(true);
    } else {
      alert("Invalid OTP!!!.... Please try again.");
    }
  };





   
  return (
    <>
    <Navbar />
    <div className="container mx-auto p-4 pb-50">
      <h2 className="text-2xl font-bold mb-4">My Cart</h2>
      
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5 px-4">
          {cartItems.map((item) => (
            <CartItem key={item._id} item={item} setCartItems={setCartItems} />
          ))}
        </div>
      )}

      

      
      
    </div>
    

      <div className="container bg-emerald-300 mx-auto p-4 mb-0 fixed bottom-0 left-0 w-full ">
      <h3 className="text-lg font-semibold">Total Price: ₹{totalCost}</h3>
      
      <button onClick={placeOrder} className="mb-2 mr-7 rounded text-white px-4 py-2 text-lg font-semibold fixed bottom-0 right-0 bg-green-800 hover:bg-black">
        Place Order
      </button>

    
      </div>

      

      {/* OTP Input Field & Confirm Order Button */}
      {showOTPInput && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Enter OTP to Confirm Order</h3>

            <input
              type="number"
              value={enteredOTP}
              onChange={(e) => setEnteredOTP(e.target.value)}
              className="border p-2 w-full mb-4"
              placeholder="Enter OTP"
            />

            <button
              onClick={verifyOTP}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Confirm Order
            </button>

            <button
              onClick={() => setShowOTPInput(false)}
              className="w-full bg-red-500 text-white py-2 mt-2 rounded-lg hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
    </>
  );
};

export default Cart;

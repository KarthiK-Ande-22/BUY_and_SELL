import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar.jsx";
import { jwtDecode } from "jwt-decode";

function getUserIdFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.user_details; 
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = getUserIdFromToken();
    if (userData) {
      setUser(userData);
    }
  }, []);

  useEffect(() => {
    if (!user || !user._id) return;

    const my_completed_orders = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/orders/${user._id}`);
        console.log("My Orders:", response.data);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      }
    };

    my_completed_orders();
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 ">
        <h2 className="text-2xl font-bold mb-4">My Orders</h2>

        {orders.length === 0 ? (
          <p className="text-gray-500">You have no completed orders yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
            {orders.map((item) => (
              <div key={item._id} className="border-3 border-[#329729] p-4 rounded shadow-md">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ₹{item.price}</p>
                <p>Category: {item.category}</p>
                <p className="text-green-600 font-bold">Status: Delivered</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;

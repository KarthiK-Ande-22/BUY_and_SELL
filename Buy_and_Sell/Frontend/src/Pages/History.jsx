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


const History = () => {
    const [pendingOrders, setPendingOrders] = useState([]);
    const [soldProducts, setSoldProducts] = useState([]);
    const [user, setUser] = useState(null); 

    useEffect(() => {
        const userData = getUserIdFromToken();
        setUser(userData);
      }, []);
    

  useEffect(() => {
    if (!user) return;

    const myorders = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/history/buyer/${user._id}`);
            console.log(" placed items..........:", response.data);
            setPendingOrders(response.data);
        } catch (error) {
            console.error("Error fetching history:", error);
        }
    };

    const myproducts = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/history/seller/${user._id}`);
            console.log("sold items..........:", response.data);
            setSoldProducts(response.data);
        } catch (error) {
            console.error("Error fetching history:", error);
        }
    };

    
    myorders(); 
    myproducts();
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Order History</h2>

        {/* Pending Orders */}
        <h3 className="text-xl font-bold font-serif mt-4 my-3">Placed Orders (as a Buyer)</h3>
        {pendingOrders.length===0 ? (
          <p className="text-gray-500">No pending orders.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5     gap-4">
            {pendingOrders.map((item) => (
              <div key={item._id} className="border-3 border-[#ca1746] p-4 rounded shadow-md">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ₹{item.price}</p>
                <p>Category: {item.category}</p>
                <p className="text-yellow-600 font-bold">Status: Pending</p>
              </div>
            ))}
          </div>
        )}
        
        {/* Sold Products */}
        <h3 className="text-xl font-bold font-serif mt-10 my-3 ">Sold Products (as a Seller)</h3>
        {soldProducts.length===0? (
          <p className="text-gray-500">No sold products.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {soldProducts.map((item) => (
              <div key={item._id} className="border-3 border-[#329729] p-4 rounded shadow-md">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p>Buyer: {item.buyer_id}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ₹{item.price}</p>
                <p>Category: {item.category}</p>
                <p className="text-green-600 font-bold">Status: Sold</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default History;

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
}

const Delivery = () => {

  console.log(" iam trying to get delivery items");

  const [soldItems, setSoldItems] = useState([]);
  const [user, setUser] = useState(null);
  const [enteredOTP, setEnteredOTP] = useState("");
  const [correctOTP, setCorrectOTP] = useState(false);

  useEffect(() => {
    const userData = getUserIdFromToken();
    setUser(userData);
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchSoldItems = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/delivery/${user._id}`);
        setSoldItems(response.data);
        console.log("items..........:", response.data);
      } catch (error) {
        console.error("Error fetching sold items:", error);
      }
    };

    fetchSoldItems();
  }, [user, correctOTP]);

  const Confirm = async (item) => {

    const correctOTP=item.otp;
    console.log("Correct OTP:", correctOTP);
    const enteredOTPNumber = parseInt(enteredOTP, 10);
    if (enteredOTPNumber !== correctOTP) {
      console.error("Incorrect OTP");
      return;
    }


    console.log("u entered correct OTP");

    try {
      console.log("I am trying to confirm delivery");

      console.log("Item to confirm:", item._id);
      const response = await axios.put(`http://localhost:3000/delivery/confirm/${item._id}`, {otp: enteredOTP});
      console.log(response.data);

      setCorrectOTP(true);
    } catch (error) {
      console.error("Error confirming delivery:", error);
    }

  };


  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Delivery - Sold Products</h2>

        {soldItems.length === 0 ? (
          <p className="text-gray-500">No items have been sold yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {soldItems.map((item) => (
              <div key={item._id} className="border-3 border-[#ca1746] p-4 rounded shadow-md ">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p>Buyer: {item.buyer_id}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ₹{item.price}</p>
                <p>Category: {item.category}</p>
                {/* <p className="text-green-600 font-bold">Status: Pending</p>  */}
                <input type="number" 
                        placeholder="Enter OTP"
                        className="border p-1 rounded w-full mt-2"
                        value={enteredOTP}
                        onChange={(e) => setEnteredOTP(e.target.value)}
                />
                <button onClick={() => Confirm(item)}className="bg-green-700 text-white px-4 py-2 rounded mt-2 hover:bg-black">
                  Confirm Delivery
                </button>
                
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Delivery;

import React, { useState, useEffect, use } from "react";
import { useParams } from "react-router-dom";  // Import useParams
import axios from "axios";
import Item from "../Pages/Item";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import item from "../../../Backend/Database/item";
import {jwtDecode} from "jwt-decode";

function getUserDataFromToken() {

  const token = localStorage.getItem("token");
  if (!token){
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

const ItemsPage = () => {
  const { category, name } = useParams(); // Get category & name from URL
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);


  useEffect(() => {
    const userData = getUserDataFromToken();
    setUser(userData);
  }, []);


  useEffect(() => {
    console.log("Fetching items for:", category, name);

    const fetchItems = async () => {
      try {
        console.log("i am in items page frontend");

        const response = await axios.get(`http://localhost:3000/items/${category}/${name}`);
        console.log("Fetched items:", response.data);
        setItems(response.data);
      } catch (error) {
        setError("An error occurred");
        console.error("🚨 Error fetching items:", error);
      }
    };

    fetchItems();
  }, [category, name]); // Re-fetch when category or name changes

  return (
    <>
      <Navbar />
      <h1 className="text-2xl font-bold text-center mt-8 ">Explore Our Products</h1>
      <h1 className="text-2xl font-serif text-center ">"Sales are a transfer of enthusiasm from the salesperson to the customer." </h1>
      {error && <p className="text-center text-red-500">{error}</p>}  
      
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 px-8">
        {items.length > 0 ? (
  items.filter((item) => item.seller_id !== user._id) // Filter out items where seller_id == user._id
    .map((item) => <Item key={item._id} item={item} />)
) : (
  <p>No items available</p>
)}
      </div>
      <footer>

      
      <div className="text-center "> Want to be part of our seller's family....? 
      <Link to="/seller" className="text-blue-600 hover:bg-yellow-300 ">Become a seller</Link>
      </div>
      </footer>

      {/* <div>
      <footer className="bg-gray-700 p-4 text-white text-center">Want to be part of our seller's family....? .</footer>
    </div> */}
    </>
  );
};

export default ItemsPage;

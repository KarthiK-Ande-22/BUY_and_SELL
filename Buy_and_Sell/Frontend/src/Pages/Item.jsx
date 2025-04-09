import React, { useEffect } from 'react'
import { useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios';

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




const Item = ({item}) => {

  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const userData = getUserDataFromToken();
    setUser(userData);
  }, []);

    const addToCart = async (item) => {
      console.log(" iam trying to Add to cart");

      if (!user) {
        console.error("User not found");
        return;
      }
        const cartItem = {
            name: item.name,
            price: item.price,
            category: item.category,
            description: item.description,
            quantity: 1,
            buyer_id: user._id,
            seller_id: item.seller_id,
            status: 0,
            otp:-1,
        };

        try {
          const response = await axios.post('http://localhost:3000/to_cart', cartItem);
          console.log(response.data);
          setCart([...cart, cartItem]);
          console.log("Item added to cart");
          
        } catch (error) {
            console.error('Error adding to cart:', error);
            
          
        }
    };


  return (
    <>
    
    <div key={item._id} className="bg-blue-100 p-4 rounded shadow-md ">
                <h2 className="text-xl font-bold"> {item.name}</h2>
                <p className="text-lg text-gray-600">Price: ₹{item.price}</p>
                <p className="text-gray-600">Category: {item.category}</p>
                <p className="text-black ">Description: {item.description}</p>
                <p className="text-gray-500">Sold by: {item.seller_id}</p>
                <button onClick={() => addToCart(item)}
                  className="mt-4 bg-violet-700 text-white px-4 py-2 rounded hover:bg-blue-800">
                  Add to Cart
                </button>
    </div>
    </>
  )
}

export default Item;
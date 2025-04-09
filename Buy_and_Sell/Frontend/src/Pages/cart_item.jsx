import React from "react";
import axios from "axios";
import{useState} from "react";

const CartItem = ({ item, setCartItems }) => {
  
    const removeFromCart = async () => {
        try {
            console.log("I am trying to remove in front end");
            console.log("Item to remove:",  item._id);
            const response = await axios.delete(`http://localhost:3000/cart/delete/${item._id}`);
            console.log(response.data);
            setCartItems((prevItems) =>
                prevItems.filter((cartItem) => cartItem._id !== item._id)
            );
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };

  return (
    <div className="bg-gray-200 shadow-md rounded p-4 flex flex-col gap-2">
      <h3 className="text-lg font-bold">{item.name}</h3>
      <p><span className="font-bold text-xs">Price:</span> ₹{item.price}</p>
      <p><span className="font-bold text-xs">Category:</span> {item.category}</p>
      <p><span className="font-bold text-xs">Description:</span> {item.description}</p>
      <p><span className="font-bold text-xs">Quantity:</span> {item.quantity}</p>
      <p><span className="font-bold text-xs">Seller ID:</span> {item.seller_id}</p>
      {/* <p><span className="font-bold text-xs">Buyer ID:</span> {item.buyer_id}</p> */}
      
      <button onClick={removeFromCart}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-800">
                  Remove
                </button>

                
    </div>
  );
};

export default CartItem;

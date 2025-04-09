import React from "react";

const Order_item = ({ order }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded mb-2">
      <h3 className="text-lg font-semibold">{order.name}</h3>
      <p className="text-gray-600">Price: ₹{order.price}</p>
      <p className="text-gray-500">Status: {order.status}</p>
      
    </div>
  );
};  

export default Order_item;

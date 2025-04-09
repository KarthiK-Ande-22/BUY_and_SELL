import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  buyer_id: { type: String , required: true }, 
  seller_id: { type: String , required: true },
  status: { type: Number, required: true },
  otp: { type: Number, required: true },
});

const cartItem = mongoose.model("Cart", CartSchema);

export default cartItem;

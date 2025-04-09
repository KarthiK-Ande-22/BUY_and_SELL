import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  seller_id: { type: String , required: true }, 
});

const item = mongoose.model("Item", ItemSchema);

export default item;

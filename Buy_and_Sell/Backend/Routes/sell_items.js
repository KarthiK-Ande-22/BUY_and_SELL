import express from "express";
import Item from "../Database/item.js";

const router = express.Router();



router.post("/", async (req, res) => {
  try {

    console.log(" I am in sell_items.js page backend");
    const { name, price, category, description,seller_id } = req.body;
    console.log("Seller ID:", seller_id);

    if (!name || !price || !category || !description) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    
    console.log(req.body);

    const newItem = new Item({ name, price, category, description, seller_id });
    await newItem.save();

    res.status(201).json({ message: "Item added successfully!", item: newItem });
  } catch (error) {
    res.status(500).json({ message: "Server Error"});
  }
});




export default router;

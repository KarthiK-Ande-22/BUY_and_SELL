import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import Register from "./Routes/Registration_user.js";
import Login from "./Routes/Login_user.js";
import Profile from "./Routes/profile_page.js";
import Search_Products from "./Routes/search_items.js";
import sell_items from "./Routes/sell_items.js";
import to_cart from "./Routes/to_cart.js";
import cart from "./Routes/cart.js";
import delivery from "./Routes/delivery.js";
import History from "./Routes/history.js";
import Orders from "./Routes/orders.js";

// Load environment variables
dotenv.config();

// Initialize Express ap
const app = express();


// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON body
app.use(express.urlencoded({ extended: false }));


const PORT = process.env.PORT || 8000;

// Connect to MongoDB
const mango_url=process.env.MONGO_URI;
mongoose.connect(mango_url, {

})
.then(() => console.log("MongoDB connected!"))
.catch(err => console.error(" MongoDB connection error:", err));



// Routes
app.use("/register", Register);
app.use("/login", Login);
app.use("/profile", Profile);
app.use("/items", Search_Products);
app.use("/sell_items", sell_items);
app.use("/to_cart", to_cart);
app.use("/cart", cart);
app.use("/delivery", delivery);
app.use("/history", History);
app.use("/orders", Orders);






app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

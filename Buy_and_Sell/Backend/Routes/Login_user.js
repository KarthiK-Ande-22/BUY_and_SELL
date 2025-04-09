import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import user_details from "../Database/user.js";



const Login = express.Router();



// LOGIN USER
Login.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ message: "Please fill all fields!" });
    }


    const user = await user_details.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found! Please register first." });
    }


    // Check if the password is correct
    const pass = await bcrypt.compare(password, user.password);
    if (!pass) {
      return res.status(400).json({ message: "Invalid credentials! Please try again." });
    }

    // Generate JWT token
    const token = jwt.sign({ user_details:user}, process.env.JWT_SECRET,{ expiresIn: '1h' });

    res.status(200).json({
      message: "Login successful!",
      token,
      userDetails: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        age: user.age,
        contactNumber: user.contactNumber,
      }
    });

  } catch (err) {
    res.status(500).json({  message: "Server Error" });
  }

});

export default Login;


import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Database/user.js";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const Register = express.Router();

// REGISTER USER
Register.post("/", async (req, res) => {
  console.log("Registering user...");
  console.log(req.body);
  try {
    const { firstName, lastName, email, age, contactNumber, password } = req.body;


    const existing_user = await User.findOne({ $or: [{ email }, { contactNumber }] });
    if (existing_user) {
      return res.status(409).json({ message: "User already exists with this email or contact number!" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user in the database
    const newuser = new User({ 
      firstName, 
      lastName,
      email,
      age, 
      contactNumber, 
      password: hashedPassword 

    });

    await newuser.save();
    // id: newuser._id

    const token = jwt.sign({  user_details:newuser },process.env.JWT_SECRET );

    res.status(201).json({
      message: "User registered successfully!",
      userDetails: {
        id: newuser._id,
        firstName: newuser.firstName,
        lastName: newuser.lastName,
        email: newuser.email,
        age: newuser.age,
        contactNumber: newuser.contactNumber
      }
    });
  } catch (err) {
    res.status(500).json({ message:"server error" });
  }
});

export default Register;

import express from "express";
import jwt from "jsonwebtoken";
import User from "../Database/user.js";

const router = express.Router();

// Middleware to verify JWT token
const auth = (req, res, next) => {
  const auth_header = req.header("Authorization");

  if (!auth_header) {
    return res.status(401).json({ message: "Access Denied. No Token Provided!" });
  }

  try {
    
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data; 
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token!" });
  }
};


router.get("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//UPDATE 

router.put("/update", auth, async (req, res) => {
    try {
      const { firstName, lastName, age, contactNumber } = req.body;
  
      // Validate phone number
      const phoneno = /^[0-9]{10}$/;
      if (contactNumber && !phoneno.test(contactNumber)) {
        return res.status(400).json({ message: "Invalid contact number! Must be 10 digits." });
      }

      const id=parseInt(req.params.id);
      const user=await User.findById(id);
      user.firstName=firstName;
      user.lastName=lastName;
      user.age=age;
      user.contactNumber=contactNumber;
      await user.save();
      
      res.json({ message: "Profile updated successfully!", user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: "Server error!" });
    }
  });
  

export default router;


import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  contactNumber: { type: String, required: true , unique: true },
  password: { type: String, required: true }, // Hashed password
});

const userdata = mongoose.model("User", userSchema);

export default userdata;
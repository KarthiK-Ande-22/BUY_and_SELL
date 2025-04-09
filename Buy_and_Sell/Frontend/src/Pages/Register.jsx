import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // Importing Eye icons
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const create = async (e) => {
    e.preventDefault();
    
    

    if(!email.endsWith("@iiit.ac.in")){
        setError("Only IIIT emails are allowed!");
        return;
    }

    if (isNaN(age) || age.trim() === "") {
      setError("Age must be a valid number");
      return;
    }

    if (contactNumber.length !== 10 || isNaN(contactNumber)) {
        setError("Invalid contact number! Must be a 10-digit number.");
        return;
    }

    if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
    }
      
      const user_data={
            firstName,
            lastName,
            email,
            age,
            contactNumber,
            password
      }

    try {
      console.log("Registering user...at frontend");
        const response = await axios.post("http://localhost:3000/register", user_data);
        setSuccess("Registration Successful! Redirecting...");
      navigate("/profile");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <>
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl text-blue-600 font-bold">Looks like you're new here!</h2>
      <h3 className="text-base my-4 text-green-700">Sign up with your mobile number to get started</h3>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={create} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          name="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border rounded"
          name="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border rounded"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border rounded"
          type="number"
          name="age"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border rounded"
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          required
        />

        {/* Password Field with Show/Hide Toggle */}
        <div className="relative">
          <input
            className="w-full p-2 border rounded pr-10"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-800"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button className="w-full bg-yellow-500 text-black p-2 rounded" type="submit">
          Register
        </button>

        <div className='flex justify-center items-center w-full text-sm'>
          already have an account?{' '}
        <Link to='/login' className='hover:text-orange-300 text-blue-600'>
            Sign In
          </Link>
        </div>

      </form>
    </div>
    </>
  );
};

export default Register;

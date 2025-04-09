import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // Importing Eye icons
import { Link } from "react-router-dom";
import axios from "axios";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginn = async(e) => {

    e.preventDefault();
    setError(""); 

    if (!email.endsWith("@iiit.ac.in")) {
      setError("Only IIIT emails are allowed!");
      return;
    }

    try {
        const response = await axios.post("http://localhost:3000/login", { email, password });

        
      localStorage.setItem("token", response.data.token); // Store JWT token in local storage
      localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user details

      console.log("Login Successful:", response.data);
      navigate("/profile");

    } catch (err) {
        setError(err.response?.data?.message || "Something went wrong!");
    }


  };

  

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl text-blue-600 font-bold mb-4">Login</h2>
      <h3 className="text-green-700">Get access to your Orders, Wishlist, and Recommendations</h3>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={loginn} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password Field with Show/Hide Toggle */}
        <div className="relative">
          <input
            className="w-full p-2 border rounded pr-10"
            type={showPassword ? "text" : "password"}
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

        <button className="w-full bg-yellow-500 text-black p-2 rounded hover:bg-green-600 transition" type="submit">
          Login
        </button>
        <div>
            No account ?
        <Link to='/register' className='hover:text-orange-300 text-blue-600'>
            Register Now
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

import { useNavigate } from "react-router-dom";
import iiithLogo from "../assets/iiit.avif";



const LoginAndRegister = () => {
  const navigate = useNavigate(); // Initialize navigation

  return (
    <div 
      className="relative flex flex-col items-center justify-center min-h-screen bg-blue-200"
      style={{
        backgroundImage: `url(${iiithLogo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 text-center text-white">

        <h1 className="text-4xl font-extrabold text-white mb-4">Buy-Sell <span className="text-red-400">IIIT Hyderabad</span></h1>

        <h2 className="text-3xl font-bold mb-6">Welcome</h2>
        <p className="text-lg mb-4">Choose an option to continue:</p>

        <div className="space-y-4">
          <button 
            onClick={() => navigate("/login")} 
            className="w-64 bg-white text-red-900 p-3 rounded-lg shadow-lg  hover:bg-yellow-600 transition"
          >
            Login
          </button>



          <button 
            onClick={() => navigate("/register")} 
            className="w-64 bg-red-400 text-white p-3 rounded-lg shadow-lg  hover:bg-yellow-600 transition"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginAndRegister;

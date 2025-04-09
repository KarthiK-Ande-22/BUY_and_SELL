import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { GraduationCap, Wifi, Utensils, Users, Home, Landmark, Club } from "lucide-react";



const iiitPortals = [
  { name: "IMS", description: "Integrated Management System", icon: <GraduationCap size={20} />, url: "https://ims.iiit.ac.in" },
  { name: "INTRANET", description: "Internal Network Access", icon: <Wifi size={20} />, url: "https://intranet.iiit.ac.in" },
  { name: "MESS", description: "Mess Menu and Services", icon: <Utensils size={20} />, url: "https://mess.iiit.ac.in" },
  { name: "MOODLE", description: "Courses Website", icon: <Users size={20} />, url: "https://moodle.iiit.ac.in" },
  { name: "CLUBS", description: "Explore the clubs and student bodies", icon: <Club size={20} />, url: "https://clubs.iiit.ac.in" },
  { name: "IIITH", description: "Main Website", icon: <Landmark size={20} />, url: "https://www.iiit.ac.in" },
];


// bg-gradient-to-b from-cyan-200 to-orange-300
// from-[#6be4e7] to-[#d0b265]


const Homepage = () => {
  const navigate = useNavigate();



  return (
    
    <div className="text-center  bg-gradient-to-b from-cyan-200 to-orange-100 min-h-screen">
      <Navbar />

      <h1 className="text-3xl font-bold mt-6 mb-2">Welcome to the Buy & Sell Platform</h1>
      <h2 className="text-lg text-gray-600 mb-6">Lowest Prices | Best Quality Shopping</h2>

      
      <button
        onClick={() => navigate("/seller")}
        className="mb-10 bg-orange-500 text-white font-bold py-2 px-6 rounded shadow-md hover:bg-yellow-600 transition"
      >
        Become a Seller
      </button>


      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-semibold mb-6">Popular Portals</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {iiitPortals.map((portal, index) => (
            <a
              key={index}
              href={portal.url}
              target="_blank"
              className="block bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition duration-300"
            >
              {/* bg-[#a48149] */}

              <div className="bg-[#b77f54] text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-[#a07261]">
                {portal.icon} <span className="text-lg font-semibold">{portal.name}</span>
              </div>

              <p className="text-gray-800 mt-3">{portal.description}</p>

            </a>

          ))}

        </div>
      </div>
    </div>
  );
};

export default Homepage;

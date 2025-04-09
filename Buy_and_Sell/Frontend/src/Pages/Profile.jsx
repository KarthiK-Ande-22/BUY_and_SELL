import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { jwtDecode } from "jwt-decode";
import { User, Mail, Calendar, Phone, Pencil,MapPin, GraduationCap } from "lucide-react";

function getUserDataFromToken() {

  const token = localStorage.getItem("token");
  if (!token){
    console.error("Token not found");
    return null;
  }

  try {
    const decoded_token = jwtDecode(token);
    return decoded_token.user_details; 
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}

function info_update(){
  console.log("Update the user info");
}


function Profile() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const userData = getUserDataFromToken();
    setUser(userData);
    // console.log("User data: at profile after token", userData);
  }, []);

  console.log("User data: at profile...................", user);
  if (!user) {
    return <div className="text-center mt-10">User not found...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-slate-200 to-white">
      
        <div className="bg-white shadow-xl rounded-lg p-8 w-[400px] text-center">
          {/* Profile Avatar */}
          
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="text-fuchsia-500 w-12 h-12" />
          </div>

          <h2 className="text-2xl font-semibold text-gray-800">{user.firstName} {user.lastName}</h2>
          <p className="text-gray-500 mb-4 flex items-center justify-center gap-2">
            <Mail className="w-5 h-5 text-gray-500" /> {user.email}
          </p>

          <div className="text-left text-gray-700 space-y-3">
            <p className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span className="font-semibold text-gray-800">Age:</span> {user.age}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-gray-500" />
              <span className="font-semibold text-gray-800">Contact:</span> {user.contactNumber}
            </p >
            <p className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-500" />
              <span className="font-semibold text-gray-800">Location:</span> {user.location || "IIIT Hyderabad"}
            </p>
            <p className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-gray-500" />
              <span className="font-semibold text-gray-800">Education:</span> {user.education || "Student"}
            </p>
          </div>

          {/* Edit Button */}
          <button className="mt-6 w-full bg-orange-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded flex items-center justify-center gap-2">
            <Pencil className="w-5 h-5" />
            Edit Profile
          </button>
        </div>
      </div>
    </>
  );
};




export default Profile;

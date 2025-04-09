import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginAndRegister from "./Pages/LoginAndRegister.jsx"; 
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Profile from "./Pages/Profile.jsx";
import Homepage from "./Pages/Homepage.jsx";
import Orders from "./Pages/Orders.jsx";
import ItemsPage from "./Pages/ItemsPage.jsx";
import Seller from "./Pages/seller.jsx";
import CartPage from "./Pages/cart.jsx";
import Delivery from "./Pages/Delivery.jsx";
import History from "./Pages/History.jsx";


const App = () => {
  return (
    <Router>
      
      <Routes> 
        <Route path="/" element={<LoginAndRegister />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/items/:category/:name" element={<ItemsPage />} />
        <Route path="/seller" element={<Seller />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/order-history" element={<History />} />



        
      </Routes>
    </Router>
  );
};

export default App;

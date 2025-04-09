import axios from "axios";
import { useState ,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Home, User, Package, Truck, History, LogOut } from "lucide-react";




const Navbar = () => {
  
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState(["All"]);
  const [category, setCategory] = useState("All");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // Redirect to login page
  };

  useEffect(() => {
    const fetchCategories = async ()=> {
      try {
        // console.log("i am trying to fetch categories");
        const response =await axios.get("http://localhost:3000/items/categories");
        setCategories(["All", ...response.data]);

        // console.log("Categories fetched");

      } catch (error) {
        setError("An error occurred");
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);



  const handleSearch = () => {
    const searchvalue = search.trim()!==""? search.toLowerCase() : "all";
    const categoryvalue = category !== "All" ? category : "all";
    console.log("Navigating to:", `/items/${categoryvalue}/${searchvalue}`);
    navigate(`/items/${categoryvalue}/${searchvalue}`);
  
  };

  return (
    // bg-blue-500
    // bg-[#5169e0] 
    // bg-[#13757b]
    <nav className="  bg-[#046e73]  text-white p-4 shadow-md">
      <div className="container flex justify-between items-center">
        {/* Logo */}

        <h1 className="text-3xl font-bold">
          <Link to="/home">Buy & Sell</Link>
        </h1>

        {/* Search Bar with Category Selection */}
        <div className="flex items-center gap-2">
          {/* Category Dropdown */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-white text-black px-0 py-2 rounded hover:bg-red-200"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>

            ))}
          </select>

          {/* Search Input */}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search"
            className="bg-white text-black h-10 px-2 rounded"
          />

          {/* Search Button */}
          <button
            onClick={handleSearch} // Calls function on button click
            className="bg-yellow-300 text-black px-4 py-2 rounded hover:bg-yellow-500"
          >
            Search
          </button>

        </div>

        {/* Menu for larger screens */}
        <ul className="hidden md:flex gap-6 text-lg">
          <li>
          <Link to="/home" className="flex flex-col items-center hover:text-yellow-300">
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
          </li>

          <li>
          <Link to="/profile" className="flex flex-col items-center hover:text-yellow-300">
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
          </li>

          <li>
          <Link to="/orders" className="flex flex-col items-center hover:text-yellow-300">
          <Package className="w-6 h-6" />
          <span className="text-xs mt-1">Orders</span>
        </Link>
          </li>

          <li>
          <Link to="/order-history" className="flex flex-col items-center hover:text-yellow-300">
          <History className="w-6 h-6" />
          <span className="text-xs mt-1">History</span>
        </Link>
          </li>

          <li>
          <Link to="/delivery" className="flex flex-col items-center hover:text-yellow-300">
          <Truck className="w-6 h-6" />
          <span className="text-xs mt-1">Delivery</span>
        </Link>
          </li>
          <li>
          <Link to="/cart" className="flex flex-col items-center hover:text-yellow-300">
          <ShoppingCart className="w-6 h-6" /> {/* Cart Icon */}
          <span className="text-xs mt-1">Cart</span> {/* Cart Label */}
        </Link>
          </li>

          <li>
            <button className="flex flex-col items-center hover:text-red-500" onClick={() => handleLogout()}>
            <LogOut className="w-6 h-6" />
            <span className="text-xs mt-1">LogOut</span>
            </button>
            {/* <Link to="/login" className="flex flex-col items-center hover:text-yellow-300">
          <LogOut className="w-6 h-6" />
          <span className="text-xs mt-1">LogOut</span>
        </Link> */}

        </li>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

import { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-black p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="text-red-500 text-2xl font-bold transition-transform duration-300 hover:scale-110">
          <Link to="/mystream">MyStream</Link>
        </div>
        <div className="hidden md:flex space-x-4 text-white">
          <Link to="/" className="hover:text-red-400">Home</Link>
          <Link to="/movies" className="hover:text-red-400">Movies</Link>
          
          {/* Dropdown untuk Your Rating dan My List */}
          <div className="relative">
            <button
              className="hover:text-red-400 focus:outline-none flex items-center"
              onClick={toggleDropdown}
            >
              More
              {isDropdownOpen ? (
                <FaChevronUp className="ml-1" />
              ) : (
                <FaChevronDown className="ml-1" />
              )}
            </button>
            {isDropdownOpen && (
              <div className="absolute menu bg-gray-900 text-white mt-2 w-36 rounded-box z-[1] w-30 p-2 shadow">
                <ul className="py-2">
                <li>
  <Link
    to="/rated-movies"
    className="block px-5 py-2 hover:bg-white-800"
    onClick={() => setIsDropdownOpen(false)} // Perbaikan di sini
  >
    ⭐My Rating
  </Link>
</li>
<li>
  <Link
    to="/mylist"
    className="block px-5 py-2 hover:bg-white-800"
    onClick={() => setIsDropdownOpen(false)} // Perbaikan di sini
  >
    📝My List
  </Link>
</li>
<li>
  <Link
    to="/genre"
    className="block px-5 py-2 hover:bg-white-800"
    onClick={() => setIsDropdownOpen(false)} // Perbaikan di sini
  >
    🎬Genre
  </Link>
</li>

                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Input Search dan Dropdown Profil */}
      <div className="relative flex items-center space-x-4">
        <input 
          type="text" 
          placeholder="Search" 
          className="hidden md:block px-2 py-1 rounded bg-gray-800 text-white focus:ring-red-500" 
        />
        <div className="dropdown dropdown-bottom dropdown-end">
          <div tabIndex={0} role="button" className="w-10 rounded-full cursor-pointer">
            <img
              src="https://i.pinimg.com/736x/b8/66/61/b86661910ee332bb6a381c580c37c08a.jpg"
              alt="User Avatar"
              className="rounded-full transition-transform duration-300 hover:scale-110"
            />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-gray-900 text-white rounded-box z-[1] w-30 p-2 shadow"
          >
            <li>
              <Link to="/profile" className="hover:bg-white-800">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/settings" className="hover:bg-white-800">
                Settings
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:bg-white-800">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

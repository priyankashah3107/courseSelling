import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../style";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";


const logoutUser = async () => {
  try {
    const res = await axios.post("/api/v1/auth/logout");
    return res;
  } catch (error) {
    console.log("Error on Logout the Profile", error);
    throw error;
  }
};
const Navbar = ({ authUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { mutate, isError, error } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      navigate("/login"); // Redirect after successful logout
    },
  });

  const handleLogout = () => {
    mutate();
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="text-white bg-gradient-to-t from-[#323240] to-[#121420] relative z-10 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <h1 className="text-xl font-bold font-['Poppins']">
          Tech <span className="text-gradient">Point</span>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-lg">
          {authUser ? (
            <>
              <button
                onClick={() => handleNavigation("/allcourses")}
                className="text-white hover:text-gray-300"
              >
                Courses
              </button>
              <button
                onClick={() => handleNavigation("/mypurchases")}
                className="text-white hover:text-gray-300"
              >
                Purchases
              </button>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-b from-[#def9fa] via-[#bef3f5] to-[#33bbcf] px-4 py-2 rounded text-black font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleNavigation("/signup")}
                className="bg-gradient-to-b from-[#def9fa] via-[#bef3f5] to-[#33bbcf] px-4 py-2 rounded text-black font-semibold"
              >
                Sign Up
              </button>
              <button
                onClick={() => handleNavigation("/login")}
                className="bg-gradient-to-b from-[#def9fa] via-[#bef3f5] to-[#33bbcf] px-4 py-2 rounded text-black font-semibold"
              >
                Login
              </button>
            </>
          )}
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none text-white text-2xl"
          >
            {isMenuOpen ? <span>&times;</span> : <span>&#9776;</span>}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-gray-800 to-gray-900 text-white py-6 px-4 space-y-4 rounded-lg shadow-lg">
          {authUser ? (
            <>
              <button
                onClick={() => handleNavigation("/allcourses")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
              >
                Courses
              </button>
              <button
                onClick={() => handleNavigation("/mypurchases")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
              >
                Purchases
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left bg-gradient-to-b from-[#def9fa] via-[#bef3f5] to-[#33bbcf] px-4 py-2 rounded text-black font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleNavigation("/signup")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
              >
                Sign Up
              </button>
              <button
                onClick={() => handleNavigation("/login")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
              >
                Login
              </button>
            </>
          )}
        </div>
      )}

      {isError && <p className="text-red-500 text-center">Logout Failed: {error.message}</p>}
    </nav>
  );
};

export default Navbar;

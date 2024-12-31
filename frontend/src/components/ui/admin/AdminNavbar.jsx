import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";


const logoutUser = async () => {
  try {
    const res = await axios.post("/api/v1/admin/logout");
    return res;
  } catch (error) {
    console.log("Error on Logout the Profile", error);
    throw error;
  }
};
const AdminNavbar = () => {
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

 
  const {data: adminUser} = useQuery({
    queryKey: ["adminUser"],
    queryFn: async() => {
      try {
        const res = await fetch("http://localhost:8080/api/v1/auth/me", {
          credentials: "include", // Ensure cookies are sent
        });
        const data = await res.json();
        if (!res.ok || data.error) {
          console.error("Error fetching admin user:", data.error || "Unknown error");
          return null;
        }
        return data;
      } catch (error) {
        console.error("Error in queryFn:", error);
        return null;
      }
    },
    retry: false
  })

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="text-white bg-[#efefef] relative z-10 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <h1 className="text-xl font-bold font-['Poppins'] text-[#2d2d2d]">
          Tech <span className="">Point</span>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-lg">
          {adminUser ? (
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
                onClick={() => handleNavigation("/adminsignup")}
                className="bg-[#2d2d2d] px-4 py-2 rounded text-white font-semibold"
              >
                Sign Up
              </button>
              <button
                onClick={() => handleNavigation("/adminlogin")}
                className="bg-[#2d2d2d] px-4 py-2 rounded text-white font-semibold"
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
            className="focus:outline-none text-black text-2xl"
          >
            {isMenuOpen ? <span>&times;</span> : <span>&#9776;</span>}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white  text-black py-6 px-4 space-y-4 rounded-lg shadow-lg">
          {adminUser ? (
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
                onClick={() => handleNavigation("/adminsignup")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
              >
                Sign Up
              </button>
              <button
                onClick={() => handleNavigation("/adminlogin")}
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

export default AdminNavbar;

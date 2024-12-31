import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import styles from "../../../../style";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Refetch user data after login
  const { data: adminUser } = useQuery({
    queryKey: ["adminUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/v1/auth/me", {
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
    retry: false, // Prevent automatic fetching
  });

  // Handle login
  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: async (formData) => {
      const res = await axios.post("http://localhost:8080/api/v1/admin/login", formData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Successfully Logged In 🎉");
       // Refetch the admin user data
      navigate("/admin");
    },
    onError: (err) => {
      toast.error(`Login Failed: ${err.response?.data?.message || err.message}`);
    },
  });


  if(adminUser) {
    navigate('/admin')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[#efefef] w-full h-screen p-10">
      <div className="w-full max-w-md mx-auto p-8 rounded-xl bg-white">
        <h2 className={`${styles.heading2} text-center mb-6`}>Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
              size={20}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-300 border border-dimWhite text-black placeholder-black"
              required
            />
          </div>

          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
              size={20}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-300 border border-dimWhite text-black placeholder-black"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg ${styles.button} bg-[#141414] text-white font-bold`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {isError && (
          <p className="text-red-500 text-center mt-4">
            {error.response?.data?.message || "Something went wrong"}
          </p>
        )}

        <p className="text-[#323232] text-center mt-4">
          Don't have an account?{" "}
          <a href="/adminsignup" className="text-blue-700 hover:text-black">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdminLoginPage;

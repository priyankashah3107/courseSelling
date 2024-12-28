import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import styles from "../../style";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // using tanstack to connect the fe to be 
  // We can establish a connection using fetch requests, Axios, or the useEffect hook. Additionally, we can use a custom useFetch hook for this purpose. However, using TanStack Query is a better option because it provides powerful features like caching, automatic updates, and better state management for asynchronous data.
// usMutation hook accept mutate, onSucces, onError, onSettle functions
  const {mutate, isLoading, isError, error} = useMutation({
    mutationFn:  async(formData) => {
     try {
       // making a post request
       const res = await axios.post("/api/v1/auth/login", 
         formData
       );
       console.log("Login data from LoginPage", formData)
       return res.data
     } catch (error) {
      console.log("Error while login to the profile", error)
      throw error;
     }
    },
    onSuccess: () => {
       toast.success("Successfully Login 🎉")
    },
    onError: (err) => {
     toast.error(`Login Failed ${err.response?.data?.message || err.message}`)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login data:", formData);
    mutate(formData)
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-primary w-full h-screen p-10 ">
      <div className="w-full max-w-md mx-auto p-8 rounded-xl bg-black-gradient">
        <h2 className={`${styles.heading2} text-center mb-6`}>Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dimWhite"
              size={20}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-black-gradient-2 border border-dimWhite text-white placeholder-dimWhite"
              required
            />
          </div>

          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dimWhite"
              size={20}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-black-gradient-2 border border-dimWhite text-white placeholder-dimWhite"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}

            className={`w-full py-3 px-4 rounded-lg ${styles.button} bg-secondary text-black font-bold`}
          >
           {isLoading ? "Login.." : "Login"}
          </button>
        </form>
           
        {isError && (
         <p className="text-red-500 text-center mt-4" >{error.response?.data?.message || "Something went Wrong"}</p>
         )}


        <p className="text-dimWhite text-center mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-secondary hover:text-white">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

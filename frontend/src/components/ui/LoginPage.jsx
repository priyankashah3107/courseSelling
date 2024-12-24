import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import styles from "../../style";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login data:", formData);
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
            className={`w-full py-3 px-4 rounded-lg ${styles.button} bg-secondary text-black font-bold`}
          >
            Login
          </button>
        </form>

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

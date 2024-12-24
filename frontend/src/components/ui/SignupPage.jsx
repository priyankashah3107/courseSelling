import React, { useState } from "react";
import { Mail, Lock, User, MapPin, UserCog } from "lucide-react";
import styles from "../../style";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    state: "",
    role: "user",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log("Signup data:", formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-primary w-full h-screen p-10 ">
      <div className="w-full max-w-md mx-auto p-8 rounded-xl bg-black-gradient ">
        <h2 className={`${styles.heading2} text-center mb-6`}>
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dimWhite"
              size={20}
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-black-gradient-2 border border-dimWhite text-white placeholder-dimWhite"
              required
            />
          </div>

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

          <div className="relative">
            <MapPin
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dimWhite"
              size={20}
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-black-gradient-2 border border-dimWhite text-white placeholder-dimWhite"
              required
            />
          </div>

          <div className="relative">
            <UserCog
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dimWhite"
              size={20}
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-black-gradient-2 border border-dimWhite text-white"
              required
            >
              <option value="user" className="text-black">
                User
              </option>
              <option value="admin" className="text-black">
                Admin
              </option>
            </select>
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-lg ${styles.button}  font-bold bg-secondary text-black`}
          >
            Sign Up
          </button>
        </form>

        <p className="text-dimWhite text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-secondary hover:text-white">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;

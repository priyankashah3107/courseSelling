import React, { useState } from "react";
import { Mail, Lock, User, MapPin, UserCog } from "lucide-react";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import styles from "../../../../style";
const AdminSignupPage  = () => {
	const navigate = useNavigate()
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		state: "",
		role: "user",
	});

	

	// mutation using tanstack

	const { mutate, isError, error, isLoading } = useMutation({
		mutationFn: async ({ username, password, email, state }) => {  // u can directly accept formData instead of destructue this  
			try {
				// const res = await axios.post("/api/v1/auth/signup", formData);  // u can directly accept formData instead of destructue this  
        const res = await axios.post("/api/v1/admin/signup",{
          username, 
          email, 
          password, 
          state
        }); 
				// console.log("Data from the SignupPage", res);
				return res.data;
			} catch (error) {
				console.log("Error on creating the Profile", error);
				throw error;
			}
		},
		onSuccess: () => {
			toast.success("Account Created Successfully 🤞");
		},
		onError: (err) => {
			toast.error(
				`Signup Failed: ${err.response?.data?.message || err.message}`
			);
		},
	});



	const {data: authAdmin} = 	useQuery({
		// we use queryKey to give a unique name to out query and refer to it later
		queryKey: ["authAdmin"],
		queryFn: async () => {
		  try {
			const res = await fetch("/api/v1/admin/me");
			const data = await res.json();
			if(data.error) return null;
			if(!res.ok) {
			  throw new Error(data.error || "Something went wrong");
			}
			// console.log("AuthAdmin is here", data);
			return data;
		  } catch (error) {
			return null
		  }
		},
		retry: false
	  })

	if(authAdmin) {
		navigate("/adminlogin")
	}


	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle signup logic here
		// console.log("Signup data:", formData);
		mutate(formData);
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<div className="bg-[#efefef] w-full h-screen p-10 ">
			<div className="w-full max-w-md mx-auto p-8 rounded-xl bg-white ">
				<h2 className={`${styles.heading2} text-center mb-6`}>
					Create Account
				</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="relative">
						<User
							className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
							size={20}
						/>
						<input
							type="text"
							name="username"
							placeholder="Username"
							value={formData.username}
							onChange={handleChange}
							className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-300 border border-dimWhite text-black placeholder-black"
							required
						/>
					</div>

					<div className="relative">
						<Mail
							className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black "
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

					<div className="relative">
            <MapPin
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
              size={20}
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-300 border border-dimWhite text-black placeholder-black"
              required
            />
          </div>

					{/* <div className="relative">
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
					</div> */}

					<button
						type="submit"
						className={`w-full py-3 px-4 rounded-lg ${styles.button}  font-bold bg-[#111111] text-white`}
						disabled={isLoading}
					>
						{isLoading ? "Signing Up..." : "Sign Up"}
					</button>
				</form>

				{isError && (
					<p className="text-red-500 text-center mt-4">
						{error.response?.data?.message || "Something went wrong"}
					</p>
				)}
				<p className="text-[#123321] text-center mt-4">
					Already have an account?{" "}
					<a href="/adminlogin" className="text-blue-700 hover:text-black">
						Login here
					</a>
				</p>
			</div>
		</div>
	);
};

export default AdminSignupPage;

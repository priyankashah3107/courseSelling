import React from "react";
import Navbar from "./components/ui/Navbar";
import styles from "./style";
import Hero from "./components/ui/Hero";
import HomePage from "./components/ui/HomePage";
import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "lucide-react";
import SignupPage from "./components/ui/SignupPage";
import LoginPage from "./components/ui/LoginPage";
import AllCourses from "./components/ui/AllCourses";
import BuyNow from "./components/ui/BuyNow";
import MyPurchases from "./components/ui/MyPurchases";
import SubContent from "./components/ui/SubContent";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSkeleton from "./components/ui/LoadingSkeleton";

const autheticatedUser = async () => {
  try {
    const res = await axios.get("/api/v1/auth/me")
    console.log("Auth User from App.jsx", res.data)
    return res.data
  } catch (error) {
    console.log("Error to get Authenticated User", error)
    throw error;
  }
}

const App = () => {
  const { data: authUser, isError, error, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: autheticatedUser,
  });

  
  if (isLoading) {
    return <div> <LoadingSkeleton /> </div>; 
  }

  if (isError) {
    return <div>Error: {error.message}</div>; 
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to={"/"} />} />
        <Route path="/login" element={!authUser ?  <LoginPage /> : <Navigate to={"/"} />} />
        <Route path="/allcourses" element={<AllCourses />} />
        <Route path="/mypurchases" element={<MyPurchases />} />
        <Route path="/subcontent" element={<SubContent />} />
        <Route path="/buynow" element={<BuyNow />} />
      </Routes>
      <Toaster />
    </div>
  );
};


export default App
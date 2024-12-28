import React, { useState } from "react";
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

autheticatedUser()
const App = () => {
  
  // const { data: authUser, isError, error, isLoading } = useQuery({
  //   queryKey: ["authUser"],
  //   queryFn: autheticatedUser,
  //   // enabled: !!document.cookie, // Only run the query if cookies are present

  // // onSuccess: () => setAuthUser(data),
  // // onError: () => setAuthUser(null)
  // });

 
  // if (isLoading) {
  //   return <div> <LoadingSkeleton /> </div>; 
  // }

  // if (isError) {
  //   return <div>Error: {error.message}</div>; 
  // }



  // this is working 

  const {data: authUser, isLoading, error, isError} = 	useQuery({
    // we use queryKey to give a unique name to out query and refer to it later
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/v1/auth/me");
        const data = await res.json();
        if(data.error) return null;
        if(!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        console.log("AuthUser is here", data);
        return data;
      } catch (error) {
        throw new Error(error)
      }
    },
    retry: false
  })

  if(isLoading) {
    return <div> <LoadingSkeleton /></div>
  }

 


  return (
    <div>
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to={"/"} />} />
        <Route path="/login" element={!authUser ?  <LoginPage /> : <Navigate to={"/"} />} />
         {/* <Route path="/" element={<HomePage /> } />
        <Route path="/signup" element={ <SignupPage />} />
        <Route path="/login" element={<LoginPage />} /> */}
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


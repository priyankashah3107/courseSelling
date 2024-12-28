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

const App = () => {
  // const [authUser, setAuthUser] = useState(null)
  const { data: authUser, isError, error, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: autheticatedUser,
    // enabled: !!document.cookie, // Only run the query if cookies are present

  // onSuccess: () => setAuthUser(data),
  // onError: () => setAuthUser(null)
  });

  console.log("AuthUSer", authUser)
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



// import React, { useEffect, useState } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import SignupPage from "./components/ui/SignupPage";
// import LoginPage from "./components/ui/LoginPage";
// import HomePage from "./components/ui/HomePage";
// import LoadingSkeleton from "./components/ui/LoadingSkeleton";
// import { Toaster } from "react-hot-toast";

// // Function to check if the user is authenticated
// const autheticatedUser = async () => {
//   try {
//     const res = await axios.get("/api/v1/auth/me");
//     console.log("Authenticated User", res.data);
//     return res.data; // Return the authenticated user
//   } catch (error) {
//     console.log("Error fetching authenticated user", error);
//     throw error; // Throw error to trigger `isError`
//   }
// };

// const App = () => {
//   const [authUser, setAuthUser] = useState(null);
//   const { data, isError, error, isLoading } = useQuery({
//     queryKey: ["authUser"],
//     queryFn: autheticatedUser,
//     enabled: !!document.cookie, // Only run the query if cookies are present
//     onSuccess: (data) => setAuthUser(data), // Set user if successful
//     onError: () => setAuthUser(null), // Set user as null if error occurs
//   });

//   // If loading, show loading skeleton
//   if (isLoading) {
//     return <div><LoadingSkeleton /></div>;
//   }

//   // If there's an error, likely due to unauthorized user, handle accordingly
//   if (isError) {
//     // If error is due to missing token or unauthorized access, set user as null
//     if (error.response?.status === 401 || error.message === 'Request failed with status code 401') {
//       setAuthUser(null); // This will ensure that unauthenticated users see Login/Signup
//     }
//     return <div>Error: {error.message}</div>;
//   }

//   // Routes based on authentication state
//   return (
//     <div>
//       <Routes>
//         <Route
//           path="/"
//           element={authUser ? <HomePage /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/signup"
//           element={!authUser ? <SignupPage /> : <Navigate to="/" />}
//         />
//         <Route
//           path="/login"
//           element={!authUser ? <LoginPage /> : <Navigate to="/" />}
//         />
//         {/* Other Routes */}
//       </Routes>
//       <Toaster />
//     </div>
//   );
// };

// export default App;

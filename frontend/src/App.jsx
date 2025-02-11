import React, { useState } from "react";
import Navbar from "./components/ui/Navbar";
import styles from "./style";
import Hero from "./components/ui/Hero";
import HomePage from "./components/ui/HomePage";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
import AdminHomePage from "./components/ui/admin/AdminHomePage";
import AdminSignupPage from "./components/ui/admin/auth/AdminSignupPage";
import AdminLoginPage from "./components/ui/admin/auth/AdminLoginPage";
import CreateCourse from "./components/ui/admin/CreateCourse";
import UpdateCourse from "./components/ui/admin/UpdateCourse";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const excludedRoutes = [
    "/admin",
    "/adminlogin",
    "/adminsignup",
    "/createcourse",
    "/update",
    "/update/:id",
  ];

  const {
    data: authUser,
    isLoading,
    error,
    isError,
  } = useQuery({
    // we use queryKey to give a unique name to out query and refer to it later
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/v1/auth/me");
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        console.log("AuthUser is here", data);
        return data;
      } catch (error) {
        return null;
      }
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div>
        {" "}
        <LoadingSkeleton />{" "}
      </div>
    ); // Show loading skeleton while fetching
  }

  // uncomment this for authenticated authUser

  // const {data: adminUser} = 	useQuery({
  //   queryKey: ["adminUser"],
  //   queryFn: async () => {
  //     try {
  //       // const res = await fetch("/api/v1/auth/me"); same mistake
  //       const res = await fetch("/api/v1/admin/me");

  //       const data = await res.json();
  //       if(data.error) return null;
  //       if(!res.ok) {
  //         throw new Error(data.error || "Something went wrong");
  //       }
  //       console.log("AuthUser is here", data);
  //       return data;
  //     } catch (error) {
  //       return null
  //     }
  //   },
  //   retry: false
  // })

  // If the user is not authenticated, redirect to login page
  // if (isError || !authUser) {
  //   navigate("/login")

  // }

  // // If the user is not authenticated, redirect to login page
  // if (isError || !adminUser) {
  //   navigate("/adminlogin")

  // }

  return (
    <div>
      {/* <Navbar authUser={authUser} /> */}
      {/* {location.pathname !== "/admin"  && <Navbar authUser={authUser} />} */}
      {!excludedRoutes.includes(location.pathname) && (
        <Navbar authUser={authUser} />
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/allcourses" element={<AllCourses />} />
        <Route path="/mypurchases" element={<MyPurchases />} />
        {/* <Route path="/mypurchases/:userID" element={<MyPurchases />} /> */}
        <Route path="/subcontent" element={<SubContent />} />
        <Route path="/buynow" element={<BuyNow />} />
        <Route path="/admin" element={<AdminHomePage />} />
        <Route path="/adminsignup" element={<AdminSignupPage />} />
        <Route path="/adminlogin" element={<AdminLoginPage />} />
        <Route path="/createcourse" element={<CreateCourse />} />
        <Route path="/update/:id" element={<UpdateCourse />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;

// NOT WORKING WITH AXIOS.GET BECAUSE THE AUTHENTICATED FUNCTION REDERDING AGAIN AND AGAIN AND CHECK THE AUTHUSER WILL WILL CAUSE THE LOGIN PAGE COMPONENT ERROR

// import React from "react";
// import { Navigate, Route, Routes } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import LoadingSkeleton from "./components/ui/LoadingSkeleton";
// import SignupPage from "./components/ui/SignupPage";
// import LoginPage from "./components/ui/LoginPage";
// import HomePage from "./components/ui/HomePage";
// import AllCourses from "./components/ui/AllCourses";
// import BuyNow from "./components/ui/BuyNow";
// import MyPurchases from "./components/ui/MyPurchases";
// import SubContent from "./components/ui/SubContent";
// import { Toaster } from "react-hot-toast";

// // Function to check if the user is authenticated using axios
// const authenticatedUser = async () => {
//   try {
//     const response = await axios.get("/api/v1/auth/me", { withCredentials: true });
//     if(response.status === 401) {
//       throw Error;
//     }
//     return response.data; // return user data if authenticated

//   } catch (error) {
//     // If error occurs (e.g., 401 Unauthorized), return null
//     console.log("User is not authenticated", error);
//     return null;
//   }
// };

// const App = () => {
//   const { data: authUser, isLoading, isError } = useQuery({
//     queryKey: ["authUser"],
//     queryFn: authenticatedUser,
//     retry: false, // Disable retry on failure
//   });

//   // If the data is still loading, show loading skeleton
//   if (isLoading) {
//     return <div><LoadingSkeleton /></div>;
//   }

//   // If there's an error or user is not authenticated, redirect to login
//   if (isError || !authUser) {
//     return <Navigate to="/login" />;
//   }

//   return (
//     <div>
//       <Routes>
//         <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
//         <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
//         <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
//         <Route path="/allcourses" element={<AllCourses />} />
//         <Route path="/mypurchases" element={<MyPurchases />} />
//         <Route path="/subcontent" element={<SubContent />} />
//         <Route path="/buynow" element={<BuyNow />} />
//       </Routes>
//       <Toaster />
//     </div>
//   );
// };

// export default App;

// useFetch is also not working

// import React, { useState } from "react";
// import Navbar from "./components/ui/Navbar";
// import styles from "./style";
// import Hero from "./components/ui/Hero";
// import HomePage from "./components/ui/HomePage";
// import { Navigate, Route, Routes } from "react-router-dom";
// import { Home } from "lucide-react";
// import SignupPage from "./components/ui/SignupPage";
// import LoginPage from "./components/ui/LoginPage";
// import AllCourses from "./components/ui/AllCourses";
// import BuyNow from "./components/ui/BuyNow";
// import MyPurchases from "./components/ui/MyPurchases";
// import SubContent from "./components/ui/SubContent";
// import { Toaster } from "react-hot-toast";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import LoadingSkeleton from "./components/ui/LoadingSkeleton";
// import useFetch from "./hooks/useFetech.jsx";

// const App = () => {

//   const {data: authUser, error, loading} = useFetch("api/v1/auth/me")

//   if (loading) {
//     return <div> <LoadingSkeleton /> </div>; // Show loading skeleton while fetching
//   }

//   // If the user is not authenticated, redirect to login page
//   if (error) {
//     return <Navigate to="/signup" />;
//   }

//   return (
//     <div>
//       <Routes>
//         <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/signup" />} />
//         <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
//         <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
//         <Route path="/allcourses" element={<AllCourses />} />
//         <Route path="/mypurchases" element={<MyPurchases />} />
//         <Route path="/subcontent" element={<SubContent />} />
//         <Route path="/buynow" element={<BuyNow />} />
//       </Routes>
//       <Toaster />
//     </div>
//   );
// };

// export default App;

// import React from "react";
// import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import Navbar from "./components/ui/Navbar";
// import LoadingSkeleton from "./components/ui/LoadingSkeleton";
// import HomePage from "./components/ui/HomePage";
// import SignupPage from "./components/ui/SignupPage";
// import LoginPage from "./components/ui/LoginPage";
// import AllCourses from "./components/ui/AllCourses";
// import BuyNow from "./components/ui/BuyNow";
// import MyPurchases from "./components/ui/MyPurchases";
// import SubContent from "./components/ui/SubContent";
// import AdminHomePage from "./components/ui/admin/AdminHomePage";
// import AdminSignupPage from "./components/ui/admin/auth/AdminSignupPage";
// import AdminLoginPage from "./components/ui/admin/auth/AdminLoginPage";
// import { Toaster } from "react-hot-toast";

// const App = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const excludedRoutes = ["/admin", "/adminlogin", "/adminsignup"];

//   // Query for normal user authentication
//   const { data: authUser, isLoading: isLoadingUser } = useQuery({
//     queryKey: ["authUser"],
//     queryFn: async () => {
//       const res = await fetch("/api/v1/auth/me");
//       if (!res.ok) {
//         throw new Error("Failed to fetch user authentication");
//       }
//       const data = await res.json();
//       return data.error ? null : data;
//     },
//     retry: false,
//   });

//   // Query for admin user authentication
//   const { data: adminUser, isLoading: isLoadingAdmin } = useQuery({
//     queryKey: ["adminUser"],
//     queryFn: async () => {
//       const res = await fetch("/api/v1/admin/me");
//       if (!res.ok) {
//         throw new Error("Failed to fetch admin authentication");
//       }
//       const data = await res.json();
//       return data.error ? null : data;
//     },
//     retry: false,
//   });

//   // Show loading skeleton while fetching
//   if (isLoadingUser || isLoadingAdmin) {
//     return <div><LoadingSkeleton /></div>;
//   }

//   // If neither user nor admin is authenticated, navigate to appropriate login page
//   if (!authUser  && location.pathname !== "/adminsignup") {
//     navigate("/adminlogin");
//   }
//   if (!adminUser && excludedRoutes.includes(location.pathname)) {
//     navigate("/adminlogin");
//   }

//   return (
//     <div>
//       {!excludedRoutes.includes(location.pathname) && <Navbar authUser={authUser} />}
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/signup" element={<SignupPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/allcourses" element={<AllCourses />} />
//         <Route path="/mypurchases" element={<MyPurchases />} />
//         <Route path="/subcontent" element={<SubContent />} />
//         <Route path="/buynow" element={<BuyNow />} />
//         <Route path="/admin" element={adminUser ? <AdminHomePage /> : <AdminLoginPage />}/>
//         <Route path="/adminsignup" element={<AdminSignupPage />} />
//         <Route path="/adminlogin" element={<AdminLoginPage />} />
//       </Routes>
//       <Toaster />
//     </div>
//   );
// };

// export default App;

// import React from "react";
// import { Route, Routes, useLocation } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import Navbar from "./components/ui/Navbar";
// import LoadingSkeleton from "./components/ui/LoadingSkeleton";
// import HomePage from "./components/ui/HomePage";
// import SignupPage from "./components/ui/SignupPage";
// import LoginPage from "./components/ui/LoginPage";
// import AllCourses from "./components/ui/AllCourses";
// import BuyNow from "./components/ui/BuyNow";
// import MyPurchases from "./components/ui/MyPurchases";
// import SubContent from "./components/ui/SubContent";
// import AdminHomePage from "./components/ui/admin/AdminHomePage";
// import AdminSignupPage from "./components/ui/admin/auth/AdminSignupPage";
// import AdminLoginPage from "./components/ui/admin/auth/AdminLoginPage";
// import { Toaster } from "react-hot-toast";

// const App = () => {
//   const location = useLocation();
//   const excludedRoutes = ["/admin", "/adminlogin", "/adminsignup"];
//   const isAdminRoute = excludedRoutes.includes(location.pathname);

//   // Query for normal user authentication
//   const { data: authUser, isLoading: isLoadingUser } = useQuery({
//     queryKey: ["authUser"],
//     queryFn: async () => {
//       const res = await fetch("/api/v1/auth/me");
//       if (!res.ok) {
//         return null;
//       }
//       const data = await res.json();
//       return data.error ? null : data;
//     },
//     retry: false,
//     staleTime: 300000, // Cache for 5 minutes
//     refetchOnWindowFocus: false, // Prevent unnecessary refetches
//   });

//   // Query for admin user authentication - only run if on admin routes
//   const { data: adminUser, isLoading: isLoadingAdmin } = useQuery({
//     queryKey: ["adminUser"],
//     queryFn: async () => {
//       const res = await fetch("/api/v1/admin/me");
//       if (!res.ok) {
//         return null;
//       }
//       const data = await res.json();
//       return data.error ? null : data;
//     },
//     retry: false,
//     staleTime: 300000,
//     refetchOnWindowFocus: false,
//     enabled: isAdminRoute, // Only run this query on admin routes
//   });

//   if ((isLoadingUser && !isAdminRoute) || (isLoadingAdmin && isAdminRoute)) {
//     return <LoadingSkeleton />;
//   }

//   return (
//     <div>
//       {!isAdminRoute && <Navbar authUser={authUser} />}
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/signup" element={<SignupPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/allcourses" element={<AllCourses />} />
//         <Route path="/mypurchases" element={<MyPurchases />} />
//         <Route path="/subcontent" element={<SubContent />} />
//         <Route path="/buynow" element={<BuyNow />} />
//         <Route path="/admin" element={<AdminHomePage />} />
//         <Route path="/adminsignup" element={<AdminSignupPage />} />
//         <Route path="/adminlogin" element={<AdminLoginPage />} />
//       </Routes>
//       <Toaster />
//     </div>
//   );
// };

// export default App;

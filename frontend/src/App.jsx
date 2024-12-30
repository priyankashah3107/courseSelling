import React, { useState } from "react";
import Navbar from "./components/ui/Navbar";
import styles from "./style";
import Hero from "./components/ui/Hero";
import HomePage from "./components/ui/HomePage";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
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

const App = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const excludedRoutes = ["/admin", "/adminlogin", "/adminsignup"];
  
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
        return null
      }
    },
    retry: false
  })


  if (isLoading) {
    return <div> <LoadingSkeleton /> </div>; // Show loading skeleton while fetching
  }

  // const {data: adminUser, isError} = 	useQuery({
  //   queryKey: ["adminUser"],
  //   queryFn: async () => {
  //     try {
  //       const res = await fetch("/api/v1/auth/me");
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
      {!excludedRoutes.includes(location.pathname) && <Navbar authUser={authUser}  />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />  }/>
        <Route path="/login" element={<LoginPage />  }/>
        <Route path="/allcourses" element={<AllCourses />} />
        <Route path="/mypurchases" element={<MyPurchases />} />
        {/* <Route path="/mypurchases/:userID" element={<MyPurchases />} /> */}
        <Route path="/subcontent" element={<SubContent />} />
        <Route path="/buynow" element={<BuyNow />} />
        <Route path="/admin" element={<AdminHomePage />}  />
        <Route path="/adminsignup" element={<AdminSignupPage />}  />
        <Route path="/adminlogin" element={<AdminLoginPage />}  />

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



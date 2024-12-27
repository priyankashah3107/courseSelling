import React from "react";
import Navbar from "./components/ui/Navbar";
import styles from "./style";
import Hero from "./components/ui/Hero";
import HomePage from "./components/ui/HomePage";
import { Route, Routes } from "react-router-dom";
import { Home } from "lucide-react";
import SignupPage from "./components/ui/SignupPage";
import LoginPage from "./components/ui/LoginPage";
import AllCourses from "./components/ui/AllCourses";
import BuyNow from "./components/ui/BuyNow";
import MyPurchases from "./components/ui/MyPurchases";
import SubContent from "./components/ui/SubContent";

const App = () => {
  return (
    // <div className=" bg-primary h-screen  w-full overflow-hidden">
    //   <div className={`${styles.paddingX} ${styles.flexCenter}`}>
    //     <div className={`${styles.boxWidth} ${styles.textWhite}`}>
    //       <Navbar />
    //     </div>
    //   </div>

    //   <div className={` bg-primary ${styles.flexStart}`}>
    //     <div className={` ${styles.boxWidth} ${styles.textWhite}`}>
    //       <Hero />
    //     </div>
    //   </div>
    // </div>

    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/allcourses" element={<AllCourses />} />
        <Route path="/mypurchases" element={<MyPurchases />} />
        <Route path="/subcontent" element={<SubContent />} />
        <Route path="/buynow" element={<BuyNow />} />
        {/* viewDetails */}
      </Routes>
    </div>
  );
};

export default App;

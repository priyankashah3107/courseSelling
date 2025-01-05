// import React from "react";
// import { useNavigate } from "react-router-dom";
// import useFetch from "../../hooks/useFetech";
// import Button from "./Button";
// import { formatCurrency } from "../../utils/formatCurrency.js";
// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import toast from "react-hot-toast";

// // Loading skeleton component for better UX
// const CourseSkeleton = () => (
//   <div className="bg-gray-800/50 rounded-lg p-5 animate-pulse">
//     <div className="w-full h-40 bg-gray-700 rounded-md" />
//     <div className="h-6 bg-gray-700 rounded mt-3 w-3/4" />
//     <div className="h-4 bg-gray-700 rounded mt-2 w-full" />
//     <div className="h-4 bg-gray-700 rounded mt-1 w-full" />
//     <div className="h-6 bg-gray-700 rounded mt-2 w-1/4" />
//     <div className="h-10 bg-gray-700 rounded mt-4" />
//   </div>
// );

// const CourseCard = ({ course, onBuyNow }) => (
//   <div className="bg-gray-800 rounded-lg p-5 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col group">
//     <div className="relative overflow-hidden rounded-md">
//       <img
//         src={course.image}
//         alt={course.title}
//         className="w-full h-40 object-cover rounded-md transform group-hover:scale-105 transition-transform duration-300"
//       />
//       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//     </div>
//     <h2 className="text-lg sm:text-xl font-semibold mt-4 line-clamp-1 text-white">
//       {course.title}
//     </h2>
//     <p className="text-gray-400 mt-2 text-sm line-clamp-2">
//       {course.description}
//     </p>
//     <div className="mt-auto pt-4">
//       <p className="text-xl font-medium text-[#26D0CE]">
//         {formatCurrency(course.price)}
//       </p>
//       <button
//         onClick={onBuyNow}
//         className="mt-3 w-full bg-gradient-to-r from-[#26D0CE] to-[#1A2980] text-white font-semibold rounded-md px-5 py-2.5 hover:from-[#1A2980] hover:to-[#26D0CE] transition-all duration-300 transform hover:-translate-y-0.5"
//       >
//         Purchase
//       </button>
//     </div>
//   </div>
// );

// const AllCourses = () => {
//   const navigate = useNavigate();
//   const { data, loading, error } = useFetch(
//     "http://localhost:8080/api/v1/courses/getcourses"
//   );

//   const handleBuyNow = () => {
//     navigate("/buynow");
//   };

//   if (error) {
//     return (
//       <div className="min-h-[50vh] flex items-center justify-center">
//         <div className="text-red-500 bg-red-100 p-4 rounded-lg shadow-lg">
//           <h3 className="text-lg font-semibold">Error Loading Courses</h3>
//           <p className="mt-1">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   // getThe course by their courseId 
//   // purchased the course by their courseId 

//   const {mutate, isError, isPending} = useMutation({
//      mutationFn:  async (courseId) => {
//         try {
//            const res = await axios.post(`/api/v1/purchased/purchasecourses/${courseId}`)
//            console.log("Purchased Course By their CourseId", res)
//            return res.data
//         } catch (error) {
//           console.log("Error while Purchasing the course", error)
//           throw error
//         }
//      }, 
//     onSuccess: () => {
//       toast.success("You Successfully Purchased the Course 🎉")
//     }, 
//     onError: () => {
//       toast.error("Error While Purchasing the course 😔")
//     }
     
//   })


//   const handlePurchasedCourse = (courseId) => {
//     mutate(courseId)
//     console.log("Purchases CourseId from AllCourses", courseId)
//     navigate("/mypurchases")
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-primary to-gray-900 py-10 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-12">
//           <Button
//             value="Available Courses"
//             variant="dark"
//             size="large"
//             className="font-bold text-2xl sm:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-[#26D0CE] to-[#1A2980] "
//           />
//           {!loading && data?.content?.length > 0 && (
//             <p className="mt-4 text-gray-400">
//               {/* Explore our selection of {data.content.length} courses */}
//               Explore our courses
//             </p>
//           )}
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
//           {loading ? (
//             [...Array(6)].map((_, index) => <CourseSkeleton key={index} />)
//           ) : data?.content?.length > 0 ? (
//             data.content.map((course, index) => (
//               <CourseCard
//                 key={course._id || index}
//                 course={course}
//                 // onBuyNow={handleBuyNow}
//                 onBuyNow={() => handlePurchasedCourse(course._id)}
//               />
//             ))
//           ) : (
//             <div className="col-span-full text-center py-20">
//               <div className="inline-block p-6 rounded-lg bg-gray-800/50 backdrop-blur-sm">
//                 <h3 className="text-xl font-semibold text-gray-200">
//                   No Courses Available
//                 </h3>
//                 <p className="mt-2 text-gray-400">
//                   Check back later for new courses
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllCourses;







import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { formatCurrency } from "../../utils/formatCurrency.js";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useRazorpay } from "react-razorpay";
import useFetch from "../../hooks/useFetech.jsx";
// import { env_Vars } from "../../../../backend/config/envVars.js";

// console.log("VITE RAZORPAyKEY ID", import.meta.env.VITE_RAZORPAY_KEY_ID)

// Loading skeleton component for better UX
const CourseSkeleton = () => (
  <div className="bg-gray-800/50 rounded-lg p-5 animate-pulse">
    <div className="w-full h-40 bg-gray-700 rounded-md" />
    <div className="h-6 bg-gray-700 rounded mt-3 w-3/4" />
    <div className="h-4 bg-gray-700 rounded mt-2 w-full" />
    <div className="h-4 bg-gray-700 rounded mt-1 w-full" />
    <div className="h-6 bg-gray-700 rounded mt-2 w-1/4" />
    <div className="h-10 bg-gray-700 rounded mt-4" />
  </div>
);

const CourseCard = ({ course, onBuyNow }) => (
  <div className="bg-gray-800 rounded-lg p-5 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col group">
    <div className="relative overflow-hidden rounded-md">
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-40 object-cover rounded-md transform group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
    <h2 className="text-lg sm:text-xl font-semibold mt-4 line-clamp-1 text-white">
      {course.title}
    </h2>
    <p className="text-gray-400 mt-2 text-sm line-clamp-2">
      {course.description}
    </p>
    <div className="mt-auto pt-4">
      <p className="text-xl font-medium text-[#26D0CE]">
        {formatCurrency(course.price)}
      </p>
      <button
        onClick={onBuyNow}
        className="mt-3 w-full bg-gradient-to-r from-[#26D0CE] to-[#1A2980] text-white font-semibold rounded-md px-5 py-2.5 hover:from-[#1A2980] hover:to-[#26D0CE] transition-all duration-300 transform hover:-translate-y-0.5"
      >
        Purchase
      </button>
    </div>
  </div>
);

const AllCourses = () => {
  const navigate = useNavigate();
  const { Razorpay } = useRazorpay();
  const { data, loading, error } = useFetch("/api/v1/courses/getcourses");


  
  const handleBuyNow = () => {
    navigate("/buynow");
  };

  if (error) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-red-500 bg-red-100 p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold">Error Loading Courses</h3>
          <p className="mt-1">{error}</p>
        </div>
      </div>
    );
  }

  const { mutate, isError, isPending } = useMutation({
    mutationFn: async (courseId) => {
      try {
        const res = await axios.post(`/api/v1/purchased/purchaseorder/${courseId}`);
        return res.data; // Contains orderId and amount
      } catch (error) {
        console.log("Error while purchasing the course", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      // Success: Trigger Razorpay payment
      const { amount, orderId } = data;

      const options = {
        // key: env_Vars.VITE_RAZORPAY_KEY_ID,
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
       
        amount, 
        currency: "INR",
        name: "Course Name",
        description: "Course Payment",
        order_id: orderId,
        handler: (response) => {
          console.log("Payment Response:", response);
          toast.success("Payment successful!");
          navigate("/mypurchases");
        },
        prefill: {
          name: "Priyanka",
          email: "user@example.com",
          contact: "9876543210",
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    },
    onError: () => {
      toast.error("Error while purchasing the course 😔");
    },
  });

  const handlePurchasedCourse = (courseId) => {
    mutate(courseId);
    console.log("Purchasing Course ID:", courseId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-gray-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Button
            value="Available Courses"
            variant="dark"
            size="large"
            className="font-bold text-2xl sm:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-[#26D0CE] to-[#1A2980] "
          />
          {!loading && data?.content?.length > 0 && (
            <p className="mt-4 text-gray-400">
              Explore our courses
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {loading ? (
            [...Array(6)].map((_, index) => <CourseSkeleton key={index} />)
          ) : data?.content?.length > 0 ? (
            data.content.map((course, index) => (
              <CourseCard
                key={course._id || index}
                course={course}
                onBuyNow={() => handlePurchasedCourse(course._id)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <div className="inline-block p-6 rounded-lg bg-gray-800/50 backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-gray-200">
                  No Courses Available
                </h3>
                <p className="mt-2 text-gray-400">
                  Check back later for new courses
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCourses;

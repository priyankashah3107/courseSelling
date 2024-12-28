// import React, { useEffect } from "react";
// import Button from "./Button";
// import axios from "axios";
// import useFetch from "../../hooks/useFetech";
// import { useNavigate } from "react-router-dom";
// import { formatCurrency } from "../../utils/formatCurrency.js";

// const AllCourses = () => {
//   const { data, loading, error } = useFetch(
//     "http://localhost:8080/api/v1/courses/getcourses"
//   );
//   let navigate = useNavigate();

//   const buynow = () => {
//     navigate("/buynow");
//   };
//   console.log("AllCOurses from AllCourese Component", data);

//   if (loading) return <div className="text-white">Loading..........</div>;
//   if (error) return <div className="text-red-600">Error....{error}</div>;
//   return (
//     <div className="flex flex-col items-center  text-white bg-primary w-full h-full">
//       <Button
//         value={"Courses"}
//         variant="dark"
//         size="large"
//         className={`font-semibold  `}
//       />

//       <div>
//         {data?.content && data?.content?.length > 0 ? (
//           <div className="max-w-5xl w-[300px] md:w-full grid grid-cols-1 sm:grid-cols-3 gap-10 mt-20">
//             {data.content?.map((val, index) => (
//               <div
//                 key={index}
//                 className="bg-gray-800 rounded-lg p-5 shadow-lg flex flex-col items-start"
//               >
//                 <img
//                   src={val.image}
//                   alt={val.title}
//                   className="w-full h-40 object-cover rounded-md"
//                 />
//                 <h2 className="text-lg sm:text-xl font-semibold mt-3">
//                   {val.title}
//                 </h2>
//                 <p className="text-gray-400 mt-2 text-start ">
//                   {val.description}
//                 </p>
//                 <p className="text-xl font-medium mt-1 mb-4">
//                   {formatCurrency(val.price)}
//                 </p>
//                 <button
//                   className="mt-auto sm:text-lg font-semibold rounded-md px-5 py-2 sm:px-7 sm:py-2.5 border border-[#26D0CE] hover:bg-secondary d-block w-100 text-center hover:text-black"
//                   onClick={buynow}
//                 >
//                   View Details
//                 </button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>No Course Available </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllCourses;

import React from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetech";
import Button from "./Button";
import { formatCurrency } from "../../utils/formatCurrency.js";

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
        View Details
      </button>
    </div>
  </div>
);

const AllCourses = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(
    "http://localhost:8080/api/v1/courses/getcourses"
  );

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
              {/* Explore our selection of {data.content.length} courses */}
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
                onBuyNow={handleBuyNow}
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

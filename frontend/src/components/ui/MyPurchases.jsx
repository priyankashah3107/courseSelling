// import React from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import useFetch from "../../hooks/useFetech";
// import Button from "./Button";
// import { formatCurrency } from "../../utils/formatCurrency.js";
// import { useQuery } from "@tanstack/react-query";

// // Loading skeleton component for better UX
// const PurchasesSkeleton = () => (
//   <div className="bg-gray-800/50 rounded-lg p-5 animate-pulse">
//     <div className="w-full h-40 bg-gray-700 rounded-md" />
//     <div className="h-6 bg-gray-700 rounded mt-3 w-3/4" />
//     <div className="h-4 bg-gray-700 rounded mt-2 w-full" />
//     <div className="h-4 bg-gray-700 rounded mt-1 w-full" />
//     <div className="h-6 bg-gray-700 rounded mt-2 w-1/4" />
//     <div className="h-10 bg-gray-700 rounded mt-4" />
//   </div>
// );

// const PurchaseCard = ({ purchasedCourses, onBuyNow }) => (
//   <div className="bg-gray-800 rounded-lg p-5 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col group">
//     <div className="relative overflow-hidden rounded-md">
//       <img
//         src={purchasedCourses?.image}
//         alt={purchasedCourses?.title}
//         className="w-full h-40 object-cover rounded-md transform group-hover:scale-105 transition-transform duration-300"
//       />
//       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//     </div>
//     <h2 className="text-lg sm:text-xl font-semibold mt-4 line-clamp-1 text-white">
//       {purchasedCourses?.title}
//     </h2>
//     <p className="text-gray-400 mt-2 text-sm line-clamp-2">
//       {purchasedCourses?.description}
//     </p>
//     <div className="mt-auto pt-4">
//       <p className="text-xl font-medium text-[#26D0CE]">
//         {formatCurrency(purchasedCourses?.price)}
//       </p>
//       <button
//         onClick={onBuyNow}
//         className="mt-3 w-full bg-gradient-to-r from-[#26D0CE] to-[#1A2980] text-white font-semibold rounded-md px-5 py-2.5 hover:from-[#1A2980] hover:to-[#26D0CE] transition-all duration-300 transform hover:-translate-y-0.5"
//       >
//         View
//       </button>
//     </div>
//   </div>
// );

// const MyPurchases = () => {
//   const { userID } = useParams();
//   const navigate = useNavigate();
//   const { data, loading, error } = useFetch(
//     // `http://localhost:8080/api/v1/purchased/purchasedcourses/${userID}`
//     `http://localhost:8080/api/v1/purchased/purchasedcourses`
//   );

//   console.log("Data kjdhjdhkdhskj ", data);

//   // const {data, isLoading, isError, error} = useQuery({
//   //   queryKey: "authUser",
//   //   queryFn: async () => {

//   //   }
//   // })

//   const handleSubContent = () => {
//     navigate("/subcontent");
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

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-primary to-gray-900 py-10 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-12">
//           <Button
//             value="My Purchases"
//             variant="dark"
//             size="large"
//             className="font-bold text-2xl sm:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-[#26D0CE] to-[#1A2980]"
//           />
//           {!loading && data?.content?.length > 0 && (
//             <p className="mt-4 text-gray-400">
//               {/* Explore our selection of {data.content.length} courses */}
//               {/* Explore our courses */}
//             </p>
//           )}
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
//           {loading ? (
//             [...Array(6)].map((_, index) => <PurchasesSkeleton key={index} />)
//           ) : data?.purchasedCourses?.length > 0 ? (
//             data.purchasedCourses.map((course, index) => {
//               console.log("Coursesss", course);
//               return (
//                 <PurchaseCard
//                   key={course._id || index}
//                   purchasedCourses={course.courseId}
//                   course={course}
//                   onBuyNow={handleSubContent}
//                 />
//               );
//             })
//           ) : (
//             <div className="col-span-full text-center py-20">
//               <div className="inline-block p-6 rounded-lg bg-gray-800/50 backdrop-blur-sm">
//                 <h3 className="text-xl font-semibold text-gray-200">
//                   No Purchase Available
//                 </h3>
//                 {/* <p className="mt-2 text-gray-400">
//                   Check back later for new courses
//                 </p> */}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyPurchases;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetech";
import Button from "./Button";
import { formatCurrency } from "../../utils/formatCurrency.js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Loading skeleton component for better UX
const PurchasesSkeleton = () => (
  <div className="bg-gray-800/50 rounded-lg p-5 animate-pulse">
    <div className="w-full h-40 bg-gray-700 rounded-md" />
    <div className="h-6 bg-gray-700 rounded mt-3 w-3/4" />
    <div className="h-4 bg-gray-700 rounded mt-2 w-full" />
    <div className="h-4 bg-gray-700 rounded mt-1 w-full" />
    <div className="h-6 bg-gray-700 rounded mt-2 w-1/4" />
    <div className="h-10 bg-gray-700 rounded mt-4" />
  </div>
);

const PurchaseCard = ({ purchasedCourses, onBuyNow }) => (
  <div className="bg-gray-800 rounded-lg p-5 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col group">
    <div className="relative overflow-hidden rounded-md">
      <img
        src={purchasedCourses?.image}
        alt={purchasedCourses?.title}
        className="w-full h-40 object-cover rounded-md transform group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
    <h2 className="text-lg sm:text-xl font-semibold mt-4 line-clamp-1 text-white">
      {purchasedCourses?.title}
    </h2>
    <p className="text-gray-400 mt-2 text-sm line-clamp-2">
      {purchasedCourses?.description}
    </p>
    <div className="mt-auto pt-4">
      {/* <p className="text-xl font-medium text-[#26D0CE]">
        {formatCurrency(purchasedCourses?.price)}
      </p> */}
      <button
        onClick={onBuyNow}
        className="mt-3 w-full bg-gradient-to-r from-[#26D0CE] to-[#1A2980] text-white font-semibold rounded-md px-5 py-2.5 hover:from-[#1A2980] hover:to-[#26D0CE] transition-all duration-300 transform hover:-translate-y-0.5"
      >
        View
      </button>
    </div>
  </div>
);

const MyPurchases = () => {
  const { userID } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]); // State to store courses
  const [isLoading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track errors
  const [file, setFile] = useState(null);
  // const { data, loading, error } = useFetch(
  //   // `http://localhost:8080/api/v1/purchased/purchasedcourses/${userID}`
  //   `http://localhost:8080/api/v1/purchased/purchasedcourses`
  // );

  // console.log("Data kjdhjdhkdhskj ", data)

  const getAllMyPurchaseCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/v1/purchased/purchasedcourses", {
        withCredentials: true,
      });
      // console.log("Response from GET /api/v1/purchased/purchasedcourses:", res);
      const courses = res.data?.userPurchasedList || [];
      // console.log("Courses:", res.data?.userPurchasedList);
      // console.log("Courses:", courses);

      // Debugging
      // const b = res.data?.userPurchasedList.map((courses) => {
      //   const abc = courses.courseId;
      //   console.log("Abc", abc?.image);
      // });

      // console.log("B", b);
      // if (!courses) {
      //   throw new Error("No courses found in the response");
      // }

      // Fetch signed URLs for each image dynamically
      const signedUrls = await Promise.all(
        courses.map(async (course) => {
          if (course?.courseId?.image) {
            const filename = course?.courseId?.image.split("/").pop();
            const key = `thumbnails/exampleUser/${filename}`;
            // console.log("Checking key in s3:", key);

            try {
              const signedUrlRes = await axios.post("/api/v1/get-signed-url", {
                bucket: "imgprivate",
                key: `thumbnails/exampleUser/${filename}`,
              });
              // console.log("Signed Url Response:", signedUrlRes.data?.url);
              return {
                ...course,
                courseId: {
                  ...course?.courseId,
                  image: signedUrlRes.data?.url,
                },
              };
            } catch (error) {
              console.log(
                `Error fetching signed URL for image: ${course.image}`,
                error
              );
              return course;
            }
          }
          return course;
        })
      );

      setData(signedUrls);
      // console.log("data is:", data);
    } catch (error) {
      console.error("Failed to load courses.", error);
      setError("Failed to load courses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllMyPurchaseCourses();
  }, []);

  // const getAllMyPurchasesCourse = async () => {
  //   try {
  //     // const res = await axios.get("/api/v1/purchased/purchasedcourses");
  //     // console.log("Response is", res.data?.userPurchasedList);
  //     const signedUrlRes = await axios.post("/api/v1/get-signed-url", {
  //       bucket: "imgprivate",
  //       key: `thumbnails/exampleUser/`,
  //     });
  //     console.log("PresignUserl", signedUrlRes);
  //   } catch (error) {
  //     console.log("errr", error);
  //   }
  // };

  // useEffect(() => {
  //   getAllMyPurchasesCourse();
  // }, []);
  const handleSubContent = () => {
    // navigate("/subcontent");
    navigate("/mypurchases");
  };

  if (error) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-b from-primary to-gray-900">
          <div className="min-h-[50vh] flex items-center justify-center">
            <div className="text-red-500 bg-red-100 p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold">No Purchase Available</h3>
              <p className="mt-1">{error}</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-gray-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Button
            value="My Purchases"
            variant="dark"
            size="large"
            className="font-bold text-2xl sm:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-[#26D0CE] to-[#1A2980]"
          />
          {!isLoading && data?.length > 0 && (
            <p className="mt-4 text-gray-400">
              {/* Explore our selection of {data.content.length} courses */}
              {/* Explore our courses */}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {isLoading ? (
            [...Array(6)].map((_, index) => <PurchasesSkeleton key={index} />)
          ) : data?.length > 0 ? (
            data?.map((purchase, index) => {
              // console.log("Coursesss", course)
              // const courseDetails = purchase.courseId;
              // console.log("CourseDetails from MyPurchases", courseDetails);

              if (!purchase?.courseId) {
                return null;
              }
              return (
                <PurchaseCard
                  key={purchase._id || index}
                  purchasedCourses={purchase?.courseId}
                  purchase={purchase?.courseId}
                  onBuyNow={handleSubContent}
                />
              );
            })
          ) : (
            <div className="col-span-full text-center py-20">
              <div className="inline-block p-6 rounded-lg bg-gray-800/50 backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-gray-200">
                  No Purchase Available
                </h3>
                {/* <p className="mt-2 text-gray-400">
                  Check back later for new courses
                </p> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPurchases;

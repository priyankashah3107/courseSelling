import React, { useEffect } from "react";
import Button from "./Button";
import axios from "axios";
import useFetch from "../../hooks/useFetech";

const AllCourses = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:8080/api/v1/courses/getcourses"
  );
  console.log("AllCOurses from AllCourese Component", data);

  if (loading) return <div className="text-white">Loading..........</div>;
  if (error) return <div className="text-red-600">Error....{error}</div>;
  return (
    <div className="flex flex-col items-center  text-white bg-primary w-full h-full">
      <Button
        value={"Courses"}
        variant="dark"
        size="large"
        className={`font-semibold  `}
      />

      <div>
        {data?.content && data?.content?.length > 0 ? (
          <div className="max-w-5xl w-[300px] md:w-full grid grid-cols-1 sm:grid-cols-3 gap-10 mt-20">
            {data.content?.map((val, index) => (
              <div
                key={val.id}
                className="bg-gray-800 rounded-lg p-5 shadow-lg flex flex-col items-center"
              >
                <img
                  src={val.image}
                  alt={val.title}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h2 className="text-xl font-semibold mt-3">{val.title}</h2>
                <p className="text-gray-400 mt-2">{val.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No Course Available </p>
        )}
      </div>
    </div>
  );
};

export default AllCourses;

// import React from "react";

// const courses = [
//   {
//     _id: "6765abcdb427ba12d393bd19",
//     title: "This Course is created by Priyanka Shah ABC user",
//     image:
//       "https://www.bleepstatic.com/content/hl-images/2022/04/08/GitHub__headpic.jpg",
//     description: "Hello My name is UNKNOWN",
//     category: "6765173fabe013ff5437f806",
//   },
//   {
//     _id: "6765ac4c60ec5c7d46f7dfcf",
//     title: "This Course is created by Priyanka Shah ABC user hi",
//     image:
//       "https://www.bleepstatic.com/content/hl-images/2022/04/08/GitHub__headpic.jpg",
//     description: "Hello My name is UNKNOWN",
//     category: "6765173fabe013ff5437f806",
//   },
//   // ... other objects
// ];

// const AllCourses = () => {
//   return (
//     <div className="flex flex-col items-center bg-primary text-white w-full h-screen">
//       <h1 className="text-2xl font-bold mt-5">All Courses</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 p-5">
//         {courses.map((course) => (
//           <div
//             key={course._id}
//             className="bg-gray-800 rounded-lg p-5 shadow-lg flex flex-col items-center"
//           >
//             <img
//               src={course.image}
//               alt={course.title}
//               className="w-full h-40 object-cover rounded-md"
//             />
//             <h2 className="text-xl font-semibold mt-3">{course.title}</h2>
//             <p className="text-gray-400 mt-2">{course.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllCourses;

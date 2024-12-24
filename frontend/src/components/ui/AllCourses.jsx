import React from "react";
import Button from "./Button";

const cards = [
  {
    id: 1,
    title: "",
    img: "",
    description: "",
    creatorName: "",
    button: <Button value={"₹ 999"} variant="pink" size="small" />,
  },
];
const AllCourses = () => {
  return (
    <div className="flex flex-col items-center  text-white bg-primary w-full h-screen">
      <Button
        value={"Courses"}
        variant="dark"
        size="large"
        className={`font-semibold  `}
      />

      {/* cards */}
    </div>
  );
};

export default AllCourses;

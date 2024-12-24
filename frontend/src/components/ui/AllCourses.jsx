import React from "react";
import Button from "./Button";

const AllCourses = () => {
  return (
    <div className="flex flex-col items-center  text-white bg-primary w-full h-screen">
      <Button
        value={"Courses"}
        variant="dark"
        size="large"
        className={`font-semibold  `}
      />
    </div>
  );
};

export default AllCourses;

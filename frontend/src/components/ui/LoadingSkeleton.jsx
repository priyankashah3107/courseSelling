import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="bg-primary h-screen w-full overflow-scroll ">
      <div className="w-full max-w-6xl mx-auto p-8">
        {/* Navbar Skeleton */}
        <div className="animate-pulse space-x-4 mb-8">
          <div className="h-8 w-32 bg-gray-400 rounded"></div>
        </div>

        {/* Hero Section Skeleton */}
        <div className="animate-pulse mb-12">
          <div className="h-96 w-full bg-gray-500 rounded-lg"></div>
        </div>

        {/* Button Skeleton */}
        <div className="animate-pulse mb-14 mt-20 md:mt-32 mx-auto">
          <div className="h-12 w-40 bg-gray-500 rounded"></div>
        </div>

        {/* Cards Section Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center mx-auto gap-14">
          {/* Skeleton for cards */}
          {Array(3).fill(null).map((_, index) => (
            <div
              key={index}
              className="max-w-80 w-[377px] h-[334px] bg-gray-400 p-5 rounded-md cursor-pointer animate-pulse"
            >
              <div className="w-[117px] h-[117px] bg-gray-500 rounded-lg mb-4"></div>
              <div className="flex flex-col gap-2">
                <div className="h-4 w-32 bg-gray-500 rounded mb-2"></div>
                <div className="h-3 w-40 bg-gray-500 rounded"></div>
              </div>

              <div className="flex flex-row justify-between gap-2 mt-4">
                <div className="h-3 w-24 bg-gray-500 rounded"></div>
                <div className="h-8 w-32 bg-gray-500 rounded"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Us Skeleton */}
        <div className="animate-pulse mt-20">
          <div className="h-20 w-80 bg-gray-500 rounded mb-6"></div>
          <div className="h-12 w-full bg-gray-500 rounded mb-4"></div>
          <div className="h-12 w-full bg-gray-500 rounded mb-4"></div>
        </div>

        {/* Success Stories Skeleton */}
        <div className="animate-pulse mt-20">
          <div className="h-20 w-80 bg-gray-500 rounded mb-6"></div>
          <div className="h-12 w-full bg-gray-500 rounded mb-4"></div>
          <div className="h-12 w-full bg-gray-500 rounded mb-4"></div>
        </div>

        {/* Footer Skeleton */}
        <div className="animate-pulse mt-20">
          <div className="h-16 w-full bg-gray-500 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;

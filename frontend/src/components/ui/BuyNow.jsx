import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const fetchProducts = async () => {
  try {
    const res = await axios.get("https://fakestoreapi.com/products");
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.log("error in FetchProducts", error);
    throw error;
  }
};

// we use useQuery hook when we want to get the data from the backend 

const BuyNow = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return <p>Loading...........</p>;
  }
  if (isError) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div>
      {data?.map((val, index) => (
        <h1 key={index}>{val?.title}</h1>
      ))}
    </div>
  );
};

export default BuyNow;

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const fetchData = async (url) => {
  if (!url) return;
  try {
    const res = await axios.get(url);
    console.log("FetchData from React Query", res.data);
    return res.data;
  } catch (error) {
    console.log("Error to fetch the data", error);
    throw error;
  }
};

const useFetchData = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["data"],
    queryFn: fetchData,
  });

  return { data, isLoading, isError, error };
};

export default useFetchData;

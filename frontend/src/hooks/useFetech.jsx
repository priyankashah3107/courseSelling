import axios from "axios";
import React, { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const source = axios.CancelToken.source();
    const getData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(url, { withCredentials: true });
        setData(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request Canceled:", error.message);
        } else {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    getData();

    return () => {
      source.cancel("Operation canceled by the user.");
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetch;

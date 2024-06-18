import React, { useState } from "react";
import useApiCall from "./useApiCall";

export default function useSavedOrderedItem() {
  const axiosPublic = useApiCall();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  const savedItemInDb = async (itemCart) => {
    // console.log(itemCart);
    setLoading(true);
    try {
      const response = await axiosPublic.post("/api/user/userOrderedItems", {
        itemCart,
      });
      //   console.log(response.data, itemCart);
      setData(response.data);
      setLoading(false);
      return response.data;
    } catch (error) {
      setError(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, data, setData, savedItemInDb };
}

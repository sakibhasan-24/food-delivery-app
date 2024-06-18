import React, { useState } from "react";
import useApiCall from "./useApiCall";

export default function useGetOrderItems() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const axiosPublic = useApiCall();
  const getOrderItems = async () => {
    setLoading(true);
    try {
      setLoading(true);
      const res = await axiosPublic.get("/api/user/userOrderedItems");
      //   console.log(res);
      setOrderItems(res.data);
      return res.data;
    } catch {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { getOrderItems, loading, error, orderItems, setOrderItems };
}

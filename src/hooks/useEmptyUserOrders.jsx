import React, { useState } from "react";
import useApiCall from "./api/useApiCall";

export default function useEmptyUserOrders() {
  const [loading, setLoading] = useState(false);

  const axiosPublic = useApiCall();
  const clearOrder = async () => {
    setLoading(true);
    try {
      const response = await axiosPublic.delete(`/api/user/clearOrderItems`);
      const data = await response.data;
      // console.log("fn", data);
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, clearOrder };
}

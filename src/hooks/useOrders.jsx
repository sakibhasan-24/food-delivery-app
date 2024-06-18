import React from "react";
import useApiCall from "./api/useApiCall";

export default function useOrders() {
  const axiosPublic = useApiCall();
  const getOrderItems = async () => {
    const response = await axiosPublic.get("api/user/order");
    return response;
  };

  return { getOrderItems };
}

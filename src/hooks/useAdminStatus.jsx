import React from "react";
import useApiCall from "./api/useApiCall";

export default function useAdminStatus() {
  const axiosPublic = useApiCall();
  const getAllOrderFromUser = async () => {
    const res = await axiosPublic.get("/api/admin/order");
    return res.data;
  };

  const updateOrderStatus = async (orderId, orderStatus) => {
    const res = await axiosPublic.put(`/api/admin/update-status`, {
      orderId,
      orderStatus,
    });
    return res.data;
  };
  return { getAllOrderFromUser, updateOrderStatus };
}

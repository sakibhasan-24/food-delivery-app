import React from "react";
import useApiCall from "./api/useApiCall";

export default function useCashOnDelivery() {
  const axiosPublic = useApiCall();
  const useOrderForPayOnCash = async (isCashOnDelivery, coupon) => {
    const response = await axiosPublic.post("api/user/cash/order", {
      isCashOnDelivery,
      coupon,
    });
    return response.data;
  };
  return { useOrderForPayOnCash };
}

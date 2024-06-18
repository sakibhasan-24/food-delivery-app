import React from "react";
import useApiCall from "./api/useApiCall";

export default function useStripes() {
  const axiosPublic = useApiCall();
  const createPaymentIntent = async (coupon) => {
    const res = await axiosPublic.post("/api/create-payment-intent", {
      coupon: coupon,
    });
    console.log(res);
    return res;
  };

  const createOrder = async (stripeInfo) => {
    const res = await axiosPublic.post("/api/user/order", { stripeInfo });
    return res.data;
  };
  return { createPaymentIntent, createOrder };
}

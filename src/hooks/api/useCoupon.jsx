import React, { useState } from "react";
import useApiCall from "./useApiCall";

export default function useCoupon() {
  const [loading, setLoading] = useState(false);

  const [couponError, setCouponError] = useState(null);
  const axiosPublic = useApiCall();

  const createCoupon = async (coupon) => {
    // console.log(coupon);
    setLoading(true);
    try {
      const res = await axiosPublic.post("/api/coupon/create", { coupon });

      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const removeCoupon = async (couponId) => {
    setLoading(true);
    try {
      const res = await axiosPublic.delete(`/api/coupon/delete/${couponId}`);

      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getAllCoupon = async () => {
    setLoading(true);
    try {
      const res = await axiosPublic(`/api/coupon/list`);
      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const applyCoupon = async (coupon) => {
    setLoading(true);
    // console.log(coupon);
    try {
      const res = await axiosPublic.post("/api/user/checkoutCoupon", {
        coupon,
      });
      setCouponError(null);
      return res.data;
    } catch (error) {
      setCouponError("Invalid Coupon");
      return error;
    } finally {
      setLoading(false);
    }
  };

  return {
    createCoupon,
    removeCoupon,
    couponError,
    getAllCoupon,
    applyCoupon,
    loading,
  };
}

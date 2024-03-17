import React, { useState } from "react";
import useApiCall from "./api/useApiCall";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function useUser() {
  const { currentUser } = useSelector((state) => state.user);
  const axiosPublic = useApiCall();
  const [loading, setLoading] = useState(false);
  const userUpdate = async (userData) => {
    setLoading(true);
    if (!userData) {
      toast.success("nothing to change here");
    }
    try {
      const res = await axiosPublic.put(
        `/api/user/userProfileUpdate/${currentUser?._id}`,
        userData
      );
      return res.data;
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return { userUpdate, loading };
}

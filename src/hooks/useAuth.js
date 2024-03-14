import React, { useState } from "react";
import useApiCall from "./api/useApiCall";

export default function useAuth() {
  const axiosPublic = useApiCall();
  const [userLoading, setUserLoading] = useState(false);
  const userSignUp = async (userInfo) => {
    try {
      const res = await axiosPublic.post("/api/user/signup", userInfo);
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setUserLoading(false);
    }
  };

  return { userSignUp, userLoading };
}

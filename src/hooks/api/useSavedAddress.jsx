import React, { useState } from "react";
import useApiCall from "./useApiCall";

export default function useSavedAddress() {
  const axiosPublic = useApiCall();
  const [loading, setLoading] = useState(false);
  const saveAddress = async (address) => {
    console.log("address", address);
    setLoading(true);
    try {
      const response = await axiosPublic.put("/api/user/userAddress", {
        address,
      });
      console.log("res", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { saveAddress, loading };
}

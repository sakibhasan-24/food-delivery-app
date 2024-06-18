import React, { useState } from "react";
import useApiCall from "./useApiCall";

export default function useGetCategory() {
  const axiosPublic = useApiCall();
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const getCategory = async () => {
    setLoading(true);
    try {
      const res = await axiosPublic.get("/api/food/category");
      setCategoryList(res.data.categories);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { getCategory, categoryList, loading };
}

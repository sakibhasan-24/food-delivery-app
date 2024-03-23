import React, { useState } from "react";
import useApiCall from "./api/useApiCall";

export default function useCreateItem() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const axiosPublic = useApiCall();
  const createItem = async (item) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosPublic.post("/api/food/add-items", item);
      console.log(res.data);
      setItems([...items, res.data]);
      return res.data;
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { createItem, setItems, loading, error };
}

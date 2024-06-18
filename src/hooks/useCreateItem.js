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
      console.log(res);
      setItems([...items, res.data]);
      return res.data;
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const giveRating = async (productId, star) => {
    setLoading(true);

    try {
      const res = await axiosPublic.put(`/api/food/product/star/${productId}`, {
        star,
      });
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
  const updateItem = async (itemId, item) => {
    // console.log(item, itemId);
    setLoading(true);
    try {
      const res = await axiosPublic.put(`/api/food/edit-items/${itemId}`, item);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { createItem, setItems, loading, error, giveRating, updateItem };
}

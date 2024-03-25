import React, { useState } from "react";
import useApiCall from "./api/useApiCall";

export default function useGetItems() {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(6);

  const axiosPublic = useApiCall();

  const getItems = async () => {
    setLoading(true);
    try {
      const res = await axiosPublic.get(
        `/api/food/get-items?startIndex=${currentPage}&pageSize=${perPage}`
      );
      setItems(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  //   get singleItem

  const getItem = async (id) => {
    setLoading(true);
    try {
      const res = await axiosPublic.get(`/api/food/get-items?itemId=${id}`);
      setItem(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    getItems,
    items,
    setItems,
    perPage,
    currentPage,
    setCurrentPage,
    setPerPage,
    getItem,
    setItem,
    item,
  };
}

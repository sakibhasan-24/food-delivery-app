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

  const fetchItemsByFilterAndSearch = async (query) => {
    setLoading(true);
    try {
      const res = await axiosPublic.post("/api/food/search/filter", query);
      console.log("orginal", query);
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

  const getItemsByCategory = async (category) => {
    // console.log(category);
    setLoading(true);
    try {
      const res = await axiosPublic.get(
        `/api/food/get-items?category=${category}`
      );
      // console.log(res.data?.items);
      setItems(res?.data?.items);
      return res.data.items;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    getItems,
    fetchItemsByFilterAndSearch,
    items,
    setItems,
    perPage,
    currentPage,
    setCurrentPage,
    setPerPage,
    getItem,
    setItem,
    item,
    getItemsByCategory,
  };
}

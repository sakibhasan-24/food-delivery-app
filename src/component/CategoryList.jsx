import React, { useEffect } from "react";
import useGetCategory from "../hooks/api/useGetCategory";
import Spinner from "./spinner/Spinner";
import { Link } from "react-router-dom";

export default function CategoryList() {
  const { getCategory, categoryList, loading } = useGetCategory();
  useEffect(() => {
    getCategory();
  }, []);

  //   console.log(categoryList);
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="max-w-6xl mx-auto p-4 my-12 ">
      <h1 className="text-2xl font-bold text-center mb-4">Category List</h1>
      <div className="flex flex-wrap items-center justify-center text-center gap-4">
        {categoryList.map((category, index) => (
          <div
            key={index}
            className=" bg-slate-700 font-medium text-xl rounded-lg shadow-md p-4 hover:shadow-xl transition duration-300"
          >
            <Link to={`/category/${category}`} className="w-full">
              {category}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

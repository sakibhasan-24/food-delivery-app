import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "../redux/searchReducer/searchReducer";
import { Link, useNavigate } from "react-router-dom";

export default function SearchBox() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchText } = useSelector((state) => state.search);
  // console.log(searchText);
  const handleChange = (e) => {
    // console.log(e.target.value);
    dispatch(setSearchText(e.target.value));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/searchItems/${searchText}`);
  };
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        onChange={handleChange}
        className="w-full px-4 py-2 text-slate-950 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
        value={searchText}
        placeholder="Search..."
      />
      {/* right-3 top-1/2 transform -translate-y-1/2 */}

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 cursor-pointer  text-gray-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        onClick={handleSubmit}
      >
        <line x1="21" y1="21" x2="15.8" y2="15.8" />
        <circle cx="10.5" cy="10.5" r="7.5" />
      </svg>
    </form>
  );
}

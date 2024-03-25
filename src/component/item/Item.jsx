import React from "react";
import { Link } from "react-router-dom";

export default function Item({ item }) {
  return (
    <div className="shadow-lg max-w-xs mx-auto shadow-sky-100 bg-slate-50 z-20  rounded-lg my-12">
      <div className="flex items-center   justify-center ">
        <img
          src={item.image[0]}
          alt="images"
          className="rounded-lg  w-full  mx-auto"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl text-slate-600 z-50 font-bold mb-4">
          {item.name}
        </h2>
        <div className="flex flex-wrap gap-2 items-center justify-center">
          <p className="text-slate-900 bg-green-500 text-xs p-2 rounded-md mb-4">
            {item.category}
          </p>
          {item.ingredients.map((ingre, index) => (
            <p
              key={index}
              className="text-slate-900 shadow-lg shadow-orange-700 bg-orange-200 rounded-lg p-2 text-xs mb-4"
            >
              {ingre}
            </p>
          ))}
        </div>
        <div className="flex justify-between items-center my-6">
          <p className="text-slate-900 text-xl ">
            $
            <span className="text-2xl font-bold text-slate-700">
              {item.price}
            </span>
          </p>
          <button className="bg-teal-500 font-bold text-white px-2 py-1 rounded-md hover:bg-teal-600 transition-all duration-300">
            Add to Cart
          </button>
        </div>
        <Link
          to={`/item/details/${item.name}/${item._id}`}
          className="text-lg hover:underline font-bold text-green-500 text-center mt-6"
        >
          details
        </Link>
      </div>
    </div>
  );
}

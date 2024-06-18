import React, { useState } from "react";
import { Link } from "react-router-dom";
import showAverage from "../../helper/ratingCalculate";
import ShowAverageRating from "../ShowAverageRating";
import _ from "lodash";
import { Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
export default function Item({ item }) {
  const { currentUser } = useSelector((state) => state.user);
  const { itemCart } = useSelector((state) => state.itemCart);
  const dispath = useDispatch();
  // console.log(itemCart);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [toolTip, setToolTip] = useState("Click To Add Item");
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleAddToItem = () => {
    // console.log(item);
    let itemCart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("itemCart")) {
        itemCart = JSON.parse(localStorage.getItem("itemCart"));
      }
      itemCart.push({ ...item, numberOfItem: 1, gift: "Chocolate" });

      //remove duplicate

      let unique = _.uniqWith(itemCart, _.isEqual);
      // console.log(unique);
      localStorage.setItem("itemCart", JSON.stringify(unique));
      // save to localStorage
      dispath({ type: "ADD_TO_CART", payload: unique });
      dispath({ type: "SET_VISIBLE", payload: true });
      setToolTip("Added");
    }
  };
  return (
    <div
      onLoad={handleImageLoad}
      className={`shadow-lg w-[400px] sm:w-full mx-auto  flex flex-col shadow-slate-950   rounded-lg my-12 `}
    >
      <div className="flex items-center justify-center gap-2 my-2">
        {item && item.ratings && item.ratings.length > 0 ? (
          <ShowAverageRating item={item} />
        ) : (
          "no rating yet"
        )}
      </div>
      {!imageLoaded && (
        <div className="flex flex-col gap-4 w-full h-full">
          <div className="skeleton h-32 w-full"></div>
        </div>
      )}
      <div className="flex items-center  justify-center ">
        <img
          className={`rounded-lg  h-[200px] w-full  mx-auto`}
          src={item.image[0]}
          alt="images"
        />
      </div>
      <div className="p-4 flex-grow  ">
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
          <p className="text-slate-50 text-xl ">
            $
            <span className="text-2xl font-bold text-slate-500">
              {item.price}
            </span>
          </p>
          <Tooltip title={toolTip}>
            <button
              onClick={() => handleAddToItem(item)}
              className="bg-teal-500 font-bold text-white px-2 py-1 rounded-md hover:bg-teal-600 transition-all duration-300"
            >
              Add to Cart
            </button>
          </Tooltip>
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

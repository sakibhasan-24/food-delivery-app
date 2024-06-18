import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useGetItems from "../../hooks/useGetItems";
import Spinner from "../spinner/Spinner";
import CarouselItem from "../carousel/CarouselItem";
import StarRatings from "react-star-ratings";
import StarModal from "../modal/StarModal";
import { CiShoppingCart } from "react-icons/ci";
import useCreateItem from "../../hooks/useCreateItem";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import ShowAverageRating from "../ShowAverageRating";
import Item from "../item/Item";
import { Tooltip } from "antd";

export default function ItemDetails() {
  const { itemId } = useParams();
  const { item, getItem, loading, getItemsByCategory } = useGetItems();
  // console.log("hhss", item.items);
  const { giveRating } = useCreateItem();
  const [imageLoading, setImageLoading] = useState(false);
  const [star, setStar] = useState(0);
  const [toolTip, setToolTip] = useState("Click To Add Item");
  const { itemCart } = useSelector((state) => state.itemCart);
  const dispath = useDispatch();

  const { currentUser } = useSelector((state) => state.user);

  const imageIsLoading = () => {
    setImageLoading(true);
  };

  const handleAddToItem = () => {
    // console.log(item);
    let itemCart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("itemCart")) {
        itemCart = JSON.parse(localStorage.getItem("itemCart"));
      }
      itemCart.push({ ...item.items, numberOfItem: 1, gift: "choclate" });

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
  // console.log(JSON.parse(localStorage.getItem("itemCart")));
  const [categoryItem, setCategoryItem] = useState([]);

  useEffect(() => {
    const callApi = async () => {
      if (item) {
        const getCategoryItem = await getItemsByCategory(
          item?.items?.[0]?.category
        );

        setCategoryItem(getCategoryItem.filter((item) => item._id !== itemId));
        // console.log(getCategoryItem.map((i) => i._id));
      }
    };
    callApi();
  }, [item, itemId]);
  useEffect(() => {
    const fetchData = async () => {
      if (item && item.items && item.items.length > 0 && currentUser) {
        let existingRatings = item.items[0].ratings.find(
          (ele) => ele.postedBy.toString() === currentUser._id.toString()
        );
        if (existingRatings) {
          setStar(existingRatings.star);
        }
      }
    };

    fetchData();
  }, [item, currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      await getItem(itemId);
    };
    if (itemId) {
      fetchData();
    }
  }, [itemId]);

  useEffect(() => {
    if (itemId && item) {
      getItemsByCategory(item?.items?.[0]?.category);
    }
  }, [itemId, item]);

  if (loading || !item || Object.keys(item).length === 0) {
    return <Spinner />;
  }

  const newItem = item?.items?.[0];
  const newPrice = newItem?.price - newItem?.offerPercentage;

  const handleRating = async (rating, name) => {
    setStar(rating);
    const res = await giveRating(name, rating);
  };

  return (
    <div>
      <div
        onLoad={imageIsLoading}
        className="w-full sm:max-w-6xl flex flex-col gap-6 sm:flex-row"
      >
        {!imageLoading && (
          <div className="flex flex-col gap-4 w-full h-full">
            <div className="skeleton h-32 w-full"></div>
          </div>
        )}
        <CarouselItem itemImages={newItem?.image} item={item} />

        <section className="my-6 px-4 w-full">
          <h1 className="text-2xl font-semibol bg-green-600 text-neutral py-4 rounded-lg w-full text-center">
            {newItem?.name}
          </h1>
          {newItem && newItem.ratings && newItem.ratings.length > 0 ? (
            <ShowAverageRating item={newItem} />
          ) : (
            "no rating yet"
          )}

          <div className="flex justify-between my-12 text-xl">
            <p className="text-neutral-content">price</p>
            <p
              className={`font-semibol text-neutral-content ${
                newItem?.isOffer && "line-through"
              }`}
            >
              ${newItem?.price}
            </p>
          </div>
          <div className="flex justify-between my-12 text-xl">
            <p className="text-neutral-content">offer</p>
            <p className="font-semibol text-neutral-content">
              {newItem?.isOffer ? `${newItem?.offerPercentage}%` : "No offer"}
            </p>
          </div>
          <div className="flex justify-between my-12 text-xl">
            <p className="text-neutral-content">offer price</p>
            <p className="font-semibol text-neutral-content">
              {newItem?.isOffer && newPrice}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="border-r-2">
              <Tooltip title={toolTip}>
                <CiShoppingCart className="text-center ml-8" />
                <button
                  onClick={handleAddToItem}
                  className="bg-teal-500 font-bold text-white px-2 py-1 rounded-md hover:bg-teal-600 transition-all duration-300"
                >
                  Add to Cart
                </button>
              </Tooltip>
            </div>
            <div className="cursor-pointer">
              <StarModal>
                <StarRatings
                  name={itemId}
                  numberOfStars={5}
                  rating={star}
                  changeRating={handleRating}
                  starRatedColor="orange"
                  starDimension="50px"
                  starSpacing="5px"
                  isSelectable={true}
                />
              </StarModal>
            </div>
          </div>
        </section>
      </div>
      <div className="max-w-6xl mx-auto p-4 ">
        <h1 className="font-bold text-orange-400 text-2xl text-center">
          related
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-center justify-center">
          {categoryItem.length > 0 &&
            categoryItem &&
            categoryItem.map((item) => <Item item={item} key={item._id} />)}
        </div>
      </div>
    </div>
  );
}

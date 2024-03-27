import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useGetItems from "../../hooks/useGetItems";
import Spinner from "../spinner/Spinner";
import CarouselItem from "../carousel/CarouselItem";

export default function ItemDetails() {
  const { itemId } = useParams();
  const { item, setItem, getItem, loading } = useGetItems();
  const [imageLoading, setImageLoading] = useState(false);
  const [seeMore, setSeeMore] = useState(false);
  const seeMoreRef = useRef(null);

  const imageIsLoading = () => {
    setImageLoading(true);
  };
  useEffect(() => {
    const getItemCall = async () => {
      await getItem(itemId);
    };
    if (itemId) {
      getItemCall();
    }
  }, [itemId]);
  //   console.log(item);
  if (loading || Object.keys(item).length === 0) {
    return <Spinner />;
  }
  //   console.log(item.items[0].image);
  const newPrice =
    Number(item?.items[0]?.price) - Number(item?.items[0]?.offerPercentage);
  console.log(newPrice);
  //   console.log()
  return (
    <div
      onLoad={imageIsLoading}
      className="w-full sm:max-w-6xl   flex flex-col gap-6 sm:flex-row "
    >
      {!imageLoading && (
        <div className="flex flex-col gap-4 w-full h-full">
          <div className="skeleton h-32 w-full"></div>
        </div>
      )}
      <CarouselItem itemImages={item.items[0].image} item={item} />

      <section className="my-6  px-4  w-full">
        <h1 className="text-2xl font-semibol bg-green-600 text-neutral py-4 rounded-lg w-full text-center">
          {item.items[0].name}
        </h1>
        <div className="flex justify-between my-12 text-xl">
          <p className=" text-neutral-content">price </p>
          <p
            className={`font-semibol text-neutral-content ${
              item.items[0].isOffer && "line-through"
            } `}
          >
            ${item.items[0].price}
          </p>
        </div>
        <div className="flex justify-between my-12 text-xl">
          <p className=" text-neutral-content">offer</p>
          <p className=" font-semibol text-neutral-content">
            {item.items[0].isOffer
              ? `${item.items[0].offerPercentage}%`
              : "No offer"}
          </p>
        </div>
        <div className="flex justify-between my-12 text-xl">
          <p className=" text-neutral-content">offer price</p>
          <p className=" font-semibol text-neutral-content">
            {item.items[0].isOffer && newPrice}
          </p>
        </div>
      </section>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGetItems from "../../hooks/useGetItems";
import Spinner from "../spinner/Spinner";
import CarouselItem from "../carousel/CarouselItem";

export default function ItemDetails() {
  const { itemId } = useParams();
  const { item, setItem, getItem, loading } = useGetItems();
  const [imageLoading, setImageLoading] = useState(false);
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
  if (loading || Object.keys(item).length === 0) {
    return <Spinner />;
  }
  //   console.log(item.items[0].image);

  //   console.log()
  return (
    <div
      onLoad={imageIsLoading}
      className="w-full sm:max-w-6xl  bg-green-900 flex flex-col gap-6 sm:flex-row "
    >
      {!imageLoading && (
        <div className="flex flex-col gap-4 w-full h-full">
          <div className="skeleton h-32 w-full"></div>
        </div>
      )}
      <CarouselItem itemImages={item.items[0].image} />

      <section className=" bg-red-900  w-full">
        <h1 className="text-2xl font-semibold text-center">
          {item.items[0].name}
        </h1>
      </section>
    </div>
  );
}

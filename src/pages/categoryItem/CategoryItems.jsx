import React, { useEffect, useState } from "react";
import useGetItems from "../../hooks/useGetItems";
import Spinner from "../../component/spinner/Spinner";
import { useParams } from "react-router-dom";
import Item from "../../component/item/Item";

export default function CategoryItems() {
  const { getItemsByCategory, loading } = useGetItems();
  const { category } = useParams();
  const [items, setItems] = useState([]);
  //   console.log(params);

  useEffect(() => {
    const callCategory = async () => {
      const data = await getItemsByCategory(category);
      console.log(data);
      setItems(data);
    };
    if (category) callCategory();
  }, [category]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8">
      {items.length !== 0 ? (
        <h1 className="text-4xl text-slate-200 text-center font-bold mb-4">
          Items for
          <span className="text-amber-700   "> {category}s</span>
        </h1>
      ) : (
        <h1 className="text-4xl text-slate-200 text-center font-bold mb-4">
          No Items for
          <span className="text-amber-700   "> {category}s</span>
        </h1>
      )}
      <div className="flex flex-wrap items-center gap-8 justify-center">
        {items.length > 0 &&
          items &&
          items.map((item) => <Item item={item} key={item._id} />)}
      </div>
    </div>
  );
}

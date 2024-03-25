import React, { useEffect } from "react";
import useGetItems from "../../hooks/useGetItems";
import Spinner from "../../component/spinner/Spinner";
import Item from "../../component/item/Item";
import { Select } from "flowbite-react";

export default function Items() {
  const {
    loading,
    getItems,
    items,
    perPage,
    currentPage,
    setCurrentPage,
    setPerPage,
  } = useGetItems();
  //   console.log(getItems);

  useEffect(() => {
    const callItemsFunction = async () => {
      await getItems();
    };
    callItemsFunction();
  }, [currentPage, perPage]);
  if (loading || items.length === 0) {
    return <Spinner />;
  }
  //   console.log(perPage);
  const totalPage = Math.ceil(items?.totalItems / perPage);
  const pageList = [...Array(totalPage).keys()];
  const handleCurrentPage = (page) => {
    // console.log(page);
    setCurrentPage(page);
  };
  //   console.log(currentPage);
  const handleCurrentPageChange = (e) => {
    setPerPage(parseInt(e.target.value));
    setCurrentPage(0);
  };

  //   console.log(items.items);
  return (
    <div className="w-full sm:max-w-5xl mx-auto p-4 sm:p-8 ">
      <div className="mb-12">
        <h1 className="text-center text-slate-100 font-semibold text-3xl ">
          Food You Can Order
        </h1>
        <p className="text-center text-slate-300  text-xs">
          We have {items?.totalItems} items to order
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center justify-center gap-12">
          {items &&
            items.items.map((item) => <Item key={item._id} item={item} />)}
        </div>
      </div>
      {items.totalItems > 6 && (
        <div className=" max-w-6xl mx-auto sm:p-12 flex flex-wrap gap-4 items-center justify-center rounded-lg">
          {pageList.map((btn) => (
            <button
              style={{ backgroundColor: currentPage === btn ? "red" : "black" }}
              onClick={() => handleCurrentPage(btn)}
              className="bg-slate-900 text-white px-4 py-2 rounded-lg ml-4"
              key={btn}
            >
              {btn + 1}
            </button>
          ))}
          <Select
            name=""
            id=""
            value={perPage}
            onChange={handleCurrentPageChange}
            className="ml-6 "
          >
            <option className="" value="1">
              1
            </option>
            <option value="2"> 2 </option>
            <option value="3"> 3 </option>
            <option value={items?.totalItems}>All </option>
          </Select>
        </div>
      )}
    </div>
  );
}

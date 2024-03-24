import React, { useEffect } from "react";
import useGetItems from "../../hooks/useGetItems";
import Spinner from "../../component/spinner/Spinner";

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
  }, []);
  if (loading || items.length === 0) {
    return <Spinner />;
  }
  //   console.log(perPage);
  const totalPage = Math.ceil(items?.totalItems / perPage);
  const pageList = [...Array(totalPage).keys()];
  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  };
  const handleCurrentPageChange = (e) => {
    // setNumberOfItemPerPage(parseInt(e.target.value));
    setPerPage(parseInt(e.target.value));
    setCurrentPage(0);
  };

  return (
    <div>
      Items
      {items.totalItems > 6 && (
        <div className=" max-w-6xl mx-auto sm:p-12 flex items-center justify-center rounded-lg">
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
          <select
            name=""
            id=""
            value={perPage}
            onChange={handleCurrentPageChange}
            className="ml-6"
          >
            <option value="1"> 1 </option>
            <option value="2"> 2 </option>
            <option value="3"> 3 </option>
            <option value={items?.totalItems}>All </option>
          </select>
        </div>
      )}
    </div>
  );
}

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ProductKeyTable from "../../component/productKeyTable/ProductKeyTable";
import useSavedOrderedItem from "../../hooks/api/useSavedOrderedItem";
import { toast } from "react-toastify";
import useCashOnDelivery from "../../hooks/useCashOnDelivery";

export default function Checkout() {
  const { error, data, setData, loading, savedItemInDb } =
    useSavedOrderedItem();
  const { useOrderForPayOnCash } = useCashOnDelivery();
  const { currentUser } = useSelector((state) => state.user);
  const itemCart = useSelector((state) => state.itemCart);
  const cash = useSelector((state) => state.cash);
  // console.log(cash);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAddToDb = async () => {
    // alert("save");
    const res = await savedItemInDb(itemCart);

    if (res.success) {
      toast.success("Order Placed");
      // console.log(res);
    }
    navigate("/checkoutProcedure");
  };
  const handleCashOnAddToDb = async () => {
    // alert("save");
    dispatch({
      type: "CASH",
      payload: true,
    });
    const response = await savedItemInDb(itemCart);
    const res = await useOrderForPayOnCash(cash);

    if (res.success) {
      toast.success("Order Placed");
      // console.log(res);
    }
    navigate("/checkoutProcedure");
  };
  //   console.log(itemCart);
  const totalPrice = itemCart.reduce(
    (acc, item) => acc + item.price * item.numberOfItem,
    0
  );
  return (
    <div className="w-full sm:max-w-7xl  md:max-w-8xl mx-auto p-8 sm:p-4">
      <h1 className="text-amber-700 font-bold text-6xl text-center">
        checkout
      </h1>

      <div className="flex flex-col sm:flex-col md:flex-row gap-12  justify-between">
        <div className="w-full sm:w-2/3">
          {/* first div for all items in table */}
          {itemCart.length < 1 ? (
            <p className="text-3xl font-semibold ">
              No Items Added ! <Link to="/search">Add items</Link>{" "}
            </p>
          ) : (
            <>
              <h1 className="text-3xl font-semibold ">
                {itemCart.length} Items Found
              </h1>
              <div className=" mx-2 sm:mx-12">
                <table className="min-w-full space-y-4 divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-blue-400 to-purple-500 text-white">
                    <tr>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Image</th>
                      <th className="px-4 py-3">Price</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Gift</th>
                      <th className="px-4 py-3">Count</th>
                      <th className="px-4 py-3">Remove</th>
                    </tr>
                  </thead>
                  {itemCart.map((item) => (
                    <ProductKeyTable item={item} key={item._id} />
                  ))}
                  {/* Add table body here */}
                </table>
              </div>
            </>
          )}
        </div>
        <div className="w-full sm:w-1/3">
          {/* items for calculations */}

          <h1 className="text-center fotn-bold text-2xl  mb-4">
            Order Summary
          </h1>
          <hr className="divide-x-8" />
          <div>
            <h1>Items</h1>
            <>
              {itemCart.map((item, idx) => (
                <div
                  key={idx}
                  className="my-4 font-semibold text-xl text-slate-100"
                >
                  <p>
                    {item.name} X {item.numberOfItem}= $
                    {item.price * item.numberOfItem}
                  </p>
                </div>
              ))}
              <hr />
              <h1>total : ${totalPrice}</h1>
              <hr />

              {currentUser ? (
                <>
                  <button
                    onClick={handleAddToDb}
                    disabled={!itemCart.length}
                    className="my-4 bg-green-500 text-white px-4 py-2 rounded-md font-bold"
                  >
                    {loading ? "Loading......" : "proceed to checkout"}
                  </button>
                  <button
                    onClick={handleCashOnAddToDb}
                    disabled={!itemCart.length}
                    className="my-4 ml-4 bg-teal-500 text-white px-4 py-2 rounded-md font-bold"
                  >
                    Cash On Delivery
                  </button>
                </>
              ) : (
                <Link
                  to={{
                    pathname: "/login",
                    state: {
                      from: "checkout",
                    },
                  }}
                >
                  <button className="my-4 bg-green-500 text-white px-4 py-2 rounded-md font-bold">
                    Login To checkOut
                  </button>
                </Link>
              )}
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

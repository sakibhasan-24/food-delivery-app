import React, { useEffect, useState } from "react";
import useGetOrderItems from "../../hooks/api/useGetOrderItems";
import Spinner from "../../component/spinner/Spinner";
import useEmptyUserOrders from "../../hooks/useEmptyUserOrders";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// import { Quill } from "react-quill";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useSavedAddress from "../../hooks/api/useSavedAddress";
import useCoupon from "../../hooks/api/useCoupon";
import { useNavigate } from "react-router-dom";
import useCashOnDelivery from "../../hooks/useCashOnDelivery";

export default function CheckoutProcedure() {
  const { getOrderItems, loading, error, orderItems, setOrderItems } =
    useGetOrderItems();

  const { useOrderForPayOnCash } = useCashOnDelivery();
  const { applyCoupon, couponError } = useCoupon();
  const { currentUser } = useSelector((state) => state.user);
  const couponReducer = useSelector((state) => state.couponReducer);
  const cash = useSelector((state) => state.cash);
  // console.log(couponReducer);
  const { saveAddress } = useSavedAddress();
  const [address, setAddress] = useState("");
  const [coupon, setCoupon] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);

  const [isAddress, setIsAddress] = useState(true);
  //   console.log(orderItems);

  const navigate = useNavigate();
  const handlePayment = () => {
    navigate("/orderitems/payment");
  };
  const { clearOrder } = useEmptyUserOrders();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchApi = async () => {
      await getOrderItems();
    };
    fetchApi();
  }, []);
  const handleClearOrder = async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("itemCart");
      dispatch({
        type: "ADD_TO_CART",
        payload: [],
      });
    }
    const res = await clearOrder();
    // console.log("proce", res);
    if (res.success) {
      setOrderItems([]);
      setTotalAfterDiscount(0);
      setCoupon("");
      // couponError(null);
      toast.success("Clear order success");
    }
  };
  //   console.log(orderItems?.itemsOrder);

  const handleSaveAddress = async () => {
    const res = await saveAddress(address);
    // console.log("save", res);
    if (res.success) {
      setIsAddress(false);
      toast.success("Save address success");
    }
  };
  // console.log(isAddress);

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    // console.log(coupon);
    const res = await applyCoupon(coupon);
    // console.log("apply", res);
    if (res.success) {
      dispatch({
        type: "COUPON_APPLIED",
        payload: true,
      });
      setTotalAfterDiscount(res.totalAfterApplyCoupon);
      toast.success("Apply coupon success");
    } else {
      console.log(res);
      dispatch({
        type: "COUPON_APPLIED",
        payload: false,
      });
    }
  };
  const handlePaymentOnCash = async () => {
    const res = await useOrderForPayOnCash(cash, couponReducer);
    if (res.success) {
      dispatch({
        type: "ADD_TO_CART",
        payload: [],
      });
      dispatch({
        type: "CASH",
        payload: false,
      });
      dispatch({
        type: "COUPON_APPLIED",
        payload: false,
      });
      if (typeof window !== "undefined") {
        localStorage.removeItem("itemCart");
        // localStorage.removeItem("coupon");
      }
      clearOrder();

      setTimeout(() => {
        navigate("/order/purchase-history");
      }, 1000);
    }
  };
  if (orderItems?.itemsOrder?.length === 0 || loading) return <Spinner />;
  return (
    <div className="w-full my-12 mx-2 sm:max-w-6xl sm:mx-auto">
      <h1 className="text-4xl my-6 text-amber-700 text-center">
        Checkout Procedure
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2">
        <div>
          <h1>Address</h1>
          {/* <Quill theme="snow" />
           */}
          <ReactQuill theme="snow" value={address} onChange={setAddress} />
          <br />
          <br />
          <button
            onClick={handleSaveAddress}
            className="bg-amber-700 p-2 my-6 rounded-md text-white"
          >
            Save Address
          </button>
          <hr />
          <h4 className="text-center font-bold text-3xl">Apply for Coupoun</h4>
          <div className="w-full my-6 ">
            {couponError && (
              <p className="text-center text-red-800">{couponError}</p>
            )}
            <form onSubmit={handleApplyCoupon}>
              <input
                type="text"
                name="coupon"
                id="coupon"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="w-full py-4 bg-slate-100 text-slate-950 rounded-md border-none focus:border-b-red-200 p-2"
                placeholder="write a valid coupon"
              />
              <input
                type="submit"
                value="Apply"
                className="w-full my-4 cursor-pointer bg-slate-800 text-slate-50 font-bold px-4 py-2 rounded-md border-0 focus:outline-none hover:bg-slate-700"
              />
            </form>
          </div>
        </div>
        <div>
          <h3 className="text-center text-2xl my-2 font-bold ">
            Order Summary
          </h3>
          <h1 className="text-4xl font-bold ">
            Total : ${orderItems?.totalPrice}
          </h1>
          <hr />
          <h3 className="text-3xl font-bold ">
            Items {orderItems?.itemsOrder?.length}
          </h3>

          <div>
            {orderItems?.itemsOrder?.length > 0 &&
              orderItems?.itemsOrder?.map((item, idx) => {
                return (
                  <div key={idx} className="w-full my-6">
                    <div className="w-full mx-auto sm:mx-0 sm:w-[500px]">
                      <h1 className="space-x-4">
                        {item.name} X {item.numberOfItem} = $
                        {item.numberOfItem * item.price}
                      </h1>
                    </div>
                  </div>
                );
              })}
          </div>
          <hr />
          <h3 className="text-4xl font-bold ">
            Total ${orderItems?.totalPrice}
          </h3>
          {totalAfterDiscount > 0 && (
            <p className="font-bold text-xl text-green-400">
              total Payable Amount : ${totalAfterDiscount}
            </p>
          )}
          <div className="flex justify-between gap-6 font-bold items-center">
            {cash ? (
              <button
                onClick={handlePaymentOnCash}
                disabled={isAddress || !orderItems?.itemsOrder?.length}
                className="bg-green-700 px-4 py-2 rounded-md text-white"
              >
                Order
              </button>
            ) : (
              <button
                onClick={handlePayment}
                disabled={isAddress || !orderItems?.itemsOrder?.length}
                className="bg-green-700 px-4 py-2 rounded-md text-white"
              >
                Order
              </button>
            )}

            <button
              onClick={handleClearOrder}
              disabled={!orderItems?.itemsOrder?.length}
              className="bg-red-700 px-4  py-2 rounded-md text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

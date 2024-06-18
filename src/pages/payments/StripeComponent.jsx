import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useStripes from "../../hooks/useStripes";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Card from "antd/es/card/Card";
import { CheckOutlined, DollarOutlined } from "@ant-design/icons";
import useEmptyUserOrders from "../../hooks/useEmptyUserOrders";

export default function StripeComponent() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { couponReducer: coupon } = useSelector((state) => state);
  //   console.log(couponReducer);
  const { createPaymentIntent, createOrder } = useStripes();
  const { clearOrder } = useEmptyUserOrders();
  //   console.log(createPaymentIntent);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);
  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    const callApi = async () => {
      const res = await createPaymentIntent(coupon);
      console.log(res);
      setClientSecret(res?.data?.clientSecret);
      setCartTotal(res?.data?.totalPrice);
      setTotalAfterDiscount(res?.data?.totalAfterApplyCoupon);
      setPayable(res?.data?.payable);
    };
    callApi();
  }, []);
  console.log(clientSecret);
  const cartStyle = {
    style: {
      base: {
        iconColor: "#6B7280", // Adjusted icon color
        color: "#1F2937", // Adjusted text color
        fontWeight: "500",
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": {
          color: "#4B5563", // Adjusted autofill color
        },
        "::placeholder": {
          color: "#6B7280", // Adjusted placeholder color
        },
      },
      invalid: {
        iconColor: "#EF4444", // Adjusted icon color for invalid input
        color: "#EF4444", // Adjusted text color for invalid input
      },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });
    if (payload.error) {
      toast.error(payload.error.message);
      setProcessing(false);
      setError(`Payment Failed`);
    } else {
      //   console.log(payload);
      const res = await createOrder(payload);
      //   console.log(res, "from cart");
      if (res.success) {
        if (typeof window !== undefined) {
          localStorage.removeItem("itemCart");
          dispatch({
            type: "ADD_TO_CART",
            payload: [],
          });
          dispatch({
            type: "COUPON_APPLIED",
            payload: false,
          });
          const res = await clearOrder();
          if (res.success) {
            toast.success("Clear order success");
          }
        }
      }
      setSucceeded(true);
      setError(null);
      setProcessing(false);
    }
  };
  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };
  // console.log(clientSecret);
  return (
    <div>
      <>
        {!succeeded && totalAfterDiscount !== undefined ? (
          <>
            <p className="text-green-700 text-center">coupon applied</p>
          </>
        ) : (
          <>
            <p className="text-red-800 text-center">No coupon Apply!!</p>
          </>
        )}
        <Card
          className="max-w-xl mx-auto"
          actions={[
            <>
              <DollarOutlined className="text-teal-600" />
              <br />
              <span className="text-teal-600 font-semibold">
                Total Amount: ${cartTotal}
              </span>
            </>,
            <>
              <CheckOutlined className="text-teal-300 text-4xl" />
              <br />
              <span className="text-teal-600 font-semibold">
                `Total payable: $${(payable / 100).toFixed(2)}`
              </span>
            </>,
          ]}
        />
        <p
          className={
            succeeded ? "text-green-600 font-semibold text-center" : "hidden"
          }
        >
          payment Successfull
          <Link to="/order/purchase-history" className="ml-4">
            {" "}
            check your purchase
          </Link>
        </p>
        <form
          className="form-control w-full p-4 sm:max-w-xl mx-auto sm:p-6"
          onSubmit={handleSubmit}
        >
          <CardElement
            options={cartStyle}
            onChange={handleChange}
            className="block bg-slate-300 px-4 py-6 rounded-md mb-4 font-bold text-2xl text-slate-900"
          />
          <button
            disabled={processing || disabled || succeeded}
            className="w-[200px]  mx-auto bg-green-800 my-6 text-2xl text-white font-bold py-2 px-4 rounded-md"
          >
            {processing ? (
              <p className="text-xs">Processing....</p>
            ) : (
              <span>Pay Now</span>
            )}
          </button>
          <br />
          {error && (
            <p className="text-red-600 mt-1 text-center " role={alert}>
              {error}
            </p>
          )}
        </form>
      </>
    </div>
  );
}

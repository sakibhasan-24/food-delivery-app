import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import StripeComponent from "./StripeComponent";

const stripeSecret = loadStripe(import.meta.env.VITE_PAYMENT_KEY);
export default function Payment() {
  // console.log(import.meta.env.VITE_PAYMENT_KEY);
  return (
    <div className="w-full mx-2 sm:max-w-6xl sm:mx-auto my-6 ">
      <h1 className="text-center font-bold text-4xl ">
        complete payment procedure
      </h1>
      <Elements stripe={stripeSecret}>
        <StripeComponent />
      </Elements>
    </div>
  );
}

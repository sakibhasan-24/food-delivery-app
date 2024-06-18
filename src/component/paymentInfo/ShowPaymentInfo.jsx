import React from "react";

export default function ShowPaymentInfo({ order }) {
  // console.log(order);
  return (
    <div className="">
      <p className="p-4">
        <span>Order Id :{order.paymentIntent.id}</span> <br />
        <span>
          Amount:
          {(order.paymentIntent.amount / 100).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}{" "}
        </span>
        <br />
        <span className="my-4">
          order on{" "}
          {new Date(order.paymentIntent.created * 1000).toLocaleDateString()}
        </span>{" "}
        <br />
        <span className="bg-green-800 text-white p-2 my-6">
          Status : {order.orderStatus}
        </span>{" "}
        <br />
      </p>
    </div>
  );
}

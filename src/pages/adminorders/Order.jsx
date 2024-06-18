import React from "react";
import ShowPaymentInfo from "../../component/paymentInfo/ShowPaymentInfo";
import { Select } from "flowbite-react";
import ProductKeyTable from "../../component/productKeyTable/ProductKeyTable";

export default function Order({ orders, handleStatusChange }) {
  const showOrderInTable = (order, idx) => (
    <div className="mx-2 bg-green-700 sm:mx-12 shadow-lg rounded-lg" key={idx}>
      <table className="min-w-full space-y-8 divide-y divide-gray-200">
        <thead className="bg-gradient-to-r text-center from-blue-400 to-purple-500 text-white">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Gift</th>
            <th className="px-4 py-3">Count</th>
          </tr>
        </thead>

        <tbody className=" text-white ">
          {order?.itemsOrder?.map((item, idx) => (
            <tr key={idx} className="  border-gray-200 ">
              <td className="px-4 py-3">{item?.name}</td>
              <td className="px-4 py-3">{item?.price}</td>
              <td className="px-4 py-3">{item?.gift}</td>
              <td className="px-4 py-3">{item?.numberOfItem}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  //   console.log(showOrderInTable(orders[0]));
  return (
    <div className="border-4 p-7  text-slate-200 space-y-4">
      {orders.map((order) => (
        <div key={order._id}>
          <ShowPaymentInfo order={order} />
          <div>
            <h1 className="text-xl font-bold">delivary status</h1>
            <Select
              defaultValue={order.orderStatus}
              onChange={(e) => handleStatusChange(order._id, e.target.value)}
              className="bg-slate-800 text-slate-950"
              name="status"
            >
              {/* no processed", "processing", "completed", "cancelled */}
              <option value="no processed">No Processed</option>
              <option value="Cash On Delivery">Cash On Delivery</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </Select>
          </div>
          <div className="my-6">{showOrderInTable(order)}</div>
        </div>
      ))}
    </div>
  );
}

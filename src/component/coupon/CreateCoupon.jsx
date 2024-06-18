import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import useCoupon from "../../hooks/api/useCoupon";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { CiTrash } from "react-icons/ci";
import Swal from "sweetalert2";
export default function CreateCoupon() {
  const { currenUser } = useSelector((state) => state.user);
  const { createCoupon, removeCoupon, getAllCoupon } = useCoupon();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [discount, setDiscount] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCoupon = async () => {
      const res = await getAllCoupon();
      if (res.success) {
        // console.log(res.coupons);
        setCoupons(res.coupons);
      }
    };
    fetchCoupon();
  }, [coupons]);

  console.log(coupons);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createCoupon({ name, expireDate, discount });
      console.log(res);
      if (!res) {
        return toast.error("something went wrong");
        setLoading(false);
      }
      if (res.success) {
        toast.success("coupon created successfully");
        setLoading(false);
        setName("");
        setExpireDate("");
        setDiscount("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await removeCoupon(id);
        console.log(res);
        if (res.success) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      }
    });
    try {
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" w-full mx-2 flex flex-col sm:flex-row justify-center gap-6 sm:max-w-8xl sm:mx-auto p-4">
      <div className="w-full mt-8 p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-slate-950">Add Coupon</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Coupon Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 block w-full rounded-md text-slate-950 border-gray-300 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter coupon name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="expireDate"
              className="block text-sm font-medium text-gray-700"
            >
              Expiration Date
            </label>
            <DatePicker
              selected={expireDate}
              value={expireDate}
              onChange={(date) => setExpireDate(date)}
              className="mt-1 w-full p-2 block text-slate-900 rounded-md border-gray-300 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="discount"
              className="block text-sm font-medium text-gray-700"
            >
              Discount
            </label>
            <input
              type="text"
              id="discount"
              name="discount"
              value={discount}
              onChange={(e) => setDiscount(parseInt(e.target.value))}
              className="mt-1 p-2 block text-slate-950 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter discount amount"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          >
            {loading ? "loading......" : "add coupon"}
          </button>
        </form>
      </div>
      <div className="w-full mx-1 sm:max-w-xl sm:mx-auto">
        <h1 className="text-xl font-bold text-slate-100 text-center">
          available coupon
          <span className="ml-2 text-4xl text-amber-600 mt-6 font-bold animate-pulse">
            {coupons.length}
          </span>
        </h1>
        {coupons.length > 0 && (
          <div className="overflow-x-auto text-slate-900 shadow-2xl rounded-xl shadow-amber-900">
            <table className="table-auto w-full border-collapse border">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-3 px-4 border border-gray-300">No.</th>
                  <th className="py-3 px-4 border border-gray-300">Name</th>
                  <th className="py-3 px-4 border border-gray-300">
                    Expire Date
                  </th>
                  <th className="py-3 px-4 border border-gray-300">Discount</th>
                  <th className="py-3 px-4 border border-gray-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon, idx) => (
                  <tr
                    key={coupon?._id}
                    className={idx % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="py-3 px-4 border border-gray-300">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-4 border border-gray-300">
                      {coupon?.name}
                    </td>
                    <td className="py-3 px-4 border border-gray-300">
                      {new Date(coupon?.expireDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 border border-gray-300">
                      {coupon.discount} %
                    </td>
                    <td className="py-3 px-4 border border-gray-300 flex justify-center">
                      <button
                        onClick={() => handleDelete(coupon._id)}
                        className="text-red-600 hover:text-red-700 focus:outline-none"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

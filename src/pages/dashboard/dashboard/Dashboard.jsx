import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="flex flex-col sm:flex-row">
      <div className="w-full  sm:w-1/4 flex flex-col gap-6 text-xl font-semibold sm:h-screen p-4 sm:p-12 bg-amber-950 ">
        <Link
          className="hover:bg-amber-800 hover:p-2 hover:rounded-md transition-all duration-700"
          to="/dashboard"
        >
          Dashboard
        </Link>
        <Link
          className="hover:bg-amber-800 hover:p-2 hover:rounded-md transition-all duration-700"
          to="/dashboard/profile"
        >
          Profile
        </Link>
        <Link
          className="hover:bg-amber-800 hover:p-2 hover:rounded-md transition-all duration-700"
          to="/dashboard/wishList"
        >
          WishList
        </Link>
        <Link
          className="hover:bg-amber-800 hover:p-2 hover:rounded-md transition-all duration-700"
          to="/dashboard/orders"
        >
          Orders
        </Link>
        {/* <Link to="/dashboard/orders">Orders</Link> */}
      </div>
      <div className="w-full sm:w-3/4 p-4">
        <Outlet />
      </div>
    </div>
  );
}

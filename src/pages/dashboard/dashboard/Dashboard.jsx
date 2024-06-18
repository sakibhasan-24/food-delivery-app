import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
// import { Swal } from "sweetalert2/dist/sweetalert2";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const { currentUser } = useSelector((state) => state.user);
  const { userLogOut } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    const res = await userLogOut();
    if (res.success) {
      Swal.fire({
        icon: "success",
        title: "Logout Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login");
    }
  };
  return (
    <div className="flex flex-col sm:flex-row">
      <div className="w-full   sm:w-1/4 flex flex-col gap-6 text-[20px] shadow-sm rounded-lg shadow-amber-800   p-4 sm:p-12 bg-amber-950 ">
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
        {currentUser && currentUser?.isAdmin && (
          <>
            <Link
              className="hover:bg-amber-800 hover:p-2 hover:rounded-md transition-all duration-700"
              to="/dashboard/add-menu"
            >
              Add Menu
            </Link>
          </>
        )}
        <Link
          className="hover:bg-amber-800 hover:p-2 hover:rounded-md transition-all duration-700"
          to="/dashboard/wishList"
        >
          WishList
        </Link>
        {currentUser && currentUser?.isAdmin && (
          <>
            <Link
              className="hover:bg-amber-800 hover:p-2 hover:rounded-md transition-all duration-700"
              to="/dashboard/orders"
            >
              orders
            </Link>
          </>
        )}

        {currentUser && currentUser?.isAdmin && (
          <>
            <Link
              className="hover:bg-amber-800 hover:p-2 hover:rounded-md transition-all duration-700"
              to="/dashboard/items"
            >
              items
            </Link>
          </>
        )}

        <Link to="/" onClick={handleLogOut} className=" font-bold text-xl">
          sign Out
        </Link>

        {/* <Link to="/dashboard/orders">Orders</Link> */}
      </div>
      <div className="w-full sm:w-3/4 p-4">
        <Outlet />
      </div>
    </div>
  );
}

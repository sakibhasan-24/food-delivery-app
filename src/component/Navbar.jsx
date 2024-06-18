import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { useSelector } from "react-redux";
import SearchBox from "./SearchBox";

export default function Navbar() {
  const [sideBar, setSideBar] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const itemCart = useSelector((state) => state.itemCart);
  // console.log(itemCart.length);
  // console.log(currentUser);
  //   console.log(sideBar);

  return (
    <div className=" flex  p-4 sm:p-6 justify-between items-center">
      <div>
        <Link className="flex items-center" to="">
          <span className="text-orange-400 text-3xl sm:text-6xl font-serif  font-bold">
            Food
          </span>
          <span className="ml-2 text-2xl font-extrabold">Bridge</span>
        </Link>
      </div>
      <div className="">
        <SearchBox />
      </div>

      <div className="hidden sm:flex font-semibold flex-col sm:flex-row items-center">
        {/* shopping cart Icons */}
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {itemCart.length}
                </span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">
                  {itemCart.length} Items
                </span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <Link to="/checkout" className="btn btn-primary btn-block">
                    <button className="btn btn-primary btn-block">
                      View cart
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*end of shopping cart Icons */}
        {currentUser && currentUser?.isAdmin && (
          <Link className="mr-5 hover:text-orange-400" to="/createCoupon">
            coupon
          </Link>
        )}

        {currentUser ? (
          <>
            <Link to="/dashboard">
              <img
                src={currentUser?.profilePicture}
                alt="image"
                className="w-[40px] h-[40px] rounded-full object-cover"
              />
            </Link>
          </>
        ) : (
          <Link className="my-3 text-white hover:text-orange-400" to="/login">
            Login
          </Link>
        )}
      </div>
      <MdOutlineRestaurantMenu
        className="text-4xl sm:hidden cursor-pointer"
        onClick={() => setSideBar(!sideBar)}
      />
      {sideBar && (
        <div
          className={`sm:hidden absolute   w-1/3 z-10   bg-slate-700 rounded-md flex flex-col items-center justify-start h-[400px]   ${
            sideBar
              ? "top-0 right-0 duration-1000"
              : "-top-[200px] left-20 duration-1000"
          } `}
        >
          <MdOutlineRestaurantMenu
            className={`text-4xl cursor-pointer mt-4 `}
            onClick={() => setSideBar(!sideBar)}
          />

          <Link className="my-3 text-white hover:text-orange-400" to="/">
            Burger
          </Link>
          <Link className="my-3 text-white hover:text-orange-400" to="/">
            Salads
          </Link>
          {currentUser ? (
            <>
              <Link to="/dashboard">
                <img
                  src={currentUser?.profilePicture}
                  alt="image"
                  className="w-[40px] h-[40px] rounded-full object-cover"
                />
              </Link>
            </>
          ) : (
            <Link className="my-3 text-white hover:text-orange-400" to="/login">
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

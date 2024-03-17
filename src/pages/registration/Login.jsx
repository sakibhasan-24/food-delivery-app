import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
// import { Swal } from "sweetalert2/dist/sweetalert2";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import {
  logInFailure,
  logInStart,
  logInSuccess,
} from "../../redux/user/userSlice";
import GoogleSignUp from "../../component/GoogleSignUp";

export default function Login() {
  const { userLoading, userLogIn } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  // logInStart,logInFailure
  const handleFormSubmit = async (e) => {
    dispatch(logInStart());
    e.preventDefault();
    // console.log(formData);
    const res = await userLogIn(formData);
    dispatch(logInSuccess(res));
    try {
      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "Login Successfully",
          timer: 1500,
        });
      }
      navigate("/");
    } catch (error) {
      dispatch(logInFailure());
      console.log(error);
    }
  };
  //   console.log(formData);
  return (
    <div className="w-full sm:max-w-2xl mx-auto p-6 sm:p-12">
      <h1 className="font-semibold text-3xl text-slate-300 tracking-widest text-center">
        welcome back
      </h1>
      <div>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-300"
            >
              Email
            </label>
            <div className="mt-1">
              <input
                placeholder="email"
                required
                type="email"
                id="email"
                // onChange={handleInputChange}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full mt-1 px-3 py-2 placeholder-slate-300 border border-slate-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-300"
            >
              password
            </label>
            <div className="mt-1">
              <input
                placeholder="password"
                required
                type="password"
                id="password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                // onChange={handleInputChange}
                className="w-full mt-1 px-3 py-2 placeholder-slate-300 border border-slate-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
              />
            </div>
          </div>

          <input
            type="submit"
            value={`${userLoading ? "Login......." : "login"}`}
            disabled={userLoading}
            className="w-full my-6 bg-slate-700 rounded-md px-4 py-2 font-bold text-slate-50  hover:bg-slate-600 cursor-pointer"
          />
          <GoogleSignUp />
        </form>
      </div>
    </div>
  );
}

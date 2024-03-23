import React, { useState } from "react";
import useApiCall from "./api/useApiCall";
import { useDispatch, useSelector } from "react-redux";
import { logOutSuccess } from "../redux/user/userSlice";

export default function useAuth() {
  const axiosPublic = useApiCall();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const [userLoading, setUserLoading] = useState(false);
  const userSignUp = async (userInfo) => {
    setUserLoading(true);
    try {
      const res = await axiosPublic.post("/api/user/signup", userInfo);
      //   console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setUserLoading(false);
    }
  };

  const userLogIn = async (userInfo) => {
    setUserLoading(true);
    try {
      const res = await axiosPublic.post("/api/user/login", userInfo);
      //   console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setUserLoading(false);
    }
  };

  const googleSignIn = async (userInfo) => {
    // console.log(userInfo);
    setUserLoading(true);
    try {
      const res = await axiosPublic.post("/api/user/googleLogIn", userInfo);
      //   console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setUserLoading(false);
    }
  };

  const userLogOut = async () => {
    setUserLoading(true);
    try {
      const res = await axiosPublic(`/api/user/userLogOut/${currentUser._id}`);
      console.log(res);
      dispatch(logOutSuccess(res.data));
      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setUserLoading(false);
    }
  };

  return { userSignUp, userLogIn, googleSignIn, userLogOut, userLoading };
}

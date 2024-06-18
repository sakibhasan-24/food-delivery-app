import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../../component/spinner/Spinner";

export default function PrivateRoutes({ children }) {
  const { currentUser, loading } = useSelector((state) => state.user);
  const location = useLocation();

  if (loading) {
    return <Spinner />;
  }
  if (currentUser) {
    return children;
  }
  return <Navigate to="/login" state={location.pathname} replace />;
}

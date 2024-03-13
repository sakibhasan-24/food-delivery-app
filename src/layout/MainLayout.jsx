import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../component/Header";

export default function MainLayout() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
